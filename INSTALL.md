# Installation Instructions

## Quick Install (Recommended)

Run the automated setup script:

```bash
./setup.sh
```

This will:
- Check Node.js version
- Install dependencies
- Create .env file
- Show next steps

## Manual Installation

### Step 1: Prerequisites

Ensure you have:
- **Node.js 18+**: `node --version`
- **npm**: `npm --version`
- **Git**: `git --version`

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- Next.js 14
- React 18
- Apollo Client & Server
- Supabase client
- TipTap editor
- Tailwind CSS
- TypeScript
- Testing libraries

### Step 3: Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_GRAPHQL_ENDPOINT=/api/graphql
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Database Setup

1. Create Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Copy contents of `supabase/schema.sql`
4. Paste and execute
5. Verify tables created in Table Editor

### Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Verification

### Check Installation

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Tests
npm test

# Build
npm run build
```

All should pass without errors.

### Test Features

1. **Authentication**
   - Sign up new user
   - Verify email
   - Sign in
   - Sign out

2. **Articles**
   - Create article (need editor role)
   - View article
   - Edit article
   - Check version history

3. **Comments**
   - Add comment
   - Reply to comment
   - Edit comment
   - Delete comment

4. **UI**
   - Toggle dark mode
   - Test responsive design
   - Check navigation

## Troubleshooting

### "Module not found" errors

```bash
rm -rf node_modules package-lock.json
npm install
```

### "Cannot connect to database"

- Check Supabase URL in `.env`
- Verify project is not paused
- Check internet connection

### "Authentication failed"

- Verify Supabase keys in `.env`
- Check email provider enabled
- Clear browser cookies

### Port 3000 already in use

```bash
# Use different port
PORT=3001 npm run dev
```

### Build fails

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## Development Tools

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GraphQL
- TypeScript

### Browser Extensions

- React Developer Tools
- Apollo Client Devtools

## Scripts Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run format:check     # Check formatting
npm run type-check       # TypeScript check

# Testing
npm test                 # Run tests (watch mode)
npm run test:ci          # Run tests (CI mode)
```

## Project Structure

```
collabrative-knowledge-hub/
├── src/
│   ├── components/      # React components
│   ├── pages/           # Next.js pages & API routes
│   ├── graphql/         # GraphQL schema & resolvers
│   ├── lib/             # Core libraries
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   └── styles/          # Global styles
├── supabase/            # Database schema
├── public/              # Static assets
└── .github/             # CI/CD workflows
```

## Next Steps

After installation:

1. **Read Documentation**
   - [README.md](README.md) - Full documentation
   - [QUICKSTART.md](QUICKSTART.md) - Quick start guide
   - [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture

2. **Configure Supabase**
   - Run database schema
   - Enable authentication
   - Set up user roles

3. **Customize**
   - Update branding
   - Modify theme colors
   - Add your logo

4. **Deploy**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md)
   - Deploy to Vercel
   - Configure production environment

## Getting Help

- **Documentation**: Check all .md files
- **Issues**: Search GitHub issues
- **Community**: Open discussion
- **Support**: Create new issue

## System Requirements

### Minimum
- Node.js 18.0.0
- 2 GB RAM
- 500 MB disk space

### Recommended
- Node.js 20.0.0+
- 4 GB RAM
- 1 GB disk space
- SSD storage

## Dependencies

### Production Dependencies
- next: ^14.0.4
- react: ^18.2.0
- @apollo/client: ^3.8.8
- @supabase/supabase-js: ^2.39.0
- @tiptap/react: ^2.1.13
- graphql: ^16.8.1
- zod: ^3.22.4
- date-fns: ^3.0.6

### Development Dependencies
- typescript: ^5.3.3
- @types/react: ^18.2.46
- eslint: ^8.56.0
- prettier: ^3.1.1
- jest: ^29.7.0
- tailwindcss: ^3.4.0

## Platform Support

### Operating Systems
- ✅ macOS
- ✅ Linux
- ✅ Windows (WSL recommended)

### Browsers
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ⚠️ IE11 (not supported)

### Node.js Versions
- ✅ Node 18.x (LTS)
- ✅ Node 20.x (LTS)
- ✅ Node 21.x
- ❌ Node 16.x (too old)

## Security Notes

1. **Never commit `.env` file**
2. **Keep service role key secret**
3. **Use strong passwords**
4. **Enable 2FA on accounts**
5. **Regular dependency updates**

## Performance Tips

1. **Use production build**: `npm run build && npm start`
2. **Enable caching**: Apollo Client cache
3. **Optimize images**: Use next/image
4. **Monitor bundle size**: Check build output
5. **Use CDN**: Vercel Edge Network

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Check security advisories
- Monitor error logs
- Review performance metrics
- Backup database

### Updates

```bash
# Check outdated packages
npm outdated

# Update dependencies
npm update

# Update major versions (carefully)
npm install package@latest
```

## Uninstall

To remove the project:

```bash
# Remove dependencies
rm -rf node_modules

# Remove build artifacts
rm -rf .next

# Remove environment
rm .env

# Remove project (careful!)
cd ..
rm -rf collabrative-knowledge-hub
```

---

**Installation complete! 🎉**

For questions, check [README.md](README.md) or open an issue.
