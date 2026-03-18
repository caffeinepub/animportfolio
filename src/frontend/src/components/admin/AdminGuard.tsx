import { isAdminSessionActive } from "@/lib/adminAuth";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminGuard({
  children,
}: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const ok = isAdminSessionActive();
    if (!ok) {
      navigate({ to: "/admin/login" });
    } else {
      setAllowed(true);
    }
    setChecked(true);
  }, [navigate]);

  if (!checked || !allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center mesh-bg">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-primary" size={32} />
          <p className="text-muted-foreground text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
