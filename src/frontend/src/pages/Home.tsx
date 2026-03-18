import AnimatedCard from "@/components/AnimatedCard";
import ParticleHero from "@/components/ParticleHero";
import SectionTitle from "@/components/SectionTitle";
import SkillBar from "@/components/SkillBar";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import {
  useFeaturedProjects,
  useServices,
  useSkills,
  useTestimonials,
} from "@/hooks/useQueries";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Download, Globe, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";

function TypewriterText() {
  return (
    <motion.span
      key="typewriter"
      className="gradient-text font-accent"
      style={{ display: "inline-block" }}
    >
      Creative Developer
    </motion.span>
  );
}

function StatCounter({
  end,
  label,
  suffix = "",
}: { end: number; label: string; suffix?: string }) {
  const { count, ref } = useCounterAnimation(end);
  return (
    <div ref={ref} className="text-center">
      <p className="font-heading font-bold text-4xl gradient-text">
        {count}
        {suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export default function Home() {
  const { data: projects } = useFeaturedProjects();
  const { data: testimonials } = useTestimonials();
  const { data: services } = useServices();
  const { data: skills } = useSkills();
  const topSkills = skills?.slice(0, 6) ?? [];
  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg">
        <ParticleHero />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.62 0.28 290 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.28 290 / 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 container-custom text-center py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 glow-accent"
          >
            <Sparkles size={14} className="text-accent" />
            <span className="text-xs font-mono tracking-wide text-accent">
              Available for hire
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-6"
          >
            Hi, I'm <span className="gradient-text-pink">Alex</span>
            <br />
            <span className="text-4xl sm:text-5xl md:text-6xl">
              A <TypewriterText />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            I craft digital experiences that blend stunning design with
            performant engineering. From pixel-perfect UIs to scalable backend
            systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/portfolio">
              <Button
                size="lg"
                data-ocid="hero.primary_button"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-heading font-semibold px-8 group"
              >
                View My Work
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                data-ocid="hero.secondary_button"
                className="border-border/50 hover:border-primary/50 hover:bg-primary/5 font-heading"
              >
                <Download size={18} className="mr-2" /> Download CV
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-sm mx-auto mt-20"
          >
            <StatCounter end={8} label="Years Exp." suffix="+" />
            <StatCounter end={50} label="Projects" suffix="+" />
            <StatCounter end={40} label="Happy Clients" suffix="+" />
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-border/50 flex items-start justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section mesh-bg">
        <div className="container-custom">
          <SectionTitle
            eyebrow="Selected Work"
            title="Projects That"
            highlight="Define Me"
            description="A curated selection of projects built with precision, creativity, and a relentless focus on user experience."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {(projects ?? []).slice(0, 3).map((project, i) => (
              <button
                key={project.id}
                type="button"
                className="cursor-pointer w-full text-left"
                onClick={() =>
                  navigate({ to: "/portfolio/$id", params: { id: project.id } })
                }
              >
                <AnimatedCard
                  delay={i * 0.1}
                  glowColor="primary"
                  className="h-full p-0 overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-lg glass text-xs font-mono text-accent">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-lg mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.shortDesc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-xs glass text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>
              </button>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/portfolio">
              <Button
                variant="outline"
                size="lg"
                className="border-primary/30 hover:border-primary hover:bg-primary/5 font-heading"
              >
                View All Projects <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container-custom">
          <SectionTitle
            eyebrow="What I Do"
            title="Services I"
            highlight="Offer"
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {(services ?? []).slice(0, 4).map((svc, i) => (
              <AnimatedCard key={svc.id} delay={i * 0.1} glowColor="accent">
                <div className="text-3xl mb-4">{svc.icon}</div>
                <h3 className="font-heading font-bold mb-2">{svc.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {svc.description.slice(0, 100)}...
                </p>
                {svc.price && (
                  <p className="text-primary text-sm font-heading font-semibold mt-4">
                    {svc.price}
                  </p>
                )}
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section mesh-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle
                eyebrow="Technical Stack"
                title="Skills &"
                highlight="Expertise"
                description="Proficient across the full stack, from pixel-perfect frontends to robust cloud infrastructure."
              />
              <Link to="/skills" className="mt-6 inline-flex">
                <Button
                  variant="outline"
                  className="border-primary/30 hover:border-primary font-heading"
                >
                  See All Skills <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {topSkills.map((skill, i) => (
                <SkillBar
                  key={skill.id}
                  name={skill.name}
                  percentage={Number(skill.percentage)}
                  icon={skill.icon}
                  color={
                    i % 3 === 0
                      ? "primary"
                      : i % 3 === 1
                        ? "accent"
                        : "secondary"
                  }
                  delay={i * 0.08}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container-custom">
          <SectionTitle
            eyebrow="Social Proof"
            title="What Clients"
            highlight="Say"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {(testimonials ?? []).slice(0, 3).map((t, i) => (
              <AnimatedCard key={t.id} delay={i * 0.1} glowColor="secondary">
                <StarRating rating={Number(t.rating)} />
                <p className="text-sm text-muted-foreground leading-relaxed italic mb-4">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-9 h-9 rounded-full bg-muted"
                  />
                  <div>
                    <p className="text-sm font-heading font-semibold">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden glass gradient-border text-center py-20 px-8"
          >
            <div className="absolute inset-0 mesh-bg opacity-50" />
            <div className="relative z-10">
              <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">
                Ready to Build{" "}
                <span className="gradient-text-tri">Something Amazing?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Let's collaborate on your next project. I'm currently open to
                freelance and full-time opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-primary glow-primary font-heading font-semibold px-10"
                  >
                    Let's Talk <Zap size={16} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border/50 hover:border-primary/50 font-heading"
                  >
                    <Globe size={16} className="mr-2" /> Browse Work
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
