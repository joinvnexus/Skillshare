const state = {
  toasts: []
}

const mutations = {
  PUSH_TOAST(state, toast) {
    state.toasts.push(toast)
  },
  REMOVE_TOAST(state, id) {
    state.toasts = state.toasts.filter((toast) => toast.id !== id)
  }
}

const actions = {
  notify({ commit }, { type = 'info', message = '', timeout = 3500 } = {}) {
    const resolvedMessage = String(message || '').trim()
    if (!resolvedMessage) return null

    const id = `toast-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`
    commit('PUSH_TOAST', { id, type, message: resolvedMessage })

    if (timeout > 0) {
      setTimeout(() => {
        commit('REMOVE_TOAST', id)
      }, timeout)
    }

    return id
  },
  dismissToast({ commit }, id) {
    commit('REMOVE_TOAST', id)
  }
}

const getters = {
  toasts: (state) => state.toasts
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
