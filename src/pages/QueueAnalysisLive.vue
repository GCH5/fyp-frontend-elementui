<template>
  <div>
    <div v-if="analyzerState === 'initial'">
      <el-input
        v-model="streamUrl"
        placeholder="Please input"
      />
      <el-button
        type="primary"
        round
        @click="submitUpload"
      >
        Process
      </el-button>
      <el-button
        type="primary"
        round
        @click="previewVideo"
      >
        Preview
      </el-button>
      <el-dialog
        v-model="previewVideoFlag"
        width="95%"
        title="Preview"
        :before-close="handleDialogClose"
      >
        <video
          id="videoPreview"
          ref="videoElt"
          :src="videoSrc"
          controls
        />
      </el-dialog>
      <AnalyzeVideoDrawBorder
        :video-src="videoSrc"
        :video-uid="videoUid"
        @parameter-status-changed="onParameterStatusChanged"
      />
    </div>
    <div v-else-if="analyzerState === 'processing'">
      <el-progress
        type="line"
        :percentage="50"
        :indeterminate="true"
        :stroke-width="20"
        :duration="5"
      >
        Processing video...
      </el-progress>
    </div>
    <AnalyzeVideoShowResults
      v-else-if="analyzerState === 'finished'"
      :results-video-src="resultsVideoSrc"
      :results-data="resultsData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import AnalyzeVideoDrawBorder from 'src/components/QueueAnalysisStaticDrawBorder.vue'
import AnalyzeVideoShowResults from 'src/components/QueueAnalysisStaticShowResults.vue'
import { CONFIG } from 'src/config'
import axios from 'axios'

type VideoAnalyzerState = 'initial' | 'processing' | 'finished'

const videoSrc = ref('')
const resultsVideoSrc = ref('')
const videoUid = ref<number>(0)
const streamUrl = ref('')
const analyzerState = ref<VideoAnalyzerState>('initial')
const parameterUploaded = ref(false)
const previewVideoFlag = ref(false)
const videoElt = ref<HTMLVideoElement>()
const resultsData = ref<[number, number, number][]>([])

onBeforeMount(() => {
  if (previewVideoFlag.value) {
    URL.revokeObjectURL(videoSrc.value)
  }
})

function handleDialogClose (done: () => void) {
  videoElt.value!.pause()
  done()
}

function onParameterStatusChanged (parameterStatus: boolean) {
  parameterUploaded.value = parameterStatus
}

function previewVideo () {
  if (!streamUrl.value) {
    alert('Please provide a stream url!')
    return
  }
  previewVideoFlag.value = !previewVideoFlag.value
}

</script>
<style lang="css" scoped>
#videoPreview {
  width: 100%;
}
</style>
