import { createApp } from 'vue'
// @ts-ignore
import  * as  ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import router from './router'
// @ts-ignore
import {createRouter,createWebHistory} from 'vue-router';

// 创建pinia实例
const pinia = createPinia()
const app = createApp(App)
// 挂载到根实例上
createApp(App).use(pinia).use(router).use(ElementPlus).mount('#app')
for (const[key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

