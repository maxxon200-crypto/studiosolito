export type Locale = "it" | "en";

export const locales: Locale[] = ["it", "en"];

/* Static route pairs, Italian ↔ English. */
const routePairs: Array<{ it: string; en: string }> = [
  { it: "/", en: "/en" },
  { it: "/progetti", en: "/en/work" },
  { it: "/studio", en: "/en/studio" },
  { it: "/contatti", en: "/en/contact" },
];

/* Given any pathname, return its counterpart in the other locale. */
export function altPath(pathname: string, target: Locale): string {
  const clean = pathname.replace(/\/+$/, "") || "/";

  const itProject = clean.match(/^\/progetti\/([^/]+)$/);
  if (itProject) {
    return target === "en" ? `/en/work/${itProject[1]}` : clean;
  }
  const enProject = clean.match(/^\/en\/work\/([^/]+)$/);
  if (enProject) {
    return target === "it" ? `/progetti/${enProject[1]}` : clean;
  }

  const pair =
    routePairs.find((p) => p.it === clean || p.en === clean) ?? routePairs[0];
  return target === "it" ? pair.it : pair.en;
}

export function localeOfPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "it";
}

export const paths = {
  it: { home: "/", work: "/progetti", studio: "/studio", contact: "/contatti" },
  en: {
    home: "/en",
    work: "/en/work",
    studio: "/en/studio",
    contact: "/en/contact",
  },
} as const;

export function projectPath(locale: Locale, slug: string): string {
  return locale === "it" ? `/progetti/${slug}` : `/en/work/${slug}`;
}

