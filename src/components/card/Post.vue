<script setup lang="ts">
import type { Blog } from '~/types/common.type';

defineProps<{
    blog: Blog
}>()

</script>

<template>
    <div class="w-full flex justify-between gap-2 rounded-lg bg-secondary-bg px-5 py-4 h-fit md:h-[200px]">
        <div class="flex flex-col h-full justify-between">
            <div class="w-full">
                <NuxtLink :href="{ path: `/post/${blog._stem}` }"
                    class="hover:bg-gradient-to-r from-tint/20  w-full transition-all text-xl md:text-3xl py-1 border-l-4 pl-3 border-tint font-semibold line-clamp-2 md:max-w-[70%]">{{
                        blog.title }}</NuxtLink>
                <div class="flex items-center gap-4">
                    <h4 class="py-1 text-lg font-semibold text-slate-400 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" id="calender">
                            <path fill="#fff"
                                d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z">
                            </path>
                        </svg>
                        <span>{{ formatDate(blog.created_at, "-") }}</span>
                    </h4>
                    <NuxtLink :to="{query: {category: blog.category}}" class="py-1 font-semibold text-sm rounded-md w-fit flex gap-2 items-center text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" id="tag">
                            <path fill="#fff"
                                d="M21.12,10.71,12.71,2.29A1,1,0,0,0,12,2H3A1,1,0,0,0,2,3v9a1,1,0,0,0,.29.71l8.42,8.41a3,3,0,0,0,4.24,0L21.12,15a3,3,0,0,0,0-4.24Zm-1.41,2.82h0l-6.18,6.17a1,1,0,0,1-1.41,0L4,11.59V4h7.59l8.12,8.12a1,1,0,0,1,.29.71A1,1,0,0,1,19.71,13.53Z">
                            </path>
                        </svg>
                        <span>{{ blog.category }}</span>
                    </NuxtLink>
                    <div class="pt-4 hidden md:flex pb-2 gap-2 items-center max-w-[80%]">
                        <NuxtLink :to="{ query: { tag } }" v-for="(tag, i) in blog.tags.slice(0, 3)"
                            class="bg-cyan-600 hover:scale-95 active:scale-90 transition-all text-sm py-1 px-3 rounded-md">{{ tag
                            }}</NuxtLink>
                    </div>
                </div>
            </div>
            <div class="flex gap-4 pt-3 text-slate-400">
                <h5>{{ blog.creator }}</h5>
                <span>|</span>
                <h6>{{ totalWord(blog.body?.children) }} words</h6>
            </div>
        </div>
        <NuxtImg v-if="blog.image" :src="blog.image" class="h-full hidden md:block object-cover  rounded-md aspect-square bg-slate-200 " alt="" />
    </div>
</template>