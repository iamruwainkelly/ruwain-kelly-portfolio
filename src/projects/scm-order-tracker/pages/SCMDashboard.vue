<template>
  <div class="min-h-screen bg-dark-bg text-white">
    <!-- Loading State -->
    <div v-if="!loaded" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p class="text-xl text-gray-400">Loading SCM Dashboard...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <div class="text-center bg-red-900/20 border border-red-500/50 rounded-xl p-8">
        <h1 class="text-2xl font-bold text-red-400 mb-4">⚠️ Component Load Error</h1>
        <p class="text-gray-300 mb-4">{{ error }}</p>
        <button @click="retry" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Retry Loading
        </button>
      </div>
    </div>

    <!-- Main Dashboard Content -->
    <div v-else class="min-h-screen bg-dark-bg text-white">
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
              <canvas id="deliveryChart" class="max-w-full max-h-full"></canvas>
            </div>
          </div>

          <!-- Risk Factors Chart -->
          <div class="bg-dark-surface/60 backdrop-blur-md border border-dark-border rounded-xl p-6 hover:border-purple-500/50 transition-all">
            <h3 class="text-lg font-semibold mb-4 text-purple-400">📈 Risk Factor Analysis</h3>
            <div class="w-full lg:w-1/2 mx-auto h-64 max-h-96 flex items-center justify-center">
              <canvas id="riskChart" class="max-w-full max-h-full"></canvas>
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
        <button @click="generateDeliveryReport" 
                class="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center">
          <span class="mr-2">📋</span>
          Generate Delivery Report
        </button>
        <button @click="simulateReturnOrder" 
                class="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center">
          <span class="mr-2">🔄</span>
          Simulate Return Order
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
      </div>

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
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
import OrderCard from '../components/OrderCard.vue'
import CarrierCard from '../components/CarrierCard.vue'
import ActivityItem from '../components/ActivityItem.vue'
import OrderDetailsModal from '../components/OrderDetailsModal.vue'
import { mockOrders, mockCarriers, mockActivities } from '../mock/data.js'

Chart.register(...registerables)

// Loading and error states
const loaded = ref(false)
const error = ref(null)

// Fallback data in case mock imports fail
const fallbackOrders = [
  {
    id: 'DE-DEMO-001',
    customer: 'Demo Customer',
    origin: 'Munich, DE',
    destination: 'Berlin, DE',
    carrier: 'DHL Express',
    status: 'on_track',
    priority: 'high',
    progress: 75,
    riskScore: 2.1,
    eta: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Leipzig Hub',
    lastUpdate: '2 min ago',
    weight: '245 kg',
    value: '€12,500',
    alerts: []
  },
  {
    id: 'DE-DEMO-002',
    customer: 'Sample Corp',
    origin: 'Stuttgart, DE',
    destination: 'Hamburg, DE',
    carrier: 'DPD Deutschland',
    status: 'at_risk',
    priority: 'medium',
    progress: 45,
    riskScore: 6.8,
    eta: new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Frankfurt Hub',
    lastUpdate: '15 min ago',
    weight: '180 kg',
    value: '€8,750',
    alerts: ['weather', 'traffic']
  }
]

const fallbackCarriers = [
  { id: 1, name: 'DHL Express', performance: 96.2, onTime: 94, activeShipments: 156 },
  { id: 2, name: 'DPD Deutschland', performance: 94.8, onTime: 92, activeShipments: 89 },
  { id: 3, name: 'UPS Germany', performance: 93.5, onTime: 90, activeShipments: 67 }
]

const fallbackActivities = [
  {
    id: 1,
    type: 'update',
    message: 'Order DE-DEMO-001 departed from Munich facility',
    timestamp: new Date().toLocaleTimeString('de-DE'),
    severity: 'low'
  },
  {
    id: 2,
    type: 'alert',
    message: 'Weather delay detected for Route A7',
    timestamp: new Date().toLocaleTimeString('de-DE'),
    severity: 'medium'
  }
]

// Reactive data
const displayedOrders = ref([])
const carriers = ref([])
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

