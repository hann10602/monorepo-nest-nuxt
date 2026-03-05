<script setup lang="ts">
import { motion } from 'motion-v'

type LocaleCode = 'en' | 'vi'
const { isDarkMode, isMobile } = storeToRefs(useConfigStore())
const { locales, setLocale, locale } = useI18n()
const selectedLocale = ref<LocaleCode>(locale.value as LocaleCode)
const isMenuOpen = ref<boolean>(false)

const localeItems = computed(() => locales.value.map(l => ({ label: l.name, value: l.code as LocaleCode })))

watch(selectedLocale, (newLocal) => {
  setLocale(newLocal)
})


</script>

<template>
  <header
    class="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
    <div class="w-full pr-8 pl-16 py-4">
      <div class="flex items-center justify-between">
        <motion.div :initial="{ opacity: 0.3, x: '100%' }" :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.3 }" v-if="isMenuOpen" class="absolute top-0 left-0 w-full h-screen bg-black z-50">
          <div class="flex items-center justify-between py-4 px-6">
            <div
              class="bg-linear-to-r from-emerald-500 to-cyan-500 via-emerald-300 bg-clip-text text-transparent text-4xl md:text-2xl font-bold">
              Portfolio
            </div>
            <div class="rounded-xl cursor-pointer bg-white text-black px-2 py-1.5 flex items-center justify-center"
              @click="isMenuOpen = !isMenuOpen">
              <UIcon name="i-lucide-menu" class="size-9" />
            </div>
          </div>
          <div class="w-full h-0.5 bg-gray-200"></div>
          <div>asd</div>
        </motion.div>

        <!-- Logo/Brand -->
        <template v-if="isMobile">
          <div class="w-12"></div>
        </template>
        <NuxtLink to="/"
          class="bg-linear-to-r from-emerald-500 to-cyan-500 via-emerald-300 bg-clip-text text-transparent text-4xl md:text-2xl font-bold">
          Portfolio
        </NuxtLink>

        <!-- Navigation -->
        <template v-if="isMobile">
          <div class="rounded-xl cursor-pointer bg-black px-2 py-1.5 flex items-center justify-center"
            @click="isMenuOpen = !isMenuOpen">
            <UIcon name="i-lucide-menu" class="size-9" />
          </div>
        </template>
        <template v-else>
          <nav class="flex items-center gap-6">

            <!-- Dark Mode Toggle Button -->
            <ClientOnly>
              <USwitch v-model="isDarkMode" size="xl" checked-icon="i-lucide-moon" unchecked-icon="i-lucide-sun" />
            </ClientOnly>

            <USelect v-model="selectedLocale" :items="localeItems" class="w-32" />

            <NuxtLink to="/login"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              {{ $t('auth.signIn') }}
            </NuxtLink>
            <NuxtLink to="/register"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              {{ $t('auth.signUp') }}
            </NuxtLink>
          </nav>
        </template>
      </div>
    </div>
  </header>
</template>