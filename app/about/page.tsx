import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/blog/breadcrumb";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us - 3D 2048 Game",
  description:
    "Learn about the story behind 3D 2048, our mission to innovate classic puzzle games, and the team passionate about creating engaging 3D gaming experiences.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-black">
      <div className="w-full px-4 py-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]}>
          <Link href="/posts">
            <Button
              variant="ghost"
              size="sm"
              className="font-semibold hover:bg-primary hover:text-primary-foreground transition-colors md:text-base"
            >
              Blog
            </Button>
          </Link>
          <ThemeToggle />
        </Breadcrumb>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            About 3D 2048
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Revolutionizing the Classic Puzzle Experience
          </p>
        </div>

        <div className="space-y-16">
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  Our Story
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  3D 2048 was born from a simple yet ambitious idea: what if we
                  could take the beloved classic puzzle game and transform it
                  into a truly three-dimensional experience? Created in 2024,
                  our game pushes the boundaries of traditional puzzle gaming by
                  adding depth, strategy, and spatial thinking to the familiar
                  2048 gameplay.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  What started as a creative experiment has evolved into a
                  full-featured gaming experience that challenges players to
                  think beyond the flat grid and embrace the third dimension.
                </p>
              </div>
              <div className="w-full md:w-80 h-64 relative">
                <Image
                  src="/about-story.jpg"
                  alt="3D 2048 game concept"
                  fill
                  className="object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  Our Mission
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  We believe that classic games deserve modern innovations. Our
                  mission is to create engaging, accessible puzzle games that
                  challenge the mind while providing hours of entertainment.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  By leveraging cutting-edge web technologies like Three.js and
                  React, we're able to deliver smooth, responsive 3D experiences
                  directly in your browser—no downloads required.
                </p>
              </div>
              <div className="w-full md:w-80 h-64 relative">
                <Image
                  src="/about-mission.jpg"
                  alt="Innovation in gaming"
                  fill
                  className="object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                What Makes Us Different
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Innovation meets tradition in our unique approach to puzzle
                gaming
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Open Source
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Built with transparency and community contribution in mind
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  High Performance
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Optimized 3D rendering for smooth gameplay on all devices
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Innovative Design
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Unique 3D gameplay mechanics that expand the puzzle genre
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Our Commitment</h2>
              <p className="text-lg mb-6 leading-relaxed opacity-95">
                We're committed to creating a fun, fair, and accessible gaming
                experience for everyone. Our game is free to play, works on any
                device with a web browser, and doesn't require any app
                installation or account registration.
              </p>
              <p className="text-lg leading-relaxed opacity-95">
                Thank you for playing and being part of the 3D 2048 community!
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
