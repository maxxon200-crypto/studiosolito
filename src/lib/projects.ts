import type { FotoKey } from "@/lib/foto";
import type { Locale } from "@/lib/i18n";

export type ProjectData = {
  slug: string;
  /* Grid weight: "wide" spans the full row, "tall" is a portrait feature. */
  span: "wide" | "tall" | "regular";
  cover: FotoKey;
  gallery: FotoKey[];
  place: string;
  year: string;
  type: Record<Locale, string>;
  surface: string;
  title: Record<Locale, string>;
  /* Short caption revealed on hover in the grid. */
  summary: Record<Locale, string>;
  /* Narrative paragraphs on the project page. */
  body: Record<Locale, string[]>;
};

export const projects: ProjectData[] = [
  {
    slug: "casa-monte-grappa",
    span: "wide",
    cover: "09",
    gallery: ["09", "02", "08", "05"],
    place: "Sesto San Giovanni (MI)",
    year: "2024",
    type: {
      it: "Ristrutturazione completa",
      en: "Full renovation",
    },
    surface: "115 m²",
    title: {
      it: "Casa Monte Grappa",
      en: "Casa Monte Grappa",
    },
    summary: {
      it: "Un trilocale anni '70 aperto in un'unica zona giorno luminosa.",
      en: "A 1970s flat opened into a single luminous living space.",
    },
    body: {
      it: [
        "Un appartamento degli anni Settanta, chiuso e frammentato, ridisegnato attorno a una famiglia di quattro persone. Abbiamo eliminato i corridoi e riunito cucina, pranzo e soggiorno in un unico ambiente affacciato sulla vetrata esistente, guadagnando luce e continuità.",
        "Il rovere del pavimento a spina prosegue nell'arredo su misura, mentre le pareti in calce chiara tengono lo sfondo neutro. Ogni scelta nasce dai gesti quotidiani: cucinare guardando i figli, ricevere senza barriere, avere spazio dove non si vede.",
        "Impianti, serramenti e finiture sono stati rifatti da zero, coordinati da un unico interlocutore dall'idea alla consegna.",
      ],
      en: [
        "A closed, fragmented 1970s apartment, redrawn around a family of four. We removed the corridors and brought kitchen, dining and living together into a single room facing the existing window wall, gaining light and continuity.",
        "The chevron oak floor continues into the bespoke joinery, while pale lime-plaster walls hold a neutral backdrop. Every choice grows from everyday gestures: cooking while watching the children, hosting without barriers, storage where it isn't seen.",
        "Services, windows and finishes were rebuilt from scratch, coordinated by a single point of contact from idea to handover.",
      ],
    },
  },
  {
    slug: "appartamento-marelli",
    span: "tall",
    cover: "01",
    gallery: ["01", "07", "03"],
    place: "Sesto San Giovanni (MI)",
    year: "2023",
    type: {
      it: "Cucina e zona giorno",
      en: "Kitchen and living area",
    },
    surface: "40 m²",
    title: {
      it: "Appartamento Marelli",
      en: "Appartamento Marelli",
    },
    summary: {
      it: "Cucina su misura in rovere e laccato opaco, cuore della casa.",
      en: "A bespoke oak and matte-lacquer kitchen at the heart of the home.",
    },
    body: {
      it: [
        "Una giovane coppia, una cucina che è anche il luogo dove si vive. Abbiamo disegnato un blocco su misura in rovere naturale e laccato opaco, con un'isola che diventa tavolo, piano di lavoro e punto d'incontro.",
        "La pietra grigio caldo del top e lo schienale continuo semplificano la pulizia e danno quiete visiva. La luce naturale della finestra sul lavello guida la disposizione degli elementi.",
      ],
      en: [
        "A young couple, and a kitchen that is also where life happens. We designed a bespoke block in natural oak and matte lacquer, with an island that becomes table, worktop and meeting point.",
        "The warm grey stone top and continuous backsplash simplify cleaning and give visual calm. Natural light from the window over the sink guides how the elements are arranged.",
      ],
    },
  },
  {
    slug: "casa-rondinella",
    span: "regular",
    cover: "02",
    gallery: ["02", "05", "08"],
    place: "Milano — Bicocca",
    year: "2023",
    type: {
      it: "Interior design",
      en: "Interior design",
    },
    surface: "90 m²",
    title: {
      it: "Casa Rondinella",
      en: "Casa Rondinella",
    },
    summary: {
      it: "Interni caldi e continui per una famiglia che riceve spesso.",
      en: "Warm, continuous interiors for a family that hosts often.",
    },
    body: {
      it: [
        "Un progetto di interni su una casa già ristrutturata, dove serviva dare carattere e coerenza. Abbiamo lavorato per sottrazione: una palette calda e continua, tessuti naturali, poche presenze forti e molta luce.",
        "Il soggiorno diventa un ambiente accogliente per ricevere, con sedute morbide e materiali che invecchiano bene. Nulla urla, tutto tiene insieme.",
      ],
      en: [
        "An interiors project on an already-renovated home that needed character and coherence. We worked by subtraction: a warm, continuous palette, natural fabrics, few strong presences and plenty of light.",
        "The living room becomes a welcoming place to host, with soft seating and materials that age well. Nothing shouts; everything holds together.",
      ],
    },
  },
  {
    slug: "loft-restellone",
    span: "regular",
    cover: "04",
    gallery: ["04", "10", "06"],
    place: "Sesto San Giovanni (MI)",
    year: "2022",
    type: {
      it: "Ristrutturazione bagni",
      en: "Bathroom renovation",
    },
    surface: "2 bagni",
    title: {
      it: "Loft Restellone",
      en: "Loft Restellone",
    },
    summary: {
      it: "Microcemento, pietra e bronzo per due bagni essenziali.",
      en: "Microcement, stone and bronze for two essential bathrooms.",
    },
    body: {
      it: [
        "Due bagni ripensati come stanze, non come servizi. Il microcemento beige avvolge le pareti senza fughe, la doccia walk-in scompare dietro un vetro rigato, il lavabo in pietra poggia su una mensola in rovere.",
        "I dettagli in bronzo spazzolato danno calore ai punti che si toccano ogni giorno. Materiali pochi, scelti per durare.",
      ],
      en: [
        "Two bathrooms rethought as rooms, not utilities. Beige microcement wraps the walls seamlessly, the walk-in shower disappears behind fluted glass, the stone basin rests on an oak shelf.",
        "Brushed-bronze details bring warmth to the points touched every day. Few materials, chosen to last.",
      ],
    },
  },
  {
    slug: "casa-parpagliona",
    span: "regular",
    cover: "05",
    gallery: ["05", "06", "02"],
    place: "Monza (MB)",
    year: "2022",
    type: {
      it: "Zona notte su misura",
      en: "Bespoke sleeping area",
    },
    surface: "55 m²",
    title: {
      it: "Casa Parpagliona",
      en: "Casa Parpagliona",
    },
    summary: {
      it: "Camera e cabina armadio in rovere, quiete e su misura.",
      en: "Bedroom and walk-in wardrobe in oak, quiet and tailor-made.",
    },
    body: {
      it: [
        "La zona notte di una casa di famiglia, disegnata per il riposo. Una boiserie in rovere avvolge la testata e prosegue nella cabina armadio, tenendo insieme camera e passaggio in un unico gesto.",
        "Biancheria di lino, luce morbida e mensole integrate: tutto ciò che serve è a portata, niente è in mostra.",
      ],
      en: [
        "The sleeping area of a family home, designed for rest. An oak panelled wall wraps the headboard and continues into the walk-in wardrobe, holding bedroom and passage together in a single gesture.",
        "Linen bedding, soft light and integrated shelves: everything needed is within reach, nothing is on display.",
      ],
    },
  },
  {
    slug: "appartamento-gorki",
    span: "regular",
    cover: "07",
    gallery: ["07", "01", "08", "03"],
    place: "Cinisello Balsamo (MI)",
    year: "2021",
    type: {
      it: "Ristrutturazione completa",
      en: "Full renovation",
    },
    surface: "80 m²",
    title: {
      it: "Appartamento Gorki",
      en: "Appartamento Gorki",
    },
    summary: {
      it: "Un bilocale trasformato in una casa contemporanea e calda.",
      en: "A two-room flat turned into a warm, contemporary home.",
    },
    body: {
      it: [
        "Un piccolo appartamento da ripensare per intero. La cucina laccata color tortora con mensole in rovere apre sul soggiorno; ogni centimetro è progettato per servire senza appesantire.",
        "Dalla demolizione alla consegna, un solo interlocutore ha seguito cantiere, fornitori e tempi. Il risultato è una casa che sembra più grande di quanto sia.",
      ],
      en: [
        "A small apartment to rethink entirely. The taupe lacquered kitchen with oak shelving opens onto the living room; every centimetre is designed to serve without adding weight.",
        "From demolition to handover, a single point of contact ran the site, suppliers and schedule. The result is a home that feels larger than it is.",
      ],
    },
  },
];

export function getProject(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectNeighbours(slug: string): {
  next: ProjectData;
} {
  const i = projects.findIndex((p) => p.slug === slug);
  const next = projects[(i + 1) % projects.length];
  return { next };
}
