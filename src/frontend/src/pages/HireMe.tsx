import AnimatedCard from "@/components/AnimatedCard";
import PageTransition from "@/components/PageTransition";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock, Mail, Star, Zap } from "lucide-react";
import { motion } from "motion/react";

const PACKAGES = [
  {
    name: "Starter",
    price: "$1,500",
    period: "/ project",
    description: "Perfect for small businesses and landing pages.",
    features: [
      "Landing page design",
      "Mobile responsive",
      "Basic SEO setup",
      "Contact form",
      "2 revision rounds",
      "1 week delivery",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$4,500",
    period: "/ project",
    description: "Full-featured web applications for growing startups.",
    features: [
      "Full web app",
      "Admin dashboard",
      "Database integration",
      "Authentication",
      "5 revision rounds",
      "3-4 week delivery",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "/ quote",
    description: "Scalable systems for established businesses.",
    features: [
      "Custom architecture",
      "Microservices",
      "Cloud infrastructure",
      "Team training",
      "Unlimited revisions",
      "Dedicated support",
    ],
    popular: false,
  },
];

const PERKS = [
  { icon: Clock, text: "Fast turnaround — always on schedule" },
  { icon: CheckCircle2, text: "Transparent communication, no surprises" },
  { icon: Zap, text: "Cutting-edge tech stack" },
  { icon: Star, text: "5-star client satisfaction rate" },
];

export default function HireMe() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-20 mesh-bg">
        <section className="section">
          <div className="container-custom">
            <div className="flex justify-center mb-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass px-6 py-3 rounded-full flex items-center gap-3 glow-accent"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-mono text-accent">
                  Currently available for new projects
                </span>
              </motion.div>
            </div>

            <SectionTitle
              eyebrow="Work With Me"
              title="Let's Build"
              highlight="Something Great"
              description="I take on select projects each quarter. If you have an interesting problem to solve, I'd love to hear about it."
              center
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-16">
              {PERKS.map((perk) => (
                <AnimatedCard key={perk.text} className="text-center">
                  <perk.icon size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{perk.text}</p>
                </AnimatedCard>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PACKAGES.map((pkg, i) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative glass rounded-2xl p-8 gradient-border card-hover ${
                    pkg.popular ? "glow-primary ring-1 ring-primary/30" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-heading font-semibold">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-heading font-bold text-xl mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {pkg.description}
                  </p>
                  <div className="mb-6">
                    <span className="font-heading font-bold text-4xl gradient-text">
                      {pkg.price}
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">
                      {pkg.period}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle2
                          size={14}
                          className="text-accent shrink-0"
                        />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <Button
                      className="w-full font-heading"
                      variant={pkg.popular ? "default" : "outline"}
                    >
                      Get Started <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-16 glass rounded-2xl p-10 gradient-border"
            >
              <h3 className="font-heading font-bold text-2xl mb-3">
                Not sure which fits?
              </h3>
              <p className="text-muted-foreground mb-6">
                Let's have a free 30-minute discovery call to figure out exactly
                what you need.
              </p>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary glow-primary font-heading font-semibold"
                >
                  <Mail size={16} className="mr-2" /> Book a Free Call
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
