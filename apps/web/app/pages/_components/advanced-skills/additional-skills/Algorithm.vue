<script setup lang="ts">
const data = [
    { name: 'Easy', problemSolved: 28, color: 'var(--color-cyan-500)' },
    { name: 'Medium', problemSolved: 6, color: 'var(--color-amber-500)' },
    { name: 'Hard', problemSolved: 0, color: 'var(--color-red-500)' },
]

const categories = {
    Easy: {
        name: 'Easy',
        color: 'var(--color-cyan-500)'
    },
    Medium: {
        name: 'Medium',
        color: 'var(--color-amber-500)'
    },
    Hard: {
        name: 'Hard',
        color: 'var(--color-red-500)'
    },
}

const totalProblemsSolved = computed(() => data.reduce((acc, curr) => acc + curr.problemSolved, 0))
</script>

<template>
    <div class="flex gap-2">
        <div class="flex flex-col gap-2">
            <div v-for="item in data" :key="item.name"
                class="flex flex-col items-center justify-between bg-gray-800/50 rounded-lg text-center p-2 px-4">
                <p class="font-semibold w-32 text-xl">
                    {{ item.name }}
                </p>
                <p class="flex-1" :style="{ color: item.color }">
                    {{ item.problemSolved }}
                </p>
            </div>
        </div>
        <DonutChart class="flex-1" :data="data.map((i) => i.problemSolved)" :height="200" :categories="categories"
            :hide-legend="true" :type="DonutType.Full" :radius="0">
            <div class="text-center">
                <p class="text-3xl font-bold">
                    {{ totalProblemsSolved }}
                </p>
                <div class="flex items-center gap-1">
                    <UIcon name="i-lucide-check" class="w-4 h-4 text-emerald-500" />
                    <p class="text-muted">
                        solved
                    </p>
                </div>
            </div>
        </DonutChart>
        <ULink href="https://leetcode.com/u/KgPMHZHiNx/" target="_blank" class="cursor-pointer">
            <UButton icon="i-lucide-external-link" variant="soft" color="neutral" size="lg"
                class="cursor-pointer h-fit" />
        </ULink>
    </div>
</template>