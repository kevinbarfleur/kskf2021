<template>
    <section class="flex flex-col items-center justify-center">
        <h1 class="font-serif heading-4xl">{{ hello }}</h1>
        <button @click="addCount" class="button">Add +</button>
        <div>Count: {{ count }}</div>

        <router-link class="link" to="/supabase">Supabase →</router-link>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            hello: 'Hello Vite & Vue',
            count: 0,
        }
    },
    methods: {
        addCount() {
            this.count += 1
        },
    },
    mounted() {},
})
</script>
