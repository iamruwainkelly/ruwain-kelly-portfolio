<template>
  <div class="min-h-screen bg-dark-bg text-white">
    <!-- Loading State -->
    <div v-if="!loaded" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p class="text-xl text-gray-400">Loading AI Shipment ETA Predictor...</p>
      </div>
    </div>

    <!-- Main Application Iframe -->
    <div v-else class="min-h-screen">
      <!-- Header Spacing - Push content below navbar -->
      <div class="pt-20">
        
        <!-- Demo Mode Banner -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-4 mx-4 rounded-xl mb-4 text-center backdrop-blur-sm border border-blue-500/20 sticky top-20 z-40">
          <div class="flex items-center justify-center gap-3 text-lg font-semibold">
            <div class="text-2xl">🤖</div>
            <span>AI Shipment ETA Predictor - South Africa ↔ Europe Trade Routes</span>
            <div class="text-2xl">🌍</div>
          </div>
          <p class="text-sm text-blue-100 mt-1 opacity-90">
            Portfolio Demonstration | Machine Learning-Powered Logistics Platform
          </p>
        </div>

        <!-- Iframe Container -->
        <div class="px-4 pb-4">
          <div class="relative bg-white rounded-lg overflow-hidden shadow-2xl border-2 border-gray-600" style="height: 80vh">
            <iframe 
              :src="externalUrl"
              class="w-full h-full border-0"
              title="AI Shipment ETA Predictor"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loaded = ref(false)
const externalUrl = 'https://ai-shipment-eta.vercel.app'

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  loaded.value = true
})
</script>
