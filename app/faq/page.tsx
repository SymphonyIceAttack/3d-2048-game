import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/blog/breadcrumb";
import { FAQSection } from "@/components/faq-section";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions - 3D 2048 Game",
  description:
    "Find answers to the most common questions about 3D 2048. Learn about gameplay, controls, features, and get tips to improve your puzzle-solving skills.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-black">
      <div className="w-full px-4 py-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]}>
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

      <div className="container mx-auto px-4 py-16 max-w-4xl pt-20 md:pt-0">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about 3D 2048. Can't find what you're
            looking for? Feel free to contact us.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <FAQSection />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <a
            href="/contact"
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg block"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Contact Support</h3>
            <p className="text-sm opacity-90">
              Can't find your answer? Get in touch with our support team.
            </p>
          </a>

          <a
            href="/posts"
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg block"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Read Our Blog</h3>
            <p className="text-sm opacity-90">
              Tips, tricks, and strategies to improve your gameplay.
            </p>
          </a>

          <a
            href="/"
            className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-6 hover:from-indigo-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg block"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Play Now</h3>
            <p className="text-sm opacity-90">
              Ready to test your skills? Jump back into the game!
            </p>
          </a>
        </div>

        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-6 leading-relaxed opacity-95 max-w-2xl mx-auto">
              Our support team is here to help! Reach out to us and we'll get
              back to you as soon as possible.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
