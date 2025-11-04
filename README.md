# Collaborative Knowledge Hub

A production-ready web application for collaborative knowledge management with real-time features, built with TypeScript, React, Next.js, Apollo GraphQL, and Supabase.

## Features

- 📝 Rich text article editor with TipTap
- 💬 Threaded comments and discussions
- 📚 Version history tracking
- 🔐 Secure authentication with Supabase Auth
- 🌓 Dark/Light theme support
- 🔄 Real-time updates via polling
- 🎨 Responsive design with Tailwind CSS
- 🔒 Row-level security (RLS) policies
- 🚀 Serverless GraphQL API

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Apollo Client** - GraphQL client
- **TipTap** - Rich text editor
- **Tailwind CSS** - Styling

### Backend
- **Apollo Server** - GraphQL API (serverless)
- **Supabase** - PostgreSQL database + Authentication
- **Row Level Security** - Database-level authorization

### DevOps
- **Vercel** - Frontend & API hosting
- **GitHub Actions** - CI/CD pipeline
- **Jest** - Testing framework

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier)
- Vercel account (optional, for deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd collabrative-knowledge-hub
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL schema from `supabase/schema.sql` in the SQL Editor
   - Enable Email authentication in Authentication settings

4. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── .github/workflows/    # CI/CD pipelines
├── src/
│   ├── components/       # React components
│   │   ├── AuthForm.tsx
│   │   ├── CommentThread.tsx
│   │   ├── Editor.tsx
│   │   ├── Layout.tsx
│   │   └── VersionHistory.tsx
│   ├── graphql/          # GraphQL schema & resolvers
│   │   ├── schema.ts
│   │   └── resolvers.ts
│   ├── hooks/            # Custom React hooks
│   │   └── useAuth.ts
│   ├── lib/              # Utility libraries
│   │   ├── apollo-client.ts
│   │   └── supabase.ts
│   ├── pages/            # Next.js pages
│   │   ├── api/
│   │   │   └── graphql.ts
│   │   ├── articles/
│   │   │   ├── [id].tsx
│   │   │   └── new.tsx
│   │   ├── _app.tsx
│   │   ├── auth.tsx
│   │   └── index.tsx
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript types
│   └── __tests__/        # Test files
├── supabase/
│   └── schema.sql        # Database schema
└── package.json
```

## Database Schema

### Tables
- **profiles** - User profiles with roles (admin, editor, viewer)
- **articles** - Knowledge base articles
- **article_versions** - Version history for articles
- **comments** - Threaded comments on articles

### Security
- Row Level Security (RLS) enabled on all tables
- Role-based access control (RBAC)
- Authenticated users can comment
- Editors can create/update articles
- Admins can delete articles

## GraphQL API

### Queries
```graphql
me: User
articles(status: String): [Article!]!
article(id: ID!): Article
articleVersions(articleId: ID!): [ArticleVersion!]!
comments(articleId: ID!): [Comment!]!
```

### Mutations
```graphql
createArticle(title: String!, content: String!): Article!
updateArticle(id: ID!, title: String, content: String, status: String): Article!
deleteArticle(id: ID!): Boolean!
createComment(articleId: ID!, content: String!, parentId: ID): Comment!
updateComment(id: ID!, content: String!): Comment!
deleteComment(id: ID!): Boolean!
```

## Testing

Run tests:
```bash
npm test
```

Run tests in CI mode:
```bash
npm run test:ci
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm start
```

## Environment Variables

Required for production:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_GRAPHQL_ENDPOINT=/api/graphql
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript compiler check
- `npm test` - Run tests in watch mode
- `npm run test:ci` - Run tests in CI mode

## Features in Detail

### Authentication
- Email/password authentication via Supabase Auth
- Automatic profile creation on signup
- Protected routes for authenticated users
- Role-based permissions

### Article Management
- Rich text editing with formatting options
- Draft/Published/Archived status
- Automatic version creation on updates
- Version history viewer with restore capability

### Comments
- Threaded discussions
- Nested replies
- Real-time updates via polling (5s interval)
- Edit/delete own comments

### Real-time Updates
- Configurable polling intervals (default: 5s)
- Automatic cache updates with Apollo Client
- Optimistic UI updates

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

## Security Best Practices

- Environment variables for sensitive data
- Row Level Security (RLS) in database
- Input validation with Zod
- CSRF protection
- XSS prevention
- SQL injection prevention via parameterized queries

## Performance Optimizations

- Server-side rendering (SSR)
- Static generation where applicable
- Image optimization
- Code splitting
- Lazy loading
- Apollo Client caching

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
