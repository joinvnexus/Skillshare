// src/store/modules/auth.js
import { auth } from '@/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

export default {
  namespaced: true,
  state: () => ({
    user: null,
    authIsReady: false,
    error: null,
    loading: false
  }),
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_AUTH_READY(state, isReady) {
      state.authIsReady = isReady
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading
    }
  },
  actions: {
    async initializeAuth({ commit }) {
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          commit('SET_USER', user)
          commit('SET_AUTH_READY', true)
          unsubscribe()
          resolve()
        })
      })
    },

    async signup({ commit }, { email, password }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        commit('SET_USER', userCredential.user)
        return { success: true }
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async login({ commit }, { email, password }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        commit('SET_USER', userCredential.user)
        return { success: true }
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async logout({ commit }) {
      commit('SET_LOADING', true)
      
      try {
        await signOut(auth)
        commit('SET_USER', null)
        return { success: true }
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },
  getters: {
    currentUser: (state) => state.user,
    isAuthenticated: (state) => !!state.user,
    authError: (state) => state.error,
    isLoading: (state) => state.loading,
    authReady: (state) => state.authIsReady
  }
}