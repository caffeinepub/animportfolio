import { Button } from "@/components/ui/button";
import { clearAdminSession } from "@/lib/adminAuth";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Briefcase,
  ChevronRight,
  Clock,
  Code2,
  Cpu,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Palette,
  Quote,
  Settings,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const ADMIN_NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/services", label: "Services", icon: Briefcase },
  { to: "/admin/skills", label: "Skills", icon: Cpu },
  { to: "/admin/experience", label: "Experience", icon: Clock },
  { to: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { to: "/admin/blog", label: "Blog Posts", icon: BookOpen },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
  { to: "/admin/settings", label: "Settings", icon: Settings },
  { to: "/admin/theme", label: "Theme", icon: Palette },
  { to: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout({
  children,
}: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAdminSession();
    navigate({ to: "/admin/login" });
  };

  const isActive = (item: (typeof ADMIN_NAV)[0]) =>
    item.exact
      ? location.pathname === item.to
      : location.pathname.startsWith(item.to);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Code2 size={16} className="text-primary" />
          </div>
          <div>
            <p className="font-heading font-bold text-sm gradient-text">
              Alex.dev
            </p>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {ADMIN_NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <Icon size={16} className={active ? "text-primary" : ""} />
              {item.label}
              {active && (
                <ChevronRight size={14} className="ml-auto text-primary" />
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border/30">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-muted-foreground hover:text-destructive"
        >
          <LogOut size={14} className="mr-2" /> Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden lg:flex flex-col w-60 glass-strong border-r border-border/30 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-60 glass-strong border-r border-border/30 z-50 flex flex-col lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 glass-strong border-b border-border/30 px-6 py-4 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Menu size={18} />
          </button>
          <div className="flex-1" />
          <Link
            to="/"
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          >
            View Site <ChevronRight size={12} />
          </Link>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
