import Link from "next/link";
import "./globals.css";
import RootShell from "@/components/RootShell";
import { paths, t } from "@/lib/i18n";

/*
  Global 404. With multiple root layouts there is no app/layout.tsx above this
  file, so it renders its own document via RootShell. Defaults to Italian, the
  primary language.
*/
export const metadata = {
  title: "404",
};

export default function NotFound() {
  const dict = t.it;
  return (
    <RootShell lang="it">
      <main
        id="main"
        className="flex min-h-[70svh] items-center pt-[var(--nav-h)]"
      >
        <div className="container-site">
          <p className="text-stat text-accent">404</p>
          <h1 className="mt-4 max-w-[16ch] text-title text-balance">
            {dict.notFound.title}
          </h1>
          <p className="mt-6 max-w-md text-lead text-stone">
            {dict.notFound.text}
          </p>
          <Link href={paths.it.home} className="btn btn-ink mt-10">
            {dict.notFound.back}
          </Link>
        </div>
      </main>
    </RootShell>
  );
}
