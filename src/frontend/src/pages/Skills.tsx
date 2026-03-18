import AnimatedCard from "@/components/AnimatedCard";
import PageTransition from "@/components/PageTransition";
import SectionTitle from "@/components/SectionTitle";
import SkillBar from "@/components/SkillBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSkills } from "@/hooks/useQueries";
import { motion } from "motion/react";
import { useState } from "react";
import { SkillCategory } from "../backend.d";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: SkillCategory.frontend, label: "Frontend" },
  { value: SkillCategory.backend, label: "Backend" },
  { value: SkillCategory.design, label: "Design" },
  { value: SkillCategory.other, label: "Other" },
];

export default function Skills() {
  const [category, setCategory] = useState("all");
  const { data: skills } = useSkills();

  const filtered =
    category === "all"
      ? skills
      : skills?.filter((s) => s.category === category);

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 mesh-bg">
        <section className="section">
          <div className="container-custom">
            <SectionTitle
              eyebrow="Technical Skills"
              title="Tools &"
              highlight="Technologies"
              description="A comprehensive overview of my technical toolkit, built through years of real-world projects."
              center
            />

            <div className="flex justify-center mt-10 mb-12">
              <Tabs value={category} onValueChange={setCategory}>
                <TabsList className="glass p-1 h-auto">
                  {CATEGORIES.map((cat) => (
                    <TabsTrigger
                      key={cat.value}
                      value={cat.value}
                      className="font-heading text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {(filtered ?? []).map((skill, i) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <SkillBar
                    name={skill.name}
                    percentage={Number(skill.percentage)}
                    icon={skill.icon}
                    color={
                      skill.category === SkillCategory.frontend
                        ? "primary"
                        : skill.category === SkillCategory.backend
                          ? "accent"
                          : "secondary"
                    }
                    delay={i * 0.05}
                  />
                </motion.div>
              ))}
            </div>

            {/* Tool badges */}
            <div className="mt-20">
              <SectionTitle
                eyebrow="Also Know"
                title="Additional"
                highlight="Tools"
                center
              />
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {[
                  "Git",
                  "Docker",
                  "Kubernetes",
                  "Jest",
                  "Cypress",
                  "Webpack",
                  "Vite",
                  "Nginx",
                  "Redis",
                  "GraphQL",
                  "REST APIs",
                  "WebSockets",
                  "Storybook",
                  "Figma",
                  "Notion",
                ].map((tool) => (
                  <AnimatedCard
                    key={tool}
                    className="px-4 py-2 rounded-xl text-sm font-mono"
                    glowColor="none"
                  >
                    {tool}
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
