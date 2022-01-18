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
import type {
  UploadFile,
  ElUploadProgressEvent,
  ElFile
} from 'element-plus/es/components/upload/src/upload.type'

interface ResponseType{
  status:number
}
const upload = ref()
const videoSrc = ref('')
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
function sendFile () {
  const formData = new FormData()
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
const handleExceed = (files:FileList) => {
  upload.value.clearFiles()
  upload.value.handleStart(files[0])
}
const submitUpload = () => {
  upload.value.submit()
}
const handleProgress = (event:ElUploadProgressEvent, file:ElFile, fileList:UploadFile[]) => {
  console.log(event.percent)
  console.log(fileList)
}
const handleVideoSuccess = (res:ResponseType, file:UploadFile) => { // 获取上传图片地址
  console.log(file)
}
function handleChange (file: UploadFile, fileList: UploadFile[]) {
  if (videoPreviewDiv.children.length > 0) {
    videoPreviewDiv.children[0].remove()
  }
  videoElFile = file.raw
  videoSrc.value = URL.createObjectURL(videoElFile)
}
</script>
<style lang="css" scoped>
.displayNone {
}
</style>
