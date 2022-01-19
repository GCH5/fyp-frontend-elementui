<template>
  <div>
    <el-avatar
      :size="100"
      :src="`src/assets/img/memberAvatar${props.memberId}.jpg`"
      :alt="`memberAvatar${props.memberId}`"
    />
    <h3>{{ props.lastName }}</h3>
    <h3>{{ props.firstName }}</h3>
    <p>
      Responsible for
      <br>
      {{ props.responsibility }}
    </p>
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
