# Contributing to Collaborative Knowledge Hub

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/collabrative-knowledge-hub.git
   cd collabrative-knowledge-hub
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables (see README.md)

5. Run development server:
   ```bash
   npm run dev
   ```

## Code Standards

### TypeScript
- Use strict TypeScript
- Define proper types/interfaces
- Avoid `any` type unless absolutely necessary
- Use type inference where appropriate

### React
- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use proper prop types

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Ensure dark mode compatibility
- Maintain accessibility standards

### Code Formatting
- Run Prettier before committing:
  ```bash
  npm run format
  ```

- Run ESLint:
  ```bash
  npm run lint
  ```

## Commit Guidelines

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```
feat: add article search functionality
fix: resolve comment threading issue
docs: update deployment guide
```

## Pull Request Process

1. Create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

3. Push to your fork:
   ```bash
   git push origin feat/your-feature-name
   ```

4. Open a Pull Request with:
   - Clear description of changes
   - Screenshots (if UI changes)
   - Test results
   - Related issue numbers

5. Ensure CI passes:
   - All tests pass
   - Linting passes
   - Type checking passes
   - Build succeeds

## Testing

- Write tests for new features
- Update tests for bug fixes
- Run tests before submitting PR:
  ```bash
  npm test
  ```

## Areas for Contribution

### High Priority
- Additional authentication providers (Google, GitHub)
- Article search functionality
- User notifications
- Article tags/categories
- Export articles (PDF, Markdown)

### Medium Priority
- User profiles page
- Article analytics
- Collaborative editing
- File attachments
- Email notifications

### Low Priority
- Admin dashboard
- Activity feed
- User mentions
- Bookmarks/favorites
- API documentation

## Questions?

Open an issue for:
- Bug reports
- Feature requests
- Questions about the codebase
- Suggestions for improvements

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
