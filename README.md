# UroAtlas — Visuele Medische Atlas & Fysiologie van de Penis

Een interactieve, Nederlandstalige medisch-educatieve webapp gericht op de peniele anatomie (*Terminologia Anatomica*), erectiele hemodynamica, urologische pathologie en preventief zelfonderzoek.

## Modules & Visuele Onderdelen

1. **Anatomie Atlas (`Anatomie Atlas`)**
   - Interactieve gelaagde medische SVG-doorsneden: **Sagittale lengtedoorsnede** en **Transversale schachtdoorsnede**.
   - Aan- en uitschakelbare anatomische lagen: zwellichamen & urethra, vaatstelsel, zenuwstelsel, fasciën & huid, en labels.
   - Directe inspectie van histologie, fysiologische functie, vascularisatie/innervatie en klinische relevantie per structuur.
2. **Fysiologie & Hemodynamica Simulator (`Fysiologie & Hemodynamica`)**
   - Real-time simulatie van de 5 fasen (flaccide tot suprasystolische rigide erectie) met klinische modulatoren (normaal, PDE5-remmer, endotheeldisfunctie, veno-occlusieve lekkage).
   - Dynamische SVG-visualisatie van het **Corporaal Veno-Occlusief Mechanisme (CVOM)** en de **NO → sGC → cGMP** signaalcascade.
   - Live telemetriemeters voor intracaverneuze druk (ICP in mmHg), cavernosa arteriële flow (mL/min), veneuze occlusie (%) en cGMP-niveau.
3. **Pathologie & Goedaardige Varianten (`Pathologie & Varianten`)**
   - Doorzoekbaar en filterbaar overzicht van urgente spoedgevallen (ischemisch priapisme, parafimose), aandoeningen (ziekte van Peyronie, erectiele disfunctie, balanitis, hypospadie) en veelvoorkomende normale varianten (parelpapels, Fordyce-plekjes).
   - Gedetailleerde klinische dossiers in een toegankelijke modal met schematische illustratie.
4. **Zelfonderzoek & Medische Kennistest (`Zelfonderzoek & Quiz`)**
   - Stapsgewijze inspectie- en hygiënerichtlijnen (besneden vs. onbesneden anatomie) inclusief alarmsignalen.
   - Interactieve meerkeuzequiz met 6 medische vragen en directe inhoudelijke uitleg.

## Lokaal starten

Omdat de applicatie ES-modules (`type="module"`) gebruikt, dient deze via een lokale webserver geopend te worden:

```bash
npm start
```

Of met een willekeurige statische server (bijv. `npx serve .` of `python -m http.server`).

> **Medische disclaimer:** UroAtlas is een educatief anatomisch en fysiologisch referentiemiddel en vervangt geen medisch advies, diagnose of behandeling door een arts of uroloog.
