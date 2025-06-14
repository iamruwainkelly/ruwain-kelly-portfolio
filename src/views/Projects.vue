<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-dark-bg">
      <div class="project-background"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <!-- Header with Neon Underline -->
        <div class="text-center mb-16">
          <h1 class="text-4xl lg:text-5xl font-bold mb-6 gradient-text relative inline-block">
            Featured Projects
            <div class="neon-underline"></div>
          </h1>
          <p class="text-light-text text-lg max-w-3xl mx-auto">
            Showcase of enterprise-grade solutions built with modern cloud technologies and infrastructure automation.
          </p>
        </div>

        <!-- Projects Grid -->
        <div class="grid lg:grid-cols-2 md:grid-cols-2 gap-8 mb-16">
          <!-- Dynamic Project Cards -->
          <div v-for="project in projects" :key="project.slug || project.id" class="project-card group">
            <div class="project-card-inner">
              <!-- Project Preview Image or Charts -->
              <div class="project-preview mb-6">
                <!-- Special Chart Rendering for AWS Dashboard -->
                <div v-if="project.id === 'serverless-dashboard'" class="charts-container">
                  <div class="chart-grid">
                    <div class="chart-item">
                      <canvas :ref="'costByServiceChart'" class="chart-canvas"></canvas>
                      <div class="chart-label">Service Costs</div>
                    </div>
                    <div class="chart-item">
                      <canvas :ref="'monthlyUsageChart'" class="chart-canvas"></canvas>
                      <div class="chart-label">Monthly Usage</div>
                    </div>
                    <div class="chart-item">
                      <canvas :ref="'costTrendChart'" class="chart-canvas"></canvas>
                      <div class="chart-label">Cost Trends</div>
                    </div>
                  </div>
                  <div class="metrics-grid">
                    <div class="metric-item">
                      <div class="metric-value">{{ project.mockData?.costSavings || '$23,450' }}</div>
                      <div class="metric-label">Cost Savings</div>
                    </div>
                    <div class="metric-item">
                      <div class="metric-value">{{ project.mockData?.monitored || '156' }}</div>
                      <div class="metric-label">Functions</div>
                    </div>
                    <div class="metric-item">
                      <div class="metric-value">{{ project.mockData?.alerts || '24' }}</div>
                      <div class="metric-label">Active Alerts</div>
                    </div>
                    <div class="metric-item">
                      <div class="metric-value">{{ project.mockData?.accuracy || '94.7%' }}</div>
                      <div class="metric-label">Accuracy</div>
                    </div>
                  </div>
                </div>

                <!-- Special SCM Dashboard Rendering -->
                <div v-else-if="project.id === 'scm-order-tracker'" class="scm-container">
                  <div class="scm-header">
                    <div class="scm-title">🚛 SCM Order Tracker</div>
                    <div class="scm-live-indicator">
                      <div class="live-dot"></div>
                      <span>Live</span>
                    </div>
                  </div>
                  <div class="scm-kpis">
                    <div class="kpi-item">
                      <div class="kpi-value">{{ project.mockData?.ordersTracked || '2,347' }}</div>
                      <div class="kpi-label">Orders Tracked</div>
                    </div>
                    <div class="kpi-item">
                      <div class="kpi-value">{{ project.mockData?.onTimeDelivery || '94.2%' }}</div>
                      <div class="kpi-label">On-Time Rate</div>
                    </div>
                    <div class="kpi-item">
                      <div class="kpi-value">{{ project.mockData?.activeCarriers || '23' }}</div>
                      <div class="kpi-label">Active Carriers</div>
                    </div>
                  </div>
                  <div class="scm-chart-container">
                    <canvas :ref="'scmChart'" class="scm-chart-canvas"></canvas>
                  </div>
                </div>

                <!-- Other projects with preview images or charts -->
                <div v-else class="generic-preview">
                  <!-- Terraform Infrastructure Diagram -->
                  <div v-if="project.id === 'terraform-aws-suite'" class="architecture-container">
                    <div class="infrastructure-diagram">
                      <div class="infra-node vpc">
                        <div class="node-icon">🏗️</div>
                        <div class="node-text">VPC</div>
                      </div>
                      <div class="infra-node ecs">
                        <div class="node-icon">🐳</div>
                        <div class="node-text">ECS</div>
                      </div>
                      <div class="infra-node rds">
                        <div class="node-icon">🗄️</div>
                        <div class="node-text">RDS</div>
                      </div>
                      <div class="infra-node waf">
                        <div class="node-icon">🛡️</div>
                        <div class="node-text">WAF</div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- AWS Calculator Interface -->
                  <div v-else-if="project.id === 'aws-cost-calculator'" class="calculator-container">
                    <div class="calculator-interface">
                      <div class="calc-header">
                        <div class="calc-title">💰 AWS Calculator</div>
                        <div class="calc-region">us-east-1</div>
                      </div>
                      <div class="calc-services">
                        <div class="service-row">
                          <span class="service-name">EC2</span>
                          <span class="service-cost">$24.56</span>
                        </div>
                        <div class="service-row">
                          <span class="service-name">RDS</span>
                          <span class="service-cost">$18.32</span>
                        </div>
                      </div>
                      <div class="calc-total">
                        <span class="total-label">Monthly Total</span>
                        <span class="total-amount">$55.32</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Default Preview Image -->
                  <div v-else>
                    <img v-if="project.previewImage" 
                         :src="project.previewImage" 
                         :alt="project.title"
                         class="preview-image w-full h-48 object-cover rounded-lg mb-4" />
                    <div v-else class="placeholder-preview">
                      <div class="preview-icon">{{ getProjectIcon(project) }}</div>
                      <div class="preview-text">{{ project.title }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Project Info -->
              <div class="flex items-start justify-between mb-3">
                <h2 class="text-2xl font-bold gradient-text">{{ project.title }}</h2>
                <div v-if="project.role" class="role-badge">
                  {{ project.role }}
                </div>
              </div>
              <p class="text-light-text mb-2">{{ project.subtitle }}</p>
              <p class="text-light-text mb-4">{{ project.description }}</p>
              
              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span v-for="tag in (project.tags || project.technologies || [])" 
                      :key="tag" 
                      class="tech-badge animated-tag">{{ tag }}</span>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-4">
                <a v-if="project.github" 
                   :href="project.github" 
                   target="_blank" 
                   class="btn-secondary">
                  <CodeBracketIcon class="w-4 h-4" />
                  View GitHub
                </a>
                <router-link v-if="(project.liveDemo || project.demo) && (project.liveDemo || project.demo).startsWith('/')"
                             :to="project.liveDemo || project.demo" 
                             class="btn-primary">
                  <EyeIcon class="w-4 h-4" />
                  Live Demo
                </router-link>
                <a v-else-if="project.liveDemo || project.demo"
                   :href="project.liveDemo || project.demo" 
                   target="_blank" 
                   class="btn-primary">
                  <EyeIcon class="w-4 h-4" />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom CTA -->
        <div class="text-center">
          <div class="glass-card p-8 inline-block">
            <h3 class="text-2xl font-bold mb-4 gradient-text">Explore My GitHub for More</h3>
            <p class="text-light-text mb-6">Discover additional projects, contributions, and open-source work</p>
            <a 
              href="https://github.com/iamruwainkelly" 
              target="_blank" 
              class="btn-primary text-lg px-8 py-4"
            >
              <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Visit GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { CodeBracketIcon, EyeIcon } from '@heroicons/vue/24/outline'
import {
  Chart,
  PieController,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import projectsData from '@/data/projects.json'

// Register Chart.js components
Chart.register(
  PieController,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

// Projects data
const projects = ref(projectsData)

// Chart instances
let charts = {
  costByService: null,
  monthlyUsage: null,
  costTrend: null,
  scm: null
}

// Helper function to get project icons
const getProjectIcon = (project) => {
  const iconMap = {
    'serverless-dashboard': '📊',
    'terraform-aws-suite': '🏗️',
    'aws-cost-calculator': '💰',
    'scm-order-tracker': '🚛'
  }
  return iconMap[project.id] || '🔧'
}

// Initialize charts after component mounts
onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    initializeCharts()
  }, 100)
})

