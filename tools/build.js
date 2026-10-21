// Ajunta tots els data/<assig>/*.json en data.js (l'app el carrega amb <script>, funciona obrint index.html directament)
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "data");
const examens = [];
const problemes = [];

for (const assig of fs.readdirSync(DATA)) {
  const dir = path.join(DATA, assig);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
    let d;
    try { d = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")); }
    catch (e) { console.log(`  (s'omet ${assig}/${f}: ${e.message})`); continue; }
    if (!d.examen || !Array.isArray(d.problemes)) { console.log(`  (s'omet ${assig}/${f}: format incomplet)`); continue; }
    examens.push(d.examen);
    for (const p of d.problemes) problemes.push({ ...p, examen: d.examen.id });
  }
}

const out = `window.SELE = ${JSON.stringify({ generat: new Date().toISOString().slice(0, 10), examens, problemes })};\n`;
fs.writeFileSync(path.join(ROOT, "data.js"), out);

// Troncals per a la web tecnològica: mateixes dades, amb rutes absolutes cap a aquesta web
const BASE = "https://algoam-banyoles.github.io/banc-pau-humanistic-social/";
const TRONCALS = ["catala", "castella", "angles", "filosofia", "historia"];
const tr = {
  examens: examens.filter((e) => TRONCALS.includes(e.assignatura)),
  problemes: problemes.filter((p) => TRONCALS.includes(p.examen.split("-")[0])),
};
let trJson = JSON.stringify(tr)
  .replace(/"(img|pdfs)\//g, `"${BASE}$1/`)
  .replace(/\]\((img|pdfs)\//g, `](${BASE}$1/`);
fs.writeFileSync(path.join(ROOT, "data-troncals.js"), `window.SELE_TRONCALS = ${trJson};
`);
console.log(`data-troncals.js: ${tr.examens.length} exàmens, ${tr.problemes.length} problemes`);
console.log(`data.js: ${examens.length} exàmens, ${problemes.length} problemes`);
