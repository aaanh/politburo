# Contributing to PolitBuro

Thank you for your interest in contributing to PolitBuro! This project aims to model and display governmental organizations, with a current focus on Vietnam's government structure.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/politburo.git
   cd politburo
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

## Development Setup

1. Copy `.env.example` to `.env.local` and configure:
   - Neon.tech database credentials
   - Other environment variables
2. Start the development server:
   ```bash
   pnpm dev
   ```

## Project Structure

This is a Turborepo monorepo with:

### Frontend (`apps/frontend/`)
- Next.js 15 + React 19
- Tailwind CSS v4
- Shadcn UI components
- i18n for internationalization
- Drizzle ORM (to be decoupled)
- Neon.tech database (to be decoupled)

### Backend (Under Development)
- Planned Golang-based backend
- Currently under evaluation

## Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Run tests:
   ```bash
   pnpm test
   ```
4. Commit using conventional commits:
   ```bash
   git commit -m "feat: add new feature"
   ```

## Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Push to your fork and submit a pull request
4. Reference any relevant issues

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or modifying tests
- `chore:` Maintenance tasks

## Code Style

- Use TypeScript
- Follow ESLint rules
- Write meaningful comments
- Use descriptive variable names

## Localization

- Add new strings to locale files in `src/locales/`
- Support all existing languages (en, fr, de, vi)
- Vietnamese (vi) translations are particularly important for this project

## Current Focus Areas

1. Frontend development and UI improvements
2. Decoupling backend/database layer
3. Vietnamese government organization modeling
4. Performance optimization

## Questions?

Feel free to open an issue for any questions or concerns.

## License

By contributing, you agree that your contributions will be licensed under the project's license.
