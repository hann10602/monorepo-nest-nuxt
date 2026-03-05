<script setup lang="ts">
const props = defineProps<{
    logo: string;
    alt: string;
    name: string;
    yearOfExperience: number;
}>()
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-4 select-none">
        <div class="relative">
            <img :src="logo" :alt="alt"
                class="w-60 h-60 object-contain rounded-full bg-white border-4 border-emerald-400 shadow-2xl shadow-emerald-500/50 transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/50" />
            <div class="absolute inset-0 rounded-full bg-linear-to-tr">
            </div>
        </div>
        <div
            class="text-2xl font-bold text-center bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap">
            <p>{{ name }}</p>
            <p class="text-lg">{{ yearOfExperience }} years</p>
        </div>
    </div>
</template>