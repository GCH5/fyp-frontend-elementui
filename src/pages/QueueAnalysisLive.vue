<template>
  <div>
    <div
      v-if="analyzerState === 'initial'"
      v-loading="loadingResponse"
    >
      <el-input
        v-model="streamUrl"
        placeholder="Please input stream url"
      />
      <el-button
        type="primary"
        round
        @click="startProcessing"
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
      >
        <StreamPreview :stream-url="streamUrl" />
      </el-dialog>
      <QueueAnalysisLiveDrawBorder
        :stream-url="streamUrl"
        @parameter-status-changed="onParameterStatusChanged"
      />
    </div>
    <QueueAnalysisLiveShowResults
      v-else-if="analyzerState === 'display'"
      :stream-url="streamUrl"
      :stream-uid="streamUid"
      :finish-area-points="finishAreaPoints"
      :queue-area-points="queueAreaPoints"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, computed } from 'vue'
import { CONFIG } from 'src/config'
import QueueAnalysisLiveDrawBorder from 'src/components/QueueAnalysisLiveDrawBorder.vue'
import QueueAnalysisLiveShowResults from 'src/components/QueueAnalysisLiveShowResults.vue'
type VideoAnalyzerState = 'initial' | 'display'

const streamUrl = ref('')
const streamUid = computed(() => hashCode(streamUrl.value).toString())
const analyzerState = ref<VideoAnalyzerState>('initial')
const parameterUploaded = ref(false)
const previewVideoFlag = ref(false)
const loadingResponse = ref(false)
const queueAreaPoints = ref<[number, number][]>([])
const finishAreaPoints = ref<[number, number][]>([])

onBeforeUnmount(() => {
  if (analyzerState.value === 'display') {
    fetch(`${CONFIG.API_HOST}/queue-analysis/close`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ streamUid: streamUid.value })
    })
  }
})

function onParameterStatusChanged (parameterStatus: boolean, queueAreaPointsEmit: [number, number][], finishAreaPointsEmit: [number, number][]) {
  parameterUploaded.value = parameterStatus
  queueAreaPoints.value = queueAreaPointsEmit
  finishAreaPoints.value = finishAreaPointsEmit
}

function hashCode (str: string) {
  let hash = 0
  if (str.length === 0) {
    return hash
  }

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}

function previewVideo () {
  if (!streamUrl.value) {
    alert('Please provide a stream url!')
    return
  }
  previewVideoFlag.value = !previewVideoFlag.value
}

async function startProcessing () {
  loadingResponse.value = true
  const queueAreaParams = {
    finishAreaPoints: finishAreaPoints.value,
    queueAreaPoints: queueAreaPoints.value,
    streamUrl: streamUrl.value,
    streamUid: streamUid.value
  }
  try {
    await fetch(`${CONFIG.API_HOST}/queue-analysis/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(queueAreaParams)
    })
    loadingResponse.value = false
    analyzerState.value = 'display'
  } catch (error) {
    alert(`Response failed with: ${error}`)
  }
}

</script>
<style lang="css" scoped>
#videoPreview {
  width: 100%;
}
</style>