/* UI copy. Italian first — it is the primary language of the site. */
export const t = {
  it: {
    skipToContent: "Vai al contenuto",
    nav: {
      work: "Progetti",
      studio: "Studio",
      contact: "Contatti",
      tagline: "Architettura",
    },
    hero: {
      eyebrow: "Studio di architettura — Sesto San Giovanni, Milano",
      title: "Diamo forma agli spazi in cui vivi.",
      ctaWork: "Progetti",
      ctaStart: "Inizia un progetto",
    },
    intro:
      "Interior design e ristrutturazioni complete per case private: un unico interlocutore, dall'idea alla consegna.",
    home: {
      selectedWork: "Progetti selezionati",
      allProjects: "Tutti i progetti",
    },
    services: {
      eyebrow: "Cosa facciamo",
      title: "Un unico interlocutore, dall'inizio alla fine.",
      items: [
        {
          name: "Progettazione",
          text: "Rilievo, concept, pratiche e progetto esecutivo. Ogni scelta parte da come vivi la casa: le abitudini, i ritmi, la luce.",
        },
        {
          name: "Ristrutturazione",
          text: "Coordiniamo cantiere, fornitori e tempi, e rispondiamo noi di tutto — dal preventivo alla consegna, senza sorprese.",
        },
        {
          name: "Interior design",
          text: "Materiali, luce e arredi su misura. Interni contemporanei, puliti e caldi, pensati per l'uso di ogni giorno.",
        },
      ],
    },
    stats: [
      { value: "15+", label: "anni di esperienza" },
      { value: "120+", label: "progetti realizzati" },
      { value: "100%", label: "progetti su misura" },
      { value: "1", label: "interlocutore unico" },
    ],
    cta: {
      eyebrow: "Contatti",
      title: "Parliamo del tuo progetto.",
      text: "Raccontaci la tua casa e come vorresti viverla. Ti rispondiamo entro due giorni lavorativi.",
      write: "Scrivici",
    },
    work: {
      title: "Progetti",
      intro:
        "Case private, cucine, bagni e interni su misura. Ogni progetto nasce dalle persone che lo abitano.",
    },
    project: {
      data: "Dati del progetto",
      place: "Luogo",
      year: "Anno",
      type: "Tipo",
      surface: "Superficie",
      next: "Progetto successivo",
      back: "Tutti i progetti",
    },
    studio: {
      title: "Uno studio, un interlocutore.",
      intro:
        "Studio di Architettura Solito progetta e ristruttura case private a Sesto San Giovanni, Milano e dintorni. Crediamo che una casa ben progettata non si veda prima di tutto: si viva. Per questo ogni progetto parte dalle persone — dalle abitudini, dai gesti di ogni giorno — e arriva a uno spazio contemporaneo, pulito e caldo, che assomiglia a chi lo abita.",
      valueTitle: "Il valore di un unico interlocutore",
      valueText:
        "Dalla prima idea alla consegna delle chiavi, il progetto resta nelle stesse mani. Niente passaggi tra figure diverse, niente responsabilità divise: un solo referente che disegna, coordina il cantiere e risponde del risultato. Per chi ristruttura significa meno pensieri, tempi chiari e un risultato fedele al progetto.",
      approachEyebrow: "Come lavoriamo",
      approach: [
        {
          name: "Ascolto",
          text: "Prima di disegnare, capiamo come vivi: chi c'è in casa, cosa funziona, cosa manca. Il rilievo misura lo spazio; l'ascolto misura tutto il resto.",
        },
        {
          name: "Progetto",
          text: "Concept, materiali, impianti e pratiche in un progetto esecutivo chiaro, con costi e tempi definiti prima di aprire il cantiere.",
        },
        {
          name: "Cantiere",
          text: "Seguiamo direttamente imprese e fornitori fino alla consegna. Tu hai un solo numero da chiamare, per qualsiasi cosa.",
        },
      ],
    },
    contact: {
      title: "Contatti",
      intro:
        "Siamo a Sesto San Giovanni, a due passi da Milano. Scrivici o chiamaci: il primo incontro è senza impegno.",
      whereTitle: "Dove siamo",
      mapLink: "Apri in Google Maps",
      phoneTitle: "Telefono",
      emailTitle: "Email",
      form: {
        title: "Raccontaci il tuo progetto",
        name: "Nome e cognome",
        email: "Email",
        phone: "Telefono (facoltativo)",
        message: "Il tuo progetto",
        messagePlaceholder:
          "Che casa è, dove si trova, cosa vorresti cambiare…",
        submit: "Invia la richiesta",
        note: "Inviando il modulo si apre il tuo programma di posta con il messaggio già pronto.",
      },
    },
    notFound: {
      title: "Pagina non trovata.",
      text: "La pagina che cerchi non esiste o è stata spostata.",
      back: "Torna alla home",
    },
    footer: {
      description:
        "Interior design e ristrutturazioni complete per case private.",
      nav: "Menu",
      contacts: "Contatti",
      rights: "Tutti i diritti riservati.",
    },
    meta: {
      title: "Studio Solito — Architettura e interior design a Sesto San Giovanni",
      description:
        "Studio di Architettura Solito: interior design e ristrutturazioni complete per case private a Sesto San Giovanni e Milano. Un unico interlocutore, dall'idea alla consegna.",
      workTitle: "Progetti",
      workDescription:
        "Case private, cucine, bagni e interni su misura: i progetti di Studio di Architettura Solito a Sesto San Giovanni e Milano.",
      studioTitle: "Studio",
      studioDescription:
        "Lo studio, l'approccio e il valore di un unico interlocutore dall'idea alla consegna.",
      contactTitle: "Contatti",
      contactDescription:
        "Scrivici o chiamaci per parlare del tuo progetto: Via Monte S. Michele 58F, Sesto San Giovanni (MI).",
    },
  },
  en: {
    skipToContent: "Skip to content",
    nav: {
      work: "Work",
      studio: "Studio",
      contact: "Contact",
      tagline: "Architecture",
    },
    hero: {
      eyebrow: "Architecture studio — Sesto San Giovanni, Milan",
      title: "Shaping the spaces you live in.",
      ctaWork: "Work",
      ctaStart: "Start a project",
    },
    intro:
      "Interior design and full renovations for private homes: one point of contact, from first idea to handover.",
    home: {
      selectedWork: "Selected work",
      allProjects: "All projects",
    },
    services: {
      eyebrow: "What we do",
      title: "One point of contact, from start to finish.",
      items: [
        {
          name: "Architecture",
          text: "Survey, concept, permits and detailed design. Every choice starts from how you live: your habits, your rhythms, the light.",
        },
        {
          name: "Renovation",
          text: "We coordinate site, suppliers and schedule — and answer for all of it, from the quote to the handover, with no surprises.",
        },
        {
          name: "Interior design",
          text: "Materials, light and bespoke furniture. Contemporary interiors, clean and warm, made for everyday life.",
        },
      ],
    },
    stats: [
      { value: "15+", label: "years of practice" },
      { value: "120+", label: "completed projects" },
      { value: "100%", label: "tailor-made projects" },
      { value: "1", label: "point of contact" },
    ],
    cta: {
      eyebrow: "Contact",
      title: "Let's talk about your project.",
      text: "Tell us about your home and how you would like to live in it. We reply within two working days.",
      write: "Write to us",
    },
    work: {
      title: "Work",
      intro:
        "Private homes, kitchens, bathrooms and bespoke interiors. Every project starts from the people who live in it.",
    },
    project: {
      data: "Project data",
      place: "Location",
      year: "Year",
      type: "Type",
      surface: "Surface",
      next: "Next project",
      back: "All projects",
    },
    studio: {
      title: "One studio, one point of contact.",
      intro:
        "Studio di Architettura Solito designs and renovates private homes in Sesto San Giovanni, Milan and the surrounding area. We believe a well-designed home is not something you notice first — it is something you live. Every project starts from people, from everyday habits and gestures, and arrives at a contemporary space, clean and warm, that resembles the people who inhabit it.",
      valueTitle: "The value of a single point of contact",
      valueText:
        "From the first idea to the handover of the keys, the project stays in the same hands. No handoffs between different figures, no divided responsibilities: one person who designs, runs the site and answers for the result. For anyone renovating, that means fewer worries, clear timelines and a result faithful to the design.",
      approachEyebrow: "How we work",
      approach: [
        {
          name: "Listening",
          text: "Before drawing, we understand how you live: who is at home, what works, what is missing. The survey measures the space; listening measures everything else.",
        },
        {
          name: "Design",
          text: "Concept, materials, systems and permits in one clear detailed design, with costs and timelines defined before the site opens.",
        },
        {
          name: "Site",
          text: "We follow contractors and suppliers directly, all the way to handover. You have one number to call, for anything.",
        },
      ],
    },
    contact: {
      title: "Contact",
      intro:
        "We are in Sesto San Giovanni, minutes from Milan. Write or call us — the first meeting carries no obligation.",
      whereTitle: "Where we are",
      mapLink: "Open in Google Maps",
      phoneTitle: "Phone",
      emailTitle: "Email",
      form: {
        title: "Tell us about your project",
        name: "Full name",
        email: "Email",
        phone: "Phone (optional)",
        message: "Your project",
        messagePlaceholder:
          "What kind of home it is, where it is, what you would like to change…",
        submit: "Send request",
        note: "Sending the form opens your mail app with the message ready to go.",
      },
    },
    notFound: {
      title: "Page not found.",
      text: "The page you are looking for does not exist or has been moved.",
      back: "Back to home",
    },
    footer: {
      description:
        "Interior design and full renovations for private homes.",
      nav: "Menu",
      contacts: "Contact",
      rights: "All rights reserved.",
    },
    meta: {
      title: "Studio Solito — Architecture and interior design in Sesto San Giovanni",
      description:
        "Studio di Architettura Solito: interior design and full renovations for private homes in Sesto San Giovanni and Milan. One point of contact, from idea to handover.",
      workTitle: "Work",
      workDescription:
        "Private homes, kitchens, bathrooms and bespoke interiors: projects by Studio di Architettura Solito in Sesto San Giovanni and Milan.",
      studioTitle: "Studio",
      studioDescription:
        "The studio, the approach, and the value of a single point of contact from idea to handover.",
      contactTitle: "Contact",
      contactDescription:
        "Write or call us to talk about your project: Via Monte S. Michele 58F, Sesto San Giovanni (MI), Italy.",
    },
  },
} as const;

export type Dict = (typeof t)[Locale];
