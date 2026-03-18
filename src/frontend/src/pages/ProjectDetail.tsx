import PageTransition from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjectById } from "@/hooks/useQueries";
import { useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, ExternalLink, Github, Tag } from "lucide-react";
import { motion } from "motion/react";

export default function ProjectDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const { data: project, isLoading } = useProjectById(id ?? "");

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 mesh-bg">
        <div className="container-custom py-20 space-y-6">
          <Skeleton className="shimmer-bg h-64 rounded-2xl" />
          <Skeleton className="shimmer-bg h-8 w-64 rounded-lg" />
          <Skeleton className="shimmer-bg h-32 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-20 mesh-bg flex items-center justify-center">
        <div className="glass rounded-2xl p-10 text-center max-w-sm">
          <p className="text-muted-foreground">Project not found.</p>
          <Link to="/portfolio">
            <Button className="mt-4" variant="outline">
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 mesh-bg">
        <div className="container-custom py-16">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/portfolio">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary mb-8"
              >
                <ArrowLeft size={16} className="mr-2" /> Back to Portfolio
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Main */}
            <div className="lg:col-span-3 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full rounded-2xl glow-primary object-cover max-h-80"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="font-heading font-bold text-4xl gradient-text mb-4">
                  {project.title}
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="glass rounded-2xl p-6 gradient-border space-y-5">
                <div>
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">
                    Category
                  </p>
                  <Badge className="bg-primary/20 text-primary capitalize">
                    {project.category}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">
                    <Tag size={12} className="inline mr-1" /> Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-lg glass text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-border/30 flex flex-col gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-primary glow-primary font-heading">
                        <ExternalLink size={16} className="mr-2" /> Live Demo
                      </Button>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="w-full font-heading border-border/50"
                      >
                        <Github size={16} className="mr-2" /> Source Code
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
