<script setup lang="ts">
import { EWorkType, type ICompany } from '@portfolio/shared';
import CompanyItem from './CompanyItem.vue';
import { motion } from 'motion-v';

const companyList = reactive<ICompany[]>([
    {
        name: 'Freelancer',
        position: 'Freelancer',
        startDate: '01/2022',
        endDate: '12/2022',
        workType: EWorkType.REMOTE,
        logo: 'https://www.shutterstock.com/image-vector/company-icon-vector-isolated-on-600nw-2157172559.jpg',
        description: 'I was a freelancer for 1 year.',
    },
    {
        name: 'VMO Holdings',
        position: 'Software Engineer',
        startDate: '04/2023',
        endDate: '12/2024',
        workType: EWorkType.FULL_TIME,
        logo: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_logos/krQWPKjwIZR2iMG7GzxXfRRN8HxJTilc_1682407813____3693f5f1439a510f550155910c4a84ed.jpg',
        description: 'I was a software engineer for 1 year.',
    },
    {
        name: 'Sotatek',
        position: 'Software Engineer',
        startDate: '01/2025',
        endDate: 'Present',
        workType: EWorkType.FULL_TIME,
        logo: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_logos/3b0812b0b2457b36d87e295f1a40ea73-61de73b0003f6.jpg',
        description: 'I was a software engineer for 1 year.',
    },
])

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
                Work Experience
            </motion.h2>
            <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.div v-for="(value, index) in companyList" :key="value.name" :initial="{ opacity: 0, y: 50 }"
                    :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 1, delay: 1 + index * 0.20 }"
                    :viewport="{ once: true }">
                    <CompanyItem :company="value" :description="value.description" />
                </motion.div>
            </div>
        </div>
    </div>
</template>