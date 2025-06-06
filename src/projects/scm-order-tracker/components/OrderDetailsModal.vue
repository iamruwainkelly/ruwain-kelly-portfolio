<template>
  <div class="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50" @click="$emit('close')">
    <div class="bg-dark-surface border border-dark-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-dark-border">
        <div>
          <h2 class="text-2xl font-bold text-white">{{ order.id }}</h2>
          <p class="text-gray-400">Order Details & Tracking</p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-6">
        <!-- Status Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-dark-bg border border-dark-border rounded-lg p-4 text-center">
            <StatusBadge :status="order.status" class="mb-2" />
            <p class="text-2xl font-bold text-white">{{ order.progress }}%</p>
            <p class="text-sm text-gray-400">Complete</p>
          </div>
          <div class="bg-dark-bg border border-dark-border rounded-lg p-4 text-center">
            <RiskScore :score="order.riskScore" class="justify-center mb-2" />
            <p class="text-sm text-gray-400">Risk Assessment</p>
          </div>
          <div class="bg-dark-bg border border-dark-border rounded-lg p-4 text-center">
            <PriorityBadge :priority="order.priority" class="mb-2" />
            <p class="text-sm text-gray-400">Priority Level</p>
          </div>
        </div>

        <!-- Order Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-white mb-3">Order Information</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-400">Order ID</span>
                <span class="text-white font-medium">{{ order.id }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Customer</span>
                <span class="text-white font-medium">{{ order.customer || 'Global Logistics Inc.' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Weight</span>
                <span class="text-white font-medium">{{ order.weight || '245 kg' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Value</span>
                <span class="text-white font-medium">${{ order.value || '12,500' }}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-white mb-3">Shipping Details</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-400">Carrier</span>
                <span class="text-white font-medium">{{ order.carrier }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Destination</span>
                <span class="text-white font-medium">{{ order.destination }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">ETA</span>
                <span class="text-white font-medium">{{ new Date(order.eta).toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Last Update</span>
                <span class="text-white font-medium">{{ order.lastUpdate }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Route Tracking -->
        <div>
          <h3 class="text-lg font-semibold text-white mb-3">Route Progress</h3>
          <div class="bg-dark-bg border border-dark-border rounded-lg p-4">
            <div class="space-y-4">
              <RouteStep 
                v-for="(step, index) in routeSteps" 
                :key="index"
                :step="step"
                :isActive="index <= currentStep"
                :isCurrent="index === currentStep"
              />
            </div>
          </div>
        </div>

        <!-- Alerts & Issues -->
        <div v-if="order.alerts && order.alerts.length > 0">
          <h3 class="text-lg font-semibold text-white mb-3">Active Alerts</h3>
          <div class="space-y-2">
            <div v-for="alert in order.alerts" :key="alert" 
                 class="flex items-center p-3 rounded-lg"
                 :class="getAlertBgClass(alert)">
              <span class="text-lg mr-3">{{ getAlertIcon(alert) }}</span>
              <div>
                <p class="font-medium">{{ getAlertTitle(alert) }}</p>
                <p class="text-sm opacity-80">{{ getAlertDescription(alert) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3 pt-4 border-t border-dark-border">
          <button class="px-4 py-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 opacity-50 cursor-not-allowed">
            Update Status (Demo)
          </button>
          <button class="px-4 py-2 bg-dark-bg border border-dark-border text-white rounded-lg hover:border-orange-500 transition-all duration-300 opacity-50 cursor-not-allowed">
            Contact Carrier (Demo)
          </button>
          <button class="px-4 py-2 bg-dark-bg border border-dark-border text-white rounded-lg hover:border-orange-500 transition-all duration-300 opacity-50 cursor-not-allowed">
            Generate Report (Demo)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StatusBadge from './StatusBadge.vue'
import PriorityBadge from './PriorityBadge.vue'
import RiskScore from './RiskScore.vue'
import RouteStep from './RouteStep.vue'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])

const routeSteps = [
  { name: 'Order Placed', location: 'Origin Warehouse', completed: true },
  { name: 'Picked Up', location: 'Distribution Center', completed: true },
  { name: 'In Transit', location: props.order.currentLocation, completed: true },
  { name: 'Out for Delivery', location: 'Local Hub', completed: false },
  { name: 'Delivered', location: props.order.destination, completed: false }
]

const currentStep = computed(() => {
  return Math.floor((props.order.progress / 100) * (routeSteps.length - 1))
})

function getAlertBgClass(alert) {
  const classes = {
    'weather': 'bg-blue-500/20 text-blue-400',
    'traffic': 'bg-yellow-500/20 text-yellow-400',
    'delay': 'bg-red-500/20 text-red-400',
    'route': 'bg-purple-500/20 text-purple-400'
  }
  return classes[alert] || 'bg-gray-500/20 text-gray-400'
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

function getAlertTitle(alert) {
  const titles = {
    'weather': 'Weather Delay',
    'traffic': 'Traffic Congestion',
    'delay': 'Schedule Delay',
    'route': 'Route Change'
  }
  return titles[alert] || 'Alert'
}

function getAlertDescription(alert) {
  const descriptions = {
    'weather': 'Heavy rain affecting delivery schedule',
    'traffic': 'Unexpected traffic causing minor delays',
    'delay': 'Carrier experiencing operational delays',
    'route': 'Route optimized for faster delivery'
  }
  return descriptions[alert] || 'Alert description'
}
</script>
