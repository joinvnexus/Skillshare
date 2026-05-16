<template>
  <div class="space-y-4">
    <div v-if="items.length === 0" class="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface-soft)] px-4 py-10 text-center">
      <h3 class="text-lg font-semibold text-[var(--text)]">No FAQ available yet.</h3>
      <p class="mt-2 text-sm text-[var(--muted)]">Course questions and answers will appear here once they are added.</p>
    </div>

    <div
      v-for="faq in items"
      :key="faq.id || faq.question"
      class="overflow-hidden rounded-2xl border border-[var(--line)] bg-white"
    >
      <button
        class="flex w-full items-center justify-between bg-[var(--surface-soft)] px-4 py-4 text-left hover:bg-[var(--bg-alt)]"
        @click="toggleFaq(faq.id || faq.question)"
      >
        <span class="font-medium text-[var(--text)]">{{ faq.question }}</span>
        <i
          :class="isOpen(faq.id || faq.question) ? 'fa-chevron-up' : 'fa-chevron-down'"
          class="fas text-slate-600"
        ></i>
      </button>
      <div v-show="isOpen(faq.id || faq.question)" class="p-4 text-sm leading-7 text-[var(--muted)]">
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
  },
  data() {
    return {
      openKey: null
    }
  },
  computed: {
    items() {
      return this.faqs.map((faq, index) => ({
        id: faq.id || `faq-${index}`,
        question: faq.question,
        answer: faq.answer
      }))
    }
  },
  methods: {
    toggleFaq(key) {
      this.openKey = this.openKey === key ? null : key
    },
    isOpen(key) {
      return this.openKey === key
    }
  }
}
</script>
