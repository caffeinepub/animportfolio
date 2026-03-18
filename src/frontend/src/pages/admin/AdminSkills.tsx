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
import { Slider } from "@/components/ui/slider";
import { useSkillCRUD, useSkills } from "@/hooks/useQueries";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SkillCategory } from "../../backend.d";
import type { Skill } from "../../backend.d";

const BLANK: Skill = {
  id: "",
  name: "",
  icon: "",
  category: SkillCategory.frontend,
  percentage: BigInt(80),
};

export default function AdminSkills() {
  const { data: skills } = useSkills();
  const { create, update, remove } = useSkillCRUD();
  const [editing, setEditing] = useState<Skill | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Skill>(BLANK);

  const handleCreate = async () => {
    try {
      await create.mutateAsync({ ...form, id: crypto.randomUUID() });
      toast.success("Skill created!");
      setCreating(false);
      setForm(BLANK);
    } catch {
      toast.error("Failed.");
    }
  };
  const handleUpdate = async () => {
    if (!editing) return;
    try {
      await update.mutateAsync({ id: editing.id, data: editing });
      toast.success("Updated!");
      setEditing(null);
    } catch {
      toast.error("Failed.");
    }
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    try {
      await remove.mutateAsync(id);
      toast.success("Deleted.");
    } catch {
      toast.error("Failed.");
    }
  };

  const Form = ({
    data,
    onChange,
  }: { data: Skill; onChange: (d: Skill) => void }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          className="bg-muted/30 border-border/50"
        />
      </div>
      <div className="space-y-2">
        <Label>Icon (emoji)</Label>
        <Input
          value={data.icon}
          onChange={(e) => onChange({ ...data, icon: e.target.value })}
          className="bg-muted/30 border-border/50"
        />
      </div>
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={data.category}
          onValueChange={(v) =>
            onChange({ ...data, category: v as SkillCategory })
          }
        >
          <SelectTrigger className="bg-muted/30 border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(SkillCategory).map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Proficiency: {Number(data.percentage)}%</Label>
        <Slider
          value={[Number(data.percentage)]}
          min={0}
          max={100}
          step={1}
          onValueChange={([v]) => onChange({ ...data, percentage: BigInt(v) })}
          className="mt-2"
        />
      </div>
    </div>
  );

  return (
    <AdminGuard>
      <AdminLayout>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-heading font-bold text-2xl">Skills</h1>
            <Button
              onClick={() => setCreating(true)}
              className="bg-primary glow-primary font-heading"
            >
              <Plus size={16} className="mr-2" /> Add Skill
            </Button>
          </div>
          {creating && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 mb-6 gradient-border"
            >
              <Form data={form} onChange={setForm} />
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={handleCreate}
                  disabled={create.isPending}
                  className="bg-primary"
                >
                  <Save size={14} className="mr-2" /> Save
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
          {editing && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 mb-6 gradient-border"
            >
              <Form data={editing} onChange={(d) => setEditing(d)} />
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={handleUpdate}
                  disabled={update.isPending}
                  className="bg-primary"
                >
                  <Save size={14} className="mr-2" /> Update
                </Button>
                <Button variant="outline" onClick={() => setEditing(null)}>
                  <X size={14} className="mr-2" /> Cancel
                </Button>
              </div>
            </motion.div>
          )}
          <div className="glass rounded-2xl overflow-hidden">
            {(skills ?? []).map((s, i) => (
              <div
                key={s.id}
                className="flex items-center gap-4 px-6 py-4 border-b border-border/30 last:border-0 hover:bg-white/5"
              >
                <span className="text-xl">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.category} · {Number(s.percentage)}%
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => setEditing(s)}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 hover:text-destructive"
                    data-ocid={`admin.skills.delete_button.${i + 1}`}
                    onClick={() => handleDelete(s.id)}
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
