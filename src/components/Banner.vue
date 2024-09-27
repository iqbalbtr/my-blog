<script setup lang="ts">

const title = ref('Blog.')

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
    const time = setInterval(animateTitle, 2500);
    return () => clearInterval(time)
});

</script>

<template>
    <section class="min-h-[18vh] md:min-h-[25vh] overflow-hidden flex flex-col justify-center items-center py-14 bg-slate-700 mx-4 rounded-md relative">
        <h1 class="absolute font-bold text-slate-500 text-[4rem] md:text-[5rem] top-[10%]">{{ title }}</h1>
    </section>
</template>