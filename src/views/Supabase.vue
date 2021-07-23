<template>
    <div class="flex flex-col items-stretch">
        <router-link class="link" to="/">← Back to home</router-link>
        <h2 class="mb-24 font-serif text-4xl">Supabase</h2>

        <!-- <TipTap /> -->

        <div
            class="content-container"
            v-for="index in numberOfBlocks"
            :key="index"
        >
            <TextEditor
                v-if="blocks[index - 1]"
                @update="updateContent"
                :defaultContent="blocks[index - 1]"
            ></TextEditor>
        </div>

        <!-- <button class="button" @click="addBlock">New block</button> -->

        <!-- <div class="image-container" v-for="(url, index) in urls" :key="index">
            <img :src="url" alt="" />
        </div> -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TipTap from '@/components/Tiptap.vue'
import TextEditor from '../components/TextEditor.vue'

import {
    getImagesSources,
    getTableContent,
    updateTableContent,
} from '../plugins/supabase'

export default defineComponent({
    components: { TextEditor, TipTap },
    data() {
        return {
            urls: new Array(),
            blocks: new Array(),
            numberOfBlocks: 1,
        }
    },
    methods: {
        async getImages() {
            this.urls = await getImagesSources('content-images')
        },
        async getContent() {
            this.blocks = await getTableContent('content')
        },
        async updateContent(value: string) {
            updateTableContent('content', { value: 'Hello' }, value)
        },
        addBlock() {
            this.numberOfBlocks += 1
        },
    },
    mounted() {
        this.getImages()
        this.getContent()
    },
})
</script>

<style></style>
