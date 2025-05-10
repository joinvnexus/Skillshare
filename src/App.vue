<!-- IT\src\App.vue -->

<template>
 <HeaderSection />
  <RouterView />
  <FooterComponent/>
</template>
<script setup>


import FooterComponent from './components/FooterComponent.vue';
import HeaderSection from './components/HeaderSection.vue';

</script>
<style scoped>

</style>
