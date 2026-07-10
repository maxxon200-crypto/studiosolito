/*
  Placeholder photography generator for /public/foto.

  The real client photos were not available in this build environment, so this
  script renders warm, on-brand architectural abstractions at the exact aspect
  ratios the layout expects. Each file is a real JPG with correct intrinsic
  dimensions, so next/image blur placeholders, AVIF/WebP encoding and layout
  all behave exactly as they will with the final photos.

  To drop in the real photography: replace public/foto/progetto-NN.jpg with the
  studio's photos (keep the names and rough aspect ratios) and rebuild. Nothing
  else needs to change.

  Palette is the site's own tokens:
    paper #F5F4F2 · bone #EAE8E3 · ink #1A1A18 · stone #6E6A63
    line #D8D5CF · accent #7C6A58
*/
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "foto");

const C = {
  paper: "#F5F4F2",
  bone: "#EAE8E3",
  ink: "#1A1A18",
  stone: "#6E6A63",
  line: "#D8D5CF",
  accent: "#7C6A58",
  // derived warm tints, kept within the family
  oak: "#B79A78",
  oakDark: "#96795A",
  light: "#FBFAF8",
  shadow: "#C8C4BC",
  greige: "#D7D0C4",
  warmMid: "#C4B9A8",
  clay: "#8C7863",
};

const px = (n) => Math.round(n);

/* A gentle film grain, so flat fills read as photographed surfaces. */
function grainLayer(w, h) {
  const n = w * h;
  const buf = Buffer.alloc(n * 4);
  // deterministic pseudo-noise (no Math.random dependency on seed quality)
  let seed = 20099;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let i = 0; i < n; i++) {
    const v = rnd();
    const g = v < 0.5 ? 0 : 255;
    buf[i * 4 + 0] = g;
    buf[i * 4 + 1] = g;
    buf[i * 4 + 2] = g;
    buf[i * 4 + 3] = Math.round(6 + v * 8); // 6–14 alpha
  }
  return sharp(buf, { raw: { width: w, height: h, channels: 4 } }).png();
}

/* Scene templates. Each returns an SVG string sized w×h.
   Every scene keeps a light upper zone, a toned floor/counter band and one or
   two defined masses with a contact shadow, so even a tight crop reads as an
   interior photograph rather than an empty gradient. */
