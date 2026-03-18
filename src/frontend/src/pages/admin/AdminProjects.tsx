import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useProjectCRUD, useProjects } from "@/hooks/useQueries";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ProjectCategory } from "../../backend.d";
import type { Project } from "../../backend.d";

const BLANK: Omit<Project, "id"> = {
  title: "",
  featured: false,
  order: BigInt(0),
  tags: [],
  description: "",
  imageUrl: "",
  shortDesc: "",
  category: ProjectCategory.web,
  githubUrl: undefined,
  liveUrl: undefined,
};

export default function AdminProjects() {
  const { data: projects } = useProjects();
  const { create, update, remove } = useProjectCRUD();
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Project, "id">>(BLANK);

  const handleCreate = async () => {
    try {
      await create.mutateAsync({ ...form, id: crypto.randomUUID() });
      toast.success("Project created!");
      setCreating(false);
      setForm(BLANK);
    } catch {
      toast.error("Failed to create project.");
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    try {
      await update.mutateAsync({ id: editing.id, data: editing });
      toast.success("Project updated!");
      setEditing(null);
    } catch {
      toast.error("Failed to update project.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await remove.mutateAsync(id);
      toast.success("Project deleted.");
    } catch {
      toast.error("Failed to delete project.");
    }
  };

  const FormFields = ({
    data,
    onChange,
  }: {
    data: Omit<Project, "id">;
    onChange: (d: Omit<Project, "id">) => void;
  }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          className="bg-muted/30 border-border/50"
        />
      </div>
      <div className="space-y-2">
        <Label>Short Description</Label>
        <Input
          value={data.shortDesc}
          onChange={(e) => onChange({ ...data, shortDesc: e.target.value })}
          className="bg-muted/30 border-border/50"
        />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label>Description</Label>
        <Textarea
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          rows={3}
          className="bg-muted/30 border-border/50"
        />
      </div>
      <div className="space-y-2">
        <Label>Image URL</Label>
        <Input
          value={data.imageUrl}
          onChange={(e) => onChange({ ...data, imageUrl: e.target.value })}
          className="bg-muted/30 border-border/50"
        />
      </div>
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={data.category}
          onValueChange={(v) =>
            onChange({ ...data, category: v as ProjectCategory })
          }
        >
          <SelectTrigger className="bg-muted/30 border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ProjectCategory).map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Tags (comma separated)</Label>
        <Input
          value={data.tags.join(", ")}
          onChange={(e) =>
            onChange({
              ...data,
              tags: e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            })
          }
          className="bg-muted/30 border-border/50"
        />
      </div>
      <div className="space-y-2">
        <Label>Live URL</Label>
        <Input
          value={data.liveUrl ?? ""}
          onChange={(e) =>
            onChange({ ...data, liveUrl: e.target.value || undefined })
          }
          className="bg-muted/30 border-border/50"
        />
      </div>
      <div className="space-y-2">
        <Label>GitHub URL</Label>
        <Input
          value={data.githubUrl ?? ""}
          onChange={(e) =>
            onChange({ ...data, githubUrl: e.target.value || undefined })
          }
          className="bg-muted/30 border-border/50"
        />
      </div>
    </div>
  );

  return (
    <AdminGuard>
      <AdminLayout>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-heading font-bold text-2xl">Projects</h1>
            <Button
              onClick={() => setCreating(true)}
              className="bg-primary glow-primary font-heading"
            >
              <Plus size={16} className="mr-2" /> New Project
            </Button>
          </div>

          {/* Create form */}
          {creating && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 mb-6 gradient-border"
            >
              <h3 className="font-heading font-semibold mb-2">New Project</h3>
              <FormFields data={form} onChange={setForm} />
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={handleCreate}
                  disabled={create.isPending}
                  className="bg-primary font-heading"
                >
                  {create.isPending ? (
                    <Loader2 className="animate-spin mr-2" size={14} />
                  ) : (
                    <Save size={14} className="mr-2" />
                  )}{" "}
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCreating(false);
                    setForm(BLANK);
                  }}
                >
                  <X size={14} className="mr-2" /> Cancel
                </Button>
              </div>
            </motion.div>
          )}

          {/* Edit form */}
          {editing && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 mb-6 gradient-border"
            >
              <h3 className="font-heading font-semibold mb-2">
                Edit: {editing.title}
              </h3>
              <FormFields
                data={editing}
                onChange={(d) => setEditing({ ...editing, ...d })}
              />
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={handleUpdate}
                  disabled={update.isPending}
                  className="bg-primary font-heading"
                >
                  {update.isPending ? (
                    <Loader2 className="animate-spin mr-2" size={14} />
                  ) : (
                    <Save size={14} className="mr-2" />
                  )}{" "}
                  Update
                </Button>
                <Button variant="outline" onClick={() => setEditing(null)}>
                  <X size={14} className="mr-2" /> Cancel
                </Button>
              </div>
            </motion.div>
          )}

          {/* List */}
          <div className="glass rounded-2xl overflow-hidden">
            {(projects ?? []).map((p, i) => (
              <div
                key={p.id}
                data-ocid={`admin.project.row.${i + 1}`}
                className="flex items-center gap-4 px-6 py-4 border-b border-border/30 last:border-0 hover:bg-white/5 transition-colors"
              >
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-12 h-9 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{p.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {p.category} · {p.tags.slice(0, 3).join(", ")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => setEditing(p)}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 hover:text-destructive"
                    data-ocid={`admin.project.delete_button.${i + 1}`}
                    onClick={() => handleDelete(p.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
