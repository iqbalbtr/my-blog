<template>
    <nav class="flex justify-between py-6 px-4 md:px-32 bg-primary-bg text-white">
        <NuxtLink to="/" class="text-sm sm:text-base md:text-lg font-semibold">
            < Blog />
        </NuxtLink>

        <div class="flex gap-6 text-xs md:text-sm font-semibold px-4 md:px-12">
            <NuxtLink to="/about" class="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-circle-user-round">
                    <path d="M18 20a6 6 0 0 0-12 0" />
                    <circle cx="12" cy="10" r="4" />
                    <circle cx="12" cy="12" r="10" />
                </svg>
            </NuxtLink>
        </div>
    </nav>
</template>