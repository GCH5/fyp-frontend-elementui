<template>
  <div>
    <div>
      <el-upload
        ref="upload"
        accept="video/*"
        class="upload-demo"
        drag
        :limit="1"
        :on-exceed="handleExceed"
        :on-success="handleVideoSuccess"
        :on-change="handleChange"
        :auto-upload="false"
        :http-request="sendFile"
        action="#"
      >
        <div v-if="videoUploading">
          <el-progress
            type="circle"
            :percentage="videoUploadPercent"
            :indeterminate="videoProcessing"
          />
        </div>
        <div v-else-if="videoProcessing">
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
        <div v-else>
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            Drop file here or
            <em>click to upload</em>
          </div>
        </div>
      </el-upload>
      <div class="el-upload__tip">
        video files with a size less than 500kb
      </div>
      <el-button
        type="primary"
        round
        @click="submitUpload"
      >
        Upload
      </el-button>
      <el-button
        type="primary"
        round
        @click="previewVideo"
      >
        Preview
      </el-button>
      <video
        ref="videoElt"
        :src="videoSrc"
        :width="videoWidth"
        :height="videoHeight"
        :class="videoClass"
        @loadeddata="setVideoSize"
      />
      <AnalyzeVideoDrawBorder
        :video-src="videoSrc"
        :video-uid="videoUid"
        :resize-flag="previewVideoFlag"
      />
    </div>
    <div id="videoPreviewDiv" />
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ref, onMounted, onBeforeMount } from 'vue'
import AnalyzeVideoDrawBorder from 'src/components/AnalyzeVideoDrawBorder.vue'
import { CONFIG } from 'src/config'
import type { ElUpload } from 'element-plus'
import type {
  UploadFile,
  ElFile
} from 'element-plus/es/components/upload/src/upload.type'
import axios from 'axios'

type ElUploadInstance = InstanceType<typeof ElUpload>

interface ResponseType {
  status: number
}

const upload = ref<ElUploadInstance>()
const videoSrc = ref('')
const videoUid = ref<number>(0)
const videoWidth = ref<number>(0)
const videoHeight = ref<number>(0)
const videoUploadPercent = ref<number>(0)
const videoUploading = ref(false)
const videoProcessing = ref(false)
const previewVideoFlag = ref(false)
const videoClass = ref('')
const videoElt = ref<HTMLVideoElement>()

let videoElFile: ElFile
onMounted(() => {
  window.onresize = setVideoSize
})

onBeforeMount(() => {
  if (previewVideoFlag.value) {
    videoClass.value = 'none'
    URL.revokeObjectURL(videoElt.value!.src)
  }
})

function setVideoSize () {
  videoWidth.value = window.innerWidth / 3
  videoHeight.value = videoWidth.value * videoElt.value!.videoHeight / videoElt.value!.videoWidth
}

async function sendFile () {
  videoUploading.value = true
  const formData = new FormData()
  formData.set('video', videoElFile, `${videoUid.value}.${videoElFile.name.split('.').pop()}`)
  const response = await axios({
    url: `${CONFIG.API_HOST}/upload`,
    data: formData,
    method: 'post',
    onUploadProgress: function (progressEvent) {
      const percent = (progressEvent.loaded / progressEvent.total * 100 | 0)
      videoUploadPercent.value = percent
      if (percent === 100) {
        videoUploading.value = false
        videoProcessing.value = true
      }
    }
  })
  const result = await response.data
  console.log('result: ', result)
}

function previewVideo () {
  if (previewVideoFlag.value) {
    videoClass.value = 'none'
    previewVideoFlag.value = false
    return
  }
  previewVideoFlag.value = true
  videoClass.value = 'display'
  if (videoElt.value!.src !== videoSrc.value) {
    videoElt.value!.src = videoSrc.value
  }
  videoElt.value!.controls = true
}

const handleExceed = (files: ElFile[]) => {
  upload.value?.clearFiles()
  upload.value?.handleStart(files[0])
}

const submitUpload = () => {
  upload.value?.submit()
}

const handleVideoSuccess = (res: ResponseType, file: UploadFile) => {
  console.log('success')
  videoProcessing.value = false
}

function handleChange (file: UploadFile, _fileList: UploadFile[]) {
  if (previewVideoFlag.value) { URL.revokeObjectURL(videoElt.value!.src) }
  previewVideoFlag.value = false
  videoClass.value = 'none'
  videoElFile = file.raw
  videoUid.value = videoElFile.uid
  videoSrc.value = URL.createObjectURL(videoElFile)
}
</script>
<style lang="css" scoped>
.display {
  display: inline;
}
.none {
  display: none;
}
</style>
