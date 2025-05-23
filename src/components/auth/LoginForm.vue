<!-- src/components/auth/LoginForm.vue -->
<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Log In</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      
      <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
      
      <button
        type="submit"
        :disabled="loading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <span v-if="!loading">Log In</span>
        <span v-else>Logging In...</span>
      </button>
    </form>
    
    <div class="mt-4 text-center">
      <p class="text-sm text-gray-600">
        Don't have an account?
        <router-link to="/signup" class="text-blue-600 hover:text-blue-500">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)
    const loading = ref(false)
    
    const store = useStore()
    const router = useRouter()
    
    const handleSubmit = async () => {
      try {
        loading.value = true
        error.value = null
        
        const result = await store.dispatch('auth/login', {
          email: email.value,
          password: password.value
        })
        
        if (result.success) {
          router.push('/dashboard')
        } else {
          error.value = result.error
        }
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }
    
    return { email, password, error, loading, handleSubmit }
  }
}
</script>