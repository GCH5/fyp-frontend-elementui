<template>
  <div>
    <el-row>
      <el-col :span="24">
        <AppLink name="queue-analysis-static">
          <el-button
            size="large"
            type="primary"
            round
            @click="selectMenuIndex('/queue-analysis')"
          >
            Upload a video
          </el-button>
        </AppLink>
      </el-col>
      <el-col :span="24">
        <AppLink name="queue-analysis-live">
          <el-button
            size="large"
            type="primary"
            round
            @click="selectMenuIndex('/queue-analysis')"
          >
            Paste a live video url
          </el-button>
        </AppLink>
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
.el-col {
  margin-top: 20px;
  text-align: center;
}
</style>
