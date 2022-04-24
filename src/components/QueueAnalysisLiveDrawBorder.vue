<template>
  <div>
    <el-button @click="openParametersDialog">
      Set parameters
    </el-button>
    <el-dialog
      v-model="setParametersDialog"
      width="80%"
      title="Set parameters"
      @opened="onSetParametersDialogOpened"
    >
      <div
        v-loading="loading"
        :element-loading-text="loadingText"
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
        <el-button
          type="primary"
          round
          @click="test"
        >
          Test
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
            muted
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import Hls from 'hls.js'
import { ref, nextTick, watch, onBeforeUnmount } from 'vue'
import findIntersections from 'sweepline-intersections'
import { USTsvg } from 'src/assets/loadingSVG'
import { useEventListener } from 'src/composable/useEventListener'

interface Props {
  streamUrl: string
}
onBeforeUnmount(() => {
  console.log('hls unmounting')
  if (hls) {
    hls.destroy()
  }
})
const emit = defineEmits<{(e: 'parameterStatusChanged', parameterStatus: boolean, queueAreaPoints: [number, number][], finishAreaPoints: [number, number][]): void}>()
const props = defineProps<Props>()
type queueAreaOrFinishArea = 'queueArea' | 'finishArea' | undefined
const LINE_WIDTH_SCALE_CONSTANT = 500
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
const loading = ref(true)
const loadingText = ref('')
const setParametersDialog = ref(false)
let hls: Hls
useEventListener(window, 'resize', onresize)
useEventListener(window, 'scroll', onresize)
async function onSetParametersDialogOpened () {
  videoElt = videoEltRef.value as HTMLVideoElement
  if (Hls.isSupported()) {
    hls = new Hls()
    hls.loadSource(props.streamUrl)
    hls.attachMedia(videoElt)
    hls.on(Hls.Events.MANIFEST_PARSED, async function () {
      await videoElt.play()
      videoElt.pause()
      canvas.height = videoElt.videoHeight
      canvas.width = videoElt.videoWidth
      ctx.lineWidth = videoElt.videoWidth / LINE_WIDTH_SCALE_CONSTANT
      onresize()
      loading.value = false
    })
  } else if (videoElt.canPlayType('application/vnd.apple.mpegurl')) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    videoElt.src = props.streamUrl
    await videoElt.play()
    videoElt.pause()
    canvas.height = videoElt.videoHeight
    canvas.width = videoElt.videoWidth
    ctx.lineWidth = videoElt.videoWidth / LINE_WIDTH_SCALE_CONSTANT
    onresize()
    loading.value = false
  }
}

async function confirm () {
  if (!queueAreaSettled) {
    alert('Please specify queue area')
    return
  }

  if (!finishAreaSettled) {
    alert('Please specify finish area')
    return
  }

  loadingText.value = '   Saving parameters...'
  loading.value = true
  try {
    emit('parameterStatusChanged', true, queueAreaPoints, finishAreaPoints)
    alert('Parameters set!')
  } catch (error) {
    alert('Parameters failed to be saved!' + error)
  }
  loading.value = false
}

async function test () {
  queueAreaSettled = true
  finishAreaSettled = true
  loadingText.value = '   Saving parameters...'
  loading.value = true
  queueAreaPoints.push([546.737945608131, 384.06417112299465])
  queueAreaPoints.push([964.4919392594143, 637.2192513368983])
  queueAreaPoints.push([1370.69513124292, 309.9465240641711])
  queueAreaPoints.push([816.2566511896042, 62.56684491978609])

  finishAreaPoints.push([979.8930081497842, 648.7700534759358])
  finishAreaPoints.push([1182.032037335889, 773.903743315508])
  finishAreaPoints.push([1555.5079579273588, 428.3422459893048])
  finishAreaPoints.push([1374.5453984655126, 331.1229946524064])

  try {
    emit('parameterStatusChanged', true, queueAreaPoints, finishAreaPoints)
    alert('Parameters set!')
  } catch (error) {
    alert('Parameters failed to be saved!' + error)
  }
  loading.value = false
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

watch(() => props.streamUrl, () => {
  loading.value = true
})

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
  emit('parameterStatusChanged', false, [], [])
}

async function openParametersDialog () {
  if (props.streamUrl.length === 0) {
    alert('Please enter a stream url!')
    return
  }
  setParametersDialog.value = true
  loadingText.value = 'Loading stream...'
  await nextTick()
  if (finishAreaSettled && queueAreaSettled) {
    return
  }
  canvas = canvasElt.value as HTMLCanvasElement
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  if (!loading.value) { // if video has been loaded before opening the dialog
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
