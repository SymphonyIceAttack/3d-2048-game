import { readItems } from "@directus/sdk";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/blog/breadcrumb";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import directus from "@/lib/directus";

export const metadata: Metadata = {
  title: "3D 2048 Game - Play the Classic Puzzle in 3D Space",
  description:
    "Experience the classic 2048 puzzle game in stunning 3D! Play in a 4x4x4 cube space with smooth controls and immersive graphics. Rotate the view and combine tiles to reach 2048.",
};

export const revalidate = 86400;

export default async function BlogPage() {
  try {
    console.log("[v0] Fetching posts from Directus...");
    console.log("[v0] Directus URL:", process.env.NEXT_PUBLIC_DIRECTUS_URL);

    const posts = await directus.request(
      readItems("posts", {
        fields: [
          "id",
          "title",
          "slug",
          "description",
          "published_at",
          "status",
          "imageurl",
        ],
        filter: {
          status: { _eq: "published" },
        },
        sort: ["-published_at"],
        limit: -1,
      }),
    );

    console.log("[v0] Successfully fetched", posts.length, "posts");

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-black">
        <div className="w-full px-4 py-6">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]}>
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="font-semibold hover:bg-primary hover:text-primary-foreground transition-colors md:text-base"
              >
                Home
              </Button>
            </Link>
            <ThemeToggle />
          </Breadcrumb>
        </div>

        <main className="container mx-auto px-4 py-8 max-w-6xl pt-20 md:pt-0">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-balance text-gray-900 dark:text-white">
              Blog Posts
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 text-pretty">
              Explore our latest articles and updates
            </p>
          </div>

          {posts.length === 0 ? (
            <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950">
              <CardContent className="py-12 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  No posts published yet
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="group"
                >
                  <Card className="h-full transition-all hover:shadow-lg hover:border-purple-500 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950 overflow-hidden">
                    {post.imageurl && (
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          fill={true}
                          src={`https://symcloud.top/${post.imageurl}`}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-balance text-gray-900 dark:text-white">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-500">
                        {new Date(post.published_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-pretty">
                        {post.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  } catch (error) {
    console.error("[v0] Error fetching posts:", error);
    console.error("[v0] Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      cause: error instanceof Error ? error.cause : undefined,
      stack: error instanceof Error ? error.stack : undefined,
      directusUrl: process.env.NEXT_PUBLIC_DIRECTUS_URL,
    });

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-black">
        <div className="w-full px-4 py-6">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]}>
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="font-semibold hover:bg-primary hover:text-primary-foreground transition-colors md:text-base"
              >
                Home
              </Button>
            </Link>
            <ThemeToggle />
          </Breadcrumb>
        </div>

        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <Card className="border-2 border-red-500 dark:border-red-600 bg-white dark:bg-slate-950">
            <CardContent className="py-12 text-center space-y-4">
              <p className="text-red-600 dark:text-red-500 font-semibold">
                Error loading posts
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {error instanceof Error ? error.message : "Unknown error"}
              </p>
              {!process.env.NEXT_PUBLIC_DIRECTUS_URL && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Please check if NEXT_PUBLIC_DIRECTUS_URL environment variable
                  is set
                </p>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
}
