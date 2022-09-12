<script setup>
import { ref } from 'vue'
import { LogoTwitter, LogoGithub, MailOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'

const message = useMessage()

const emailButtonClick = async () => {
  await navigator.clipboard.writeText('mrraidas@gmail.com')
  message.success('email copied to clipboard')
}

</script>

<template>
  <div style="padding: 64px;">
    <n-space justify="center">
      <n-h4 style="padding-top: 12px">
        <n-text type="primary">
          Raidas Grisk
        </n-text>
      </n-h4>
      <n-divider vertical style="height: 42px;" />
      <n-space>
        <n-button tertiary circle size="large" type="info" tag="a" href="https://twitter.com/raidasg" target="_blank">
          <template #icon>
            <n-icon :component="LogoTwitter"/>
          </template>
        </n-button>
        <n-button tertiary circle size="large" type="info" tag="a" href="https://github.com/RaidasGrisk" target="_blank">
          <template #icon>
            <n-icon :component="LogoGithub"/>
          </template>
        </n-button>
        <n-button tertiary circle size="large" type="info" @click="emailButtonClick">
          <template #icon>
            <n-icon :component="MailOutline"/>
          </template>
        </n-button>
      </n-space>
    </n-space>
  </div>
</template>

<style>
</style>
