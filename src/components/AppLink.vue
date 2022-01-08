<template>
  <router-link
    :aria-label="props.name"
    :to="props"
    v-bind="attrs"
  >
    <slot />
  </router-link>
</template>

<script setup lang="ts">
import type { AppRouteNames } from 'src/router'
import { useAttrs } from 'vue'

interface Props {
  name: AppRouteNames,
}

const props = defineProps<Props>()

const attrs = useAttrs()
</script>
