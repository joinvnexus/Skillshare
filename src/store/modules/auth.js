import { clearStoredSession, getStoredSession, setStoredSession } from '@/lib/api'
import { normalizeUser } from '@/lib/normalizers'
import { authApi } from '@/modules/auth/api/authApi'
import { resolveErrorMessage } from '@/shared/services/apiClient'

const pushToast = (dispatch, type, message) => {
  if (!message) return
  dispatch('ui/notify', { type, message }, { root: true })
}

export default {
  namespaced: true,
  state: () => ({
    user: null,
    authIsReady: false,
    error: null,
    loading: false,
    notification: null,
    initialized: false
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
    },
    SET_NOTIFICATION(state, notification) {
      state.notification = notification
    },
    CLEAR_NOTIFICATION(state) {
      state.notification = null
    },
    SET_INITIALIZED(state, initialized) {
      state.initialized = initialized
    }
  },
  actions: {
    async initializeAuth({ state, commit }) {
      if (state.initialized) {
        commit('SET_AUTH_READY', true)
        return
      }

      const { accessToken } = getStoredSession()

      if (!accessToken) {
        commit('SET_USER', null)
        commit('SET_AUTH_READY', true)
        commit('SET_INITIALIZED', true)
        return
      }

      try {
        const user = await authApi.getCurrentUser()
        commit('SET_USER', normalizeUser(user))
      } catch (error) {
        clearStoredSession()
        commit('SET_USER', null)
        commit('SET_ERROR', resolveErrorMessage(error))
      } finally {
        commit('SET_AUTH_READY', true)
        commit('SET_INITIALIZED', true)
      }
    },

    async signup({ commit, dispatch }, { email, password, displayName, role = 'STUDENT' }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const response = await authApi.register({
          name: displayName,
          email,
          password,
          role
        })

        setStoredSession({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken
        })
        commit('SET_USER', normalizeUser(response.user))
        commit('SET_NOTIFICATION', { type: 'success', message: 'Account created successfully.' })
        pushToast(dispatch, 'success', 'Account created successfully.')
        return { success: true }
      } catch (error) {
        const message = resolveErrorMessage(error)
        commit('SET_ERROR', message)
        commit('SET_NOTIFICATION', { type: 'error', message })
        pushToast(dispatch, 'error', message)
        return { success: false, error: message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async login({ commit, dispatch }, { email, password }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const response = await authApi.login({
          email,
          password
        })

        setStoredSession({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken
        })
        commit('SET_USER', normalizeUser(response.user))
        commit('SET_NOTIFICATION', { type: 'success', message: 'Logged in successfully!' })
        pushToast(dispatch, 'success', 'Logged in successfully!')
        return { success: true }
      } catch (error) {
        const message = resolveErrorMessage(error)
        commit('SET_ERROR', message)
        commit('SET_NOTIFICATION', { type: 'error', message })
        pushToast(dispatch, 'error', message)
        return { success: false, error: message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async logout({ commit, dispatch }) {
      commit('SET_LOADING', true)

      try {
        const { refreshToken } = getStoredSession()

        if (refreshToken) {
          await authApi.logout(refreshToken)
        }

        clearStoredSession()
        commit('SET_USER', null)
        commit('SET_NOTIFICATION', { type: 'success', message: 'Logged out successfully!' })
        pushToast(dispatch, 'success', 'Logged out successfully!')
        return { success: true }
      } catch (error) {
        const message = resolveErrorMessage(error)
        commit('SET_ERROR', message)
        commit('SET_NOTIFICATION', { type: 'error', message })
        pushToast(dispatch, 'error', message)
        return { success: false, error: message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateProfile({ commit, dispatch }, { displayName, photoURL }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const response = await authApi.updateProfile({
          ...(displayName !== undefined ? { name: displayName } : {}),
          ...(photoURL !== undefined ? { avatarUrl: photoURL } : {})
        })

        commit('SET_USER', normalizeUser(response))
        commit('SET_NOTIFICATION', { type: 'success', message: 'Profile updated successfully!' })
        pushToast(dispatch, 'success', 'Profile updated successfully!')
        return { success: true }
      } catch (error) {
        const message = resolveErrorMessage(error)
        commit('SET_ERROR', message)
        commit('SET_NOTIFICATION', { type: 'error', message })
        pushToast(dispatch, 'error', message)
        return { success: false, error: message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateEmail({ commit, dispatch }, payload) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const response = await authApi.requestEmailChange({
          newEmail: payload.email,
          currentPassword: payload.currentPassword
        })
        commit('SET_NOTIFICATION', { type: 'success', message: response?.message || 'Verification link generated.' })
        pushToast(dispatch, 'success', response?.message || 'Verification link generated.')
        return { success: true, data: response }
      } catch (error) {
        const message = resolveErrorMessage(error)
        commit('SET_ERROR', message)
        commit('SET_NOTIFICATION', { type: 'error', message })
        pushToast(dispatch, 'error', message)
        return { success: false, error: message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async confirmEmailChange({ commit, dispatch }, token) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await authApi.confirmEmailChange(token)
        if (response?.user) {
          commit('SET_USER', normalizeUser(response.user))
        }
        commit('SET_NOTIFICATION', { type: 'success', message: response?.message || 'Email updated.' })
        pushToast(dispatch, 'success', response?.message || 'Email updated.')
        return { success: true, data: response }
      } catch (error) {
        const message = resolveErrorMessage(error)
        commit('SET_ERROR', message)
        commit('SET_NOTIFICATION', { type: 'error', message })
        pushToast(dispatch, 'error', message)
        return { success: false, error: message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async forgotPassword({ commit, dispatch }, email) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const response = await authApi.forgotPassword(email)
        commit('SET_NOTIFICATION', { type: 'success', message: response?.message || 'Password reset link generated.' })
        pushToast(dispatch, 'success', response?.message || 'Password reset link generated.')
        return {
          success: true,
          data: response
        }
      } catch (error) {
        const message = resolveErrorMessage(error)
        commit('SET_ERROR', message)
        commit('SET_NOTIFICATION', { type: 'error', message })
        pushToast(dispatch, 'error', message)
        return { success: false, error: message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async resetPassword({ commit, dispatch }, { token, newPassword }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const response = await authApi.resetPassword({ token, newPassword })
        commit('SET_NOTIFICATION', { type: 'success', message: response?.message || 'Password reset successful.' })
        pushToast(dispatch, 'success', response?.message || 'Password reset successful.')
        return { success: true }
      } catch (error) {
        const message = resolveErrorMessage(error)
        commit('SET_ERROR', message)
        commit('SET_NOTIFICATION', { type: 'error', message })
        pushToast(dispatch, 'error', message)
        return { success: false, error: message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    updateUserProfile({ dispatch }, payload) {
      return dispatch('updateProfile', payload)
    },

    clearNotification({ commit }) {
      commit('CLEAR_NOTIFICATION')
    }
  },
  getters: {
    currentUser: (state) => state.user,
    userDisplayName: (state) => state.user?.displayName || state.user?.name || '',
    userEmail: (state) => state.user?.email || '',
    userPhotoURL: (state) => state.user?.photoURL || state.user?.avatarUrl || '',
    userRole: (state) => state.user?.role || 'STUDENT',
    isAuthenticated: (state) => !!state.user,
    authError: (state) => state.error,
    isLoading: (state) => state.loading,
    authReady: (state) => state.authIsReady,
    notification: (state) => state.notification
  }
}
