import PageTransition from "@/components/PageTransition";
import SectionTitle from "@/components/SectionTitle";
import Timeline from "@/components/Timeline";
import { useExperiences } from "@/hooks/useQueries";

export default function Experience() {
  const { data: experiences } = useExperiences();

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 mesh-bg">
        <section className="section">
          <div className="container-custom">
            <SectionTitle
              eyebrow="Career Journey"
              title="Work"
              highlight="Experience"
              description="A timeline of my professional journey, from junior developer to senior engineer building systems at scale."
              center
            />
            <div className="mt-16">
              <Timeline experiences={experiences ?? []} />
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
