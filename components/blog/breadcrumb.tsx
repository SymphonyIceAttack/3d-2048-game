import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  children?: React.ReactNode;
}

export function Breadcrumb({ items, children }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center justify-between gap-3 text-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-all duration-200 font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100 font-semibold text-base">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </nav>
  );
}
