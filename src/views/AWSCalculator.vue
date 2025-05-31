<template>
  <div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 mb-4">
          <CloudIcon class="w-8 h-8 text-primary-orange" />
          <h1 class="text-4xl lg:text-5xl font-bold gradient-text">AWS Cost Calculator</h1>
        </div>
        <p class="text-light-text text-lg max-w-2xl mx-auto">
          Estimate your AWS infrastructure costs with our comprehensive calculator. 
          Plan your cloud budget effectively with real-time pricing data.
        </p>
        
        <!-- Currency Toggle -->
        <div class="mt-6 inline-flex items-center gap-2 bg-dark-surface p-1 rounded-lg">
          <button 
            @click="setCurrency('USD')" 
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
              currency === 'USD' ? 'bg-primary-orange text-white' : 'text-light-text hover:text-white'
            ]"
          >
            USD ($)
          </button>
          <button 
            @click="setCurrency('EUR')" 
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
              currency === 'EUR' ? 'bg-primary-orange text-white' : 'text-light-text hover:text-white'
            ]"
          >
            EUR (€)
          </button>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Calculator Form -->
        <div class="lg:col-span-2">
          <div class="glass-card p-8">
            <h2 class="text-2xl font-bold mb-6 gradient-text">Configuration</h2>
            
            <form class="space-y-6">
              <!-- Region Selection -->
              <div>
                <label for="region" class="block text-sm font-semibold text-white mb-2">
                  AWS Region
                </label>
                <select v-model="formData.region" id="region" class="form-select">
                  <option value="us-east-1">US East (N. Virginia)</option>
                  <option value="us-west-1">US West (N. California)</option>
                  <option value="us-west-2">US West (Oregon)</option>
                  <option value="eu-west-1">Europe (Ireland)</option>
                  <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                </select>
              </div>

              <!-- EC2 Configuration -->
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="ec2Type" class="block text-sm font-semibold text-white mb-2">
                    EC2 Instance Type
                  </label>
                  <select v-model="formData.ec2Type" id="ec2Type" class="form-select">
                    <option value="t3.micro">t3.micro (1 vCPU, 1 GB RAM)</option>
                    <option value="t3.small">t3.small (2 vCPU, 2 GB RAM)</option>
                    <option value="t3.medium">t3.medium (2 vCPU, 4 GB RAM)</option>
                    <option value="t3.large">t3.large (2 vCPU, 8 GB RAM)</option>
                    <option value="m5.large">m5.large (2 vCPU, 8 GB RAM)</option>
                    <option value="m5.xlarge">m5.xlarge (4 vCPU, 16 GB RAM)</option>
                    <option value="c5.large">c5.large (2 vCPU, 4 GB RAM)</option>
                  </select>
                </div>
                
                <div>
                  <label for="instances" class="block text-sm font-semibold text-white mb-2">
                    Number of Instances
                  </label>
                  <input v-model.number="formData.instances" type="number" id="instances" 
                         min="1" max="100" class="form-input" />
                </div>
              </div>

              <!-- Storage Configuration -->
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="storage" class="block text-sm font-semibold text-white mb-2">
                    EBS Storage (GB)
                  </label>
                  <input v-model.number="formData.storage" type="number" id="storage" 
                         min="20" max="10000" class="form-input" />
                </div>
                
                <div>
                  <label for="storageType" class="block text-sm font-semibold text-white mb-2">
                    Storage Type
                  </label>
                  <select v-model="formData.storageType" id="storageType" class="form-select">
                    <option value="gp3">General Purpose SSD (gp3)</option>
                    <option value="gp2">General Purpose SSD (gp2)</option>
                    <option value="io2">Provisioned IOPS SSD (io2)</option>
                    <option value="st1">Throughput Optimized HDD (st1)</option>
                  </select>
                </div>
              </div>

              <!-- Database Configuration -->
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="rdsType" class="block text-sm font-semibold text-white mb-2">
                    RDS Instance Type
                  </label>
                  <select v-model="formData.rdsType" id="rdsType" class="form-select">
                    <option value="">No Database</option>
                    <option value="db.t3.micro">db.t3.micro (1 vCPU, 1 GB RAM)</option>
                    <option value="db.t3.small">db.t3.small (2 vCPU, 2 GB RAM)</option>
                    <option value="db.t3.medium">db.t3.medium (2 vCPU, 4 GB RAM)</option>
                    <option value="db.r5.large">db.r5.large (2 vCPU, 16 GB RAM)</option>
                  </select>
                </div>
                
                <div>
                  <label for="rdsStorage" class="block text-sm font-semibold text-white mb-2">
                    RDS Storage (GB)
                  </label>
                  <input v-model.number="formData.rdsStorage" type="number" id="rdsStorage" 
                         min="20" max="1000" class="form-input" :disabled="!formData.rdsType" />
                </div>
              </div>

              <!-- Network Configuration -->
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="dataTransfer" class="block text-sm font-semibold text-white mb-2">
                    Data Transfer Out (GB/month)
                  </label>
                  <input v-model.number="formData.dataTransfer" type="number" id="dataTransfer" 
                         min="0" max="10000" class="form-input" />
                </div>
                
                <div>
                  <label for="loadBalancer" class="block text-sm font-semibold text-white mb-2">
                    Load Balancer
                  </label>
                  <select v-model="formData.loadBalancer" id="loadBalancer" class="form-select">
                    <option value="">No Load Balancer</option>
                    <option value="alb">Application Load Balancer</option>
                    <option value="nlb">Network Load Balancer</option>
                  </select>
                </div>
              </div>

              <!-- Additional Services -->
              <div>
                <label class="block text-sm font-semibold text-white mb-4">Additional Services</label>
                <div class="grid md:grid-cols-2 gap-4">
                  <label class="flex items-center gap-3">
                    <input v-model="formData.cloudfront" type="checkbox" 
                           class="w-4 h-4 text-primary-orange bg-dark-surface border-dark-border rounded focus:ring-primary-orange" />
                    <span class="text-light-text">CloudFront CDN</span>
                  </label>
                  <label class="flex items-center gap-3">
                    <input v-model="formData.s3" type="checkbox" 
                           class="w-4 h-4 text-primary-orange bg-dark-surface border-dark-border rounded focus:ring-primary-orange" />
                    <span class="text-light-text">S3 Storage (100GB)</span>
                  </label>
                  <label class="flex items-center gap-3">
                    <input v-model="formData.route53" type="checkbox" 
                           class="w-4 h-4 text-primary-orange bg-dark-surface border-dark-border rounded focus:ring-primary-orange" />
                    <span class="text-light-text">Route 53 DNS</span>
                  </label>
                  <label class="flex items-center gap-3">
                    <input v-model="formData.waf" type="checkbox" 
                           class="w-4 h-4 text-primary-orange bg-dark-surface border-dark-border rounded focus:ring-primary-orange" />
                    <span class="text-light-text">AWS WAF</span>
                  </label>
                </div>
              </div>

              <!-- Quick Presets -->
              <div class="mt-8">
                <label class="block text-sm font-semibold text-white mb-4">Quick Presets</label>
                <div class="flex flex-wrap gap-4">
                  <button @click="applyPreset('startup')" class="preset-btn">
                    Startup Setup
                  </button>
                  <button @click="applyPreset('production')" class="preset-btn">
                    Production Setup
                  </button>
                  <button @click="applyPreset('enterprise')" class="preset-btn">
                    Enterprise Setup
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Results Panel -->
        <div class="space-y-6">
          <!-- Monthly Cost Pie Chart -->
          <div v-if="costs && costs.total > 0" class="glass-card p-6">
            <h3 class="text-xl font-bold mb-4 gradient-text">Monthly Cost Breakdown</h3>
            <div class="relative h-64 mb-4">
              <Doughnut
                :data="chartData"
                :options="chartOptions"
                class="!h-64"
              />
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold gradient-text mb-1">
                {{ formatCurrency(costs.total) }}
              </div>
              <div class="text-sm text-light-text">Total Monthly Cost</div>
            </div>
          </div>

          <!-- Detailed Cost Cards -->
          <div v-if="costs" class="space-y-3">
            <!-- EC2 Cost Card -->
            <div class="glass-card p-4 border-l-4 border-blue-500">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-semibold text-white">EC2 Instances</h4>
                  <p class="text-xs text-light-text mt-1">
                    {{ formData.instances }}x {{ formData.ec2Type }} • Virtual servers for applications
                  </p>
                </div>
                <span class="font-bold text-blue-400">{{ formatCurrency(costs.ec2) }}</span>
              </div>
            </div>

            <!-- Storage Cost Card -->
            <div class="glass-card p-4 border-l-4 border-green-500">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-semibold text-white">EBS Storage</h4>
                  <p class="text-xs text-light-text mt-1">
                    {{ formData.storage }}GB {{ formData.storageType }} • Persistent block storage
                  </p>
                </div>
                <span class="font-bold text-green-400">{{ formatCurrency(costs.storage) }}</span>
              </div>
            </div>

            <!-- RDS Cost Card -->
            <div v-if="costs.rds > 0" class="glass-card p-4 border-l-4 border-purple-500">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-semibold text-white">RDS Database</h4>
                  <p class="text-xs text-light-text mt-1">
                    {{ formData.rdsType }} + {{ formData.rdsStorage }}GB • Managed database service
                  </p>
                </div>
                <span class="font-bold text-purple-400">{{ formatCurrency(costs.rds) }}</span>
              </div>
            </div>

            <!-- Data Transfer Cost Card -->
            <div v-if="costs.dataTransfer > 0" class="glass-card p-4 border-l-4 border-yellow-500">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-semibold text-white">Data Transfer</h4>
                  <p class="text-xs text-light-text mt-1">
                    {{ formData.dataTransfer }}GB/month • Internet data transfer costs
                  </p>
                </div>
                <span class="font-bold text-yellow-400">{{ formatCurrency(costs.dataTransfer) }}</span>
              </div>
            </div>

            <!-- Load Balancer Cost Card -->
            <div v-if="costs.loadBalancer > 0" class="glass-card p-4 border-l-4 border-red-500">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-semibold text-white">Load Balancer</h4>
                  <p class="text-xs text-light-text mt-1">
                    {{ formData.loadBalancer.toUpperCase() }} • High availability & traffic distribution
                  </p>
                </div>
                <span class="font-bold text-red-400">{{ formatCurrency(costs.loadBalancer) }}</span>
              </div>
            </div>

            <!-- Additional Services Cost Card -->
            <div v-if="costs.additional > 0" class="glass-card p-4 border-l-4 border-orange-500">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-semibold text-white">Additional Services</h4>
                  <p class="text-xs text-light-text mt-1">
                    <span v-if="formData.cloudfront">CloudFront</span>
                    <span v-if="formData.s3">{{ formData.cloudfront ? ', ' : '' }}S3</span>
                    <span v-if="formData.route53">{{ (formData.cloudfront || formData.s3) ? ', ' : '' }}Route 53</span>
                    <span v-if="formData.waf">{{ (formData.cloudfront || formData.s3 || formData.route53) ? ', ' : '' }}WAF</span>
                  </p>
                </div>
                <span class="font-bold text-orange-400">{{ formatCurrency(costs.additional) }}</span>
              </div>
            </div>
          </div>
          <!-- Empty State -->
          <div v-else class="glass-card p-8">
            <div class="text-center">
              <CalculatorIcon class="w-16 h-16 mx-auto mb-4 text-light-text" />
              <h3 class="text-xl font-bold mb-2 text-white">Ready to Calculate</h3>
              <p class="text-light-text">Configure your AWS setup above to see real-time cost estimates</p>
            </div>
          </div>

          <!-- Savings Tips -->
          <div class="glass-card p-6">
            <h3 class="text-xl font-bold mb-4 gradient-text">Cost Optimization Tips</h3>
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <LightBulbIcon class="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 class="font-semibold text-white text-sm">Reserved Instances</h4>
                  <p class="text-light-text text-xs">Save up to 75% with 1-3 year commitments</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <LightBulbIcon class="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 class="font-semibold text-white text-sm">Spot Instances</h4>
                  <p class="text-light-text text-xs">Use for non-critical workloads, save up to 90%</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <LightBulbIcon class="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 class="font-semibold text-white text-sm">Auto Scaling</h4>
                  <p class="text-light-text text-xs">Automatically adjust capacity based on demand</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { 
  CloudIcon, 
  CalculatorIcon, 
  LightBulbIcon 
} from '@heroicons/vue/24/outline'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

