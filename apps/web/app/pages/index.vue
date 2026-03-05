<script setup lang="ts">
import Banner from './_components/Banner.vue';
import WorkExperience from './_components/work-experience/WorkExperience.vue';
import ContactForm from './_components/ContactForm.vue';
import Projects from './_components/projects/Projects.vue';
import AdvancedSkills from './_components/advanced-skills/AdvancedSkills.vue';



</script>

<template>
  <div class="w-full">
    <Banner />
    <div class="w-full pt-20 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 space-y-20">
      <WorkExperience />
      <AdvancedSkills />
      <Projects />
      <ContactForm />
    </div>
  </div>

</template>