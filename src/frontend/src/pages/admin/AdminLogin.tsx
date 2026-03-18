import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@/hooks/useActor";
import { setAdminSession } from "@/lib/adminAuth";
import { useNavigate } from "@tanstack/react-router";
import { Code2, Eye, EyeOff, Loader2, Lock, LogIn, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function AdminLogin() {
  const { actor, isFetching } = useActor();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || isFetching) return;
    setIsLoading(true);
    setError("");
    try {
      const ok = await actor.verifyAdminCredentials(username, password);
      if (ok) {
        setAdminSession();
        navigate({ to: "/admin" });
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mesh-bg px-4">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.62 0.28 290 / 0.12) 0%, transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        <div className="glass-strong rounded-3xl p-10 gradient-border text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6 glow-primary">
            <Code2 size={28} className="text-primary" />
          </div>

          <h1 className="font-heading font-bold text-2xl mb-2">Admin Access</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Sign in to manage your portfolio.
          </p>

          <form onSubmit={handleSubmit} className="text-left space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="username"
                className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                Username
              </Label>
              <div className="relative">
                <User
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  data-ocid="admin.username.input"
                  className="pl-9 bg-white/5 border-white/10 focus:border-primary/50"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-ocid="admin.password.input"
                  className="pl-9 pr-9 bg-white/5 border-white/10 focus:border-primary/50"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="admin.error_state"
                className="text-destructive text-xs text-center px-3 py-2 rounded-lg bg-destructive/10"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              disabled={isLoading || isFetching}
              data-ocid="admin.login.submit_button"
              className="w-full bg-primary glow-primary font-heading font-semibold mt-2"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                  Verifying...
                </>
              ) : (
                <>
                  <LogIn size={16} className="mr-2" /> Sign In
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-6">
            Default: <span className="font-mono text-primary/70">admin</span> /{" "}
            <span className="font-mono text-primary/70">admin123</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
