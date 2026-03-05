<script setup lang="ts">
const { isMobile } = storeToRefs(useConfigStore())
</script>

<template>
    <div class="relative w-full h-screen flex items-center justify-center bg-black">
        <NuxtLink to="/" class="absolute top-20 left-20" v-if="!isMobile">
            <UIcon name="i-lucide-arrow-left" class="size-10" />
        </NuxtLink>
        <slot />
    </div>
</template>