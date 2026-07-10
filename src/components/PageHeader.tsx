import Reveal from "@/components/Reveal";

/*
  Standard inner-page masthead. Clears the fixed nav and states the page's
  title and one-line intro. Content is visible by default; Reveal only adds
  the entrance motion.
*/
export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="border-b border-line">
      <div className="container-site pb-14 pt-[calc(var(--nav-h)+3.5rem)] md:pb-20 md:pt-[calc(var(--nav-h)+6rem)]">
        <Reveal>
          {eyebrow && <p className="eyebrow text-stone">{eyebrow}</p>}
          <h1 className="mt-5 max-w-[18ch] text-title text-balance">{title}</h1>
          {intro && (
            <p className="mt-7 max-w-2xl text-lead text-stone">{intro}</p>
          )}
        </Reveal>
      </div>
    </header>
  );
}
