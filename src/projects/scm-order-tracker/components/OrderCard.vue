<template>
  <div class="bg-dark-surface border border-dark-border rounded-lg p-6 hover:border-orange-500 transition-all duration-300 cursor-pointer"
       @click="$emit('view-details', order)">
    <!-- Header -->
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-lg font-semibold text-white">{{ order.id }}</h3>
        <p class="text-sm text-gray-400">{{ order.destination }}</p>
      </div>
      <div @click.stop="$emit('change-status', order)" class="cursor-pointer hover:scale-105 transition-transform">
        <StatusBadge :status="order.status" />
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="mb-4">
      <div class="flex justify-between text-sm text-gray-400 mb-2">
        <span>Progress</span>
        <span>{{ order.progress }}%</span>
      </div>
      <div class="w-full bg-gray-700 rounded-full h-2">
        <div class="bg-gradient-to-r from-orange-500 to-purple-600 h-2 rounded-full transition-all duration-500"
             :style="{ width: order.progress + '%' }"></div>
      </div>
    </div>

    <!-- Order Details -->
    <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
      <div>
        <p class="text-gray-400">Carrier</p>
        <p class="text-white font-medium">{{ order.carrier }}</p>
      </div>
      <div>
        <p class="text-gray-400">ETA</p>
        <p class="text-white font-medium">{{ formatETA(order.eta) }}</p>
      </div>
      <div>
        <p class="text-gray-400">Priority</p>
        <PriorityBadge :priority="order.priority" />
      </div>
      <div>
        <p class="text-gray-400">Risk Score</p>
        <RiskScore :score="order.riskScore" />
      </div>
    </div>

    <!-- Route Info -->
    <div class="flex items-center justify-between text-sm">
      <div class="flex items-center text-gray-400">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        {{ order.currentLocation }}
      </div>
      <div class="text-gray-400">
        Last updated: {{ order.lastUpdate }}
      </div>
    </div>

    <!-- Alert Icons -->
    <div class="flex justify-end mt-3 space-x-2" v-if="order.alerts && order.alerts.length > 0">
      <div v-for="alert in order.alerts" :key="alert" 
           class="w-6 h-6 rounded-full flex items-center justify-center text-xs"
           :class="getAlertClass(alert)"
           :title="alert">
        {{ getAlertIcon(alert) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import StatusBadge from './StatusBadge.vue'
import PriorityBadge from './PriorityBadge.vue'
import RiskScore from './RiskScore.vue'

defineProps({
  order: {
    type: Object,
    required: true
  }
})

defineEmits(['view-details', 'change-status'])

function formatETA(eta) {
  const date = new Date(eta)
  const now = new Date()
  const diffHours = Math.round((date - now) / (1000 * 60 * 60))
  
  if (diffHours < 0) {
    return `${Math.abs(diffHours)}h overdue`
  } else if (diffHours < 24) {
    return `${diffHours}h remaining`
  } else {
    return date.toLocaleDateString()
  }
}

function getAlertClass(alert) {
  const classes = {
    'weather': 'bg-blue-500 text-white',
    'traffic': 'bg-yellow-500 text-black',
    'delay': 'bg-red-500 text-white',
    'route': 'bg-purple-500 text-white'
  }
  return classes[alert] || 'bg-gray-500 text-white'
}

function getAlertIcon(alert) {
  const icons = {
    'weather': '🌧️',
    'traffic': '🚧',
    'delay': '⏰',
    'route': '🗺️'
  }
  return icons[alert] || '⚠️'
}
</script>
