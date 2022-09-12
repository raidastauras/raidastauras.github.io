import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// naiveui - tailwind css conflict
// https://www.naiveui.com/en-US/os-theme/docs/style-conflict
// https://github.com/tusen-ai/naive-ui/issues/2782
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

// naive-ui
import naive from 'naive-ui'

// sal
// import sal from "sal.js"
// import "/node_modules/sal.js/dist/sal.css"

const app = createApp(App)

app.use(naive)
// app.use(sal)
app.mount('#app')
