import { Link } from "@tanstack/react-router";
import {
  Code2,
  ExternalLink,
  Github,
  Heart,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import { motion } from "motion/react";

export default function Footer() {
  const year = new Date().getFullYear();
  const host = typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(host)}`;

  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-transparent to-black/30">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Code2 size={16} className="text-primary" />
              </div>
              <span className="font-heading font-bold text-lg gradient-text">
                Alex.dev
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Full-stack developer & digital craftsman. Building products that
              are fast, beautiful, and built to last.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  icon: Twitter,
                  href: "https://twitter.com",
                  label: "Twitter",
                },
                { icon: Mail, href: "mailto:alex@example.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-primary transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/portfolio", label: "Portfolio" },
                { to: "/services", label: "Services" },
                { to: "/skills", label: "Skills" },
                { to: "/experience", label: "Experience" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-foreground">
              More
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/blog", label: "Blog" },
                { to: "/testimonials", label: "Testimonials" },
                { to: "/contact", label: "Contact" },
                { to: "/hire-me", label: "Hire Me" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year}. Built with{" "}
            <Heart size={12} className="inline text-secondary mx-1" /> using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              caffeine.ai <ExternalLink size={10} />
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
            Designed & built with passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
