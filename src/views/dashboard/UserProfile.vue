<!-- src/views/dashboard/UserProfile.vue -->
<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">👤 User Profile</h1>
    <div class="bg-white shadow rounded p-6">
      <p><strong>Email:</strong> {{ user?.email }}</p>
      <p><strong>Display Name:</strong> {{ user?.displayName || 'Not set' }}</p>
      <p><strong>UID:</strong> {{ user?.uid }}</p>
    </div>
  </div>
</template>

<script setup>
 import { useAuthStore } from '@/store/auth'
import { computed } from 'vue'

const auth = useAuthStore()
const user = computed(() => auth.user)
</script>
