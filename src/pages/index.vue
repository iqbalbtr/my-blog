<script setup lang="ts">

const title = ref('Blog.')

const route = useRoute();
const blog = useBlog();

async function handleRefresh() {
    const value = route.query.tag ?? route.query.category;
    const req = route.query.tag ? 'tags' : 'category';
    await blog.handleQuery(req, value as string)
}



function animateTitle() {
    const arr = [
        'Blogs.',
        'Knowledge.',
        'Website.',
        'Frontend.',
        'Programing.'
    ];

    title.value = '';

    const rand = arr[Math.floor(Math.random() * arr.length)];

    for (let i = 0; i < rand.length; i++) {
        setTimeout(() => {
            title.value += rand[i];
        }, 100 * i);
    }
}

onMounted(() => {
    // handleRefresh(req, value as string)
    const time = setInterval(animateTitle, 2500);
    return () => clearInterval(time)
});

</script>

<template>
    <Banner />

    <section class="w-full relative flex flex-col justify-center items-center">

        <CardSearch />

        <CardCategory v-on:handle-refresh="handleRefresh" :categories="blog.categories" />

        <div class="flex flex-col md:flex-row gap-4 py-8 w-full ">
            <div class="md:w-[40%] animate-accordion-up w-full flex flex-col gap-4">
                <CardTag v-on:handle-refresh="handleRefresh" :tags="blog.tags" />
            </div>
            <div class="flex flex-col w-full gap-3 animate-accordion-up">
                <CardPost v-for="blog in blog.blogs" :blog="blog" />
            </div>
        </div>
    </section>
</template>