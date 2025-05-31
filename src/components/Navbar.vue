<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-lg">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="text-2xl font-bold gradient-text hover:animate-pulse">
          RUWΔIN KΞLLY
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-8">
          <router-link 
            v-for="link in navLinks" 
            :key="link.name"
            :to="link.path" 
            class="nav-link text-text-primary hover:text-primary-orange transition-colors duration-300 font-medium"
            :class="{ 'text-primary-orange': $route.path === link.path }"
          >
            {{ link.name }}
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu" 
          class="md:hidden text-text-primary hover:text-primary-orange transition-colors duration-300"
          aria-label="Toggle mobile menu"
        >
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <Transition name="mobile-menu">
        <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pb-4">
          <div class="flex flex-col space-y-4">
            <router-link 
              v-for="link in navLinks" 
              :key="link.name"
              :to="link.path" 
              @click="closeMobileMenu"
              class="nav-link text-text-primary hover:text-primary-orange transition-colors duration-300 font-medium py-2"
              :class="{ 'text-primary-orange': $route.path === link.path }"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Me', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'AWS Calculator', path: '/aws-calculator' },
  { name: 'Terraform Demo', path: '/terraform-demo' },
  { name: 'Contact', path: '/contact' }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background: linear-gradient(135deg, #ff6c00 0%, #a678ff 100%);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>