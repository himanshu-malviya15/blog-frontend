import type { Metadata } from "next"
import type { BlogPost } from "@/types/blog"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"

export function generateBlogPostMetadata(post: BlogPost): Metadata {
  const title = `${post.title} | My Blog`
  const description = `Blog post by ${post.author}. Published on ${new Date(post.publishedAt).toLocaleDateString()}`
  const url = `${baseUrl}/blog/${post.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "My Blog",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
}

export const defaultMetadata: Metadata = {
  title: "My Blog | Next.js + Strapi",
  description: "A modern blog built with Next.js and Strapi CMS",
  openGraph: {
    title: "My Blog",
    description: "A modern blog built with Next.js and Strapi CMS",
    url: baseUrl,
    siteName: "My Blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Blog",
    description: "A modern blog built with Next.js and Strapi CMS",
  },
}
