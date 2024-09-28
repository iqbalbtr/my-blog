<script setup lang="ts">
defineProps<{
    tags: string[]
}>()
defineEmits(['handleRefresh'])

const route = useRoute()

</script>

<template>
    <div class="px-6 py-5 h-fit bg-secondary rounded-lg">
        <h1 class="text-2xl border-l-4 border-tint pl-2">Tags</h1>
        <div class="flex flex-wrap gap-2 pt-6">
            <span v-for="tag in tags" class="py-1 px-3 hover:scale-95 transition-all active:scale-90 bg-tint rounded-md font-semibold">
                <NuxtLink :onclick="$emit('handleRefresh', 'tags', tag)" class="text-sm" :to="{ query: { tag: route.query.tag !== tag ? tag : undefined }}">{{
                    tag }}</NuxtLink>
            </span>
        </div>
    </div>
</template>