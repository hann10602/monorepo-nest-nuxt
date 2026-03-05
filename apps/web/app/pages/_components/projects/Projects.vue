<script setup lang="ts">
import { motion } from 'motion-v';


</script>

<template>
    <div class="lg:mx-auto lg:px-20 w-full h-full flex flex-col justify-center relative
        overflow-hidden py-10">
        <!-- Blurred emerald background elements -->
        <div class="absolute top-50 left-1/2 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl"></div>

        <!-- Content -->
        <div class="relative z-10">
            <motion.h2 :initial="{ opacity: 0, x: -50 }" :while-in-view="{ opacity: 1, x: 0 }"
                :transition="{ duration: 1, ease: 'easeInOut' }" :viewport="{ once: true }"
                class="text-4xl mb-12 bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {{ $t('project.title') }}
            </motion.h2>
        </div>
    </div>
</template>