<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { SwapVerticalOutline, RemoveOutline, RadioButtonOffOutline } from '@vicons/ionicons5'
import axios from 'axios'

// markdown parser
import Markdown from 'vue3-markdown-it';
// import 'highlight.js/styles/monokai-sublime.css';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

// import data_ from '../assets/temp/data.json'
const data = ref([])
onMounted(() => {
  let data_url = 'https://raw.githubusercontent.com/RaidasGrisk/personal_website/static-assets/assets/data.json'
  axios.get(data_url).then(resp => {
    data.value = resp.data
    // fetch md from static-assets
    data.value.forEach((item, i) => {
      axios.get(data.value[i].description).then(resp => {
        data.value[i].description = resp.data
      })
    })
  })
})

const reverseData = () => {
  data.value = data.value.reverse()
}

const whatIstheDataOrder = () => {
  if (data.value.length) {
    let first = data.value[0]['time'].slice(0, 4)
    let last = data.value[data.value.length - 1]['time'].slice(0, 4)
    return first > last ? 'new first' : 'last first'
  }
}

</script>

<template>
  <div v-if="data.length > 1">
    <n-space>
      <n-divider class="line" style="width: 2px; left: -8px;" vertical></n-divider>
      <n-button @click="reverseData()" strong secondary type="primary" style="left: -10px">
        <!-- {{ whatIstheDataOrder() }} -->
        <template #icon>
          <n-icon :component="SwapVerticalOutline" />
        </template>
      </n-button>
    </n-space>

    <n-timeline style="left: -6px">
      <n-timeline-item
      v-for="item in data"
      type="success"
      >
      <template #icon>
        <!-- <n-icon :size="20">
          <RadioButtonOffOutline />
        </n-icon> -->
        <n-icon :size="50" style="padding-top: 7px">
          <RemoveOutline />
        </n-icon>
      </template>
        <template #header>
          <span class="text-2xl" style="padding-left: 0px">
            {{ item.time }}
          </span>
        </template>
        <template #footer>
          <!-- // FOOTER -->
        </template>
        <template #default>
          <n-card
            title="Card Segmented Demo"
            :segmented="{
              content: true,
              footer: 'soft'
            }"
            style="max-width: 40rem"
            hoverable
          >
          <template #header>
            <span class="text-2xl">
              {{ item.header }}
            </span>
            <n-space>
              <n-tag :bordered="false" size="small" type="primary" round v-for="tag in item.tags">
                {{ tag }}
              </n-tag>
            </n-space>
          </template>
            <template #header-extra>
              <!-- // header extra -->
            </template>
              <span v-html="marked(item.description)" style="text-align: justify; text-justify: inter-word;" class="markdown-body"/>
            <template #footer v-if="item.github_links.length > 0">
              <n-space size="small">
                <template v-for="link in item.github_links">
                <a :href="link.url" target="_blank">
                  <n-button strong secondary type="info">
                    <template #icon>
                      <n-icon size="18">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
                      </n-icon>
                    </template>
                    {{ link.title }}
                  </n-button>
                </a>
              </template>
              </n-space>
            </template>
            <template #action>
              <n-h3 prefix="bar" type="info">
                Tech stack:
              </n-h3>
              <n-space size="small">
                <template v-for="tech in item.tech_stack">
                  <n-tooltip trigger="hover">
                    <template #trigger>
                      <n-avatar round size="" style="border: 2px solid #999999; backgroundColor: white" class="zoom">
                        <n-icon size="22">
                          <img :src="tech.icon_url"/>
                        </n-icon>
                      </n-avatar>
                    </template>
                    {{ tech.title }}
                  </n-tooltip>
                </template>
            </n-space>
            </template>
          </n-card>
        </template>
      </n-timeline-item>
    </n-timeline>
  </div>
  <div v-else v-for="i in 5">
    <br><br>
    <br><br>
    <n-card>
    <template #header>
      <n-skeleton size="medium" width="33%" :repeat="1"/>
    </template>
    <n-skeleton text style="width: 100%"  :repeat="4"/>
    <n-skeleton text style="width: 60%" />
      <template #footer>
      </template>
      <template #action>
        <n-space>
          <n-skeleton circle size="medium" />
          <n-skeleton circle size="medium" />
          <n-skeleton circle size="medium" />
        </n-space>
      </template>
    </n-card>
  </div>
