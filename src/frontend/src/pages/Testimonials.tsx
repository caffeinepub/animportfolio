import PageTransition from "@/components/PageTransition";
import SectionTitle from "@/components/SectionTitle";
import StarRating from "@/components/StarRating";
import { useTestimonials } from "@/hooks/useQueries";
import { Quote } from "lucide-react";
import { motion } from "motion/react";

export default function Testimonials() {
  const { data: testimonials } = useTestimonials();

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 mesh-bg">
        <section className="section">
          <div className="container-custom">
            <SectionTitle
              eyebrow="Client Reviews"
              title="What People"
              highlight="Are Saying"
              description="Don't take my word for it — here's what clients and colleagues say about working with me."
              center
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              {(testimonials ?? []).map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass rounded-2xl p-8 gradient-border relative card-hover group"
                >
                  <Quote
                    size={32}
                    className="text-primary/20 absolute top-6 right-6"
                  />
                  <StarRating
                    rating={Number(t.rating)}
                    size={16}
                    className="mb-4"
                  />
                  <p className="text-muted-foreground leading-relaxed italic mb-6 text-sm">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      className="w-12 h-12 rounded-full bg-muted ring-2 ring-primary/20"
                    />
                    <div>
                      <p className="font-heading font-bold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.role} · {t.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
