<template>
  <div class="min-h-screen bg-dark-bg text-white p-6">
    <!-- Demo Mode Banner -->
    <div class="bg-gradient-to-r from-orange-500 to-purple-600 p-3 rounded-lg mb-6 text-center">
      <p class="font-semibold">🚛 DEMO MODE: Real-time SCM tracking simulation - All data is mocked for portfolio demonstration</p>
    </div>

    <!-- Header -->
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">
          Supply Chain Order Tracker
        </h1>
        <p class="text-gray-400">Real-time logistics monitoring and risk assessment</p>
      </div>
      <div class="flex flex-wrap gap-4 mt-4 lg:mt-0">
        <div class="bg-dark-surface border border-dark-border rounded-lg p-3 text-center">
          <p class="text-2xl font-bold text-green-400">{{ stats.onTrack }}</p>
          <p class="text-sm text-gray-400">On Track</p>
        </div>
        <div class="bg-dark-surface border border-dark-border rounded-lg p-3 text-center">
          <p class="text-2xl font-bold text-yellow-400">{{ stats.atRisk }}</p>
          <p class="text-sm text-gray-400">At Risk</p>
        </div>
        <div class="bg-dark-surface border border-dark-border rounded-lg p-3 text-center">
          <p class="text-2xl font-bold text-red-400">{{ stats.delayed }}</p>
          <p class="text-sm text-gray-400">Delayed</p>
        </div>
      </div>
    </div>

    <!-- Live Orders Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      <OrderCard 
        v-for="order in displayedOrders" 
        :key="order.id" 
        :order="order"
        @view-details="showOrderDetails"
      />
    </div>

    <!-- Analytics Dashboard -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Delivery Status Chart -->
      <div class="bg-dark-surface border border-dark-border rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">Delivery Status Distribution</h3>
        <canvas ref="deliveryChart" width="400" height="200"></canvas>
      </div>

      <!-- Risk Factors Chart -->
      <div class="bg-dark-surface border border-dark-border rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">Risk Factor Analysis</h3>
        <canvas ref="riskChart" width="400" height="200"></canvas>
      </div>
    </div>

    <!-- Carrier Performance -->
    <div class="bg-dark-surface border border-dark-border rounded-lg p-6 mb-8">
      <h3 class="text-xl font-semibold mb-4">Carrier Performance Metrics</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarrierCard 
          v-for="carrier in carriers" 
          :key="carrier.id" 
          :carrier="carrier"
        />
      </div>
    </div>

    <!-- Live Activity Feed -->
    <div class="bg-dark-surface border border-dark-border rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">Live Activity Feed</h3>
        <div class="flex items-center text-green-400">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
          <span class="text-sm">Live</span>
        </div>
      </div>
      <div class="space-y-3 max-h-64 overflow-y-auto">
        <ActivityItem 
          v-for="activity in activities" 
          :key="activity.id" 
          :activity="activity"
        />
      </div>
    </div>

    <!-- Order Details Modal -->
    <OrderDetailsModal 
      v-if="selectedOrder" 
      :order="selectedOrder" 
      @close="selectedOrder = null"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import OrderCard from '../components/OrderCard.vue'
import CarrierCard from '../components/CarrierCard.vue'
import ActivityItem from '../components/ActivityItem.vue'
import OrderDetailsModal from '../components/OrderDetailsModal.vue'
import { mockOrders, mockCarriers, mockActivities } from '../mock/data.js'

Chart.register(...registerables)

// Reactive data
const displayedOrders = ref([])
const carriers = ref(mockCarriers)
const activities = ref([])
const selectedOrder = ref(null)
const deliveryChart = ref(null)
const riskChart = ref(null)

// Statistics
const stats = ref({
  onTrack: 0,
  atRisk: 0,
  delayed: 0
})

// WebSocket simulation
let updateInterval = null

onMounted(() => {
  loadInitialData()
  initializeCharts()
  startLiveUpdates()
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})

function loadInitialData() {
  displayedOrders.value = mockOrders.slice(0, 9)
  activities.value = mockActivities.slice(0, 10)
  updateStats()
}

function updateStats() {
  stats.value = {
    onTrack: displayedOrders.value.filter(o => o.status === 'on_track').length,
    atRisk: displayedOrders.value.filter(o => o.status === 'at_risk').length,
    delayed: displayedOrders.value.filter(o => o.status === 'delayed').length
  }
}

function initializeCharts() {
  // Delivery Status Chart
  const deliveryCtx = deliveryChart.value.getContext('2d')
  new Chart(deliveryCtx, {
    type: 'doughnut',
    data: {
      labels: ['On Track', 'At Risk', 'Delayed', 'Delivered'],
      datasets: [{
        data: [45, 15, 8, 32],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#6B7280'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#F8F8F8' }
        }
      }
    }
  })

  // Risk Factors Chart
  const riskCtx = riskChart.value.getContext('2d')
  new Chart(riskCtx, {
    type: 'bar',
    data: {
      labels: ['Weather', 'Traffic', 'Warehouse', 'Carrier Issues'],
      datasets: [{
        label: 'Risk Impact %',
        data: [25, 35, 20, 20],
        backgroundColor: 'rgba(249, 115, 22, 0.8)',
        borderColor: 'rgba(249, 115, 22, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#F8F8F8' },
          grid: { color: '#374151' }
        },
        x: {
          ticks: { color: '#F8F8F8' },
          grid: { color: '#374151' }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#F8F8F8' }
        }
      }
    }
  })
}

function startLiveUpdates() {
  updateInterval = setInterval(() => {
    // Simulate live order updates
    const randomOrder = displayedOrders.value[Math.floor(Math.random() * displayedOrders.value.length)]
    if (randomOrder && Math.random() > 0.7) {
      simulateOrderUpdate(randomOrder)
    }
    
    // Add new activity
    if (Math.random() > 0.8) {
      addNewActivity()
    }
  }, 3000)
}

function simulateOrderUpdate(order) {
  const statuses = ['on_track', 'at_risk', 'delayed']
  const newStatus = statuses[Math.floor(Math.random() * statuses.length)]
  
  if (order.status !== newStatus) {
    order.status = newStatus
    order.lastUpdate = new Date().toLocaleTimeString()
    updateStats()
    
    // Add activity for this update
    activities.value.unshift({
      id: Date.now(),
      type: 'status_change',
      orderId: order.id,
      message: `Order ${order.id} status changed to ${newStatus.replace('_', ' ')}`,
      timestamp: new Date().toLocaleTimeString(),
      severity: newStatus === 'delayed' ? 'high' : newStatus === 'at_risk' ? 'medium' : 'low'
    })
    
    // Keep only last 15 activities
    if (activities.value.length > 15) {
      activities.value = activities.value.slice(0, 15)
    }
  }
}

function addNewActivity() {
  const activityTypes = [
    'Order picked up from warehouse',
    'Carrier scan at distribution center',
    'Weather delay detected',
    'Route optimization applied',
    'Delivery attempt scheduled'
  ]
  
  activities.value.unshift({
    id: Date.now(),
    type: 'update',
    message: activityTypes[Math.floor(Math.random() * activityTypes.length)],
    timestamp: new Date().toLocaleTimeString(),
    severity: 'low'
  })
  
  if (activities.value.length > 15) {
    activities.value = activities.value.slice(0, 15)
  }
}

function showOrderDetails(order) {
  selectedOrder.value = order
}
</script>
