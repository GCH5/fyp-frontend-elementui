<template>
  <div v-loading="resultsLoading">
    <el-row :gutter="20">
      <el-col :span="12">
        <video
          id="videoResult"
          :src="resultsVideoSrc"
          controls
          @loadeddata="videoLoaded"
        />
      </el-col>
      <el-col :span="12">
        <div id="charts" />
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
  resultsData: Array<[number, number, number]> // [time, num, avgWaitingTime][]
}
const resultsLoading = ref(true)
const props = defineProps<Props>()
function videoLoaded () {
  resultsLoading.value = false
}
onMounted(() => {
  const chartDom = document.getElementById('charts') as HTMLDivElement
  const myChart = echarts.init(chartDom)
  const option: EChartsOption = {
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
        ['time', 'People count', 'Avg queue time'],
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
    legend: {
      data: ['People count', 'Avg queue time']
    },
    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    yAxis: [
      {
        type: 'value',
        name: 'People count',
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: 'Avg queue time',
        axisLabel: {
          formatter: '{value} s'
        }
      }
    ],
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
    ],
    series: [
      {
        type: 'line',
        smooth: true,
        symbol: 'none',
        name: 'People count',
        encode: {
          x: 'time',
          y: 'People count'
        }
      },
      {
        type: 'line',
        name: 'Avg queue time',
        yAxisIndex: 1,
        encode: {
          x: 'time',
          y: 'Avg queue time'
        },
        smooth: true,
        symbol: 'none'

      }
    ]
  }

  option && myChart.setOption(option)
})

</script>

<style lang="css" scoped>
#videoResult {
  margin-top: 3em;
  margin-left: 4em;
  width: 82%;
}
#charts {
  height: 50vh;
  width: 100%;
}
</style>
