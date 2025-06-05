<template>
  <div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl lg:text-5xl font-bold mb-4 gradient-text">RUWΔIN KΞLLY</h1>
        <h2 class="text-xl lg:text-2xl text-light-text mb-6">Enterprise Technologist | Supply Chain & ERP Architect | Cloud Strategist</h2>
        <div class="flex flex-wrap justify-center gap-4 mb-8">
          <a href="mailto:admin@ruwainkelly.co.za" class="text-primary-orange hover:text-primary-purple transition-colors">
            admin@ruwainkelly.co.za
          </a>
          <span class="text-dark-border">•</span>
          <a href="tel:+27747607776" class="text-primary-orange hover:text-primary-purple transition-colors">
            +27 74 760 7776
          </a>
          <span class="text-dark-border">•</span>
          <span class="text-light-text">San Francisco, CA</span>
        </div>
        <div class="flex justify-center gap-4">
          <a href="/resume.pdf" download class="btn-primary inline-flex items-center gap-2">
            <ArrowDownTrayIcon class="w-5 h-5" />
            Download PDF
          </a>
          <a href="https://github.com/iamruwainkelly" target="_blank" class="btn-secondary inline-flex items-center gap-2">
            <CodeBracketIcon class="w-5 h-5" />
            GitHub
          </a>
        </div>
      </div>

      <!-- Professional Summary -->
      <section class="mb-12">
        <div class="glass-card p-8">
          <h3 class="text-2xl font-bold mb-6 gradient-text flex items-center gap-3">
            <UserIcon class="w-8 h-8" />
            Professional Summary
          </h3>
          <p class="text-light-text text-lg leading-relaxed">
            Enterprise technologist with 15+ years in global Supply Chain, ERP, and Cloud Ops. I don't just code—I architect intelligent platforms that streamline procurement, logistics, and infrastructure at scale. From SAP integrations to Python/Java microservices, I lead digital transformation across manufacturing, warehousing, and backend ecosystems. I bridge real-world operational gaps using modern tooling: Vue.js, Node.js, AWS, and Terraform.
          </p>
        </div>
      </section>

      <!-- Experience -->
      <section class="mb-12">
        <div class="glass-card p-8">
          <h3 class="text-2xl font-bold mb-8 gradient-text flex items-center gap-3">
            <BriefcaseIcon class="w-8 h-8" />
            Work Experience
          </h3>
          
          <div class="space-y-8">
            <div v-for="job in experience" :key="job.id" class="border-l-2 border-primary-orange pl-6 relative">
              <div class="absolute w-3 h-3 bg-primary-orange rounded-full -left-2 top-2"></div>
              <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
                <div>
                  <h4 class="text-xl font-semibold text-white">{{ job.title }}</h4>
                  <p class="text-primary-orange font-medium">{{ job.company }}</p>
                </div>
                <span class="text-light-text text-sm">{{ job.period }}</span>
              </div>
              <p class="text-light-text mb-4">{{ job.description }}</p>
              <ul class="list-disc list-inside text-light-text space-y-1 mb-4">
                <li v-for="achievement in job.achievements" :key="achievement">{{ achievement }}</li>
              </ul>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in job.technologies" :key="tech" 
                      class="px-3 py-1 bg-dark-border rounded-full text-xs text-light-text">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section class="mb-12">
        <div class="glass-card p-8">
          <h3 class="text-2xl font-bold mb-8 gradient-text flex items-center gap-3">
            <CpuChipIcon class="w-8 h-8" />
            Technical Skills
          </h3>
          
          <div class="grid md:grid-cols-2 gap-8">
            <div v-for="skillGroup in skills" :key="skillGroup.category">
              <h4 class="text-lg font-semibold mb-4 text-primary-orange">{{ skillGroup.category }}</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in skillGroup.items" :key="skill.name" 
                      class="px-3 py-2 bg-dark-surface text-light-text rounded-lg border border-dark-border hover:border-primary-orange transition-colors duration-300 text-sm">
                  {{ skill.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Strategic Profile -->
      <section class="mb-12">
        <div class="glass-card p-8">
          <h3 class="text-2xl font-bold mb-8 gradient-text flex items-center gap-3">
            <AcademicCapIcon class="w-8 h-8" />
            Strategic Profile
          </h3>
          
          <p class="text-base text-light-text leading-relaxed">
            Multi-disciplinary leader in Supply Chain, Logistics, and ERP Ops with deep backend and infrastructure engineering experience. I specialise in digitising procurement, automating warehouse flows, and integrating ERP platforms with cloud-native systems. With 15+ years of delivery across SAP, SYSPRO, SAGE, and AWS, I architect platforms that scale globally and deliver measurable operational impact.
          </p>
        </div>
      </section>

      <!-- Contact CTA -->
      <section>
        <div class="glass-card p-8 text-center">
          <h3 class="text-2xl font-bold mb-4 gradient-text">Ready to Lead Your SCM & ERP Transformation?</h3>
          <p class="text-light-text mb-6">
            From SAP migrations to cloud-native supply chain platforms, I architect enterprise solutions that 
            scale globally and deliver measurable operational impact. Let's transform your operations—together.
          </p>
          <router-link to="/contact" class="btn-primary">
            Discuss Your Transformation
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  UserIcon, 
  BriefcaseIcon, 
  CpuChipIcon, 
  AcademicCapIcon, 
  ArrowDownTrayIcon,
  CodeBracketIcon 
} from '@heroicons/vue/24/outline'

const experience = ref([
  {
    id: 1,
    title: 'Independent Consultant - Digital Transformation | SCM & ERP Systems Architect | Backend & Cloud Strategist',
    company: 'Independent Consultant',
    period: '2022 – Present',
    description: 'Leading digital transformation projects across EU and Africa, delivering full-stack ERP, WMS, and procurement systems.',
    achievements: [
      'Led digital transformation projects across EU and Africa, delivering full-stack ERP, WMS, and procurement systems using Python, FastAPI, SQL, and AWS (Lambda, RDS, EC2)',
      'Reduced procurement reporting lag by 40% through real-time Tableau dashboards powered by Python-based ETL pipelines',
      'Deployed GDPR-compliant cloud infrastructure managing 100,000+ SKUs in live warehouse environments',
      'Built AI forecasting engines using scikit-learn to improve demand planning and reduce understock risks',
      'Trained logistics and ops teams in Germany, the Netherlands, and South Africa on ERP adoption, Lean Six Sigma, and system workflows'
    ],
    technologies: ['Python', 'FastAPI', 'AWS', 'SQL', 'ETL', 'GDPR', 'AI Forecasting', 'ERP', 'WMS']
  },
  {
    id: 2,
    title: 'Supply Chain, Logistics, Procurement Ops Lead, ERP & Backend Systems Specialist',
    company: 'Various Companies',
    period: '2005 – 2022',
    description: 'Led operational technology transformation across supply chain, warehouse, and procurement environments in both manufacturing and retail sectors.',
    achievements: [
      'Led operational technology transformation across supply chain, warehouse, and procurement environments in both manufacturing and retail sectors',
      'Delivered SAP, SYSPRO, and SAGE migrations across multiple regions—improving system interoperability and financial accuracy',
      'Developed custom backend tools using Java, Python, and SQL for real-time stock visibility, vendor tracking, and warehouse optimisation',
      'Integrated procurement systems with logistics APIs to automate order workflows and reduce manual reconciliation',
      'Managed ERP-to-cloud transitions and trained cross-functional teams on digitised workflows, reporting, and compliance standards'
    ],
    technologies: ['Supply Chain', 'Logistics', 'Procurement', 'SAP', 'SYSPRO', 'SAGE', 'Java', 'Python', 'SQL', 'ERP']
  }
])

const skills = ref([
  {
    category: 'ERP & Ops',
    items: [
      { name: 'SAP' },
      { name: 'SAGE' },
      { name: 'SYSPRO' },
      { name: 'ERPNext' },
      { name: 'Odoo' },
      { name: 'Procurement Systems' },
      { name: 'Supply Chain' },
      { name: 'Warehouse Management' }
    ]
  },
  {
    category: 'Backend Development',
    items: [
      { name: 'Python' },
      { name: 'Java' },
      { name: 'Node.js' },
      { name: 'FastAPI' },
      { name: 'PostgreSQL' },
      { name: 'Redis' },
      { name: 'ETL Pipelines' },
      { name: 'Microservices' }
    ]
  },
  {
    category: 'Cloud & Infrastructure',
    items: [
      { name: 'AWS (Lambda, RDS, EC2)' },
      { name: 'Terraform' },
      { name: 'Docker' },
      { name: 'Kubernetes' },
      { name: 'CI/CD' },
      { name: 'GDPR Compliance' },
      { name: 'Auto-scaling' },
      { name: 'Load Balancing' }
    ]
  },
  {
    category: 'Frontend & Analytics',
    items: [
      { name: 'Vue.js' },
      { name: 'React' },
      { name: 'JavaScript/TypeScript' },
      { name: 'TailwindCSS' },
      { name: 'Tableau' },
      { name: 'Data Visualization' },
      { name: 'Real-time Dashboards' },
      { name: 'AI Forecasting' }
    ]
  },
  {
    category: 'Operations & Methodology',
    items: [
      { name: 'Agile/Scrum' },
      { name: 'DevOps' },
      { name: 'Lean Six Sigma' },
      { name: 'Digital Transformation' },
      { name: 'Process Automation' },
      { name: 'Team Training' },
      { name: 'Cross-functional Leadership' },
      { name: 'Global Project Management' }
    ]
  }
])
</script>

<style scoped>
/* Additional styles handled by Tailwind and global CSS */
</style>