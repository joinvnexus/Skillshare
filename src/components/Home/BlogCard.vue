<template>
  <section class="home-surface overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/82 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-6">
      <div class="mb-7 sm:mb-8">
        <p class="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Latest Articles</p>
        <h2 class="mt-2 text-3xl font-bold text-slate-950">Fresh ideas for builders and learners.</h2>
        <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Recent writing, practical guidance, and product-adjacent updates styled to fit the refreshed homepage.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6">
        <article
          v-for="post in featuredPostsList"
          :key="post.id"
          class="blog-card group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90"
          @click="viewPost(post)"
        >
          <div class="relative h-52 overflow-hidden">
            <img
              :src="post.image || fallbackImage"
              :alt="post.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-950/24 to-transparent"></div>
            <div class="absolute left-4 top-4">
              <span class="rounded-full bg-white/92 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-700">
                {{ post.category }}
              </span>
            </div>
            <div class="absolute bottom-4 left-4 right-4 text-white">
              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">{{ formatDate(post.published_at) }}</p>
              <h3 class="mt-2 text-xl font-semibold leading-7">{{ post.title }}</h3>
            </div>
          </div>

          <div class="p-5 sm:p-6">
            <p class="line-clamp-3 text-sm leading-7 text-slate-600">{{ post.snippet }}</p>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-sm font-medium text-slate-500">{{ post.authorName }}</span>
              <button
                class="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                @click.stop="viewPost(post)"
              >
                Read More
              </button>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-8 flex justify-center sm:mt-10">
        <router-link
          to="/blog"
          class="btn-brand inline-flex items-center rounded-xl px-6 py-3 font-semibold"
        >
          View All Articles
          <svg
            class="ml-3 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </router-link>
      </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { format } from 'date-fns'

export default {
  name: 'BlogCard',
  data() {
    return {
      fallbackImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80'
    }
  },
  computed: {
    ...mapGetters('blog', ['allPosts']),
    featuredPostsList() {
      return this.allPosts.slice(0, 3)
    }
  },
  created() {
    this.$store.dispatch('blog/fetchPosts')
  },
  methods: {
    viewPost() {
      this.$router.push({ name: 'Blog' })
    },
    formatDate(dateString) {
      if (!dateString) return 'No date'
      try {
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return 'Invalid date'
        return format(date, 'MMMM d, yyyy')
      } catch (e) {
        return 'Invalid date'
      }
    }
  }
}
</script>

<style scoped>
.blog-card {
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
  transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  border-color: color-mix(in srgb, var(--brand) 20%, white 80%);
  box-shadow: 0 24px 50px rgba(15, 23, 42, 0.14);
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
