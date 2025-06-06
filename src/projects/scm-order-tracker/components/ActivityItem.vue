<template>
  <div class="flex items-start space-x-3 p-3 rounded-lg hover:bg-dark-bg/50 transition-all duration-200">
    <!-- Activity Icon -->
    <div class="flex-shrink-0">
      <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs"
           :class="getActivityIconClass(activity.severity)">
        {{ getActivityIcon(activity.type) }}
      </div>
    </div>

    <!-- Activity Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-white">
            {{ activity.message }}
          </p>
          <p class="text-xs text-gray-400 mt-1">
            {{ activity.orderId ? `Order ${activity.orderId}` : 'System Update' }}
          </p>
        </div>
        <div class="flex flex-col items-end ml-4">
          <span class="text-xs text-gray-400">{{ activity.timestamp }}</span>
          <SeverityBadge :severity="activity.severity" class="mt-1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SeverityBadge from './SeverityBadge.vue'

defineProps({
  activity: {
    type: Object,
    required: true
  }
})

function getActivityIconClass(severity) {
  const classes = {
    'high': 'bg-red-500/20 text-red-400',
    'medium': 'bg-yellow-500/20 text-yellow-400',
    'low': 'bg-green-500/20 text-green-400'
  }
  return classes[severity] || 'bg-gray-500/20 text-gray-400'
}

function getActivityIcon(type) {
  const icons = {
    'status_change': '📦',
    'update': '🔄',
    'delay': '⏰',
    'pickup': '🚚',
    'delivery': '📍',
    'alert': '⚠️'
  }
  return icons[type] || '📊'
}
</script>
