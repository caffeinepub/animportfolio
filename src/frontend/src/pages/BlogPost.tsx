import PageTransition from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePostBySlug } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { motion } from "motion/react";

export default function BlogPost() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const { data: post, isLoading } = usePostBySlug(slug ?? "");

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 mesh-bg">
        <div className="container-custom max-w-3xl py-16 space-y-6">
          <Skeleton className="shimmer-bg h-60 rounded-2xl" />
          <Skeleton className="shimmer-bg h-8 w-3/4 rounded-lg" />
          <Skeleton className="shimmer-bg h-48 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 mesh-bg flex items-center justify-center">
        <div className="glass rounded-2xl p-10 text-center">
          <p className="text-muted-foreground">Post not found.</p>
          <Link to="/blog">
            <Button className="mt-4" variant="outline">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 mesh-bg">
        <div className="container-custom max-w-3xl py-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/blog">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary mb-8"
              >
                <ArrowLeft size={16} className="mr-2" /> Back to Blog
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full rounded-2xl mb-8 glow-primary object-cover max-h-72"
            />

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-accent/10 text-accent border-accent/20 text-xs"
                >
                  <Tag size={10} className="mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="font-heading font-bold text-4xl gradient-text mb-4 leading-tight">
              {post.title}
            </h1>

            {post.publishedAt && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Calendar size={14} />
                <span>
                  Published{" "}
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}

            <div className="glass rounded-2xl p-8 prose prose-invert prose-sm max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                {post.content}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