const initializeCharts = () => {
  try {
    // AWS Serverless Dashboard Charts
    const awsProject = projects.value.find(p => p.id === 'serverless-dashboard')
    if (awsProject?.charts) {
      // Cost by Service Pie Chart
      const costChart = document.querySelector('[ref="costByServiceChart"]')
      if (costChart) {
        const ctx1 = costChart.getContext('2d')
        charts.costByService = new Chart(ctx1, {
          type: 'pie',
          data: {
            labels: awsProject.charts.costByService.labels,
            datasets: [{
              data: awsProject.charts.costByService.data,
              backgroundColor: ['#ff6c00', '#a678ff', '#4ade80', '#f59e0b'],
              borderColor: ['#ff6c00', '#a678ff', '#4ade80', '#f59e0b'],
              borderWidth: 2,
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
          }
        })
      }

      // Monthly Usage Bar Chart
      const usageChart = document.querySelector('[ref="monthlyUsageChart"]')
      if (usageChart) {
        const ctx2 = usageChart.getContext('2d')
        charts.monthlyUsage = new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: awsProject.charts.monthlyUsage.labels,
            datasets: [{
              data: awsProject.charts.monthlyUsage.data,
              backgroundColor: 'rgba(255, 108, 0, 0.7)',
              borderColor: '#ff6c00',
              borderWidth: 1,
              borderRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { display: false }, x: { display: false } }
          }
        })
      }

      // Cost Trend Line Chart
      const trendChart = document.querySelector('[ref="costTrendChart"]')
      if (trendChart) {
        const ctx3 = trendChart.getContext('2d')
        charts.costTrend = new Chart(ctx3, {
          type: 'line',
          data: {
            labels: awsProject.charts.costTrend.labels,
            datasets: [{
              data: awsProject.charts.costTrend.data,
              borderColor: '#a678ff',
              backgroundColor: 'rgba(166, 120, 255, 0.1)',
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#a678ff',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { display: false }, x: { display: false } }
          }
        })
      }
    }

    // SCM Order Tracker Chart
    const scmProject = projects.value.find(p => p.id === 'scm-order-tracker')
    if (scmProject?.charts) {
      const scmChartElement = document.querySelector('[ref="scmChart"]')
      if (scmChartElement) {
        const ctx4 = scmChartElement.getContext('2d')
        charts.scm = new Chart(ctx4, {
          type: 'doughnut',
          data: {
            labels: scmProject.charts.deliveryStatus.labels,
            datasets: [{
              data: scmProject.charts.deliveryStatus.data,
              backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
              borderWidth: 0,
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            cutout: '60%'
          }
        })
      }
    }
  } catch (error) {
    console.error('Error initializing charts:', error)
  }
}

// Initialize charts after component mounts
onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    initializeCharts()
  }, 100)
})

