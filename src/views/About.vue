<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-dark-bg">
      <div class="neuro-background"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10">
      <!-- Hero Section -->
      <section class="py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto text-center">
          <h1 class="text-4xl lg:text-6xl font-bold mb-6 gradient-text animate-fade-in-up">
            Senior SCM & ERP Engineer
          </h1>
          <p class="text-xl lg:text-2xl text-light-text max-w-4xl mx-auto leading-relaxed animate-fade-in-up" 
             style="animation-delay: 0.2s;">
            AI Backend Architect | Digital Transformation Specialist
          </p>
        </div>
      </section>

      <!-- Journey Narrative -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="glass-card p-8 lg:p-12 animate-fade-in-up" style="animation-delay: 0.4s;">
            <h2 class="text-3xl font-bold mb-8 gradient-text">Building Real Systems That Solve Business Pain</h2>
            <div class="space-y-8 text-light-text text-lg leading-relaxed">
              <p>
                I'm a product-focused SCM & ERP systems engineer with 15+ years architecting and delivering AI-driven backend and logistics platforms across Africa and the EU. I don't just build solutions—I've managed manufacturing plants, directed warehouse operations across Southern Africa, and led procurement teams handling 100,000+ SKUs. This hands-on operational experience is what sets my technical work apart. When I architect a Python-based forecasting engine or design a real-time Tableau dashboard, I'm solving problems I've lived through firsthand. I specialize in turning operational complexity into fast, scalable code—replacing spreadsheets with real-time dashboards, automating workflows with Python and Node.js, and integrating AI forecasting directly into procurement and warehouse systems. My approach blends hands-on technical delivery with commercial impact: every solution is measurable, secure, and built for global scale. Whether it's deploying GDPR-compliant cloud infrastructure managing live warehouse environments, building ETL pipelines that cut reporting lag by 40%, or implementing AI engines that reduce understock risk, I bridge the gap between business needs and technical solutions. I've delivered full-stack backend systems for ERP, WMS, and procurement using Python, FastAPI, SQL, and AWS, trained logistics teams across Germany, Netherlands, and South Africa on system adoption, and consistently achieved measurable outcomes like 22% improved fulfillment performance and 20% warehouse efficiency gains. My work spans SAP, SAGE, SYSPRO integration with modern Python and Node backends, always focused on automation, data-driven decision making, and scalable architecture that transforms how organizations operate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Strategic Profile -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-dark-surface">
        <div class="max-w-6xl mx-auto">
          <div class="glass-card p-8 lg:p-12 animate-fade-in-up" style="animation-delay: 0.6s;">
            <h2 class="text-3xl font-bold mb-8 text-primary-orange">Ready to Transform Your Operations?</h2>
            <p class="text-light-text text-lg leading-relaxed mb-8">
              Multi-disciplinary engineer bridging supply chain operations, ERP architecture, and backend development. 
              I specialize in digitizing procurement workflows, automating warehouse operations, and creating seamless 
              integrations between legacy ERP systems and modern cloud platforms. With 15+ years of hands-on delivery 
              across SAP, SYSPRO, SAGE, and AWS ecosystems, I architect solutions that don't just work—they transform 
              how organizations operate at scale. Whether you need AI-powered forecasting engines, real-time inventory 
              dashboards, or full ERP-to-cloud migrations, I deliver measurable results: 40% faster reporting, 22% improved 
              fulfillment, 20% warehouse efficiency gains. Let's discuss how I can help solve your operational complexity 
              with intelligent, scalable technology.
            </p>
            
            <div class="flex flex-wrap gap-4 justify-center">
              <a href="mailto:iamruwainkelly@gmail.com" 
                 class="bg-gradient-primary hover:bg-gradient-secondary text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Start a Conversation
              </a>
              <a href="/contact" 
                 class="border-2 border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                View Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Core Skills -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl font-bold mb-12 text-center gradient-text animate-fade-in-up" style="animation-delay: 0.8s;">
            Core Technical & Methodological Skills
          </h2>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up" style="animation-delay: 1s;">
            <!-- ERP & SCM -->
            <div class="glass-card p-6">
              <div class="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <CpuChipIcon class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-xl font-bold mb-4 text-primary-orange">ERP & SCM</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in erpSkills" :key="skill" 
                      class="px-3 py-1 text-sm bg-dark-surface text-light-text rounded-full border border-primary-orange/30 hover:border-primary-orange transition-colors duration-300">
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- Backend & Cloud -->
            <div class="glass-card p-6">
              <div class="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <CloudIcon class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-xl font-bold mb-4 text-primary-orange">Backend & Data</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in backendSkills" :key="skill" 
                      class="px-3 py-1 text-sm bg-dark-surface text-light-text rounded-full border border-primary-orange/30 hover:border-primary-orange transition-colors duration-300">
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- Cloud & Infrastructure -->
            <div class="glass-card p-6">
              <div class="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <DevicePhoneMobileIcon class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-xl font-bold mb-4 text-primary-orange">Cloud & Infrastructure</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in cloudSkills" :key="skill" 
                      class="px-3 py-1 text-sm bg-dark-surface text-light-text rounded-full border border-primary-orange/30 hover:border-primary-orange transition-colors duration-300">
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- Analytics & AI -->
            <div class="glass-card p-6">
              <div class="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <CogIcon class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-xl font-bold mb-4 text-primary-orange">Analytics & AI</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in analyticsSkills" :key="skill" 
                      class="px-3 py-1 text-sm bg-dark-surface text-light-text rounded-full border border-primary-orange/30 hover:border-primary-orange transition-colors duration-300">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Signature Projects Summary -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="glass-card p-8 lg:p-12 text-center animate-fade-in-up" style="animation-delay: 1.2s;">
            <h2 class="text-3xl font-bold mb-6 gradient-text">Proven Impact</h2>
            <div class="grid md:grid-cols-3 gap-8 mb-8">
              <div class="text-center">
                <div class="text-3xl font-bold gradient-text mb-2">40%</div>
                <div class="text-light-text">Faster Reporting via ETL</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold gradient-text mb-2">22%</div>
                <div class="text-light-text">Fulfillment Improvement</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold gradient-text mb-2">100K+</div>
                <div class="text-light-text">SKUs Managed Live</div>
              </div>
            </div>
            <p class="text-light-text text-lg mb-8">
              From automating procurement workflows to deploying AI forecasting engines, 
              I've delivered solutions that process real transactions, manage complex inventory flows, 
              and enable data-driven operational intelligence across global enterprises in manufacturing, 
              logistics, and supply chain sectors.
            </p>
            <router-link to="/projects" class="btn-secondary inline-flex items-center gap-2">
              <BoltIcon class="w-5 h-5" />
              View Technical Projects
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  CpuChipIcon, 
  CloudIcon, 
  DevicePhoneMobileIcon, 
  CogIcon,
  BoltIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/vue/24/outline'

