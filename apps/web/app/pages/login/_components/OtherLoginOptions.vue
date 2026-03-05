<script setup lang="ts">
const { isMobile } = storeToRefs(useConfigStore())
</script>

<template>
    <div class="flex md:flex-col flex-row w-full gap-4 items-center justify-center">
        <template v-if="isMobile">
            <UButton key="mobile-google" variant="soft"
                class="w-16 h-16 flex justify-center items-center text-gray-200 bg-gray-700">
                <UIcon class="text-3xl" name="i-fa-google" />
            </UButton>
            <UButton key="mobile-facebook" variant="soft"
                class="w-16 h-16 flex justify-center items-center text-gray-200 bg-gray-700">
                <UIcon class="text-3xl" name="i-fa-facebook" />
            </UButton>
            <UButton key="mobile-github" variant="soft"
                class="w-16 h-16 flex justify-center items-center text-gray-200 bg-gray-700">
                <UIcon class="text-3xl" name="i-fa-github" />
            </UButton>
        </template>
        <template v-if="!isMobile">
            <UButton key="desktop-google"
                class="w-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center cursor-pointer h-12">
                <UIcon name="i-fa-google" />
                Continute With Google
            </UButton>
            <UButton key="desktop-facebook"
                class="w-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center cursor-pointer h-12">
                <UIcon name="i-fa-facebook" />
                Continute With Facebook
            </UButton>
            <UButton key="desktop-github"
                class="w-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center cursor-pointer h-12">
                <UIcon name="i-fa-github" />
                Continute With Github
            </UButton>
        </template>
    </div>

    <template v-if="isMobile">
        <NuxtLink to="/register" class="w-full">
            <UButton variant="soft"
                class="w-full cursor-pointer font-bold bg-linear-to-r text-black from-cyan-500 to-blue-500 via-cyan-300 h-16 flex items-center justify-center mt-10">
                {{ $t('auth.signUp').toUpperCase() }}
            </UButton>
        </NuxtLink>
    </template>
    <template v-else>
        <p class="mt-6 text-sm text-gray-400 font-normal">
            {{ $t('auth.newHere') }}
            <NuxtLink to="/register"
                class="text-sm text-emerald-400 font-normal hover:underline transition-all duration-300 hover:text-emerald-300">
                {{
                    $t('auth.signUp') }}
            </NuxtLink>
        </p>
    </template>
</template>