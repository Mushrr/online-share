import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 样式
import { createPinia } from 'pinia'
import router from "./router";

const pinia = createPinia();
const app = createApp(App)

app.use(pinia); // 状态管理
app.use(elementPlus);
app.use(router);

app.mount('#app')