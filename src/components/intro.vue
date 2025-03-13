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

const show = ref(true)
const data = ref({})
onMounted(() => {
  let data_url = 'https://raw.githubusercontent.com/RaidasGrisk/raidasgrisk.github.io/static-assets/assets/intro.json'
  axios.get(data_url).then(resp => {
    data.value = resp.data
  })
})

</script>

<template>
  <n-h1 style="font-size: 50px; color: #cccccc;">Hi, my name is Raidas</n-h1><br>
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
        <n-text strong type="primary">
          <n-divider vertical />
          full stack developer
          <n-divider vertical />
          machine learning engineer
          <n-divider vertical />
          zero-knowledge-proofs tinkerer
        </n-text>
      </div>
      <br>
      <!-- <div>
        <a @click="show = !show" style="cursor: pointer">More about me...</a>
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
            <n-button tertiary circle type="info" tag="a" href="https://github.com/raidastauras" target="_blank">
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
      <n-card style="max-width: 41.2rem;">
        <div v-if="Object.keys(data).length">
          <n-table :bordered="false" :single-line="false">
            <tbody style="text-align: justify; text-justify: inter-word;">
              <tr v-for="(value, key, index) in data">
                <td style="border: 0px;"><h4>{{ key }}</h4></td>
                <td style="border: 0px;"><n-divider vertical style="height: 20px; width: 2px;"/></td>
                <td style="border: 0px;">{{ value }}</td>
              </tr>
            </tbody>
          </n-table>
        </div>
        <div v-else>
          <n-space :size="[0, 30]" vertical>
            <n-skeleton height="50px" :sharp="false" v-for="_ in Array(7)"/>
          </n-space>
        </div>
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
