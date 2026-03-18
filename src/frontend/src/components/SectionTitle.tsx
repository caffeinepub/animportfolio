import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface Props {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  highlight,
  description,
  center = false,
  className,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(center && "text-center", className)}
    >
      {eyebrow && (
        <div
          className="flex items-center gap-2 mb-3"
          style={{ justifyContent: center ? "center" : "flex-start" }}
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            {eyebrow}
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
        </div>
      )}
      <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
        {title}{" "}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {description && (
        <p
          className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl"
          style={{ margin: center ? "1rem auto 0" : undefined }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
