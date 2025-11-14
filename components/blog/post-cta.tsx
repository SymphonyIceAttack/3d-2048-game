import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function PostCTA() {
  return (
    <Card className="mt-8 border-2 border-blue-500 dark:border-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
      <CardContent className="py-12 px-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Play 3D 2048 Game
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Experience the classic 2048 puzzle in stunning 3D! Slide tiles, merge
          numbers, and reach the elusive 2048 tile in this immersive
          three-dimensional challenge.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          Play 3D 2048 Now →
        </Link>
      </CardContent>
    </Card>
  );
}
