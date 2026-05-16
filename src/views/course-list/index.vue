<!-- src/views/ couserlist -->

<template>
  <div class="min-h-screen py-6">
    <HeroSection />
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <CatalogSummaryBar
        class="mb-8"
        :courses="$store.state.catalog.allCourses"
        label="Marketplace Snapshot"
        title="Browse the catalog with clear inventory context."
        description="This layer keeps the public marketplace legible before visitors dive into filters, pagination, and course-by-course evaluation."
      />

      <div class="flex flex-col gap-6 lg:flex-row lg:items-start">
        <SidebarFilters class="flex-shrink-0 lg:w-64 xl:w-72" :filtered-courses-count="courseCount" />

        <main class="min-w-0 flex-1">
          <CatalogToolbar
            :visible-count="paginatedCourses.length"
            :total-count="courseCount"
            :has-filters="hasFilters"
            :sort-by="localSortBy"
            @sort-change="updateSort"
          />

          <LoadingSpinner v-if="loading" />
          <ErrorState v-else-if="error" :error="error" @retry="initializeCatalogPage($route.query)" />
          <NoResults v-else-if="courseCount === 0" @reset="resetCatalogFilters" />
          <CourseGrid
            v-else
            :courses="paginatedCourses"
            @add-to-cart="handleAddToCart"
            @bookmark-toggle="handleWishlistToggle"
          />

          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-changed="handlePageChange"
            :loading="loading"
            :error="error"
          />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import AOS from 'aos'
  import 'aos/dist/aos.css'

  // Import components
  import HeroSection from '@/components/Courses/HeroSection.vue'
  import SidebarFilters from '@/components/Courses/SidebarFilters.vue'
  import CourseGrid from '@/components/Courses/CourseGrid.vue'
  import Pagination from '@/components/Courses/Pagination.vue'
  import ErrorState from '@/components/UI/ErrorState.vue'
  import NoResults from '@/components/UI/NoResults.vue'
  import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'
  import CatalogSummaryBar from '@/modules/catalog/components/CatalogSummaryBar.vue'
  import CatalogToolbar from '@/modules/catalog/components/CatalogToolbar.vue'

  export default {
    components: {
      HeroSection,
      SidebarFilters,
      CourseGrid,
      Pagination,
      ErrorState,
      NoResults,
      LoadingSpinner,
      CatalogSummaryBar,
      CatalogToolbar
    },
    // Updated computed and methods
    computed: {
      ...mapState('catalog', ['loading', 'error', 'currentPage', 'sortBy']),
      ...mapState('auth', ['user']),
      ...mapGetters('catalog', ['paginatedCourses', 'totalPages', 'courseCount', 'hasFilters']),

    },
    data() {
      return {
        localSortBy: 'newest'
      }
    },

    methods: {
      ...mapActions('catalog', ['initializeCatalogPage', 'setSortBy', 'resetFilters', 'changePage']),
      ...mapActions('cart', ['addToCart']),
      ...mapActions('wishlist', ['addToWishlist', 'removeFromWishlist', 'fetchWishlist']),
      syncCatalogQuery() {
        this.$router.replace({ name: 'courses', query: this.$store.getters['catalog/routeQuery'] })
      },
      updateSort(sortBy) {
        this.setSortBy(sortBy)
        this.syncCatalogQuery()
      },
      ensureAuthOrRedirect() {
        if (this.user) return true
        this.$router.push({ name: 'Login', query: { redirect: this.$route.fullPath } })
        return false
      },
      handleAddToCart(course) {
        if (!this.ensureAuthOrRedirect()) return
        this.addToCart(course)
      },
      async handleWishlistToggle(courseId) {
        if (!this.ensureAuthOrRedirect()) return
        const course = this.paginatedCourses.find((item) => item.id === courseId)
        const inWishlist = this.$store.getters['wishlist/isWishlisted'](courseId)
        if (inWishlist) {
          await this.removeFromWishlist(courseId)
          return
        }
      if (course) {
          await this.addToWishlist(course)
        }
      },
      resetCatalogFilters() {
        this.resetFilters()
        this.syncCatalogQuery()
      },
      handlePageChange(page) {
        this.changePage(page)
        this.syncCatalogQuery()
      }
    },
    async created() {
      this.localSortBy = this.sortBy
      await this.initializeCatalogPage(this.$route.query)
      if (this.user) {
        this.fetchWishlist().catch(() => {})
      }
    },
    // Initialize AOS on component mount
    mounted() {

      // Initialize AOS for animations
      AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out',
        offset: 10,
        delay: 100
      })
    },
    watch: {
      sortBy(newVal) {
        this.localSortBy = newVal
      },
      '$route.query': {
        deep: true,
        handler(query) {
          this.initializeCatalogPage(query)
        }
      },
      '$store.state.catalog.loading': function (newVal) {
        if (newVal) {
          AOS.refresh()
        }
      },
      '$store.state.catalog.error': function (newVal) {
        if (newVal) {
          AOS.refresh()
        }
      }
    }
  }
</script>
