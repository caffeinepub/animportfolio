import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "@/hooks/useQueries";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { useEffect } from "react";

import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Experience from "@/pages/Experience";
import HireMe from "@/pages/HireMe";
// Pages
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import ProjectDetail from "@/pages/ProjectDetail";
import Services from "@/pages/Services";
import Skills from "@/pages/Skills";
import Testimonials from "@/pages/Testimonials";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminExperience from "@/pages/admin/AdminExperience";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminMessages from "@/pages/admin/AdminMessages";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminServices from "@/pages/admin/AdminServices";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminSkills from "@/pages/admin/AdminSkills";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminTheme from "@/pages/admin/AdminTheme";
import AdminUsers from "@/pages/admin/AdminUsers";

// Root layout with Navbar + Footer
function RootLayout() {
  const { data: theme } = useTheme();

  // Inject dynamic theme CSS variables
  useEffect(() => {
    if (!theme) return;
    const root = document.documentElement;
    if (theme.primaryColor)
      root.style.setProperty("--theme-primary", theme.primaryColor);
    if (theme.secondaryColor)
      root.style.setProperty("--theme-secondary", theme.secondaryColor);
    if (theme.accentColor)
      root.style.setProperty("--theme-accent", theme.accentColor);
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

// Admin layout (no Navbar/Footer — handled inside each page)
function AdminRootLayout() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

// === ROUTE TREE ===
const rootRoute = createRootRoute({ component: RootLayout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  component: Portfolio,
});
const projectDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio/$id",
  component: ProjectDetail,
});
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: Services,
});
const skillsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/skills",
  component: Skills,
});
const experienceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/experience",
  component: Experience,
});
const testimonialsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/testimonials",
  component: Testimonials,
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: Blog,
});
const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: BlogPost,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});
const hireMeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hire-me",
  component: HireMe,
});

// Admin root
const adminRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin-root",
  component: AdminRootLayout,
});
const adminLoginRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/login",
  component: AdminLogin,
});
const adminDashRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin",
  component: AdminDashboard,
});
const adminProjectsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/projects",
  component: AdminProjects,
});
const adminServicesRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/services",
  component: AdminServices,
});
const adminSkillsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/skills",
  component: AdminSkills,
});
const adminExperienceRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/experience",
  component: AdminExperience,
});
const adminTestimonialsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/testimonials",
  component: AdminTestimonials,
});
const adminBlogRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/blog",
  component: AdminBlog,
});
const adminMessagesRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/messages",
  component: AdminMessages,
});
const adminSettingsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/settings",
  component: AdminSettings,
});
const adminThemeRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/theme",
  component: AdminTheme,
});
const adminUsersRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/users",
  component: AdminUsers,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  portfolioRoute,
  projectDetailRoute,
  servicesRoute,
  skillsRoute,
  experienceRoute,
  testimonialsRoute,
  blogRoute,
  blogPostRoute,
  contactRoute,
  hireMeRoute,
  adminRootRoute.addChildren([
    adminLoginRoute,
    adminDashRoute,
    adminProjectsRoute,
    adminServicesRoute,
    adminSkillsRoute,
    adminExperienceRoute,
    adminTestimonialsRoute,
    adminBlogRoute,
    adminMessagesRoute,
    adminSettingsRoute,
    adminThemeRoute,
    adminUsersRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
