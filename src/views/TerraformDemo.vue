<!-- Terraform Demo Component - Live Backend Integration -->
<template>
  <div class="terraform-demo">
    <div class="container mx-auto px-6 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          Live Terraform Backend Demo
        </h1>
        <p class="text-gray-300 text-lg max-w-3xl mx-auto">
          This is a live demonstration of the Terraform backend API integration with real AWS infrastructure automation. 
          The backend is running on port 3003 and provides secure infrastructure automation capabilities including VPC, ECS, and RDS deployments.
        </p>
      </div>

      <!-- Connection Status -->
      <div class="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-white mb-4">Backend Connection Status</h2>
        <div class="flex items-center space-x-4">
          <div class="flex items-center">
            <div :class="connectionStatus.class" class="w-3 h-3 rounded-full mr-2"></div>
            <span class="text-white">{{ connectionStatus.text }}</span>
          </div>
          <button 
            @click="checkConnection" 
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            :disabled="loading"
          >
            {{ loading ? 'Checking...' : 'Test Connection' }}
          </button>
        </div>
        
        <!-- System Info -->
        <div v-if="systemInfo" class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-700 p-3 rounded">
            <div class="text-sm text-gray-400">Status</div>
            <div class="text-white font-medium">{{ systemInfo.status }}</div>
          </div>
          <div class="bg-gray-700 p-3 rounded">
            <div class="text-sm text-gray-400">Uptime</div>
            <div class="text-white font-medium">{{ formatUptime(systemInfo.uptime) }}</div>
          </div>
          <div class="bg-gray-700 p-3 rounded">
            <div class="text-sm text-gray-400">Version</div>
            <div class="text-white font-medium">{{ systemInfo.version }}</div>
          </div>
        </div>
      </div>

      <!-- Authentication Section -->
      <div class="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-white mb-4">Authentication</h2>
        <div v-if="!authToken" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              v-model="credentials.username" 
              type="text" 
              placeholder="Username (default: admin)"
              class="px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
            <input 
              v-model="credentials.password" 
              type="password" 
              placeholder="Password"
              class="px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
          </div>
          <button 
            @click="authenticate" 
            class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            :disabled="loading"
          >
            {{ loading ? 'Authenticating...' : 'Login' }}
          </button>
        </div>
        <div v-else class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span class="text-green-400">Authenticated Successfully</span>
          </div>
          <button 
            @click="logout" 
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <!-- Terraform Operations -->
      <div class="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-white mb-4">Infrastructure Templates</h2>
        
        <!-- Template Selector -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-300 mb-2">Select Infrastructure Template:</label>
          <select 
            v-model="selectedTemplate" 
            class="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="vpc-basic">AWS VPC - Basic Setup</option>
            <option value="vpc-ecs">AWS VPC + ECS Cluster</option>
            <option value="vpc-rds">AWS VPC + RDS Database</option>
            <option value="full-stack">Complete VPC + ECS + RDS Suite</option>
            <option value="local-test">Local Test Environment</option>
          </select>
        </div>

        <!-- Template Description -->
        <div class="bg-gray-700 rounded-lg p-4 mb-6">
          <h3 class="text-lg font-medium text-white mb-2">{{ getTemplateInfo(selectedTemplate).title }}</h3>
          <p class="text-gray-300 text-sm mb-3">{{ getTemplateInfo(selectedTemplate).description }}</p>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="resource in getTemplateInfo(selectedTemplate).resources" 
              :key="resource"
              class="px-2 py-1 bg-blue-600 text-white text-xs rounded"
            >
              {{ resource }}
            </span>
          </div>
        </div>

        <!-- Terraform Configuration Preview -->
        <div class="bg-gray-900 rounded-lg p-4 mb-6">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-lg font-medium text-white">Configuration Preview</h3>
            <button 
              @click="showFullConfig = !showFullConfig"
              class="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-500 transition-colors"
            >
              {{ showFullConfig ? 'Collapse' : 'Expand' }}
            </button>
          </div>
          <pre class="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto" :class="showFullConfig ? 'max-h-96' : 'max-h-32'">{{ getTerraformConfig(selectedTemplate) }}</pre>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button 
            @click="performOperation('plan')"
            :disabled="!authToken || loading"
            class="px-4 py-3 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            📋 Plan Infrastructure
          </button>
          <button 
            @click="performOperation('apply')"
            :disabled="!authToken || loading"
            class="px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            🚀 Deploy Infrastructure
          </button>
          <button 
            @click="loadJobs"
            :disabled="!authToken || loading"
            class="px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            📊 View Deployment History
          </button>
        </div>

        <!-- Operation Results -->
        <div v-if="operationResult" class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-6">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-lg font-medium text-white">Operation Result</h3>
            <span :class="operationResult.success ? 'text-green-400' : 'text-red-400'" class="font-medium">
              {{ operationResult.success ? '✅ Success' : '❌ Error' }}
            </span>
          </div>
          <pre class="text-sm text-gray-300 whitespace-pre-wrap">{{ operationResult.output }}</pre>
        </div>

        <!-- Jobs List -->
        <div v-if="jobs && jobs.length > 0" class="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 class="text-xl font-semibold text-white mb-4">Recent Jobs</h2>
          <div class="space-y-4">
            <div v-for="job in jobs" :key="job.id" class="bg-gray-700 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center space-x-2">
                  <span class="font-medium text-white">{{ job.type.toUpperCase() }}</span>
                  <span :class="getJobStatusClass(job.status)" class="px-2 py-1 rounded text-xs font-medium">
                    {{ job.status }}
                  </span>
                </div>
                <span class="text-sm text-gray-400">{{ formatDate(job.createdAt) }}</span>
              </div>
              <div class="text-sm text-gray-300">
                <div>Job ID: {{ job.id }}</div>
                <div v-if="job.duration">Duration: {{ Math.round(job.duration / 1000) }}s</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- API Documentation Links -->
      <div class="bg-gray-800 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">API Resources & Examples</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <a 
            href="http://localhost:3003/health" 
            target="_blank"
            class="block p-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-center"
          >
            Health Check
          </a>
          <a 
            href="http://localhost:3003/status" 
            target="_blank"
            class="block p-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-center"
          >
            System Status
          </a>
          <a 
            href="http://localhost:3003/api/docs" 
            target="_blank"
            class="block p-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-center"
          >
            API Documentation
          </a>
          <a 
            href="http://localhost:3003/examples/vue-integration.html" 
            target="_blank"
            class="block p-4 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors text-center"
          >
            Vue.js Example
          </a>
        </div>
        
        <!-- System Overview -->
        <div class="bg-gray-700 rounded-lg p-4">
          <h3 class="text-lg font-medium text-white mb-3">🏗️ Complete System Architecture</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 class="font-medium text-green-400 mb-2">✅ Frontend (Portfolio)</h4>
              <ul class="text-gray-300 space-y-1">
                <li>• Vue.js 3 with Composition API</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Vite development server</li>
                <li>• Real-time API integration</li>
                <li>• Running on port 3000</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-blue-400 mb-2">🔧 Backend (Terraform API)</h4>
              <ul class="text-gray-300 space-y-1">
                <li>• Node.js/Express server</li>
                <li>• JWT authentication system</li>
                <li>• Docker sandboxing ready</li>
                <li>• Real-time job tracking</li>
                <li>• Running on port 3003</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TerraformDemo',
  data() {
    return {
      loading: false,
      authToken: null,
      connectionStatus: {
        text: 'Not Connected',
        class: 'bg-red-500'
      },
      systemInfo: null,
      credentials: {
        username: 'admin',
        password: ''
      },
      operationResult: null,
      jobs: null,
      selectedTemplate: 'vpc-basic',
      showFullConfig: false,
      templates: {
        'vpc-basic': {
          title: 'AWS VPC - Basic Setup',
          description: 'Creates a basic VPC with public and private subnets, internet gateway, and route tables.',
          resources: ['VPC', 'Subnets', 'Internet Gateway', 'Route Tables', 'Security Groups']
        },
        'vpc-ecs': {
          title: 'AWS VPC + ECS Cluster',
          description: 'Complete containerized infrastructure with ECS cluster, load balancer, and auto-scaling.',
          resources: ['VPC', 'ECS Cluster', 'ALB', 'Auto Scaling', 'CloudWatch', 'IAM Roles']
        },
        'vpc-rds': {
          title: 'AWS VPC + RDS Database',
          description: 'Secure database infrastructure with RDS instance, subnet groups, and backup configuration.',
          resources: ['VPC', 'RDS Instance', 'DB Subnet Group', 'Parameter Group', 'Security Groups']
        },
        'full-stack': {
          title: 'Complete VPC + ECS + RDS Suite',
          description: 'Production-ready full-stack infrastructure with all components integrated.',
          resources: ['VPC', 'ECS', 'RDS', 'ALB', 'CloudWatch', 'S3', 'IAM', 'Route53']
        },
        'local-test': {
          title: 'Local Test Environment',
          description: 'Simple local file-based configuration for testing the Terraform workflow.',
          resources: ['Local Files', 'Test Outputs']
        }
      }
    }
  },
  
  mounted() {
    this.checkConnection()
  },
  
  methods: {
    async checkConnection() {
      this.loading = true
      try {
        const response = await fetch('http://localhost:3003/status')
        if (response.ok) {
          const data = await response.json()
          this.systemInfo = data
          this.connectionStatus = {
            text: 'Connected - Backend Online',
            class: 'bg-green-500'
          }
        } else {
          throw new Error('Backend not responding')
        }
      } catch (error) {
        this.connectionStatus = {
          text: 'Connection Failed - Backend Offline',
          class: 'bg-red-500'
        }
        this.systemInfo = null
      } finally {
        this.loading = false
      }
    },
    
    async authenticate() {
      this.loading = true
      try {
        const response = await fetch('http://localhost:3003/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.credentials)
        })
        
        if (response.ok) {
          const data = await response.json()
          this.authToken = data.token
          this.operationResult = {
            success: true,
            output: 'Authentication successful! You can now perform Terraform operations.'
          }
        } else {
          const error = await response.json()
          this.operationResult = {
            success: false,
            output: `Authentication failed: ${error.message || 'Invalid credentials'}`
          }
        }
      } catch (error) {
        this.operationResult = {
          success: false,
          output: `Authentication error: ${error.message}`
        }
      } finally {
        this.loading = false
      }
    },
    
    logout() {
      this.authToken = null
      this.operationResult = null
    },
    
    async performOperation(operation) {
      if (!this.authToken) {
        this.operationResult = {
          success: false,
          output: 'Please authenticate first before performing Terraform operations.'
        }
        return
      }
      
      this.loading = true
      
      // Get the appropriate Terraform configuration based on selected template
      const terraformConfig = this.getTerraformConfig(this.selectedTemplate)

      try {
        const response = await fetch(`http://localhost:3003/terraform/${operation}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            config: terraformConfig,
            variables: {}
          })
        })
        
        if (response.ok) {
          // For streaming responses (plan/apply), we'll get Server-Sent Events
          if (operation === 'plan' || operation === 'apply') {
            this.operationResult = {
              success: true,
              output: `${operation} operation started successfully. Check the browser developer tools Network tab to see the real-time streaming output.`
            }
          } else {
            const data = await response.json()
            this.operationResult = {
              success: true,
              output: data.output || `${operation} operation completed successfully.`
            }
          }
        } else {
          const data = await response.json()
          this.operationResult = {
            success: false,
            output: data.error || `${operation} operation failed.`
          }
        }
      } catch (error) {
        this.operationResult = {
          success: false,
          output: `Network error: ${error.message}`
        }
      } finally {
        this.loading = false
      }
    },
    
    async loadJobs() {
      if (!this.authToken) {
        this.operationResult = {
          success: false,
          output: 'Please authenticate first to view jobs.'
        }
        return
      }
      
      this.loading = true
      try {
        const response = await fetch('http://localhost:3003/terraform/jobs', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.authToken}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          this.jobs = data.jobs
          this.operationResult = {
            success: true,
            output: `Found ${data.total} jobs for your account.`
          }
        } else {
          const data = await response.json()
          this.operationResult = {
            success: false,
            output: `Failed to load jobs: ${data.error || 'Unknown error'}`
          }
        }
      } catch (error) {
        this.operationResult = {
          success: false,
          output: `Network error loading jobs: ${error.message}`
        }
      } finally {
        this.loading = false
      }
    },
    
    formatUptime(seconds) {
      if (!seconds) return 'Unknown'
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      return `${hours}h ${minutes}m`
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleString()
    },
    
    getJobStatusClass(status) {
      switch (status) {
        case 'completed':
          return 'bg-green-600 text-white'
        case 'running':
          return 'bg-blue-600 text-white'
        case 'error':
          return 'bg-red-600 text-white'
        case 'initializing':
          return 'bg-yellow-600 text-white'
        default:
          return 'bg-gray-600 text-white'
      }
    },

    getTemplateInfo(templateKey) {
      return this.templates[templateKey] || this.templates['local-test']
    },

    getTerraformConfig(templateKey) {
      const configs = {
        'vpc-basic': `# AWS VPC Basic Setup
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "demo"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "\${var.environment}-vpc"
    Environment = var.environment
  }
}

# Public Subnet
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true

  tags = {
    Name = "\${var.environment}-public-subnet"
  }
}

