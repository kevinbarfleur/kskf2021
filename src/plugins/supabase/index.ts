import { createClient } from '@supabase/supabase-js'
import { App } from 'vue'

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
    name: string,
    toUpdate: object,
    newContent: string
) {
    const { error } = await supabase
        .from(name)
        .update({ content: newContent })
        .filter('name', 'eq', toUpdate.value)

    if (error) console.error(error)
}

// export default {
//     install(app: App, options: Object) {
//         app.config.globalProperties.$supabase = supabase

//         app.provide('supabase', options)
//     },
// }
