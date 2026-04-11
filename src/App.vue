<script setup>
import { ref } from 'vue'
import intro from './components/intro.vue'
import timeline from './components/timeline.vue'
import footer_ from './components/footer_.vue'
import { lightTheme } from 'naive-ui'

const theme = ref(lightTheme)

const themeOverrides = {
  common: {
    'primaryColor': '#7844e9',
    'primaryColorHover': '#7237f0',
    'primaryColorPressed': '#432f6e',
    'primaryColorSuppl': 'rgb(42, 148, 125)',
    'infoColor': '#00f0f0',
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
      <div style="height: 5em;"></div>
      <n-layout-content>
        <div class="main-content">
          <n-space justify="center">
            <div style="max-width: 600px; width: 100%;">
              <intro />
              <div style="margin: 4em;" />
              <timeline />
            </div>
          </n-space>
        </div>
      </n-layout-content>
      <n-layout-footer>
        <div style="margin: 8em;" />
        <!-- <footer_ /> -->
      </n-layout-footer>
    </n-layout>
  </n-notification-provider>
  </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
.main-content {
  padding: 64px 164px;
}

@media (max-width: 768px) {
  .main-content {
    padding: 32px 20px;
  }
}
</style>
