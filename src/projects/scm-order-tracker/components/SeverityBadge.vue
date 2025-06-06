<template>
  <span class="px-1.5 py-0.5 rounded text-xs font-medium"
        :class="severityClasses">
    {{ severityText }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  severity: {
    type: String,
    required: true
  }
})

const severityClasses = computed(() => {
  const classes = {
    'high': 'bg-red-500/20 text-red-400',
    'medium': 'bg-yellow-500/20 text-yellow-400',
    'low': 'bg-green-500/20 text-green-400'
  }
  return classes[props.severity] || 'bg-gray-500/20 text-gray-400'
})

const severityText = computed(() => {
  const texts = {
    'high': 'High',
    'medium': 'Med',
    'low': 'Low'
  }
  return texts[props.severity] || 'N/A'
})
</script>