# Private Subnet
resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = data.aws_availability_zones.available.names[1]

  tags = {
    Name = "\${var.environment}-private-subnet"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "\${var.environment}-igw"
  }
}

# Route Table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "\${var.environment}-public-rt"
  }
}

# Route Table Association
resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

data "aws_availability_zones" "available" {
  state = "available"
}

output "vpc_id" {
  value = aws_vpc.main.id
}

output "public_subnet_id" {
  value = aws_subnet.public.id
}

output "private_subnet_id" {
  value = aws_subnet.private.id
}`,

        'vpc-ecs': `# AWS VPC + ECS Cluster
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "demo"
}

# VPC Configuration (simplified for demo)
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "\${var.environment}-ecs-vpc"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "\${var.environment}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Environment = var.environment
  }
}

# ECS Task Definition
resource "aws_ecs_task_definition" "app" {
  family                   = "\${var.environment}-app"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512

  container_definitions = jsonencode([
    {
      name  = "app"
      image = "nginx:latest"
      
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.app.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "ecs"
        }
      }
    }
  ])

  tags = {
    Environment = var.environment
  }
}

# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "app" {
  name              = "/ecs/\${var.environment}-app"
  retention_in_days = 7

  tags = {
    Environment = var.environment
  }
}

output "cluster_name" {
  value = aws_ecs_cluster.main.name
}

