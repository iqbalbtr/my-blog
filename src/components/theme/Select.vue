<script setup lang="ts">

const isActive = ref(false)
const theme = useTheme();

const themeList: { name: "dark" | "light" | "default", color: string[] }[] = [
    {
        name: "default",
        color: ['#0B2447', '#0D2952']
    },
    {
        name: "dark",
        color: ['#475569', '#0f172a']
    },
    {
        name: "light",
        color: ['#475569', '#cbd5e1']
    },
]

</script>
<template>

    <div class="relative flex transition-all">
        <button @click="isActive = !isActive" class="active:scale-95 p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide text-primary-text lucide-palette">
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                <path
                    d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
            </svg>
        </button>

        <div class="absolute  animate-slide-left flex gap-3 left-[150%]" v-if="isActive">
            <button v-for="mode in themeList" @click="theme.switchTheme(mode.name)"
                :class="theme.currentMode == mode.name && 'border-2 shadow-tint border-tint'"
                class="w-9 flex bg-accent rotate-45 border overflow-hidden active:scale-90 rounded-full aspect-square">
                <div v-for="(col, index) in mode.color" :key="index" :style="`background-color: ${col};`"
                    class="w-full h-full" />
            </button>
        </div>
    </div>

</template>