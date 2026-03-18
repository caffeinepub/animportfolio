import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useDeleteMessage,
  useMarkAsRead,
  useMessages,
} from "@/hooks/useQueries";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function AdminMessages() {
  const { data: messages } = useMessages();
  const { mutateAsync: markRead } = useMarkAsRead();
  const { mutateAsync: deleteMsg } = useDeleteMessage();

  const sorted = [...(messages ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <AdminGuard>
      <AdminLayout>
        <div>
          <h1 className="font-heading font-bold text-2xl mb-2">Messages</h1>
          <p className="text-muted-foreground text-sm mb-6">
            {messages?.filter((m) => !m.isRead).length ?? 0} unread message(s)
          </p>

          <div className="space-y-4">
            {sorted.length === 0 && (
              <div
                data-ocid="admin.messages.empty_state"
                className="text-center py-16 text-muted-foreground glass rounded-2xl"
              >
                No messages yet.
              </div>
            )}
            {sorted.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                data-ocid={`admin.messages.item.${i + 1}`}
                className={`glass rounded-2xl p-6 gradient-border ${
                  !msg.isRead ? "ring-1 ring-primary/20 bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-heading font-semibold">{msg.name}</p>
                      {!msg.isRead && (
                        <Badge className="bg-primary/20 text-primary text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {msg.email} ·{" "}
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </p>
                    {msg.subject && (
                      <p className="text-sm font-medium mb-2">{msg.subject}</p>
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {!msg.isRead && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:text-accent"
                        onClick={async () => {
                          await markRead(msg.id);
                          toast.success("Marked as read");
                        }}
                      >
                        <MailOpen size={14} />
                      </Button>
                    )}
                    {msg.isRead && (
                      <Mail size={14} className="text-muted-foreground mt-2" />
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 hover:text-destructive"
                      data-ocid={`admin.messages.delete_button.${i + 1}`}
                      onClick={async () => {
                        if (confirm("Delete message?")) {
                          await deleteMsg(msg.id);
                          toast.success("Deleted");
                        }
                      }}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
