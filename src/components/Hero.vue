<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Matrix Falling Code Background -->
    <div class="matrix-bg">
      <canvas ref="matrixCanvas" class="absolute inset-0 w-full h-full"></canvas>
    </div>

    <!-- Glowing Brain Visual -->
    <div class="brain-visual">
      <div class="brain-glow"></div>
      <svg class="brain-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path class="brain-path" 
              d="M20,40 Q25,20 35,25 Q45,15 55,25 Q65,20 70,40 Q75,35 80,45 Q85,55 75,65 Q70,75 60,70 Q50,80 40,70 Q30,75 25,65 Q15,55 20,40 Z" 
              fill="none" 
              stroke="rgba(255, 108, 0, 0.3)" 
              stroke-width="1"/>
        <path class="brain-connection" 
              d="M30,45 Q40,40 50,45 Q60,40 70,45" 
              fill="none" 
              stroke="rgba(166, 120, 255, 0.4)" 
              stroke-width="0.8"/>
        <path class="brain-connection" 
              d="M35,55 Q45,50 55,55" 
              fill="none" 
              stroke="rgba(166, 120, 255, 0.4)" 
              stroke-width="0.8"/>
      </svg>
    </div>

    <!-- Hero Content -->
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
      <h1 class="text-6xl md:text-8xl font-black mb-6 gradient-text uppercase tracking-wide animate-slide-up">
        RUWΔIN KΞLLY
      </h1>
      
      <div class="space-y-4 mb-8 animate-slide-up" style="animation-delay: 0.2s;">
        <p class="text-lg md:text-xl lg:text-2xl font-bold text-text-primary leading-tight">
          AI-Driven Supply Chain Architect & Backend Engineer<br class="hidden sm:inline" />
          <span class="block sm:inline"> | SAP • SAGE • SYSPRO • AWS • Python • FastAPI</span>
        </p>
        <p class="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
          Transforming global supply chains with intelligent ERP systems, modern backend architecture, and 15+ years of enterprise leadership across EU & Africa
        </p>
      </div>

      <!-- CTA Button -->
      <div class="animate-slide-up" style="animation-delay: 0.4s;">
        <router-link 
          to="/projects" 
          class="btn-primary inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-pulse-glow"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          View Projects
        </router-link>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const matrixCanvas = ref(null)

onMounted(() => {
  initMatrixAnimation()
})

const initMatrixAnimation = () => {
  const canvas = matrixCanvas.value
  const ctx = canvas.getContext('2d')
  
  // Set canvas size
  const setCanvasSize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  
  setCanvasSize()
  window.addEventListener('resize', setCanvasSize)
  
  // Matrix characters that spell "RUWAIN KELLY"
  const matrixChars = 'RUWΔINKΞLLY01234567890@#$%^&*()_+-=[]{}|;:,.<>?'
  const nameChars = 'RUWΔINKΞLLY'
  
  const fontSize = 14
  const columns = canvas.width / fontSize
  const drops = Array(Math.floor(columns)).fill(1)
  const nameDrops = Array(Math.floor(columns / 5)).fill(1) // Special drops for name
  
  const drawMatrix = () => {
    // Black background with fade effect
    ctx.fillStyle = 'rgba(11, 13, 23, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Regular matrix characters in orange
    ctx.fillStyle = '#ff6c00'
    ctx.font = `${fontSize}px monospace`
    
    for (let i = 0; i < drops.length; i++) {
      const text = matrixChars[Math.floor(Math.random() * matrixChars.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)
      
      // Reset drop to top randomly
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      
      drops[i]++
    }
    
    // Name characters falling in special columns with purple gradient
    ctx.fillStyle = '#a678ff'
    ctx.font = `${fontSize + 2}px monospace`
    
    for (let i = 0; i < nameDrops.length; i++) {
      if (Math.random() > 0.97) { // Less frequent but more prominent
        const char = nameChars[Math.floor(Math.random() * nameChars.length)]
        const x = (i * 5 + Math.floor(Math.random() * 3)) * fontSize
        ctx.fillText(char, x, nameDrops[i] * fontSize)
        
        if (nameDrops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          nameDrops[i] = 0
        }
        
        nameDrops[i] += 0.5 // Slower fall for name characters
      }
    }
  }
  
  // Animation loop
  const animate = () => {
    drawMatrix()
    setTimeout(() => requestAnimationFrame(animate), 50)
  }
  
  animate()
}
</script>

<style scoped>
.matrix-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Glowing Brain Visual */
.brain-visual {
  position: absolute;
  top: 20%;
  right: 10%;
  width: 200px;
  height: 200px;
  opacity: 0.4;
  animation: brainPulse 6s ease-in-out infinite;
  pointer-events: none;
  z-index: 2;
}

.brain-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(255, 108, 0, 0.2) 0%, rgba(166, 120, 255, 0.1) 50%, transparent 70%);
  border-radius: 50%;
  animation: glowPulse 4s ease-in-out infinite alternate;
}

.brain-svg {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.brain-path {
  animation: brainTrace 8s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(255, 108, 0, 0.6));
}

.brain-connection {
  animation: synapseFlash 3s ease-in-out infinite;
  filter: drop-shadow(0 0 4px rgba(166, 120, 255, 0.8));
}

@keyframes brainPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

@keyframes glowPulse {
  0% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@keyframes brainTrace {
  0%, 100% {
    stroke-dasharray: 0, 200;
    stroke-opacity: 0.3;
  }
  50% {
    stroke-dasharray: 100, 200;
    stroke-opacity: 0.8;
  }
}

@keyframes synapseFlash {
  0%, 70%, 100% {
    stroke-opacity: 0.2;
  }
  35% {
    stroke-opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .brain-visual {
    width: 120px;
    height: 120px;
    top: 15%;
    right: 5%;
    opacity: 0.2;
  }
  
  .brain-glow {
    width: 80px;
    height: 80px;
  }
}
</style>