<template>
  <div class="min-h-screen bg-dark-bg text-white">
    <!-- Loading State -->
    <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange mx-auto mb-4"></div>
        <p class="text-xl text-gray-400">Loading SCM Order Tracker...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="min-h-screen">
      <!-- Header Spacing - Push content below navbar -->
      <div class="pt-20">
        <!-- App Controls -->
        <div class="px-4 mb-4">
          <div class="flex flex-wrap items-center justify-between bg-dark-surface/60 backdrop-blur-md border border-dark-border rounded-lg p-3">
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-sm text-gray-300">Portfolio Integration</span>
              </div>
              <div class="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                <span>2,347 Orders Tracked</span>
                <span>•</span>
                <span>94.2% On-Time Rate</span>
                <span>•</span>
                <span>23 Active Carriers</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <router-link 
                to="/projects/scm-order-tracker"
                class="text-sm text-primary-orange hover:text-primary-purple transition-colors"
              >
                View Details
              </router-link>
              <a 
                href="https://scm-order-tracker.vercel.app"
                target="_blank"
                class="text-sm bg-primary-orange/20 text-primary-orange px-3 py-1.5 rounded-lg hover:bg-primary-orange/30 transition-colors"
              >
                Open Standalone
              </a>
            </div>
          </div>
        </div>

        <!-- Use the embedded SCM Dashboard component directly -->
        <div class="relative px-4">
          <!-- For now, use iframe until we can properly integrate the component -->
          <iframe 
            ref="scmFrame"
            src="https://scm-order-tracker.vercel.app"
            @load="handleLoad"
            @error="handleError"
            class="w-full border-0 bg-dark-bg min-h-[calc(100vh-12rem)]"
            style="height: calc(100vh - 12rem);"
            title="SCM Order Tracker Dashboard"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          ></iframe>
          
          <!-- Loading overlay -->
          <div v-if="isLoading" class="absolute inset-0 bg-dark-bg/90 flex items-center justify-center">
            <div class="text-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-orange mx-auto mb-2"></div>
              <p class="text-sm text-gray-400">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Reactive state
const isLoading = ref(true)
const scmFrame = ref(null)

// Handle iframe load
const handleLoad = () => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

// Handle iframe error
const handleError = () => {
  console.warn('SCM iframe failed to load')
  isLoading.value = false
}

// Cleanup
onUnmounted(() => {
  if (scmFrame.value) {
    scmFrame.value.src = 'about:blank'
  }
})

// Initialize
onMounted(() => {
  // Add any initialization logic here
  setTimeout(() => {
    if (isLoading.value) {
      isLoading.value = false
    }
  }, 5000) // Fallback timeout
})
</script>

<style scoped>
/* Loading animations */
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
</style>
