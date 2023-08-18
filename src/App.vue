<script setup>
import { ref } from 'vue'
import intro from './components/intro.vue'
import timeline from './components/timeline.vue'
import footer_ from './components/footer_.vue'
import { darkTheme, lightTheme } from 'naive-ui'

import { SunnyOutline, MoonOutline } from '@vicons/ionicons5'

const theme = ref(darkTheme)

const themeOverrides = {
  common: {
    'primaryColor': '#7844e9',
    'primaryColorHover': '#7237f0',
    'primaryColorPressed': '#432f6e',
    'primaryColorSuppl': 'rgb(42, 148, 125)',
    'infoColor': '#00F0B5',
    'infoColorHover': '#70ffdb',
    'infoColorPressed': '#00A37A',
    'borderRadius': '7px',
  }
}

</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
  <n-message-provider>
  <n-notification-provider>
    <n-layout>
      <!-- Defining page header here, because else
      would have to create a store for theme vars.
      Definitely not optimal, but else it will get
      too complicated for such a trivial thing -->
      <n-layout-header bordered>
        <n-page-header subtitle="" style="padding: 32px;">
          <template #title>
            <a href="/" style="text-decoration: none; color: inherit">
              Raidas
            </a>
          </template>
          <template #avatar>
            <n-avatar :size="50" style="font-size: 20px">
              ‍🧑‍💻
            </n-avatar>
          </template>
          <template #extra>
            <n-space>
              <n-button type="primary" @click="theme = theme.name == 'dark' ? lightTheme : darkTheme">
                <template #icon>
                  <n-icon :component="theme.name == 'dark' ? SunnyOutline : MoonOutline" />
                </template>
              </n-button>
            </n-space>
          </template>
        </n-page-header>
      </n-layout-header>
      <n-layout-content content-style="padding: 32px;">
        <n-space justify="center">
          <div>
            <intro />
            <timeline />
          </div>
        </n-space>
      </n-layout-content>
      <n-layout-footer>
        <footer_ />
      </n-layout-footer>
    </n-layout>
  </n-notification-provider>
  </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
