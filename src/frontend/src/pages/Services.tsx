import PageTransition from "@/components/PageTransition";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";

export default function Services() {
  const { data: services } = useServices();
  const sorted = [...(services ?? [])].sort(
    (a, b) => Number(a.order) - Number(b.order),
  );

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 mesh-bg">
        <section className="section">
          <div className="container-custom">
            <SectionTitle
              eyebrow="What I Offer"
              title="Services &"
              highlight="Solutions"
              description="From concept to deployment, I deliver end-to-end digital solutions tailored to your vision."
              center
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              {sorted.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass rounded-2xl p-8 gradient-border card-hover relative group overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(circle at top left, oklch(0.62 0.28 290 / 0.08), transparent 70%)",
                    }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="text-4xl">{svc.icon}</div>
                      {svc.price && (
                        <span className="text-sm font-heading font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {svc.price}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-3">
                      {svc.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {svc.description}
                    </p>
                    <ul className="space-y-2">
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <Check size={14} className="text-accent shrink-0" />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-14">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary glow-primary font-heading font-semibold px-10"
                >
                  Start a Project <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
