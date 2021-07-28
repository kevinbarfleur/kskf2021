import { createClient } from '@supabase/supabase-js'
import { App, inject } from 'vue'

const supabaseUrl = 'https://nuevwrtcdfttakmhimwl.supabase.co'

const supabaseServiceKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjI1ODE2NTM0LCJleHAiOjE5NDEzOTI1MzR9.r-k2It81B2hIJV0yo7gxXkNLR9iL9HwQh4kvbVu2Y9M'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function getImagesSources(bucket: string) {
    let imagesUrls = []

    const { data, error } = await supabase.storage.from(bucket).list()
    if (error) console.error(error)

    for (let image of data as []) {
        const { name } = image
        const { signedURL, error } = await supabase.storage
            .from(bucket)
            .createSignedUrl(name, 60)
        if (error) console.error(error)

        imagesUrls.push(signedURL)
    }

    return imagesUrls
}

export async function getTableContent(name: string) {
    let rows = new Array()

    const { data, error } = await supabase.from(name).select()
    if (error) console.error(error)

    for (let row of data as []) {
        rows.push(row)
    }

    return rows
}

export async function updateTableContent(
    tableName: string,
    value: string,
    toUpdate: string
) {
    const { data, error } = await supabase
        .from(tableName)
        .update({ content: value })
        .filter('id', 'eq', toUpdate)

    if (error) console.error(error)

    return data
}

export async function addContentRow(table: string, content: string) {
    const { data, error } = await supabase
        .from(table)
        .insert([{ content: content }])

    if (error) console.error(error)

    return data
}

export async function deleteContentRow(
    table: string,
    toDelete: { id: number }
) {
    const { data, error } = await supabase
        .from(table)
        .delete()
        .filter('id', 'eq', toDelete.id)

    if (error) console.error(error)

    console.log(toDelete)

    return data
}

// GLOBAL PROPERTIES
// export default {
//     install(app: App, options: Object) {
//         app.config.globalProperties.$db = {
//             getTableContent,
//             updateTableContent,
//         }
//     },
// }

// // INJECT/PROVIDE
// export const SYMBOL_DB = Symbol('$db')
// export default {
//     install(app: App, options: Object) {
//         app.provide(SYMBOL_DB, {
//             getTableContent,
//             updateTableContent,
//         })
//     },
// }

type Db = {
    getTableContent: Function
    updateTableContent: Function
    addContentRow: Function
    deleteContentRow: Function
}
export const SYMBOL_DB = Symbol('$db')
export default {
    install(app: App, options: Object) {
        app.provide<Db>(SYMBOL_DB, {
            getTableContent,
            updateTableContent,
            addContentRow,
            deleteContentRow,
        })
    },
}
export function useDb(): Db {
    return inject<Db>(SYMBOL_DB) as Db
}
