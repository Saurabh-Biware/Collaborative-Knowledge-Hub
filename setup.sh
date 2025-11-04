#!/bin/bash

# Collaborative Knowledge Hub - Setup Script
# This script helps you set up the project quickly

set -e

echo "🚀 Collaborative Knowledge Hub - Setup Script"
echo "=============================================="
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18 or higher is required"
    echo "   Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "⚙️  Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file with your Supabase credentials"
    echo "   1. Go to https://supabase.com"
    echo "   2. Create a new project"
    echo "   3. Get your API keys from Settings > API"
    echo "   4. Update .env file with your keys"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Check if Supabase credentials are set
if grep -q "your_supabase_project_url" .env; then
    echo "⚠️  WARNING: Supabase credentials not configured in .env"
    echo "   Please update .env with your actual Supabase credentials"
    echo ""
fi

echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Configure Supabase:"
echo "   - Create project at https://supabase.com"
echo "   - Run SQL from supabase/schema.sql in SQL Editor"
echo "   - Update .env with your credentials"
echo ""
echo "2. Start development server:"
echo "   npm run dev"
echo ""
echo "3. Open browser:"
echo "   http://localhost:3000"
echo ""
echo "4. Create your first user:"
echo "   - Click 'Sign In' > 'Sign Up'"
echo "   - Verify email"
echo "   - Update role to 'editor' in Supabase profiles table"
echo ""
echo "📚 Documentation:"
echo "   - Quick Start: QUICKSTART.md"
echo "   - Full Docs: README.md"
echo "   - Deployment: DEPLOYMENT.md"
echo ""
echo "✨ Setup complete! Happy coding!"
