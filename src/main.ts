import { createApp } from 'vue'

import App from './App.vue'
// import supabase from './plugins/supabase'
import router from './router'

import './style/index.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
