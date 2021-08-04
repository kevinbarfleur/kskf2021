import { ref, readonly } from 'vue'
import { useDb } from './supabase'

export default function useContent() {
    const db = useDb()
    const content = ref([])
    const isLoading = ref(false)
    const target = ref(0)

    async function fetch() {
        if (isLoading.value) return
        isLoading.value = true
        const newContent = await db.getTableContent('content')
        newContent.sort((a: { id: number }, b: { id: number }) => a.id - b.id)
        content.value = newContent
        isLoading.value = false
    }

    async function update(updateValues: any[]) {
        if (isLoading.value) return
        isLoading.value = true
        for (let item of updateValues) {
            await db.updateTableContent('content', item.value, item.itemId)
            target.value = item.itemId
        }
        isLoading.value = false
        fetch()
    }

    async function addRow(value: string = '') {
        if (isLoading.value) return
        isLoading.value = true
        await db.addContentRow('content', value)
        isLoading.value = false
        fetch()
    }

    async function deleteRow(toDelete: string = '') {
        if (isLoading.value) return
        isLoading.value = true
        await db.deleteContentRow('content', toDelete)
        isLoading.value = false
        fetch()
    }

    fetch()

    return {
        content: readonly(content),
        target: readonly(target),
        isLoading,
        fetch,
        update,
        addRow,
        deleteRow,
    }
}
