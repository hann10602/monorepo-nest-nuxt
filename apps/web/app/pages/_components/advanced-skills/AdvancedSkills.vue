<script setup lang="ts">
import { motion } from 'motion-v';
import TechStack from './tech-stack/TechStack.vue';
</script>

<template>
    <div class="lg:mx-auto lg:px-20 w-full h-full flex flex-col justify-center">
        <motion.h2 :initial="{ opacity: 0, x: -50 }" :while-in-view="{ opacity: 1, x: 0 }"
            :transition="{ duration: 1, ease: 'easeInOut' }" :viewport="{ once: true }"
            class="text-4xl mb-12 bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            About My Advanced Skills
        </motion.h2>
        <TechStack />
    </div>

    <OtherSkills />
</template>