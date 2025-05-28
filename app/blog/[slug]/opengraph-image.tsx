import { getBlogPost } from "@/lib/strapi"
import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Blog Post"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

interface Props {
  params: { slug: string }
}

export default async function Image({ params }: Props) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return new ImageResponse(
      <div
        style={{
          fontSize: 48,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        Blog Post Not Found
      </div>,
      { ...size },
    )
  }

  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 60, fontWeight: "bold", marginBottom: "20px" }}>{post.title}</div>
      <div style={{ fontSize: 32, opacity: 0.8 }}>By {post.author}</div>
    </div>,
    { ...size },
  )
}
