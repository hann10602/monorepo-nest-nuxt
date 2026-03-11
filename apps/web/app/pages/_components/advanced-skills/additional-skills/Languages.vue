<script setup lang="ts">
const data = [
    { name: 'Vietnamese', percentage: 100 },
    { name: 'English', percentage: 70 },
    { name: 'Mandarin', percentage: 10 },
]
</script>

<template>
    <div class="flex flex-col gap-2">
        <div v-for="item in data" :key="item.name" class="flex items-center justify-center gap-4 px-4">
            <div class="font-semibold w-32 text-xl">
                {{ item.name }}:
            </div>
            <div class="flex-1">
                <UProgress :model-value="item.percentage" :max="100" />
            </div>
        </div>
    </div>
</template>