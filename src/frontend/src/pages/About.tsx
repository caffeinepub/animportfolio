import AnimatedCard from "@/components/AnimatedCard";
import PageTransition from "@/components/PageTransition";
import SectionTitle from "@/components/SectionTitle";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import {
  Award,
  Camera,
  Code2,
  Coffee,
  Globe,
  Heart,
  Music,
  Rocket,
} from "lucide-react";
import { motion } from "motion/react";

const FUN_FACTS = [
  { icon: Coffee, label: "Coffees / week", value: 14 },
  { icon: Code2, label: "Lines of code", value: 500000, suffix: "+" },
  { icon: Music, label: "Playlists coded to", value: 87 },
  { icon: Camera, label: "Side projects", value: 23 },
];

const VALUES = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "I write code that's maintainable, documented, and a pleasure to work with. Your future self will thank me.",
  },
  {
    icon: Heart,
    title: "User-First",
    description:
      "Every design decision starts with empathy. What does the user actually need? That's the only question that matters.",
  },
  {
    icon: Rocket,
    title: "Ship Fast",
    description:
      "Perfect is the enemy of done. I iterate quickly, gather feedback, and continuously improve in production.",
  },
  {
    icon: Globe,
    title: "Open Source",
    description:
      "I believe in giving back. Much of my work is open source and I contribute actively to the community.",
  },
];

function StatCounter({
  end,
  suffix,
  label,
}: { end: number; suffix?: string; label: string }) {
  const { count, ref } = useCounterAnimation(end);
  return (
    <div ref={ref} className="text-center p-6">
      <p className="font-heading font-bold text-5xl gradient-text">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen mesh-bg pt-20">
        {/* Hero */}
        <section className="section">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative w-72 h-72 mx-auto lg:mx-0">
                  {/* Rings */}
                  <div
                    className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"
                    style={{ animationDuration: "3s" }}
                  />
                  <div className="absolute -inset-4 rounded-full border border-accent/10 spin-slow" />
                  <img
                    src="/assets/generated/profile-avatar.dim_400x400.jpg"
                    alt="Alex - Full-Stack Developer"
                    className="w-72 h-72 rounded-full object-cover glow-primary"
                  />
                  {/* Badge */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3,
                    }}
                    className="absolute -bottom-2 -right-2 glass px-3 py-2 rounded-xl text-xs font-mono text-accent glow-accent"
                  >
                    <Award size={12} className="inline mr-1" /> 8+ Years
                  </motion.div>
                </div>
              </motion.div>

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <SectionTitle
                  eyebrow="About Me"
                  title="The Developer"
                  highlight="Behind the Code"
                />
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Hey! I'm{" "}
                    <strong className="text-foreground">Alex Volkov</strong>, a
                    full-stack developer with 8+ years of experience building
                    products that millions of people use. I specialize in the
                    intersection of design and engineering — that rare zone
                    where beautiful interfaces meet robust systems.
                  </p>
                  <p>
                    My journey started with tinkering with HTML tables in 2015
                    (we don't talk about that era). Today I architect
                    distributed systems, write smart contracts, and obsess over
                    60fps animations. Each project is a chance to push the craft
                    forward.
                  </p>
                  <p>
                    When I'm not coding, you'll find me hiking mountain trails,
                    contributing to open source, or experimenting with
                    generative art. I believe the best engineers are
                    well-rounded humans.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-y border-border/30">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCounter end={8} suffix="+" label="Years of Experience" />
              <StatCounter end={50} suffix="+" label="Projects Delivered" />
              <StatCounter end={40} suffix="+" label="Happy Clients" />
              <StatCounter end={15} suffix="k+" label="GitHub Stars" />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section">
          <div className="container-custom">
            <SectionTitle
              eyebrow="Core Values"
              title="What I"
              highlight="Stand For"
              center
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {VALUES.map((v, i) => (
                <AnimatedCard key={v.title} delay={i * 0.1} glowColor="primary">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                    <v.icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.description}
                  </p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Fun Facts */}
        <section className="section mesh-bg">
          <div className="container-custom">
            <SectionTitle
              eyebrow="Fun Facts"
              title="A Few Things"
              highlight="About Me"
              center
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {FUN_FACTS.map((fact, i) => (
                <AnimatedCard
                  key={fact.label}
                  delay={i * 0.1}
                  glowColor="accent"
                  className="text-center"
                >
                  <fact.icon size={28} className="text-accent mx-auto mb-3" />
                  <div className="font-heading font-bold text-3xl gradient-text">
                    {fact.value.toLocaleString()}
                    {fact.suffix}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {fact.label}
                  </p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
