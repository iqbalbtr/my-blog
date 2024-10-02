<template>
    <div class="md:mx-28 p-4 pt-16 md:pt-4 flex flex-col md:flex-row gap-12 bg-secondary rounded-lg w-full">
        <NuxtImg v-motion="{
            initial: {
                y: 25,
                opacity: 0
            },
            enter: {
                y: 0,
                opacity: 1,
                transition: {
                    delay: 50
                }
            },
            leave: {
                y: -25,
                opacity: 0,
            }
        }" src="/image/profile.jpg" class="w-[200px] self-center aspect-square rounded-md" loading="lazy" decoding="async" />


        <div class="flex flex-col justify-between text-center md:text-left">
            <div v-motion="{
                initial: {
                    y: 25,
                    opacity: 0
                },
                enter: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        delay: 200
                    }
                },
                leave: {
                    y: -25,
                    opacity: 0,
                }
            }">
                <h1 class="text-3xl md:text-4xl font-bold">Iqbal Bahtiar</h1>
                <p class="text-xl pt-2 text-slate-400">Developer</p>
            </div>


            <div v-motion="{
                initial: {
                    y: 25,
                    opacity: 0
                },
                enter: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        delay: 300
                    }
                },
                leave: {
                    y: -25,
                    opacity: 0,
                }
            }">
                <ul class="flex justify-center flex-wrap text-sm pt-8 md:pt-0 md:justify-start font-semibold flex-warp gap-2 md:gap-6">
                    <li>
                        <NuxtLink to="https:iqbalbahtiar.online" target="_blank" class="flex gap-2 items-center">
                            <span>Personal Web</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-square-arrow-out-up-right">
                                <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                                <path d="m21 3-9 9" />
                                <path d="M15 3h6v6" />
                            </svg>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="https://github.com/iqbalbtr" target="_blank" class="flex gap-2 items-center">
                            <span>Github</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-square-arrow-out-up-right">
                                <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                                <path d="m21 3-9 9" />
                                <path d="M15 3h6v6" />
                            </svg>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="https://www.facebook.com/btr.iqbal.3" target="_blank" class="flex gap-2 items-center">
                            <span>Facebook</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-square-arrow-out-up-right">
                                <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                                <path d="m21 3-9 9" />
                                <path d="M15 3h6v6" />
                            </svg>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="https://www.instagram.com/iqbal.b_/" target="_blank" class="flex gap-2 items-center">
                            <span>Instagram</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-square-arrow-out-up-right">
                                <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                                <path d="m21 3-9 9" />
                                <path d="M15 3h6v6" />
                            </svg>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>