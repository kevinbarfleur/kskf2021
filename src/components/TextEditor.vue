<template>
    <div class="text-editor">
        <button class="toggle-view button-round" @click="toggleEdition">
            {{ isEdited ? 'Done' : 'Edit' }}
        </button>
        <div class="text-editor-container" v-show="isEdited">
            <div id="editor"></div>
        </div>
        <!-- <QuillEditor theme="snow" /> -->
        <div class="content" v-html="content" v-show="!isEdited"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Quill from 'quill'

// import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default defineComponent({
    // components: { QuillEditor },
    props: {
        defaultContent: {
            type: Object,
        },
    },
    data() {
        return {
            content: '',
            quill: {} as object,
            isEdited: false,
        }
    },
    methods: {
        initEditor() {
            this.$el.querySelector('#editor').innerHTML =
                this.defaultContent?.content

            this.quill = new Quill('#editor', {
                theme: 'snow',
            })

            this.content = this.quill.root.innerHTML

            this.quill.on('text-change', () => {
                this.content = this.quill.root.innerHTML
            })
        },
        toggleEdition() {
            this.isEdited = !this.isEdited

            if (!this.isEdited) {
                this.$emit('update', this.content)
            }
        },
    },
    mounted() {
        this.initEditor()
    },
})
</script>

<style lang="postcss">
.text-editor {
    position: relative;
}
.toggle-view {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(calc(-100% - 12px));
}
</style>
