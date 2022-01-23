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
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
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
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
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
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: ['People count', 'Avg queue time']
    },
    xAxis: [
      {
        type: 'category',
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'People count',
        min: 0,
        max: 21,
        interval: 3,
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: 'Avg queue time',
        min: 0,
        max: 120,
        interval: 20,
        axisLabel: {
          formatter: '{value} s'
        }
      }
    ],
    series: [
      { type: 'line' },
      {
        type: 'line',
        yAxisIndex: 1
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
