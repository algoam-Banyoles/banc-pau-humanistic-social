# Instruccions per a l'agent que processa un examen (lletres)

Estàs ajudant a construir una app d'estudi de selectivitat (PAU de Catalunya) per a alumnes de batxillerat.
Processa UN examen (el que t'indiquen al missatge) i genera'n el fitxer de dades.

1. Llegeix l'especificació i segueix-la al peu de la lletra: `D:\46354491s\Desktop\ProblemesLletres\tools\ESPECIFICACIO.md`
2. Si ja hi ha algun fitxer fet de la teva assignatura a `data/<assig>/`, mira'n un per copiar-ne l'estil.
3. Fitxers (relatius a `D:\46354491s\Desktop\ProblemesLletres`):
   - mira `pdfs/<assig>/index.txt` per saber quins PDFs hi ha d'aquell any i convocatòria
     (enunciat `<ANY>-<J|S>-examen*.pdf`, criteris `<ANY>-<J|S>-solucio*.pdf`)
   - sortida `data/<assig>/<ANY>-<J|S>.json`, figures a `img/<assig>/<ANY>-<J|S>/`
   - id d'examen `<assig>-<ANY>-<J|S>`; convocatoria `"juny"` (J) o `"setembre"` (S)
   - `materia`: el nom que surt a la portada de l'examen (p. ex. "Llatí" o "Llengua i Cultures Llatines";
     "Economia de l'empresa" o "Funcionament de l'Empresa i Disseny de Models de Negoci"; "Geografia").
   - **Comprova a la portada que el PDF és de la matèria que toca.** Si no ho és (p. ex. és d'una altra
     assignatura), no facis res i explica-ho a la resposta.
4. Si el PDF conté **diverses sèries**, fes-les totes en el mateix fitxer: `"serie": "3 i 4"` a examen,
   camp `"serie"` a cada pregunta, ids amb la sèrie (`historia-2014-J-s3-e1`), imatges `img/.../s3-e1.png`.
5. Entorn: Windows amb Bash POSIX, treballa des de `D:\46354491s\Desktop\ProblemesLletres`.
   Python: `/c/Users/46354491s/AppData/Local/Programs/Python/Python313/python.exe -I -X utf8`.
   Temporals en una subcarpeta pròpia del scratchpad amb el nom de l'examen. No toquis fitxers d'altres exàmens.
6. Mira visualment totes les pàgines; inclou TOTES les preguntes i opcions; solucions amb guia + resposta model
   + punts clau dels criteris oficials.
7. Valida amb `node tools/check.js data/<assig>/<ANY>-<J|S>.json` fins que passi, i després
   `python -I -X utf8 tools/crosscheck.py data/<assig>/<ANY>-<J|S>.json`.
8. En acabar, respon en 3-5 línies: nombre de preguntes, figures, discrepàncies amb l'oficial i incidències.
