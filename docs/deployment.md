# Deployment Guide

Learn how to publish your resume website online.

## Table of Contents

- [Overview](#overview)
- [GitHub Pages](#github-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Custom Domain](#custom-domain)
- [CI/CD](#cicd)

---

## Overview

Your resume is a **static website** - just HTML, CSS, and assets. This means you can deploy it anywhere that hosts static files.

**Popular Options:**

| Platform | Cost | Setup | Custom Domain | HTTPS | Best For |
|----------|------|-------|---------------|-------|----------|
| **GitHub Pages** | Free | Easy | Yes (free) | Yes | Developers, open portfolios |
| **Netlify** | Free | Very Easy | Yes (free) | Yes | Everyone, drag-and-drop |
| **Vercel** | Free | Easy | Yes (free) | Yes | Next.js fans, automatic |

All three options are **free** and provide **HTTPS** with custom domains!

---

## GitHub Pages

Perfect for developers - deploy directly from a GitHub repository.

### Method 1: Deploy dist/ folder

**Step 1: Build your resume**

```bash
node src/cli.js build
```

**Step 2: Create a new GitHub repository**

Go to [github.com/new](https://github.com/new) and create a repository (e.g., `my-resume`).

**Step 3: Push the dist folder**

```bash
cd dist
git init
git add .
git commit -m "Deploy resume"
git branch -M main
git remote add origin https://github.com/yourusername/my-resume.git
git push -u origin main
```

**Step 4: Enable GitHub Pages**

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select `main` branch
3. Click **Save**

**Your resume will be live at:**
`https://yourusername.github.io/my-resume`

### Method 2: GitHub Actions (Automated)

Create `.github/workflows/deploy.yml` in your resume-crafter repo:

```yaml
name: Deploy Resume

on:
  push:
    branches: [ main ]
    paths:
      - 'resumes/**'
      - 'themes/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build resume
        run: node src/cli.js build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Now every time you update `resumes/resume.yaml` and push, your site rebuilds automatically!

---

## Netlify

Easiest option - drag and drop, or connect to GitHub.

### Method 1: Drag and Drop

**Step 1: Build your resume**

```bash
node src/cli.js build
```

**Step 2: Deploy to Netlify**

1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag the `dist/` folder onto the page
3. Done! Your site is live.

Netlify provides a URL like: `https://random-name-12345.netlify.app`

### Method 2: Netlify CLI

**Step 1: Install Netlify CLI**

```bash
npm install -g netlify-cli
```

**Step 2: Build and deploy**

```bash
# Build
node src/cli.js build

# Login to Netlify
netlify login

# Deploy
netlify deploy --dir=dist --prod
```

**Follow prompts to:**
- Create a new site or select existing
- Deploy to production

### Method 3: Continuous Deployment

Connect your GitHub repository to Netlify for automatic deployments.

**Step 1: Create `netlify.toml`** in your repo root:

```toml
[build]
  command = "npm install && node src/cli.js build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Step 2: Connect to Netlify**

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Choose GitHub and select your repository
4. Netlify auto-detects `netlify.toml` settings
5. Click **Deploy site**

Now every push to main automatically deploys!

---

## Vercel

Great for Next.js users, but works perfectly for static sites too.

### Method 1: Vercel CLI

**Step 1: Install Vercel CLI**

```bash
npm install -g vercel
```

**Step 2: Build and deploy**

```bash
# Build
node src/cli.js build

# Deploy
cd dist
vercel --prod
```

Follow prompts to deploy.

### Method 2: GitHub Integration

**Step 1: Create `vercel.json`** in repo root:

```json
{
  "buildCommand": "npm install && node src/cli.js build",
  "outputDirectory": "dist",
  "framework": null
}
```

**Step 2: Connect to Vercel**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel auto-detects settings
4. Click **Deploy**

Automatic deployments on every push!

---

## Custom Domain

All three platforms support custom domains for free.

### GitHub Pages

**Step 1: Add CNAME file**

In your `dist/` folder before deploying, create `CNAME`:

```
yourname.com
```

Or add it through GitHub UI:
- Settings → Pages → Custom domain

**Step 2: Configure DNS**

Add DNS records at your domain provider:

```
Type: A
Name: @
Value: 185.199.108.153
```

```
Type: A
Name: @
Value: 185.199.109.153
```

```
Type: CNAME
Name: www
Value: yourusername.github.io
```

**Step 3: Enable HTTPS**

In GitHub Pages settings, check **Enforce HTTPS** (may take a few minutes).

### Netlify

**Step 1: Add domain in Netlify**

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain (e.g., `yourname.com`)

**Step 2: Configure DNS**

Netlify shows you the DNS records to add:

```
Type: A
Name: @
Value: 75.2.60.5
```

```
Type: CNAME
Name: www
Value: [your-site].netlify.app
```

**Step 3: HTTPS**

Netlify automatically provisions SSL certificate (free via Let's Encrypt).

### Vercel

**Step 1: Add domain in Vercel**

1. Go to project **Settings** → **Domains**
2. Add your domain
3. Follow DNS configuration instructions

**Step 2: Configure DNS**

```
Type: A
Name: @
Value: 76.76.21.21
```

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Step 3: HTTPS**

Automatic SSL certificate from Let's Encrypt.

---

## CI/CD

Automate building and deployment when you update your resume.

### GitHub Actions + GitHub Pages

See [GitHub Pages Method 2](#method-2-github-actions-automated) above.

### GitHub Actions + Netlify

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: node src/cli.js build

      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: './dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

Add secrets in GitHub repo settings:
- `NETLIFY_AUTH_TOKEN` - From Netlify → User Settings → Applications
- `NETLIFY_SITE_ID` - From Netlify → Site Settings → General

---

## Best Practices

### 1. Test Before Deploying

Always preview locally first:

```bash
node src/cli.js build
open dist/index.html
```

### 2. Clean Builds

Delete dist/ before building to avoid stale files:

```bash
rm -rf dist
node src/cli.js build
```

Or the build command does this automatically.

### 3. Multi-Language Sites

Ensure all language versions work:

```bash
# Test each language
open dist/index.html       # Default or selector
open dist/fr/index.html    # French
open dist/es/index.html    # Spanish
```

### 4. Mobile Testing

Test on mobile devices or browser dev tools:
- Chrome: F12 → Toggle device toolbar
- Safari: Develop → Enter Responsive Design Mode

### 5. Print Testing

Test PDF export:
- Cmd/Ctrl + P
- Check page breaks
- Verify colors and layout

---

## Troubleshooting

### 404 Errors on Language Pages

**Problem:** `/fr/` returns 404

**Solution (GitHub Pages):** Ensure `/fr/index.html` exists in deployed files

**Solution (Netlify/Vercel):** Add redirects configuration (see platform sections above)

### CSS Not Loading

**Problem:** Styles missing, unstyled HTML

**Solution:** Check console for errors, verify `styles.css` is in `dist/`

### Custom Domain Not Working

**Problem:** Domain shows "Site not found"

**Solution:**
1. Verify DNS records are correct (use `dig yourname.com`)
2. Wait for DNS propagation (can take up to 48 hours)
3. Clear browser cache
4. Check platform status page

### HTTPS Redirect Loop

**Problem:** Page keeps redirecting

**Solution:** Disable "Force HTTPS" temporarily, clear cache, re-enable

---

## Costs

All recommended platforms are **free** for static sites:

| Platform | Free Tier | Bandwidth | Build Minutes |
|----------|-----------|-----------|---------------|
| **GitHub Pages** | ✅ Free | 100GB/month | Unlimited |
| **Netlify** | ✅ Free | 100GB/month | 300 min/month |
| **Vercel** | ✅ Free | 100GB/month | Unlimited |

For a resume website, free tiers are **more than sufficient**.

---

## Next Steps

After deploying:

1. **Share your resume** - Add the URL to your email signature, LinkedIn, etc.
2. **Update regularly** - Push changes to keep your resume current
3. **Monitor analytics** - Add Google Analytics or Netlify Analytics to track visitors

---

## Related Documentation

- **[Getting Started](getting-started.md)** - Build your resume
- **[CLI Reference](cli-reference.md)** - Build commands
- **[Multi-Language](multi-language.md)** - Deploy multilingual sites

---

**Need help?** Open an issue on [GitHub](https://github.com/JasonBenett/resume-crafter/issues)
