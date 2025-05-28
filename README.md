# Next.js + Strapi v5 Blog

A scalable blog implementation using Next.js App Router and Strapi v5 with Incremental Static Regeneration (ISR).

## Features

- ✅ Static generation at build time for optimal performance
- ✅ Incremental Static Regeneration (ISR) for runtime content updates
- ✅ Dynamic Zone support for flexible content structure
- ✅ TypeScript for type safety
- ✅ Responsive design with Tailwind CSS
- ✅ SEO-friendly with proper meta tags
- ✅ Error handling and loading states

## Setup Instructions

### 1. Strapi v5 Setup

Create a new Strapi v5 project and configure the blog content type:

\`\`\`bash
npx create-strapi-app@latest my-blog-backend
cd my-blog-backend
npm run develop
\`\`\`

#### Content Type: Blog Post

Create a content type called "Blog Post" with the following fields:

- **title** (Text - Short text)
- **slug** (UID - attached to title field)
- **author** (Text - Short text)
- **content** (Dynamic Zone)

#### Dynamic Zone Components

Create the following components for the Dynamic Zone:

1. **shared/rich-text**
   - body (Rich text)

2. **shared/quote**
   - title (Text - Short text)
   - body (Text - Long text)

3. **shared/media**
   - file (Media - Single media)

### 2. Next.js Setup

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

- Static generation for SEO and performance
- Image optimization with Next.js Image component
- Proper loading states and error boundaries
- Minimal JavaScript bundle size

## Deployment

This application can be deployed to any platform that supports Next.js:

- **Vercel**: Recommended for optimal Next.js performance
- **Netlify**: Good alternative with ISR support
- **Self-hosted**: Any Node.js environment

## Deployment to Vercel

Since your environment variables are already configured in Vercel, you can deploy directly:

1. **Connect your repository to Vercel**:
   - Push your code to GitHub/GitLab/Bitbucket
   - Import the project in Vercel dashboard
   - The environment variables are already configured

2. **Build settings** (Vercel will auto-detect these):
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Deploy**:
   \`\`\`bash
   git push origin main
   \`\`\`

Your blog will be automatically deployed with ISR enabled!

## Extending the Blog

To add new Dynamic Zone components:

1. Create the component in Strapi
2. Add the TypeScript interface in `types/blog.ts`
3. Add the renderer in `components/dynamic-zone-renderer.tsx`

## API Endpoints

The application expects these Strapi API endpoints:

- `GET /api/blog-posts?populate=*&sort=publishedAt:desc` - List all posts
- `GET /api/blog-posts?filters[slug][$eq]={slug}&populate=*` - Get single post
- `GET /api/blog-posts?fields=slug` - Get all slugs for static generation
