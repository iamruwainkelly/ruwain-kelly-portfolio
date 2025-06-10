<template>
  <div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 mb-4">
          <CloudIcon class="w-8 h-8 text-primary-orange" />
          <h1 class="text-4xl lg:text-5xl font-bold gradient-text">AWS Serverless Dashboard</h1>
        </div>
        <p class="text-light-text text-lg max-w-3xl mx-auto">
          Real-time monitoring and analytics for your AWS serverless infrastructure. 
          Track Lambda functions, API Gateway, DynamoDB, and cost optimization insights.
        </p>
        
        <!-- Demo/Live Integration Banner -->
        <div class="mt-6 mx-auto max-w-2xl">
          <div v-if="!isLiveMode" class="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4">
            <div class="flex items-center gap-3">
              <ExclamationTriangleIcon class="w-6 h-6 text-yellow-400 flex-shrink-0" />
              <div class="text-left flex-1">
                <p class="text-yellow-200 font-semibold">Demo Environment</p>
                <p class="text-yellow-300/80 text-sm">Currently showing mock data. Enable live AWS integration below.</p>
              </div>
              <button 
                @click="enableLiveMode" 
                :disabled="!awsConfigured"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  awsConfigured 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                ]"
              >
                {{ awsConfigured ? 'Enable Live Mode' : 'AWS Not Configured' }}
              </button>
              <button 
                v-if="!awsConfigured"
                @click="showConnectionTest = !showConnectionTest" 
                class="px-3 py-2 bg-primary-orange/20 hover:bg-primary-orange/30 border border-primary-orange/50 rounded-lg text-sm text-white transition-all"
              >
                {{ showConnectionTest ? 'Hide' : 'Configure AWS' }}
              </button>
            </div>
          </div>
          
          <div v-else class="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-4">
            <div class="flex items-center gap-3">
              <CloudIcon class="w-6 h-6 text-green-400 flex-shrink-0" />
              <div class="text-left flex-1">
                <p class="text-green-200 font-semibold">Live AWS Integration Active</p>
                <p class="text-green-300/80 text-sm">Showing real-time data from AWS region: {{ selectedRegion }}</p>
              </div>
              <button 
                @click="disableLiveMode" 
                class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-all"
              >
                Switch to Demo
              </button>
            </div>
          </div>
          
          <!-- AWS Connection Test -->
          <div v-if="showConnectionTest" class="mt-4 bg-dark-surface/50 border border-primary-orange/30 rounded-lg p-4">
            <div class="mb-4">
              <h4 class="text-white font-semibold mb-2">AWS Configuration</h4>
              <p class="text-light-text text-sm mb-3">
                To enable live AWS integration, set the following environment variables in your .env file:
              </p>
              <div class="bg-dark-surface rounded-lg p-3 text-sm font-mono text-gray-300 space-y-1">
                <div>VITE_AWS_ACCESS_KEY_ID=your_access_key</div>
                <div>VITE_AWS_SECRET_ACCESS_KEY=your_secret_key</div>
                <div>VITE_AWS_REGION={{ selectedRegion }}</div>
              </div>
              <p class="text-yellow-300 text-xs mt-2">
                ⚠️ For security, use IAM roles with minimal required permissions in production
              </p>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div :class="[
                  'w-3 h-3 rounded-full',
                  connectionStatus === 'testing' ? 'bg-yellow-500 animate-pulse' :
                  connectionStatus === 'success' ? 'bg-green-500' :
                  connectionStatus === 'error' ? 'bg-red-500' : 'bg-gray-500'
                ]"></div>
                <span class="text-white text-sm">
                  {{ connectionMessage }}
                </span>
              </div>
              <button 
                @click="testAWSConnection" 
                :disabled="connectionStatus === 'testing'"
                class="px-3 py-1 bg-primary-orange/20 hover:bg-primary-orange/30 border border-primary-orange/50 rounded text-sm text-white transition-all"
              >
                {{ connectionStatus === 'testing' ? 'Testing...' : 'Test Connection' }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Controls -->
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <select v-model="selectedRegion" 
                  class="bg-dark-surface border border-primary-orange/30 rounded-lg px-4 py-2 text-white focus:border-primary-orange">
            <option value="us-east-1">US East (N. Virginia)</option>
            <option value="us-west-2">US West (Oregon)</option>
            <option value="eu-west-1">Europe (Ireland)</option>
            <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
          </select>
          
          <select v-model="selectedTimeRange" 
                  class="bg-dark-surface border border-primary-orange/30 rounded-lg px-4 py-2 text-white focus:border-primary-orange">
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          
          <!-- View Toggle -->
          <div class="inline-flex bg-dark-surface border border-primary-orange/30 rounded-lg p-1">
            <button 
              @click="currentView = 'summary'" 
              :class="[
                'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                currentView === 'summary' 
                  ? 'bg-primary-orange text-white shadow-lg' 
                  : 'text-light-text hover:text-white hover:bg-dark-border'
              ]"
            >
              Summary
            </button>
            <button 
              @click="currentView = 'full'" 
              :class="[
                'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                currentView === 'full' 
                  ? 'bg-primary-orange text-white shadow-lg' 
                  : 'text-light-text hover:text-white hover:bg-dark-border'
              ]"
            >
              Full View
            </button>
          </div>
          
          <button @click="refreshData" 
                  class="bg-primary-orange/20 hover:bg-primary-orange/30 border border-primary-orange/50 rounded-lg px-4 py-2 text-white transition-colors">
            <ArrowPathIcon class="w-4 h-4 inline mr-2" />
            Refresh
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center gap-3">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-orange"></div>
          <span class="text-light-text">Loading serverless metrics...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="bg-red-500/20 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
          <ExclamationTriangleIcon class="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p class="text-red-300 font-semibold">Error Loading Data</p>
          <p class="text-red-400/80 text-sm mt-1">{{ error }}</p>
          <button @click="refreshData" class="mt-4 btn-primary">
            Try Again
          </button>
        </div>
      </div>

      <!-- Summary View -->
      <div v-else-if="currentView === 'summary'" class="space-y-8">
        <!-- Key Metrics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="glass-card p-6 text-center">
            <CloudIcon class="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 class="text-2xl font-bold text-white">{{ metrics.lambdaMetrics?.functionCount || 24 }}</h3>
            <p class="text-light-text">Lambda Functions</p>
          </div>
          <div class="glass-card p-6 text-center">
            <ChartBarIcon class="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h3 class="text-2xl font-bold text-white">{{ formatNumber(metrics.lambdaMetrics?.totalInvocations || 2300000) }}</h3>
            <p class="text-light-text">Total Invocations</p>
          </div>
          <div class="glass-card p-6 text-center">
            <CurrencyDollarIcon class="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <h3 class="text-2xl font-bold text-white">${{ calculateTotalCost() }}</h3>
            <p class="text-light-text">Monthly Cost</p>
          </div>
          <div class="glass-card p-6 text-center">
            <ExclamationTriangleIcon class="w-8 h-8 text-red-400 mx-auto mb-2" />
            <h3 class="text-2xl font-bold text-white">{{ ((metrics.lambdaMetrics?.errorRate || 0.02) * 100).toFixed(1) }}%</h3>
            <p class="text-light-text">Error Rate</p>
          </div>
        </div>

        <!-- Charts Grid -->
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Lambda Invocations Chart -->
          <div class="glass-card p-6">
            <h3 class="text-xl font-bold mb-4 gradient-text">Lambda Invocations</h3>
            <div class="h-64">
              <canvas ref="lambdaChart"></canvas>
            </div>
          </div>

          <!-- Cost Breakdown Pie Chart -->
          <div class="glass-card p-6">
            <h3 class="text-xl font-bold mb-4 gradient-text">Cost Breakdown</h3>
            <div class="h-64 flex justify-center items-center overflow-hidden">
              <div class="max-w-sm max-h-64">
                <canvas ref="costChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Full View -->
      <div v-else class="space-y-8">
        <!-- Service Health Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div v-for="service in serviceStatus" :key="service.name" class="glass-card p-4">
            <div class="flex items-center gap-3">
              <div :class="[
                'w-3 h-3 rounded-full',
                service.status === 'healthy' ? 'bg-green-400' : 
                service.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
              ]"></div>
              <div>
                <h4 class="font-semibold text-white text-sm">{{ service.name }}</h4>
                <p class="text-xs text-light-text capitalize">{{ service.status }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Metrics Grid -->
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Lambda Metrics -->
          <div class="glass-card p-6">
            <h3 class="text-xl font-bold mb-4 gradient-text">Lambda Metrics</h3>
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-light-text">Functions</span>
                <span class="text-white font-semibold">{{ metrics.lambdaMetrics?.functionCount || 24 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-light-text">Invocations</span>
                <span class="text-white font-semibold">{{ formatNumber(metrics.lambdaMetrics?.totalInvocations || 2300000) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-light-text">Avg Duration</span>
                <span class="text-white font-semibold">{{ metrics.lambdaMetrics?.averageDuration || 847 }}ms</span>
              </div>
              <div class="flex justify-between">
                <span class="text-light-text">Error Rate</span>
                <span class="text-white font-semibold">{{ ((metrics.lambdaMetrics?.errorRate || 0.02) * 100).toFixed(1) }}%</span>
              </div>
            </div>
          </div>

          <!-- API Gateway Metrics -->
          <div class="glass-card p-6">
            <h3 class="text-xl font-bold mb-4 gradient-text">API Gateway</h3>
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-light-text">Total Requests</span>
                <span class="text-white font-semibold">{{ formatNumber(metrics.apiGatewayMetrics?.totalRequests || 1850000) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-light-text">Avg Latency</span>
                <span class="text-white font-semibold">{{ metrics.apiGatewayMetrics?.averageLatency || 245 }}ms</span>
              </div>
              <div class="flex justify-between">
                <span class="text-light-text">Error Rate</span>
                <span class="text-white font-semibold">{{ ((metrics.apiGatewayMetrics?.errorRate || 0.05) * 100).toFixed(1) }}%</span>
              </div>
            </div>
          </div>

          <!-- Storage Metrics -->
          <div class="glass-card p-6">
            <h3 class="text-xl font-bold mb-4 gradient-text">Storage</h3>
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-light-text">DynamoDB Items</span>
                <span class="text-white font-semibold">{{ formatNumber(metrics.dynamoMetrics?.totalItems || 15670000) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-light-text">S3 Objects</span>
                <span class="text-white font-semibold">{{ formatNumber(850000) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-light-text">Storage Size</span>
                <span class="text-white font-semibold">2.4 TB</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Environment Usage Bar Chart -->
          <div class="glass-card p-6">
            <h3 class="text-xl font-bold mb-4 gradient-text">Environment Usage</h3>
            <div class="h-64 mb-4">
              <canvas ref="environmentChart"></canvas>
            </div>
            
            <!-- Environment Metrics Grid -->
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="bg-dark-surface/50 rounded-lg p-3">
                <div class="flex items-center justify-between">
                  <span class="text-light-text">Active Environments</span>
                  <span class="text-white font-semibold">4/5</span>
                </div>
                <div class="w-full bg-dark-border rounded-full h-1.5 mt-2">
                  <div class="bg-green-500 h-1.5 rounded-full" style="width: 80%"></div>
                </div>
              </div>
              
              <div class="bg-dark-surface/50 rounded-lg p-3">
                <div class="flex items-center justify-between">
                  <span class="text-light-text">Avg Response Time</span>
                  <span class="text-white font-semibold">245ms</span>
                </div>
                <div class="w-full bg-dark-border rounded-full h-1.5 mt-2">
                  <div class="bg-primary-orange h-1.5 rounded-full" style="width: 65%"></div>
                </div>
              </div>
              
              <div class="bg-dark-surface/50 rounded-lg p-3">
                <div class="flex items-center justify-between">
                  <span class="text-light-text">Resource Efficiency</span>
                  <span class="text-white font-semibold">87%</span>
                </div>
                <div class="w-full bg-dark-border rounded-full h-1.5 mt-2">
                  <div class="bg-primary-purple h-1.5 rounded-full" style="width: 87%"></div>
                </div>
              </div>
              
              <div class="bg-dark-surface/50 rounded-lg p-3">
                <div class="flex items-center justify-between">
                  <span class="text-light-text">Cost Optimization</span>
                  <span class="text-white font-semibold">92%</span>
                </div>
                <div class="w-full bg-dark-border rounded-full h-1.5 mt-2">
                  <div class="bg-blue-500 h-1.5 rounded-full" style="width: 92%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Regional Activity Heatmap -->
          <div class="glass-card p-6">
            <h3 class="text-xl font-bold mb-4 gradient-text">Regional Activity</h3>
            <div class="h-64 relative">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg p-4">
                <div class="grid grid-cols-3 gap-4 h-full">
                  <div v-for="region in regionData" :key="region.name" 
                       class="bg-primary-orange/20 rounded-lg p-3 flex flex-col justify-center items-center">
                    <div class="text-sm font-semibold text-white">{{ region.name }}</div>
                    <div class="text-xs text-light-text mt-1">{{ region.activity }}% active</div>
                    <div class="w-full bg-dark-surface rounded-full h-2 mt-2">
                      <div class="bg-primary-orange h-2 rounded-full transition-all duration-300" 
                           :style="{ width: region.activity + '%' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CloudWatch Logs -->
        <div class="glass-card p-6">
          <h3 class="text-xl font-bold mb-4 gradient-text">CloudWatch Logs</h3>
          <div class="bg-dark-surface rounded-lg p-4 max-h-64 overflow-y-auto">
            <div v-for="log in recentLogs" :key="log.id" 
                 class="flex items-start gap-3 py-2 border-b border-dark-border last:border-b-0">
              <div :class="[
                'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                log.level === 'ERROR' ? 'bg-red-400' : 
                log.level === 'WARN' ? 'bg-yellow-400' : 'bg-green-400'
              ]"></div>
              <div class="flex-1 min-w-0">
                <p class="text-light-text text-sm">{{ log.message }}</p>
                <p class="text-xs text-light-text/60 mt-1">{{ log.timestamp }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  CloudIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'
import Chart from 'chart.js/auto'
import awsService from '../services/aws-service.js'

const router = useRouter()

// Reactive state
const currentView = ref('summary')
const loading = ref(false)
const error = ref(null)
const selectedRegion = ref('us-east-1')
const selectedTimeRange = ref('24h')
const metrics = ref({})

// AWS Integration state
const isLiveMode = ref(false)
const awsConfigured = ref(false)
const connectionStatus = ref('idle') // idle, testing, success, error
const connectionMessage = ref('AWS connection not tested')
const showConnectionTest = ref(false)

// Chart refs
const lambdaChart = ref(null)
const costChart = ref(null)
const environmentChart = ref(null)

// Chart instances
let lambdaChartInstance = null
let costChartInstance = null
let environmentChartInstance = null

// Mock data
const serviceStatus = ref([
  { name: 'Lambda', status: 'healthy' },
  { name: 'API Gateway', status: 'healthy' },
  { name: 'DynamoDB', status: 'warning' },
  { name: 'S3', status: 'healthy' },
  { name: 'Cognito', status: 'healthy' }
])

const regionData = ref([
  { name: 'us-east-1', activity: 85 },
  { name: 'us-west-2', activity: 65 },
  { name: 'eu-west-1', activity: 45 },
  { name: 'ap-southeast-1', activity: 35 },
  { name: 'ap-northeast-1', activity: 25 }
])

const recentLogs = ref([
  {
    id: 1,
    level: 'INFO',
    message: 'Lambda function auth-handler executed successfully',
    timestamp: '2024-01-15 14:32:15'
  },
  {
    id: 2,
    level: 'WARN',
    message: 'DynamoDB throttling detected in user-data table',
    timestamp: '2024-01-15 14:31:42'
  },
  {
    id: 3,
    level: 'ERROR',
    message: 'API Gateway timeout on /api/process-payment endpoint',
    timestamp: '2024-01-15 14:30:58'
  },
  {
    id: 4,
    level: 'INFO',
    message: 'S3 bucket backup completed successfully',
    timestamp: '2024-01-15 14:29:30'
  }
])

// Computed properties
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const calculateTotalCost = () => {
  if (isLiveMode.value && metrics.value.costMetrics?.totalCost) {
    return metrics.value.costMetrics.totalCost
  }
  // Mock cost calculation for demo mode
  return '2,847.50'
}

// Mock data loading
const loadMockData = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    metrics.value = {
      lambdaMetrics: {
        functionCount: 24,
        totalInvocations: 2300000,
        averageDuration: 847,
        errorRate: 0.02,
        topFunctions: [
          { name: 'auth-handler', invocations: 145000 },
          { name: 'data-processor', invocations: 98000 },
          { name: 'image-resizer', invocations: 76000 }
        ]
      },
      apiGatewayMetrics: {
        totalRequests: 1850000,
        averageLatency: 245,
        errorRate: 0.05
      },
      dynamoMetrics: {
        totalItems: 15670000,
        readCapacity: 1000,
        writeCapacity: 500
      }
    }
    
  } catch (err) {
    error.value = 'Failed to load serverless metrics'
  } finally {
    loading.value = false
  }
}

// Live AWS data loading
const loadLiveData = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Load all AWS metrics in parallel
    const [lambdaMetrics, apiGatewayMetrics, dynamoMetrics, costMetrics, serviceHealth] = await Promise.all([
      awsService.getLambdaMetrics(selectedTimeRange.value),
      awsService.getAPIGatewayMetrics(selectedTimeRange.value),
      awsService.getDynamoDBMetrics(),
      awsService.getCostMetrics(selectedTimeRange.value),
      awsService.getServiceHealth()
    ])

    metrics.value = {
      lambdaMetrics: {
        functionCount: lambdaMetrics.functions,
        totalInvocations: lambdaMetrics.invocations,
        averageDuration: Math.round(lambdaMetrics.avgDuration),
        errorRate: lambdaMetrics.errorRate / 100, // Convert to decimal
        topFunctions: [] // Would need additional API calls to get top functions
      },
      apiGatewayMetrics: {
        totalRequests: apiGatewayMetrics.totalRequests,
        averageLatency: Math.round(apiGatewayMetrics.avgLatency),
        errorRate: apiGatewayMetrics.errorRate / 100
      },
      dynamoMetrics: {
        totalItems: dynamoMetrics.totalItems,
        tableCount: dynamoMetrics.tableCount,
        totalSize: dynamoMetrics.totalSize
      },
      costMetrics: {
        totalCost: costMetrics.totalCost,
        serviceCosts: costMetrics.serviceCosts,
        currency: costMetrics.currency
      }
    }

    // Update service status from AWS
    serviceStatus.value = serviceHealth

  } catch (err) {
    console.error('Failed to load AWS data:', err)
    error.value = `Failed to load AWS data: ${err.message}`
    // Fallback to demo mode on error
    isLiveMode.value = false
    await loadMockData()
  } finally {
    loading.value = false
  }
}

// Test AWS connection
const testAWSConnection = async () => {
  connectionStatus.value = 'testing'
  connectionMessage.value = 'Testing AWS connection...'
  
  try {
    const result = await awsService.testConnection()
    
    if (result.success) {
      connectionStatus.value = 'success'
      connectionMessage.value = `Connected to AWS ${result.region}`
      awsConfigured.value = true
    } else {
      connectionStatus.value = 'error'
      connectionMessage.value = result.message
      awsConfigured.value = false
    }
  } catch (error) {
    connectionStatus.value = 'error'
    connectionMessage.value = `Connection test failed: ${error.message}`
    awsConfigured.value = false
  }
}

// Enable live mode
const enableLiveMode = async () => {
  if (!awsConfigured.value) {
    await testAWSConnection()
    if (!awsConfigured.value) return
  }
  
  isLiveMode.value = true
  await loadLiveData()
}

// Disable live mode
const disableLiveMode = async () => {
  isLiveMode.value = false
  await loadMockData()
}

// Unified data loading based on mode
const loadData = async () => {
  if (isLiveMode.value) {
    await loadLiveData()
  } else {
    await loadMockData()
  }
}

// Chart cleanup function
const destroyCharts = () => {
  if (lambdaChartInstance) {
    lambdaChartInstance.destroy()
    lambdaChartInstance = null
  }
  if (costChartInstance) {
    costChartInstance.destroy()
    costChartInstance = null
  }
  if (environmentChartInstance) {
    environmentChartInstance.destroy()
    environmentChartInstance = null
  }
}

// Chart initialization
const initCharts = () => {
  // Lambda Invocations Chart
  if (lambdaChart.value && !lambdaChartInstance) {
    const ctx = lambdaChart.value.getContext('2d')
    lambdaChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        datasets: [{
          label: 'Invocations',
          data: [145000, 98000, 180000, 230000, 165000, 140000],
          borderColor: '#f97316',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          tension: 0.4,
          fill: true
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
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#9CA3AF'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#9CA3AF'
            }
          }
        }
      }
    })
  }

  // Cost Breakdown Pie Chart
  if (costChart.value && !costChartInstance) {
    const ctx = costChart.value.getContext('2d')
    costChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Lambda', 'API Gateway', 'DynamoDB', 'S3', 'Other'],
        datasets: [{
          data: [45, 25, 15, 10, 5],
          backgroundColor: [
            '#f97316',
            '#3b82f6',
            '#10b981',
            '#f59e0b',
            '#8b5cf6'
          ],
          borderWidth: 2,
          borderColor: '#1f2937'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#9CA3AF',
              padding: 20
            }
          }
        }
      }
    })
  }

  // Environment Usage Bar Chart
  if (environmentChart.value && !environmentChartInstance) {
    const ctx = environmentChart.value.getContext('2d')
    environmentChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Development', 'Staging', 'Production', 'Testing', 'DR/Backup'],
        datasets: [
          {
            label: 'CPU Usage %',
            data: [23, 45, 78, 34, 12],
            backgroundColor: '#ff6c00',
            borderRadius: 4,
            stack: 'usage'
          },
          {
            label: 'Memory Usage %',
            data: [18, 38, 85, 28, 8],
            backgroundColor: '#a678ff',
            borderRadius: 4,
            stack: 'usage'
          },
          {
            label: 'Storage Usage %',
            data: [15, 42, 92, 31, 15],
            backgroundColor: '#34d399',
            borderRadius: 4,
            stack: 'usage'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#9CA3AF',
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y}%`
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#9CA3AF',
              callback: function(value) {
                return value + '%'
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#9CA3AF',
              maxRotation: 45
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    })
  }
}

// Event handlers
const refreshData = async () => {
  await loadData()
}

// Check AWS configuration on component mount
const checkAWSConfiguration = () => {
  awsConfigured.value = awsService.isLive()
  if (awsConfigured.value) {
    testAWSConnection()
  }
}

// Watch for view changes to initialize charts
watch(() => currentView.value, () => {
  if (currentView.value === 'summary') {
    // Destroy existing charts before recreating
    destroyCharts()
    setTimeout(initCharts, 100)
  } else {
    // Destroy charts when leaving summary view to prevent memory leaks
    destroyCharts()
  }
}, { immediate: false })

// Watch for time range changes to reload data
watch(() => selectedTimeRange.value, async () => {
  await loadData()
})

// Watch for region changes to reload data
watch(() => selectedRegion.value, async () => {
  if (isLiveMode.value) {
    // Update AWS service region and reload
    awsService.region = selectedRegion.value
    awsService.initializeClients()
    await loadData()
  }
})

// Lifecycle
onMounted(async () => {
  // Check AWS configuration first
  checkAWSConfiguration()
  
  // Load initial data (mock by default)
  await loadData()
  
  // Initialize charts after data is loaded
  if (currentView.value === 'summary') {
    setTimeout(initCharts, 100)
  }
})

// Cleanup when component is unmounted
onBeforeUnmount(() => {
  destroyCharts()
})
</script>

<style scoped>
.glass-card {
  background: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.gradient-text {
  background: linear-gradient(to right, #ff6c00, #a678ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn-primary {
  background-color: #ff6c00;
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: rgba(255, 108, 0, 0.8);
}
</style>
