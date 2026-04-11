<script setup>
import { onMounted, ref } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()

const emailButtonClick = async () => {
  await navigator.clipboard.writeText('mrraidas@gmail.com')
  message.success('email copied to clipboard')
}

const data = ref({})
onMounted(async () => {
  const data_url = 'https://raw.githubusercontent.com/RaidasGrisk/raidasgrisk.github.io/static-assets/assets/intro.json'
  const resp = await fetch(data_url)
  data.value = await resp.json()
})

</script>

<template>
  <n-flex size="small" vertical>
    <n-text style="font-size: 18px;" strong>Raidas Tauras</n-text>
    <div>
      <n-text :depth="3">
        Full stack developer
        <n-divider vertical />
        Machine learning engineer
        <n-divider vertical />
        Zero-knowledge-proofs tinkerer
      </n-text>
    </div>
    <div>
      Find me on 
      <n-button text tag="a" href="https://twitter.com/raidasg" target="_blank" style="text-decoration: underline; text-decoration-color: #ccc;">X</n-button>,
      <n-button text tag="a" href="https://github.com/raidastauras" target="_blank" style="text-decoration: underline; text-decoration-color: #ccc;">Github</n-button>,
      or reach me via <n-button text @click="emailButtonClick" style="text-decoration: underline; text-decoration-color: #ccc;">email</n-button>.
    </div>
  </n-flex>
  <div style="margin: 3em;" />
  <template v-if="Object.keys(data).length">
    <div style="display: grid; grid-template-columns: auto auto 1fr; gap: 8px 16px; align-items: center; text-align: justify; text-justify: inter-word;">
      <template v-for="(value, key) in data" :key="key">
        <h4 style="margin: 0;">{{ key }}</h4>
        <n-divider vertical style="width: 2px;" />
        <span><n-text :depth="2">{{ value }}</n-text></span>
      </template>
    </div>
  </template>
  <template v-else>
    <n-flex vertical :size="16">
      <n-skeleton height="50px" :sharp="false" v-for="_ in Array(7)" :key="_"/>
    </n-flex>
  </template>
</template>

<style scoped>
</style>
