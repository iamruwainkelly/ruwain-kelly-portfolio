<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <!-- Name Field -->
    <div>
      <label for="name" class="block text-sm font-semibold text-white mb-2">
        Full Name *
      </label>
      <input 
        type="text" 
        id="name" 
        v-model="formData.name" 
        required 
        class="form-input"
        placeholder="Enter your full name"
        :class="{ 'border-red-500': errors.name }"
      />
      <p v-if="errors.name" class="text-red-400 text-sm mt-1">{{ errors.name }}</p>
    </div>

    <!-- Email Field -->
    <div>
      <label for="email" class="block text-sm font-semibold text-white mb-2">
        Email Address *
      </label>
      <input 
        type="email" 
        id="email" 
        v-model="formData.email" 
        required 
        class="form-input"
        placeholder="Enter your email address"
        :class="{ 'border-red-500': errors.email }"
      />
      <p v-if="errors.email" class="text-red-400 text-sm mt-1">{{ errors.email }}</p>
    </div>

    <!-- Subject Field -->
    <div>
      <label for="subject" class="block text-sm font-semibold text-white mb-2">
        Subject *
      </label>
      <select 
        id="subject" 
        v-model="formData.subject" 
        required 
        class="form-input"
        :class="{ 'border-red-500': errors.subject }"
      >
        <option value="">Select a subject</option>
        <option value="project">New Project Inquiry</option>
        <option value="collaboration">Collaboration Opportunity</option>
        <option value="consultation">Technical Consultation</option>
        <option value="support">Support Request</option>
        <option value="other">Other</option>
      </select>
      <p v-if="errors.subject" class="text-red-400 text-sm mt-1">{{ errors.subject }}</p>
    </div>

    <!-- Budget Field -->
    <div>
      <label for="budget" class="block text-sm font-semibold text-white mb-2">
        Project Budget (Optional)
      </label>
      <select id="budget" v-model="formData.budget" class="form-input">
        <option value="">Select budget range</option>
        <option value="under-5k">Under $5,000</option>
        <option value="5k-15k">$5,000 - $15,000</option>
        <option value="15k-30k">$15,000 - $30,000</option>
        <option value="30k-50k">$30,000 - $50,000</option>
        <option value="over-50k">$50,000+</option>
        <option value="discuss">Let's discuss</option>
      </select>
    </div>

    <!-- Timeline Field -->
    <div>
      <label for="timeline" class="block text-sm font-semibold text-white mb-2">
        Project Timeline (Optional)
      </label>
      <select id="timeline" v-model="formData.timeline" class="form-input">
        <option value="">Select timeline</option>
        <option value="asap">ASAP</option>
        <option value="1-month">Within 1 month</option>
        <option value="2-3-months">2-3 months</option>
        <option value="3-6-months">3-6 months</option>
        <option value="flexible">Flexible</option>
      </select>
    </div>

    <!-- Message Field -->
    <div>
      <label for="message" class="block text-sm font-semibold text-white mb-2">
        Message *
      </label>
      <textarea 
        id="message" 
        v-model="formData.message" 
        required 
        rows="5"
        class="form-input resize-none"
        placeholder="Tell me about your project or inquiry..."
        :class="{ 'border-red-500': errors.message }"
      ></textarea>
      <p v-if="errors.message" class="text-red-400 text-sm mt-1">{{ errors.message }}</p>
      <p class="text-light-text text-sm mt-1">{{ messageLength }}/500 characters</p>
    </div>

    <!-- File Upload (Optional) -->
    <div>
      <label for="files" class="block text-sm font-semibold text-white mb-2">
        Attachments (Optional)
      </label>
      <div class="border-2 border-dashed border-dark-border rounded-lg p-6 text-center hover:border-primary-orange transition-colors">
        <input 
          type="file" 
          id="files" 
          @change="handleFileUpload"
          multiple
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
          class="hidden"
        />
        <label for="files" class="cursor-pointer">
          <CloudArrowUpIcon class="w-8 h-8 mx-auto mb-2 text-light-text" />
          <p class="text-light-text">Click to upload files or drag and drop</p>
          <p class="text-sm text-light-text mt-1">PDF, DOC, TXT, Images (Max 5MB each)</p>
        </label>
      </div>
      <div v-if="uploadedFiles.length > 0" class="mt-3 space-y-2">
        <div v-for="file in uploadedFiles" :key="file.name" 
             class="flex items-center justify-between bg-dark-border rounded p-2">
          <span class="text-sm text-light-text">{{ file.name }}</span>
          <button @click="removeFile(file)" type="button" class="text-red-400 hover:text-red-300">
            <XMarkIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Newsletter Signup -->
    <div class="flex items-center gap-3">
      <input 
        type="checkbox" 
        id="newsletter" 
        v-model="formData.newsletter"
        class="w-4 h-4 text-primary-orange bg-dark-surface border-dark-border rounded focus:ring-primary-orange focus:ring-2"
      />
      <label for="newsletter" class="text-sm text-light-text">
        I'd like to receive updates about new projects and blog posts
      </label>
    </div>

    <!-- Submit Button -->
    <button 
      type="submit" 
      :disabled="isSubmitting"
      class="btn-primary w-full relative"
      :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
    >
      <span v-if="!isSubmitting" class="flex items-center justify-center gap-2">
        <PaperAirplaneIcon class="w-5 h-5" />
        Send Message
      </span>
      <span v-else class="flex items-center justify-center gap-2">
        <div class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
        Sending...
      </span>
    </button>

    <!-- Success/Error Messages -->
    <div v-if="submitStatus === 'success'" class="bg-green-500/20 border border-green-500 rounded-lg p-4 text-green-300">
      <div class="flex items-center gap-2">
        <CheckCircleIcon class="w-5 h-5" />
        <span>Message sent successfully! I'll get back to you within 24 hours.</span>
      </div>
    </div>

    <div v-if="submitStatus === 'error'" class="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-300">
      <div class="flex items-center gap-2">
        <ExclamationCircleIcon class="w-5 h-5" />
        <span>Failed to send message. Please try again or email me directly.</span>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { 
  PaperAirplaneIcon, 
  CloudArrowUpIcon, 
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'

const formData = ref({
  name: '',
  email: '',
  subject: '',
  budget: '',
  timeline: '',
  message: '',
  newsletter: false
})

const uploadedFiles = ref([])
const errors = ref({})
const isSubmitting = ref(false)
const submitStatus = ref('')

const messageLength = computed(() => formData.value.message.length)

// Validate form
const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.name.trim()) {
    errors.value.name = 'Name is required'
  }
  
  if (!formData.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email'
  }
  
  if (!formData.value.subject) {
    errors.value.subject = 'Please select a subject'
  }
  
  if (!formData.value.message.trim()) {
    errors.value.message = 'Message is required'
  } else if (formData.value.message.length > 500) {
    errors.value.message = 'Message must be 500 characters or less'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    if (file.size <= 5 * 1024 * 1024) { // 5MB limit
      uploadedFiles.value.push(file)
    } else {
      alert(`File ${file.name} is too large. Maximum size is 5MB.`)
    }
  })
}

const removeFile = (fileToRemove) => {
  uploadedFiles.value = uploadedFiles.value.filter(file => file !== fileToRemove)
}

const submitForm = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  submitStatus.value = ''
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', {
      ...formData.value,
      files: uploadedFiles.value
    })
    
    submitStatus.value = 'success'
    
    // Reset form
    formData.value = {
      name: '',
      email: '',
      subject: '',
      budget: '',
      timeline: '',
      message: '',
      newsletter: false
    }
    uploadedFiles.value = []
    
  } catch (error) {
    console.error('Form submission error:', error)
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

// Clear status after 5 seconds
watch(submitStatus, (newStatus) => {
  if (newStatus) {
    setTimeout(() => {
      submitStatus.value = ''
    }, 5000)
  }
})
</script>

<style scoped>
.form-input {
  @apply w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-white placeholder-light-text focus:border-primary-orange focus:ring-1 focus:ring-primary-orange focus:outline-none transition-colors;
}
</style>