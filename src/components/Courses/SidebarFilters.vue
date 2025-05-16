<template>
  <aside class="w-full lg:w-1/4" data-aos="fade-right">
    <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <!-- Search -->
      <div class="mb-6">
        <h3 class="font-semibold text-lg mb-3">Search</h3>
        <input
          :value="searchQuery"
          @input="handleSearchInput"
          type="text"
          placeholder="Search courses..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Categories -->
      <div class="mb-6" v-if="allCategories.length">
        <h3 class="font-semibold text-lg mb-3">Categories</h3>
        <div class="space-y-2">
          <label
            v-for="category in allCategories"
            :key="category"
            class="flex items-center space-x-2"
          >
            <input
              type="checkbox"
              :value="category"
              :checked="selectedCategories.includes(category)"
              @change="toggleCategory(category)"
              class="rounded text-blue-600"
            />
            <span>{{ category }}</span>
          </label>
        </div>
      </div>

      <!-- Levels -->
      <div class="mb-6" v-if="allLevels.length">
        <h3 class="font-semibold text-lg mb-3">Difficulty Levels</h3>
        <div class="space-y-2">
          <label
            v-for="level in allLevels"
            :key="level"
            class="flex items-center space-x-2"
          >
            <input
              type="checkbox"
              :value="level"
              :checked="selectedLevels.includes(level)"
              @change="toggleLevel(level)"
              class="rounded text-blue-600"
            />
            <span>{{ level }}</span>
          </label>
        </div>
      </div>

      <!-- Price Range -->
      <div class="mb-6">
        <h3 class="font-semibold text-lg mb-3">Price Range</h3>
        <div class="space-y-4">
          <input
            type="range"
            v-model.number="priceRange[1]"
            :min="0"
            :max="1000"
            step="10"
            @change="handlePriceRangeChange"
            class="w-full"
          />
          <div class="flex justify-between">
            <span>$0</span>
            <span>${{ priceRange[1] }}</span>
          </div>
        </div>
      </div>

      <button
        @click="resetFilters"
        :disabled="!hasFilters"
        :class="{'opacity-50 cursor-not-allowed': !hasFilters}"
        class="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  </aside>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('courses', [
      'searchQuery',
      'selectedCategories',
      'selectedLevels',
      'priceRange'
    ]),
    ...mapGetters('courses', [
      'allCategories',
      'allLevels',
      'hasFilters'
    ])
  },
  methods: {
    ...mapActions('courses', [
      'updateSearchQuery',
      'updateSelectedCategories',
      'updateSelectedLevels',
      'updatePriceRange',
      'resetFilters'
    ]),
    handleSearchInput(e) {
      this.updateSearchQuery(e.target.value)
    },
    toggleCategory(category) {
      const newCategories = this.selectedCategories.includes(category)
        ? this.selectedCategories.filter(c => c !== category)
        : [...this.selectedCategories, category]
      this.updateSelectedCategories(newCategories)
    },
    toggleLevel(level) {
      const newLevels = this.selectedLevels.includes(level)
        ? this.selectedLevels.filter(l => l !== level)
        : [...this.selectedLevels, level]
      this.updateSelectedLevels(newLevels)
    },
    handlePriceRangeChange() {
      this.updatePriceRange([0, this.priceRange[1]])
    }
  }
}
</script>