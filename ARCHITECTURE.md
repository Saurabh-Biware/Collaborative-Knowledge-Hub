# Architecture Documentation

## System Overview

The Collaborative Knowledge Hub is a full-stack web application built with a modern serverless architecture, optimized for free-tier hosting platforms.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js 14 (React 18)                               │   │
│  │  - Server-Side Rendering (SSR)                       │   │
│  │  - Static Site Generation (SSG)                      │   │
│  │  - Client-Side Rendering (CSR)                       │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Apollo Client                                        │   │
│  │  - GraphQL queries/mutations                         │   │
│  │  - Caching & state management                        │   │
│  │  - Polling for real-time updates                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                      API Layer (Vercel)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Apollo Server (Serverless Functions)                │   │
│  │  - GraphQL API endpoint                              │   │
│  │  - Authentication middleware                         │   │
│  │  - Input validation                                  │   │
│  │  - Error handling                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ PostgreSQL Protocol
┌─────────────────────────────────────────────────────────────┐
│                   Database Layer (Supabase)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  PostgreSQL Database                                  │   │
│  │  - Row Level Security (RLS)                          │   │
│  │  - Triggers & Functions                              │   │
│  │  - Indexes for performance                           │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Supabase Auth                                        │   │
│  │  - JWT-based authentication                          │   │
│  │  - Email/password provider                           │   │
│  │  - Session management                                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router, SSR, and API routes
- **React 18**: UI library with hooks and concurrent features
- **TypeScript**: Static typing for better DX and fewer bugs
- **Apollo Client**: GraphQL client with caching
- **TipTap**: Rich text editor built on ProseMirror
- **Tailwind CSS**: Utility-first CSS framework
- **date-fns**: Date formatting and manipulation

### Backend
- **Apollo Server**: GraphQL server running as serverless functions
- **Supabase**: Backend-as-a-Service (BaaS)
  - PostgreSQL database
  - Authentication service
  - Row Level Security
- **GraphQL**: API query language

### DevOps & Testing
- **Jest**: Testing framework
- **React Testing Library**: Component testing
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **GitHub Actions**: CI/CD pipeline
- **Vercel**: Hosting and deployment

## Data Flow

### Article Creation Flow
```
1. User fills form in Editor component
2. Form submission triggers Apollo mutation
3. Apollo Client sends GraphQL mutation to /api/graphql
4. Apollo Server validates JWT token
5. Resolver checks user permissions (editor/admin role)
6. Supabase client inserts article into database
7. RLS policies verify user has permission
8. Article version is automatically created (trigger)
9. Response returns to client
10. Apollo Client updates cache
11. UI reflects new article
```

### Real-time Updates Flow
```
1. Apollo Client configured with pollInterval: 5000ms
2. Every 5 seconds, queries are re-executed
3. New data fetched from GraphQL API
4. Apollo cache compares with existing data
5. If changes detected, components re-render
6. UI updates with latest data
```

## Security Architecture

### Authentication
- JWT tokens issued by Supabase Auth
- Tokens stored in httpOnly cookies (secure)
- Token validation on every API request
- Automatic token refresh

### Authorization
- Role-Based Access Control (RBAC)
  - **Admin**: Full access (CRUD all resources)
  - **Editor**: Create/update articles, comment
  - **Viewer**: Read published articles, comment
- Row Level Security (RLS) at database level
- GraphQL resolver-level permission checks

### Data Protection
- HTTPS enforced (TLS 1.3)
- Environment variables for secrets
- Service role key never exposed to client
- Input validation with Zod schemas
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitized HTML output)

## Database Schema

### Entity Relationship Diagram
```
┌─────────────┐         ┌──────────────┐
│  profiles   │◄────────│   articles   │
│             │ author  │              │
│ - id (PK)   │         │ - id (PK)    │
│ - email     │         │ - title      │
│ - role      │         │ - content    │
└─────────────┘         │ - author_id  │
      ▲                 │ - status     │
      │                 └──────────────┘
      │                       │
      │                       │
      │                 ┌─────▼──────────────┐
      │                 │ article_versions   │
      │                 │                    │
      │                 │ - id (PK)          │
      │                 │ - article_id (FK)  │
      │                 │ - version_number   │
      │                 └────────────────────┘
      │
      │                 ┌──────────────┐
      └─────────────────│   comments   │
              author    │              │
                        │ - id (PK)    │
                        │ - article_id │
                        │ - author_id  │
                        │ - parent_id  │
                        └──────────────┘
```

## Component Architecture

