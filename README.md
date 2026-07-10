# Studio Solito

Website for **Studio di Architettura Solito** — interior design and full
renovations for private homes in Sesto San Giovanni (Milan).

Next.js (App Router) · TypeScript · Tailwind CSS v4 · self-hosted Space Grotesk
· Lenis + GSAP (minimal, motion-safe). Vercel-ready (Framework Preset →
Next.js).

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # serve the production build
```

## Design system

The whole visual language lives in `src/app/globals.css` `@theme`. The default
Tailwind palette is switched off (`--color-*: initial`) so only the studio
tokens can be used:

| token   | hex       | role                          |
| ------- | --------- | ----------------------------- |
| paper   | `#F5F4F2` | base (≈60%)                   |
| bone    | `#EAE8E3` | surfaces (≈30%)               |
| ink     | `#1A1A18` | off-black text / inverted bg  |
| stone   | `#6E6A63` | muted labels                  |
| line    | `#D8D5CF` | hairlines                     |
| accent  | `#7C6A58` | warm taupe, used sparingly    |

One typeface only — **Space Grotesk** (variable 300–700), self-hosted via
`next/font/local` (`src/lib/fonts.ts`, files in `src/fonts/`). No serif, no
Inter.

Motion is deliberately minimal and always degrades safely:

- Content is **visible by default in CSS**. `Reveal` (`src/components/Reveal.tsx`)
  only hides an element _after_ mount and only when motion is allowed, then
  animates it back — so with JavaScript disabled, or with
  `prefers-reduced-motion: reduce`, nothing is ever hidden and the page never
  launches blank.
- Two effects only: a slow fade + rise as sections enter the viewport, and a
  slow hover zoom on project photos (pointer + motion-safe, CSS-only).
- Lenis smooth scroll (`src/components/LenisProvider.tsx`) is disabled entirely
  under reduced motion.

## Content

- **Copy & translations:** `src/lib/i18n.ts` (Italian primary, English mirror).
  Routes: Italian at `/`, English under `/en`.
- **Projects:** `src/lib/projects.ts` — data-driven (luogo, anno, tipo,
  superficie, narrative, gallery). Add a project by appending an entry; its
  IT/EN pages and sitemap entries are generated automatically.
- **Studio contact details:** `src/lib/site.ts`.

> `email` and `url` in `src/lib/site.ts` are placeholders derived from the
> studio name — confirm them with the client before launch.

## Photography

The site ships **labeled placeholders**, not imagery: every photo slot renders
a neutral `--bone` box with a small centered label naming the photo that
belongs there (a kitchen, a living area, a studio portrait…) and a subtle image
icon. This is the intended state until the client's real photography is ready —
**no AI-generated or stock imagery is used**.

The placeholder is `src/components/Media.tsx`; the ten slots and their labels
are defined in `src/lib/foto.ts` (`fotoMeta`). Slot `03` is the home/studio
hero, `09` is the large grid feature; the rest are grid thumbnails.

To drop in real photography later:

1. Add the photo files under `public/foto/`.
2. In `Media.tsx`, render a `next/image` (AVIF/WebP, lazy, blur placeholder) for
   slots that have a real file, falling back to the labeled placeholder for the
   rest. Re-enable the `images` config in `next.config.ts`.

Nothing about the layout or the rest of the code needs to change.

## Deploy

Import the repo in Vercel with the **Next.js** preset. Set the production
domain, then update `site.url` in `src/lib/site.ts` so canonical URLs,
`sitemap.xml` and `robots.txt` point at it.
