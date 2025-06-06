<template>
  <div class="flex items-center">
    <div class="flex">
      <div v-for="i in 5" :key="i" 
           class="w-2 h-2 rounded-full mr-1"
           :class="i <= scoreLevel ? scoreColor : 'bg-gray-600'">
      </div>
    </div>
    <span class="ml-2 text-xs font-medium" :class="scoreColor.replace('bg-', 'text-')">
      {{ score }}/10
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: {
    type: Number,
    required: true
  }
})

const scoreLevel = computed(() => {
  return Math.round((props.score / 10) * 5)
})

const scoreColor = computed(() => {
  if (props.score <= 3) return 'bg-green-500'
  if (props.score <= 6) return 'bg-yellow-500'
  return 'bg-red-500'
})
</script>