output "task_definition_arn" {
  value = aws_ecs_task_definition.app.arn
}`,

        'vpc-rds': `# AWS VPC + RDS Database
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "demo"
}

# VPC Configuration
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "\${var.environment}-rds-vpc"
  }
}

# Private Subnets for RDS
resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = data.aws_availability_zones.available.names[0]

  tags = {
    Name = "\${var.environment}-private-subnet-a"
  }
}

resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = data.aws_availability_zones.available.names[1]

  tags = {
    Name = "\${var.environment}-private-subnet-b"
  }
}

# DB Subnet Group
resource "aws_db_subnet_group" "main" {
  name       = "\${var.environment}-db-subnet-group"
  subnet_ids = [aws_subnet.private_a.id, aws_subnet.private_b.id]

  tags = {
    Name = "\${var.environment}-db-subnet-group"
  }
}

# Security Group for RDS
resource "aws_security_group" "rds" {
  name_prefix = "\${var.environment}-rds-"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.main.cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "\${var.environment}-rds-sg"
  }
}

# RDS Instance
resource "aws_db_instance" "main" {
  identifier             = "\${var.environment}-database"
  allocated_storage      = 20
  storage_type          = "gp2"
  engine                = "mysql"
  engine_version        = "8.0"
  instance_class        = "db.t3.micro"
  db_name               = "demoapp"
  username              = "admin"
  password              = "ChangeMePlease123!"
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = true
  deletion_protection = false

  tags = {
    Name        = "\${var.environment}-database"
    Environment = var.environment
  }
}

