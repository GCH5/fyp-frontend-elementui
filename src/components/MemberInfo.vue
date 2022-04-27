<template>
  <div>
    <el-row
      class="member-info"
      justify="space-around"
    >
      <el-col
        v-for="member in members"
        :key="member.memberId"
        style="padding-top:12px"
        :xs="10"
        :md="4"
      >
        <MemberInfoMember
          :last-name="member.lastName"
          :first-name="member.firstName"
          :responsibility="member.responsibility"
          :member-id="member.memberId"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import MemberInfo from './MemberInfoMember.vue'

const members = <MemberInfo[]>[
  {
    lastName: 'LI',
    firstName: 'Pingjiang',
    responsibility: 'Model Training',
    memberId: '1'
  },
  {
    lastName: 'LU',
    firstName: 'Xinbo',
    responsibility: 'System Design',
    memberId: '2'
  },
  {
    lastName: 'SHEN',
    firstName: 'Ye',
    responsibility: 'Frontend Development',
    memberId: '3'
  },
  {
    lastName: 'WU',
    firstName: 'Sik Chit',
    responsibility: 'Server Implementation',
    memberId: '4'
  }
]
</script>
<style lang="css" scoped>
  .member-info{
      padding-top: 36px;
      padding-bottom: 140px;
  }
</style>
