<script setup lang="ts">
import type { Blog, Pagging } from '~/types/common.type';


const search = ref('')
const route = useRoute()
const blogs = reactive({
    blog: [],
    pagging: {
        item: 0,
        page: 1,
        total_item: 0,
        total_page: 0
    }
}) as { blog: Blog[], pagging: Pagging }

async function handleRefresh() {
    if (!search.value)
        return
    await $fetch(`/api/post`, {
        params: {
            ...route.query,
            title: search.value
        },
        key: route.fullPath,
        immediate: true,
        onResponse: (res) => {
            Object.assign(blogs, res.response._data.data)
        }
    });
}


let timeout: NodeJS.Timeout;

watch(search, () => {

    if (!search.value)
        return blogs.blog.length = 0

    if (timeout)
        clearTimeout(timeout);

    timeout = setTimeout(handleRefresh, 500);
})

</script>

<template>
    <div class="pb-4 absolute -top-6 left-1/2 -translate-x-1/2">
        <input type="text" v-model="search"
            class="px-6 outline-none text-md rounded-md py-2 md:py-3 bg-accent w-[250px] sm:w-[300px] md:w-[450px]">

        <div v-if="blogs.blog.length"
            class="w-full overflow-hidden flex flex-col gap-4 border border-accent bg-secondary rounded-md mt-2">
            <div v-for="blog in blogs.blog" class="flex border-b-2 p-4 border-accent flex-col gap-4">
                <div>
                    <NuxtLink :to="{ path: `/post/${blog.slug}` }"
                        class="text-xl font-semibold md:text-2xl border-l-4 pl-2 border-tint">{{ blog.title }}
                    </NuxtLink>
                    <h4 class="py-1 text-sm pt-3 font-semibold text-slate-400 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" id="calender">
                            <path fill="#fff"
                                d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z">
                            </path>
                        </svg>
                        <span>{{ formatDate(blog.created_at, "-") }}</span>
                    </h4>
                    <h4 class="text-base mt-3 px-3 py-1 bg-accent w-fit rounded-md">{{ blog.category }}</h4>
                </div>

                <div class="flex gap-3">
                    <span class="text-slate-400">{{ blog.creator }}</span>
                    <span class="text-slate-400">|</span>
                    <span class="text-slate-400">{{ blog.word }} Words</span>
                </div>
            </div>
        </div>
    </div>
</template>