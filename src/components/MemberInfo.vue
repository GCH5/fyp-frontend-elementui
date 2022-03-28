<template>
    <div>
        <el-row
            class="member-info"
            justify="space-around"
        >
            <el-col
                style="padding-top:12px"
                v-for="member in members"
                :key="member.memberId"
                :xs="10"
                :md="4"
            >
                <MemberInfoMember
                    :lastName="member.lastName"
                    :firstName="member.firstName"
                    :responsibility="member.responsibility"
                    :memberId="member.memberId"
                ></MemberInfoMember>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import MemberInfoMember from "./MemberInfoMember.vue";
import MemberInfo from "./MemberInfoMember.vue";

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
    },
]
</script>
<style lang="css" scoped>
  .member-info{
      padding-top: 36px;
      padding-bottom: 140px;
  }
</style>
