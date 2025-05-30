import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import About from '../views/About.vue'
import Resume from '../views/Resume.vue'
import Contact from '../views/Contact.vue'
import AWSCalculator from '../views/AWSCalculator.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import TerraformDemo from '../views/TerraformDemo.vue'

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
    meta: { title: 'Projects - RUWΔIN KΞLLY' }
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: ProjectDetail,
    props: true,
    meta: { title: 'Project Details - RUWΔIN KΞLLY' }
  },
  {
    path: '/projects/serverless-dashboard',
    name: 'ServerlessDashboard',
    component: ProjectDetail,
    props: { id: 'serverless-dashboard' },
    meta: { title: 'AWS Serverless Cost Intelligence Dashboard - RUWΔIN KΞLLY' }
  },
  {
    path: '/case-study',
    name: 'CaseStudy',
    component: ProjectDetail,
    props: { id: 'terraform-aws-suite' },
    meta: { title: 'Terraform AWS Infrastructure Case Study - RUWΔIN KΞLLY' }
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