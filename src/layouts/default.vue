<script lang="ts" setup>

const blog = useBlog();

onMounted(() => {
    blog.init();
});


</script>

<template>
    <NavBar />
    <main class="w-full min-h-screen bg-primary-bg text-white px-4 md:px-[4rem] lg:px-[9rem] xl:px-[14rem]">
        <slot />
    </main>
    <Footer />
</template>