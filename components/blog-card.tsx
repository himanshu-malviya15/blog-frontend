import Link from "next/link"
import type { BlogPost } from "@/types/blog"

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.publishedAt}>{publishedDate}</time>
        </div>

        <div className="flex justify-between items-center">
          <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}