// Helper function to format metric labels
const formatMetricLabel = (key) => {
  const labelMap = {
    costSavings: 'Cost Savings',
    monitored: 'Monitored',
    alerts: 'Active Alerts',
    accuracy: 'Accuracy',
    modules: 'Modules',
    deployments: 'Deployments',
    uptime: 'Uptime',
    costOptimized: 'Cost Optimized',
    calculations: 'Calculations',
    savings: 'Total Savings',
    users: 'Active Users'
  }
  return labelMap[key] || key
}

// Architecture detail handler
const showArchitectureDetail = (component) => {
  // Could implement modal or tooltip functionality here
  console.log(`Showing details for: ${component}`)
}

// Cleanup charts on unmount
const cleanup = () => {
  Object.values(charts).forEach(chart => {
    if (chart) {
      chart.destroy()
    }
  })
}

// Cleanup when component unmounts
import { onUnmounted } from 'vue'
onUnmounted(cleanup)
</script>

<style scoped>
/* Background Animation */
.project-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 30% 40%, rgba(255, 108, 0, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(166, 120, 255, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 60% 20%, rgba(255, 108, 0, 0.04) 0%, transparent 50%);
  animation: backgroundFloat 12s ease-in-out infinite;
}

@keyframes backgroundFloat {
  0%, 100% { 
    opacity: 0.4;
    transform: scale(1); 
  }
  50% { 
    opacity: 0.7;
    transform: scale(1.05); 
  }
}

/* Neon Underline */
.neon-underline {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #ff6c00, #a678ff, transparent);
  box-shadow: 0 0 10px #ff6c00, 0 0 20px #ff6c00, 0 0 30px #ff6c00;
  animation: neonGlow 2s ease-in-out infinite alternate;
}