// Currency state with localStorage persistence
const currency = ref('USD')
const exchangeRate = ref(0.85) // EUR to USD rate (approximate)

const setCurrency = (newCurrency) => {
  currency.value = newCurrency
  localStorage.setItem('aws-calculator-currency', newCurrency)
}

// Load currency preference from localStorage
onMounted(() => {
  const savedCurrency = localStorage.getItem('aws-calculator-currency')
  if (savedCurrency) {
    currency.value = savedCurrency
  }
})

const formatCurrency = (amount) => {
  const value = currency.value === 'EUR' ? (parseFloat(amount) * exchangeRate.value) : parseFloat(amount)
  const symbol = currency.value === 'EUR' ? '€' : '$'
  return `${symbol}${value.toFixed(2)}`
}

const formData = reactive({
  region: 'us-east-1',
  ec2Type: 't3.micro',
  instances: 1,
  storage: 20,
  storageType: 'gp3',
  rdsType: '',
  rdsStorage: 20,
  dataTransfer: 100,
  loadBalancer: '',
  cloudfront: false,
  s3: false,
  route53: false,
  waf: false
})

// AWS Pricing (simplified, per hour unless noted)
const pricing = {
  ec2: {
    't3.micro': 0.0104,
    't3.small': 0.0208,
    't3.medium': 0.0416,
    't3.large': 0.0832,
    'm5.large': 0.096,
    'm5.xlarge': 0.192,
    'c5.large': 0.085
  },
  storage: {
    'gp3': 0.08,
    'gp2': 0.10,
    'io2': 0.125,
    'st1': 0.045
  },
  rds: {
    'db.t3.micro': 0.017,
    'db.t3.small': 0.034,
    'db.t3.medium': 0.068,
    'db.r5.large': 0.24
  },
  loadBalancer: {
    'alb': 22.5,
    'nlb': 22.5
  },
  dataTransfer: 0.09,
  additionalServices: {
    cloudfront: 1.0,
    s3: 2.3,
    route53: 0.5,
    waf: 5.0
  }
}

