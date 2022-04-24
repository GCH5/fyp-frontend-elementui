<template>
  <div>
    <el-row
      justify="space-around"
      :gutter="10"
    >
      <el-col
        :xs="24"
        :md="12"
      >
        <img
          src="src/assets/img/queue.gif"
          alt="bird"
        >
      </el-col>
      <el-col
        :xs="24"
        :md="8"
        style="font-size: 18px;"
      >
        <p>
          Are you tired of the long queues you encounter everyday in Hong Kong and urgently need something to change the status quo?
        </p>
        <p>
          Are you troubled by the economic loss caused by the long queuing time and eager for an analytics tool to help reallocate your resources?
        </p>
        <p>
          Our awesome real-time queue analysis system would be an excellent choice for you! Whether it is user-uploaded video data or live streaming data, we can analyze them all. Within a few simple steps, all the related statistics such as the predicted waiting time and the queue length will be shown on the screen intuitively using charts. Click <AppLink name="queue-analysis">
            <span
              style="color: #409eff;font-weight: bold;cursor: pointer;"
              @click="selectMenuIndex('/queue-analysis')"
            >here</span>
          </AppLink> and start the amazing queue analysis journey with us now!
        </p>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { menuActiveIndex } from 'src/store/store'
const selectMenuIndex = (index: string) => {
  menuActiveIndex.value = index
}
</script>
<style lang="css" scoped>
  a {
    text-decoration: none;
  }
</style>
