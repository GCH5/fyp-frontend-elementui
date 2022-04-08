<template>
  <div>
    <el-row
      style="padding-bottom:12px"
      justify="center"
    >
      <el-col
        :xs="6"
        :md="1"
      >
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
