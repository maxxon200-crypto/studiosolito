/*
  Single source of truth for studio contact data.
  TODO before launch: confirm `email` and `url` with the studio —
  both are placeholders derived from the studio name.
*/
export const site = {
  name: "Studio di Architettura Solito",
  shortName: "Studio Solito",
  address: {
    street: "Via Monte S. Michele 58F",
    city: "20099 Sesto San Giovanni (MI)",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Via+Monte+S.+Michele+58F+20099+Sesto+San+Giovanni+MI",
  },
  phone: {
    display: "388 897 2340",
    href: "tel:+393888972340",
  },
  email: "info@studiosolito.it",
  url: "https://www.studiosolito.it",
} as const;
