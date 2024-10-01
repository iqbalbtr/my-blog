<script setup lang="ts">

const title = ref('Blog.')
const blog = useBlog()

function animateTitle(){
    const arr = [
        'Blog.',
        'ORM',
        'Website.',
        'Frontend.',
        'Programing.',
        'Daily Life.'
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
    const time = setInterval(animateTitle, 2500);
    return () => clearInterval(time)
});

</script>

<template>
    <section class="min-h-[12vh] sm:min-h-[16vh] md:min-h-[25vh] overflow-hidden flex flex-col justify-center items-center py-14 bg-slate-950 mx-4 rounded-md relative">
        <h1 class="absolute font-bold text-slate-500 text-sm md:text-lg lg:text-2xl top-1/2 -translate-y-1/2">{{ title }}</h1>
    </section>
</template>