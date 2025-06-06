<template>
  <div class="flex items-center">
    <!-- Step Indicator -->
    <div class="flex flex-col items-center mr-4">
      <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
           :class="stepClasses">
        <span v-if="step.completed">✓</span>
        <span v-else-if="isCurrent">{{ stepNumber }}</span>
        <span v-else>{{ stepNumber }}</span>
      </div>
      <div v-if="!isLast" class="w-0.5 h-8 mt-2"
           :class="step.completed ? 'bg-green-500' : 'bg-gray-600'"></div>
    </div>

    <!-- Step Content -->
    <div class="flex-1">
      <div class="flex justify-between items-start">
        <div>
          <h4 class="font-medium" :class="step.completed ? 'text-green-400' : isCurrent ? 'text-orange-400' : 'text-gray-400'">
            {{ step.name }}
          </h4>
          <p class="text-sm text-gray-500">{{ step.location }}</p>
        </div>
        <div class="text-right">
          <span v-if="step.completed" class="text-xs text-green-400">Completed</span>
          <span v-else-if="isCurrent" class="text-xs text-orange-400">In Progress</span>
          <span v-else class="text-xs text-gray-500">Pending</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  step: {
    type: Object,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isCurrent: {
    type: Boolean,
    default: false
  },
  stepNumber: {
    type: Number,
    default: 1
  },
  isLast: {
    type: Boolean,
    default: false
  }
})

const stepClasses = computed(() => {
  if (props.step.completed) {
    return 'bg-green-500 text-white'
  } else if (props.isCurrent) {
    return 'bg-orange-500 text-white'
  } else {
    return 'bg-gray-600 text-gray-400'
  }
})
</script>
