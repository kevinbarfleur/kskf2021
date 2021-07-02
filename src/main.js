// import Vue from 'vue'
// import App from './App.vue'
// import './index.css'
// import router from './router/index'

// new Vue({
//     render: (h) => h(App),
// }).$mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

import './index.css'

createApp(App).use(router).mount('#app')
