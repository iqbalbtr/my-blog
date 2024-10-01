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
    <div class="pb-4 absolute -top-6 left-1/2 w-[80%] sm:w-[75%] md:w-[450px] -translate-x-1/2">
        <input type="text" v-model="search"
            class="px-6 outline-none text-md rounded-md py-2 md:py-3 bg-accent w-full"  v-motion="{
            initial: {
                y: 100,
                opacity: 0
            },
            enter: {
                y: 0,
                opacity: 1,
                transition: {
                    delay: 50
                }
            },
            leave: {
                y: -100,
                opacity: 0,
            }
        }">

        <div v-if="blogs.length"
            class="w-full overflow-hidden flex flex-col gap-4 border border-accent bg-secondary rounded-md mt-2">
            <CardSearchPost  v-for="blog in blogs" :blog="blog" />
        </div>
    </div>
</template>