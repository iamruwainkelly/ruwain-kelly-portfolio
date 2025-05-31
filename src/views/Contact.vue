<template>
  <div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl lg:text-5xl font-bold mb-6 gradient-text">Let's Architect Operational Brilliance</h1>
        <p class="text-light-text text-lg max-w-3xl mx-auto mb-8">
          From optimising ERP landscapes to building secure cloud backends—let's turn fragmented operations into high-performance systems. I help enterprises across Africa and Europe streamline supply chains, automate reporting, and scale infrastructure using SAP, SAGE, SYSPRO, and AWS.
        </p>
        
        <!-- Enhanced CTA -->
        <div class="bg-gradient-to-r from-primary-orange/10 to-primary-purple/10 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 class="text-xl font-semibold text-white mb-3">Ready to Build Something Amazing?</h2>
          <p class="text-light-text mb-4">
            From AWS cost optimization to complete ERP integrations - let's turn your vision into reality.
          </p>
          <div class="flex items-center justify-center gap-2 text-sm text-primary-orange">
            <span>🔒</span>
            <span>Need an NDA before chatting? No problem—just mention it in your message.</span>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="glass-card p-8">
          <h2 class="text-2xl font-bold mb-6 gradient-text">Let's Optimize Your Operations</h2>
          <ContactForm />
        </div>

        <!-- Contact Info -->
        <div class="space-y-8">
          <!-- Contact Details -->
          <div class="glass-card p-8">
            <h3 class="text-xl font-bold mb-6 gradient-text">Contact Information</h3>
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-primary-orange to-primary-purple rounded-lg flex items-center justify-center">
                  <EnvelopeIcon class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-white">Email</h4>
                  <a href="mailto:admin@ruwainkelly.co.za" class="text-light-text hover:text-primary-orange transition-colors">
                    admin@ruwainkelly.co.za
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-primary-orange to-primary-purple rounded-lg flex items-center justify-center">
                  <PhoneIcon class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-white">Phone</h4>
                  <a href="tel:+27747607776" class="text-light-text hover:text-primary-orange transition-colors">
                    +27 74 760 7776
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-primary-orange to-primary-purple rounded-lg flex items-center justify-center">
                  <MapPinIcon class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-white">Location</h4>
                  <p class="text-light-text">Cape Town, South Africa</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-primary-orange to-primary-purple rounded-lg flex items-center justify-center">
                  <ClockIcon class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-white">Response Time</h4>
                  <p class="text-light-text">Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="glass-card p-8">
            <h3 class="text-xl font-bold mb-6 gradient-text">Connect With Me</h3>
            <div class="grid grid-cols-2 gap-4">
              <a href="https://github.com/iamruwainkelly" target="_blank" 
                 class="flex items-center gap-3 p-4 glass-card hover-lift transition-all duration-300 group">
                <div class="w-10 h-10 bg-gradient-to-br from-primary-orange to-primary-purple rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CodeBracketIcon class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-white">GitHub</h4>
                  <p class="text-light-text text-sm">@iamruwainkelly</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/mr-r" target="_blank" 
                 class="flex items-center gap-3 p-4 glass-card hover-lift transition-all duration-300 group">
                <div class="w-10 h-10 bg-gradient-to-br from-primary-orange to-primary-purple rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserIcon class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-white">LinkedIn</h4>
                  <p class="text-light-text text-sm">Mr R</p>
                </div>
              </a>

              <a href="https://ruwainkelly.slack.com" target="_blank" 
                 class="flex items-center gap-3 p-4 glass-card hover-lift transition-all duration-300 group">
                <div class="w-10 h-10 bg-gradient-to-br from-primary-orange to-primary-purple rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ChatBubbleLeftRightIcon class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-white">Slack</h4>
                  <p class="text-light-text text-sm">ruwainkelly</p>
                </div>
              </a>

              <a href="mailto:admin@ruwainkelly.co.za" 
                 class="flex items-center gap-3 p-4 glass-card hover-lift transition-all duration-300 group">
                <div class="w-10 h-10 bg-gradient-to-br from-primary-orange to-primary-purple rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <EnvelopeIcon class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-white">Email</h4>
                  <p class="text-light-text text-sm">Direct Message</p>
                </div>
              </a>
            </div>
          </div>

          <!-- Service Excellence -->
          <div class="glass-card p-8">
            <h3 class="text-xl font-bold mb-6 gradient-text">Service Excellence</h3>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-white font-semibold">Available for new projects</span>
            </div>
            
            <div class="space-y-4 mb-6">
              <div class="p-4 bg-dark-surface rounded-lg border-l-4 border-primary-orange">
                <div>
                  <h4 class="font-semibold text-white mb-2">Cloud & Backend Architecture</h4>
                  <p class="text-sm text-light-text">Enterprise-grade AWS infrastructure, secure APIs, and scalable database solutions tailored to your operational needs.</p>
                </div>
              </div>
              
              <div class="p-4 bg-dark-surface rounded-lg border-l-4 border-primary-purple">
                <div>
                  <h4 class="font-semibold text-white mb-2">Cost Optimization & Monitoring</h4>
                  <p class="text-sm text-light-text">Custom dashboards and automation to reduce cloud spend while improving performance and visibility.</p>
                </div>
              </div>
              
              <div class="p-4 bg-dark-surface rounded-lg border-l-4 border-primary-orange">
                <div>
                  <h4 class="font-semibold text-white mb-2">ERP Integration & Automation</h4>
                  <p class="text-sm text-light-text">Seamless connections between SAP, SAGE, SYSPRO and modern cloud systems for operational excellence.</p>
                </div>
              </div>
              
              <div class="p-4 bg-dark-surface rounded-lg border-l-4 border-primary-purple">
                <div>
                  <h4 class="font-semibold text-white mb-2">Strategic Technology Advisory</h4>
                  <p class="text-sm text-light-text">Ongoing consultation and architectural guidance to align technology with business objectives.</p>
                </div>
              </div>
            </div>
            
            <!-- Investment Discussion CTA -->
            <div class="bg-gradient-to-r from-primary-orange/10 to-primary-purple/10 rounded-lg p-4 mb-4">
              <p class="text-sm text-light-text text-center mb-3">
                <span class="text-primary-orange font-semibold">Investment tailored to impact.</span> Every project is scoped based on complexity, timeline, and business value.
              </p>
            </div>
            
            <!-- Booking CTA -->
            <a href="https://calendly.com/ruwainkelly" target="_blank" 
               class="block w-full bg-gradient-to-r from-primary-orange to-primary-purple text-white text-center py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              📅 Let's Discuss Your Project
            </a>
          </div>
        </div>
      </div>

      <!-- Testimonials Section -->
      <section class="mt-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4 gradient-text">What Clients Say</h2>
          <p class="text-light-text">Trusted by businesses across Africa and Europe</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6 mb-20">
          <div class="glass-card p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-primary-orange to-primary-purple rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h4 class="font-semibold text-white">Michael Chen</h4>
                <p class="text-sm text-light-text">Startup CTO</p>
              </div>
            </div>
            <p class="text-light-text italic">
              "Ruwain transformed our infrastructure costs from chaos to clarity. His AWS dashboard saved us 40% on our monthly bill while improving performance."
            </p>
            <div class="flex text-yellow-400 mt-3">
              ⭐⭐⭐⭐⭐
            </div>
          </div>

          <div class="glass-card p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-primary-orange to-primary-purple rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h4 class="font-semibold text-white">Sarah Williams</h4>
                <p class="text-sm text-light-text">Procurement Director</p>
              </div>
            </div>
            <p class="text-light-text italic">
              "The SAP integration Ruwain built streamlined our entire procurement process. What used to take hours now happens automatically."
            </p>
            <div class="flex text-yellow-400 mt-3">
              ⭐⭐⭐⭐⭐
            </div>
          </div>

          <div class="glass-card p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-primary-orange to-primary-purple rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h4 class="font-semibold text-white">Alex Rodriguez</h4>
                <p class="text-sm text-light-text">Freelancer Collaborator</p>
              </div>
            </div>
            <p class="text-light-text italic">
              "Working with Ruwain on complex backend systems is a dream. His attention to detail and system architecture knowledge is exceptional."
            </p>
            <div class="flex text-yellow-400 mt-3">
              ⭐⭐⭐⭐⭐
            </div>
          </div>
        </div>
      </section>

      <!-- Newsletter Signup Section -->
      <section class="mb-20">
        <div class="glass-card p-8 text-center">
          <h2 class="text-2xl font-bold mb-4 gradient-text">Stay Updated</h2>
          <p class="text-light-text mb-6 max-w-2xl mx-auto">
            Get tactical tech & ops strategies in your inbox. No spam, just actionable insights on cloud architecture, ERP optimization, and modern backend development.
          </p>
          <form @submit.prevent="subscribeNewsletter" class="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              v-model="newsletterEmail"
              placeholder="Enter your email address"
              required
              class="flex-1 px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-white placeholder-light-text focus:border-primary-orange focus:ring-1 focus:ring-primary-orange focus:outline-none"
            />
            <button 
              type="submit" 
              class="px-6 py-3 bg-gradient-to-r from-primary-orange to-primary-purple text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              :disabled="isSubscribing"
            >
              {{ isSubscribing ? 'Subscribing...' : 'Subscribe' }}
            </button>
          </form>
          <p v-if="subscriptionMessage" :class="subscriptionSuccess ? 'text-green-400' : 'text-red-400'" class="mt-3 text-sm">
            {{ subscriptionMessage }}
          </p>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="mt-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4 gradient-text">Frequently Asked Questions</h2>
          <p class="text-light-text">Quick answers to common questions</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="faq in faqs" :key="faq.id" class="glass-card p-6">
            <h3 class="text-lg font-semibold mb-3 text-primary-orange">{{ faq.question }}</h3>
            <p class="text-light-text">{{ faq.answer }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon,
  CodeBracketIcon,
  UserIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/vue/24/outline'
import ContactForm from '@/components/ContactForm.vue'

// Newsletter state
const newsletterEmail = ref('')
const isSubscribing = ref(false)
const subscriptionMessage = ref('')
const subscriptionSuccess = ref(false)

const subscribeNewsletter = async () => {
  isSubscribing.value = true
  subscriptionMessage.value = ''
  
  try {
    // Simulate API call - replace with actual newsletter service
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    subscriptionMessage.value = '🎉 Thanks for subscribing! Check your email for confirmation.'
    subscriptionSuccess.value = true
    newsletterEmail.value = ''
  } catch (error) {
    subscriptionMessage.value = '❌ Something went wrong. Please try again.'
    subscriptionSuccess.value = false
  } finally {
    isSubscribing.value = false
    
    // Clear message after 5 seconds
    setTimeout(() => {
      subscriptionMessage.value = ''
    }, 5000)
  }
}

const faqs = ref([
  {
    id: 1,
    question: "What's your typical project timeline?",
    answer: "Project timelines vary based on scope and complexity. Simple websites typically take 2-4 weeks, while complex applications can take 2-6 months. I'll provide a detailed timeline during our initial consultation."
  },
  {
    id: 2,
    question: "Do you work with international clients?",
    answer: "Absolutely! I work with clients worldwide and am experienced in remote collaboration. I'm flexible with time zones and use modern communication tools to ensure smooth project delivery."
  },
  {
    id: 3,
    question: "What technologies do you specialize in?",
    answer: "I specialize in Vue.js, React, Node.js, Python, and AWS cloud services. I'm always learning new technologies and can adapt to your specific tech stack requirements."
  },
  {
    id: 4,
    question: "Do you provide ongoing support?",
    answer: "Yes! I offer various support packages including bug fixes, feature updates, performance optimization, and technical consultancy. We can discuss the best support plan for your needs."
  }
])
</script>

<style scoped>
/* Additional styles handled by Tailwind and global CSS */
</style>