@keyframes neonGlow {
  from {
    box-shadow: 0 0 10px #ff6c00, 0 0 20px #ff6c00, 0 0 30px #ff6c00;
  }
  to {
    box-shadow: 0 0 15px #ff6c00, 0 0 25px #ff6c00, 0 0 35px #ff6c00;
  }
}

/* Project Cards */
.project-card {
  background: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 108, 0, 0.1) 0%, rgba(166, 120, 255, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.project-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(255, 108, 0, 0.4);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(255, 108, 0, 0.2),
    0 0 60px rgba(166, 120, 255, 0.1);
}

.project-card:hover::before {
  opacity: 1;
}

.project-card-inner {
  position: relative;
  z-index: 2;
  padding: 2rem;
}

/* Chart Components */
.charts-container {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 108, 0, 0.2);
  padding: 1rem;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.chart-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-canvas {
  width: 80px !important;
  height: 60px !important;
  border-radius: 8px;
}

.chart-label {
  font-size: 0.75rem;
  color: #ff6c00;
  margin-top: 0.5rem;
  font-weight: 500;
  text-align: center;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(255, 108, 0, 0.1);
}

.metric-item {
  text-align: center;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: #ff6c00;
  margin-bottom: 0.25rem;
}

.metric-label {
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Architecture Container */
.architecture-container {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 108, 0, 0.2);
  padding: 1rem;
}

.infrastructure-diagram {
  height: 120px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 108, 0, 0.2);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 16px;
  position: relative;
}

.infra-node {
  background: linear-gradient(135deg, rgba(255, 108, 0, 0.2), rgba(166, 120, 255, 0.2));
  border: 1px solid rgba(255, 108, 0, 0.4);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: #ff6c00;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: infraPulse 2s ease-in-out infinite;
  padding: 0.5rem;
}

.node-icon {
  font-size: 16px;
  margin-bottom: 2px;
}

.node-text {
  font-size: 8px;
  text-align: center;
}

.infra-node:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(255, 108, 0, 0.6);
}

.infra-node:nth-child(2) { animation-delay: 0.3s; }
.infra-node:nth-child(3) { animation-delay: 0.6s; }
.infra-node:nth-child(4) { animation-delay: 0.9s; }

@keyframes infraPulse {
  0%, 100% { 
    box-shadow: 0 0 5px rgba(255, 108, 0, 0.3);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 15px rgba(255, 108, 0, 0.6);
    transform: scale(1.02);
  }
}

.infra-connections {
  position: absolute;
  top: 50%;
  left: 10%;
  right: 10%;
  height: 2px;
  pointer-events: none;
}

.connection-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ff6c00, #a678ff, transparent);
  animation: connectionFlow 3s ease-in-out infinite;
}

.connection-line.vertical {
  width: 2px;
  height: 40px;
  left: 50%;
  top: -20px;
  background: linear-gradient(180deg, transparent, #ff6c00, #a678ff, transparent);
}

@keyframes connectionFlow {
  0% { opacity: 0.3; }
  50% { opacity: 0.8; }
  100% { opacity: 0.3; }
}

/* Chart Mockups */
.chart-placeholder {
  width: 60px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 108, 0, 0.2);
}

.pie-chart .chart-inner {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

.pie-segment {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.segment-1 {
  background: conic-gradient(from 0deg, #ff6c00 0deg 120deg, transparent 120deg);
  animation: pieRotate1 3s ease-in-out infinite;
}

.segment-2 {
  background: conic-gradient(from 120deg, #a678ff 120deg 240deg, transparent 240deg);
  animation: pieRotate2 3s ease-in-out infinite;
}

.segment-3 {
  background: conic-gradient(from 240deg, #4ade80 240deg 360deg, transparent 360deg);
  animation: pieRotate3 3s ease-in-out infinite;
}

@keyframes pieRotate1 {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(10deg); }
}

@keyframes pieRotate2 {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-5deg); }
}

@keyframes pieRotate3 {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(8deg); }
}

.bar-chart {
  display: flex;
  align-items: end;
  gap: 3px;
  padding: 5px;
}

.bar {
  width: 6px;
  background: linear-gradient(to top, #ff6c00, #a678ff);
  border-radius: 2px;
  animation: barBounce 2s ease-in-out infinite;
}

.bar-1 { height: 15px; animation-delay: 0s; }
.bar-2 { height: 25px; animation-delay: 0.2s; }
.bar-3 { height: 20px; animation-delay: 0.4s; }
.bar-4 { height: 30px; animation-delay: 0.6s; }

@keyframes barBounce {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.2); }
}

