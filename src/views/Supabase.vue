<template>
    <div class="flex flex-col items-stretch mb-12">
        <router-link class="link" to="/">← Back to home</router-link>
        <h2 class="mb-12 font-serif text-4xl">Supabase</h2>
        <div class="link login" @click="isLogged = !isLogged">
            {{ isLogged ? 'Log out' : 'Log in' }}
        </div>

        <div class="edit-action">
            <div
                class="flex items-center justify-start action button w-min"
                v-if="isLogged && !isEdited"
                @click="isEdited = true"
            >
                <PencilIcon class="w-5 h-5 m-0 mr-2 text-dark-300" />
                Edition
            </div>
            <div
                class="flex items-center justify-start action button w-min"
                v-if="isLogged && isEdited"
                @click="isEdited = false"
            >
                <EyeIcon class="w-5 h-5 m-0 mr-2 text-dark-300" />
                Preview
            </div>
        </div>

        <div :class="contentClass" v-for="index in blocks.length" :key="index">
            <TextEditor
                v-if="blocks[index - 1]"
                @update="updateContent"
                @delete="removeBlock"
                :defaultContent="blocks[index - 1]"
                :isEdited="isEdited"
                :isLoading="isLoading"
                :target="target"
            ></TextEditor>
            <div class="line" v-if="index < blocks.length && isEdited"></div>
        </div>

        <button class="button" v-if="isEdited" @click="addBlock">
            New block
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import useContent from '../plugins/useContent'
import TextEditor from '@/components/TextEditor.vue'

import { PencilIcon, EyeIcon } from '@heroicons/vue/solid'

export default defineComponent({
    components: {
        TextEditor,
        PencilIcon,
        EyeIcon,
    },
    data() {
        return {
            urls: new Array(),
            isEdited: false,
            isLogged: false,
        }
    },
    setup() {
        const {
            content: blocks,
            update: updateContent,
            addRow: addRow,
            deleteRow: deleteRow,
            isLoading: isLoading,
            target: target,
        } = useContent()

        return {
            blocks,
            isLoading,
            target,
            updateContent,
            addRow,
            deleteRow,
        }
    },
    watch: {
        isLogged() {
            if (!this.isLogged) {
                this.isEdited = false
            }
        },
    },
    computed: {
        contentClass() {
            if (this.isEdited) {
                return 'content-container-edited'
            }
            return ''
        },
    },
    methods: {
        addBlock() {
            this.addRow()
        },
        removeBlock(id: string) {
            this.deleteRow(id)
        },
    },
    // https://fr.vuejs.org/v2/guide/instance.html#Diagramme-du-cycle-de-vie
})
</script>

<style lang="postcss" scoped>
.loader {
    min-height: 86.86px;
}
.content-container-edited {
    position: relative;
    background-color: white;
    z-index: 1;
}
.line {
    z-index: 0;
    position: absolute;
    background-color: lightgray;
    width: 1px;
    height: 75px;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%) translateY(calc(100% + 0px));
}

.login {
    position: fixed;
    top: 0px;
    right: 24px;
}
</style>
