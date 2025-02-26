import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles/index.scss'

import App from './App.vue'
import router from './router'
// 引入 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 中文化的支持
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
