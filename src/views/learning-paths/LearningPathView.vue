<template>
  <DynamicPathPage :page="page" />
</template>

<script setup>
import DynamicPathPage from "@/components/LearningPaths/DynamicPathPage.vue"

defineProps({
  page: {
    type: Object,
    required: true
  }
})
</script>