data "aws_availability_zones" "available" {
  state = "available"
}

output "rds_endpoint" {
  value = aws_db_instance.main.endpoint
}

output "database_name" {
  value = aws_db_instance.main.db_name
}`,

        'full-stack': `# Complete AWS VPC + ECS + RDS Suite
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "demo"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "\${var.environment}-fullstack-vpc"
    Environment = var.environment
  }
}

# Public Subnets
resource "aws_subnet" "public_a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true

  tags = {
    Name = "\${var.environment}-public-subnet-a"
    Type = "Public"
  }
}

resource "aws_subnet" "public_b" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = data.aws_availability_zones.available.names[1]
  map_public_ip_on_launch = true

  tags = {
    Name = "\${var.environment}-public-subnet-b"
    Type = "Public"
  }
}

# Private Subnets
resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = data.aws_availability_zones.available.names[0]

  tags = {
    Name = "\${var.environment}-private-subnet-a"
    Type = "Private"
  }
}

resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = data.aws_availability_zones.available.names[1]

  tags = {
    Name = "\${var.environment}-private-subnet-b"
    Type = "Private"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "\${var.environment}-igw"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "\${var.environment}-fullstack-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Environment = var.environment
  }
}

# Application Load Balancer
resource "aws_lb" "main" {
  name               = "\${var.environment}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets           = [aws_subnet.public_a.id, aws_subnet.public_b.id]

  enable_deletion_protection = false

  tags = {
    Environment = var.environment
  }
}

