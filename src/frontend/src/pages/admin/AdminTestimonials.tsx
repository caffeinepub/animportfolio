import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useTestimonialCRUD, useTestimonials } from "@/hooks/useQueries";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Testimonial } from "../../backend.d";

const BLANK: Testimonial = {
  id: "",
  name: "",
  role: "",
  company: "",
  text: "",
  avatarUrl: "",
  rating: BigInt(5),
  featured: false,
};

export default function AdminTestimonials() {
  const { data: testimonials } = useTestimonials();
  const { create, update, remove } = useTestimonialCRUD();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Testimonial>(BLANK);

  const handleCreate = async () => {
    try {
      await create.mutateAsync({ ...form, id: crypto.randomUUID() });
      toast.success("Created!");
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
  }: { data: Testimonial; onChange: (d: Testimonial) => void }) => (
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
        <Label>Role</Label>
        <Input
          value={data.role}
          onChange={(e) => onChange({ ...data, role: e.target.value })}
          className="bg-muted/30 border-border/50"
        />
      </div>
      <div className="space-y-2">
        <Label>Company</Label>
        <Input
          value={data.company}
          onChange={(e) => onChange({ ...data, company: e.target.value })}
          className="bg-muted/30 border-border/50"
        />
      </div>
      <div className="space-y-2">
        <Label>Avatar URL</Label>
        <Input
          value={data.avatarUrl}
          onChange={(e) => onChange({ ...data, avatarUrl: e.target.value })}
          className="bg-muted/30 border-border/50"
        />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label>Testimonial Text</Label>
        <Textarea
          value={data.text}
          onChange={(e) => onChange({ ...data, text: e.target.value })}
          rows={3}
          className="bg-muted/30 border-border/50"
        />
      </div>
      <div className="space-y-2">
        <Label>Rating: {Number(data.rating)}/5</Label>
        <Slider
          value={[Number(data.rating)]}
          min={1}
          max={5}
          step={1}
          onValueChange={([v]) => onChange({ ...data, rating: BigInt(v) })}
        />
      </div>
    </div>
  );

  return (
    <AdminGuard>
      <AdminLayout>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-heading font-bold text-2xl">Testimonials</h1>
            <Button
              onClick={() => setCreating(true)}
              className="bg-primary glow-primary font-heading"
            >
              <Plus size={16} className="mr-2" /> Add
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
            {(testimonials ?? []).map((t, i) => (
              <div
                key={t.id}
                className="flex items-center gap-4 px-6 py-4 border-b border-border/30 last:border-0 hover:bg-white/5"
              >
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="w-10 h-10 rounded-full bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {t.role} · {t.company}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => setEditing(t)}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 hover:text-destructive"
                    data-ocid={`admin.testimonials.delete_button.${i + 1}`}
                    onClick={() => handleDelete(t.id)}
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