// Reactive cost calculation
const costs = computed(() => {
  const hoursPerMonth = 730
  
  // EC2 costs
  const ec2Cost = (pricing.ec2[formData.ec2Type] || 0) * formData.instances * hoursPerMonth
  
  // Storage costs
  const storageCost = formData.storage * (pricing.storage[formData.storageType] || 0)
  
  // RDS costs
  const rdsCost = formData.rdsType ? 
    (pricing.rds[formData.rdsType] * hoursPerMonth) + (formData.rdsStorage * 0.115) : 0
  
  // Data transfer costs (first 100GB free)
  const dataTransferCost = Math.max(0, formData.dataTransfer - 100) * pricing.dataTransfer
  
  // Load balancer costs
  const loadBalancerCost = formData.loadBalancer ? pricing.loadBalancer[formData.loadBalancer] : 0
  
  // Additional services
  let additionalCost = 0
  if (formData.cloudfront) additionalCost += pricing.additionalServices.cloudfront
  if (formData.s3) additionalCost += pricing.additionalServices.s3
  if (formData.route53) additionalCost += pricing.additionalServices.route53
  if (formData.waf) additionalCost += pricing.additionalServices.waf
  
  const total = ec2Cost + storageCost + rdsCost + dataTransferCost + loadBalancerCost + additionalCost
  
  return {
    ec2: ec2Cost.toFixed(2),
    storage: storageCost.toFixed(2),
    rds: rdsCost.toFixed(2),
    dataTransfer: dataTransferCost.toFixed(2),
    loadBalancer: loadBalancerCost.toFixed(2),
    additional: additionalCost.toFixed(2),
    total: total.toFixed(2)
  }
})

