import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glowColor?: "primary" | "accent" | "secondary" | "none";
}

export default function AnimatedCard({
  children,
  className,
  delay = 0,
  glowColor = "none",
}: Props) {
  const glowClass = {
    primary: "hover:glow-primary",
    accent: "hover:glow-accent",
    secondary: "hover:glow-secondary",
    none: "",
  }[glowColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className={cn(
        "glass rounded-2xl p-6 gradient-border card-hover transition-all duration-300",
        glowClass,
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
