<template>
    <div class="flex flex-col items-stretch px-24 mb-12">
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

        <draggable
            :list="blockList"
            item-key="id"
            @change="handleReorder"
            class="list-group"
            tag="transition-group"
            :component-data="{
                tag: 'div',
                type: 'transition-group',
                name: !drag ? 'flip-list' : null,
            }"
            v-bind="dragOptions"
        >
            <template #item="{ element }">
                <div :class="contentClass">
                    <TextEditor
                        v-if="element"
                        @update="updateContent"
                        @delete="removeBlock"
                        :defaultContent="element"
                        :isEdited="isEdited"
                        :isLoading="isLoading"
                        :target="target"
                    ></TextEditor>
                    <div class="line" v-if="isEdited"></div>
                </div>
            </template>
        </draggable>

        <button class="button" v-if="isEdited" @click="addBlock">
            New block
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { PencilIcon, EyeIcon } from '@heroicons/vue/solid'
import draggable from 'vuedraggable'

import useContent from '../plugins/useContent'
import TextEditor from '@/components/TextEditor.vue'

export default defineComponent({
    components: {
        TextEditor,
        PencilIcon,
        EyeIcon,
        draggable,
    },
    data() {
        return {
            blockList: new Array(),
            isEdited: true,
            isLogged: true,
            drag: false,
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
        blocks() {
            this.blockList = this.blocks
            console.log('Globaly Updated')
        },
    },
    computed: {
        contentClass() {
            if (this.isEdited) {
                return 'content-container-edited'
            }
            return ''
        },
        dragOptions() {
            return {
                animation: 200,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            }
        },
    },
    methods: {
        addBlock() {
            this.addRow()
        },
        removeBlock(id: string) {
            this.deleteRow(id)
        },
        handleReorder(event: {
            moved: { oldIndex: number; newIndex: number }
        }) {
            const oldElem = this.blocks[event.moved.oldIndex]
            const newElem = this.blocks[event.moved.newIndex]

            const oldContent = {
                value: newElem.content,
                itemId: oldElem.id,
            }
            const newContent = {
                value: oldElem.content,
                itemId: newElem.id,
            }

            // this.blockList[event.moved.oldIndex] = oldContent
            // this.blockList[event.moved.newIndex] = newContent

            this.updateContent([oldContent, newContent])
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
    height: 45px;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%) translateY(calc(100% + 0px));
}

.login {
    position: fixed;
    top: 0px;
    right: 24px;
}
.flip-list-move {
    transition: transform 0.5s;
}
.no-move {
    transition: transform 0s;
}
.ghost {
    /* opacity: 0.5; */
    background: #ecf9ff;
}
</style>
