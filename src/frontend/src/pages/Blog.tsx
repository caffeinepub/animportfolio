import PageTransition from "@/components/PageTransition";
import SectionTitle from "@/components/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { usePublishedPosts } from "@/hooks/useQueries";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { motion } from "motion/react";

export default function Blog() {
  const { data: posts } = usePublishedPosts();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 mesh-bg">
        <section className="section">
          <div className="container-custom">
            <SectionTitle
              eyebrow="Blog"
              title="Thoughts &"
              highlight="Tutorials"
              description="Deep dives, tutorials, and perspectives on modern web development, design, and engineering culture."
              center
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {(posts ?? []).map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl overflow-hidden gradient-border card-hover group flex flex-col cursor-pointer"
                  onClick={() =>
                    navigate({ to: "/blog/$slug", params: { slug: post.slug } })
                  }
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-accent/10 text-accent border-accent/20"
                        >
                          <Tag size={10} className="mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="font-heading font-bold text-lg leading-snug mb-3 flex-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      {post.publishedAt && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar size={12} />
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      )}
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Read <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {(!posts || posts.length === 0) && (
              <div className="text-center py-20 text-muted-foreground">
                No posts published yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
