<template>
  <footer class="bg-dark-bg border-t border-gray-800 mt-20">
    <div class="container mx-auto px-4 py-12">
      <!-- Main Footer Content -->
      <div class="grid md:grid-cols-3 gap-8 mb-8">
        <!-- Brand Section -->
        <div class="space-y-4">
          <h3 class="text-2xl font-bold gradient-text">RUWΔIN KΞLLY</h3>
          <p class="text-text-secondary text-sm leading-relaxed">
            ERP • Cloud • Backend Architect<br>
            Building intelligent systems with modern technologies
          </p>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-text-primary">Quick Links</h4>
          <nav class="flex flex-col space-y-2">
            <router-link 
              v-for="link in footerLinks" 
              :key="link.name"
              :to="link.path" 
              class="text-text-secondary hover:text-primary-orange transition-colors duration-300 text-sm"
            >
              {{ link.name }}
            </router-link>
          </nav>
        </div>

        <!-- Contact & Social -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-text-primary">Connect</h4>
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-text-secondary hover:text-primary-orange hover:bg-gray-700 transition-all duration-300"
              :title="social.name"
            >
              <component :is="social.icon" class="w-5 h-5" />
            </a>
          </div>
          <div class="space-y-2 text-sm text-text-secondary">
            <p>📧 info@ruwainkelly.com</p>
            <p>🌍 Available for remote opportunities</p>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p class="text-text-secondary text-sm">
          © {{ currentYear }} RUWΔIN KΞLLY. All rights reserved.
        </p>
        <div class="flex space-x-6 text-sm text-text-secondary">
          <span>Built with Vue 3 & Tailwind CSS</span>
          <span>•</span>
          <span>Deployed on Vercel</span>
        </div>
      </div>
    </div>

    <!-- Animated Background Elements -->
    <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-primary opacity-20"></div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { 
  EnvelopeIcon,
  GlobeAltIcon,
  UserIcon
} from '@heroicons/vue/24/outline'

const currentYear = computed(() => new Date().getFullYear())

const footerLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Resume', path: '/resume' },
  { name: 'Contact', path: '/contact' },
  { name: 'AWS Calculator', path: '/aws-calculator' }
]

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/iamruwainkelly',
    icon: GlobeAltIcon
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/mr-r',
    icon: UserIcon
  },
  {
    name: 'Email',
    url: 'mailto:info@ruwainkelly.com',
    icon: EnvelopeIcon
  }
]
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(90deg, #ff6c00, #a678ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
