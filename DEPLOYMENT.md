# 🚀 Deployment Guide

## Quick Deploy to Vercel

### Option 1: Via Vercel Dashboard (Recommended)
1. Visit [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import this repository
5. Vercel will auto-detect the Vue.js project
6. Click "Deploy" - Done! 🎉

### Option 2: Via CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - Project name? ruwain-kelly-portfolio
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

### Option 3: Via GitHub Integration
1. Push code to GitHub repository
2. Connect GitHub repo to Vercel
3. Enable auto-deployments
4. Every push to main branch triggers new deployment

## Project Configuration

The project includes:
- ✅ `vercel.json` - Deployment configuration
- ✅ Build script in `package.json`
- ✅ Production-ready Vite config
- ✅ Static file handling

## Environment Variables
No environment variables required for basic deployment.

## Domain Setup
After deployment:
1. Go to Vercel dashboard
2. Select your project
3. Go to "Settings" → "Domains"
4. Add your custom domain

## Build Output
- Build command: `npm run build`
- Output directory: `dist/`
- Node.js version: 18.x (recommended)

## Performance
- Automatic CDN distribution
- HTTP/2 support
- Gzip compression
- Image optimization

That's it! Your portfolio will be live in minutes. 🚀
