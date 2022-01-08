<template>
    <div>
        <el-row justify="space-around" :gutter="20">
            <el-col v-for="member in members" :key="member.memberId" :span="3">
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