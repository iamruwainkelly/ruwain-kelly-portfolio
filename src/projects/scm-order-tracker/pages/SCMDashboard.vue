<template>
  <div class="min-h-screen bg-dark-bg text-white">
    <!-- Header Spacing Fix - Push content below navbar with extra padding -->
    <div class="pt-28 px-6 pb-6">
      <!-- Demo Mode Banner -->
      <div class="bg-gradient-to-r from-orange-500 to-purple-600 p-4 rounded-xl mb-8 text-center backdrop-blur-sm border border-orange-500/20 sticky top-20 z-40">
        <p class="font-semibold text-lg">🚛 DEMO: German/European Logistics Tracking - Portfolio Demonstration Only</p>
      </div>

      <!-- Header with KPIs -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 class="text-4xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">
            Supply Chain Order Tracker
          </h1>
          <p class="text-xl text-gray-300">Real-time European logistics monitoring & risk assessment</p>
          <div class="flex items-center mt-2 text-sm text-gray-400">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            <span>Last updated: {{ lastSyncTime }}</span>
          </div>
        </div>
        <!-- Top KPIs -->
        <div class="flex flex-wrap gap-4 mt-6 lg:mt-0">
          <div class="bg-dark-surface/60 backdrop-blur-md border border-dark-border rounded-xl p-4 text-center min-w-[120px] hover:border-green-500/50 transition-all">
            <p class="text-3xl font-bold text-green-400">{{ stats.onTrack }}</p>
            <p class="text-sm text-gray-400">On Track</p>
          </div>
          <div class="bg-dark-surface/60 backdrop-blur-md border border-dark-border rounded-xl p-4 text-center min-w-[120px] hover:border-yellow-500/50 transition-all">
            <p class="text-3xl font-bold text-yellow-400">{{ stats.atRisk }}</p>
            <p class="text-sm text-gray-400">At Risk</p>
          </div>
          <div class="bg-dark-surface/60 backdrop-blur-md border border-dark-border rounded-xl p-4 text-center min-w-[120px] hover:border-red-500/50 transition-all">
            <p class="text-3xl font-bold text-red-400">{{ stats.delayed }}</p>
            <p class="text-sm text-gray-400">Delayed</p>
          </div>
        </div>
      </div>

      <!-- Order Cards Grid -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-6 flex items-center">
          <span class="mr-3">📦</span>
          Active Shipments
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <OrderCard 
            v-for="order in displayedOrders" 
            :key="order.id" 
            :order="order"
            @view-details="showOrderDetails"
            @change-status="changeOrderStatus"
          />
        </div>
      </div>

      <!-- Analytics Dashboard -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-6 flex items-center">
          <span class="mr-3">📊</span>
          Analytics Overview
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Delivery Status Chart -->
          <div class="bg-dark-surface/60 backdrop-blur-md border border-dark-border rounded-xl p-6 hover:border-orange-500/50 transition-all">
            <h3 class="text-lg font-semibold mb-4 text-orange-400">📉 Delivery Status Distribution</h3>
            <div class="w-full lg:w-1/2 mx-auto h-64 max-h-96 flex items-center justify-center">
              <canvas ref="deliveryChart" class="max-w-full max-h-full"></canvas>
            </div>
          </div>

          <!-- Risk Factors Chart -->
          <div class="bg-dark-surface/60 backdrop-blur-md border border-dark-border rounded-xl p-6 hover:border-purple-500/50 transition-all">
            <h3 class="text-lg font-semibold mb-4 text-purple-400">📈 Risk Factor Analysis</h3>
            <div class="w-full lg:w-1/2 mx-auto h-64 max-h-96 flex items-center justify-center">
              <canvas ref="riskChart" class="max-w-full max-h-full"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Carrier Performance -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-6 flex items-center">
          <span class="mr-3">🚚</span>
          Carrier Performance Metrics
        </h2>
        <div class="bg-dark-surface/60 backdrop-blur-md border border-dark-border rounded-xl p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CarrierCard 
              v-for="carrier in carriers" 
              :key="carrier.id" 
              :carrier="carrier"
            />
          </div>
        </div>
      </div>

      <!-- Live Activity Feed -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-6 flex items-center">
          <span class="mr-3">🟩</span>
          Live Activity Feed
        </h2>
        <div class="bg-dark-surface/60 backdrop-blur-md border border-dark-border rounded-xl p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Recent Updates</h3>
            <div class="flex items-center text-green-400">
              <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              <span class="text-sm">Live</span>
            </div>
          </div>
          <div class="space-y-3 max-h-80 overflow-y-auto">
            <ActivityItem 
              v-for="activity in activities" 
              :key="activity.id" 
              :activity="activity"
            />
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4 justify-center mb-8">
        <button @click="updateOrderStatus" 
                class="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center">
          <span class="mr-2">🔄</span>
          Update Order Status
        </button>
        <button @click="generateReport" 
                class="px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center">
          <span class="mr-2">📄</span>
          Generate Report
        </button>
        <button @click="exportCSV" 
                class="px-6 py-3 bg-dark-surface border border-dark-border text-white rounded-xl hover:border-orange-500 transition-all duration-300 flex items-center">
          <span class="mr-2">📊</span>
          Export CSV
        </button>
        <button @click="scheduleReturn" 
                class="px-6 py-3 bg-dark-surface border border-dark-border text-white rounded-xl hover:border-purple-500 transition-all duration-300 flex items-center">
          <span class="mr-2">↩️</span>
          Schedule Return
        </button>
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
import { ref, onMounted, onUnmounted, computed } from 'vue'
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
const lastSyncTime = ref('')

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
  updateSyncTime()
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})

