<script setup lang="ts">
import { motion } from 'motion-v';

const { isDesktop } = storeToRefs(useConfigStore())
const socialLinks = reactive<{ name: string, icon: string, url: string }[]>([
    {
        name: 'Facebook',
        icon: 'i-lucide-facebook',
        url: 'https://www.facebook.com/yuire10602'
    },
    {
        name: 'Instagram',
        icon: 'i-lucide-instagram',
        url: 'https://www.instagram.com/yummy.jammie_/'
    },
    {
        name: 'GitHub',
        icon: 'i-lucide-github',
        url: 'https://github.com/hann10602'
    },
    {
        name: 'LinkedIn',
        icon: 'i-lucide-linkedin',
        url: 'https://www.linkedin.com/in/ha-jammie-nguyen-930789279/'
    }
])

</script>
<template>
    <ClientOnly>
        <div class="relative h-screen">
            <motion.img :initial="{ opacity: 0 }" :animate="{ opacity: 0.7 }" :transition="{ duration: 0.5 }"
                src="/images/home-1.jpg" class="h-full w-full object-cover" alt="Home" />
            <div
                class="absolute top-0 left-0 lg:px-40 md:px-20 px-10 py-20 flex flex-col lg:flex-row items-center justify-center gap-10 w-full h-full bg-black/50">
                <div class="flex-1 lg:block flex flex-col items-center justify-center text-center lg:text-left">
                    <motion.h2 :initial="{ opacity: 0, y: -50 }" :animate="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 1, delay: 1 }" class="text-4xl font-extrabold">Hello, it's me
                    </motion.h2>
                    <motion.h1 :initial="{ opacity: 0, x: -50 }" :animate="{ opacity: 1, x: 0 }"
                        :transition="{ duration: 0.5 }" class="text-6xl font-extrabold mt-4">Jammie Nguyen</motion.h1>
                    <motion.h2 :initial="{ opacity: 0, y: 50 }" :animate="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 1, delay: 1 }" class="text-4xl font-extrabold mt-4">I'm a <span
                            class="bg-linear-to-r from-emerald-500 to-cyan-500 via-emerald-300 bg-clip-text text-transparent">Software
                            Engineer</span>
                    </motion.h2>
                    <motion.img v-show="!isDesktop" :initial="{ opacity: 0, scale: 0.5 }"
                        :animate="{ opacity: 1, scale: [1, 1.1, 1] }"
                        :transition="{ duration: 1, delay: 2, scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }"
                        src="/images/introduction-home.jpg" class="w-96 h-96 rounded-full object-cover mt-8" />
                    <motion.p :initial="{ opacity: 0, x: 0 }" :animate="{ opacity: 1, x: 0 }"
                        :transition="{ duration: 1, delay: 1 }" class="text-white text-3xl mt-8">A software engineer
                        with 3+ years of experience. I make meaningful and efficient products that create an equilibrium
                        between user needs and business goals.
                    </motion.p>
                    <div class="w-fit mt-8 flex items-center justify-center gap-4">
                        <motion.div v-for="(link, index) in socialLinks" :key="link.name"
                            :initial="{ opacity: 0, x: 30 }" :animate="{ opacity: 1, x: 0 }"
                            :transition="{ duration: 0.5, delay: 1.5 + index * 0.15 }">
                            <ULink
                                class="w-10 h-10 text-emerald-400 hover:text-emerald-300 rounded-full flex items-center justify-center border-4 border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:scale-105 transition-all duration-400"
                                :href="link.url" target="_blank">
                                <UIcon :name="link.icon" class="w-5 h-5" />
                            </ULink>
                        </motion.div>
                    </div>
                    <motion.a :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
                        :transition="{ duration: 0.5, delay: 2.5 }" class="w-full"
                        href="/files/Nguyen-Ngoc-Ha-Jammie.pdf" download>
                        <UButton variant="soft"
                            class="bg-emerald-500 mt-8 w-full lg:w-fit justify-center h-20 lg:h-10 text-xl lg:text-base cursor-pointer font-semibold text-gray-800 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:scale-105 transition-all duration-400 rounded-full p-4">
                            <UIcon name="i-lucide-download" class="w-7 h-7 lg:w-5 lg:h-5" />
                            Download CV
                        </UButton>
                    </motion.a>
                </div>
                <motion.img v-show="isDesktop" :initial="{ opacity: 0, scale: 0.5 }"
                    :animate="{ opacity: 1, scale: [1, 1.1, 1] }"
                    :transition="{ duration: 1, delay: 2, scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }"
                    src="/images/introduction-home.jpg" class="w-96 h-96 rounded-full object-cover" />
            </div>
        </div>
    </ClientOnly>
</template>