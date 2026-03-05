<script setup lang="ts">
import AppHeader from './_components/AppHeader.vue';
import AppFooter from './_components/AppFooter.vue';

</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <AppHeader />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>