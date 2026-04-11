<script setup>
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'
import { useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()

const data = ref([])
onMounted(async () => {
  const data_url = 'https://raw.githubusercontent.com/RaidasGrisk/raidasgrisk.github.io/static-assets/assets/data.json'
  const resp = await fetch(data_url)
  data.value = await resp.json()
})

const groupedByYear = computed(() => {
  const groups = {}
  data.value.forEach(item => {
    const year = item.time.slice(0, 4)
    if (!groups[year]) groups[year] = []
    groups[year].push(item)
  })
  return Object.keys(groups)
    .sort((a, b) => b - a)
    .map(year => ({ year, items: groups[year] }))
})

// Modal state
const showModal = ref(false)
const activeItem = ref(null)
const articleHtml = ref('')
const loadingArticle = ref(false)

const openArticle = async (item) => {
  activeItem.value = item
  articleHtml.value = ''
  showModal.value = true
  loadingArticle.value = true
  try {
    const resp = await fetch(item.description)
    articleHtml.value = marked(await resp.text())
  } finally {
    loadingArticle.value = false
  }
}
</script>

<template>
  <span :style="{ color: themeVars.textColor3 }">Work</span>
  <div style="margin: 1em;" />
  <div class="timeline">
    <template v-if="data.length">
      <div v-for="group in groupedByYear" :key="group.year" class="year-group">
        <div v-for="(item, i) in group.items" :key="i" class="row" @click="openArticle(item)">
          <span class="year">{{ i === 0 ? group.year : '' }}</span>
          <span class="title">{{ item.header }}</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="year-group">
        <div v-for="i in 7" :key="i" class="row skeleton-row">
          <div class="skeleton" :style="{ width: i === 1 ? '2.5rem' : '0' }"></div>
          <div class="skeleton" :style="{ width: (30 + Math.abs(((i * 37) % 40) - 10)) + '%' }"></div>
        </div>
      </div>
    </template>
  </div>

  <n-modal v-model:show="showModal" :mask-closable="true" style="max-width: 860px; width: 90vw; margin: 4vh auto">
    <n-card
      :title="activeItem?.header"
      :bordered="false"
      role="dialog"
      style="max-height: 88vh; display: flex; flex-direction: column; padding: 1.5rem 2.5rem;"
    >
      <template #header-extra>
        <n-text depth="3" style="font-size: 0.8rem;">{{ activeItem?.time?.slice(0, 10) }}</n-text>
      </template>

      <n-space v-if="activeItem?.tags?.length" size="small" style="margin-top: -0.5rem; margin-bottom: 1rem;">
        <n-tag v-for="tag in activeItem.tags" :key="tag" :bordered="false" size="small" type="primary" round>
          {{ tag }}
        </n-tag>
      </n-space>

      <n-space v-if="activeItem?.github_links?.length" size="small" style="margin-bottom: 1.5rem;">
        <n-button
          v-for="link in activeItem.github_links"
          :key="link.url"
          tag="a"
          :href="link.url"
          target="_blank"
          size="tiny"
          secondary
        >
          <template #icon>
            <svg height="14" width="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </template>
          {{ link.title }}
        </n-button>
      </n-space>

      <n-spin v-if="loadingArticle" style="display: flex; justify-content: center; padding: 3rem 0;" />
      <n-scrollbar v-else style="max-height: 65vh;">
        <div class="markdown-body" v-html="articleHtml" />
      </n-scrollbar>
    </n-card>
  </n-modal>
</template>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.year-group {
  display: flex;
  flex-direction: column;
  border-top: 1px solid v-bind('themeVars.dividerColor');
  padding-top: 0.4rem;
}

.row {
  display: grid;
  grid-template-columns: 3rem 1fr;
  align-items: baseline;
  gap: 0 1rem;
  padding: 0.3rem 0;
  transition: opacity 0.15s ease;
}

.row:hover {
  cursor: pointer;
}

.row:hover .title {
  color: #7844e9;
}

.year {
  color: v-bind('themeVars.textColor3');
  font-variant-numeric: tabular-nums;
  padding-top: 1px;
}

.title {
  font-weight: 500;
  color: inherit;
  transition: color 0.15s ease;
}

/* Skeleton */
.skeleton-row {
  pointer-events: none;
  padding: 0.45rem 0;
}

.skeleton {
  height: 13px;
  border-radius: 3px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>

<style>
.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  font-weight: 700;
  line-height: 1.2;
  margin: 1.2em 0 0.5em;
}
.markdown-body h1 { font-size: 2em; }
.markdown-body h2 { font-size: 1.5em; }
.markdown-body h3 { font-size: 1.25em; }

.markdown-body p {
  margin-bottom: 1em;
  line-height: 1.7;
}

.markdown-body ul,
.markdown-body ol {
  margin: 0.5em 0 1em;
  padding-left: 2em;
}

.markdown-body ul li {
  list-style-type: disc;
  padding-bottom: 0.25em;
}

.markdown-body ol li {
  list-style-type: decimal;
  padding-bottom: 0.25em;
}

.markdown-body code {
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
  font-size: 0.875em;
  padding: 2px 4px;
  border-radius: 3px;
  border: 1px solid var(--n-border-color);
  background-color: var(--n-color);
}

.markdown-body pre {
  padding: 16px;
  overflow: auto;
  font-size: 0.875em;
  line-height: 1.5;
  border-radius: 4px;
  margin-bottom: 1em;
  background-color: #f6f8fa;
  border: 1px solid #e5e7eb;
}

.markdown-body pre code {
  border: none;
  padding: 0;
  background: transparent;
  white-space: pre;
}

.markdown-body blockquote {
  margin: 0 0 1em;
  padding-left: 1em;
  border-left: 3px solid #e5e7eb;
  color: #6b7280;
}

.markdown-body img {
  max-width: 100%;
}

.markdown-body table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1em;
}

.markdown-body table th,
.markdown-body table td {
  padding: 6px 13px;
  border: 1px solid var(--n-border-color);
}

.markdown-body table tr:nth-child(2n) {
  background-color: #f8f8f8;
}
</style>
