<script setup lang="ts">
import AppHeader from './_components/AppHeader.vue';
import AppFooter from './_components/AppFooter.vue';

</script>

<template>
    <div>
      <AppHeader />
      <slot />
      <AppFooter />
    </div>
</template>