onMounted(async () => {
  try {
    console.log('🚛 SCM Dashboard mounting...')
    await loadInitialData()
    
    // Use nextTick to ensure DOM is ready
    await nextTick()
    
    // Initialize charts after DOM is ready
    await initializeCharts()
    
    startLiveUpdates()
    updateSyncTime()
    loaded.value = true
    console.log('✅ SCM Dashboard mounted successfully')
  } catch (err) {
    console.error('❌ SCM Dashboard mount error:', err)
    error.value = `Failed to load dashboard: ${err.message}`
    loaded.value = true // Still show the component even if charts fail
  }
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

function retry() {
  loaded.value = false
  error.value = null
  onMounted()
}

function loadInitialData() {
  try {
    console.log('📊 Loading SCM data...')
    
    // Try to use mock data, fallback to embedded data if not available
    displayedOrders.value = (mockOrders || fallbackOrders).slice(0, 9)
    activities.value = (mockActivities || fallbackActivities).slice(0, 10)
    carriers.value = mockCarriers || fallbackCarriers
    
    updateStats()
    console.log('✅ Data loaded:', { 
      orders: displayedOrders.value.length, 
      activities: activities.value.length,
      carriers: carriers.value.length 
    })
  } catch (err) {
    console.error('❌ Data loading error, using fallback data:', err)
    // Use fallback data if everything fails
    displayedOrders.value = fallbackOrders.slice(0, 9)
    activities.value = fallbackActivities.slice(0, 10)
    carriers.value = fallbackCarriers
    updateStats()
  }
}

function updateStats() {
  try {
    const orders = displayedOrders.value || []
    stats.value = {
      onTrack: orders.filter(o => o?.status === 'on_track').length,
      atRisk: orders.filter(o => o?.status === 'at_risk').length,
      delayed: orders.filter(o => o?.status === 'delayed').length
    }
  } catch (err) {
    console.error('❌ Stats update error:', err)
    stats.value = { onTrack: 0, atRisk: 0, delayed: 0 }
  }
}

function initializeCharts() {
  try {
    console.log('📈 Initializing charts...')
    
    // Wait for DOM to be ready
    setTimeout(() => {
      // Delivery Status Chart
      const deliveryElement = document.getElementById('deliveryChart')
      if (deliveryElement) {
        const deliveryCtx = deliveryElement.getContext('2d')
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
        console.log('✅ Delivery chart initialized')
      } else {
        console.warn('⚠️ Delivery chart canvas not found')
      }

      // Risk Factors Chart
      const riskElement = document.getElementById('riskChart')
      if (riskElement) {
        const riskCtx = riskElement.getContext('2d')
        new Chart(riskCtx, {
          type: 'bar',
          data: {
            labels: ['Weather', 'Traffic', 'Customs', 'Carrier Delay', 'Route Issues'],
            datasets: [{
              label: 'Risk Impact Score',
              data: [8.2, 6.5, 4.1, 7.8, 5.3],
              backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'],
              borderWidth: 1,
              borderColor: '#1F2937'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 10,
                grid: { color: '#374151' },
                ticks: { color: '#F8F8F8' }
              },
              x: {
                grid: { color: '#374151' },
                ticks: { color: '#F8F8F8' }
              }
            }
          }
        })
        console.log('✅ Risk chart initialized')
      } else {
        console.warn('⚠️ Risk chart canvas not found')
      }
      
      console.log('✅ All charts initialized')
    }, 500) // Increased timeout for better DOM readiness
  } catch (err) {
    console.error('❌ Chart initialization error:', err)
    // Don't throw error - let component load without charts if needed
  }
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

function generateDeliveryReport() {
  alert('📋 Delivery Report Generated!\n\nDemo feature: Comprehensive delivery performance report with KPIs, carrier analytics, and route optimization insights. In production, this would generate a detailed PDF with delivery metrics, on-time performance, and improvement recommendations.')
}

function simulateReturnOrder() {
  // Simulate creating a return order
  const returnOrder = {
    id: `RET-${Date.now()}`,
    originalOrderId: displayedOrders.value[0]?.id || 'ORD-12345',
    status: 'return_initiated',
    returnReason: 'Customer Request',
    pickup: {
      location: 'Berlin, Germany',
      scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('de-DE')
    },
    destination: 'Hamburg Logistics Center',
    carrier: 'DHL Express',
    riskScore: 2.1,
    lastUpdate: 'Just now'
  }

  // Add return order to beginning of orders list
  displayedOrders.value.unshift(returnOrder)
  
  // Add activity for return order creation
  activities.value.unshift({
    id: Date.now(),
    type: 'return_initiated',
    orderId: returnOrder.id,
    message: `🔄 Return order ${returnOrder.id} created for original order ${returnOrder.originalOrderId}`,
    timestamp: new Date().toLocaleTimeString('de-DE'),
    severity: 'medium'
  })
  
  // Keep only last 15 activities
  if (activities.value.length > 15) {
    activities.value = activities.value.slice(0, 15)
  }
  
  updateStats()
  
  alert('🔄 Return Order Simulated!\n\nDemo feature: Return logistics workflow initiated with pickup scheduling and carrier assignment. New return order added to tracking dashboard.')
}

function exportCSV() {
  alert('📊 CSV Export Complete!\n\nDemo feature: Order data exported to CSV format. In production, this would download a file with all current shipment data.')
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

<style scoped>
/* Chart container styles */
.chart-container {
  width: 65%;
  margin: 0 auto;
  padding: 1rem;
  max-height: 380px;
}

/* Risk score indicator */
.risk-indicator {
  transition: all 0.3s ease;
}

/* Activity feed animations */
.activity-enter-active {
  transition: all 0.3s ease;
}
.activity-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

/* Custom scrollbar for activity feed */
.feed-scroll::-webkit-scrollbar {
  width: 4px;
}
.feed-scroll::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
}
.feed-scroll::-webkit-scrollbar-thumb {
  background: rgba(249, 115, 22, 0.5);
  border-radius: 4px;
}
</style>
