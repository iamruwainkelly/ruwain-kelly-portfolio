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
import { computed, h } from 'vue'

// GitHub Icon Component
const GitHubIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-5 h-5'
}, [
  h('path', {
    d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
  })
])

// LinkedIn Icon Component
const LinkedInIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-5 h-5'
}, [
  h('path', {
    d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
  })
])

// Email Icon Component
const EmailIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-5 h-5'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  })
])

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
    icon: GitHubIcon
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/mr-r',
    icon: LinkedInIcon
  },
  {
    name: 'Email',
    url: 'mailto:info@ruwainkelly.com',
    icon: EmailIcon
  }
]);
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(90deg, #ff6c00, #a678ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>