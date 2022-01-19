<template>
  <div>
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">
          Awesome Queue Analysis
        </h1>
        <p>Analyze a queue by surveillance videos</p>
      </div>
    </div>
    <HomeNav />
    <AppIntro />
    <MemberInfo />
  </div>
</template>

<script lang="ts" setup>
import AppIntro from 'src/components/AppIntro.vue'
import MemberInfo from 'src/components/MemberInfo.vue'
import HomeNav from 'src/components/HomeNav.vue'
// import TestComponent from 'src/components/TestComponent.vue'

</script>
<style lang="css" scoped>
.banner {
  background: #409eff;
  box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3),
    inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
  color: #fff;
  padding: 2rem;
  margin-bottom: 2rem;
}
.banner p {
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 300 !important;
  margin-bottom: 0px;
}
.banner h1 {
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  font-weight: 700 !important;
  text-align: center;
  font-size: 3.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 0px;
}
</style>
