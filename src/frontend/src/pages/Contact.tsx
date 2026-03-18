import PageTransition from "@/components/PageTransition";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/useQueries";
import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const { mutateAsync, isPending } = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await mutateAsync({
        id: crypto.randomUUID(),
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        createdAt: new Date().toISOString(),
        isRead: false,
      });
      setSent(true);
      toast.success("Message sent! I'll get back to you soon.");
    } catch {
      toast.error("Failed to send. Please try again.");
    }
  };

  const CONTACT_INFO = [
    {
      icon: Mail,
      label: "Email",
      value: "alex@example.com",
      href: "mailto:alex@example.com",
    },
    { icon: MapPin, label: "Location", value: "San Francisco, CA", href: "#" },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 012-3456",
      href: "tel:+15550123456",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 mesh-bg">
        <section className="section">
          <div className="container-custom">
            <SectionTitle
              eyebrow="Get In Touch"
              title="Let's"
              highlight="Connect"
              description="Have a project in mind? Want to collaborate? Or just want to say hi? My inbox is always open."
              center
            />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-16">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-6">
                {CONTACT_INFO.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 glass rounded-2xl p-5 hover:glow-primary transition-all card-hover group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium mt-0.5">{item.value}</p>
                    </div>
                  </motion.a>
                ))}

                {/* Social */}
                <div className="flex gap-3 mt-4">
                  {[
                    {
                      icon: SiGithub,
                      href: "https://github.com",
                      label: "GitHub",
                    },
                    {
                      icon: SiLinkedin,
                      href: "https://linkedin.com",
                      label: "LinkedIn",
                    },
                    { icon: SiX, href: "https://x.com", label: "X/Twitter" },
                  ].map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-11 h-11 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-primary transition-all"
                      aria-label={label}
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3"
              >
                {sent ? (
                  <div
                    className="glass rounded-2xl p-12 text-center gradient-border"
                    data-ocid="contact.success_state"
                  >
                    <CheckCircle2
                      size={48}
                      className="text-accent mx-auto mb-4"
                    />
                    <h3 className="font-heading font-bold text-2xl gradient-text mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground">
                      Thanks for reaching out. I'll get back to you within 24
                      hours.
                    </p>
                    <Button
                      onClick={() => setSent(false)}
                      variant="outline"
                      className="mt-6"
                    >
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="glass rounded-2xl p-8 gradient-border space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Name *</Label>
                        <Input
                          data-ocid="contact.input"
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          className="bg-muted/30 border-border/50 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Email *</Label>
                        <Input
                          data-ocid="contact.email.input"
                          type="email"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                          className="bg-muted/30 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Subject</Label>
                      <Input
                        data-ocid="contact.subject.input"
                        placeholder="What's this about?"
                        value={form.subject}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, subject: e.target.value }))
                        }
                        className="bg-muted/30 border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Message *</Label>
                      <Textarea
                        data-ocid="contact.textarea"
                        placeholder="Tell me about your project..."
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                        rows={6}
                        className="bg-muted/30 border-border/50 focus:border-primary resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      data-ocid="contact.submit_button"
                      disabled={isPending}
                      className="w-full bg-primary glow-primary font-heading font-semibold"
                      size="lg"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} className="mr-2" /> Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
