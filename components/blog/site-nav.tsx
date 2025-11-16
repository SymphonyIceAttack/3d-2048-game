import Image from "next/image";
import Link from "next/link";
import { BlogThemeToggle } from "./blog-theme-toggle";

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-purple-500 dark:border-purple-400 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image
              src="/logo.png"
              alt="3D 2048 Logo"
              fill
              className="object-contain group-hover:scale-110 transition-transform"
            />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            3D 2048
          </span>
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/"
            className="px-3 py-2 md:px-4 rounded-lg text-sm md:text-base text-gray-900 dark:text-white hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all font-bold"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="px-3 py-2 md:px-4 rounded-lg text-sm md:text-base text-gray-900 dark:text-white hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all font-bold"
          >
            About
          </Link>
          <Link
            href="/faq"
            className="px-3 py-2 md:px-4 rounded-lg text-sm md:text-base text-gray-900 dark:text-white hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all font-bold"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="px-3 py-2 md:px-4 rounded-lg text-sm md:text-base text-gray-900 dark:text-white hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all font-bold"
          >
            Contact
          </Link>
          <Link
            href="/posts"
            className="px-3 py-2 md:px-4 rounded-lg text-sm md:text-base text-gray-900 dark:text-white hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all font-bold"
          >
            Blog
          </Link>
          <BlogThemeToggle />
        </div>
      </div>
    </nav>
  );
}
