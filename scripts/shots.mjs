import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const EXE = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const BASE = "http://localhost:3111";
const OUT = process.argv[2] || "/tmp/shots";
mkdirSync(OUT, { recursive: true });

const pages = [
  ["home-it", "/"],
  ["work-it", "/progetti"],
  ["project-it", "/progetti/casa-monte-grappa"],
  ["studio-it", "/studio"],
  ["contact-it", "/contatti"],
  ["home-en", "/en"],
  ["notfound", "/nope-does-not-exist"],
];

const browser = await chromium.launch({ executablePath: EXE });

async function shoot(label, opts) {
  const context = await browser.newContext(opts);
  const page = await context.newPage();
  for (const [name, path] of pages) {
    await page.goto(BASE + path, { waitUntil: "networkidle" }).catch(() => {});
    // let the reveal + fonts settle
    await page.waitForTimeout(900);
    await page.screenshot({
      path: `${OUT}/${label}-${name}.png`,
      fullPage: opts.fullPage ?? false,
    });
  }
  await context.close();
}

// Desktop, JS on
await shoot("desktop", { viewport: { width: 1440, height: 900 } });
// Desktop full-page (home + studio for composition review)
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  for (const [name, path] of [
    ["home-it", "/"],
    ["studio-it", "/studio"],
    ["work-it", "/progetti"],
    ["contact-it", "/contatti"],
    ["project-it", "/progetti/casa-monte-grappa"],
  ]) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(1100);
    await page.screenshot({ path: `${OUT}/full-${name}.png`, fullPage: true });
  }
  await context.close();
}
// Mobile
await shoot("mobile", { viewport: { width: 390, height: 844 } });
// JS disabled — must NOT be blank
await shoot("nojs", {
  viewport: { width: 1440, height: 900 },
  javaScriptEnabled: false,
});
// Reduced motion — content must be visible
await shoot("reduced", {
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});

await browser.close();
console.log("done");
