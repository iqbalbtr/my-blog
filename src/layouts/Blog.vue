<script lang="ts" setup>

const theme = useTheme()

onMounted(() => {
    theme.init();
});


</script>
<template>
    <main class="md:px-16 bg-primary py-6">
        <slot />
        <NavSetting />
    </main>
</template>