import PageHeader from "@/components/PageHeader";
import ProjectGrid from "@/components/ProjectGrid";
import ContactSection from "@/components/ContactSection";
import { t, type Locale } from "@/lib/i18n";
import { projects } from "@/lib/projects";

export default function WorkView({ locale }: { locale: Locale }) {
  const dict = t[locale];
  return (
    <>
      <main id="main">
        <PageHeader title={dict.work.title} intro={dict.work.intro} />
        <section className="py-14 md:py-20">
          <div className="container-site">
            <ProjectGrid projects={projects} locale={locale} />
          </div>
        </section>
      </main>
      <ContactSection locale={locale} dict={dict} />
    </>
  );
}
