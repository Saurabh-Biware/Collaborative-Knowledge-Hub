# Quick Start Guide

Get your Collaborative Knowledge Hub running in 10 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- A Supabase account (free)

## Step 1: Clone and Install (2 minutes)

```bash
git clone <your-repo-url>
cd collabrative-knowledge-hub
npm install
```

## Step 2: Supabase Setup (3 minutes)

1. Go to [supabase.com](https://supabase.com) and create account
2. Click "New Project"
3. Fill in:
   - Project name: `knowledge-hub`
   - Database password: (save this!)
   - Region: Choose closest to you
4. Wait for project to initialize (~2 minutes)

## Step 3: Database Schema (2 minutes)

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy entire contents of `supabase/schema.sql`
4. Paste and click "Run"
5. Verify success (should see "Success. No rows returned")

## Step 4: Get API Keys (1 minute)

1. In Supabase, go to **Settings** > **API**
2. Copy these values:
   - Project URL
   - `anon` `public` key
   - `service_role` key (keep secret!)

## Step 5: Configure Environment (1 minute)

```bash
cp .env.example .env
```

Edit `.env` and paste your Supabase values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

## Step 6: Run the App (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 7: Create Your First User

1. Click "Sign In" in top right
2. Click "Don't have an account? Sign Up"
3. Enter:
   - Full Name: Your Name
   - Email: your@email.com
   - Password: (min 6 characters)
4. Check your email for confirmation link
5. Click confirmation link

## Step 8: Update User Role (Important!)

By default, new users are "viewers". To create articles, you need "editor" role:

1. In Supabase dashboard, go to **Table Editor**
2. Select `profiles` table
3. Find your user row
4. Click on the `role` cell
5. Change from `viewer` to `editor`
6. Save

## Step 9: Create Your First Article

1. Refresh the app
2. Click "New Article" button
3. Enter title and content
4. Click "Create Article"
5. View your published article!

## Troubleshooting

### "Failed to fetch" error
- Check `.env` file has correct Supabase URL
- Verify Supabase project is running (not paused)

### Can't sign up
- Check email provider is enabled in Supabase
- Go to **Authentication** > **Providers** > Enable Email

### Can't create articles
- Verify your user role is `editor` or `admin` in profiles table

### Database connection error
- Verify schema was run successfully
- Check all tables exist in Table Editor

## Next Steps

- Read [README.md](README.md) for full documentation
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Check [ARCHITECTURE.md](ARCHITECTURE.md) to understand the system

## Common Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linter
npm run format       # Format code
npm test             # Run tests
```

## Need Help?

- Check existing GitHub issues
- Create new issue with error details
- Include browser console errors
- Include server logs if applicable

## What's Next?

Now that you have the app running:

1. Explore the features:
   - Create multiple articles
   - Add comments
   - Try nested replies
   - Check version history
   - Toggle dark mode

2. Customize:
   - Update colors in `tailwind.config.js`
   - Modify layout in `src/components/Layout.tsx`
   - Add your logo

3. Deploy:
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md)
   - Deploy to Vercel (free)
   - Share with your team!

Enjoy your Knowledge Hub! 🚀
