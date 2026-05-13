<!-- App Layout -->
 <!-- src/App.vue -->
<template>
  <a v-if="showPublicChrome" href="#main-content" class="skip-link">Skip to main content</a>
  <HeaderSection v-if="showPublicChrome" />
  <ToastStack />

  <main id="main-content" tabindex="-1" :class="showPublicChrome ? 'page-shell' : 'dashboard-page-shell'">
    <router-view v-slot="{ Component }">
      <transition name="fade-slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <FooterComponent v-if="showPublicChrome" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HeaderSection from '@/components/Global/HeaderSection.vue'
import FooterComponent from '@/components/Global/FooterComponent.vue'
import ToastStack from '@/components/Global/ToastStack.vue'

const route = useRoute()
const showPublicChrome = computed(() => !route.path.startsWith('/dashboard'))
</script>