// Chart data for pie chart
const chartData = computed(() => {
  if (!costs.value || costs.value.total <= 0) return null
  
  const data = []
  const labels = []
  const colors = []
  
  if (parseFloat(costs.value.ec2) > 0) {
    data.push(parseFloat(costs.value.ec2))
    labels.push('EC2 Instances')
    colors.push('#3B82F6')
  }
  if (parseFloat(costs.value.storage) > 0) {
    data.push(parseFloat(costs.value.storage))
    labels.push('EBS Storage')
    colors.push('#10B981')
  }
  if (parseFloat(costs.value.rds) > 0) {
    data.push(parseFloat(costs.value.rds))
    labels.push('RDS Database')
    colors.push('#8B5CF6')
  }
  if (parseFloat(costs.value.dataTransfer) > 0) {
    data.push(parseFloat(costs.value.dataTransfer))
    labels.push('Data Transfer')
    colors.push('#F59E0B')
  }
  if (parseFloat(costs.value.loadBalancer) > 0) {
    data.push(parseFloat(costs.value.loadBalancer))
    labels.push('Load Balancer')
    colors.push('#EF4444')
  }
  if (parseFloat(costs.value.additional) > 0) {
    data.push(parseFloat(costs.value.additional))
    labels.push('Additional Services')
    colors.push('#F97316')
  }
  
  return {
    labels,
    datasets: [{
      data,
      backgroundColor: colors,
      borderColor: colors.map(color => color + '80'),
      borderWidth: 2
    }]
  }
})

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#9CA3AF',
        padding: 20,
        usePointStyle: true,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: '#1F2937',
      titleColor: '#FFFFFF',
      bodyColor: '#FFFFFF',
      borderColor: '#374151',
      borderWidth: 1,
      callbacks: {
        label: (context) => {
          const value = currency.value === 'EUR' ? 
            (context.raw * exchangeRate.value).toFixed(2) : 
            context.raw.toFixed(2)
          const symbol = currency.value === 'EUR' ? '€' : '$'
          return `${context.label}: ${symbol}${value}`
        }
      }
    }
  }
}

