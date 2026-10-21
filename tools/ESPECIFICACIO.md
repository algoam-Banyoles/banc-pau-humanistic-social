# Especificació: banc de preguntes PAU de lletres

Objectiu: per a un examen (PDF d'enunciat + PDF de criteris de correcció oficials), generar UN fitxer JSON amb totes
les preguntes, preparades per a una app d'estudi per a alumnes de batxillerat (16-18 anys).
Les explicacions es redacten en **català**, excepte a **castellà** (tot en castellà) i **anglès** (enunciats, textos i
respostes model en anglès; la guia "com plantejar-ho" en català).

## Eines (executa sempre des de l'arrel `D:\46354491s\Desktop\ProblemesLletres`)

```
PY=/c/Users/46354491s/AppData/Local/Programs/Python/Python313/python.exe
$PY -I -X utf8 tools/pdftools.py text PDF [PAG]          # text amb coordenades de blocs
$PY -I -X utf8 tools/pdftools.py render PDF PAG OUT.png  # pàgina sencera, per MIRAR-LA amb Read
$PY -I -X utf8 tools/pdftools.py crop PDF PAG x0 y0 x1 y1 OUT.png   # retalla una imatge/document/mapa/gràfica
$PY -I -X utf8 tools/sheet.py img/<assig>/<examen> OUT.png         # full de contactes de les teves figures
node tools/check.js data/<assig>/<examen>.json                     # VALIDADOR
$PY -I -X utf8 tools/crosscheck.py data/<assig>/<examen>.json      # comprova que els textos surten al PDF
```

Temporals al scratchpad, en una **subcarpeta pròpia amb el nom del teu examen** (hi ha altres agents en paral·lel).
Mira visualment les pàgines amb render + Read; el text extret és una ajuda per copiar.

## Format JSON (`data/<assig>/<ANY>-<J|S>.json`)

```json
{
  "examen": {
    "id": "historia-2025-J", "assignatura": "historia", "materia": "Història", "any": 2025,
    "convocatoria": "juny", "serie": "1",
    "pdf_examen": "pdfs/historia/2025-J-examen.pdf", "pdf_solucio": "pdfs/historia/2025-J-solucio.pdf",
    "estructura": "Com és l'examen: parts, opcions, què cal triar, puntuació."
  },
  "problemes": [
    {
      "id": "historia-2025-J-e1-a",
      "exercici": 1, "questio": null, "opcio": "A", "serie": "1",
      "tipus": "comentari",
      "punts": 5,
      "titol": "Comentari d'un fragment del Manifest de Sandhurst (1874)",
      "tema": "segle-xix", "temes_secundaris": [],
      "conceptes": ["restauració borbònica", "canovisme", "comentari de text històric"],
      "dificultat": 2,
      "pagines": [3],
      "text": "Text, document o fragment sobre el qual es pregunta (Markdown), amb la font/autor al final. Buit si no n'hi ha.",
      "enunciat": "Consigna comuna (p. ex. 'Llegiu el text i responeu les preguntes').",
      "figures": [{"src": "img/historia/2025-J/e1-a.png", "peu": "Mapa de ..."}],
      "opcions": {},
      "apartats": [{"id": "1", "enunciat": "Situeu el text en el context històric.", "punts": 1}],
      "solucio": {
        "resposta": null,
        "passos": [
          {"apartat": null, "titol": "Com enfocar-ho", "cos": "Què es demana, quina estructura ha de tenir la resposta, errors que cal evitar."},
          {"apartat": "1", "titol": "Com plantejar-ho", "cos": "Idees clau que cal esmentar, en ordre, i per què."},
          {"apartat": "1", "titol": "Resposta model", "cos": "Una resposta completa com la d'un alumne que trauria la nota màxima."}
        ],
        "resultats": [{"apartat": "1", "valor": "Punts clau que valoren els criteris oficials (llista curta)."}],
        "nota": "Errors típics, consells de temps i extensió, què penalitzen les pautes."
      }
    }
  ]
}
```

### Camps

- `id`: `<examen>-e<exercici>[-q<questio>][-<opcio>]` (afegeix `-s<serie>` si el PDF té diverses sèries). Únic.
- `tipus`:
  - `test`: opció múltiple (`opcions` + `solucio.resposta`).
  - `oberta`: pregunta de resposta breu o de desenvolupament/teoria.
  - `comentari`: comentari de text, document, mapa, gràfica o imatge.
  - `redaccio`: producció escrita (redacció, argumentació, writing, dissertació).
  - `traduccio`: traducció (llatí).
  - `problema`: exercici numèric (economia de l'empresa).
- **Cada qüestió de test és un element separat.** Una pregunta amb subapartats és UN element amb `apartats`.
  Quan diverses preguntes depenen del mateix text, cada pregunta és un element i totes porten el mateix `text`.
- `text`: el text font complet (o el fragment), fidel a l'original, amb la referència. Les imatges, mapes i gràfiques
  van a `figures` (retallades i comprovades amb Read).
- `opcio`: "A"/"B" quan l'examen fa triar entre opcions; si no, `null`. Inclou TOTES les opcions.
- `titol`: curt i descriptiu (no "Pregunta 3"): de què va.
- `tema`/`temes_secundaris`: ids de la taula de l'assignatura (més avall). `conceptes`: 3-8 etiquetes en minúscula
  (autors, obres, períodes, fets, conceptes gramaticals, tipus d'exercici...). Reutilitza noms habituals.
- `dificultat`: 1-3. `pagines`: pàgines del PDF d'enunciat.

### La solució (el més important)

Per a cada pregunta (o apartat):
1. **"Com enfocar-ho"** (al principi): què demana exactament la consigna, quina estructura i extensió ha de tenir la
   resposta, quant temps li cal dedicar, errors que es penalitzen.
2. **"Com plantejar-ho"**: les idees o passos clau, en ordre, explicant **per què** (com ho faria un bon professor).
3. **"Resposta model"**: una resposta completa i ben redactada, de nivell excel·lent, de l'extensió que demana
   l'examen (si demana 150 paraules, que en tingui ~150). A les redaccions i comentaris, una resposta sencera.
4. `resultats`: per apartat, els **punts clau que valoren els criteris oficials** (resumits).
5. `nota`: errors típics, consells.

Basa't en els criteris oficials: la resposta model ha de cobrir tot el que valoren. Si l'oficial dona la resposta
(test, gramàtica, traducció), ha de coincidir; si hi ha una errada clara a l'oficial, explica-ho a `nota`.
Si l'oficial no dona resposta model, redacta-la tu.

### Particularitats

- **Català / castellà**: comprensió (respostes amb les paraules pròpies), resum i esquema, lèxic (sinònims,
  antònims, formació de mots), gramàtica i sintaxi (explica el raonament: substitució, concordança...), normativa,
  literatura (situa l'obra i l'autor, temes, fragment), argumentació (resposta model sencera amb tesi, arguments,
  conclusió i connectors). A castellà, tot el text en castellà.
- **Anglès**: reading (resposta correcta + on és la prova al text), use of English (regla gramatical), writing
  (model answer amb el nombre de paraules demanat, i una llista d'estructures i connectors útils). Si hi ha
  listening i no tenim l'àudio, inclou la pregunta i, si les pautes donen la transcripció o les respostes, fes-les
  servir; si no, indica a `nota` que cal l'àudio i dona només la resposta oficial.
- **Història de la filosofia**: explicació del fragment (idees principals i relació entre elles), conceptes
  (definició precisa), context del pensament de l'autor, comparació amb un altre autor, valoració personal raonada.
- **Història**: comentari de text o de document (classificació, idees principals, context, conseqüències),
  preguntes de desenvolupament (resposta model estructurada amb causes, fets, conseqüències i dates clau).
- **Llatí**: traducció **pas a pas**: anàlisi morfosintàctica (oracions, verbs, casos i funcions), traducció literal i
  traducció final en bon català; després morfologia, sintaxi, lèxic/etimologia i cultura/literatura.
- **Economia de l'empresa / Funcionament de l'empresa**: els problemes numèrics com a ciències: dades, fórmula,
  substitució, resultat amb unitats (€, %, unitats) i **interpretació**; verifica els números amb Python.
  Les preguntes teòriques, com a `oberta` amb resposta model.

### Temes per assignatura

**catala** i **castella**: `comprensio` (comprensió lectora, resum), `lexic` (lèxic i semàntica), `gramatica`
(morfologia i sintaxi), `normativa` (ortografia i correcció), `sociolinguistica` (varietats, llengua i societat),
`textos` (tipologia i propietats textuals), `literatura`, `expressio` (expressió escrita i argumentació).

**angles**: `reading`, `use-of-english` (gramàtica i vocabulari), `writing`, `listening`, `mediation`.

**filosofia**: `filosofia-antiga` (Plató, Aristòtil...), `filosofia-medieval` (Agustí, Tomàs d'Aquino...),
`filosofia-moderna` (Descartes, Locke, Hume, Rousseau, Kant...), `filosofia-contemporania` (Marx, Nietzsche, Mill,
Arendt, Wittgenstein, Beauvoir...). Posa l'autor als `conceptes`.

**historia**: `segle-xix` (crisi de l'Antic Règim, liberalisme, industrialització, Sexenni, Restauració fins al 1898),
`crisi-restauracio` (1898-1931, inclosa la dictadura de Primo de Rivera), `segona-republica`, `guerra-civil`,
`franquisme`, `transicio-democracia` (transició i democràcia fins avui), `mon-contemporani` (història universal:
guerres mundials, guerra freda, descolonització, UE, globalització), `catalunya` (com a secundari quan el focus és
Catalunya: catalanisme, Mancomunitat, Generalitat...).

**llati**: `traduccio`, `morfologia`, `sintaxi`, `lexic-etimologia`, `literatura`, `cultura`.

**empresa**: `empresa-entorn`, `organitzacio`, `produccio` (costos, llindar de rendibilitat, productivitat),
`financament` (inversions: VAN, TIR, termini de recuperació; fonts de finançament), `comptabilitat` (balanç, compte
de resultats, ràtios), `marqueting`, `recursos-humans`, `models-negoci` (model Canvas, propostes de valor),
`emprenedoria`.

### Format del text

- Markdown. Fórmules (només empresa) en LaTeX `$...$` (barres invertides dobles al JSON; € fora del LaTeX).
- Taules en Markdown. Salts de paràgraf amb `\n\n`. No posis HTML.
- Genera el JSON amb un script Python (`json.dumps(..., ensure_ascii=False, indent=2)`) per evitar errors d'escapament.

## Validació

`node tools/check.js data/<assig>/<examen>.json` sense errors i `crosscheck.py` sense problemes sospitosos.

## Convencions (apreses dels exàmens pilot — obligatòries)

Hi ha un exemple fet i revisat de cada assignatura a `data/<assig>/2026-J.json`: **mira'l abans de començar** i
copia'n l'estructura (com divideix les preguntes, ids, tipus, títols dels passos).

**General**
- `punts` = puntuació d'aquell element (no de tot l'exercici). La penalització del test (p. ex. −0,08 per error)
  i el barem oficial van a `estructura` i a la `nota`/"Com enfocar-ho".
- Opcions de test: amb les lletres del PDF (minúscula si el PDF fa servir minúscula); si no en té, `A`–`D`.
  Vertader/fals: `tipus: "test"`, `opcions: {"V": "Vertader", "F": "Fals"}`, resposta "V" o "F".
- Un apartat optatiu dins d'un exercici (triar 2.3 A o B): un element per opció, id `-e2-q3-a`, `questio` = 3.
  Si l'examen numera les opcions 1/2, posa `opcio` "A"/"B" i digues "Opció 1/2" a l'enunciat.
- `apartats[].id`: la numeració del PDF ("1.1", "2.3", "a"...).
- **Extensió**: si l'examen demana un nombre de paraules, la resposta model ha de quedar dins del límit; compta-ho
  amb Python i digues el recompte a la `nota`.
- Pàgines amb text no extraïble (o en dues columnes): transcriu-les mirant la pàgina renderitzada.
- Recalcula sempre els resultats numèrics de l'oficial (empresa) i documenta les diferències.
- **Exàmens antics**: l'estructura canvia molt entre anys (opcions A/B a tot l'examen, diverses sèries, altres tipus
  de pregunta). Comprova-la a la portada i a la pàgina 2 i adapta-hi la divisió en elements; explica-ho a `estructura`.

**Text i format**
- Markdown no té subratllat: el que l'examen subratlla, posa-ho en **negreta** (i digues-ho a l'enunciat si cal).
- Poemes: un vers per línia acabant amb dos espais + `\n` (`"vers  \n"`), i `\n\n` entre estrofes.
- Escriu "l·l" (no el caràcter "ŀ" que surt de vegades en extreure el PDF). Cursives de l'original amb `*...*`.
- El símbol `$` es llegeix com a LaTeX: en textos amb dòlars, escriu "USD".
- Textos font en l'idioma original (p. ex. un document en castellà a història); les explicacions en la llengua de l'assignatura.

**Llengua de cada camp**
- **castella**: tot en castellà, també els títols dels passos: "Cómo enfocarlo", "Cómo plantearlo", "Respuesta modelo".
- **angles**: `titol`, "Com enfocar-ho", "Com plantejar-ho", `resultats` i `nota` en català; `enunciat`, `text`,
  `opcions` i "Resposta model" en anglès.
- La resta: en català.

**Anglès**
- Listening: posa la transcripció oficial de l'àudio (si les pautes la donen) al camp **`transcripcio`** (Markdown) de
  cada pregunta de listening, no a `text`. A `text`, només la introducció i el glossari que surten a l'examen.
  A la solució, cita el fragment de la transcripció que justifica la resposta.
- Reading: cita el número de línia o la frase del text; si demana "use your own words", explica la paràfrasi.
- Writing: compta paraules (sense l'assumpte, la salutació ni el comiat, llevat que l'examen digui el contrari).

**Història**: exercici de fonts → `comentari` (apartats); redacció amb termes → `redaccio` (termes en negreta a la
resposta model); comparació/desenvolupament → `oberta`; test → un element per qüestió (`-e4-q1`), amb el context
comú a `text` i la consigna a `enunciat`. A les redaccions situades en una data, evita anacronismes (error típic).
Mapes i gràfiques: retalla'ls com a figura i fes-ne un `comentari`.

**Filosofia** (model 2025-26): text amb pregunta I (resum, `comentari`), II (mots, `oberta` amb apartats a/b) i III
(explicació d'una afirmació, `comentari`); exercici 2 (afirmació des de dos autors, `oberta`); exercici 3
(argumentació personal, `redaccio`, tema **`argumentacio`**). Extensions orientatives: I ~100 paraules, II 10-20 per
mot, III 350-500, ex. 2 250-350, ex. 3 200-300. Exercici 3: la resposta model pren posició i la `nota` diu que la
contrària, ben argumentada, té la mateixa nota. Autors als `conceptes` en minúscula i amb accent: plató, aristòtil,
agustí d'hipona, tomàs d'aquino, descartes, locke, hume, rousseau, kant, marx, nietzsche, mill, arendt, wittgenstein,
beauvoir, nussbaum... Els exàmens antics tenen un altre model (conceptes, context, comparació, valoració): adapta-t'hi.

**Llatí**: `e1` traducció (passos: "Com enfocar-ho", "Anàlisi: primera oració", "Anàlisi: segona oració"...,
"Traducció literal", "Resposta model"; la versió oficial a `resultats`; a `text`, el títol, el passatge, la referència
i el lèxic donat); `e2-q1` morfosintaxi i `e2-q2` etimologia (amb el text llatí a `text`); cultura/literatura: un
element per qüestió (`e3-q1-a`); exposició → `oberta` amb `tema: "literatura"` o `cultura`. Lectures als conceptes
en minúscula (ovidi, metamorfosis, plaute, virgili, eneida, cèsar...).

**Empresa**: un exercici sense opcions és un sol element (`problema` si té algun càlcul, `oberta` si és tot teoria).
Decimals dins de LaTeX amb `{,}` i sense punts de milers dins de `$...$`; taules de balanç i compte de resultats en
Markdown amb subtotals en negreta.

**Català i castellà**: vertader/fals o relacionar → `oberta` amb un apartat per afirmació (o `test` si és opció
múltiple); taules per omplir en Markdown a l'enunciat; literatura i comentari de text dialectal → `comentari`;
normativa i lèxic → `oberta`. Posa autor i obra als `conceptes`. Recorda les penalitzacions per faltes a la `nota`.

**Blocs "trieu N de M"** (p. ex. 2 de 4 qüestions): un element per qüestió amb `opcio: null`, i a l'enunciat i a
`estructura` digues quantes cal triar. **Numeració de 3 nivells** (3.2.5): `questio: "3.2.5"` i id `-e3-q3-2-5`.
**Vertader/fals de diverses afirmacions**: un sol element `oberta` amb un apartat per afirmació.
**crosscheck.py** pot marcar preguntes de pàgines sense text extraïble: si les has transcrit de la imatge, és una
falsa alarma; digues-ho a la resposta final.
