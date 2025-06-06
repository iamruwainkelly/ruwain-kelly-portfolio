<template>
  <span class="px-2 py-1 rounded-full text-xs font-medium"
        :class="priorityClasses">
    {{ priorityText }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  priority: {
    type: String,
    required: true
  }
})

const priorityClasses = computed(() => {
  const classes = {
    'high': 'bg-red-500/20 text-red-400 border border-red-500/30',
    'medium': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    'low': 'bg-green-500/20 text-green-400 border border-green-500/30'
  }
  return classes[props.priority] || 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
})

const priorityText = computed(() => {
  const texts = {
    'high': 'High',
    'medium': 'Medium',
    'low': 'Low'
  }
  return texts[props.priority] || 'Unknown'
})
</script>
