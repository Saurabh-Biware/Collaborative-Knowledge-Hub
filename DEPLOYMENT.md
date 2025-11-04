# Deployment Guide

## Supabase Setup (Free Tier)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Fill in project details:
   - Name: collaborative-knowledge-hub
   - Database Password: (generate strong password)
   - Region: Choose closest to your users
   - Pricing Plan: Free

### 2. Run Database Schema

1. Navigate to SQL Editor in Supabase dashboard
2. Copy contents of `supabase/schema.sql`
3. Paste and run the SQL script
4. Verify tables created in Table Editor

### 3. Configure Authentication

1. Go to Authentication > Settings
2. Enable Email provider
3. Configure email templates (optional)
4. Set Site URL to your domain (or localhost for dev)
5. Add redirect URLs for production

### 4. Get API Keys

1. Go to Settings > API
2. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

## Vercel Deployment (Free Tier)

### 1. Prepare Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

### 3. Add Environment Variables

In Vercel dashboard, go to Settings > Environment Variables and add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_GRAPHQL_ENDPOINT=/api/graphql
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
```

### 4. Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Visit your deployed site

### 5. Update Supabase Settings

1. Go back to Supabase dashboard
2. Authentication > URL Configuration
3. Add your Vercel URL to:
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/**`

## Alternative: Netlify Deployment

### 1. Create netlify.toml

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 2. Deploy

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Connect to GitHub and select repository
4. Add environment variables (same as Vercel)
5. Deploy

## GitHub Actions Setup

The CI/CD pipeline is already configured in `.github/workflows/ci.yml`.

### Add Secrets to GitHub

1. Go to repository Settings > Secrets and variables > Actions
2. Add secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The workflow will:
- Run on push to main/develop branches
- Execute linting, type checking, and tests
- Build the application
- Automatically deploy via Vercel/Netlify integration

## Custom Domain (Optional)

### Vercel

1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update Supabase redirect URLs

### Netlify

1. Go to Site Settings > Domain Management
2. Add custom domain
3. Configure DNS
4. Update Supabase redirect URLs

## Monitoring & Maintenance

### Vercel Analytics

1. Enable in Vercel dashboard
2. Monitor performance and usage
3. Free tier includes basic analytics

### Supabase Monitoring

1. Check Database > Usage
2. Monitor API requests
3. Review logs in Logs Explorer

### Free Tier Limits

**Supabase Free Tier:**
- 500 MB database space
- 1 GB file storage
- 2 GB bandwidth
- 50,000 monthly active users
- Paused after 1 week of inactivity

**Vercel Free Tier:**
- 100 GB bandwidth per month
- Unlimited deployments
- Automatic HTTPS
- Serverless function execution: 100 GB-hours

## Troubleshooting

### Build Fails

1. Check environment variables are set
2. Verify Node.js version (18+)
3. Clear cache and rebuild
4. Check build logs for errors

### Database Connection Issues

1. Verify Supabase URL and keys
2. Check RLS policies are enabled
3. Ensure schema is properly migrated
4. Check Supabase project is not paused

### Authentication Issues

1. Verify redirect URLs in Supabase
2. Check email provider is enabled
3. Ensure NEXT_PUBLIC_APP_URL is correct
4. Clear browser cookies and try again

### GraphQL API Issues

1. Check `/api/graphql` endpoint is accessible
2. Verify Apollo Server configuration
3. Check serverless function logs
4. Ensure proper CORS headers

## Scaling Beyond Free Tier

When you outgrow free tiers:

### Supabase
- Pro Plan: $25/month
  - 8 GB database
  - 100 GB bandwidth
  - Daily backups

### Vercel
- Pro Plan: $20/month per user
  - 1 TB bandwidth
  - Advanced analytics
  - Team collaboration

### Alternative Backends
- Railway (PostgreSQL hosting)
- PlanetScale (MySQL)
- Heroku Postgres
- AWS RDS (PostgreSQL)

## Backup Strategy

### Database Backups

1. Supabase Pro includes daily backups
2. For free tier, export data regularly:
   ```bash
   pg_dump -h db.xxx.supabase.co -U postgres -d postgres > backup.sql
   ```

### Code Backups

- GitHub repository serves as code backup
- Tag releases for version control
- Use GitHub Releases for production versions

## Security Checklist

- [ ] Environment variables are set correctly
- [ ] Service role key is kept secret
- [ ] RLS policies are enabled
- [ ] HTTPS is enforced
- [ ] CORS is properly configured
- [ ] Rate limiting is considered
- [ ] Input validation is implemented
- [ ] SQL injection prevention via parameterized queries
- [ ] XSS prevention in rich text editor
- [ ] Authentication tokens are secure

## Performance Optimization

1. Enable Vercel Analytics
2. Use Next.js Image optimization
3. Implement caching strategies
4. Monitor Core Web Vitals
5. Optimize bundle size
6. Use CDN for static assets
7. Enable compression
8. Lazy load components

## Post-Deployment

1. Test all features in production
2. Verify authentication flow
3. Test article creation and editing
4. Check comments functionality
5. Verify version history
6. Test dark mode toggle
7. Check mobile responsiveness
8. Monitor error logs
9. Set up uptime monitoring (e.g., UptimeRobot)
10. Configure error tracking (e.g., Sentry)
