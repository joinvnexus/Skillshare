// // src/store/auth.js
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '../firebase'
// import { auth } from '../firebase'

// export default {
//   namespaced: true,
//   state: {
//     user: null,
//     authIsReady: false,
//     error: null
//   },
//   mutations: {
//     setUser(state, payload) {
//       state.user = payload
//       state.error = null
//     },
//     setAuthIsReady(state, payload) {
//       state.authIsReady = payload
//     },
//     setError(state, payload) {
//       state.error = payload
//     }
//   },
//   actions: {
//     async signup({ commit }, { email, password }) {
//       try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password)
//         commit('setUser', userCredential.user)
//         return { success: true }
//       } catch (error) {
//         commit('setError', error.message)
//         return { success: false, error: error.message }
//       }
//     },
//     async login({ commit }, { email, password }) {
//       try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password)
//         commit('setUser', userCredential.user)
//         return { success: true }
//       } catch (error) {
//         commit('setError', error.message)
//         return { success: false, error: error.message }
//       }
//     },
//     async logout({ commit }) {
//       try {
//         await signOut(auth)
//         commit('setUser', null)
//         return { success: true }
//       } catch (error) {
//         commit('setError', error.message)
//         return { success: false, error: error.message }
//       }
//     }
//   },
//   getters: {
//     isAuthenticated: (state) => !!state.user,
//     currentUser: (state) => state.user,
//     authError: (state) => state.error
//   }
// }