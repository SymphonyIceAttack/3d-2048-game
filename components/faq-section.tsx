import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "What is 3D 2048?",
      answer:
        "3D 2048 is an innovative twist on the classic 2048 puzzle game. Instead of a flat 4x4 grid, you play on a 4x4x4 cube in three-dimensional space, creating a much more challenging and immersive experience.",
    },
    {
      question: "How do I control the game?",
      answer:
        "Use Arrow Keys (↑←↓→) or WASD keys to move tiles horizontally and vertically. Press Q/E to move tiles forward and backward in 3D space. You can also drag with your mouse to rotate the camera and view different angles of the cube.",
    },
    {
      question: "What's the difference between 2D and 3D modes?",
      answer:
        "2D mode is the classic 2048 game on a flat 4x4 grid, while 3D mode extends the gameplay into a 4x4x4 cube with 64 positions. The 3D mode offers 6 directions of movement and requires spatial thinking to master.",
    },
    {
      question: "How do I win the game?",
      answer:
        "Your goal is to combine numbered tiles to create a tile with the number 2048. Tiles with the same number merge when they touch. In 3D mode, tiles can merge along any of the 6 directions (up, down, left, right, forward, backward).",
    },
    {
      question: "What happens when I can't make any more moves?",
      answer:
        "When the grid (or cube) is full and no more valid moves are available, the game ends. Your final score is displayed, and you can start a new game to try to beat your high score.",
    },
    {
      question: "Is my high score saved?",
      answer:
        "Yes! Your best score is automatically saved in your browser's local storage, so you can track your progress and try to beat your personal record.",
    },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-8 text-foreground">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-border"
          >
            <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
