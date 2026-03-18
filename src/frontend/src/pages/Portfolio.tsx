import PageTransition from "@/components/PageTransition";
import SectionTitle from "@/components/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjects } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ProjectCategory } from "../backend.d";

const FILTER_TABS = [
  { value: "all", label: "All" },
  { value: ProjectCategory.web, label: "Web" },
  { value: ProjectCategory.mobile, label: "Mobile" },
  { value: ProjectCategory.design, label: "Design" },
  { value: ProjectCategory.other, label: "Other" },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const { data: projects } = useProjects();
  const navigate = useNavigate();

  const filtered =
    filter === "all"
      ? projects
      : projects?.filter((p) => p.category === filter);

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 mesh-bg">
        <section className="section">
          <div className="container-custom">
            <SectionTitle
              eyebrow="My Work"
              title="Portfolio"
              highlight="Gallery"
              description="Explore projects across web development, mobile apps, UI/UX design, and blockchain."
              center
            />

            <div className="flex justify-center mt-10 mb-12">
              <Tabs value={filter} onValueChange={setFilter}>
                <TabsList className="glass gap-1 p-1 h-auto">
                  {FILTER_TABS.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      data-ocid="portfolio.tab"
                      className="font-heading text-sm rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {(filtered ?? []).map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <button
                      type="button"
                      className="glass rounded-2xl overflow-hidden gradient-border group card-hover h-full flex flex-col cursor-pointer"
                      onClick={() =>
                        navigate({
                          to: "/portfolio/$id",
                          params: { id: project.id },
                        })
                      }
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary/80 text-primary-foreground text-xs capitalize">
                            {project.category}
                          </Badge>
                        </div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-primary/20 flex items-center justify-center gap-4"
                        >
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glow-accent transition-all"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={18} className="text-accent" />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glow-primary transition-all"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github size={18} className="text-foreground" />
                            </a>
                          )}
                        </motion.div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-heading font-bold text-lg mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                          {project.shortDesc}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md text-xs glass text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link
                          to="/portfolio/$id"
                          params={{ id: project.id }}
                          className="inline-flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Details <ArrowRight size={14} />
                        </Link>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {(!filtered || filtered.length === 0) && (
              <div
                data-ocid="portfolio.empty_state"
                className="text-center py-20 text-muted-foreground"
              >
                No projects in this category yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
