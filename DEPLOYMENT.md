# Deployment Guide for Renaissance Web App

## Pre-Deployment Checklist ✅

### ✅ Completed
- [x] Build test passed (`npm run build` works)
- [x] All images copied to `public/img/parallax/` (25 images verified)
- [x] Console.log removed from production code
- [x] HTML title and meta description updated
- [x] No hardcoded localhost URLs
- [x] All dependencies properly installed
- [x] `vercel.json` configuration file created
- [x] `.vercelignore` file created
- [x] Project ready for Vercel deployment

### ⚠️ Before Deploying
- [x] Build tested: `npm run build` ✓
- [ ] Test the preview locally: `npm run build && npm run preview` (optional)
- [ ] Verify all images load correctly (will test after deployment)
- [ ] Test form submission (currently shows alert - you'll need to connect to a backend later)

## Deployment Options

### Option 1: Vercel (Recommended - Easiest & Free)

**Why Vercel:**
- Free tier with custom domain support
- Automatic HTTPS
- Global CDN
- Easy GitHub integration
- Free subdomain: `your-app.vercel.app`

**Steps:**

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub:**
   ```bash
   cd "/Users/ang/Desktop/instructor web/renaissance-webapp"
   git init
   git add .
   git commit -m "Ready for deployment"
   # Create a new repository on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/renaissance-webapp.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login (free account)
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings (already configured in `vercel.json`)
   - Click **"Deploy"**
   - Your site will be live in ~2 minutes! 🎉

3. **Get your URL:**
   After deployment, you'll get a URL like:
   `https://renaissance-webapp.vercel.app`

### Method 2: Deploy via CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd "/Users/ang/Desktop/instructor web/renaissance-webapp"
   vercel
   ```
   
   - Follow the prompts:
     - Set up and deploy? **Yes**
     - Which scope? (Choose your account)
     - Link to existing project? **No**
     - Project name? (Press Enter for default or enter a name)
     - Directory? (Press Enter for `./`)
     - Override settings? **No**

4. **Get your URL:**
   After deployment, Vercel will give you a URL like:
   `https://renaissance-webapp-xxxxx.vercel.app`

5. **For production deployment:**
   ```bash
   vercel --prod
   ```

**Alternative: Deploy via GitHub (Recommended for updates):**

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Sign up/login with GitHub
4. Click "Add New Project"
5. Import your GitHub repository
6. Vercel will auto-detect Vite settings
7. Click "Deploy"
8. Your site will be live in ~2 minutes!

---

### Option 2: Netlify (Also Great & Free)

**Steps:**

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   cd "/Users/ang/Desktop/instructor web/renaissance-webapp"
   npm run build
   netlify deploy --prod --dir=dist
   ```

4. **Or use Netlify Drop:**
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop your `dist` folder
   - Get instant URL!

---

### Option 3: GitHub Pages (Free but requires setup)

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

---

## Post-Deployment

### Adding a Custom Domain (Later)

1. **Vercel:**
   - Go to your project settings
   - Click "Domains"
   - Add your domain
   - Follow DNS instructions

2. **Netlify:**
   - Go to Domain settings
   - Add custom domain
   - Update DNS records

### Environment Variables (If Needed Later)

If you add API endpoints later:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables

---

## Quick Start (Recommended)

**Fastest way to deploy:**

1. **Push to GitHub:**
   ```bash
   cd "/Users/ang/Desktop/instructor web/renaissance-webapp"
   git init
   git add .
   git commit -m "Ready for deployment"
   # Create a repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/renaissance-webapp.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Click "Deploy"
   - Done! 🎉

Your site will be live at: `https://renaissance-webapp.vercel.app` (or similar)

---

## Testing the Build Locally

Before deploying, test the production build:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to test the production build.

---

## Notes

- All images are in `public/img/parallax/` - they'll be served correctly
- The form currently shows an alert on submit - you'll need to add backend integration later
- The app is mobile-responsive and ready for production
- No environment variables needed for initial deployment

