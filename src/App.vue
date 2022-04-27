<template>
  <div>
    <AppNavigation />
    <div class="main">
      <RouterView />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from './components/AppFooter.vue'
import AppNavigation from './components/AppNavigation.vue'
</script>

<style>
.main {
  margin-bottom: 120px;
}
</style>
