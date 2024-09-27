<template>
    <Banner />

    <section class="w-full relative flex flex-col justify-center items-center">

        <CardSearch />

            <h1 class="text-4xl text-center font-semibold mt-6 animate-accordion-up pt-6">About</h1>
            <div class="flex flex-col md:flex-row gap-4 py-8 w-full animate-accordion-up">
                <div class="md:mx-28 p-4 flex flex-col md:flex-row gap-12 bg-secondary rounded-lg w-full">
                    <NuxtImg src="/image/profile.jpg" class="w-[200px] self-center aspect-square rounded-md" />

                    <div class="flex flex-col justify-between text-center md:text-left">
                        <div>
                            <h1 class="text-4xl font-bold">Iqbal Bahtiar</h1>
                            <p class="text-xl pt-2 text-slate-400">Web Developer</p>
                            <p class="text-base pt-2 text-slate-500">Lorem ipsum dolor sit amet consectetur.</p>
                        </div>

                        <div>
                            <ul class="flex justify-center md:justify-start flex-warp gap-3">
                                <li>GitHub</li>
                                <li>Facebook</li>
                                <li>Instagram</li>
                            </ul>
                        </div>
                    </div>
                </div>
        </div>
    </section>
</template>