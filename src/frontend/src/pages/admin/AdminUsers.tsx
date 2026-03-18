import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/lib/auth";
import { Shield, Users } from "lucide-react";

export default function AdminUsers() {
  const { principal } = useAuth();
  return (
    <AdminGuard>
      <AdminLayout>
        <div>
          <h1 className="font-heading font-bold text-2xl mb-6">Users</h1>
          <div className="glass rounded-2xl p-8 gradient-border max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Users size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold">Current Admin</p>
                <p className="text-xs text-muted-foreground">
                  You are logged in as an admin
                </p>
              </div>
            </div>
            <div className="bg-muted/20 rounded-xl p-4 font-mono text-xs text-muted-foreground break-all">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={12} className="text-accent" />
                <span className="text-accent">Principal ID</span>
              </div>
              {principal ?? "Not authenticated"}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              User management is handled through Internet Identity. Admin roles
              are assigned by the canister controller.
            </p>
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
