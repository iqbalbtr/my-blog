<script setup lang="ts">
const route = useRoute();
const { data, status } = await useAsyncData(() => queryContent(route.params.postId as string).findOne());

useSeoMeta({
    title: data.value?.title,
    ogImage: data.value?.image,
    description: data.value?.description,
    ogDescription: data.value?.description,
    applicationName: 'blog articles',
    author: data.value?.creator,
    articleAuthor: data.value?.creator,
    ogTitle: 'id',
})

</script>
<template>
    <NuxtLayout :name="'blog'">
        <NuxtImg loading="lazy" decoding="async" v-if="data?.image" :src="data.image"
            :class="`h-[25vh]  object-cover w-full mb-8 rounded-md`" v-motion="{
                initial: {
                    y: 25,
                    opacity: 0
                },
                enter: {
                    y: 0,
                    opacity: 1,
                },
                leave: {
                    y: -25,
                    opacity: 0,
                }
            }">
        </NuxtImg>

        <section class="md:px-12 px-5 md:py-8 py-4 rounded-2xl bg-secondary">
            <div v-if="status == 'success'" class="gap-4 flex flex-col justify-between mb-5">
                <h1 class="text-2xl md:text-4xl font-bold" v-motion="{
                    initial: {
                        y: 25,
                        opacity: 0
                    },
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            delay: 25
                        }
                    },
                    leave: {
                        y: -25,
                        opacity: 0,
                    }
                }">{{ data?.title ?? '' }}</h1>
                <div v-motion="{
                    initial: {
                        y: 25,
                        opacity: 0
                    },
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            delay: 200
                        }
                    },
                    leave: {
                        y: -25,
                        opacity: 0,
                    }
                }" class="flex flex-col gap-4 font-sans text-slate-600">
                    <div class="flex flex-col ">
                        <div class="flex gap-4 pb-1">
                            <h4
                                class="py-1 text-xs sm:text-sm  md:text-lg font-semibold text-slate-400 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-calendar">
                                    <path d="M8 2v4" />
                                    <path d="M16 2v4" />
                                    <rect width="18" height="18" x="3" y="4" rx="2" />
                                    <path d="M3 10h18" />
                                </svg>
                                <span>{{ formatDate(data?.created_at ?? '', '-') }}</span>
                            </h4>
                            <h4 v-if="data?.created_at !== data?.update_at"
                                class="py-1 text-xs sm:text-sm  md:text-lg font-semibold text-slate-400 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-calendar-arrow-up">
                                    <path d="m14 18 4-4 4 4" />
                                    <path d="M16 2v4" />
                                    <path d="M18 22v-8" />
                                    <path d="M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9" />
                                    <path d="M3 10h18" />
                                    <path d="M8 2v4" />
                                </svg>
                                <span>{{ formatDate(data?.update_at ?? '', '-') }}</span>
                            </h4>
                        </div>
                        <h4
                            class="py-1 pl-1 text-xs sm:text-sm  md:text-lg rounded-md w-fit flex gap-2 items-center text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-folder-open-dot">
                                <path
                                    d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
                                <circle cx="14" cy="15" r="1" />
                            </svg>
                            <span class="font-semibold">{{ data?.category }}</span>
                        </h4>
                        <div class="pt-2 md:pt-4 pb-2 flex gap-2 max-w-[80%]">
                            <span v-for="(tag, index) in data?.tags"
                                class="bg-cyan-600 text-cyan-100 text-xs sm:text-sm  md:text-lg font-semibold py-1 px-3 rounded-md">{{
                                    tag
                                }}</span>
                        </div>
                    </div>

                    <div class="flex text-xs md:text-sm font-semibold gap-2 text-slate-400">
                        <h4>{{ data?.creator }}</h4>
                        <span>|</span>
                        <h4>{{ totalWord(data?.body?.children) }} Words</h4>
                    </div>
                    <hr />
                </div>
            </div>
            <ClientOnly v-if="status == 'success'">
                <MarkDown :data="data" />
            </ClientOnly>
            <SkeletonPost v-else />
        </section>
    </NuxtLayout>
</template>