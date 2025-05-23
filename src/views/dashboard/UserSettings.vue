<!-- src/views/dashboard/UserSettings.vue -->
<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">⚙️ User Settings</h1>
    <form @submit.prevent="update" class="space-y-4 max-w-md">
      <div>
        <label class="block text-sm font-medium">Display Name</label>
        <input
          v-model="name"
          type="text"
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        Save Changes
      </button>
      <p v-if="success" class="text-green-500">✅ Profile updated!</p>
    </form>
  </div>
</template>

<script setup>
 import { useAuthStore } from '@/store/auth'
import { ref } from 'vue'

const auth = useAuthStore()
const name = ref(auth.user?.displayName || '')
const success = ref(false)

const update = async () => {
  await auth.updateUserProfile(name.value)
  success.value = true
}
</script>
