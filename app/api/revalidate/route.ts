import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { model, entry } = body

    if (model === "blog-post") {
      revalidateTag("blog-posts")
      if (entry?.slug) {
        revalidateTag(`blog-post-${entry.slug}`)
      }

      return NextResponse.json({
        revalidated: true,
        message: "Blog posts revalidated successfully",
      })
    }

    return NextResponse.json({
      revalidated: false,
      message: "No revalidation needed",
    })
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}
