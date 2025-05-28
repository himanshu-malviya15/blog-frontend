import { getBlogPosts } from "@/lib/strapi"
import type { BlogPost, StrapiResponse } from "@/types/blog"
import BlogCard from "@/components/blog-card"
import Link from "next/link"

export default async function HomePage() {
  const response: StrapiResponse<BlogPost[]> = await getBlogPosts()
  const posts = response.data || []

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              My Blog
            </Link>
          </h1>
          <p className="text-gray-600 mt-2">A simple blog built with Next.js and Strapi</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No blog posts found</h2>
            <p className="text-gray-600">Check back later for new content!</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Latest Posts ({posts.length})</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
