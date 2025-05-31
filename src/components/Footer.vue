<template>
  <footer class="bg-neutral-900 text-neutral-400 text-sm px-6 py-4">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-center md:text-left">
      
      <!-- Branding & Role -->
      <div>
        <p class="font-semibold text-white">RUWAIN KELLY</p>
        <p class="text-xs">Ops Leader | ERP & SCM Architect | Backend & Infra Engineer</p>
        <p class="text-xs">SAP • SAGE • SYSPRO • AWS • Python</p>
      </div>

      <!-- Links -->
      <div class="flex flex-col items-center md:items-start gap-1">
        <div class="flex gap-4 text-xs">
          <router-link to="/" class="hover:text-white transition-colors duration-300">Home</router-link>
          <router-link to="/projects" class="hover:text-white transition-colors duration-300">Projects</router-link>
          <router-link to="/aws-calculator" class="hover:text-white transition-colors duration-300">AWS Calculator</router-link>
          <router-link to="/terraform-demo" class="hover:text-white transition-colors duration-300">Terraform Demo</router-link>
          <router-link to="/contact" class="hover:text-white transition-colors duration-300">Contact</router-link>
        </div>
        <p class="text-xs mt-1">Built with Vue 3 & Tailwind CSS • Deployed on Vercel</p>
      </div>

      <!-- Contact -->
      <div class="text-xs text-center md:text-right">
        <p>📧 <a href="mailto:admin@ruwainkelly.co.za" class="hover:text-white transition-colors duration-300">admin@ruwainkelly.co.za</a></p>
        <p>📱 +27 74 760 7776</p>
        <p>📍 Cape Town, South Africa</p>
      </div>
    </div>

    <div class="mt-4 text-center text-xs text-neutral-500">
      © {{ currentYear }} RUWAIN KELLY. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