// Skills data
const erpSkills = ref([
  'SAP S/4HANA', 'SAGE', 'SYSPRO', 'ERP Migration', 'Supply Chain', 'Procurement',
  'WMS/TMS', 'Inventory Mgmt', 'Warehouse Ops', 'P&L Management'
])

const backendSkills = ref([
  'Python', 'FastAPI', 'Flask', 'Node.js', 'SQL', 'Pandas', 
  'JavaScript', 'Java', 'ETL Pipelines', 'REST APIs'
])

const cloudSkills = ref([
  'AWS Lambda', 'EC2', 'S3', 'RDS', 'IAM', 'Docker', 
  'GitHub Actions', 'CI/CD', 'GCP', 'Azure'
])

const analyticsSkills = ref([
  'Tableau', 'scikit-learn', 'AI Forecasting', 'Data Automation', 
  'KPI Dashboards', 'Real-time Analytics', 'Business Intelligence', 'GDPR Compliance'
])
</script>

<style scoped>
.neuro-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 108, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(166, 120, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(255, 108, 0, 0.05) 0%, transparent 50%);
  animation: neuroGlow 8s ease-in-out infinite alternate;
}

@keyframes neuroGlow {
  0% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.4;
    transform: scale(1.02);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.prose strong {
  color: #ff6c00;
  font-weight: 600;
}

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

.btn-primary {
  background: linear-gradient(135deg, #ff6c00 0%, #a678ff 100%);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 108, 0, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #ff6c00;
  border: 1px solid #ff6c00;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-secondary:hover {
  background: #ff6c00;
  color: white;
  transform: translateY(-2px);
}

.gradient-text {
  background: linear-gradient(135deg, #ff6c00 0%, #a678ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #ff6c00 0%, #a678ff 100%);
}
</style>
