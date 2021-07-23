import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Supabase from '@/views/Supabase.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/supabase',
        name: 'Supabase',
        component: Supabase,
    },
    // TODO: add a fallback route 404
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router
