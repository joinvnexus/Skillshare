<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h2 class="text-2xl font-bold mb-2 md:mb-0">
        Results for "{{ searchQuery }}"
      </h2>
      <div class="flex items-center space-x-2">
        <select v-model="sortBy" class="border rounded px-2 py-1">
          <option value="relevance">Relevance</option>
          <option value="date">Newest</option>
          <option value="popularity">Popularity</option>
        </select>
        <button @click="clearSearch" class="text-sm text-gray-500 hover:underline">Clear</button>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-10">
      <span>Loading...</span>
    </div>
    <div v-else>
      <div v-if="filteredCourses.length" class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="course in paginatedCourses" :key="course.id" class="bg-white rounded shadow p-4 flex flex-col">
          <img :src="course.image" alt="" class="h-32 w-full object-cover rounded mb-2">
          <h3 class="font-semibold text-lg mb-1">{{ course.title }}</h3>
          <p class="text-gray-600 flex-1">{{ course.description }}</p>
          <div class="mt-2 flex flex-wrap gap-1">
            <span v-for="tag in course.tags" :key="tag" class="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs">{{ tag }}</span>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 py-10">
        No courses found.
      </div>
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8 space-x-2">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="['px-3 py-1 rounded', currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200']"
        >{{ page }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortBy: 'relevance',
      currentPage: 1,
      perPage: 6,
      loading: false,
    }
  },
  computed: {
    searchQuery() {
      return this.$route.query.q || '';
    },
    allCourses() {
      // Replace with your Vuex getter or API data
      return this.$store.state.courses.allCourses || [];
    },
    filteredCourses() {
      let results = this.allCourses.filter(course =>
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      // Sorting logic
      if (this.sortBy === 'date') {
        results = results.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (this.sortBy === 'popularity') {
        results = results.slice().sort((a, b) => b.popularity - a.popularity);
      }
      return results;
    },
    totalPages() {
      return Math.ceil(this.filteredCourses.length / this.perPage);
    },
    paginatedCourses() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredCourses.slice(start, start + this.perPage);
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
    }
  },
  methods: {
    clearSearch() {
      this.$router.push({ name: 'SearchResults', query: { q: '' } });
    }
  }
}
</script>

<style scoped>
/* Add responsive tweaks if needed */
</style>