.line-chart {
  padding: 5px;
}

.chart-line {
  fill: none;
  stroke: #ff6c00;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: drawLine 3s ease-in-out infinite;
}

@keyframes drawLine {
  0% { stroke-dashoffset: 200; }
  50% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -200; }
}

/* Infrastructure Diagram */
.infrastructure-diagram {
  height: 100px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 108, 0, 0.2);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 16px;
  position: relative;
}

.infra-node {
  background: linear-gradient(135deg, rgba(255, 108, 0, 0.2), rgba(166, 120, 255, 0.2));
  border: 1px solid rgba(255, 108, 0, 0.4);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: #ff6c00;
  animation: infraPulse 2s ease-in-out infinite;
}

.infra-node:nth-child(2) { animation-delay: 0.3s; }
.infra-node:nth-child(3) { animation-delay: 0.6s; }
.infra-node:nth-child(4) { animation-delay: 0.9s; }

@keyframes infraPulse {
  0%, 100% { 
    box-shadow: 0 0 5px rgba(255, 108, 0, 0.3);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 15px rgba(255, 108, 0, 0.6);
    transform: scale(1.05);
  }
}

.infra-connection {
  position: absolute;
  top: 50%;
  left: 10%;
  right: 10%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ff6c00, #a678ff, transparent);
  animation: connectionFlow 3s ease-in-out infinite;
}

@keyframes connectionFlow {
  0% { opacity: 0.3; }
  50% { opacity: 0.8; }
  100% { opacity: 0.3; }
}

/* Tech Badges */
.tech-badge {
  background: rgba(255, 255, 255, 0.1);
  color: #ff6c00;
  border: 1px solid rgba(255, 108, 0, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tech-badge:hover {
  background: rgba(255, 108, 0, 0.1);
  border-color: #ff6c00;
  transform: translateY(-1px);
}

/* Buttons */
.btn-primary {
  background: linear-gradient(135deg, #ff6c00 0%, #a678ff 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 108, 0, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #ff6c00;
  border: 1px solid #ff6c00;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.btn-secondary:hover {
  background: #ff6c00;
  color: white;
  transform: translateY(-2px);
}

/* Glass Card */
.glass-card {
  backdrop-filter: blur(10px);
  background: rgba(17, 24, 39, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.glass-card:hover {
  background: rgba(17, 24, 39, 0.4);
  border-color: rgba(255, 108, 0, 0.3);
  transform: translateY(-2px);
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, #ff6c00 0%, #a678ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Calculator Interface */
.calculator-container {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 108, 0, 0.2);
  padding: 1rem;
}

.calculator-interface {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 108, 0, 0.3);
  padding: 1rem;
  min-height: 120px;
}

.calc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 108, 0, 0.2);
}

.calc-title {
  font-weight: 600;
  color: #ff6c00;
  font-size: 0.875rem;
}

.calc-region {
  background: rgba(255, 108, 0, 0.1);
  color: #ff6c00;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  border: 1px solid rgba(255, 108, 0, 0.3);
}

.calc-services {
  margin-bottom: 0.75rem;
}

.service-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.service-row:hover {
  background: rgba(255, 108, 0, 0.05);
  border-radius: 4px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.service-name {
  color: #9ca3af;
  font-weight: 500;
}

.service-cost {
  color: #ff6c00;
  font-weight: 600;
  animation: costFlicker 2s ease-in-out infinite;
}

@keyframes costFlicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.calc-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 108, 0, 0.2);
  font-size: 0.875rem;
}

.total-label {
  color: #a678ff;
  font-weight: 600;
}

.total-amount {
  color: #ff6c00;
  font-weight: bold;
  font-size: 1rem;
  animation: totalPulse 3s ease-in-out infinite;
}

@keyframes totalPulse {
  0%, 100% { 
    color: #ff6c00;
    transform: scale(1);
  }
  50% { 
    color: #a678ff;
    transform: scale(1.05);
  }
}

/* SCM Order Tracker Styles */
.scm-container {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 1rem;
}

.scm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(16, 185, 129, 0.2);
}

