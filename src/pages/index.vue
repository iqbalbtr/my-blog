<script setup lang="ts">

const title = ref('Blog.');

const blog = useBlog();

async function handleRefresh(req: "tags" | "category", value: string) {
    await blog.handleQuery(req, value as string)
}



function animateTitle() {
    const arr = [
        'Blogs.',
        'Knowledge.',
        'Website.',
        'Frontend.',
        'Programing.'
    ];

    title.value = '';

    const rand = arr[Math.floor(Math.random() * arr.length)];

    for (let i = 0; i < rand.length; i++) {
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
    <Banner v-motion="{
        initial: {
            y: 25,
            opacity: 0
        },
        enter: {
            y: 0,
            opacity: 1,
        },
        leave: {
            y: -25,
            opacity: 0,
        }
    }" />

    <section class="w-full relative flex flex-col justify-center items-center">

        <CardSearch />

        <CardCategory v-motion="{
            initial: {
                y: 25,
                opacity: 0
            },
            enter: {
                y: 0,
                opacity: 1,
                transition: {
                    delay: 25
                }
            },
            leave: {
                y: -25,
                opacity: 0,
            }
        }" v-on:handle-refresh="handleRefresh" :categories="blog.categories" />

        <div class="flex flex-col md:flex-row gap-4 py-8 w-full ">
            <div class="md:w-[40%] w-full flex flex-col gap-4" v-motion="{
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
                <CardTag v-on:handle-refresh="handleRefresh" :tags="blog.tags" />
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
            }" class="flex flex-col w-full gap-3">
                <CardPost v-for="blog in blog.blogs" :blog="blog"  />
            </div>
            
        </div>
        <button v-if="blog.pagging.page < blog.pagging.totalPage" class="px-6 py-2 text-slate-300 text-sm transition-all active:scale-95 bg-accent w-fit rounded-md self-center mt-6" @click="blog.handlePagination()">Load More</button>
    </section>
</template>