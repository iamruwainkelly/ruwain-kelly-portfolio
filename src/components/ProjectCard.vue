<template>
  <div class="group relative bg-dark-bg border border-gray-800 rounded-xl overflow-hidden card-hover animate-fade-in">
    <!-- Featured Badge -->
    <div v-if="project.featured" class="absolute top-4 right-4 z-10">
      <span class="bg-gradient-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
        Featured
      </span>
    </div>

    <!-- Project Icon -->
    <div class="p-6 pb-4">
      <div class="w-12 h-12 mb-4 bg-gradient-primary rounded-lg flex items-center justify-center">
        <component :is="getIcon(project.icon)" class="w-6 h-6 text-white" />
      </div>
      
      <!-- Content -->
      <h3 class="text-xl font-bold text-text-primary mb-2 group-hover:text-primary-orange transition-colors duration-300">
        {{ project.title }}
      </h3>
      
      <p class="text-text-secondary text-sm mb-3">
        {{ project.subtitle }}
      </p>
      
      <p class="text-text-primary text-sm mb-4 line-clamp-3">
        {{ project.description }}
      </p>

      <!-- Tech Stack -->
      <div class="flex flex-wrap gap-1 mb-4">
        <span 
          v-for="tech in project.techStack.slice(0, 3)" 
          :key="tech"
          class="text-xs bg-gray-800 text-text-secondary px-2 py-1 rounded-md"
        >
          {{ tech }}
        </span>
        <span v-if="project.techStack.length > 3" class="text-xs text-text-secondary">
          +{{ project.techStack.length - 3 }} more
        </span>
      </div>

      <!-- Mock Data Stats -->
      <div class="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div v-for="(value, key) in Object.entries(project.mockData).slice(0, 2)" :key="key[0]">
          <span class="text-text-secondary capitalize">{{ key[0].replace(/([A-Z])/g, ' $1') }}:</span>
          <span class="text-primary-orange font-semibold ml-1">{{ key[1] }}</span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="px-6 pb-6 flex justify-between items-center">
      <a 
        :href="project.github" 
        target="_blank" 
        rel="noopener noreferrer"
        class="text-text-secondary hover:text-primary-orange transition-colors duration-300"
        title="View on GitHub"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>

      <router-link 
        :to="`/projects/${project.id}`"
        class="btn-primary px-4 py-2 text-sm rounded-lg font-medium"
      >
        Explore Project
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { 
  CloudIcon, 
  CalculatorIcon, 
  ChartBarIcon, 
  ShieldCheckIcon, 
  ClockIcon, 
  TruckIcon, 
  ChatBubbleLeftRightIcon, 
  ShoppingCartIcon 
} from '@heroicons/vue/24/outline'

defineProps({
  project: {
    type: Object,
    required: true
  }
})

const iconMap = {
  cloud: CloudIcon,
  calculator: CalculatorIcon,
  'chart-bar': ChartBarIcon,
  'shield-check': ShieldCheckIcon,
  clock: ClockIcon,
  truck: TruckIcon,
  'chat-bubble-left-right': ChatBubbleLeftRightIcon,
  'shopping-cart': ShoppingCartIcon
}

const getIcon = (iconName) => {
  return iconMap[iconName] || CloudIcon
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-gradient {
  background: linear-gradient(90deg, #ff6c00, #a678ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>