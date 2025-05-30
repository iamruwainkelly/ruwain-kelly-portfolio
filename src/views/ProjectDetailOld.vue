<template>
  <div class="project-details min-h-screen bg-dark-bg text-text-primary">
    <!-- Background -->
    <div class="absolute inset-0 bg-dark-bg">
      <div class="project-detail-background"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        
        <!-- Back Button -->
        <router-link to="/projects" class="back-link inline-flex items-center gap-2 text-primary-orange hover:text-primary-purple transition-colors mb-8 group font-semibold">
          <ArrowLeftIcon class="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </router-link>

        <!-- Project Header with Screenshot -->
        <section class="project-header glass-card p-8 mb-12 animate-fade-in-up">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-4xl lg:text-5xl font-bold mb-4 gradient-text">{{ currentProject.title || 'AWS Serverless Dashboard' }}</h1>
              <p class="text-xl text-light-text mb-6">{{ currentProject.subtitle || 'Real-time AWS infrastructure monitoring and cost optimization platform' }}</p>
              <p class="text-light-text text-lg leading-relaxed mb-8">{{ currentProject.longDescription || currentProject.description || 'A comprehensive dashboard for monitoring AWS serverless infrastructure with real-time metrics, cost tracking, and performance optimization insights.' }}</p>
              
              <div class="flex flex-wrap gap-4">
                <a v-if="currentProject.github" :href="currentProject.github" target="_blank" 
                   class="btn-primary inline-flex items-center gap-2">
                  <CodeBracketIcon class="w-5 h-5" />
                  View GitHub
                </a>
                <router-link v-if="currentProject.liveDemo && currentProject.liveDemo.startsWith('/')" 
                   :to="currentProject.liveDemo"
                   class="btn-secondary inline-flex items-center gap-2">
                  <ArrowTopRightOnSquareIcon class="w-5 h-5" />
                  Live Demo
                </router-link>
                <a v-else-if="currentProject.liveDemo" :href="currentProject.liveDemo" target="_blank" 
                   class="btn-secondary inline-flex items-center gap-2">
                  <ArrowTopRightOnSquareIcon class="w-5 h-5" />
                  Live Demo
                </a>
              </div>
            </div>
            
            <div class="screenshot">
              <!-- Project Screenshot/Mockup -->
              <div class="aspect-video rounded-2xl bg-gradient-to-br from-primary-orange to-primary-purple p-1">
                <div class="w-full h-full bg-dark-surface rounded-2xl flex items-center justify-center border-gradient">
                  <div class="text-center">
                    <div class="text-6xl font-bold gradient-text mb-4">{{ currentProject.title?.charAt(0) || 'A' }}</div>
                    <div class="text-light-text text-sm">{{ currentProject.title || 'AWS Dashboard' }} Screenshot</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
            
            <div class="relative">
              <div class="aspect-video rounded-2xl bg-gradient-to-br from-primary-orange to-primary-purple p-1">
                <div class="w-full h-full bg-dark-surface rounded-2xl flex items-center justify-center">
                  <div class="text-6xl font-bold gradient-text">{{ currentProject.title?.charAt(0) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Project Metrics -->
        <div v-if="currentProject.mockData" class="grid md:grid-cols-4 gap-6 mb-12 animate-fade-in-up" style="animation-delay: 0.2s;">
          <div v-for="(value, key) in currentProject.mockData" :key="key" class="glass-card p-6 text-center">
            <div class="text-2xl font-bold gradient-text mb-2">{{ value }}</div>
            <div class="text-light-text text-sm capitalize">{{ formatMetricLabel(key) }}</div>
          </div>
        </div>

        <!-- Technical Details -->
        <div class="grid lg:grid-cols-2 gap-12 mb-12">
          <!-- Technologies Used -->
          <div class="glass-card p-8 animate-fade-in-up" style="animation-delay: 0.4s;">
            <h2 class="text-2xl font-bold mb-6 gradient-text">Technologies Used</h2>
            <div class="flex flex-wrap gap-3">
              <span v-for="tech in currentProject.technologies" :key="tech" 
                    class="px-4 py-2 bg-dark-surface text-light-text rounded-lg border border-primary-orange/30 hover:border-primary-orange transition-colors">
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Architecture (if available) -->
          <div v-if="currentProject.architecture" class="glass-card p-8 animate-fade-in-up" style="animation-delay: 0.6s;">
            <h2 class="text-2xl font-bold mb-6 gradient-text">Architecture</h2>
            <div class="space-y-4">
              <div v-if="currentProject.architecture.components">
                <h3 class="text-lg font-semibold text-primary-orange mb-2">Components</h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="component in currentProject.architecture.components" :key="component"
                        class="px-3 py-1 bg-primary-orange/20 text-primary-orange rounded-full text-sm">
                    {{ component }}
                  </span>
                </div>
              </div>
              <div v-if="currentProject.architecture.regions">
                <p class="text-light-text"><strong class="text-primary-orange">Regions:</strong> {{ currentProject.architecture.regions }}</p>
              </div>
              <div v-if="currentProject.architecture.environments">
                <p class="text-light-text"><strong class="text-primary-orange">Environments:</strong> {{ currentProject.architecture.environments.join(', ') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Charts (for dashboard project) -->
        <div v-if="currentProject.charts" class="glass-card p-8 mb-12 animate-fade-in-up" style="animation-delay: 0.8s;">
          <h2 class="text-2xl font-bold mb-6 gradient-text">Live Dashboard Preview</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <!-- Cost by Service Chart -->
            <div class="chart-container">
              <canvas ref="costByServiceChart" class="chart-canvas-large"></canvas>
              <h3 class="chart-title">Cost by Service</h3>
            </div>
            
            <!-- Monthly Usage Chart -->
            <div class="chart-container">
              <canvas ref="monthlyUsageChart" class="chart-canvas-large"></canvas>
              <h3 class="chart-title">Monthly Usage</h3>
            </div>
            
            <!-- Cost Trend Chart -->
            <div class="chart-container">
              <canvas ref="costTrendChart" class="chart-canvas-large"></canvas>
              <h3 class="chart-title">Cost Trend</h3>
            </div>
          </div>
        </div>

        <!-- Code Preview (for Terraform project) -->
        <div v-if="currentProject.id === 'terraform-aws-suite'" class="glass-card p-8 mb-12 animate-fade-in-up" style="animation-delay: 0.8s;">
          <h2 class="text-2xl font-bold mb-6 gradient-text">Infrastructure Code Preview</h2>
          <div class="grid lg:grid-cols-2 gap-6">
            <!-- VPC Module -->
            <div class="code-preview-container">
              <h3 class="text-lg font-semibold mb-3 text-primary-orange">VPC Module</h3>
              <pre class="code-block"><code class="text-sm">resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = merge(var.common_tags, {
    Name = "${var.project_name}-vpc"
  })
}

resource "aws_subnet" "public" {
  count = length(var.public_subnets)
  
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnets[count.index]
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = merge(var.common_tags, {
    Name = "${var.project_name}-public-${count.index + 1}"
    Type = "Public"
  })
}</code></pre>
            </div>

            <!-- ECS Module -->
            <div class="code-preview-container">
              <h3 class="text-lg font-semibold mb-3 text-primary-orange">ECS Cluster</h3>
              <pre class="code-block"><code class="text-sm">resource "aws_ecs_cluster" "main" {
  name = var.cluster_name

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = var.common_tags
}

resource "aws_ecs_service" "app" {
  name            = var.service_name
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.desired_count

  deployment_configuration {
    maximum_percent         = 200
    minimum_healthy_percent = 100
  }

  network_configuration {
    subnets          = var.private_subnets
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = false
  }
}</code></pre>
            </div>
          </div>
        </div>

        <!-- Architecture Diagram (for all projects) -->
        <div class="glass-card p-8 mb-12 animate-fade-in-up" style="animation-delay: 1s;">
          <h2 class="text-2xl font-bold mb-6 gradient-text">Architecture Overview</h2>
          <div v-if="currentProject.id === 'serverless-dashboard'" class="architecture-diagram">
            <div class="grid md:grid-cols-4 gap-4 items-center">
              <div class="arch-component">
                <div class="arch-icon bg-blue-500/20 border-blue-500">
                  <CodeBracketIcon class="w-8 h-8 text-blue-400" />
                </div>
                <h4 class="font-semibold mt-2">Frontend</h4>
                <p class="text-sm text-light-text">Vue.js + Chart.js</p>
              </div>
              <div class="arch-arrow">→</div>
              <div class="arch-component">
                <div class="arch-icon bg-orange-500/20 border-orange-500">
                  <CloudIcon class="w-8 h-8 text-orange-400" />
                </div>
                <h4 class="font-semibold mt-2">API Gateway</h4>
                <p class="text-sm text-light-text">REST API + Auth</p>
              </div>
              <div class="arch-arrow">→</div>
              <div class="arch-component">
                <div class="arch-icon bg-purple-500/20 border-purple-500">
                  <BoltIcon class="w-8 h-8 text-purple-400" />
                </div>
                <h4 class="font-semibold mt-2">Lambda</h4>
                <p class="text-sm text-light-text">Serverless Logic</p>
              </div>
              <div class="arch-arrow">→</div>
              <div class="arch-component">
                <div class="arch-icon bg-green-500/20 border-green-500">
                  <CircleStackIcon class="w-8 h-8 text-green-400" />
                </div>
                <h4 class="font-semibold mt-2">DynamoDB</h4>
                <p class="text-sm text-light-text">NoSQL Database</p>
              </div>
            </div>
          </div>
          <div v-else-if="currentProject.id === 'terraform-aws-suite'" class="architecture-diagram">
            <div class="grid md:grid-cols-3 gap-6">
              <div class="arch-layer">
                <h4 class="font-semibold mb-3 text-primary-orange">Infrastructure</h4>
                <div class="space-y-2">
                  <div class="arch-item">VPC + Subnets</div>
                  <div class="arch-item">Security Groups</div>
                  <div class="arch-item">Load Balancer</div>
                </div>
              </div>
              <div class="arch-layer">
                <h4 class="font-semibold mb-3 text-primary-orange">Compute</h4>
                <div class="space-y-2">
                  <div class="arch-item">ECS Cluster</div>
                  <div class="arch-item">Auto Scaling</div>
                  <div class="arch-item">Task Definitions</div>
                </div>
              </div>
              <div class="arch-layer">
                <h4 class="font-semibold mb-3 text-primary-orange">Data</h4>
                <div class="space-y-2">
                  <div class="arch-item">RDS Multi-AZ</div>
                  <div class="arch-item">ElastiCache</div>
                  <div class="arch-item">S3 Buckets</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Key Features -->
        <div class="glass-card p-8 mb-12 animate-fade-in-up" style="animation-delay: 1s;">
          <h2 class="text-2xl font-bold mb-6 gradient-text">Key Features</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="(feature, index) in getProjectFeatures()" :key="index" class="flex items-start gap-4">
              <div class="w-8 h-8 bg-gradient-to-br from-primary-orange to-primary-purple rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <CheckIcon class="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 class="font-semibold text-white mb-1">{{ feature.title }}</h3>
                <p class="text-light-text text-sm">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Projects -->
        <div class="animate-fade-in-up" style="animation-delay: 1.2s;">
          <h2 class="text-2xl font-bold mb-8 gradient-text text-center">Other Projects</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="relatedProject in relatedProjects" :key="relatedProject.id" 
                 class="project-card group cursor-pointer"
                 @click="navigateToProject(relatedProject.id)">
              <div class="project-card-inner p-6">
                <h3 class="text-lg font-bold mb-2 gradient-text">{{ relatedProject.title }}</h3>
                <p class="text-light-text text-sm mb-4">{{ relatedProject.description }}</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tech in relatedProject.technologies.slice(0, 3)" :key="tech" 
                        class="px-2 py-1 bg-dark-surface text-light-text rounded text-xs">
                    {{ tech }}
                  </span>
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
import { ref, computed, onMounted, nextTick, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  ArrowLeftIcon, 
  CodeBracketIcon, 
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  CloudIcon,
  BoltIcon,
  CircleStackIcon
} from '@heroicons/vue/24/outline'
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
import projectsData from '../data/projects.json'

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

const route = useRoute()
const router = useRouter()

// Chart refs
const costByServiceChart = ref(null)
const monthlyUsageChart = ref(null)
const costTrendChart = ref(null)

// Data
const projects = ref(projectsData)
const charts = ref({})

// Computed properties
const currentProject = computed(() => {
  const projectId = route.params.id
  return projects.value.find(p => p.id === projectId) || {}
})

const relatedProjects = computed(() => {
  return projects.value.filter(p => p.id !== currentProject.value.id).slice(0, 3)
})

// Methods
const formatMetricLabel = (key) => {
  const labelMap = {
    costSavings: 'Cost Savings',
    monitored: 'Monitored',
    alerts: 'Active Alerts',
    accuracy: 'Accuracy',
    modules: 'Modules',
    deployments: 'Deployments',
    uptime: 'Uptime',
    costOptimized: 'Cost Optimized'
  }
  return labelMap[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

const getProjectFeatures = () => {
  const features = {
    'serverless-dashboard': [
      { title: 'Real-time Cost Monitoring', description: 'Track AWS Lambda, API Gateway, and DynamoDB costs in real-time with sub-minute granularity' },
      { title: 'Predictive Cost Forecasting', description: 'ML-powered predictions using historical usage patterns to forecast monthly cloud spend' },
      { title: 'Interactive Data Visualizations', description: 'Chart.js powered dashboards with drill-down capabilities and export functionality' },
      { title: 'Multi-tenant Authentication', description: 'Secure Auth0 integration with role-based access control and team management' },
      { title: 'Intelligent Cost Optimization', description: 'Automated recommendations for rightsizing, scheduling, and resource optimization' },
      { title: 'Multi-Region Cost Analysis', description: 'Compare costs across AWS regions with currency conversion and regional pricing' },
      { title: 'Custom Alert Rules', description: 'Configurable budget alerts with Slack/email notifications and escalation policies' },
      { title: 'API-First Architecture', description: 'RESTful APIs with comprehensive documentation and SDK for custom integrations' }
    ],
    'terraform-aws-suite': [
      { title: 'Production-Ready Modules', description: 'Battle-tested Terraform modules for VPC, ECS, RDS with 99.9% uptime guarantee' },
      { title: 'Multi-Environment Support', description: 'Separate configurations for dev, staging, and production with environment-specific variables' },
      { title: 'Auto-Scaling Infrastructure', description: 'Dynamic scaling policies for ECS services and RDS read replicas based on CloudWatch metrics' },
      { title: 'Comprehensive Monitoring', description: 'CloudWatch dashboards, custom metrics, and automated alerting for all infrastructure components' },
      { title: 'Security Best Practices', description: 'Least-privilege IAM roles, security groups, and VPC flow logs for compliance' },
      { title: 'CI/CD Pipeline Integration', description: 'GitHub Actions workflows with automated testing, validation, and deployment' },
      { title: 'Cost Optimization Features', description: 'Resource tagging strategies, cost allocation, and automated cleanup of unused resources' },
      { title: 'Disaster Recovery Ready', description: 'Multi-AZ deployments, automated backups, and infrastructure replication across regions' }
    ]
  }
  return features[currentProject.value.id] || [
    { title: 'Modern Architecture', description: 'Built with current best practices and scalable design patterns' },
    { title: 'Performance Optimized', description: 'Optimized for speed and efficiency with comprehensive caching strategies' },
    { title: 'Security First', description: 'Implements industry-standard security practices and compliance requirements' },
    { title: 'Fully Responsive', description: 'Works seamlessly across desktop, tablet, and mobile devices' }
  ]
}

const navigateToProject = (projectId) => {
  router.push(`/projects/${projectId}`)
}

const initializeCharts = () => {
  if (!currentProject.value.charts) return

  // Cost by Service Pie Chart
  if (costByServiceChart.value && currentProject.value.charts.costByService) {
    const ctx1 = costByServiceChart.value.getContext('2d')
    charts.value.costByService = new Chart(ctx1, {
      type: 'pie',
      data: {
        labels: currentProject.value.charts.costByService.labels,
        datasets: [{
          data: currentProject.value.charts.costByService.data,
          backgroundColor: ['#ff6c00', '#a678ff', '#4ade80', '#f59e0b'],
          borderColor: ['#ff6c00', '#a678ff', '#4ade80', '#f59e0b'],
          borderWidth: 2,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed + '%'
              }
            }
          }
        }
      }
    })
  }

  // Monthly Usage Bar Chart
  if (monthlyUsageChart.value && currentProject.value.charts.monthlyUsage) {
    const ctx2 = monthlyUsageChart.value.getContext('2d')
    charts.value.monthlyUsage = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: currentProject.value.charts.monthlyUsage.labels,
        datasets: [{
          data: currentProject.value.charts.monthlyUsage.data,
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
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
          x: { grid: { color: 'rgba(255, 255, 255, 0.1)' } }
        }
      }
    })
  }

  // Cost Trend Line Chart
  if (costTrendChart.value && currentProject.value.charts.costTrend) {
    const ctx3 = costTrendChart.value.getContext('2d')
    charts.value.costTrend = new Chart(ctx3, {
      type: 'line',
      data: {
        labels: currentProject.value.charts.costTrend.labels,
        datasets: [{
          data: currentProject.value.charts.costTrend.data,
          borderColor: '#a678ff',
          backgroundColor: 'rgba(166, 120, 255, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#a678ff',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
          x: { grid: { color: 'rgba(255, 255, 255, 0.1)' } }
        }
      }
    })
  }
}

const cleanup = () => {
  Object.values(charts.value).forEach(chart => {
    if (chart) chart.destroy()
  })
  charts.value = {}
}

// Lifecycle
onMounted(async () => {
  await nextTick()
  if (currentProject.value.charts) {
    initializeCharts()
  }
})

// Cleanup on unmount
onUnmounted(cleanup)
</script>

<style scoped>
/* Background Effects */
.project-detail-background {
  background: linear-gradient(135deg, rgba(255, 108, 0, 0.1) 0%, rgba(166, 120, 255, 0.1) 100%);
  position: relative;
}

.project-detail-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(255, 108, 0, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(166, 120, 255, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 108, 0, 0.2) 0%, transparent 50%);
  animation: pulse-background 4s ease-in-out infinite alternate;
}

@keyframes pulse-background {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

/* Glass Card Effects */
.glass-card {
  background: rgba(30, 30, 30, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.glass-card:hover {
  background: rgba(40, 40, 40, 0.9);
  border-color: rgba(255, 108, 0, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(255, 108, 0, 0.1);
}

/* Chart Containers */
.chart-container {
  position: relative;
  height: 250px;
  background: rgba(20, 20, 20, 0.6);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.chart-container:hover {
  border-color: rgba(255, 108, 0, 0.4);
  box-shadow: 0 4px 20px rgba(255, 108, 0, 0.1);
}

.chart-canvas-large {
  width: 100% !important;
  height: 180px !important;
}

.chart-title {
  text-align: center;
  margin-top: 12px;
  font-weight: 600;
  color: #e5e7eb;
  font-size: 14px;
}

/* Project Card Styles */
.project-card {
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.project-card:hover {
  background: rgba(40, 40, 40, 0.8);
  border-color: rgba(255, 108, 0, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(255, 108, 0, 0.15);
}

.project-card-inner {
  position: relative;
  z-index: 2;
}

/* Button Styles */
.btn-primary {
  background: linear-gradient(135deg, #ff6c00, #ff8533);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #e55a00, #ff6c00);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 108, 0, 0.3);
}

.btn-secondary {
  background: rgba(166, 120, 255, 0.1);
  color: #a678ff;
  border: 1px solid #a678ff;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #a678ff;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(166, 120, 255, 0.3);
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, #ff6c00, #a678ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Animation Classes */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .chart-container {
    height: 200px;
    padding: 12px;
  }
  
  .chart-canvas-large {
    height: 140px !important;
  }
  
  .glass-card {
    padding: 16px !important;
  }
  
  .project-card:hover {
    transform: none;
  }
}

/* Technology Tags */
.glass-card span {
  transition: all 0.3s ease;
}

.glass-card span:hover {
  background: rgba(255, 108, 0, 0.2);
  border-color: #ff6c00;
  transform: translateY(-1px);
}

/* Loading Spinner */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Feature List Items */
.feature-item {
  background: rgba(20, 20, 20, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(30, 30, 30, 0.7);
  border-color: rgba(255, 108, 0, 0.3);
}

/* Architecture Icons */
.architecture-icon {
  color: #ff6c00;
  transition: all 0.3s ease;
}

.architecture-icon:hover {
  color: #a678ff;
  transform: scale(1.1);
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(30, 30, 30, 0.5);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 108, 0, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 108, 0, 0.7);
}
</style>