const scenes = {
  // Soft window light across a calm room + a low sofa mass.
  windowRoom(w, h) {
    const floor = px(h * 0.68);
    const winX = px(w * 0.5);
    const winW = px(w * 0.44);
    const winTop = px(h * 0.07);
    const winH = px(h * 0.46);
    const sofaTop = px(h * 0.5);
    return `
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${C.light}"/>
          <stop offset="1" stop-color="${C.greige}"/>
        </linearGradient>
        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${C.light}"/>
          <stop offset="1" stop-color="${C.bone}"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#wall)"/>
      <rect x="${winX}" y="${winTop}" width="${winW}" height="${winH}" fill="url(#glow)"/>
      <rect x="${winX}" y="${winTop}" width="${winW}" height="${winH}" fill="none" stroke="${C.stone}" stroke-width="3" opacity="0.4"/>
      <line x1="${winX + winW / 2}" y1="${winTop}" x2="${winX + winW / 2}" y2="${winTop + winH}" stroke="${C.stone}" stroke-width="3" opacity="0.4"/>
      <rect x="0" y="${floor}" width="${w}" height="${h - floor}" fill="${C.oak}" opacity="0.7"/>
      <rect x="0" y="${floor}" width="${w}" height="${px(h * 0.012)}" fill="${C.clay}" opacity="0.5"/>
      <rect x="${px(w * 0.05)}" y="${sofaTop}" width="${px(w * 0.42)}" height="${floor - sofaTop}" fill="${C.warmMid}"/>
      <rect x="${px(w * 0.05)}" y="${sofaTop}" width="${px(w * 0.42)}" height="${px(h * 0.045)}" fill="${C.stone}" opacity="0.55"/>
      <rect x="${px(w * 0.05)}" y="${floor}" width="${px(w * 0.42)}" height="${px(h * 0.03)}" fill="${C.ink}" opacity="0.14"/>
    `;
  },

  // Vertical fluted oak panelling with a slim shelf — bespoke joinery.
  panelling(w, h) {
    const cols = 9;
    const gap = w / cols;
    let flutes = "";
    for (let i = 0; i < cols; i++) {
      const x = i * gap;
      flutes += `<rect x="${px(x)}" y="0" width="${px(gap * 0.84)}" height="${h}" fill="${C.oak}" opacity="${0.72 + (i % 2) * 0.14}"/>`;
      flutes += `<rect x="${px(x + gap * 0.84)}" y="0" width="${px(gap * 0.16)}" height="${h}" fill="${C.oakDark}"/>`;
    }
    const shelf = px(h * 0.58);
    return `
      <rect width="${w}" height="${h}" fill="${C.oakDark}"/>
      ${flutes}
      <rect x="0" y="${shelf}" width="${w}" height="${px(h * 0.02)}" fill="${C.ink}" opacity="0.22"/>
      <rect x="${px(w * 0.6)}" y="${px(shelf - h * 0.055)}" width="${px(w * 0.16)}" height="${px(h * 0.055)}" fill="${C.paper}" opacity="0.85"/>
    `;
  },

  // Kitchen: counter band, upper cabinets, tall unit, worktop light.
  kitchen(w, h, { taupe = false } = {}) {
    const cab = taupe ? C.warmMid : C.bone;
    const cabEdge = taupe ? C.clay : C.line;
    const counter = px(h * 0.56);
    const upper = px(h * 0.1);
    const upperH = px(h * 0.22);
    return `
      <defs>
        <linearGradient id="k" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${C.light}"/>
          <stop offset="1" stop-color="${C.greige}"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#k)"/>
      <rect x="0" y="${upper}" width="${px(w * 0.66)}" height="${upperH}" fill="${cab}"/>
      <rect x="0" y="${upper + upperH - px(h * 0.006)}" width="${px(w * 0.66)}" height="${px(h * 0.006)}" fill="${cabEdge}"/>
      <rect x="0" y="${counter}" width="${w}" height="${px(h * 0.055)}" fill="${C.stone}" opacity="0.6"/>
      <rect x="0" y="${counter + px(h * 0.055)}" width="${w}" height="${h}" fill="${cab}"/>
      <rect x="0" y="${counter + px(h * 0.055)}" width="${w}" height="${px(h * 0.012)}" fill="${C.ink}" opacity="0.12"/>
      <rect x="${px(w * 0.72)}" y="${upper}" width="${px(w * 0.28)}" height="${px(h * 0.75)}" fill="${C.oak}"/>
      <rect x="${px(w * 0.72)}" y="${upper}" width="${px(w * 0.02)}" height="${px(h * 0.75)}" fill="${C.oakDark}"/>
      <rect x="${px(w * 0.1)}" y="${counter - px(h * 0.035)}" width="${px(w * 0.06)}" height="${px(h * 0.035)}" fill="${C.accent}"/>
      <rect x="${px(w * 0.24)}" y="${counter - px(h * 0.028)}" width="${px(w * 0.05)}" height="${px(h * 0.028)}" fill="${C.paper}"/>
    `;
  },

  // Bathroom: microcement field, mirror disc, floating vanity + basin.
  bathroom(w, h) {
    const van = px(h * 0.6);
    return `
      <defs>
        <linearGradient id="bw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${C.bone}"/>
          <stop offset="1" stop-color="${C.warmMid}"/>
        </linearGradient>
        <radialGradient id="mir" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stop-color="${C.light}"/>
          <stop offset="1" stop-color="${C.greige}"/>
        </radialGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#bw)"/>
      <circle cx="${px(w * 0.5)}" cy="${px(h * 0.32)}" r="${px(Math.min(w, h) * 0.21)}" fill="url(#mir)" stroke="${C.stone}" stroke-width="3" opacity="0.9"/>
      <rect x="${px(w * 0.16)}" y="${van}" width="${px(w * 0.68)}" height="${px(h * 0.13)}" fill="${C.oak}"/>
      <rect x="${px(w * 0.16)}" y="${van}" width="${px(w * 0.68)}" height="${px(h * 0.012)}" fill="${C.light}" opacity="0.5"/>
      <rect x="${px(w * 0.16)}" y="${van + px(h * 0.13)}" width="${px(w * 0.68)}" height="${px(h * 0.03)}" fill="${C.ink}" opacity="0.12"/>
      <rect x="${px(w * 0.4)}" y="${van - px(h * 0.06)}" width="${px(w * 0.2)}" height="${px(h * 0.06)}" fill="${C.paper}"/>
      <rect x="${px(w * 0.49)}" y="${px(h * 0.22)}" width="${px(w * 0.022)}" height="${px(h * 0.14)}" fill="${C.accent}"/>
    `;
  },

  // Wide open-plan: window wall + floor + furniture rhythm.
  openPlan(w, h) {
    const floor = px(h * 0.64);
    const winTop = px(h * 0.05);
    let mullions = "";
    const bays = 5;
    for (let i = 1; i < bays; i++) {
      const x = px(w * 0.36 + (i * (w * 0.6)) / bays);
      mullions += `<line x1="${x}" y1="${winTop}" x2="${x}" y2="${floor}" stroke="${C.stone}" stroke-width="3" opacity="0.4"/>`;
    }
    return `
      <defs>
        <linearGradient id="opw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${C.light}"/>
          <stop offset="1" stop-color="${C.greige}"/>
        </linearGradient>
        <linearGradient id="opg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${C.bone}"/>
          <stop offset="1" stop-color="${C.light}"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#opw)"/>
      <rect x="${px(w * 0.36)}" y="${winTop}" width="${px(w * 0.6)}" height="${floor - winTop}" fill="url(#opg)"/>
      <rect x="${px(w * 0.36)}" y="${winTop}" width="${px(w * 0.6)}" height="${floor - winTop}" fill="none" stroke="${C.stone}" stroke-width="3" opacity="0.4"/>
      ${mullions}
      <rect x="0" y="${floor}" width="${w}" height="${h - floor}" fill="${C.oak}"/>
      <rect x="0" y="${floor}" width="${w}" height="${px(h * 0.015)}" fill="${C.clay}" opacity="0.5"/>
      <rect x="${px(w * 0.04)}" y="${px(h * 0.46)}" width="${px(w * 0.26)}" height="${floor - px(h * 0.46)}" fill="${C.warmMid}"/>
      <rect x="${px(w * 0.04)}" y="${px(h * 0.46)}" width="${px(w * 0.26)}" height="${px(h * 0.04)}" fill="${C.stone}" opacity="0.5"/>
      <rect x="${px(w * 0.62)}" y="${px(h * 0.5)}" width="${px(w * 0.18)}" height="${floor - px(h * 0.5)}" fill="${C.clay}"/>
      <rect x="${px(w * 0.62)}" y="${floor}" width="${px(w * 0.18)}" height="${px(h * 0.03)}" fill="${C.ink}" opacity="0.14"/>
    `;
  },

  // Bedroom: panelled headboard wall + bed mass + soft light.
  bedroom(w, h) {
    const bed = px(h * 0.58);
    return `
      <defs>
        <linearGradient id="bd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${C.light}"/>
          <stop offset="1" stop-color="${C.greige}"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#bd)"/>
      <rect x="${px(w * 0.12)}" y="${px(h * 0.08)}" width="${px(w * 0.76)}" height="${px(h * 0.44)}" fill="${C.oak}"/>
      <rect x="${px(w * 0.12)}" y="${px(h * 0.08)}" width="${px(w * 0.76)}" height="${px(h * 0.44)}" fill="none" stroke="${C.oakDark}" stroke-width="2" opacity="0.5"/>
      <rect x="0" y="${bed}" width="${w}" height="${h - bed}" fill="${C.warmMid}"/>
      <rect x="0" y="${bed}" width="${w}" height="${px(h * 0.09)}" fill="${C.bone}"/>
      <rect x="0" y="${bed + px(h * 0.09)}" width="${w}" height="${px(h * 0.02)}" fill="${C.stone}" opacity="0.4"/>
      <rect x="${px(w * 0.06)}" y="${bed - px(h * 0.05)}" width="${px(w * 0.2)}" height="${px(h * 0.05)}" fill="${C.paper}"/>
      <rect x="${px(w * 0.78)}" y="${px(h * 0.18)}" width="${px(w * 0.022)}" height="${px(h * 0.12)}" fill="${C.accent}"/>
    `;
  },

  // Dining corner: round table + pendant + wall shadow.
  dining(w, h) {
    const table = px(h * 0.64);
    return `
      <defs>
        <linearGradient id="dn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${C.light}"/>
          <stop offset="1" stop-color="${C.greige}"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#dn)"/>
      <rect x="0" y="${px(h * 0.7)}" width="${w}" height="${h}" fill="${C.oak}"/>
      <rect x="0" y="${px(h * 0.7)}" width="${w}" height="${px(h * 0.015)}" fill="${C.clay}" opacity="0.5"/>
      <ellipse cx="${px(w * 0.5)}" cy="${table + px(h * 0.04)}" rx="${px(w * 0.32)}" ry="${px(h * 0.05)}" fill="${C.ink}" opacity="0.12"/>
      <ellipse cx="${px(w * 0.5)}" cy="${table}" rx="${px(w * 0.32)}" ry="${px(h * 0.07)}" fill="${C.clay}"/>
      <ellipse cx="${px(w * 0.5)}" cy="${table - px(h * 0.008)}" rx="${px(w * 0.32)}" ry="${px(h * 0.05)}" fill="${C.oak}"/>
      <rect x="${px(w * 0.2)}" y="${table - px(h * 0.02)}" width="${px(w * 0.1)}" height="${px(h * 0.12)}" fill="${C.warmMid}"/>
      <rect x="${px(w * 0.7)}" y="${table - px(h * 0.02)}" width="${px(w * 0.1)}" height="${px(h * 0.12)}" fill="${C.warmMid}"/>
      <line x1="${px(w * 0.5)}" y1="${px(h * 0.08)}" x2="${px(w * 0.5)}" y2="${px(h * 0.26)}" stroke="${C.stone}" stroke-width="2" opacity="0.6"/>
      <ellipse cx="${px(w * 0.5)}" cy="${px(h * 0.3)}" rx="${px(w * 0.08)}" ry="${px(h * 0.055)}" fill="${C.paper}" stroke="${C.stone}" stroke-width="2" opacity="0.95"/>
    `;
  },

  // Joinery detail: close fluted oak + bronze handle + raking light.
  joineryDetail(w, h) {
    const cols = 6;
    const gap = w / cols;
    let flutes = "";
    for (let i = 0; i < cols; i++) {
      const x = i * gap;
      const shade = 0.4 + Math.abs(Math.sin(i * 1.1)) * 0.35;
      flutes += `<rect x="${px(x)}" y="0" width="${px(gap)}" height="${h}" fill="${C.oak}" opacity="${shade.toFixed(2)}"/>`;
      flutes += `<rect x="${px(x)}" y="0" width="2" height="${h}" fill="${C.oakDark}" opacity="0.6"/>`;
    }
    return `
      <rect width="${w}" height="${h}" fill="${C.oakDark}" opacity="0.5"/>
      ${flutes}
      <rect x="${px(w * 0.46)}" y="${px(h * 0.36)}" width="${px(w * 0.04)}" height="${px(h * 0.28)}" rx="2" fill="${C.accent}"/>
    `;
  },

  // Basin detail: stone basin on oak shelf, bronze tap.
  basinDetail(w, h) {
    return `
      <defs>
        <linearGradient id="bs" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${C.bone}"/>
          <stop offset="1" stop-color="${C.warmMid}"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#bs)"/>
      <rect x="0" y="${px(h * 0.56)}" width="${w}" height="${px(h * 0.12)}" fill="${C.oak}"/>
      <rect x="0" y="${px(h * 0.56)}" width="${w}" height="${px(h * 0.01)}" fill="${C.light}" opacity="0.5"/>
      <rect x="0" y="${px(h * 0.68)}" width="${w}" height="${px(h * 0.03)}" fill="${C.ink}" opacity="0.12"/>
      <rect x="${px(w * 0.28)}" y="${px(h * 0.44)}" width="${px(w * 0.44)}" height="${px(h * 0.15)}" rx="${px(h * 0.07)}" fill="${C.paper}" stroke="${C.stone}" stroke-width="2" opacity="0.95"/>
      <rect x="${px(w * 0.47)}" y="${px(h * 0.26)}" width="${px(w * 0.032)}" height="${px(h * 0.2)}" fill="${C.accent}"/>
      <rect x="${px(w * 0.47)}" y="${px(h * 0.26)}" width="${px(w * 0.12)}" height="${px(h * 0.028)}" fill="${C.accent}"/>
    `;
  },
};

