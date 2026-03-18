import { Star } from "lucide-react";

const STAR_POSITIONS = ["first", "second", "third", "fourth", "fifth"] as const;

interface Props {
  rating: number;
  size?: number;
  className?: string;
}

export default function StarRating({
  rating,
  size = 14,
  className = "mb-3",
}: Props) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {STAR_POSITIONS.map((pos, n) => (
        <Star
          key={pos}
          size={size}
          className={n < rating ? "text-accent fill-accent" : "text-muted"}
        />
      ))}
    </div>
  );
}
