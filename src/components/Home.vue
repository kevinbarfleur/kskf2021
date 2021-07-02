<template>
    <div id="home">
        {{ hello }}
        <button
            @click="addCount"
            class="
                w-max
                rounded
                border-2
                bg-indigo-400
                text-white
                px-3
                py-1
                my-4
            "
        >
            Add +
        </button>
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
#home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
