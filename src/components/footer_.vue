<script setup>
import { useMessage, useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()
const message = useMessage()

const emailButtonClick = async () => {
  await navigator.clipboard.writeText('mrraidas@gmail.com')
  message.success('email copied to clipboard')
}
</script>

<template>
  <div>
    <n-text :depth="3">
      Find me on
      <n-button text tag="a" href="https://twitter.com/raidasg" target="_blank" class="subtle-link">X</n-button>,
      <n-button text tag="a" href="https://github.com/raidastauras" target="_blank" class="subtle-link">Github</n-button>,
      or <n-button text @click="emailButtonClick" class="subtle-link">email</n-button>.
    </n-text>
  </div>
</template>

<style scoped>
.subtle-link {
  text-decoration: underline;
  text-decoration-color: v-bind('themeVars.dividerColor');
  text-decoration-thickness: 2px;
}
</style>
