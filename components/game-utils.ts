export function getTileColor(value: number): string {
  const colors: Record<number, string> = {
    0: "bg-muted/50",
    2: "bg-secondary text-secondary-foreground",
    4: "bg-secondary text-secondary-foreground",
    8: "bg-primary/70 text-primary-foreground",
    16: "bg-primary/80 text-primary-foreground",
    32: "bg-primary text-primary-foreground",
    64: "bg-primary text-primary-foreground",
    128: "bg-accent/70 text-accent-foreground",
    256: "bg-accent/80 text-accent-foreground",
    512: "bg-accent/90 text-accent-foreground",
    1024: "bg-accent text-accent-foreground",
    2048: "bg-accent text-accent-foreground",
  };
  return colors[value] || "bg-accent text-accent-foreground";
}

export function getTileSize(value: number): string {
  if (value >= 1024) return "text-2xl md:text-3xl";
  if (value >= 128) return "text-3xl md:text-4xl";
  return "text-4xl md:text-5xl";
}
