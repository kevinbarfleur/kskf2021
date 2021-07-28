<template>
    <div class="text-editor-container">
        <div class="actions" v-if="isEdited">
            <button class="toggle-view" @click="saveBlock">
                <CheckIcon
                    v-if="isLocalLoading"
                    class="w-5 h-5 m-0 text-green-500"
                />
                <SaveIcon v-else class="w-5 h-5 m-0 text-blue-400" />
            </button>
            <button class="toggle-view" @click="deleteBlock">
                <TrashIcon class="w-5 h-5 m-0 text-red-400" />
            </button>
        </div>
        <QuillEditor
            :toolbar="toolbarOptions"
            class="rich-text-container"
            v-if="isEdited"
            v-model:content="content"
            contentType="html"
            @textChange="handleContent"
            theme="snow"
        />
        <div class="prose content" v-html="content" v-else></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

import { TrashIcon, CheckIcon, SaveIcon } from '@heroicons/vue/solid'

export default defineComponent({
    components: { QuillEditor, TrashIcon, CheckIcon, SaveIcon },
    props: {
        defaultContent: { type: Object },
        isEdited: { type: Boolean },
        isLoading: { type: Boolean },
        target: { type: Number },
    },
    data() {
        return {
            content: '',
            toolbarOptions: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ size: ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],

                [{ color: [] }, { background: [] }],
                [{ font: [] }],
                [{ align: [] }],

                ['clean'],
            ],
        }
    },
    computed: {
        isLocalLoading() {
            return this.isLoading && this.target === this.defaultContent?.id
        },
    },
    methods: {
        handleContent() {
            // console.log(this.content)
        },
        saveBlock() {
            this.$emit('update', {
                value: this.content,
                itemId: this.defaultContent?.id,
            })
        },
        deleteBlock() {
            this.$emit('delete', { id: this.defaultContent?.id })
        },
    },
    created() {
        this.content = this.defaultContent?.content || ''
    },
})
</script>

<style lang="postcss">
.text-editor-container {
    position: relative;
}
.actions {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-110%);
}

.ql-toolbar {
    border: 1px solid lightgray !important;
    border-radius: 0.35em;
    margin-bottom: 12px !important;
}
.ql-editor,
.ql-container {
    border: none !important;
}

.editor-switch-enter-active,
.editor-switch-leave-active {
    transition: opacity 0.5s ease;
}

.editor-switch-enter-from,
.editor-switch-leave-to {
    opacity: 0;
}
</style>
