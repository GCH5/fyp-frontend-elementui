<template>
  <div>
    <video
      ref="videoEltRef"
      autoplay
      muted
      controls
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue'
import Hls from 'hls.js'
const videoEltRef = ref<HTMLVideoElement>()

interface Props {
  streamUrl: string
}
const props = defineProps<Props>()
onMounted(() => {
  if (!videoEltRef.value) {
    console.error('videoEltRef is not defined')
  } else {
    // HLS.js is not supported on platforms that do not have Media Source
    // Extensions (MSE) enabled.
    //
    // When the browser has built-in HLS support (check using `canPlayType`),
    // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
    // element through the `src` property. This is using the built-in support
    // of the plain video element, without using HLS.js.
    //
    // Note: it would be more normal to wait on the 'canplay' event below however
    // on Safari (where you are most likely to find built-in HLS support) the
    // video.src URL must be on the user-driven white-list before a 'canplay'
    // event will be emitted; the last video event that can be reliably
    // listened-for when the URL is not on the white-list is 'loadedmetadata'.

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(props.streamUrl)
      hls.attachMedia(videoEltRef.value)
    } else if (videoEltRef.value.canPlayType('application/vnd.apple.mpegurl')) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      videoEltRef.value.src = props.streamUrl
    }
  }
})
</script>
