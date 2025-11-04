# Vercel Deployment Setup

## Step 1: Add Environment Variables in Vercel

Go to your Vercel project dashboard:

1. Click on your project
2. Go to **Settings** → **Environment Variables**
3. Add the following variables:

### Required Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co
Environments: Production, Preview, Development
```

```
NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGc...
Environments: Production, Preview, Development
```

```
SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGc...
Environments: Production, Preview, Development
```

```
NEXT_PUBLIC_GRAPHQL_ENDPOINT
Value: /api/graphql
Environments: Production, Preview, Development
```

```
NEXT_PUBLIC_APP_URL
Value: https://your-app.vercel.app
Environments: Production, Preview, Development
```

## Step 2: Get Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → Use for `SUPABASE_SERVICE_ROLE_KEY`

## Step 3: Update Supabase Settings

After deploying to Vercel:

1. Go to Supabase dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Vercel URL:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: `https://your-app.vercel.app/**`

## Step 4: Redeploy

After adding environment variables:

1. Go to **Deployments** tab in Vercel
2. Click on the latest deployment
3. Click **Redeploy**
4. Select "Use existing Build Cache" (optional)
5. Click **Redeploy**

## Troubleshooting

### Error: "supabaseUrl is required"
- Ensure all environment variables are added in Vercel
- Check variable names match exactly (case-sensitive)
- Verify no extra spaces in values
- Redeploy after adding variables

### Error: "Unauthorized"
- Check `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Verify the key is the service_role key, not anon key
- Ensure RLS policies are enabled in Supabase

### Build Fails
- Check build logs in Vercel
- Verify all dependencies are in package.json
- Ensure TypeScript has no errors locally

## Quick Checklist

- [ ] All 5 environment variables added in Vercel
- [ ] Variables set for all environments (Production, Preview, Development)
- [ ] Supabase redirect URLs updated with Vercel domain
- [ ] Redeployed after adding variables
- [ ] Tested authentication in production
- [ ] Tested article creation in production

## Environment Variables Summary

| Variable | Required | Where to Get |
|----------|----------|--------------|
| NEXT_PUBLIC_SUPABASE_URL | Yes | Supabase Settings → API |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Yes | Supabase Settings → API |
| SUPABASE_SERVICE_ROLE_KEY | Yes | Supabase Settings → API |
| NEXT_PUBLIC_GRAPHQL_ENDPOINT | Yes | Use `/api/graphql` |
| NEXT_PUBLIC_APP_URL | Yes | Your Vercel domain |

## Support

If issues persist:
1. Check Vercel function logs
2. Check browser console for errors
3. Verify Supabase project is not paused
4. Test locally with production environment variables
