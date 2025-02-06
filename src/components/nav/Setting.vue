<script setup lang="ts">

const isActive = ref(false);

</script>

<template>

    <div class="fixed bottom-6 left-6 flex flex-col items-center">
        <div v-if="isActive" class="absolute p-1 rounded-full animate-accordion-up flex flex-col bottom-[120%] items-center justify-center bg-tint-bg">
            <ThemeSelect />
        </div>

        <button @click="isActive = !isActive" class="bg-accent shadow p-2 transition-all rounded-full" :class="isActive && 'rotate-[-50deg]'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide text-primary-text lucide-bolt">
                <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <circle cx="12" cy="12" r="4" />
            </svg>
        </button>
    </div>

</template>