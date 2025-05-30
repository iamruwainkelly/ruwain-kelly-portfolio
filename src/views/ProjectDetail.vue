<template>
  <div class="project-details min-h-screen bg-dark-bg text-text-primary">
    <!-- Background -->
    <div class="absolute inset-0 bg-dark-bg">
      <div class="project-detail-background"></div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="relative z-10 flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-orange mb-4"></div>
        <p class="text-light-text text-lg">Loading project details...</p>
      </div>
    </div>

    <!-- 404 Error State -->
    <div v-else-if="!currentProject" class="relative z-10 flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md mx-auto px-4">
        <div class="text-8xl font-bold gradient-text mb-4">404</div>
        <h1 class="text-3xl font-bold mb-4">Project Not Found</h1>
        <p class="text-light-text mb-8">The project you're looking for doesn't exist or has been moved.</p>
        <router-link to="/projects" class="btn-primary inline-flex items-center gap-2">
          <ArrowLeftIcon class="w-5 h-5" />
          Back to Projects
        </router-link>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        
        <!-- Back Button -->
        <router-link to="/projects" class="back-link inline-flex items-center gap-2 text-primary-orange hover:text-primary-purple transition-colors mb-8 group font-semibold">
          <ArrowLeftIcon class="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </router-link>

        <!-- Project Header -->
        <section class="project-header glass-card p-8 mb-12 animate-fade-in-up">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-4xl lg:text-5xl font-bold mb-4 gradient-text">{{ currentProject.title }}</h1>
              <p class="text-xl text-light-text mb-6">{{ currentProject.subtitle }}</p>
              <p class="text-light-text text-lg leading-relaxed mb-8">{{ currentProject.longDescription || currentProject.description }}</p>
              
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
                <router-link v-if="currentProject.caseStudy" :to="currentProject.caseStudy"
                   class="btn-outline inline-flex items-center gap-2">
                  <DocumentTextIcon class="w-5 h-5" />
                  Case Study
                </router-link>
              </div>
            </div>
            
            <!-- Project Visual -->
            <div class="screenshot">
              <div class="aspect-video rounded-2xl bg-gradient-to-br from-primary-orange to-primary-purple p-1 shadow-2xl">
                <div class="w-full h-full bg-dark-surface rounded-xl flex items-center justify-center border-gradient">
                  <div class="text-center">
                    <div class="text-6xl font-bold gradient-text mb-4">{{ currentProject.title?.charAt(0) || 'P' }}</div>
                    <p class="text-light-text">Project Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Technologies Used -->
        <section class="technologies glass-card p-8 mb-12 animate-fade-in-up" style="animation-delay: 0.2s;">
          <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
            <CpuChipIcon class="w-8 h-8 text-primary-orange" />
            Technologies Used
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="tech in (currentProject.technologies || currentProject.techStack || [])" 
                 :key="tech" 
                 class="tech-tag bg-dark-surface border border-accent-blue/20 rounded-lg p-4 text-center hover:border-primary-orange/50 transition-colors">
              <div class="text-sm font-semibold">{{ tech }}</div>
            </div>
          </div>
        </section>

        <!-- Project Stats (if available) -->
        <section v-if="currentProject.mockData" class="project-stats glass-card p-8 mb-12 animate-fade-in-up" style="animation-delay: 0.4s;">
          <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
            <ChartBarIcon class="w-8 h-8 text-primary-orange" />
            Project Impact
          </h2>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(value, key) in currentProject.mockData" :key="key" class="stat-card bg-dark-surface rounded-lg p-6 text-center border border-accent-blue/20">
              <div class="text-2xl font-bold gradient-text mb-2">{{ value }}</div>
              <div class="text-light-text text-sm capitalize">{{ formatStatKey(key) }}</div>
            </div>
          </div>
        </section>

        <!-- Architecture Overview (if available) -->
        <section v-if="currentProject.architecture" class="architecture glass-card p-8 mb-12 animate-fade-in-up" style="animation-delay: 0.6s;">
          <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
            <BuildingOfficeIcon class="w-8 h-8 text-primary-orange" />
            Architecture Overview
          </h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold mb-4">Components</h3>
              <div class="space-y-2">
                <div v-for="component in currentProject.architecture.components" :key="component" 
                     class="flex items-center gap-3 p-3 bg-dark-surface rounded-lg border border-accent-blue/20">
                  <div class="w-2 h-2 bg-primary-orange rounded-full"></div>
                  <span>{{ component }}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-4">Deployment Info</h3>
              <div class="space-y-4">
                <div v-if="currentProject.architecture.regions" class="flex justify-between items-center p-3 bg-dark-surface rounded-lg border border-accent-blue/20">
                  <span>Regions</span>
                  <span class="font-semibold text-primary-orange">{{ currentProject.architecture.regions }}</span>
                </div>
                <div v-if="currentProject.architecture.environments" class="p-3 bg-dark-surface rounded-lg border border-accent-blue/20">
                  <div class="text-sm text-light-text mb-2">Environments</div>
                  <div class="flex gap-2">
                    <span v-for="env in currentProject.architecture.environments" :key="env" 
                          class="px-3 py-1 bg-primary-orange/20 text-primary-orange rounded-full text-sm">
                      {{ env }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Key Features -->
        <section class="key-features glass-card p-8 mb-12 animate-fade-in-up" style="animation-delay: 0.8s;">
          <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
            <StarIcon class="w-8 h-8 text-primary-orange" />
            Key Features
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="feature in getKeyFeatures()" :key="feature.title" 
                 class="feature-card bg-dark-surface border border-accent-blue/20 rounded-lg p-6 hover:border-primary-orange/50 transition-colors">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-primary-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckIcon class="w-5 h-5 text-primary-orange" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
                  <p class="text-light-text">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Other Projects -->
        <section class="other-projects glass-card p-8 animate-fade-in-up" style="animation-delay: 1s;">
          <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
            <FolderIcon class="w-8 h-8 text-primary-orange" />
            Other Projects
          </h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <router-link v-for="project in otherProjects" :key="project.id" 
                        :to="`/projects/${project.id}`"
                        class="project-card bg-dark-surface border border-accent-blue/20 rounded-lg p-6 hover:border-primary-orange/50 transition-colors group">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-primary-orange/20 rounded-lg flex items-center justify-center">
                  <span class="text-primary-orange font-bold">{{ project.title.charAt(0) }}</span>
                </div>
                <h3 class="text-lg font-semibold group-hover:text-primary-orange transition-colors">{{ project.title }}</h3>
              </div>
              <p class="text-light-text text-sm">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mt-4">
                <span v-for="tech in (project.techStack || []).slice(0, 3)" :key="tech" 
                      class="px-2 py-1 bg-accent-blue/20 text-accent-blue rounded text-xs">
                  {{ tech }}
                </span>
              </div>
            </router-link>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import projectsData from '@/data/projects.json'
import { 
  ArrowLeftIcon, 
  CodeBracketIcon, 
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
  CpuChipIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  StarIcon,
  CheckIcon,
  FolderIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'ProjectDetail',
  components: {
    ArrowLeftIcon,
    CodeBracketIcon,
    ArrowTopRightOnSquareIcon,
    DocumentTextIcon,
    CpuChipIcon,
    ChartBarIcon,
    BuildingOfficeIcon,
    StarIcon,
    CheckIcon,
    FolderIcon
  },
  props: {
    id: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const route = useRoute()
    const loading = ref(true)
    const currentProject = ref(null)

    // Get project ID from props or route params
    const projectId = computed(() => props.id || route.params.id)

    // Load project data
    const loadProject = () => {
      loading.value = true
      
      // Simulate loading delay for better UX
      setTimeout(() => {
        const project = projectsData.find(p => p.id === projectId.value)
        currentProject.value = project
        loading.value = false
      }, 500)
    }

    // Other projects (excluding current one)
    const otherProjects = computed(() => {
      return projectsData.filter(p => p.id !== projectId.value).slice(0, 3)
    })

    // Format stat keys for display
    const formatStatKey = (key) => {
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    }

    // Generate key features based on project data
    const getKeyFeatures = () => {
      const project = currentProject.value
      if (!project) return []

      const features = []

      // Generate features based on available data
      if (project.id === 'serverless-dashboard') {
        features.push(
          { title: 'Real-time Monitoring', description: 'Live AWS cost tracking with instant alerts and notifications' },
          { title: 'Predictive Analytics', description: 'ML-powered cost forecasting and optimization recommendations' },
          { title: 'Interactive Dashboards', description: 'Chart.js visualizations with drill-down capabilities' },
          { title: 'Secure Authentication', description: 'Auth0 integration with role-based access control' }
        )
      } else if (project.id === 'terraform-aws-suite') {
        features.push(
          { title: 'Modular Design', description: 'Reusable Terraform modules for scalable infrastructure' },
          { title: 'Production Ready', description: 'Battle-tested configurations with security best practices' },
          { title: 'Cost Optimization', description: 'Built-in cost estimation and resource optimization' },
          { title: 'CI/CD Integration', description: 'Automated deployment pipelines with GitHub Actions' }
        )
      } else if (project.id === 'aws-cost-calculator') {
        features.push(
          { title: 'Multi-Region Support', description: 'Accurate pricing across all AWS regions' },
          { title: 'Service Coverage', description: 'Comprehensive support for EC2, RDS, S3, and more' },
          { title: 'Budget Alerts', description: 'Customizable notifications and spending limits' },
          { title: 'Optimization Tips', description: 'AI-powered recommendations for cost reduction' }
        )
      } else {
        // Generic features for any project
        features.push(
          { title: 'Modern Architecture', description: 'Built with latest technologies and best practices' },
          { title: 'Scalable Design', description: 'Designed to handle growth and increased demand' },
          { title: 'User Focused', description: 'Intuitive interface with excellent user experience' },
          { title: 'Well Documented', description: 'Comprehensive documentation and code comments' }
        )
      }

      return features
    }

    // Load project on mount and when route changes
    onMounted(loadProject)
    watch(() => route.params.id, loadProject)

    return {
      loading,
      currentProject,
      otherProjects,
      formatStatKey,
      getKeyFeatures
    }
  }
}
</script>

<style scoped>
.project-detail-background {
  background: radial-gradient(600px circle at 50% 200px, rgba(255, 102, 0, 0.15), transparent),
              radial-gradient(800px circle at 80% 800px, rgba(147, 51, 234, 0.15), transparent),
              radial-gradient(400px circle at 20% 600px, rgba(6, 182, 212, 0.10), transparent);
}

.glass-card {
  background: rgba(30, 30, 30, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
}

.gradient-text {
  background: linear-gradient(135deg, #ff6600, #9333ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn-primary {
  background: linear-gradient(135deg, #ff6600, #e55a00);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #e55a00, #cc5200);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 102, 0, 0.3);
}

.btn-secondary {
  background: linear-gradient(135deg, #9333ea, #7c3aed);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(147, 51, 234, 0.3);
}

.btn-outline {
  background: transparent;
  color: #06b6d4;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  border: 2px solid #06b6d4;
}

.btn-outline:hover {
  background: #06b6d4;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(6, 182, 212, 0.3);
}

.back-link:hover {
  text-decoration: none;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tech-tag:hover {
  transform: translateY(-2px);
}

.stat-card {
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.feature-card, .project-card {
  transition: all 0.3s ease;
}

.feature-card:hover, .project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
</style>