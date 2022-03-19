<template>
  <div>
    <el-row justify="center">
      <el-col :span="1">
        <AppLink name="crowd-counting-static">
          <el-button
            size="large"
            type="primary"
            round
            @click="selectMenuIndex('/crowd-counting')"
          >
            Upload a video
          </el-button>
        </AppLink>
      </el-col>
      <el-col :span="1">
        <AppLink name="crowd-counting-live">
          <el-button
            size="large"
            type="primary"
            round
            @click="selectMenuIndex('/crowd-counting')"
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
</style>
