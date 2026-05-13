import { normalizeBlogPost } from '@/lib/normalizers'
import { blogApi } from '@/modules/blog/api/blogApi'
import { resolveErrorMessage } from '@/shared/services/apiClient'

const state = {
  posts: [],
  loading: false,
  error: null
}

const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts
  },
  ADD_POST(state, post) {
    state.posts.push(post)
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async fetchPosts({ commit }) {
    try {
      commit('SET_LOADING', true)
      const response = await blogApi.listBlogs()
      const posts = response.data.map(normalizeBlogPost)

      commit('SET_POSTS', posts)
      return posts
    } catch (error) {
      commit('SET_ERROR', resolveErrorMessage(error))
      console.error('Error fetching posts:', error)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchFeaturedPosts({ commit }) {
    try {
      commit('SET_LOADING', true)
      const posts = (await blogApi.listFeaturedBlogs()).map(normalizeBlogPost)

      commit('SET_POSTS', posts)
      return posts
    } catch (error) {
      commit('SET_ERROR', resolveErrorMessage(error))
      console.error('Error fetching featured posts:', error)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchPostBySlug({ commit }, slug) {
    try {
      commit('SET_LOADING', true)
      const post = await blogApi.getBlogBySlug(slug)
      return normalizeBlogPost(post)
    } catch (error) {
      commit('SET_ERROR', resolveErrorMessage(error))
      console.error('Error fetching post by slug:', error)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createPost({ commit }, post) {
    try {
      const createdPost = normalizeBlogPost(await blogApi.createBlog(post))

      commit('ADD_POST', createdPost)
      return createdPost
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  },

  async incrementViewCount(_, slug) {
    try {
      await blogApi.incrementViewCount(slug)
    } catch (error) {
      console.warn('Error incrementing view count:', error)
    }
  }
}

const getters = {
  allPosts: (state) => state.posts,
  featuredPosts: (state) => state.posts.filter((post) => post.isFeatured).slice(0, 3),
  postsLoading: (state) => state.loading,
  postsError: (state) => state.error
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
