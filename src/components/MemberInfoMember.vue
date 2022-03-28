<template>
  <div class="card">
    <el-card :body-style="{ padding: '0px' }">
      <el-row :gutter="10" justify="center">
        <el-col :xs="14" :md="11">
          <el-avatar
            size="large"
            class="image"
            :alt="`memberAvatar${props.memberId}`"
            :src="getImageUrl(props.memberId)"
          ></el-avatar>
        </el-col>
      </el-row>

      <div>
        <h3 style="text-align:center">{{props.lastName}}</h3>
        <h3 style="text-align:center">{{props.firstName}}</h3>
        <p
          style="font-size: 13px;line-height: 1.4em;text-align: center;font-style: italic;font-family: futura-lt-w01-light,sans-serif;color: #8B0000;"
          class="introduct"
        >
          Responsible for
          <br />
          {{props.responsibility}}
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  /**
   * Currently Vue does not support imported type/interface used as the type parameter of defineProps<>
   * See: https://github.com/vuejs/core/issues/4294
   */
  interface MemberInfo {
    lastName: string,
    firstName: string,
    responsibility: string,
    memberId: string
  }

  function getImageUrl (memberId: string) {
    return new URL(`../assets/img/memberAvatar${memberId}.jpg`, import.meta.url).href
  }

  const props = defineProps<MemberInfo>()
  </script>

  <style lang="css" scoped>
  .el-avatar--large {
      --el-avatar-size: 112px;
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
