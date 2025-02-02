<script setup lang="ts">

const theme = useTheme()

</script>

<template>
    <footer :class="theme.currentMode" class="bg-primary-bg font-semibold text-center py-6 text-secondary-text">
        <p class="text-[.75rem]">Design and Develop by Iqbal Bahtiar</p>
        <p class="text-[.65rem] text-slate-500">Copyright © Iqbal Bahtiar {{ new Date().getFullYear() }}</p>
    </footer>
</template>