function updateSyncTime() {
  const now = new Date()
  lastSyncTime.value = now.toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

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
  // Delivery Status Chart - Smaller and more compact
  const deliveryCtx = deliveryChart.value.getContext('2d')
  new Chart(deliveryCtx, {
    type: 'doughnut',
    data: {
      labels: ['On Track', 'At Risk', 'Delayed', 'Delivered'],
      datasets: [{
        data: [45, 15, 8, 32],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#6B7280'],
        borderWidth: 2,
        borderColor: '#1F2937'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { 
            color: '#F8F8F8',
            padding: 15,
            font: { size: 12 }
          }
        }
      }
    }
  })

  // Risk Factors Chart - Smaller and more compact
  const riskCtx = riskChart.value.getContext('2d')
  new Chart(riskCtx, {
    type: 'bar',
    data: {
      labels: ['Weather', 'Traffic', 'Warehouse', 'Carrier'],
      datasets: [{
        label: 'Risk Impact %',
        data: [25, 35, 20, 20],
        backgroundColor: 'rgba(249, 115, 22, 0.8)',
        borderColor: 'rgba(249, 115, 22, 1)',
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 50,
          ticks: { 
            color: '#F8F8F8',
            font: { size: 11 }
          },
          grid: { color: '#374151' }
        },
        x: {
          ticks: { 
            color: '#F8F8F8',
            font: { size: 11 }
          },
          grid: { color: '#374151' }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })
}

function startLiveUpdates() {
  updateInterval = setInterval(() => {
    // Update sync time
    updateSyncTime()
    
    // Simulate live order updates
    const randomOrder = displayedOrders.value[Math.floor(Math.random() * displayedOrders.value.length)]
    if (randomOrder && Math.random() > 0.7) {
      simulateOrderUpdate(randomOrder)
    }
    
    // Add new activity
    if (Math.random() > 0.8) {
      addNewActivity()
    }
  }, 5000) // Update every 5 seconds
}

function changeOrderStatus(order) {
  const statuses = ['on_track', 'at_risk', 'delayed']
  const currentIndex = statuses.indexOf(order.status)
  const nextIndex = (currentIndex + 1) % statuses.length
  
  order.status = statuses[nextIndex]
  order.riskScore = Math.random() * 10
  order.lastUpdate = 'Just now'
  
  updateStats()
  
  // Add activity for manual status change
  activities.value.unshift({
    id: Date.now(),
    type: 'status_change',
    orderId: order.id,
    message: `Order ${order.id} status manually updated to ${order.status.replace('_', ' ')}`,
    timestamp: new Date().toLocaleTimeString('de-DE'),
    severity: order.status === 'delayed' ? 'high' : order.status === 'at_risk' ? 'medium' : 'low'
  })
  
  if (activities.value.length > 15) {
    activities.value = activities.value.slice(0, 15)
  }
}

function generateReport() {
  alert('📄 PDF Report Generated!\n\nDemo feature: In production, this would generate a comprehensive logistics report with all order data, carrier metrics, and risk analysis.')
}

function exportCSV() {
  alert('📊 CSV Export Complete!\n\nDemo feature: Order data exported to CSV format. In production, this would download a file with all current shipment data.')
}

function scheduleReturn() {
  alert('↩️ Return Shipment Scheduled!\n\nDemo feature: Return logistics workflow initiated. In production, this would integrate with carrier APIs to schedule return pickups.')
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

function updateOrderStatus() {
  // Simulate updating order statuses based on real-time logistics data
  const updatedOrders = displayedOrders.value.map(order => {
    if (Math.random() > 0.7) { // 30% chance of status update per order
      const statuses = ['on_track', 'at_risk', 'delayed']
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)]
      
      if (order.status !== newStatus) {
        order.status = newStatus
        order.riskScore = Math.random() * 10
        order.lastUpdate = 'Just now'
        
        // Add activity for this update
        activities.value.unshift({
          id: Date.now() + Math.random(),
          type: 'status_update',
          orderId: order.id,
          message: `📦 Order ${order.id} status updated to ${newStatus.replace('_', ' ')} via automated monitoring`,
          timestamp: new Date().toLocaleTimeString('de-DE'),
          severity: newStatus === 'delayed' ? 'high' : newStatus === 'at_risk' ? 'medium' : 'low'
        })
      }
    }
    return order
  })
  
  displayedOrders.value = updatedOrders
  updateStats()
  updateSyncTime()
  
  // Keep only last 15 activities
  if (activities.value.length > 15) {
    activities.value = activities.value.slice(0, 15)
  }
  
  // Show confirmation
  alert('🔄 Order Status Update Complete!\n\nDemo feature: Real-time status updates applied to shipments based on carrier APIs, weather data, and traffic conditions.')
}
</script>
