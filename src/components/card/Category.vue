<script setup lang="ts">
defineProps<{
    categories: string[]
}>()
defineEmits(['handleRefresh'])

const route = useRoute()

</script>

<template>
        <div class="text-xl font-semibold pt-12 flex gap-2 md:gap-8">
            <span v-for="category in categories.slice(0,3)" class="font-normal" @click="$emit('handleRefresh', true)" >
                <NuxtLink class="text-base sm:text-lg hover:bg-secondary duration-200 md:text-xl font-bold text-slate-200 px-3 py-1 rounded-md" :class="route.query.category === category ? 'bg-secondary' : ''"  :to="{ query: { category: route.query.category !== category ? category : undefined } }">{{ category }}</NuxtLink>
            </span>
        </div>
</template>