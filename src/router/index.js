import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import TerraformDemo from '../views/TerraformDemo.vue'
import AWSCalculator from '../views/AWSCalculator.vue'
import AWSServerless from '../views/AWSServerless.vue'
import AIShipmentETA from '../views/AIShipmentETA.vue'
import SCMDashboard from '../projects/scm-order-tracker/pages/SCMDashboard.vue'
import AIShipmentETAWrapper from '../components/projects/AIShipmentETAWrapper.vue'
import SCMOrderTrackerWrapper from '../components/projects/SCMOrderTrackerWrapper.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'RUWΔIN KΞLLY - Ops Strategist & ERP Architect' }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: { title: 'Featured Projects - RUWΔIN KΞLLY' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'About Me - RUWΔIN KΞLLY' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { title: 'Contact - RUWΔIN KΞLLY' }
  },

  // Live Demo Routes (accessed from Projects page)
  {
    path: '/aws-calculator',
    name: 'AWSCalculator',
    component: AWSCalculator,
    meta: { title: 'AWS Cost Calculator - RUWΔIN KΞLLY' }
  },
  {
    path: '/terraform-demo',
    name: 'TerraformDemo',
    component: TerraformDemo,
    meta: { title: 'Live Terraform Backend Demo - RUWΔIN KΞLLY' }
  },
  {
    path: '/aws-serverless',
    name: 'AWSServerless',
    component: AWSServerless,
    meta: { title: 'AWS Serverless Dashboard - RUWΔIN KΞLLY' }
  },
  {
    path: '/scm-order-tracker',
    name: 'SCMOrderTracker',
    component: SCMOrderTrackerWrapper,
    meta: { title: 'SCM Order Tracker - RUWΔIN KΞLLY' }
  },
  {
    path: '/ai-shipment-eta',
    name: 'AIShipmentETA',
    component: AIShipmentETAWrapper,
    meta: { title: 'AI Shipment ETA Predictor - RUWΔIN KΞLLY' }
  },
  // Project Detail Routes (accessed from Projects page)
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: ProjectDetail,
    props: true,
    meta: { title: 'Project Details - RUWΔIN KΞLLY' }
  },
  {
    path: '/case-study',
    name: 'CaseStudy',
    component: ProjectDetail,
    props: { id: 'terraform-aws-suite' },
    meta: { title: 'Terraform AWS Infrastructure Case Study - RUWΔIN KΞLLY' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'RUWΔIN KΞLLY'
  next()
})

export default router