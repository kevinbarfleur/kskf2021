<template>
    <div id="home" class="container-col-center">
        <h1 class="title">{{ hello }}</h1>
        <button @click="addCount" class="button">Add +</button>
        <div>Count: {{ count }}</div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return { hello: 'Hello Vite & Vue', count: 0 }
    },
    methods: {
        addCount() {
            this.count += 1
        },
    },
})
</script>

<style lang="scss">
.container-col-center {
    @apply flex flex-col justify-center items-center;
}

#home {
    .title {
        @apply text-4xl mb-8 font-semibold;
    }
    .button {
        @apply w-max rounded border-2 bg-indigo-400 text-white px-3 py-1 my-4 transition-all duration-300;
    }
    .button:hover {
        @apply bg-indigo-500;
    }
}
</style>
