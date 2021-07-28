import { createApp } from 'vue'

import App from './App.vue'
import SupabasePlugin from './plugins/supabase'
import router from './router'

import './style/index.css'

// Pas fou
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $db: {
            getTableContent: Function
            updateTableContent: Function
        }
    }
}

const app = createApp(App)
app.use(router).use(SupabasePlugin)
app.mount('#app')
