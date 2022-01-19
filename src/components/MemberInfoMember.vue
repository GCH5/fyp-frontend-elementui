<template>
  <div class="card">
    <el-card :body-style="{ padding: '0px' }">
      <img
        :src="`src/assets/img/memberAvatar${props.memberId}.jpg`"
        :alt="`memberAvatar${props.memberId}`"
        class="image"
      >
      <div>
        <h3 style="text-align:center">
          {{ props.lastName }} {{ props.firstName }}
        </h3>
        <p
          style="font-size: 13px;line-height: 1.4em;text-align: center;font-style: italic;font-family: futura-lt-w01-light,sans-serif;color: #8B0000;"
          class="introduct"
        >
          Responsible for
          <br>
          {{ props.responsibility }}
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
/**
 * Currently Vue does not support imported type/interface used as the type parameter of defineProps<>
 * https://github.com/vuejs/core/issues/4294
 */
interface MemberInfo {
  lastName: string,
  firstName: string,
  responsibility: string,
  memberId: string
}

const props = defineProps<MemberInfo>()
</script>

<style lang="css" scoped>
.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.introduct {
  font-family: "futura-lt-w01-light, sans-serif";
}
.card {
  background-color: #909399;
}
</style>