</template>

<style>



code {
    font-family: Consolas, Monaco, Andale Mono, monospace;
    line-height: 1.5;
    font-size: 13px;
}

.markdown-body pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  /* background-color: #999999; */
  border-radius: 2px;
}

.zoom {
  transition: transform .5s; /* Animation */
}

.zoom:hover {
  transform: scale(1.1); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}


.line{
  -webkit-animation: increase 3s;
  -moz-animation:    increase 3s;
  -o-animation:      increase 3s;
  animation:         increase 3s;
  animation-fill-mode: forwards;
}

@keyframes increase {
  100% {
    height: 64px;
  }
}


/* HTML5 display-role reset for older browsers */

/* Actual Markup */

/* Headings */
h1,h2,h3,h4,h5,h6{
  font-weight:700;
  line-height:1em;
  -webkit-font-smoothing: antialiased;
  margin: 15px 0px;
}
h1{ font-size:2.5em; }
h2{ font-size:2em; }
h3{ font-size:1.5em; }
h4{ font-size:1.2em; }
h5{ font-size:1em; }
h6{ font-size:0.9em; }

/* Elements */
p{
  margin-block-end: 1em;
}

img{
  max-width:100%;
  border: 0;
  -ms-interpolation-mode: bicubic;
  vertical-align: middle;
}

/* blockquote{
  color:#666666;
  margin:0;
  padding-left: 3em;
  border-left: 0.5em #EEE solid;
} */

/* hr {
  display: block;
  height: 2px;
  border: 0;
  border-bottom: 1px solid #CCC;
  margin: 1em 0;
  padding: 0;
} */

/* b, strong {
  font-weight: 700;
} */

/* em, i {
  font-style: italic;
} */

/* dfn {
  font-style: italic;
} */

/* ins {
  background: #ff9;
  color: #000;
  text-decoration: none;
} */

/* mark {
  background: #ff0;
  color: #000;
  font-style: italic;
  font-weight: 700;
} */

/* sub, sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align:
  baseline;
} */

/* sup { top: -0.5em; } */
/* sub { bottom: -0.25em; } */


/* Lists */
ul, ol {
  margin: 1em 0;
  padding: 0 0 0 2em;
}

ol li {
  list-style-type: decimal;
  padding-bottom: 0.50em;
}

ul li {
  list-style-type: disc;
  padding-bottom: 0.50em;
}

li p:last-child {
  margin:0
}

dd {
  margin: 0 0 0 2em;
}


/* Tables */
/* table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

td {
  vertical-align: top;
}

table th {
  font-weight: 700;
}

table th, table td {
  border: 1px solid #ccc;
  padding: 6px 13px;
}

table tr {
  border-top: 1px solid #ccc;
  background-color: #fff;
}

table tr:nth-child(2n) {
  background-color: #f8f8f8;
} */

/* Code */
pre, code, tt {
  font-size: 0.98em;
  font-size: 13px;
  line-height: 19px;
  font-family: Consolas, Courier, Monospace;
}

code, tt {
  margin: 0px;
  padding: 2px;
  white-space: nowrap;
  border: 1px solid var(--n-border-color);
  background-color: var(--n-background-color);
  border-radius: 3px;
  color: var(--n-text-color);
}

pre {
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  overflow: auto;
  padding: 6px 10px;
  border-radius: 3px;
}

pre code, pre tt {
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0;
  white-space: pre;
  border: none;
  background: transparent;
}

@media only screen and (min-width: 480px) {
  body{font-size:14px;}
}

@media only screen and (min-width: 768px) {
  body{font-size:16px;}
}

@media print {
  body{font-size:13pt; max-width:80%;}
  a, a:visited { text-decoration: underline; }
  @page :left { margin: 15mm 20mm 15mm 10mm; }
  @page :right { margin: 15mm 10mm 15mm 20mm; }
  p, h2, h3 { orphans: 3; widows: 3; }
  h2, h3 { page-break-after: avoid; }
}

</style>