### Component Hierarchy
```
App (_app.tsx)
├── ApolloProvider
└── Layout
    ├── Navigation
    │   ├── Logo
    │   ├── ThemeToggle
    │   └── AuthButtons
    └── Main Content
        ├── Home (index.tsx)
        │   └── ArticleList
        ├── ArticlePage ([id].tsx)
        │   ├── ArticleContent
        │   ├── CommentThread
        │   │   └── CommentItem (recursive)
        │   └── VersionHistory
        ├── NewArticlePage (new.tsx)
        │   └── Editor
        └── AuthPage (auth.tsx)
            └── AuthForm
```

## State Management

### Apollo Client Cache
- Normalized cache for GraphQL data
- Automatic cache updates on mutations
- Optimistic UI updates
- Cache persistence (optional)

### React State
- Local component state with useState
- Authentication state with useAuth hook
- Theme state in localStorage

## Performance Optimizations

### Frontend
- Code splitting with Next.js dynamic imports
- Image optimization with next/image
- CSS purging with Tailwind
- Lazy loading of components
- Memoization with React.memo
- Virtual scrolling for long lists (future)

### Backend
- Database indexes on foreign keys
- Query optimization with proper JOINs
- Connection pooling (Supabase)
- Serverless function cold start optimization

### Caching Strategy
- Apollo Client cache (in-memory)
- Browser cache for static assets
- CDN caching (Vercel Edge Network)
- Database query result caching (future)

## Scalability Considerations

### Horizontal Scaling
- Serverless functions auto-scale
- Stateless API design
- Database connection pooling

### Vertical Scaling
- Upgrade Supabase plan for more resources
- Optimize database queries
- Add read replicas (Supabase Pro)

### Future Enhancements
- Redis for caching
- WebSocket for true real-time updates
- CDN for media files
- Search engine (Algolia/Elasticsearch)
- Message queue for async tasks

## Monitoring & Observability

### Logging
- Server-side logs in Vercel
- Database logs in Supabase
- Client-side error tracking (future: Sentry)

### Metrics
- Vercel Analytics for performance
- Supabase dashboard for DB metrics
- Custom metrics (future)

### Alerts
- Build failure notifications (GitHub)
- Error rate monitoring (future)
- Database usage alerts (Supabase)

## Deployment Pipeline

```
Developer Push
      ↓
GitHub Repository
      ↓
GitHub Actions (CI)
  - Lint
  - Type Check
  - Test
  - Build
      ↓
Vercel (CD)
  - Deploy Preview (PR)
  - Deploy Production (main)
      ↓
Production Environment
```

## API Design

### GraphQL Schema Design
- Type-first approach
- Nullable vs non-nullable fields
- Pagination (future: cursor-based)
- Error handling with GraphQL errors

### REST Alternative
Current implementation uses GraphQL, but REST endpoints can be added:
- `/api/articles` - GET, POST
- `/api/articles/[id]` - GET, PUT, DELETE
- `/api/comments` - GET, POST

## Security Best Practices

1. **Never expose service role key to client**
2. **Always validate input on server**
3. **Use RLS policies for data access**
4. **Sanitize user-generated content**
5. **Rate limit API endpoints** (future)
6. **Implement CSRF protection**
7. **Use secure headers** (Vercel default)
8. **Regular dependency updates**

## Testing Strategy

### Unit Tests
- Component logic
- Utility functions
- Validation schemas

### Integration Tests
- API endpoints
- Database operations
- Authentication flow

### E2E Tests (Future)
- User workflows
- Critical paths
- Cross-browser testing

## Disaster Recovery

### Backup Strategy
- Supabase Pro: Daily automated backups
- Free tier: Manual exports
- Code: Git repository

### Recovery Plan
1. Restore database from backup
2. Redeploy application from Git
3. Verify environment variables
4. Test critical functionality

## Cost Optimization

### Free Tier Limits
- Vercel: 100 GB bandwidth/month
- Supabase: 500 MB database, 2 GB bandwidth
- GitHub Actions: 2000 minutes/month

### Optimization Tips
- Optimize images to reduce bandwidth
- Use efficient queries to reduce DB load
- Cache aggressively
- Monitor usage regularly

## Future Architecture Improvements

1. **Microservices**: Split into separate services
2. **Event-Driven**: Use message queues
3. **CQRS**: Separate read/write models
4. **GraphQL Federation**: Distributed schema
5. **Edge Computing**: Deploy to edge locations
6. **Real-time**: WebSocket subscriptions
7. **Search**: Full-text search engine
8. **Analytics**: User behavior tracking
