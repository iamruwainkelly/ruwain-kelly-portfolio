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
            The Journey from People to Platforms
          </h1>
          <p class="text-xl lg:text-2xl text-light-text max-w-4xl mx-auto leading-relaxed animate-fade-in-up" 
             style="animation-delay: 0.2s;">
            How 15 years of managing global teams taught me to architect technology 
            that transforms enterprises—one intelligent system at a time.
          </p>
        </div>
      </section>

      <!-- Journey Narrative -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="glass-card p-8 lg:p-12 animate-fade-in-up" style="animation-delay: 0.4s;">
            <h2 class="text-3xl font-bold mb-8 gradient-text">From Operations Leadership to Technical Architecture</h2>
            <div class="space-y-8 text-light-text text-lg leading-relaxed">
              <p>
                My story doesn't begin with code—it begins with people. For over a decade, I led operations teams 
                across Europe and Africa, managing complex supply chains for manufacturing giants. Every day, 
                I watched brilliant people struggle with systems that couldn't keep pace with business reality.
              </p>
              
              <p>
                The turning point came during a particularly challenging SAP migration in our European operations. 
                While watching our procurement team manually reconcile thousands of purchase orders because the 
                system couldn't handle our multi-currency, multi-vendor workflows, I realized something profound: 
                <strong class="text-primary-orange">the gap between business operations and technology wasn't 
                just about features—it was about understanding.</strong>
              </p>
              
              <p>
                That's when I made a deliberate pivot. I didn't abandon my operations expertise; I weaponized it. 
                I dove deep into backend development, cloud architecture, and enterprise integration patterns. 
                But unlike traditional developers, I came to the code with battle scars from real procurement 
                disasters, inventory nightmares, and vendor management chaos.
              </p>
              
              <p>
                This unique perspective—understanding both the boardroom and the server room—became my superpower. 
                I could translate C-suite strategic requirements into scalable technical architectures because 
                I'd lived through the operational consequences of poor system design.
              </p>
              
              <p>
                Today, when I architect a serverless cost monitoring dashboard or design a Terraform-based 
                infrastructure suite, I'm not just solving technical challenges. I'm eliminating the frustrations 
                I witnessed in procurement departments, the inefficiencies I tracked in warehouse operations, 
                and the scalability nightmares I inherited from legacy ERP implementations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Strategic Profile -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-dark-surface">
        <div class="max-w-6xl mx-auto">
          <div class="glass-card p-8 lg:p-12 animate-fade-in-up" style="animation-delay: 0.6s;">
            <h2 class="text-3xl font-bold mb-8 text-primary-orange">Strategic Profile</h2>
            <p class="text-light-text text-lg leading-relaxed">
              Multi-disciplinary leader bridging supply chain operations, ERP architecture, and cloud-native development. 
              I specialize in digitizing procurement workflows, automating warehouse operations, and creating seamless 
              integrations between legacy ERP systems and modern cloud platforms. With 15+ years of hands-on delivery 
              across SAP, SYSPRO, SAGE, and AWS ecosystems, I architect solutions that don't just work—they transform 
              how organizations operate at scale.
            </p>
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
              <h3 class="text-xl font-bold mb-4 text-primary-orange">Backend & Cloud</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in backendSkills" :key="skill" 
                      class="px-3 py-1 text-sm bg-dark-surface text-light-text rounded-full border border-primary-orange/30 hover:border-primary-orange transition-colors duration-300">
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- Frontend & UX -->
            <div class="glass-card p-6">
              <div class="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <DevicePhoneMobileIcon class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-xl font-bold mb-4 text-primary-orange">Frontend & UX</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in frontendSkills" :key="skill" 
                      class="px-3 py-1 text-sm bg-dark-surface text-light-text rounded-full border border-primary-orange/30 hover:border-primary-orange transition-colors duration-300">
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- DevOps & Ops -->
            <div class="glass-card p-6">
              <div class="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <CogIcon class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-xl font-bold mb-4 text-primary-orange">DevOps & Ops</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in devopsSkills" :key="skill" 
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
            <h2 class="text-3xl font-bold mb-6 gradient-text">Signature Impact</h2>
            <div class="grid md:grid-cols-3 gap-8 mb-8">
              <div class="text-center">
                <div class="text-3xl font-bold gradient-text mb-2">50+</div>
                <div class="text-light-text">Enterprise Solutions</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold gradient-text mb-2">EU/Africa</div>
                <div class="text-light-text">Global Transformation</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold gradient-text mb-2">100K+</div>
                <div class="text-light-text">SKUs Managed</div>
              </div>
            </div>
            <p class="text-light-text text-lg mb-8">
              From modernizing legacy procurement systems to architecting cloud-native supply chain platforms, 
              I've delivered solutions that process millions of transactions, manage complex inventory flows, 
              and enable real-time operational intelligence across global enterprises.
            </p>
            <router-link to="/projects" class="btn-secondary inline-flex items-center gap-2">
              <BoltIcon class="w-5 h-5" />
              Explore My Work
            </router-link>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <div class="glass-card p-12 animate-fade-in-up" style="animation-delay: 1.4s;">
            <h2 class="text-4xl font-bold mb-6 gradient-text">
              Let's Transform Together
            </h2>
            <p class="text-light-text text-lg mb-8 max-w-2xl mx-auto">
              Ready to bridge the gap between operational excellence and technological innovation? 
              Let's architect solutions that don't just work—they transform how your business operates.
            </p>
            <router-link to="/contact" class="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
              <ChatBubbleLeftRightIcon class="w-6 h-6" />
              Start the Conversation
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
  'SAP', 'SAGE', 'SYSPRO', 'Oracle ERP', 'Supply Chain', 'Procurement', 
  'Inventory Mgmt', 'Logistics', 'Warehouse Ops', 'ERP Integration'
])

const backendSkills = ref([
  'Python', 'FastAPI', 'Node.js', 'Java', 'PostgreSQL', 'MongoDB', 
  'Redis', 'AWS', 'Docker', 'Microservices'
])

const frontendSkills = ref([
  'Vue.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 
  'Responsive Design', 'UX/UI', 'Progressive Web Apps'
])

const devopsSkills = ref([
  'Terraform', 'CI/CD', 'Kubernetes', 'AWS Lambda', 'CloudFormation', 
  'Git', 'Lean Six Sigma', 'Agile/Scrum', 'GDPR Compliance'
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
