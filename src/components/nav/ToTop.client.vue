<script setup lang="ts">

const isDown = ref(false);

document.addEventListener("scroll", () => {
    const height = window.innerHeight;
    if (window.scrollY > height) {
        isDown.value = true;
    } else {
        isDown.value = false;
    }
})

function toTop() {
    window.scrollTo({
        top: 0
    })
}

</script>

<template>
    <button :class="isDown ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'"
        class="bg-accent transition-all p-3 rounded-full fixed bottom-12 right-12" v-on:click="toTop">
        <svg xmlns="http://www.w3.org/2000/svg" :class="'animate-pulse'" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-arrow-up text-white">
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
        </svg>
    </button>
</template>