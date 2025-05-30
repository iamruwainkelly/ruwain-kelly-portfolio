<template>
  <div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl lg:text-5xl font-bold mb-6 gradient-text">Get In Touch</h1>
        <p class="text-light-text text-lg max-w-2xl mx-auto">
          Ready to bring your ideas to life? Let's discuss your project and explore how we can work together 
          to create something amazing.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="glass-card p-8">
          <h2 class="text-2xl font-bold mb-6 gradient-text">Send a Message</h2>
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
                  <a href="mailto:ruwain@example.com" class="text-light-text hover:text-primary-orange transition-colors">
                    ruwain@example.com
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-primary-orange to-primary-purple rounded-lg flex items-center justify-center">
                  <PhoneIcon class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-white">Phone</h4>
                  <a href="tel:+1234567890" class="text-light-text hover:text-primary-orange transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-primary-orange to-primary-purple rounded-lg flex items-center justify-center">
                  <MapPinIcon class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-white">Location</h4>
                  <p class="text-light-text">San Francisco, CA</p>
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
              <a href="https://github.com/ruwainkelly" target="_blank" 
                 class="flex items-center gap-3 p-4 glass-card hover-lift transition-all duration-300 group">
                <div class="w-10 h-10 bg-gradient-to-br from-primary-orange to-primary-purple rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CodeBracketIcon class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-white">GitHub</h4>
                  <p class="text-light-text text-sm">@ruwainkelly</p>
                </div>
              </a>

              <a href="https://linkedin.com/in/ruwainkelly" target="_blank" 
                 class="flex items-center gap-3 p-4 glass-card hover-lift transition-all duration-300 group">
                <div class="w-10 h-10 bg-gradient-to-br from-primary-orange to-primary-purple rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserIcon class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-white">LinkedIn</h4>
                  <p class="text-light-text text-sm">@ruwainkelly</p>
                </div>
              </a>

              <a href="https://twitter.com/ruwainkelly" target="_blank" 
                 class="flex items-center gap-3 p-4 glass-card hover-lift transition-all duration-300 group">
                <div class="w-10 h-10 bg-gradient-to-br from-primary-orange to-primary-purple rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ChatBubbleLeftRightIcon class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-white">Twitter</h4>
                  <p class="text-light-text text-sm">@ruwainkelly</p>
                </div>
              </a>

              <a href="mailto:ruwain@example.com" 
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

          <!-- Availability -->
          <div class="glass-card p-8">
            <h3 class="text-xl font-bold mb-6 gradient-text">Current Availability</h3>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-white font-semibold">Available for new projects</span>
            </div>
            <p class="text-light-text mb-4">
              I'm currently accepting new freelance projects and collaboration opportunities. 
              Let's discuss how I can help bring your vision to life.
            </p>
            <div class="space-y-2 text-sm text-light-text">
              <p>• Full-stack web development</p>
              <p>• Cloud architecture & migration</p>
              <p>• Technical consulting</p>
              <p>• Code reviews & optimization</p>
            </div>
          </div>
        </div>
      </div>

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