<template>
  <div class="space-y-4">
    <div 
      v-for="faq in faqs"
      :key="faq.question"
      class="border rounded-lg"
    >
      <button 
        @click="faq.isOpen = !faq.isOpen"
        class="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
      >
        <span class="font-medium">{{ faq.question }}</span>
        <i 
          :class="faq.isOpen ? 'fa-chevron-up' : 'fa-chevron-down'"
          class="fas text-gray-600"
        ></i>
      </button>
      <div v-show="faq.isOpen" class="p-4 text-gray-700">
        {{ faq.answer }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    faqs: {
      type: Array,
      default: () => []
    }
  }
}
</script>