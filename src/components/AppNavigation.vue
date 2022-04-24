<template>
  <nav>
    <div>
      <el-row justify="space-between">
        <el-col :span="6">
          <span style="position: absolute;top: 50%;transform: translateY(-50%);">
            <AppLink
              class="navbar-brand"
              name="home"
              @click="selectHomePage"
            >Awesome Queue Analysis</AppLink>
          </span>
        </el-col>
        <el-col :span="7">
          <el-menu
            router
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item
              v-for="link in navLinks"
              :key="link.name"
              :index="link.index"
            >
              {{ link.title }}
            </el-menu-item>
            <a
              class="icon-header"
              :href="githubLink"
              title="GitHub"
              target="_blank"
              rel="noreferrer noopener"
            >
              <GitHubIcon />
            </a>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </nav>
</template>

<script setup lang="ts">
import GitHubIcon from 'src/components/GitHubIcon.vue'
import { menuActiveIndex as activeIndex } from 'src/store/store'

import type { AppRouteNames } from 'src/router'
import type { RouteParams } from 'vue-router'
const githubLink = 'https://github.com/lxb007981/fyp2021-2022/'
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = key
}

const selectHomePage = () => {
  activeIndex.value = '/'
}

interface NavLink {
  name: AppRouteNames
  params?: Partial<RouteParams>
  title: string
  icon?: string
  index?: string
}

const navLinks = <NavLink[]>[
  {
    name: 'home',
    title: 'Home',
    index: '/'
  },
  {
    name: 'queue-analysis',
    title: 'Queue Analysis',
    index: '/queue-analysis'

  },
  {
    name: 'crowd-counting',
    title: 'Crowd Counting',
    index: '/crowd-counting'

  },
  {
    name: 'about',
    title: 'About',
    index: '/about'
  }
]
</script>

<style lang="css" scoped>
.navbar-brand {
  font-family: "Titillium Web", sans-serif;
  font-size: 1.5rem !important;
  padding-top: 0rem !important;
  margin-right: 2rem !important;
  color: #409eff !important;
}
.navbar-brand:focus,
.navbar-brand:hover {
  text-decoration: none;
}
.navbar-brand > img {
  display: block;
}

a {
  background-color: transparent;
}
.icon-header {
  line-height: var(--el-menu-item-height);
  padding: 0 20px;
}

a:active {
  outline: 0;
}

a:hover {
  outline: 0;
}
a {
  color: #409eff;
  text-decoration: none;
}
a:focus,
a:hover {
  color: #3e88d8;
  text-decoration: underline;
}
a:focus {
  outline: thin dotted;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}

a:not([href]) {
  color: inherit;
  text-decoration: none;
}
a:not([href]):focus,
a:not([href]):hover {
  color: inherit;
  text-decoration: none;
}
a:not([href]):focus {
  outline: none;
}
</style>
