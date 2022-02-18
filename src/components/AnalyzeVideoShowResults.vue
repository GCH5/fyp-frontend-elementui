<template>
  <div v-loading="resultsLoading">
    <video
      id="videoResult"
      :src="resultsVideoSrc"
      controls
      @loadeddata="videoLoaded"
    />
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
  resultsVideoSrc: string
  resultsData: Array<[number, number, number]> // [time, Queue length, Current waiting time][]
}
const resultsLoading = ref(true)
const props = defineProps<Props>()
function videoLoaded () {
  resultsLoading.value = false
}
onMounted(() => {
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
        ...props.resultsData
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
#videoResult {
  margin-top: 3em;
  margin-left: 4em;
  width: 82%;
}
#waitingTimeCharts {
  height: 50vh;
  width: 50%;
}
#queueLengthCharts {
  height: 50vh;
  width: 50%;
}
#charts {
margin-bottom: 8em;
}
</style>
