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
        :on-progress="handleProgress"
        :on-success="handleVideoSuccess"
        :on-change="handleChange"
        :auto-upload="false"
        :http-request="sendFile"
        action="#"
      >
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">
          Drop file here or
          <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            video files with a size less than 500kb
          </div>
        </template>
      </el-upload>
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
      <AnalyzeVideoDrawBorder
        :video-src="videoSrc"
        :video-uid="videoUid"
      />
    </div>
    <div id="videoPreviewDiv" />
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import AnalyzeVideoDrawBorder from 'src/components/AnalyzeVideoDrawBorder.vue'
import { CONFIG } from 'src/config'
import type { ElUpload } from 'element-plus'
import type {
  UploadFile,
  ElUploadProgressEvent,
  ElFile
} from 'element-plus/es/components/upload/src/upload.type'

type ElUploadInstance = InstanceType<typeof ElUpload>

interface ResponseType{
  status:number
}
const upload = ref<ElUploadInstance>()
const videoSrc = ref('')
const videoUid = ref<number>(0)
let videoElt:HTMLVideoElement
let videoPreviewDiv:HTMLDivElement
let videoElFile:ElFile
onMounted(() => {
  videoPreviewDiv = document.getElementById('videoPreviewDiv') as HTMLDivElement
  window.onresize = function () {
    if (videoElt) {
      videoElt.width = window.innerWidth / 3
      videoElt.height = videoElt.width * videoElt.videoHeight / videoElt.videoWidth
    }
  }
})
async function sendFile () {
  const formData = new FormData()
  formData.set('video', videoElFile, `${videoUid.value}.${videoElFile.name.split('.').pop()}`)
  const response = await fetch(`${CONFIG.API_HOST}/upload`, {
    method: 'POST',
    body: formData
  })
  const result = await response.json()
  console.log(result)
}

function previewVideo () {
  if (videoPreviewDiv.children.length > 0) {
    videoPreviewDiv.children[0].remove()
    return
  }
  videoElt = document.createElement('video') as HTMLVideoElement
  videoElt.src = videoSrc.value
  videoElt.controls = true
  videoElt.onloadeddata = () => {
    videoElt.width = window.innerWidth / 3
    videoElt.height = videoElt.width * videoElt.videoHeight / videoElt.videoWidth
    videoPreviewDiv.append(videoElt)
  }
}
const handleExceed = (files:ElFile[]) => {
  upload.value?.clearFiles()
  upload.value?.handleStart(files[0])
}
const submitUpload = () => {
  upload.value?.submit()
}
const handleProgress = (event:ElUploadProgressEvent, file:ElFile, fileList:UploadFile[]) => {
  console.log(event.percent)
  console.log(fileList)
}
const handleVideoSuccess = (res:ResponseType, file:UploadFile) => { // 获取上传图片地址
  console.log('success')
}
function handleChange (file: UploadFile, _fileList: UploadFile[]) {
  if (videoPreviewDiv.children.length > 0) {
    URL.revokeObjectURL(videoElt.src)
    videoPreviewDiv.children[0].remove()
  }
  videoElFile = file.raw
  videoUid.value = videoElFile.uid
  videoSrc.value = URL.createObjectURL(videoElFile)
}
</script>
