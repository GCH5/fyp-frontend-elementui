<template>
  <div>
    <div v-if="analyzerState === 'initial'">
      <el-upload
        ref="upload"
        accept="video/*"
        class="upload-demo"
        drag
        :limit="1"
        :on-exceed="handleExceed"
        :on-change="handleChange"
        :auto-upload="false"
        :http-request="sendFile"
        action="#"
      >
        <div>
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
    <div v-else-if="analyzerState === 'uploading'">
      <el-progress
        type="circle"
        :percentage="videoUploadPercent"
        :indeterminate="true"
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
import { UploadFilled } from '@element-plus/icons-vue'
import { ref, onBeforeMount } from 'vue'
import AnalyzeVideoDrawBorder from 'src/components/AnalyzeVideoDrawBorder.vue'
import AnalyzeVideoShowResults from 'src/components/AnalyzeVideoShowResults.vue'
import { CONFIG } from 'src/config'
import type { ElUpload } from 'element-plus'
import type {
  UploadFile,
  ElFile
} from 'element-plus/es/components/upload/src/upload.type'
import axios from 'axios'

type ElUploadInstance = InstanceType<typeof ElUpload>
type VideoAnalyzerState = 'initial' | 'uploading' | 'processing' | 'finished'

const upload = ref<ElUploadInstance>()
const videoSrc = ref('')
const resultsVideoSrc = ref('')
const videoUid = ref<number>(0)
const videoUploadPercent = ref<number>(0)
const analyzerState = ref<VideoAnalyzerState>('initial')
const parameterUploaded = ref(false)
const previewVideoFlag = ref(false)
const videoElt = ref<HTMLVideoElement>()
const resultsData = ref<[number, number, number][]>([])

let videoElFile: ElFile

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

async function sendFile () {
  analyzerState.value = 'uploading'
  const formData = new FormData()
  formData.set('video', videoElFile, `${videoUid.value}.${videoElFile.name.split('.').pop()}`)
  const response = await axios({
    url: `${CONFIG.API_HOST}/upload`,
    data: formData,
    method: 'post',
    responseType: 'arraybuffer',
    onUploadProgress: function (progressEvent) {
      const percent = (progressEvent.loaded / progressEvent.total * 100 | 0)
      videoUploadPercent.value = percent
      if (percent === 100) {
        analyzerState.value = 'processing'
      }
    }
  })
  const jsonSize = parseInt(response.headers['json-size'])
  const arr: ArrayBuffer = response.data
  const jsonArr = new Uint8Array(arr, 0, jsonSize)
  const videoArr = new Uint8Array(arr, jsonSize)
  const videoBlob = new Blob([videoArr])
  resultsVideoSrc.value = URL.createObjectURL(videoBlob)
  resultsData.value = JSON.parse(new TextDecoder('utf-8').decode(jsonArr))
  analyzerState.value = 'finished'
}

function previewVideo () {
  if (!videoElFile) {
    alert('Please upload a video!')
    return
  }
  previewVideoFlag.value = !previewVideoFlag.value
}

const handleExceed = (files: ElFile[]) => {
  upload.value?.clearFiles()
  upload.value?.handleStart(files[0])
}

const submitUpload = () => {
  if (!videoElFile) {
    alert('Please upload a video!')
    return
  }

  if (!parameterUploaded.value) {
    alert('Parameters must be set!')
    return
  }
  upload.value?.submit()
}

function handleChange (file: UploadFile, _fileList: UploadFile[]) {
  if (previewVideoFlag.value) { URL.revokeObjectURL(videoSrc.value) }
  previewVideoFlag.value = false
  videoElFile = file.raw
  videoUid.value = videoElFile.uid
  videoSrc.value = URL.createObjectURL(videoElFile)
}
</script>
<style lang="css" scoped>
#videoPreview {
  width: 100%;
}
</style>
