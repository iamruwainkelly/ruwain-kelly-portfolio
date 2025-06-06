<template>
  <span class="px-2 py-1 rounded-full text-xs font-medium"
        :class="statusClasses">
    {{ statusText }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const statusClasses = computed(() => {
  const classes = {
    'on_track': 'bg-green-500/20 text-green-400 border border-green-500/30',
    'at_risk': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    'delayed': 'bg-red-500/20 text-red-400 border border-red-500/30',
    'delivered': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    'in_transit': 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
  }
  return classes[props.status] || 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
})

const statusText = computed(() => {
  const texts = {
    'on_track': 'On Track',
    'at_risk': 'At Risk',
    'delayed': 'Delayed',
    'delivered': 'Delivered',
    'in_transit': 'In Transit'
  }
  return texts[props.status] || 'Unknown'
})
</script>
