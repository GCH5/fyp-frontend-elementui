<template>
  <div>
    <el-row justify="center">
      <el-col :span="1">
        <AppLink name="analyze-video">
          <el-button
            size="large"
            type="primary"
            round
            @click="selectMenuIndex('/analyze-video')"
          >
            GET STARTED
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
