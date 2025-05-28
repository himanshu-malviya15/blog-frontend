import type React from "react"
import "./globals.css"
import { defaultMetadata } from "@/lib/metadata"

export const metadata = defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
