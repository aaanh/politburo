# PolitBuro

A modern Vietnamese Government organization chart visualization project built with Next.js and TypeScript. This project provides an interactive and visually appealing way to explore governmental structures.

## Why I Built This

As we approach the 50th anniversary of April 30th in Vietnam, I felt motivated to create something meaningful that connects technology with our governmental history. I noticed there wasn't a modern, centralized portal where people could easily explore and understand Vietnam's organizational structure.

This project also served as a perfect opportunity for me to upskill technically, particularly in implementing a closure table schema, a pattern for handling hierarchical data structures in SQL databases, as well as frontend rendering techniques.

## Tech Stack

### Frontend (Next.js Application)
- **Framework**: Next.js 15 + React 19
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS v4
  - Shadcn UI components
  - Some Custom UI components
- **State Management**: React Context
- **Internationalization**: i18next + i18nexus
- **Database ORM**: Drizzle ORM
- **Database**: Neon PostgreSQL

### Infrastructure
- **Package Manager**: pnpm
- **Monorepo Management**: Turborepo
- **Deployment**: Vercel
- **CDN/DNS**: Cloudflare
- **Development Tools**:
  - ESLint
  - TypeScript
  - Turbopack

## Project Structure

```
politburo/
├── apps/
│   └── frontend/          # Next.js application
├── packages/              # Shared packages (future use)
└── ...configuration files
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/politburo.git
   cd politburo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env.local`
   - Configure required environment variables:
     - `DATABASE_URL`: Neon PostgreSQL connection string
     - `I18NEXUS_API_KEY`: i18nexus API key
     - `VERCEL_OIDC_TOKEN`: Vercel authentication token

4. **Development**
   ```bash
   pnpm dev
   ```

5. **Database Operations**
   ```bash
   # Generate migrations
   pnpm run db:generate
   
   # Apply migrations
   pnpm run db:migrate
   ```

## Deployment

The project is configured for deployment on Vercel with the following setup:

1. **Frontend Deployment**
   - Connect your GitHub repository to Vercel
   - Configure environment variables in Vercel dashboard
   - Enable automatic deployments

2. **Database**
   - Set up a Neon PostgreSQL database
   - Configure the connection string in Vercel environment variables

3. **CDN Configuration**
   - Configure Cloudflare for CDN and DNS management
   - Set up appropriate caching rules

## Internationalization

The project supports multiple languages:
- English (en)
- Vietnamese (vi)
- French (fr)
- German (de)

Language files are managed through i18nexus and stored in `src/locales/`.

## Future Plans

May not all be (slated to be) implemented 

### Data and Features
- Historical data tracking to show organizational changes over time
- Integration with official government APIs (if/when available) OR scrape official pages
- Advanced search and filtering capabilities
- Position-based relationship visualization
- Export functionality for organizational charts
- Mobile-optimized view for better accessibility

### Technical Improvements
- Decoupled backend service in Go for better performance
- Real-time updates using WebSocket
- Enhanced caching strategy
- Improved SEO optimization
- Automated data validation and verification
- Performance optimization for large organizational structures

### Community Features
- User contributions and suggestions system
- Community-driven data verification
- API access for researchers and developers
- Integration with academic resources

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## License

This project is licensed under the terms specified in [LICENSE](LICENSE) file.
