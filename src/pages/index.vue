<script setup lang="ts">
import type { Blog, Pagging } from '~/types/common.type';

const title = ref('Blog.')

const route = useRoute();
const blogs = reactive({}) as { blog: Blog[], pagging: Pagging }
const categories = useFetch('/api/category');
const tags = useFetch('/api/tag');

async function handleRefresh() {
    await $fetch(`/api/post`, {
        params: route.query,
        key: route.fullPath,
        immediate: true,
        onResponse: (res) => {
            Object.assign(blogs, res.response._data.data)
        }
    });
}

function animateTitle(){
    const arr = [
        'Blogs.',
        'Knowledge.',
        'Website.',
        'Frontend.',
        'Programing.'
    ];

    title.value = '';

    const rand = arr[Math.floor(Math.random() * arr.length)];

    for(let i = 0; i < rand.length; i++){
        setTimeout(() => {
            title.value += rand[i];
        }, 100 * i); 
    }
}

onMounted(() => {
    handleRefresh()
    const time = setInterval(animateTitle, 2500);
    return () => clearInterval(time)
});

</script>

<template>
    <Banner />

    <section class="w-full relative flex flex-col justify-center items-center">

        <CardSearch />

        <CardCategory v-on:handle-refresh="handleRefresh" :categories="categories.data.value?.data ?? []" />

        <div class="flex flex-col md:flex-row gap-4 py-8 w-full ">
            <div class="md:w-[40%] animate-accordion-up w-full flex flex-col gap-4">
                <CardTag v-on:handle-refresh="handleRefresh" :tags="tags.data.value?.data ?? []" />
            </div>
            <div class="flex flex-col w-full gap-3 animate-accordion-up">
                <CardPost v-for="blog in blogs.blog ?? []" :blog="blog" />
            </div>
        </div>
    </section>
</template>