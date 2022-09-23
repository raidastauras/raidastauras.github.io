<script setup>
import { onMounted, ref } from 'vue'
import { LogoTwitter, LogoGithub, MailOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import axios from 'axios'

const message = useMessage()

const emailButtonClick = async () => {
  await navigator.clipboard.writeText('mrraidas@gmail.com')
  message.success('email copied to clipboard')
}

const show = ref(false)
// const data = {
//   '🎯': "I'm progress oriented, so I lean towards seeing things as they should be instead of as they are.",
//   '🌶️': "Usually I'm curious to try out the newest and hottest tech.",
//   '🔦': "I tend to care about how things actually work. Seldom do I manage to grasp all, but doing this is very rewarding.",
//   '🖼️': "I embrace the unusual ways to solve problems / implement things. It doesn't work all the time, but helps me learn and understand why the conventional / well tested solutions are the way they are (which is mostly the optimal way).",
//   '⚗️': "I think that scientific method and science in general is the way to go in almost every situation.",
//   '🐝': "I tend to work smart rather than hard. Also, am completely not afraid of working really hard.",
// }

const data = ref({})
onMounted(() => {
  let data_url = 'https://raw.githubusercontent.com/RaidasGrisk/raidasgrisk.github.io/static-assets/assets/intro.json'
  axios.get(data_url).then(resp => {
    data.value = resp.data
  })
})

</script>

<template>
  <n-h1 style="font-size: 50px;">Hi, my name is Raidas</n-h1><br>
  <n-space vertical :size="25">
    <n-space>
    <n-avatar
      @click="show = !show"
      round
      :size="250"
      :src="'https://raw.githubusercontent.com/RaidasGrisk/raidasgrisk.github.io/static-assets/assets/profile_pic.png'"
      style="border: 4px solid #999999; cursor: pointer;"
      class="inner-img"
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
      <!-- <br> -->
      <!-- <div>
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
      </div> -->
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
    <n-collapse-transition :show="show">
      <br>
      <n-card style="max-width: 41.2rem; ">
        <n-table :bordered="false" :single-line="false">
          <tbody style="text-align: justify; text-justify: inter-word;">
            <tr v-for="(value, key) in data">
              <td style="border: 0px;"><h4>{{ key }}</h4></td>
              <td style="border: 0px;"><n-divider vertical style="height: 20px; width: 2px;"/></td>
              <td style="border: 0px;">{{ value }}</td>
            </tr>
          </tbody>
        </n-table>
      </n-card>
    </n-collapse-transition>
  </n-space>
  <br><br><br><br>
</template>

<style scoped>
.inner-img {
  transition: 0.5s;
}

.inner-img:hover {
  transform: scale(1.025);
}

</style>
