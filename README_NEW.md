# RUWΔIN KΞLLY Portfolio

![Portfolio Banner](https://img.shields.io/badge/Portfolio-RUWΔIN%20KΞLLY-orange?style=for-the-badge&logo=vue.js)
![Build Status](https://img.shields.io/badge/Build-Passing-success?style=for-the-badge)
![Vue Version](https://img.shields.io/badge/Vue-3.4.0-4FC08D?style=for-the-badge&logo=vue.js)

A modern, dark-themed portfolio website showcasing 8 focused applications with beautiful animations, glassmorphism design, and professional layouts. Built with Vue 3, Vite, and Tailwind CSS.

## ✨ Features

- **🌙 Dark Mode Only**: Sleek dark theme with `#0b0d17` background
- **🎨 Gradient Branding**: Primary gradient (`#ff6c00` → `#a678ff`)
- **💎 Glassmorphism UI**: Modern glass-effect navbar and cards
- **🎬 Matrix Animation**: Animated falling code background spelling "RUWAIN KELLY"
- **📱 Fully Responsive**: Mobile-first design with smooth transitions
- **⚡ Performance Optimized**: Built with Vite for lightning-fast development
- **🎯 8 Featured Projects**: Comprehensive showcase with detailed pages
- **📊 Interactive Charts**: Data visualizations using Chart.js

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd ruwain-kelly-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
ruwain-kelly-portfolio/
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── Navbar.vue      # Glassmorphism navigation
│   │   ├── Hero.vue        # Matrix animation hero section
│   │   ├── ProjectCard.vue # Interactive project cards
│   │   ├── Footer.vue      # Site footer
│   │   └── ContactForm.vue # Advanced contact form
│   ├── views/              # Page components
│   │   ├── Home.vue        # Landing page
│   │   ├── Projects.vue    # Project showcase
│   │   ├── Resume.vue      # Professional timeline
│   │   ├── Contact.vue     # Contact page
│   │   ├── ProjectDetail.vue # Project details
│   │   └── AWSCalculator.vue # AWS cost calculator
│   ├── data/
│   │   └── projects.json   # Project data and mock stats
│   ├── utils/
│   │   └── animations.js   # Animation utilities
│   └── assets/
│       └── styles/
│           └── main.css    # Global styles & animations
├── public/                 # Static assets
├── tailwind.config.js     # Tailwind configuration
└── vite.config.js         # Vite configuration
```

## 🎨 Design System

### Colors
- **Background**: `#0b0d17` (dark-bg)
- **Surface**: `#1a1d29` (dark-surface) 
- **Border**: `#2d3748` (dark-border)
- **Primary Gradient**: `#ff6c00` → `#a678ff`
- **Text Primary**: `#f8f8f8`
- **Text Secondary**: `#999999`

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable spacing

### Components
- **Glassmorphism Effects**: `backdrop-blur-lg` with opacity
- **Hover Animations**: Scale transforms and glow effects
- **Transitions**: Smooth 300ms duration

## 📦 Featured Projects

1. **Supply Chain Optimizer** - ML-powered logistics optimization
2. **SAP Integration Hub** - Enterprise system connectivity
3. **Cloud Infrastructure Monitor** - Real-time AWS monitoring
4. **Inventory Management System** - Smart warehouse tracking
5. **Data Analytics Dashboard** - Business intelligence platform
6. **Automated Workflow Engine** - Process automation
7. **Customer Support Portal** - AI-enhanced help desk
8. **E-commerce Platform** - Full-stack shopping solution

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# For production deployment
vercel --prod
```

The project includes a `vercel.json` configuration file for seamless deployment.

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting provider
```

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build (http://localhost:4173)

### Technologies Used
- **Frontend**: Vue 3, Vue Router
- **Styling**: Tailwind CSS, Custom CSS
- **Build Tool**: Vite
- **Icons**: Heroicons
- **Charts**: Chart.js + vue-chartjs
- **Animations**: Custom CSS + JavaScript

## 🎯 Performance Features

- **Code Splitting**: Automatic route-based splitting
- **Asset Optimization**: Vite's built-in optimization
- **Lazy Loading**: Components loaded on demand
- **Responsive Images**: Optimized for all screen sizes
- **Minimal Bundle**: Tree-shaking and minification

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Project Status

### ✅ Completed Features
- [x] Vue 3 + Vite project setup
- [x] Tailwind CSS configuration with custom design system
- [x] Glassmorphism navbar with mobile responsive menu
- [x] Matrix falling code animation hero section
- [x] Interactive project cards with hover effects
- [x] Complete routing setup for all pages
- [x] Contact form with validation
- [x] AWS cost calculator functionality
- [x] Professional resume timeline
- [x] Production build optimization
- [x] Vercel deployment configuration

### 🚀 Ready for Deployment
The website is fully functional and optimized for production deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**RUWΔIN KΞLLY**
- Portfolio: [Live Site](https://ruwain-kelly-portfolio.vercel.app)
- GitHub: [@ruwainkelly](https://github.com/ruwainkelly)
- LinkedIn: [RUWΔIN KΞLLY](https://linkedin.com/in/ruwainkelly)

---

Built with ❤️ using Vue 3 + Vite + Tailwind CSS
