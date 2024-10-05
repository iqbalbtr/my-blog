<script setup lang="ts">
defineProps<{
    tags: string[]
}>()
defineEmits(['handleRefresh']);

const blog = useBlog()

const route = useRoute()

</script>

<template>
    <div class="px-6 py-5 h-fit bg-secondary rounded-lg">
        <h1 class="text-lg font-semibold md:text-2xl border-l-4 border-tint pl-2">Tags</h1>
        <div class="flex flex-wrap gap-2 pt-6">
            <span v-for="tag in tags" :class="blog.pagging.query == tag && 'outline outline-offset-2 outline-purple-500'" class="py-1 px-3 cursor-pointer text-xs sm:text-sm md:text-base hover:scale-95 transition-all active:scale-90 bg-tint rounded-md font-semibold">
                <button @click="$emit('handleRefresh', 'tags', tag)" class="text-sm">{{
                    tag }}</button>
            </span>
        </div>
    </div>
</template>