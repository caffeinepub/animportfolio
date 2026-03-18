import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useBlogPostCRUD, usePublishedPosts } from "@/hooks/useQueries";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { PostStatus } from "../../backend.d";
import type { BlogPost } from "../../backend.d";

const BLANK: BlogPost = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  tags: [],
  status: PostStatus.draft,
  publishedAt: undefined,
};

export default function AdminBlog() {
  const { data: posts } = usePublishedPosts();
  const { create, update, remove } = useBlogPostCRUD();
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<BlogPost>(BLANK);

  const handleCreate = async () => {
    try {
      await create.mutateAsync({ ...form, id: crypto.randomUUID() });
      toast.success("Post created!");
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
  }: { data: BlogPost; onChange: (d: BlogPost) => void }) => (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={data.title}
            onChange={(e) =>
              onChange({
                ...data,
                title: e.target.value,
                slug: e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, ""),
              })
            }
            className="bg-muted/30 border-border/50"
          />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input
            value={data.slug}
            onChange={(e) => onChange({ ...data, slug: e.target.value })}
            className="bg-muted/30 border-border/50 font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label>Cover Image URL</Label>
          <Input
            value={data.coverImageUrl}
            onChange={(e) =>
              onChange({ ...data, coverImageUrl: e.target.value })
            }
            className="bg-muted/30 border-border/50"
          />
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
      </div>
      <div className="space-y-2">
        <Label>Excerpt</Label>
        <Textarea
          value={data.excerpt}
          onChange={(e) => onChange({ ...data, excerpt: e.target.value })}
          rows={2}
          className="bg-muted/30 border-border/50"
        />
      </div>
      <div className="space-y-2">
        <Label>Content (Markdown)</Label>
        <Textarea
          value={data.content}
          onChange={(e) => onChange({ ...data, content: e.target.value })}
          rows={8}
          className="bg-muted/30 border-border/50 font-mono text-sm"
        />
      </div>
    </div>
  );

  return (
    <AdminGuard>
      <AdminLayout>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-heading font-bold text-2xl">Blog Posts</h1>
            <Button
              onClick={() => setCreating(true)}
              className="bg-primary glow-primary font-heading"
            >
              <Plus size={16} className="mr-2" /> New Post
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
                  <Save size={14} className="mr-2" /> Publish
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
            {(posts ?? []).map((post, i) => (
              <div
                key={post.id}
                className="flex items-center gap-4 px-6 py-4 border-b border-border/30 last:border-0 hover:bg-white/5"
              >
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-14 h-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{post.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge
                      className={`text-xs ${post.status === PostStatus.published ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"}`}
                    >
                      {post.status}
                    </Badge>
                    {post.publishedAt && (
                      <span className="text-xs text-muted-foreground">
                        {post.publishedAt}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => setEditing(post)}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 hover:text-destructive"
                    data-ocid={`admin.blog.delete_button.${i + 1}`}
                    onClick={() => handleDelete(post.id)}
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
