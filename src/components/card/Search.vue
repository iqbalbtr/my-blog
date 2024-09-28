<script setup lang="ts">

const search = ref('')
const blogs = reactive<any[]>([])

async function handleRefresh() {
    if (!search.value)
        return
    blogs.length = 0;
    const searchTerm = new RegExp(search.value, 'i')
    const data = await queryContent('/').where({
        $or: [
            {
                title: searchTerm,
            },
            {
                tags: searchTerm
            },
            {
                category: searchTerm
            }
        ]
    }).limit(7).find(); 
    blogs.push(...data)
}


let timeout: NodeJS.Timeout;

watch(search, () => {

    if (!search.value)
        return blogs.length = 0

    if (timeout)
        clearTimeout(timeout);

    timeout = setTimeout(handleRefresh, 500);
})

</script>

<template>
    <div class="pb-4 absolute -top-6 left-1/2 -translate-x-1/2">
        <input type="text" v-model="search"
            class="px-6 outline-none text-md rounded-md py-2 md:py-3 bg-accent w-[250px] sm:w-[300px] md:w-[450px]">

        <div v-if="blogs.length"
            class="w-full overflow-hidden flex flex-col gap-4 border border-accent bg-secondary rounded-md mt-2">
            <CardSearchPost  v-for="blog in blogs" :blog="blog" />
        </div>
    </div>
</template>