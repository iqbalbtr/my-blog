<script lang="ts" setup>

const blog = useBlog();
const theme = useTheme()

onMounted(() => {
    blog.init();
    theme.init();
});


</script>

<template>
    <NavBar />
    <main :class="theme.currentMode" class="w-full text-primary-text min-h-screen bg-primary-bg px-4 md:px-[4rem] lg:px-[9rem] xl:px-[14rem]">
        <slot />
    </main>
    <Footer />
</template>