# Next.js + Strapi Blog Website

A scalable blog implementation using Next.js App Router and Strapi v5 with Incremental Static Regeneration (ISR).

## Features

- Static generation at build time for optimal performance
- Incremental Static Regeneration (ISR) for runtime content updates
- Dynamic Zone support for flexible content structure
- TypeScript for type safety
- Responsive design with Tailwind CSS
- Error handling and loading states

## Setup Instructions

### Next.js Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Configure environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Update the values in `.env.local`:
- `NEXT_PUBLIC_STRAPI_URL`: Your Strapi URL (default: http://localhost:1337)
- `STRAPI_API_TOKEN`: Your Strapi API token (create in Strapi admin)

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

## Architecture Decisions

### Incremental Static Regeneration (ISR)

This implementation uses ISR to achieve both performance and flexibility:

- **Build-time generation**: All known blog posts are statically generated
- **Runtime updates**: Content can be updated in Strapi without redeployment
- **Revalidation**: Pages revalidate every 60 seconds to fetch new content
- **On-demand revalidation**: Can be triggered via webhooks from Strapi

### Scalability Considerations

1. **Caching Strategy**: Uses Next.js built-in caching with appropriate revalidation times
2. **Type Safety**: Full TypeScript implementation for maintainability
3. **Error Handling**: Graceful fallbacks for API failures
4. **Component Architecture**: Modular components for easy extension
5. **Dynamic Zone Renderer**: Extensible system for new content types

### Performance Optimizations

- Image optimization with Next.js Image component
- Proper loading states and error boundaries
- Minimal JavaScript bundle size