<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <video
          id="videoResult"
          :src="resultsVideoSrc"
          controls
        />
      </el-col>
      <el-col :span="12">
        <div id="charts" />
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
interface Props {
  resultsVideoSrc: string
  resultsData: Array<[number, number, number]> // [time, num, avgWaitingTime][]
}
const props = defineProps<Props>()

</script>

<style lang="css" scoped>
#videoResult{
  width: 45%;
}
#charts{
  width: 45%;
}
</style>
