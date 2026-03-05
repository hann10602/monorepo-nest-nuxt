<script setup lang="ts">
import { motion } from 'motion-v';
import TechStackCarousel, { type ITechStack } from './TechStackCarousel.vue';

const TECH_STACK: ITechStack[] = [
    {
        logo: '/images/reactjs-logo.png',
        alt: 'ReactJS',
        name: 'ReactJS',
        yearOfExperience: 3.5,
    },
    {
        logo: '/images/nextjs-logo.png',
        alt: 'NextJS',
        name: 'NextJS',
        yearOfExperience: 3.5,
    },

    {
        logo: '/images/vuejs-logo.png',
        alt: 'VueJS',
        name: 'VueJS',
        yearOfExperience: 2,
    },

    {
        logo: '/images/nuxtjs-logo.png',
        alt: 'NuxtJS',
        name: 'NuxtJS',
        yearOfExperience: 2,
    },
    {
        logo: '/images/nestjs-logo.jpg',
        alt: 'NestJS',
        name: 'NestJS',
        yearOfExperience: 1,
    },
    {
        logo: '/images/spring-boot-logo.png',
        alt: 'Spring Boot',
        name: 'Spring Boot',
        yearOfExperience: 1,
    },
]

</script>

<template>
    <motion.h2 :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 1, ease: 'easeInOut', delay: 1 }" :viewport="{ once: true }"
        class="text-3xl text-center mb-4 bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
        Tech Stack
    </motion.h2>
    <TechStackCarousel :items="TECH_STACK" :auto-rotate="true" :rotate-interval="3000" />
</template>