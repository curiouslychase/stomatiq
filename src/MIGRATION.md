# Astro to Next.js Migration

This directory contains the Next.js version of the Stomatiq project, migrated from Astro.

## What Has Been Migrated

### ✅ Infrastructure & Configuration
- [x] Next.js project setup with TypeScript
- [x] Configured to run on port 4321 (matching Astro config)
- [x] Package.json with all necessary dependencies
- [x] TSConfig with @ path alias support
- [x] ESLint configuration

### ✅ Styling
- [x] Global CSS with all custom styles from Astro
- [x] Tailwind CSS v4 configuration
- [x] Custom CSS variables for theming (light/dark/vibe modes)
- [x] Font imports (@fontsource/space-grotesk, @fontsource/space-mono)
- [x] All course grid, heading, and prose wrapper styles

### ✅ Content & Data
- [x] Content directory copied to project root
- [x] Lib utilities (courses.ts, issues.ts, posts.ts, spec.ts)

### ✅ API Routes
- [x] Newsletter subscribe API (`/api/newsletter/subscribe`)

### ✅ Basic Pages
- [x] Root layout with proper HTML structure
- [x] Home page (basic version)

## What Needs to Be Completed

### 🚧 Components (Not Yet Migrated)
The following Astro components need to be converted to React/Next.js components:

#### Core Layout Components
- [ ] SiteHeader (navigation with mobile menu)
- [ ] SiteFooter (with theme toggle)
- [ ] PosthogLoader (analytics)
- [ ] StomaticLogo

#### Content Components
- [ ] NewsletterSubscribe (with client-side form handling)
- [ ] Callout
- [ ] DomainCard (MDX component)
- [ ] EquationCard (MDX component)
- [ ] IterationCard (MDX component)
- [ ] LawCard (MDX component)

### 🚧 Pages (Not Yet Migrated)
- [ ] /aboutique
- [ ] /podcast
- [ ] /merch
- [ ] /products
- [ ] /consulting
- [ ] /design-system
- [ ] /courses
  - [ ] /courses/index
  - [ ] /courses/[slug]
- [ ] /newsletter
  - [ ] /newsletter/index
  - [ ] /newsletter/[slug]
- [ ] /ai-workflow-open-spec
  - [ ] /ai-workflow-open-spec/index
  - [ ] /ai-workflow-open-spec/[slug]

### 🚧 API Routes (Not Yet Migrated)
- [ ] OG Image generation (`/api/og/[slug].png`)
- [ ] Spec OG Image generation (`/api/spec-og/[slug].png`)

### 🚧 Public Assets
- [ ] Copy all public assets (images, textures, fonts, etc.)

### 🚧 Features Requiring Special Attention
- [ ] Client-side theme switching logic (dark/light/vibe/system)
- [ ] Heading anchor link generation
- [ ] Mobile menu interactivity
- [ ] PostHog analytics integration
- [ ] MDX support for content pages
- [ ] RSS feed generation

## Running the Project

```bash
npm install
npm run dev
```

The app will be available at http://localhost:4321

## Migration Strategy

To complete the migration, you should:

1. **Create a components directory structure**
   ```
   components/
     ├── layout/
     │   ├── SiteHeader.tsx
     │   ├── SiteFooter.tsx
     │   └── BaseLayout.tsx
     ├── mdx/
     │   ├── DomainCard.tsx
     │   ├── EquationCard.tsx
     │   ├── IterationCard.tsx
     │   └── LawCard.tsx
     └── NewsletterSubscribe.tsx
   ```

2. **Convert Astro components to React**
   - Move inline scripts to useEffect hooks
   - Convert Astro's `is:inline` scripts to client components with 'use client'
   - Replace Astro.props with TypeScript interfaces and component props
   - Convert class directives to className

3. **Set up MDX**
   - Configure @next/mdx in next.config.ts
   - Create MDX component mappings
   - Convert MDX content pages to Next.js app router structure

4. **Implement dynamic routes**
   - Use Next.js app router conventions (folders with [param])
   - Implement generateStaticParams for SSG

5. **Add client interactivity**
   - Create 'use client' components for interactive features
   - Implement theme switching with localStorage and system preference detection
   - Add mobile menu toggle logic

## Environment Variables

Create a `.env.local` file with:

```
RESEND_API_KEY=your_resend_api_key
RESEND_AUDIENCE_ID=your_audience_id
```

## Notes

- The content directory is at the project root (not in /next-src)
- Port 4321 is configured to match the original Astro setup
- All Astro-specific features have been removed or adapted
- The project uses Next.js 15 with the App Router
