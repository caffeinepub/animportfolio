import { Briefcase, Calendar, MapPin } from "lucide-react";
import { motion } from "motion/react";
import type { Experience } from "../backend.d";

interface Props {
  experiences: Experience[];
}

export default function Timeline({ experiences }: Props) {
  const sorted = [...experiences].sort(
    (a, b) => Number(a.order) - Number(b.order),
  );

  return (
    <div className="relative">
      {/* Center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary/60 via-accent/40 to-transparent hidden md:block" />

      <div className="space-y-10">
        {sorted.map((exp, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start gap-6 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content card */}
              <div className="flex-1 glass rounded-2xl p-6 gradient-border card-hover">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <h3 className="font-heading font-bold text-lg">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-primary text-sm mt-1">
                      <Briefcase size={14} />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  {exp.current && (
                    <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary border border-primary/30 animate-pulse">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{exp.location}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>

              {/* Center dot */}
              <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-primary glow-primary z-10" />

              {/* Spacer for alternating layout */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
