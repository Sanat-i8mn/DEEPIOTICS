# Deployment Instructions for Deepiotics Website

## Step 1: Initialize Git (if not already done)
```bash
cd c:\Sanat\DeepiotWebsite\dnew-main\dnew-main
git init
```

## Step 2: Add Remote Repository
```bash
git remote add origin https://github.com/Sanat-i8mn/DEEPIOTICS.git
```

## Step 3: Add All Files
```bash
git add .
```

## Step 4: Commit Changes
```bash
git commit -m "Initial commit - Deepiotics AI Development Website"
```

## Step 5: Push to GitHub
```bash
git branch -M main
git push -u origin main --force
```

## Step 6: Deploy on Vercel (Recommended)

### Option A: Using Vercel CLI
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

### Option B: Using Vercel Dashboard
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import from GitHub: https://github.com/Sanat-i8mn/DEEPIOTICS
4. Framework Preset: Vite
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click "Deploy"

## Step 7: Add Environment Variables on Vercel
Go to Project Settings > Environment Variables and add:
- VITE_SUPABASE_ANON_KEY
- VITE_SUPABASE_URL
- VITE_GOOGLE_SHEETS_URL
- VITE_COMPANY_EMAIL
- VITE_COMPANY_PHONE
- VITE_COMPANY_ADDRESS

## Alternative: Deploy on Netlify
1. Go to https://netlify.com
2. Click "Add new site" > "Import an existing project"
3. Connect to GitHub and select DEEPIOTICS repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variables
7. Click "Deploy"

## Notes:
- Make sure .env file is in .gitignore (already done)
- Environment variables need to be added in hosting platform
- Domain can be configured after deployment
