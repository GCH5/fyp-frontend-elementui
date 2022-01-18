<template>
  <div>
    <el-button @click="closePath">
      Close Path
    </el-button>
    <el-button
      type="primary"
      round
      @click="setQueueArea"
    >
      Specify queue area
    </el-button>
    <el-button
      type="primary"
      round
      @click="setFinishArea"
    >
      Specify finish area
    </el-button>
    <el-button
      type="primary"
      round
      @click="reset"
    >
      Reset
    </el-button>
    <el-button
      type="primary"
      round
      @click="confirm"
    >
      Confirm
    </el-button>
  </div>
  <div>
    <canvas id="firstFrameCanvas" />
  </div>
</template>
<script setup lang="ts">
import { watch, onMounted } from 'vue'

interface Props {
  videoSrc: string
}

const props = defineProps<Props>()
type queueAreaOrFinishArea = 'queueArea'| 'finishArea'
let areaFlag:queueAreaOrFinishArea
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let danglingLine = false
let queueAreaSettled = false
let finishAreaSettled = false
let mouseX: number, mouseY: number
let canvasBounding: DOMRect
const queueAreaPoints: [number, number][] = []
const finishAreaPoints: [number, number][] = []
let videoElt: HTMLVideoElement
let dirty = true

function closePath () {
  if (areaFlag === 'queueArea') {
    if (queueAreaPoints.length <= 2) {
      alert('Must be a polygon.')
      return
    }
    queueAreaSettled = true
  } else {
    if (finishAreaPoints.length <= 2) {
      alert('Must be a polygon.')
      return
    }
    finishAreaSettled = true
  }
  resetCanvas()
  redrawArea(finishAreaPoints, true, 'aqua')
  redrawArea(queueAreaPoints, true, 'blue')
  danglingLine = false
}
function startDrawing (event: MouseEvent) {
  console.log(areaFlag)
  console.log('startDrawing')
  if ((areaFlag === 'queueArea' && queueAreaSettled) || (areaFlag === 'finishArea' && finishAreaSettled)) {
    return
  }
  mouseX = event.clientX - canvasBounding.left
  mouseY = event.clientY - canvasBounding.top
  danglingLine = true
  if (areaFlag === 'queueArea') {
    queueAreaPoints.push([mouseX, mouseY])
    console.log('push')
  } else {
    finishAreaPoints.push([mouseX, mouseY])
  }
  dirty = true
}
function previewLine (event: MouseEvent) {
  if (danglingLine) {
    resetCanvas()
    if (areaFlag === 'queueArea') {
      redrawArea(finishAreaPoints, true, 'aqua')
      redrawArea(queueAreaPoints, false, 'blue')
    } else {
      redrawArea(queueAreaPoints, true, 'blue')
      redrawArea(finishAreaPoints, false, 'aqua')
    }
    mouseX = event.clientX - canvasBounding.left
    mouseY = event.clientY - canvasBounding.top
    ctx.lineTo(mouseX, mouseY)
    ctx.stroke()
  }
}
function redrawArea (areaPoints:[number, number][], close:boolean, strokeStyle:string) {
  if (areaPoints.length < 1) {
    return
  }
  ctx.strokeStyle = strokeStyle
  ctx.beginPath()
  ctx.moveTo(areaPoints[0][0], areaPoints[0][1])
  for (let index = 1; index < areaPoints.length; index++) {
    const [pointX, pointY] = areaPoints[index]
    ctx.lineTo(pointX, pointY)
  }
  if (close) {
    ctx.closePath()
    console.log('close')
    ctx.stroke()
  }
}
function resetCanvas () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(videoElt, 0, 0, canvas.width, canvas.height)
}
watch(() => props.videoSrc, (src, _prevSrc) => {
  videoElt.src = src
  // document.getElementsByTagName('body')[0].append(videoElt)
})
onMounted(() => {
  canvas = <HTMLCanvasElement>document.getElementById('firstFrameCanvas')
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  videoElt = document.createElement('video') as HTMLVideoElement
  videoElt.muted = true
  window.onresize = function () {
    resize(window.innerWidth)
  }
  videoElt.onloadeddata = function () {
    videoElt.play()
    videoElt.pause()
    resize(window.innerWidth)
    canvas.addEventListener('mousedown', startDrawing, false)
    canvas.addEventListener('mousemove', previewLine, false)
  }
})
function resize (windowWidth:number) {
  videoElt.width = windowWidth / 3
  videoElt.height = videoElt.width * videoElt.videoHeight / videoElt.videoWidth
  canvas.height = videoElt.height
  canvas.width = videoElt.width
  canvasBounding = canvas.getBoundingClientRect()
  ctx.lineWidth = 2 // initial brush width
}
function setQueueArea () {
  areaFlag = 'queueArea'

  if (dirty) {
    resetCanvas()
    redrawArea(finishAreaPoints, true, 'aqua')
    redrawArea(queueAreaPoints, true, 'blue')
    ctx.strokeStyle = 'blue'
    dirty = false
  }
}
function setFinishArea () {
  areaFlag = 'finishArea'

  if (dirty) {
    resetCanvas()
    redrawArea(finishAreaPoints, true, 'aqua')
    redrawArea(queueAreaPoints, true, 'blue')
    ctx.strokeStyle = 'aqua'

    dirty = false
  }
}
function reset () {
  finishAreaPoints.length = 0
  queueAreaPoints.length = 0
  queueAreaSettled = false
  finishAreaSettled = false
  danglingLine = false
  dirty = true
  resetCanvas()
}
</script>
