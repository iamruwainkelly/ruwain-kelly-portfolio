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
              <div class="aspect-video rounded-2xl bg-gradient-to-br from-primary-orange to-primary-purple p-1 shadow-2xl">
                <div class="w-full h-full bg-dark-surface rounded-xl flex items-center justify-center border-gradient">
                  <div class="text-center">
                    <div class="text-6xl font-bold gradient-text mb-4">{{ currentProject.title?.charAt(0) || 'A' }}</div>
                    <div class="text-light-text text-sm">{{ currentProject.title || 'AWS Dashboard' }} Screenshot</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Technologies Used -->
        <section class="technologies-used glass-card p-8 mb-12 animate-fade-in-up" style="animation-delay: 0.2s;">
          <h2 class="text-3xl font-bold mb-6 gradient-text">Technologies Used</h2>
          <div class="tags flex flex-wrap gap-3">
            <span v-for="tech in getTechnologies()" :key="tech" 
                  class="inline-block px-4 py-2 bg-dark-surface text-primary-orange rounded-lg border border-primary-orange/30 hover:border-primary-orange transition-all hover:transform hover:scale-105 font-medium">
              {{ tech }}
            </span>
          </div>
        </section>

        <!-- Architecture Overview -->
        <section class="architecture-overview glass-card p-8 mb-12 animate-fade-in-up" style="animation-delay: 0.4s;">
          <h2 class="text-3xl font-bold mb-6 gradient-text">Architecture Overview</h2>
          <p class="text-light-text text-lg leading-relaxed mb-6">
            The AWS Serverless Dashboard is built using a microservices architecture. Each component is decoupled:
          </p>
          <ul class="space-y-4 text-light-text">
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-primary-orange rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <strong class="text-white">Frontend</strong>: Vue 3 with Vite, Chart.js for visualisation, hosted on Vercel
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-primary-orange rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <strong class="text-white">Backend</strong>: Node.js API endpoints with real-time AWS metrics
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-primary-orange rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <strong class="text-white">Auth</strong>: Auth0 for user authentication and route protection
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-primary-orange rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <strong class="text-white">Data Layer</strong>: AWS Lambda functions fetching live usage data from API Gateway and DynamoDB
              </div>
            </li>
          </ul>
        </section>

        <!-- Key Features -->
        <section class="key-features glass-card p-8 mb-12 animate-fade-in-up" style="animation-delay: 0.6s;">
          <h2 class="text-3xl font-bold mb-6 gradient-text">Key Features</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="feature in getKeyFeatures()" :key="feature.title" class="flex items-start gap-4 p-4 bg-dark-surface rounded-lg border border-primary-orange/20 hover:border-primary-orange/40 transition-colors">
              <div class="w-8 h-8 bg-primary-orange/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <CheckIcon class="w-5 h-5 text-primary-orange" />
              </div>
              <div>
                <h3 class="font-semibold text-white mb-2">{{ feature.title }}</h3>
                <p class="text-light-text text-sm">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Other Projects -->
        <section class="other-projects glass-card p-8 animate-fade-in-up" style="animation-delay: 0.8s;">
          <h2 class="text-3xl font-bold mb-6 gradient-text">Other Projects</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <router-link v-for="project in getOtherProjects()" :key="project.id" 
                        :to="`/projects/${project.id}`"
                        class="block p-6 bg-dark-surface rounded-lg border border-primary-orange/20 hover:border-primary-orange/40 transition-all hover:transform hover:scale-105 group">
              <div class="text-2xl font-bold gradient-text mb-3 group-hover:text-primary-purple transition-colors">
                {{ project.title }}
              </div>
              <p class="text-light-text text-sm mb-4">{{ project.description.substring(0, 100) }}...</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in project.techStack.slice(0, 3)" :key="tech" 
                      class="text-xs bg-primary-orange/20 text-primary-orange px-2 py-1 rounded">
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

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  ArrowLeftIcon, 
  CodeBracketIcon, 
  ArrowTopRightOnSquareIcon,
  CheckIcon 
} from '@heroicons/vue/24/outline'
import projectsData from '../data/projects.json'

const route = useRoute()

// Get current project
const currentProject = computed(() => {
  const projectId = route.params.id
  return projectsData.find(p => p.id === projectId) || {}
})

// Get technologies based on project or default list
const getTechnologies = () => {
  if (currentProject.value.techStack) {
    return currentProject.value.techStack
  }
  return ['Vue.js', 'Chart.js', 'Node.js', 'Auth0', 'AWS Lambda', 'API Gateway', 'DynamoDB']
}

// Get key features
const getKeyFeatures = () => {
  return [
    {
      title: 'Modern Architecture',
      description: 'Built with current best practices and scalable design patterns'
    },
    {
      title: 'Security First',
      description: 'Auth0 integration with JWT-based authentication'
    },
    {
      title: 'Performance Optimised',
      description: 'Real-time updates and lightweight components'
    },
    {
      title: 'Fully Responsive',
      description: 'Works seamlessly across devices'
    },
    {
      title: 'Real-time Data',
      description: 'Displays live metrics such as invocation counts, error rates, and latency'
    },
    {
      title: 'Visual Insights',
      description: 'Uses bar, line, and pie charts to highlight trends and anomalies'
    }
  ]
}

// Get other projects (excluding current one)
const getOtherProjects = () => {
  return projectsData.filter(p => p.id !== route.params.id).slice(0, 3)
}
</script>

<style scoped>
/* Project Details Styling */
.project-details {
  position: relative;
}

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
}

/* Back Link */
.back-link {
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-link:hover {
  transform: translateX(-4px);
}

/* Screenshot Styling */
.screenshot {
  position: relative;
}

.screenshot .border-gradient {
  border: 2px solid transparent;
  background: linear-gradient(135deg, rgba(255, 108, 0, 0.2), rgba(166, 120, 255, 0.2));
  background-clip: border-box;
}

/* Technology Tags */
.tags span {
  transition: all 0.3s ease;
  cursor: pointer;
}

.tags span:hover {
  background: rgba(255, 108, 0, 0.2);
  border-color: #ff6c00;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 108, 0, 0.3);
}

/* Button Styles */
.btn-primary {
  background: linear-gradient(135deg, #ff6c00, #a678ff);
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 108, 0, 0.4);
}

.btn-secondary {
  background: rgba(166, 120, 255, 0.1);
  border: 2px solid rgba(166, 120, 255, 0.3);
  color: #a678ff;
  padding: 10px 22px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
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
  .project-details {
    padding: 1rem;
  }
  
  .glass-card {
    padding: 16px !important;
  }
  
  .screenshot {
    margin-top: 2rem;
  }
}

/* Section Margins */
section {
  margin-top: 2rem;
}

section:first-of-type {
  margin-top: 0;
}

/* List Styling */
ul li {
  margin-bottom: 0.5rem;
}
</style>
