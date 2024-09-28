<script setup lang="ts">
const route = useRoute();
const { data } = await useAsyncData(() => queryContent(route.params.postId as string).findOne());

useHead({
    title: data.value?.title
});



</script>
<template>
    <NuxtLayout :name="'blog'">
        <NuxtImg v-if="data?.image" :src="data.image"
            :class="`h-[25vh] animate-accordion-up object-cover w-full mb-8 rounded-md`">
        </NuxtImg>

        <section class="md:px-12 px-5 md:py-8 py-4 rounded-2xl animate-accordion-up bg-secondary">
            <div class="gap-4 flex flex-col justify-between mb-5">
                <h1 class="text-2xl md:text-4xl font-bold">{{ data?.title ?? '' }}</h1>
                <div class="flex flex-col gap-4 font-sans text-slate-600">
                    <div class="flex flex-col ">
                        <div class="flex gap-4 pb-1">
                            <h4 class="py-1 text-xs sm:text-sm  md:text-lg font-semibold text-slate-400 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" id="calender">
                                    <path fill="#fff"
                                        d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z">
                                    </path>
                                </svg>
                                <span>{{ formatDate(data?.created_at ?? '', '-') }}</span>
                            </h4>
                            <h4 v-if="data?.created_at !== data?.update_at"
                                class="py-1 text-xs sm:text-sm  md:text-lg font-semibold text-slate-400 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" id="calender">
                                    <path fill="#fff"
                                        d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z">
                                    </path>
                                </svg>
                                <span>{{ formatDate(data?.update_at ?? '', '-') }}</span>
                            </h4>
                        </div>
                        <h4 class="py-1 text-xs sm:text-sm  md:text-lg rounded-md w-fit flex gap-2 items-center text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" id="tag">
                                <path fill="#fff"
                                    d="M21.12,10.71,12.71,2.29A1,1,0,0,0,12,2H3A1,1,0,0,0,2,3v9a1,1,0,0,0,.29.71l8.42,8.41a3,3,0,0,0,4.24,0L21.12,15a3,3,0,0,0,0-4.24Zm-1.41,2.82h0l-6.18,6.17a1,1,0,0,1-1.41,0L4,11.59V4h7.59l8.12,8.12a1,1,0,0,1,.29.71A1,1,0,0,1,19.71,13.53Z">
                                </path>
                            </svg>
                            <span class="font-semibold">{{ data?.category }}</span>
                        </h4>
                        <div class="pt-4 pb-2 flex gap-2 max-w-[80%]">
                            <span v-for="(tag, index) in data?.tags"
                                class="bg-cyan-600 text-cyan-100 text-xs sm:text-sm  md:text-lg font-semibold py-1 px-3 rounded-md">{{ tag
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
            <ClientOnly>
                <MarkDown />
            </ClientOnly>
        </section>
    </NuxtLayout>
</template>