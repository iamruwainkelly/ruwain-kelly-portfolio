<!-- Terraform Demo Component - Live Backend Integration -->
<template>
  <div class="terraform-demo">
    <div class="container mx-auto px-6 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          🚀 Live Terraform Backend Demo
        </h1>
        <p class="text-gray-300 text-lg max-w-3xl mx-auto">
          This is a live demonstration of the Terraform backend API integration. 
          The backend is running on port 3001 and provides secure infrastructure automation capabilities.
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
        <h2 class="text-xl font-semibold text-white mb-4">Terraform Operations</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button 
            @click="performOperation('plan')"
            :disabled="!authToken || loading"
            class="px-4 py-3 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            📋 Plan
          </button>
          <button 
            @click="performOperation('apply')"
            :disabled="!authToken || loading"
            class="px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            🚀 Apply
          </button>
          <button 
            @click="loadJobs"
            :disabled="!authToken || loading"
            class="px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            📊 View Jobs
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
            href="http://localhost:3001/health" 
            target="_blank"
            class="block p-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-center"
          >
            📊 Health Check
          </a>
          <a 
            href="http://localhost:3001/status" 
            target="_blank"
            class="block p-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-center"
          >
            📈 System Status
          </a>
          <a 
            href="http://localhost:3001/api/docs" 
            target="_blank"
            class="block p-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-center"
          >
            📚 API Documentation
          </a>
          <a 
            href="http://localhost:3001/examples/vue-integration.html" 
            target="_blank"
            class="block p-4 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors text-center"
          >
            🚀 Vue.js Example
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
                <li>• Running on port 3001</li>
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
      jobs: null
    }
  },
  
  mounted() {
    this.checkConnection()
  },
  
  methods: {
    async checkConnection() {
      this.loading = true
      try {
        const response = await fetch('http://localhost:3001/status')
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
        const response = await fetch('http://localhost:3001/auth/login', {
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
      
      // Sample Terraform configuration
      const terraformConfig = `# Simple Terraform configuration for testing
provider "local" {
  # No configuration needed for local provider
}

resource "local_file" "test" {
  content  = "Hello from Terraform Demo!"
  filename = "/tmp/terraform-demo-test.txt"
}

output "file_path" {
  value = local_file.test.filename
}`

      try {
        const response = await fetch(`http://localhost:3001/terraform/${operation}`, {
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
        const response = await fetch('http://localhost:3001/terraform/jobs', {
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
