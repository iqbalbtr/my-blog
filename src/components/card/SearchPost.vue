<script setup lang="ts">
import type { Blog } from '~/types/common.type';

defineProps<{
    blog: Blog
}>()
</script>

<template>
    <div class="flex border-b-2 p-4 border-accent flex-col gap-4">
                <div>
                    <NuxtLink :to="{ path: `/post/${blog._stem}` }"
                        class="text-base font-semibold md:text-xl border-l-4 pl-2 border-tint">{{ blog.title }}
                    </NuxtLink>
                    <h4 class="py-1 text-xs sm:text-sm md:text-base pt-3 font-semibold text-slate-400 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" id="calender">
                            <path fill="#fff"
                                d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z">
                            </path>
                        </svg>
                        <span>{{ formatDate(blog.created_at, "-") }}</span>
                    </h4>
                    <h4 class="text-xs sm:text-sm md:text-base mt-3 px-3 py-1 bg-accent w-fit rounded-md">{{ blog.category }}</h4>
                </div>

                <div class="flex gap-3 text-xs sm:text-sm md:text-base ">
                    <span class="text-slate-400">{{ blog.creator }}</span>
                    <span class="text-slate-400">|</span>
                    <span class="text-slate-400">{{ totalWord(blog.body?.children) }} Words</span>
                </div>
            </div>
</template>