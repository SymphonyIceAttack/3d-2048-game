import { readItems } from "@directus/sdk";
import type { MetadataRoute } from "next";
import directus from "@/lib/directus";

export const revalidate = 86400; // 24 hours in seconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

  try {
    // Fetch all published posts from Directus
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          status: { _eq: "published" },
        },
        fields: ["slug", "published_at", "date_updated"],
        sort: ["-published_at"],
      }),
    );

    // Generate sitemap entries for all posts
    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.date_updated || post.published_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.8,
      },
    ];

    return [...staticPages, ...postEntries];
  } catch (error) {
    console.error("[v0] Error generating sitemap:", error);
    // Return static pages only if Directus fetch fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.8,
      },
    ];
  }
}
