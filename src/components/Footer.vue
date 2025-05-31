<template>
  <footer class="relative bg-gradient-to-br from-gray-900 via-neutral-900 to-black text-neutral-300 overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-4 left-1/4 w-32 h-32 bg-gradient-to-r from-primary-orange/20 to-transparent rounded-full blur-xl animate-pulse"></div>
      <div class="absolute bottom-2 right-1/4 w-24 h-24 bg-gradient-to-r from-primary-purple/20 to-transparent rounded-full blur-xl animate-pulse delay-1000"></div>
    </div>
    
    <!-- Glass Effect Overlay -->
    <div class="glass relative z-10 px-6 py-6">
      <div class="max-w-7xl mx-auto">
        
        <!-- Main Footer Content -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          
          <!-- Branding & Role -->
          <div class="text-center md:text-left">
            <h3 class="gradient-text font-bold text-base mb-1">RUWΔIN KΞLLY</h3>
            <p class="text-xs text-neutral-400 mb-1">Ops Leader | ERP & SCM Architect | Backend & Infra Engineer</p>
            <div class="flex flex-wrap justify-center md:justify-start gap-2 text-xs">
              <span class="tech-badge">SAP</span>
              <span class="tech-badge">SAGE</span>
              <span class="tech-badge">SYSPRO</span>
              <span class="tech-badge">AWS</span>
              <span class="tech-badge">Python</span>
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="flex flex-col items-center gap-2">
            <div class="flex flex-wrap justify-center gap-4 text-xs">
              <router-link to="/" class="nav-link">Home</router-link>
              <router-link to="/projects" class="nav-link">Projects</router-link>
              <router-link to="/aws-calculator" class="nav-link">AWS Calculator</router-link>
              <router-link to="/terraform-demo" class="nav-link">Terraform Demo</router-link>
              <router-link to="/contact" class="nav-link">Contact</router-link>
            </div>
            <p class="text-xs text-neutral-500 flex items-center gap-1">
              <span class="inline-block w-2 h-2 bg-gradient-to-r from-primary-orange to-primary-purple rounded-full animate-pulse"></span>
              Built with Vue 3 & Tailwind CSS • Deployed on Vercel
            </p>
          </div>

          <!-- Contact Info -->
          <div class="text-xs text-center md:text-right space-y-1">
            <a href="mailto:admin@ruwainkelly.co.za" class="contact-link flex items-center justify-center md:justify-end gap-2">
              <span class="text-primary-orange">✉</span>
              admin@ruwainkelly.co.za
            </a>
            <p class="flex items-center justify-center md:justify-end gap-2">
              <span class="text-primary-purple">📱</span>
              +27 74 760 7776
            </p>
            <p class="flex items-center justify-center md:justify-end gap-2">
              <span class="text-primary-orange">📍</span>
              Cape Town, South Africa
            </p>
          </div>
        </div>

        <!-- Divider with Gradient -->
        <div class="relative my-4">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gradient"></div>
          </div>
        </div>

        <!-- Copyright -->
        <div class="text-center">
          <p class="text-xs text-neutral-500 flex items-center justify-center gap-2">
            © {{ currentYear }} 
            <span class="gradient-text font-semibold">RUWΔIN KΞLLY</span>
            • All rights reserved
            <span class="hidden sm:inline">•</span>
            <span class="hidden sm:inline text-primary-orange">Made with ❤️ in Cape Town</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* Glass effect */
.glass {
  background: rgba(17, 24, 39, 0.6);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Gradient text matching site theme */
.gradient-text {
  background: linear-gradient(135deg, #ff6c00 0%, #a678ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Tech badges with site theme */
.tech-badge {
  background: rgba(255, 108, 0, 0.1);
  color: #ff6c00;
  border: 1px solid rgba(255, 108, 0, 0.3);
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
}

.tech-badge:hover {
  background: rgba(255, 108, 0, 0.2);
  border-color: #ff6c00;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(255, 108, 0, 0.3);
}

/* Navigation links with hover effects */
.nav-link {
  color: #a1a1aa;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  font-weight: 500;
}

.nav-link:hover {
  color: #ff6c00;
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  color: #a678ff;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(135deg, #ff6c00, #a678ff);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Contact link styling */
.contact-link {
  color: #a1a1aa;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-link:hover {
  color: #ff6c00;
  transform: translateY(-1px);
}

/* Gradient border for divider */
.border-gradient {
  background: linear-gradient(90deg, transparent, #ff6c00, #a678ff, transparent);
  height: 1px;
}

/* Primary color definitions for consistency */
.text-primary-orange {
  color: #ff6c00;
}

.text-primary-purple {
  color: #a678ff;
}

.bg-primary-orange\/20 {
  background-color: rgba(255, 108, 0, 0.2);
}

.bg-primary-purple\/20 {
  background-color: rgba(166, 120, 255, 0.2);
}

.from-primary-orange {
  --tw-gradient-from: #ff6c00;
}

.to-primary-purple {
  --tw-gradient-to: #a678ff;
}

/* Responsive improvements */
@media (max-width: 768px) {
  .tech-badge {
    font-size: 0.625rem;
    padding: 0.0625rem 0.375rem;
  }
  
  .nav-link {
    font-size: 0.75rem;
  }
}

/* Subtle animation for status indicator */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Delay for second background element */
.delay-1000 {
  animation-delay: 1s;
}
</style>