const applyPreset = (preset) => {
  switch (preset) {
    case 'startup':
      Object.assign(formData, {
        ec2Type: 't3.micro',
        instances: 1,
        storage: 20,
        storageType: 'gp3',
        rdsType: '',
        dataTransfer: 50,
        loadBalancer: '',
        cloudfront: false,
        s3: true,
        route53: true,
        waf: false
      })
      break
    case 'production':
      Object.assign(formData, {
        ec2Type: 't3.medium',
        instances: 2,
        storage: 100,
        storageType: 'gp3',
        rdsType: 'db.t3.small',
        rdsStorage: 100,
        dataTransfer: 500,
        loadBalancer: 'alb',
        cloudfront: true,
        s3: true,
        route53: true,
        waf: true
      })
      break
    case 'enterprise':
      Object.assign(formData, {
        ec2Type: 'm5.large',
        instances: 4,
        storage: 500,
        storageType: 'gp3',
        rdsType: 'db.r5.large',
        rdsStorage: 500,
        dataTransfer: 2000,
        loadBalancer: 'alb',
        cloudfront: true,
        s3: true,
        route53: true,
        waf: true
      })
      break
  }
}
</script>

<style scoped>
.form-input {
  width: 100%;
  padding: 12px 16px;
  background-color: #1F2937;
  border: 1px solid #374151;
  border-radius: 8px;
  color: #FFFFFF;
  transition: border-color 0.2s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: #F97316;
  box-shadow: 0 0 0 1px #F97316;
}

.form-input::placeholder {
  color: #9CA3AF;
}

.form-select {
  width: 100%;
  padding: 12px 16px;
  background-color: #1F2937;
  border: 1px solid #374151;
  border-radius: 8px;
  color: #FFFFFF;
  transition: border-color 0.2s ease-in-out;
}

.form-select:focus {
  outline: none;
  border-color: #F97316;
  box-shadow: 0 0 0 1px #F97316;
}

.preset-button {
  width: 100%;
  text-align: left;
  background-color: #1F2937;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;
  min-height: 64px;
  padding: 12px;
  transform: translateZ(0);
  will-change: background-color;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;
  cursor: pointer;
}

.preset-button:hover {
  background-color: #374151;
}

.preset-button:active {
  background-color: #374151;
}

.preset-btn {
  background-color: #1F2937;
  color: #FFFFFF;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  font-weight: 500;
  font-size: 14px;
}

.preset-btn:hover {
  background-color: #374151;
}

.preset-btn:active {
  background-color: #374151;
}
</style>