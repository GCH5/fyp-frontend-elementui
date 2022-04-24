<template>
  <div v-loading="resultsLoading">
    <img
      id="result-img"
      ref="imgEltRef"
    >
    <el-row
      id="charts"
      :gutter="20"
    >
      <el-col :span="12">
        <div id="waitingTimeCharts" />
      </el-col>
      <el-col :span="12">
        <div id="queueLengthCharts" />
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import * as echarts from 'echarts/core'
import {
  DatasetComponent,
  DatasetComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  DataZoomComponent,
  DataZoomComponentOption
} from 'echarts/components'
import { LineChart, LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { CONFIG } from 'src/config'

echarts.use([
  DatasetComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

type EChartsOption = echarts.ComposeOption<
| DatasetComponentOption
| ToolboxComponentOption
| TooltipComponentOption
| GridComponentOption
| LegendComponentOption
| DataZoomComponentOption
| LineSeriesOption
>

interface Props {
  streamUrl: string
  streamUid: string
  finishAreaPoints: [number, number][]
  queueAreaPoints: [number, number][]
}
const resultsLoading = ref(true)
const resultsData: Array<[number, number, number]> = []// [time, Queue length, current waiting time][]
const props = defineProps<Props>()
let imgElt: HTMLImageElement
const imgEltRef = ref<HTMLImageElement>()
let timer = 0

onMounted(() => {
  const evtSource = new EventSource(`${CONFIG.API_HOST}/queue-analysis/live?streamUid=${props.streamUid}`)
  window.addEventListener('resize', function () {
    waitingTimeCharts.resize()
    queueLengthCharts.resize()
  })
  imgElt = imgEltRef.value as HTMLImageElement
  setTimeout(() => {
    evtSource.addEventListener('message', function (event) {
      const data = (JSON.parse(event.data))
      if (data.time - timer > 100) { // every second
        imgElt.src = `data:image/jpeg;base64,${data.cap}`
        timer = data.time
        resultsData.push([parseInt(data.time), data.queueLength, parseInt(data.currentWaitingTime)])
        if (resultsData.length > 100) {
          resultsData.shift()
        }
        waitingTimeCharts.setOption({
          dataset: {
            source: [
              ['time', 'Queue length', 'Current waiting time'],
              ...resultsData
            ]
          }
        })

        queueLengthCharts.setOption({
          dataset: {
            source: [
              ['time', 'Queue length', 'Current waiting time'],
              ...resultsData
            ]
          }
        })
      }
    }, false)
    resultsLoading.value = false
  }, 2000)

  const waitingTimeChartsDom = document.getElementById('waitingTimeCharts') as HTMLDivElement
  const waitingTimeCharts = echarts.init(waitingTimeChartsDom)
  const queueLengthChartsDom = document.getElementById('queueLengthCharts') as HTMLDivElement
  const queueLengthCharts = echarts.init(queueLengthChartsDom)
  const baseOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        },
        animation: false,
        label: {
          backgroundColor: '#505765'
        }
      }
    },
    dataset: {
      source: [
        ['time', 'Queue length', 'Current waiting time'],
        ...resultsData
      ]
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },

    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 20
      },
      {
        start: 0,
        end: 20
      }
    ]
  }
  const waitingTimeChartsOption = {
    ...baseOption,
    series: {
      type: 'line',
      name: 'Current waiting time',
      encode: {
        x: 'time',
        y: 'Current waiting time'
      },
      smooth: true,
      symbol: 'none'

    },
    yAxis:
    {
      type: 'value',
      name: 'Current waiting time',
      axisLabel: {
        formatter: '{value} s'
      }
    },
    legend: {
      data: ['Current waiting time']
    }
  }
  const queueLengthChartsOption = {
    ...baseOption,
    series: {
      type: 'line',
      smooth: true,
      symbol: 'none',
      name: 'Queue length',
      encode: {
        x: 'time',
        y: 'Queue length'
      },
      color: '#dd6b66'
    },
    yAxis:
    {
      type: 'value',
      name: 'Queue length',
      axisLabel: {
        formatter: '{value}'
      }
    },
    legend: {
      data: ['Queue length']
    }
  }

  waitingTimeChartsOption && waitingTimeCharts.setOption(waitingTimeChartsOption)
  queueLengthChartsOption && queueLengthCharts.setOption(queueLengthChartsOption)
})

</script>

<style lang="css" scoped>
#video {
  display: none;
}
#waitingTimeCharts {
  height: 50vh;
  width: 100%;
}
#queueLengthCharts {
  height: 50vh;
  width: 100%;
}
#charts {
  margin-bottom: 8em;
  width: 100%;
}
</style>
