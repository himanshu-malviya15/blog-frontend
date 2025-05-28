const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchOptions {
  revalidate?: number;
  tags?: string[];
}

async function fetchAPI(path: string, options: FetchOptions = {}) {
  const { revalidate = 60, tags = [] } = options;

  const url = `${STRAPI_URL}/api${path}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
    next: {
      revalidate,
      tags,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
  }

  return response.json();
}

export async function getBlogPosts(options: FetchOptions = {}) {
  try {
    const data = await fetchAPI(
      "/blog-posts?populate=*&sort=publishedAt:desc",
      {
        revalidate: 60, // Revalidate every minute
        tags: ["blog-posts"],
        ...options,
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { data: [], meta: {} };
  }
}

export async function getBlogPost(slug: string, options: FetchOptions = {}) {
  try {
    const data = await fetchAPI(
      `/blog-posts?filters[slug][$eq]=${slug}&populate[content][populate]=*`,
      {
        revalidate: 60,
        tags: ["blog-posts", `blog-post-${slug}`],
        ...options,
      }
    );
    return data.data?.[0] || null;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}

export async function getAllBlogSlugs() {
  try {
    const data = await fetchAPI("/blog-posts?fields=slug", {
      revalidate: 3600, // Revalidate every hour for static paths
      tags: ["blog-slugs"],
    });
    return data.data?.map((post: any) => post.slug) || [];
  } catch (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }
}
