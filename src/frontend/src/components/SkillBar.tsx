import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Props {
  name: string;
  percentage: number;
  icon?: string;
  color?: "primary" | "accent" | "secondary";
  delay?: number;
}

export default function SkillBar({
  name,
  percentage,
  icon,
  color = "primary",
  delay = 0,
}: Props) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const barColor = {
    primary: "bg-primary",
    accent: "bg-accent",
    secondary: "bg-secondary",
  }[color];

  const shadowColor = {
    primary: "shadow-glow",
    accent: "shadow-glow-cyan",
    secondary: "shadow-glow-pink",
  }[color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span className="text-sm font-medium font-heading">{name}</span>
        </div>
        <span className="text-sm font-mono text-primary">{percentage}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.4, 0, 0.2, 1] }}
          className={cn("h-full rounded-full", barColor, shadowColor)}
          style={{ minWidth: inView ? "8px" : 0 }}
        />
      </div>
    </motion.div>
  );
}
