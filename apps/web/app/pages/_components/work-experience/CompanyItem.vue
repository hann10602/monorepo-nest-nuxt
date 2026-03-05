<script setup lang="ts">
import type { ICompany } from '@portfolio/shared';

const props = defineProps<{ company: ICompany }>()
</script>

<template>
    <div class=" rounded-md p-4 shadow-lg shadow-emerald-500/50 bg-emerald-900/30">
        <h1
            class="text-2xl font-bold text-center mb-4 bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {{ company.name }}</h1>
        <div class="flex gap-4">
            <img class="w-52 h-52 object-cover rounded-lg" :src="company.logo" :alt="company.name" />
            <div class="flex-1">
                <p class="text-lg"><strong class="text-emerald-500">Working Type:</strong> {{ company.workType }}</p>
                <p class="text-lg"><strong class="text-emerald-500">Position:</strong> {{ company.position }}</p>
                <p class="text-lg"><strong class="text-emerald-500">Worked Date:</strong> {{ company.startDate }} - {{
                    company.endDate
                }}</p>
                <p class="text-lg"><strong class="text-emerald-500">Description:</strong> {{ company.description }}</p>
            </div>
        </div>
    </div>
</template>