.scm-title {
  font-weight: 600;
  color: #10b981;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.scm-live-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #10b981;
}

.live-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: livePulse 2s ease-in-out infinite;
}

@keyframes livePulse {
  0%, 100% { 
    opacity: 1;
    transform: scale(1);
  }
  50% { 
    opacity: 0.6;
    transform: scale(1.2);
  }
}

.scm-kpis {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.kpi-item {
  text-align: center;
  background: rgba(16, 185, 129, 0.05);
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid rgba(16, 185, 129, 0.1);
}

.kpi-value {
  font-size: 0.875rem;
  font-weight: bold;
  color: #10b981;
  margin-bottom: 0.25rem;
}

.kpi-label {
  font-size: 0.6rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.scm-chart {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 185, 129, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(16, 185, 129, 0.1);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(16, 185, 129, 0.1);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(16, 185, 129, 0.05);
  border-radius: 6px;
  border: 1px solid rgba(16, 185, 129, 0.1);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(16, 185, 129, 0.1);
  transform: translateY(-1px);
}

.feature-icon {
  font-size: 1rem;
}

.feature-text {
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .project-card-inner {
    padding: 1.5rem;
  }
  
  .chart-canvas {
    width: 70px !important;
    height: 50px !important;
  }
  
  .chart-grid {
    gap: 0.75rem;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  .infrastructure-diagram {
    height: 100px;
    padding: 12px;
  }
  
  .node-icon {
    font-size: 14px;
  }
  
  .node-text {
    font-size: 7px;
  }
}

@media (max-width: 768px) {
  .project-card-inner {
    padding: 1.25rem;
  }
  
  .chart-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
  
  .chart-canvas {
    width: 60px !important;
    height: 45px !important;
  }
  
  .chart-label {
    font-size: 0.7rem;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .metric-value {
    font-size: 1.1rem;
  }
  
  .infrastructure-diagram {
    height: 80px;
    padding: 10px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  
  .node-icon {
    font-size: 12px;
  }
  
  .node-text {
    font-size: 6px;
  }
  
  .btn-primary, .btn-secondary {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }

  /* SCM Responsive - Tablet */
  .scm-kpis {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .scm-chart {
    height: 60px;
  }
}

@media (max-width: 640px) {
  .chart-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .chart-canvas {
    width: 80px !important;
    height: 60px !important;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  /* SCM Responsive - Mobile */
  .scm-kpis {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .kpi-value {
    font-size: 0.75rem;
  }
  
  .kpi-label {
    font-size: 0.55rem;
  }
  
  .scm-title {
    font-size: 0.75rem;
  }
  
  .scm-chart {
    height: 50px;
  }
}

/* Role Badge Styles */
.role-badge {
  background: linear-gradient(135deg, #ff6c00, #ff8533);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(255, 108, 0, 0.3);
  border: 1px solid rgba(255, 108, 0, 0.4);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.role-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.role-badge:hover::before {
  left: 100%;
}

/* Animated Tech Tags */
.animated-tag {
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.animated-tag:hover {
  transform: scale(1.05);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
}

.animated-tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.animated-tag:hover::before {
  left: 100%;
}

/* Enhanced Project Card Hover Effects */
.project-card:hover .role-badge {
  box-shadow: 0 4px 12px rgba(255, 108, 0, 0.4);
  transform: translateY(-1px);
}

.project-card:hover .animated-tag {
  box-shadow: 0 2px 6px rgba(255, 255, 255, 0.2);
}

/* Responsive Role Badge */
@media (max-width: 768px) {
  .role-badge {
    font-size: 0.65rem;
    padding: 0.2rem 0.6rem;
    margin-top: 0.25rem;
  }
}

@media (max-width: 640px) {
  .role-badge {
    font-size: 0.6rem;
    padding: 0.15rem 0.5rem;
    position: relative;
    margin-top: 0.5rem;
    align-self: flex-start;
  }
  
  .project-card .flex.items-start.justify-between {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>