const state = {
  posts: []
}

const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts
  },
  ADD_POST(state, post) {
    state.posts.push(post)
  }
}

const actions = {
    async fetchPosts({ commit }) {
        try {
        // Simulate API call - in real app, use axios or fetch
        const response = await import('@/data/blogPosts.json')
        commit('SET_POSTS', response.default)
        return response.default
        } catch (error) {
        console.error('Error fetching posts:', error)
        throw error
        }
    },
    
    async addPost({ commit }, post) {
        try {
        // Simulate API call - in real app, use axios or fetch
        commit('ADD_POST', post)
        } catch (error) {
        console.error('Error adding post:', error)
        throw error
        }
    }
}

const getters = {
  allPosts: state => state.posts,
  featuredPosts: state => state.posts.slice(0, 3) // Get first 3 posts for highlights
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}