<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui';
import Algorithm from './Algorithm.vue';
import Languages from './Languages.vue';
import { motion } from 'motion-v';
import Others from './Others.vue';

defineOptions({
    tags: ['donutcharts', 'basic']
})

const items = [
    {
        label: 'Languages',
        icon: 'i-lucide-globe',
        Component: Languages,
        slot: 'languages' as const
    },
    {
        label: 'Algorithm',
        icon: 'i-lucide-key-round',
        Component: Algorithm,
        slot: 'algorithm' as const
    },
    {
        label: 'Others',
        icon: 'i-lucide-user',
        Component: Others,
        slot: 'others' as const
    },
] satisfies TabsItem[]

</script>

<template>
    <motion.h2 :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 1, ease: 'easeInOut', delay: 1 }" :viewport="{ once: true }"
        class="text-3xl text-center mb-4 bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
        Additional Skills
    </motion.h2>
    <UTabs :items="items" variant="link" :ui="{ trigger: 'grow' }"
        class="gap-4 w-full bg-emerald-800/20 rounded-2xl py-4 h-96">
        <template v-for="item in items" #[item.slot] :key="item.slot">
            <Component :is="item.Component" class="p-6" />
        </template>
    </UTabs>
</template>