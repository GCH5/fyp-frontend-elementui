<template>
  <div>
    <el-button @click="openParametersDialog">
      Set parameters
    </el-button>
    <el-dialog
      v-model="setParametersDialog"
      width="80%"
      title="Set parameters"
    >
      <div
        v-loading="videoLoading"
        element-loading-text="Loading video..."
        :element-loading-svg="USTsvg.content"
        :element-loading-svg-view-box="USTsvg.viewbox"
      >
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
          @click="resetCanvasAndAreaPoints"
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
        <div>
          <canvas
            id="drawBorderCanvas"
            ref="canvasElt"
            @mousedown="startDrawing"
            @mousemove="previewLine"
          />
          <video
            id="sourceVideo"
            ref="videoEltRef"
            :src="videoSrc"
            muted
            @loadeddata="videoLoaded"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick } from 'vue'
import findIntersections from 'sweepline-intersections'
import { CONFIG } from 'src/config'
import { USTsvg } from 'src/assets/loadingSVG'
import { useEventListener } from 'src/composable/useEventListener'

interface Props {
  videoSrc: string
  videoUid: number
}
const emit = defineEmits<{(e: 'parameterUploaded'): void}>()
const props = defineProps<Props>()
type queueAreaOrFinishArea = 'queueArea' | 'finishArea' | undefined
const LINE_WIDTH_CONSTANT = 500
let areaFlag: queueAreaOrFinishArea
let canvas: HTMLCanvasElement
let videoElt: HTMLVideoElement
let ctx: CanvasRenderingContext2D
let danglingLine = false
let queueAreaSettled = false
let finishAreaSettled = false
let mouseX: number, mouseY: number
let canvasBounding: DOMRect
const queueAreaPoints: [number, number][] = []
const finishAreaPoints: [number, number][] = []
const videoEltRef = ref<HTMLVideoElement>()
const canvasElt = ref<HTMLCanvasElement>()
const videoLoading = ref(true)
const setParametersDialog = ref(false)

useEventListener(window, 'resize', onresize)
useEventListener(window, 'scroll', onresize)

async function confirm () {
  if (!queueAreaSettled) {
    alert('Please specify queue area')
    return
  }

  if (!finishAreaSettled) {
    alert('Please specify finish area')
    return
  }
  const queueAreaParams = {
    finishAreaPoints,
    queueAreaPoints,
    videoUid: props.videoUid
  }
  const response = await fetch(`${CONFIG.API_HOST}/params`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(queueAreaParams)
  })
  const result = await response.json()
  console.log(result)
  alert('Parameters set!')
  emit('parameterUploaded')
}

function closePath () {
  if (areaFlag === 'queueArea') {
    if (queueAreaPoints.length <= 2) {
      alert('Must be a polygon.')
      return
    }
    const selfIntersections = findIntersections({
      type: 'Polygon',
      coordinates: [[...queueAreaPoints, queueAreaPoints[queueAreaPoints.length - 1]]]
    })
    if (selfIntersections.length > 0) {
      alert('Must be a polygon.')
      queueAreaPoints.length = 0
      queueAreaSettled = false
      danglingLine = false
      areaFlag = undefined
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }
    queueAreaSettled = true
  } else {
    if (finishAreaPoints.length <= 2) {
      alert('Must be a polygon.')
      return
    }
    const selfIntersections = findIntersections({
      type: 'Polygon',
      coordinates: [[...finishAreaPoints, finishAreaPoints[finishAreaPoints.length - 1]]]
    })
    if (selfIntersections.length > 0) {
      alert('Must be a polygon.')
      finishAreaPoints.length = 0
      finishAreaSettled = false
      danglingLine = false
      areaFlag = undefined
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }
    finishAreaSettled = true
  }

  resetCanvasWithFirstFrame()
  redrawArea(finishAreaPoints, true, 'aqua')
  redrawArea(queueAreaPoints, true, 'blue')
  danglingLine = false
}

