import { getBlogPost, getAllBlogSlugs } from "@/lib/strapi"
import type { BlogPost } from "@/types/blog"
import DynamicZoneRenderer from "@/components/dynamic-zone-renderer"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()

  return slugs.map((slug: string) => ({
    slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post: BlogPost | null = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

          <div className="flex items-center text-gray-600">
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <time dateTime={post.publishedAt}>{publishedDate}</time>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-sm p-8">
          <DynamicZoneRenderer components={post.content} />
        </article>
      </main>
    </div>
  )
}
