<template>
  <div>
    <el-row
      justify="space-around"
      :gutter="20"
    >
      <el-col
        v-for="member in members"
        :key="member.memberId"
        :span="3"
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
import MemberInfoMember from 'src/components/MemberInfoMember.vue'
import { MemberInfo } from 'src/types/MemberInfo.interface'

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
    responsibility: 'Frontend Development',
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
