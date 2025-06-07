<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <Hero />
    
    <!-- About Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-bg to-dark-surface">
      <div class="max-w-6xl mx-auto">
        <div class="glass-card p-8 lg:p-12">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl lg:text-4xl font-bold mb-6 gradient-text">
                AI-Driven Supply Chain Architect & Backend Engineer
              </h2>
              <p class="text-light-text text-lg leading-relaxed mb-6">
                15+ years transforming global supply chains through intelligent ERP systems, AI-driven forecasting, 
                and scalable backend architecture. I architect enterprise platforms that optimize procurement workflows, 
                integrate SAP/SAGE/SYSPRO systems, and deliver measurable operational impact across EU & Africa.
              </p>
              <div class="grid grid-cols-2 gap-6 mb-8">
                <div class="text-center">
                  <div class="text-2xl font-bold gradient-text">€50M+</div>
                  <div class="text-light-text">Cost Savings</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold gradient-text">EU/Africa</div>
                  <div class="text-light-text">Global Impact</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold gradient-text">100,000+</div>
                  <div class="text-light-text">SKUs Managed</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold gradient-text">AI-Powered</div>
                  <div class="text-light-text">Forecasting</div>
                </div>
              </div>
              <router-link to="/about" class="btn-primary inline-flex items-center gap-2">
                <DocumentTextIcon class="w-5 h-5" />
                View About Me
              </router-link>
            </div>
            <div class="relative">
              <div class="w-full h-96 rounded-2xl bg-gradient-to-br from-primary-orange to-primary-purple p-1">
                <div class="w-full h-full bg-dark-surface rounded-2xl flex items-center justify-center">
                  <div class="text-center">
                    <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-orange to-primary-purple flex items-center justify-center text-4xl font-bold">
                      RK
                    </div>
                    <h3 class="text-xl font-semibold mb-2">RUWΔIN KΞLLY</h3>
                    <p class="text-light-text">AI-Driven Supply Chain Architect & Backend Engineer<br/>
                    Transforming global supply chains with intelligent ERP and modern backend systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 gradient-text">Technical Expertise</h2>
          <p class="text-light-text text-lg max-w-2xl mx-auto">
            Enterprise-grade technologies powering supply chain transformation and modern software architecture
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(skillCategory, index) in skills" :key="index" 
               class="glass-card p-6 hover-lift"
               :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="text-center mb-6">
              <component :is="skillCategory.icon" class="w-12 h-12 mx-auto mb-3 text-primary-orange" />
              <h3 class="text-xl font-semibold mb-2">{{ skillCategory.title }}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in skillCategory.skills" :key="skill.name" 
                    class="px-3 py-1 text-sm bg-dark-surface text-light-text rounded-full border border-dark-border hover:border-primary-orange transition-colors duration-300">
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Showcase Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-surface to-dark-bg">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 gradient-text">Technology Stack</h2>
          <p class="text-light-text text-lg max-w-2xl mx-auto">
            Leveraging cutting-edge technologies to build scalable, intelligent supply chain solutions
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div v-for="(tech, index) in techStack" :key="index" 
               class="glass-card p-4 text-center hover-lift group"
               :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <component :is="tech.icon" class="w-8 h-8 text-primary-orange group-hover:text-primary-purple transition-colors duration-300" />
            </div>
            <h3 class="text-sm font-semibold text-white mb-1">{{ tech.name }}</h3>
            <p class="text-xs text-light-text">{{ tech.category }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-bg to-dark-surface">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 gradient-text">Featured Projects</h2>
          <p class="text-light-text text-lg max-w-2xl mx-auto">
            A showcase of innovative applications built with cutting-edge technologies
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <ProjectCard 
            v-for="project in featuredProjects" 
            :key="project.id" 
            :project="project"
            class="fade-in-up"
          />
        </div>
        
        <div class="text-center">
          <router-link to="/projects" class="btn-primary">
            View All Projects
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="glass-card p-12">
          <h2 class="text-3xl lg:text-4xl font-bold mb-6 gradient-text">
            Ready to Transform Your Supply Chain with AI?
          </h2>
          <p class="text-light-text text-lg mb-8 max-w-2xl mx-auto">
            From SAP integrations to AI-powered forecasting platforms, let's architect intelligent solutions that 
            scale globally and deliver measurable operational impact for your enterprise supply chain.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/contact" class="btn-primary">
              Discuss Your Project
            </router-link>
            <a href="mailto:admin@ruwainkelly.co.za" class="btn-secondary">
              Strategic Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { DocumentTextIcon, CodeBracketIcon, CloudIcon, DevicePhoneMobileIcon, CpuChipIcon } from '@heroicons/vue/24/outline'
import Hero from '@/components/Hero.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import projectsData from '@/data/projects.json'

const skills = ref([
  {
    title: 'ERP & SCM Systems',
    icon: CpuChipIcon,
    skills: [
      { name: 'SAP' },
      { name: 'SAGE' },
      { name: 'SYSPRO' },
      { name: 'ERPNext' },
      { name: 'Odoo' },
      { name: 'Procurement' },
      { name: 'WMS' },
      { name: 'Logistics' }
    ]
  },
  {
    title: 'Backend & Cloud',
    icon: CloudIcon,
    skills: [
      { name: 'Python' },
      { name: 'FastAPI' },
      { name: 'Java' },
      { name: 'Node.js' },
      { name: 'AWS' },
      { name: 'Terraform' },
      { name: 'PostgreSQL' },
      { name: 'Docker' }
    ]
  },
  {
    title: 'AI & Data Analytics',
    icon: CodeBracketIcon,
    skills: [
      { name: 'Machine Learning' },
      { name: 'Forecasting AI' },
      { name: 'Pandas' },
      { name: 'NumPy' },
      { name: 'Tableau' },
      { name: 'ETL' },
      { name: 'Real-time Analytics' },
      { name: 'Predictive Models' }
    ]
  },
  {
    title: 'DevOps & Frontend',
    icon: DevicePhoneMobileIcon,
    skills: [
      { name: 'Vue.js' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'CI/CD' },
      { name: 'Kubernetes' },
      { name: 'Lean Six Sigma' },
      { name: 'Agile/Scrum' },
      { name: 'GDPR' }
    ]
  }
])

const featuredProjects = ref([])

const techStack = ref([
  { name: 'Python', category: 'Backend', icon: CodeBracketIcon },
  { name: 'FastAPI', category: 'API', icon: CloudIcon },
  { name: 'SAP', category: 'ERP', icon: CpuChipIcon },
  { name: 'AWS', category: 'Cloud', icon: CloudIcon },
  { name: 'Vue.js', category: 'Frontend', icon: CodeBracketIcon },
  { name: 'Terraform', category: 'IaC', icon: CpuChipIcon },
  { name: 'PostgreSQL', category: 'Database', icon: CloudIcon },
  { name: 'Docker', category: 'DevOps', icon: CpuChipIcon },
  { name: 'Kubernetes', category: 'Orchestration', icon: CloudIcon },
  { name: 'Tableau', category: 'Analytics', icon: CodeBracketIcon },
  { name: 'SAGE', category: 'ERP', icon: CpuChipIcon },
  { name: 'Machine Learning', category: 'AI', icon: CodeBracketIcon }
])

onMounted(() => {
  // Get first 3 projects as featured
  featuredProjects.value = projectsData.slice(0, 3)
})
</script>

<style scoped>
.fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.fade-in-up:nth-child(1) { animation-delay: 0.1s; }
.fade-in-up:nth-child(2) { animation-delay: 0.2s; }
.fade-in-up:nth-child(3) { animation-delay: 0.3s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>