function startDrawing (event: MouseEvent) {
  if (areaFlag === undefined || (areaFlag === 'queueArea' && queueAreaSettled) || (areaFlag === 'finishArea' && finishAreaSettled)) {
    return
  }
  mouseX = event.offsetX / canvasBounding.width * canvas.width
  mouseY = event.offsetY / canvasBounding.height * canvas.height

  danglingLine = true
  if (areaFlag === 'queueArea') {
    queueAreaPoints.push([mouseX, mouseY])
  } else {
    finishAreaPoints.push([mouseX, mouseY])
  }
}

function previewLine (event: MouseEvent) {
  if (danglingLine) {
    resetCanvasWithFirstFrame()
    if (areaFlag === 'queueArea') {
      redrawArea(finishAreaPoints, true, 'aqua')
      redrawArea(queueAreaPoints, false, 'blue')
    } else {
      redrawArea(queueAreaPoints, true, 'blue')
      redrawArea(finishAreaPoints, false, 'aqua')
    }
    mouseX = event.offsetX / canvasBounding.width * canvas.width
    mouseY = event.offsetY / canvasBounding.height * canvas.height
    ctx.lineTo(mouseX, mouseY)
    ctx.stroke()
  }
}

function redrawArea (areaPoints: [number, number][], close: boolean, strokeStyle: string) {
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
    ctx.stroke()
  }
}

async function videoLoaded () {
  if (videoEltRef.value) {
    videoElt = videoEltRef.value
    await videoElt.play()
    videoElt.pause()
    canvas.height = videoElt.videoHeight
    canvas.width = videoElt.videoWidth
    ctx.lineWidth = videoElt.videoWidth / LINE_WIDTH_CONSTANT

    /**
     * When El-Dialog has been loaded once, it's inner DOM structure will be retained,
     * but style becomes "display: none"
     * In this case `canvas.getBoundingClientRect()` called in following onresize() will not work
     * We need to manually call it again in openParametersDialog(),
     * at which the inner content display style will not be none
     */
    onresize()

    videoLoading.value = false
  }
}

function onresize () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvasBounding = canvas.getBoundingClientRect()
  resetAreaPoints()
}

function resetCanvasWithFirstFrame () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(videoElt, 0, 0, canvas.width, canvas.height)
}

function setQueueArea () {
  if (!finishAreaSettled && finishAreaPoints.length > 0) {
    alert('Please complete finish area!')
    return
  }
  areaFlag = 'queueArea'

  resetCanvasWithFirstFrame()
  redrawArea(finishAreaPoints, true, 'aqua')
  redrawArea(queueAreaPoints, true, 'blue')
  ctx.strokeStyle = 'blue'
}

function setFinishArea () {
  if (!queueAreaSettled && queueAreaPoints.length > 0) {
    alert('Please complete queue area!')
    return
  }
  areaFlag = 'finishArea'

  resetCanvasWithFirstFrame()
  redrawArea(finishAreaPoints, true, 'aqua')
  redrawArea(queueAreaPoints, true, 'blue')
  ctx.strokeStyle = 'aqua'
}

function resetAreaPoints () {
  finishAreaPoints.length = 0
  queueAreaPoints.length = 0
  queueAreaSettled = false
  finishAreaSettled = false
  danglingLine = false
  areaFlag = undefined
}

function resetCanvasAndAreaPoints () {
  resetAreaPoints()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

async function openParametersDialog () {
  if (props.videoSrc.length === 0) {
    alert('Please upload video!')
    return
  }
  setParametersDialog.value = true
  await nextTick()
  if (finishAreaSettled && queueAreaSettled) {
    return
  }
  canvas = canvasElt.value as HTMLCanvasElement
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  useEventListener(window, 'resize', onresize)
  useEventListener(window, 'scroll', onresize)
  if (!videoLoading.value) { // loaded
    canvasBounding = canvas.getBoundingClientRect()
  }
}
</script>
<style lang="css" scoped>
#drawBorderCanvas {
  width: 100%;
  height: 100%;
}
#sourceVideo {
  display: none;
}
</style>
