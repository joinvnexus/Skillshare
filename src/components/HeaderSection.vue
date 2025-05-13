<template>
  <header class="fixed w-full bg-white shadow-sm z-50">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center">
        <img src="@/assets/logo.svg" alt="VueMastery Academy Logo" class="h-10">
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        <router-link 
          to="/" 
          class="text-gray-700 hover:text-blue-600 transition-colors"
          active-class="text-blue-600 font-medium"
        >Home</router-link>
        <router-link 
          to="/courses" 
          class="text-gray-700 hover:text-blue-600 transition-colors"
          active-class="text-blue-600 font-medium"
        >Courses</router-link>
        <router-link 
          to="/blog" 
          class="text-gray-700 hover:text-blue-600 transition-colors"
          active-class="text-blue-600 font-medium"
        >Blog</router-link>
        <router-link 
          to="/resources" 
          class="text-gray-700 hover:text-blue-600 transition-colors"
          active-class="text-blue-600 font-medium"
        >Resources</router-link>
        <router-link 
          to="/contact" 
          class="text-gray-700 hover:text-blue-600 transition-colors"
          active-class="text-blue-600 font-medium"
        >Contact Us</router-link>
        <router-link 
          to="/support" 
          class="text-gray-700 hover:text-blue-600 transition-colors"
          active-class="text-blue-600 font-medium"
        >Support</router-link>
      </nav>

      <!-- Right Side Elements -->
      <div class="flex items-center space-x-4">
        <!-- Search Bar - Hidbden on mobile -->
        <div class="relative hidden lg:block">

           <input
                :value="searchQuery"
                @input="handleSearchInput"
                type="text"
                placeholder="Search courses..."
                class="py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @keyup.enter="performSearch"
          >
          <button 
            @click="performSearch"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <!-- CTA Button - Hidden on mobile -->
        <router-link 
          to="/signup" 
          class="hidden md:inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Get Started
        </router-link>

        <!-- User Profile -->
        <div class="relative">
          <img 
            src="@/assets/avatar.png" 
            alt="User Profile" 
            @click="toggleDropdown"
            class="h-10 w-10 rounded-full border-2 border-gray-200 object-cover cursor-pointer hover:border-blue-500 transition-colors"
          >
          <!-- Dropdown Menu -->
          <div 
            v-if="showDropdown" 
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
            v-click-outside="closeDropdown"
          >
            <router-link 
              to="/profile" 
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              @click="closeDropdown"
            >Profile</router-link>
            <router-link 
              to="/notifications" 
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              @click="closeDropdown"
            >Notifications</router-link>
            <button 
              @click="logout"
              class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >Logout</button>
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden text-gray-700 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div 
      v-if="isMobileMenuOpen"
      class="md:hidden bg-white shadow-md"
    >
      <div class="container mx-auto px-4 py-2">
        <!-- Mobile Search -->
        <div class="relative mb-4">
          <input 
            type="text" 
            placeholder="Search courses..." 
            v-model="searchQuery"
            class="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @keyup.enter="performSearch"
          >
          <button 
            @click="performSearch"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <!-- Mobile Navigation -->
        <nav class="flex flex-col space-y-2">
          <router-link 
            to="/" 
            class="py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
            active-class="bg-blue-50 text-blue-600"
            @click="toggleMobileMenu"
          >Home</router-link>
          <router-link 
            to="/courses" 
            class="py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
            active-class="bg-blue-50 text-blue-600"
            @click="toggleMobileMenu"
          >Courses</router-link>
          <router-link 
            to="/blog" 
            class="py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
            active-class="bg-blue-50 text-blue-600"
            @click="toggleMobileMenu"
          >Blog</router-link>
          <router-link 
            to="/resources" 
            class="py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
            active-class="bg-blue-50 text-blue-600"
            @click="toggleMobileMenu"
          >Resources</router-link>
          <router-link 
            to="/contact" 
            class="py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
            active-class="bg-blue-50 text-blue-600"
            @click="toggleMobileMenu"
          >Contact Us</router-link>
          <router-link 
            to="/support" 
            class="py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
            active-class="bg-blue-50 text-blue-600"
            @click="toggleMobileMenu"
          >Support</router-link>
        </nav>

        <!-- Mobile CTA -->
        <router-link 
          to="/signup" 
          class="mt-4 inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          @click="toggleMobileMenu"
        >
          Get Started
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
 import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue';
export default {
  data() {
    return {
      searchQuery: '',
      showSearch: false,
      showDropdown: false,
      isMobileMenuOpen: false,
    };
  },
  computed: {
    // ...mapState(' Courses', ['searchQuery']),
  },
  methods: {
    handleSearchInput(event) {
      this.searchQuery = event.target.value;
    },
    performSearch() {
      // Handle search functionality
      console.log('Searching for:', this.searchQuery);
      this.searchQuery = '';
    },
    performSearch() {
      // Handle search functionality
      console.log('Searching for:', this.searchQuery);
      this.updateSearchQuery(this.searchQuery);
      this.searchQuery = '';
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      this.showDropdown = false;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      // Close dropdown when mobile menu is toggled
      if (this.isMobileMenuOpen) {
        this.showDropdown = false;
      }
    },
    logout() {
      // Handle logout
      console.log('Logging out...');
      this.showDropdown = false;
    },
  },
  setup() {
    const dropdownRef = ref(null)
    
    onClickOutside(dropdownRef, () => {
      this.closeDropdown()
    })

    return {
      dropdownRef
    }
  }
};
</script>