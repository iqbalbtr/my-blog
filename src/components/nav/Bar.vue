<template>
    <nav class="flex justify-between py-6 px-4 md:px-32 bg-primary-bg text-white">
        <NuxtLink to="/" class="text-sm sm:text-base md:text-lg font-semibold">< Blog /></NuxtLink>

        <div class="flex gap-6 text-sm sm:text-base">
            <NuxtLink to="/about" >About</NuxtLink>
            <NuxtLink external to="https://iqbalbahtiar.online" target="_blank">Personal Web</NuxtLink>
        </div>
    </nav>
</template>