/* filename → [width, height, sceneFn] */
const spec = {
  "progetto-01": [1200, 1500, (w, h) => scenes.kitchen(w, h)],
  "progetto-02": [1200, 1500, (w, h) => scenes.windowRoom(w, h)],
  "progetto-03": [2400, 1350, (w, h) => scenes.openPlan(w, h)], // hero + wide
  "progetto-04": [1200, 1500, (w, h) => scenes.bathroom(w, h)],
  "progetto-05": [1200, 1500, (w, h) => scenes.bedroom(w, h)],
  "progetto-06": [1200, 1500, (w, h) => scenes.panelling(w, h)],
  "progetto-07": [1200, 1600, (w, h) => scenes.kitchen(w, h, { taupe: true })],
  "progetto-08": [1200, 1500, (w, h) => scenes.dining(w, h)],
  "progetto-09": [2520, 1080, (w, h) => scenes.openPlan(w, h)], // wide grid slot
  "progetto-10": [1200, 1500, (w, h) => scenes.basinDetail(w, h)],
};

async function render(name, w, h, sceneFn) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${sceneFn(w, h)}
    <rect width="${w}" height="${h}" fill="url(#vig)"/>
    <defs>
      <radialGradient id="vig" cx="0.5" cy="0.42" r="0.75">
        <stop offset="0.6" stop-color="#000000" stop-opacity="0"/>
        <stop offset="1" stop-color="${C.ink}" stop-opacity="0.16"/>
      </radialGradient>
    </defs>
  </svg>`;

  const base = sharp(Buffer.from(svg)).resize(w, h);
  const grain = await grainLayer(w, h).toBuffer();

  await base
    .composite([{ input: grain, blend: "overlay" }])
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(join(OUT, `${name}.jpg`));

  return `${name}.jpg  ${w}×${h}`;
}

await mkdir(OUT, { recursive: true });
const results = [];
for (const [name, [w, h, fn]] of Object.entries(spec)) {
  results.push(await render(name, w, h, fn));
}
console.log("Generated:\n" + results.map((r) => "  " + r).join("\n"));
