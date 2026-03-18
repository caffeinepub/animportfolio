import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  useMessages,
  useProjects,
  usePublishedPosts,
  useServices,
  useSkills,
  useTestimonials,
} from "@/hooks/useQueries";
import {
  BookOpen,
  Briefcase,
  Cpu,
  FolderKanban,
  MessageSquare,
  Quote,
} from "lucide-react";
import { motion } from "motion/react";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: { label: string; value: number; icon: React.ElementType; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 gradient-border"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}
        >
          <Icon size={18} className="text-foreground" />
        </div>
      </div>
      <p className="font-heading font-bold text-4xl gradient-text">{value}</p>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const { data: projects } = useProjects();
  const { data: messages } = useMessages();
  const { data: services } = useServices();
  const { data: skills } = useSkills();
  const { data: posts } = usePublishedPosts();
  const { data: testimonials } = useTestimonials();

  const unread = messages?.filter((m) => !m.isRead).length ?? 0;

  const STATS = [
    {
      label: "Total Projects",
      value: projects?.length ?? 0,
      icon: FolderKanban,
      color: "bg-primary/20",
    },
    {
      label: "Messages",
      value: messages?.length ?? 0,
      icon: MessageSquare,
      color: "bg-secondary/20",
    },
    {
      label: "Unread Messages",
      value: unread,
      icon: MessageSquare,
      color: "bg-destructive/20",
    },
    {
      label: "Services",
      value: services?.length ?? 0,
      icon: Briefcase,
      color: "bg-accent/20",
    },
    {
      label: "Skills",
      value: skills?.length ?? 0,
      icon: Cpu,
      color: "bg-primary/20",
    },
    {
      label: "Blog Posts",
      value: posts?.length ?? 0,
      icon: BookOpen,
      color: "bg-secondary/20",
    },
    {
      label: "Testimonials",
      value: testimonials?.length ?? 0,
      icon: Quote,
      color: "bg-accent/20",
    },
  ];

  return (
    <AdminGuard>
      <AdminLayout>
        <div>
          <h1 className="font-heading font-bold text-2xl mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Welcome back. Here's an overview of your portfolio.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* Recent messages */}
          {messages && messages.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading font-semibold mb-4">
                Recent Messages
              </h2>
              <div className="glass rounded-2xl overflow-hidden">
                {messages.slice(0, 5).map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-center gap-4 px-6 py-4 border-b border-border/30 last:border-0 ${
                      !msg.isRead ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{msg.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {msg.subject || msg.message.slice(0, 60)}
                      </p>
                    </div>
                    {!msg.isRead && (
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
