import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSettings, useUpdateSetting } from "@/hooks/useQueries";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CMS_FIELDS = [
  {
    key: "site_title",
    label: "Site Title",
    type: "input",
    placeholder: "Alex.dev",
  },
  {
    key: "tagline",
    label: "Tagline",
    type: "input",
    placeholder: "Full-stack developer",
  },
  {
    key: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "A short bio about yourself...",
  },
  {
    key: "email",
    label: "Contact Email",
    type: "input",
    placeholder: "your@email.com",
  },
  {
    key: "github_url",
    label: "GitHub URL",
    type: "input",
    placeholder: "https://github.com/username",
  },
  {
    key: "linkedin_url",
    label: "LinkedIn URL",
    type: "input",
    placeholder: "https://linkedin.com/in/username",
  },
  {
    key: "twitter_url",
    label: "Twitter/X URL",
    type: "input",
    placeholder: "https://x.com/username",
  },
];

export default function AdminSettings() {
  const { data: settings } = useSettings();
  const { mutateAsync: updateSetting, isPending } = useUpdateSetting();
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (settings) {
      const map: Record<string, string> = {};
      for (const s of settings) {
        map[s.key] = s.value;
      }
      setValues(map);
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      await Promise.all(
        Object.entries(values).map(([key, value]) =>
          updateSetting({ key, value }),
        ),
      );
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings.");
    }
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="max-w-2xl">
          <h1 className="font-heading font-bold text-2xl mb-6">CMS Settings</h1>
          <div className="glass rounded-2xl p-8 gradient-border space-y-5">
            {CMS_FIELDS.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    value={values[field.key] ?? ""}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [field.key]: e.target.value }))
                    }
                    placeholder={field.placeholder}
                    rows={4}
                    className="bg-muted/30 border-border/50"
                  />
                ) : (
                  <Input
                    value={values[field.key] ?? ""}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [field.key]: e.target.value }))
                    }
                    placeholder={field.placeholder}
                    className="bg-muted/30 border-border/50"
                  />
                )}
              </div>
            ))}
            <Button
              onClick={handleSave}
              disabled={isPending}
              data-ocid="admin.settings.save_button"
              className="bg-primary glow-primary font-heading w-full"
              size="lg"
            >
              {isPending ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : (
                <Save size={16} className="mr-2" />
              )}
              Save Settings
            </Button>
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
