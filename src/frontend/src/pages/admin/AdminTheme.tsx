import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme, useUpdateTheme } from "@/hooks/useQueries";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DEFAULT_THEME = {
  primaryColor: "#8b5cf6",
  secondaryColor: "#ec4899",
  accentColor: "#22d3ee",
  bgColor: "#0a0a0f",
  textColor: "#f8f8ff",
};

export default function AdminTheme() {
  const { data: theme } = useTheme();
  const { mutateAsync: updateTheme, isPending } = useUpdateTheme();
  const [colors, setColors] = useState(DEFAULT_THEME);

  useEffect(() => {
    if (theme) setColors({ ...DEFAULT_THEME, ...theme });
  }, [theme]);

  const handleSave = async () => {
    try {
      await updateTheme(colors);
      toast.success("Theme updated!");
    } catch {
      toast.error("Failed to update theme.");
    }
  };

  const FIELDS = [
    { key: "primaryColor" as const, label: "Primary Color" },
    { key: "secondaryColor" as const, label: "Secondary Color" },
    { key: "accentColor" as const, label: "Accent Color" },
    { key: "bgColor" as const, label: "Background Color" },
    { key: "textColor" as const, label: "Text Color" },
  ];

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="max-w-lg">
          <h1 className="font-heading font-bold text-2xl mb-6">Theme Colors</h1>
          <div className="glass rounded-2xl p-8 gradient-border space-y-6">
            {FIELDS.map((f) => (
              <div key={f.key} className="space-y-2">
                <Label>{f.label}</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={colors[f.key]}
                    onChange={(e) =>
                      setColors((c) => ({ ...c, [f.key]: e.target.value }))
                    }
                    className="w-12 h-10 rounded-lg cursor-pointer border border-border/50 bg-transparent"
                  />
                  <Input
                    value={colors[f.key]}
                    onChange={(e) =>
                      setColors((c) => ({ ...c, [f.key]: e.target.value }))
                    }
                    className="bg-muted/30 border-border/50 font-mono text-sm"
                  />
                  <div
                    className="w-10 h-10 rounded-lg border border-border/50"
                    style={{ backgroundColor: colors[f.key] }}
                  />
                </div>
              </div>
            ))}

            {/* Preview */}
            <div
              className="p-4 rounded-xl border border-border/30"
              style={{ backgroundColor: colors.bgColor }}
            >
              <p
                className="text-sm font-heading font-bold mb-2"
                style={{ color: colors.textColor }}
              >
                Preview
              </p>
              <div className="flex gap-3">
                <div
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: colors.primaryColor,
                    color: colors.textColor,
                  }}
                >
                  Primary
                </div>
                <div
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: colors.secondaryColor,
                    color: colors.textColor,
                  }}
                >
                  Secondary
                </div>
                <div
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: colors.accentColor,
                    color: colors.bgColor,
                  }}
                >
                  Accent
                </div>
              </div>
            </div>

            <Button
              onClick={handleSave}
              disabled={isPending}
              className="w-full bg-primary glow-primary font-heading"
              size="lg"
            >
              {isPending ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : (
                <Save size={16} className="mr-2" />
              )}
              Apply Theme
            </Button>
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
