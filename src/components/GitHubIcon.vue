<script lang="ts">
import { Github } from '@vicons/fa'
// or

// 你可以直接使用渲染为 SVG 的组件
// 或者把它包裹在 @vicons/utils 提供的 Icon 组件中

import { Icon } from '@vicons/utils'

export default {
  components: {
    Icon,
    Github
  }
}
</script>

<template>
  <Icon>
    <Github />
  </Icon>
</template>
