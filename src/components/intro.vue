<script setup>
import { onMounted } from 'vue'
import { LogoTwitter, LogoGithub, MailOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'

const message = useMessage()

const emailButtonClick = async () => {
  await navigator.clipboard.writeText('mrraidas@gmail.com')
  message.success('email copied to clipboard')
}

</script>

<template>
  <n-h1 style="font-size: 50px;">Hi, my name is Raidas</n-h1><br>
  <n-space vertical :size="25">

    <n-space>
    <n-avatar
      round
      :size="250"
      :src="'https://raw.githubusercontent.com/RaidasGrisk/raidasgrisk.github.io/static-assets/assets/profile_pic.png'"
      style="border: 4px solid #999999;"
    /><br><br>
    <div style="max-width: 360px; position: relative; top: 50%; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%);">
      <div>
        <n-text strong depth="3" type="primary" style="font-size: 25px">
          I am
        </n-text>
        <n-text strong type="info">
          <n-divider vertical />
          full stack developer
          <n-divider vertical />
          machine learning engineer
          <n-divider vertical />
          aspiring blockchain developer
        </n-text>
      </div>
      <br>
      <div>
        <n-text strong depth="3" type="primary" style="font-size: 25px">
          I enjoy / strive
        </n-text>
        <n-text strong>
          <n-divider vertical />
          learning
          <n-divider vertical />
          trying out new stuff
          <n-divider vertical />
          writing well structured, readable and efficient code
        </n-text>
      </div>
      <br>
      <n-tag round :bordered="false" :size="'large'" style="padding: 30px;">
        <template #default>
          <n-space>
            <n-button tertiary circle type="info" tag="a" href="https://twitter.com/raidasg" target="_blank">
              <template #icon>
                <n-icon :component="LogoTwitter"/>
              </template>
            </n-button>
            <n-button tertiary circle type="info" tag="a" href="https://github.com/RaidasGrisk" target="_blank">
              <template #icon>
                <n-icon :component="LogoGithub"/>
              </template>
            </n-button>
            <n-button tertiary circle type="info" @click="emailButtonClick">
              <template #icon>
                <n-icon :component="MailOutline"/>
              </template>
            </n-button>
          </n-space>
        </template>
      </n-tag>
    </div>
    </n-space>
  </n-space>
  <br><br><br><br>
</template>

<style>

</style>