# Security Groups
resource "aws_security_group" "alb" {
  name_prefix = "\${var.environment}-alb-"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "\${var.environment}-alb-sg"
  }
}

# RDS Subnet Group
resource "aws_db_subnet_group" "main" {
  name       = "\${var.environment}-db-subnet-group"
  subnet_ids = [aws_subnet.private_a.id, aws_subnet.private_b.id]

  tags = {
    Name = "\${var.environment}-db-subnet-group"
  }
}

# RDS Instance
resource "aws_db_instance" "main" {
  identifier             = "\${var.environment}-fullstack-db"
  allocated_storage      = 20
  storage_type          = "gp2"
  engine                = "mysql"
  engine_version        = "8.0"
  instance_class        = "db.t3.micro"
  db_name               = "fullstackapp"
  username              = "admin"
  password              = "FullStackDemo123!"
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = 7
  skip_final_snapshot    = true
  deletion_protection    = false

  tags = {
    Name        = "\${var.environment}-fullstack-database"
    Environment = var.environment
  }
}

resource "aws_security_group" "rds" {
  name_prefix = "\${var.environment}-rds-"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.main.cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "\${var.environment}-rds-sg"
  }
}

data "aws_availability_zones" "available" {
  state = "available"
}

# Outputs
output "vpc_id" {
  value = aws_vpc.main.id
}

output "cluster_name" {
  value = aws_ecs_cluster.main.name
}

output "load_balancer_dns" {
  value = aws_lb.main.dns_name
}

output "rds_endpoint" {
  value = aws_db_instance.main.endpoint
}

output "environment" {
  value = var.environment
}`,

        'local-test': `# Simple Terraform configuration for testing
provider "local" {
  # No configuration needed for local provider
}

resource "local_file" "test" {
  content  = "Hello from Terraform Demo - \${timestamp()}"
  filename = "/tmp/terraform-demo-test.txt"
}

resource "local_file" "config" {
  content = jsonencode({
    environment = "demo"
    timestamp   = timestamp()
    status      = "operational"
    demo_mode   = true
  })
  filename = "/tmp/terraform-demo-config.json"
}

output "test_file_path" {
  value = local_file.test.filename
}

output "config_file_path" {
  value = local_file.config.filename
}

output "demo_status" {
  value = "Terraform demo completed successfully!"
}`
      }

      return configs[templateKey] || configs['local-test']
    }
  }
}
</script>

<style scoped>
.terraform-demo {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

pre {
  max-height: 400px;
  overflow-y: auto;
}
</style>
