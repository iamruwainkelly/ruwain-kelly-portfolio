<template>
  <div class="bg-dark-bg border border-dark-border rounded-lg p-4 hover:border-orange-500/50 transition-all duration-300">
    <!-- Carrier Header -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm mr-3">
          {{ carrier.name.charAt(0) }}
        </div>
        <div>
          <h4 class="font-semibold text-white">{{ carrier.name }}</h4>
          <p class="text-xs text-gray-400">{{ carrier.type }}</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-lg font-bold text-white">{{ carrier.onTimeRate }}%</p>
        <p class="text-xs text-gray-400">On-time</p>
      </div>
    </div>

    <!-- Performance Metrics -->
    <div class="space-y-2">
      <div class="flex justify-between text-sm">
        <span class="text-gray-400">Active Orders</span>
        <span class="text-white font-medium">{{ carrier.activeOrders }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-400">Avg Delivery Time</span>
        <span class="text-white font-medium">{{ carrier.avgDeliveryTime }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-400">Cost Efficiency</span>
        <span class="text-white font-medium">${{ carrier.costPerMile }}/mi</span>
      </div>
    </div>

    <!-- Performance Bar -->
    <div class="mt-3">
      <div class="flex justify-between text-xs text-gray-400 mb-1">
        <span>Performance Score</span>
        <span>{{ carrier.performanceScore }}/100</span>
      </div>
      <div class="w-full bg-gray-700 rounded-full h-2">
        <div class="h-2 rounded-full transition-all duration-500"
             :class="getPerformanceColor(carrier.performanceScore)"
             :style="{ width: carrier.performanceScore + '%' }"></div>
      </div>
    </div>

    <!-- Status Indicators -->
    <div class="flex justify-between items-center mt-3 pt-3 border-t border-dark-border">
      <div class="flex items-center text-xs">
        <div class="w-2 h-2 rounded-full mr-2"
             :class="carrier.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'"></div>
        <span class="text-gray-400">{{ carrier.status === 'active' ? 'Active' : 'Inactive' }}</span>
      </div>
      <div class="text-xs text-gray-400">
        {{ carrier.lastUpdate }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  carrier: {
    type: Object,
    required: true
  }
})

function getPerformanceColor(score) {
  if (score >= 90) return 'bg-green-500'
  if (score >= 75) return 'bg-yellow-500'
  return 'bg-red-500'
}
</script>
