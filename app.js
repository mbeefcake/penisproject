import {
  ANATOMY_CATEGORIES,
  ANATOMY_STRUCTURES,
  HEMODYNAMIC_PHASES,
  SCENARIO_MODIFIERS,
  PATHOLOGIES,
  SELF_EXAM_STEPS,
  QUIZ_QUESTIONS
} from './data.js';

// ============================================================================
// 1. Tab-navigatie (focusgroup + hidden="until-found" + beforematch)
// ============================================================================

const tablist = document.querySelector('.tablist');
const tabs = Array.from(tablist.querySelectorAll('button[id^="tab-"]'));
const panels = Array.from(document.querySelectorAll('.tabpanels-grid > [role="tabpanel"]'));

function selectTab(targetTab) {
  for (const tab of tabs) {
    const isSelected = tab === targetTab;
    tab.setAttribute('aria-selected', String(isSelected));
    tab.toggleAttribute('focusgroupstart', isSelected);
  }

  for (const panel of panels) {
    const matches = panel.getAttribute('aria-labelledby') === targetTab.id;
    if (matches) {
      panel.removeAttribute('hidden');
      panel.setAttribute('tabindex', '0');
    } else {
      panel.hidden = 'until-found';
      panel.removeAttribute('tabindex');
    }
  }

  targetTab.scrollIntoView({
    block: 'nearest',
    inline: 'nearest',
    container: 'nearest'
  });
}

function initTabKeyboardFallback() {
  tablist.addEventListener('keydown', (event) => {
    const currentIndex = tabs.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = null;
    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      tabs[nextIndex].focus();
      selectTab(tabs[nextIndex]);
    }
  });
}

// Conditioneel laden van focusgroup-polyfill wanneer native ondersteuning ontbreekt
if (!(Object.hasOwn(HTMLElement.prototype, 'focusGroup'))) {
  import('@microsoft/focusgroup-polyfill')
    .then(({ polyfill }) => polyfill())
    .catch(() => initTabKeyboardFallback());
}

for (const tab of tabs) {
  tab.addEventListener('click', () => selectTab(tab));
  // Selection-follows-focus wanneer focusgroup pijltjestoetsen verplaatst
  tab.addEventListener('focus', () => selectTab(tab));
}

// Sync tab & panel wanneer browser find-in-page verborgen inhoud openklapt
for (const panel of panels) {
  panel.addEventListener('beforematch', () => {
    const tabId = panel.getAttribute('aria-labelledby');
    const matchingTab = tabs.find((t) => t.id === tabId);
    if (matchingTab) {
      selectTab(matchingTab);
    }
  });
}

// IntersectionObserver fallback voor scroll-fades wanneer scroll-driven animations ontbreken
if (!CSS.supports('animation-timeline', 'scroll()')) {
  for (const scroller of document.querySelectorAll('.scroller')) {
    const first = scroller.firstElementChild;
    const last = scroller.lastElementChild;
    if (!first || !last) continue;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, intersectionRatio } of entries) {
          scroller.classList.toggle(
            target === first ? 'more-start' : 'more-end',
            intersectionRatio < 1
          );
        }
      },
      { root: scroller, threshold: 1, rootMargin: '1px' }
    );

    observer.observe(first);
    observer.observe(last);
  }
}

// ============================================================================
// 2. Interactieve Anatomie Atlas
// ============================================================================

const svgSagittal = document.getElementById('svg-sagittal');
const svgTransverse = document.getElementById('svg-transverse');
const zoomFrame = document.getElementById('svg-zoom-frame');
const zoomReadout = document.getElementById('zoom-readout');
const structureChipsContainer = document.getElementById('structure-chips');
const inspOpenPathologyBtn = document.getElementById('insp-open-pathology');

let currentView = 'sagittal';
let currentZoom = 1;
let selectedStructureId = 'corpus-cavernosum';

function updateInspector(structureId) {
  const item = ANATOMY_STRUCTURES.find((s) => s.id === structureId);
  if (!item) return;
  selectedStructureId = item.id;

  const categoryInfo = ANATOMY_CATEGORIES[item.category];
  const catBadge = document.getElementById('insp-category');
  catBadge.textContent = categoryInfo ? categoryInfo.label : item.category;
  catBadge.style.color = categoryInfo ? `var(${categoryInfo.colorVar})` : 'var(--accent-color)';

  document.getElementById('insp-latin').textContent = item.latin;
  document.getElementById('insp-title').textContent = item.name;
  document.getElementById('insp-summary').textContent = item.summary;
  document.getElementById('insp-histology').textContent = item.histology;
  document.getElementById('insp-physiology').textContent = item.physiology;
  document.getElementById('insp-neurovascular').textContent = item.neurovascular;
  document.getElementById('insp-clinical').textContent = item.clinical;

  const related = PATHOLOGIES.find((p) => p.id === item.relatedPathologyId);
  if (related) {
    inspOpenPathologyBtn.hidden = false;
    inspOpenPathologyBtn.dataset.pathologyId = related.id;
    inspOpenPathologyBtn.textContent = `Dossier: ${related.name.split(' (')[0]}`;
  } else {
    inspOpenPathologyBtn.hidden = true;
  }

  // Highlight in actieve en verborgen SVGs + chips
  for (const el of document.querySelectorAll('.anat-part')) {
    el.classList.toggle('is-selected', el.dataset.structure === item.id);
  }
  for (const callout of document.querySelectorAll('.label-callout')) {
    callout.classList.toggle('is-selected', callout.dataset.target === item.id);
  }
  for (const chip of structureChipsContainer.querySelectorAll('.struct-chip')) {
    chip.classList.toggle('is-active', chip.dataset.structure === item.id);
  }
}

function renderStructureChips() {
  const visibleStructures = ANATOMY_STRUCTURES.filter((s) => s.views.includes(currentView));
  structureChipsContainer.innerHTML = '';

  for (const item of visibleStructures) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'struct-chip';
    btn.dataset.structure = item.id;
    if (item.id === selectedStructureId) {
      btn.classList.add('is-active');
    }

    const dot = document.createElement('i');
    dot.className = 'swatch';
    dot.style.background = `var(${ANATOMY_CATEGORIES[item.category].colorVar})`;
    dot.setAttribute('aria-hidden', 'true');

    btn.append(dot, document.createTextNode(item.name.split(' (')[0]));
    btn.addEventListener('click', () => updateInspector(item.id));
    structureChipsContainer.appendChild(btn);
  }
}

function switchAnatomyView(view) {
  currentView = view;
  const isSagittal = view === 'sagittal';
  svgSagittal.hidden = !isSagittal;
  svgTransverse.hidden = isSagittal;

  for (const btn of document.querySelectorAll('.view-btn')) {
    const active = btn.dataset.view === view;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  }

  const currentValid = ANATOMY_STRUCTURES.some(
    (s) => s.id === selectedStructureId && s.views.includes(view)
  );
  if (!currentValid) {
    const firstMatch = ANATOMY_STRUCTURES.find((s) => s.views.includes(view));
    if (firstMatch) selectedStructureId = firstMatch.id;
  }

  renderStructureChips();
  updateInspector(selectedStructureId);
}

for (const btn of document.querySelectorAll('.view-btn')) {
  btn.addEventListener('click', () => switchAnatomyView(btn.dataset.view));
}

// Laag-toggles voor beide SVGs
for (const toggle of document.querySelectorAll('[data-layer-toggle]')) {
  toggle.addEventListener('change', () => {
    const layerName = toggle.dataset.layerToggle;
    const show = toggle.checked;
    for (const group of document.querySelectorAll(`.svg-layer[data-layer="${layerName}"]`)) {
      group.classList.toggle('is-hidden', !show);
    }
  });
}

// Klik- en toetsenbord-interactie op SVG-onderdelen en labels
function bindAnatomySelection(elements, attr) {
  for (const el of elements) {
    const select = () => {
      const id = el.getAttribute(attr);
      if (id) updateInspector(id);
    };
    el.addEventListener('click', select);
    el.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select();
      }
    });
  }
}

bindAnatomySelection(document.querySelectorAll('.anat-part'), 'data-structure');
bindAnatomySelection(document.querySelectorAll('.label-callout'), 'data-target');

// Zoom controls
function applyZoom(nextZoom) {
  currentZoom = Math.min(1.8, Math.max(0.75, Number(nextZoom.toFixed(2))));
  zoomFrame.style.transform = `scale(${currentZoom})`;
  zoomReadout.textContent = `${Math.round(currentZoom * 100)}%`;
}

for (const btn of document.querySelectorAll('[data-zoom]')) {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.zoom;
    if (mode === 'in') applyZoom(currentZoom + 0.2);
    else if (mode === 'out') applyZoom(currentZoom - 0.2);
    else applyZoom(1);
  });
}

inspOpenPathologyBtn.addEventListener('click', () => {
  const pathId = inspOpenPathologyBtn.dataset.pathologyId;
  if (pathId) openClinicalDialog(pathId);
});

// ============================================================================
// 3. Hemodynamica & Erectiefysiologie Simulator
// ============================================================================

const arousalSlider = document.getElementById('arousal-slider');
const arousalValueLabel = document.getElementById('arousal-value');
const scenarioSelect = document.getElementById('scenario-select');
const scenarioDesc = document.getElementById('scenario-desc');
const presetButtons = Array.from(document.querySelectorAll('.preset-btn'));

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function updateHemodynamics() {
  const arousal = Number(arousalSlider.value);
  const scenario = SCENARIO_MODIFIERS[scenarioSelect.value] || SCENARIO_MODIFIERS.normal;
  arousalValueLabel.textContent = `${arousal}%`;
  scenarioDesc.textContent = scenario.description;

  // Fallback --progress update voor oudere browsers zonder accent-color
  if (!CSS.supports('accent-color', '#000')) {
    arousalSlider.style.setProperty('--progress', `${arousal}%`);
  }

  const phase =
    HEMODYNAMIC_PHASES.find((p) => arousal >= p.min && arousal <= p.max) ||
    HEMODYNAMIC_PHASES[0];

  const span = Math.max(1, phase.max - phase.min);
  const t = Math.min(1, Math.max(0, (arousal - phase.min) / span));

  const rawIcp = lerp(phase.icpRange[0], phase.icpRange[1], t);
  const rawFlow = lerp(phase.flowRange[0], phase.flowRange[1], t);
  const rawOcclusion = lerp(phase.occlusionRange[0], phase.occlusionRange[1], t);
  const rawCgmp = lerp(phase.cgmpRange[0], phase.cgmpRange[1], t);

  const icp = Math.round(Math.min(170, rawIcp * scenario.icpFactor));
  const flow = Math.round(Math.min(65, rawFlow * scenario.flowFactor));
  const occlusion = Math.round(Math.min(scenario.occlusionCap, rawOcclusion));
  const cgmp = Math.round(Math.min(100, rawCgmp * scenario.cgmpFactor));

  document.getElementById('phase-badge').textContent = phase.badge;
  document.getElementById('phase-title').textContent = phase.title;
  document.getElementById('phase-mechanism').textContent = phase.mechanism;

  document.getElementById('metric-icp').textContent = `${icp} mmHg`;
  document.getElementById('prog-icp').value = icp;

  document.getElementById('metric-flow').textContent = `${flow} mL/min`;
  document.getElementById('prog-flow').value = flow;

  document.getElementById('metric-occlusion').textContent = `${occlusion}%`;
  document.getElementById('prog-occlusion').value = occlusion;

  document.getElementById('metric-cgmp').textContent = `${cgmp}%`;
  document.getElementById('prog-cgmp').value = cgmp;

  document.getElementById('metric-muscle').textContent = phase.muscleState;

  // Synchroniseer actieve preset-knop
  for (const btn of presetButtons) {
    const val = Number(btn.dataset.arousal);
    btn.classList.toggle('is-active', val >= phase.min && val <= phase.max);
  }

  // Dynamische SVG-visualisatie bijwerken
  const effectiveScale = Math.min(
    1.05,
    0.34 + (phase.sinusoidScale - 0.34) * (occlusion > 0 ? Math.max(0.55, icp / 110) : 1)
  );
  const sinusoidRy = lerp(24, 62, (effectiveScale - 0.34) / 0.71);
  const sinusoidRx = lerp(110, 158, (effectiveScale - 0.34) / 0.71);
  const sinusoidCy = lerp(220, 176, (effectiveScale - 0.34) / 0.71);

  const sinusoidEl = document.getElementById('hemo-sinusoid');
  sinusoidEl.setAttribute('rx', sinusoidRx.toFixed(1));
  sinusoidEl.setAttribute('ry', sinusoidRy.toFixed(1));
  sinusoidEl.setAttribute('cy', sinusoidCy.toFixed(1));

  document.getElementById('hemo-sinusoid-text').setAttribute('y', (sinusoidCy - 4).toFixed(1));
  const icpInline = document.getElementById('hemo-icp-inline');
  icpInline.setAttribute('y', (sinusoidCy + 14).toFixed(1));
  icpInline.textContent = `ICP: ${icp} mmHg`;

  // Arteria helicina diameter & stroomsnelheid
  const arteryEl = document.getElementById('hemo-artery');
  const arteryFlowEl = document.getElementById('hemo-arterial-flow');
  const effectiveArteryWidth = Math.max(3, phase.arteryWidth * (scenario.id === 'endothelial' ? 0.55 : 1));
  arteryEl.setAttribute('stroke-width', effectiveArteryWidth.toFixed(1));
  arteryFlowEl.style.animationDuration = `${Math.max(0.25, 2.2 - flow / 32).toFixed(2)}s`;
  arteryFlowEl.style.opacity = flow > 2 ? '0.95' : '0.25';

  // Venule compressie (CVOM) tegen tunica albuginea
  const veinEl = document.getElementById('hemo-venule');
  const veinFlowEl = document.getElementById('hemo-venous-flow');
  const effectiveVeinWidth = Math.max(1.5, 13 * (1 - occlusion / 108));
  veinEl.setAttribute('stroke-width', effectiveVeinWidth.toFixed(1));
  veinFlowEl.style.opacity = occlusion > 85 ? '0.12' : '0.9';
  veinFlowEl.style.animationDuration = `${(0.8 + occlusion / 40).toFixed(2)}s`;

  const veinLabel = document.getElementById('hemo-vein-label');
  veinLabel.textContent =
    occlusion >= 75
      ? `Veneuze occlusie (${occlusion}%): venulen dichtgedrukt!`
      : `Subtunicale venulen open (${100 - occlusion}% afvoer)`;

  // Biochemische cascade nodes highlighten
  const activeStimulus = arousal > 15;
  document.getElementById('node-para').classList.toggle('is-active', activeStimulus);
  document.getElementById('node-no').classList.toggle(
    'is-active',
    activeStimulus && scenario.id !== 'endothelial'
  );
  document.getElementById('node-cgmp').classList.toggle('is-active', cgmp >= 30);
  document.getElementById('node-ca').classList.toggle('is-active', cgmp >= 40);
  document.getElementById('node-relax').classList.toggle('is-active', cgmp >= 45);

  const pde5Node = document.getElementById('node-pde5');
  const pde5Text = document.getElementById('pde5-status-text');
  pde5Node.classList.toggle('is-blocked', scenario.pde5Blocked);
  pde5Text.textContent = scenario.pde5Blocked ? 'GEBLOKKEERD!' : "cGMP → 5'-GMP";
}

arousalSlider.addEventListener('input', updateHemodynamics);
scenarioSelect.addEventListener('change', updateHemodynamics);

for (const btn of presetButtons) {
  btn.addEventListener('click', () => {
    arousalSlider.value = btn.dataset.arousal;
    updateHemodynamics();
  });
}

// ============================================================================
// 4. Pathologie & Varianten + Native <dialog closedby="any">
// ============================================================================

const pathologyGrid = document.getElementById('pathology-grid');
const pathologySearch = document.getElementById('pathology-search');
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const clinicalDialog = document.getElementById('clinical-dialog');

let activePathologyFilter = 'all';

function renderPathologyGraphic(visualType, compact = false) {
  const height = compact ? 84 : 138;
  const width = compact ? 220 : 380;

  switch (visualType) {
    case 'priapism':
      return `<svg viewBox="0 0 240 90" width="${width}" height="${height}">
        <rect x="20" y="28" width="145" height="34" rx="14" fill="var(--urgent-bg)" stroke="var(--urgent-border)" stroke-width="2.5"/>
        <path d="M165 26 C192 22 214 32 214 45 C214 58 192 68 165 64 Z" fill="var(--svg-glans-fill)" stroke="var(--cat-erectile)" stroke-width="2"/>
        <text x="92" y="49" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--urgent-border)">Ischemisch zwellichaam</text>
        <text x="190" y="80" text-anchor="middle" font-size="9" fill="var(--text-muted)">Glans blijft zacht</text>
      </svg>`;
    case 'phimosis':
      return `<svg viewBox="0 0 240 90" width="${width}" height="${height}">
        <rect x="25" y="26" width="115" height="38" rx="12" fill="var(--svg-cavernosum-bg)" stroke="var(--cat-erectile)" stroke-width="1.8"/>
        <path d="M140 24 C172 24 198 32 198 45 C198 58 172 66 140 66 Z" fill="var(--svg-glans-fill)" stroke="var(--cat-erectile)" stroke-width="2"/>
        <path d="M126 18 C134 18 134 72 126 72" fill="none" stroke="var(--urgent-border)" stroke-width="5" stroke-linecap="round"/>
        <text x="130" y="84" text-anchor="middle" font-size="9.5" font-weight="700" fill="var(--urgent-border)">Snoerende voorhuidring</text>
      </svg>`;
    case 'peyronie':
      return `<svg viewBox="0 0 240 90" width="${width}" height="${height}">
        <path d="M26 62 Q108 58 176 22" fill="none" stroke="var(--cat-erectile)" stroke-width="22" stroke-linecap="round" opacity="0.45"/>
        <path d="M84 36 Q114 25 138 19" fill="none" stroke="var(--urgent-border)" stroke-width="6" stroke-linecap="round"/>
        <text x="115" y="13" text-anchor="middle" font-size="9.5" font-weight="700" fill="var(--urgent-border)">Fibreus litteken (Plaque)</text>
        <text x="132" y="76" text-anchor="middle" font-size="9" fill="var(--text-muted)">Kromstand richting plaque</text>
      </svg>`;
    case 'ed':
      return `<svg viewBox="0 0 240 90" width="${width}" height="${height}">
        <path d="M24 45 H216" stroke="var(--cat-vascular)" stroke-width="14" opacity="0.25" stroke-linecap="round"/>
        <path d="M24 45 H95 C115 45 125 49 145 45 H216" fill="none" stroke="var(--cat-vascular)" stroke-width="5" stroke-dasharray="6 4"/>
        <ellipse cx="120" cy="36" rx="18" ry="6" fill="var(--cat-neural)"/>
        <ellipse cx="120" cy="54" rx="18" ry="6" fill="var(--cat-neural)"/>
        <text x="120" y="76" text-anchor="middle" font-size="9.5" fill="var(--text-muted)">Vernauwde arteriële instroom / veno-occlusief lek</text>
      </svg>`;
    case 'balanitis':
      return `<svg viewBox="0 0 240 90" width="${width}" height="${height}">
        <rect x="35" y="28" width="95" height="34" rx="10" fill="var(--svg-skin-fill)" stroke="var(--border-strong)" stroke-width="1.8"/>
        <path d="M130 24 C166 20 198 30 198 45 C198 60 166 70 130 66 Z" fill="var(--urgent-bg)" stroke="var(--urgent-border)" stroke-width="2.5"/>
        <circle cx="156" cy="40" r="3" fill="var(--urgent-border)"/>
        <circle cx="172" cy="50" r="2.5" fill="var(--urgent-border)"/>
        <text x="164" y="82" text-anchor="middle" font-size="9.5" fill="var(--urgent-border)">Ontstoken glans / sulcus</text>
      </svg>`;
    case 'hypospadias':
      return `<svg viewBox="0 0 240 90" width="${width}" height="${height}">
        <rect x="28" y="24" width="120" height="36" rx="12" fill="var(--svg-cavernosum-bg)" stroke="var(--cat-erectile)" stroke-width="1.8"/>
        <path d="M148 22 C180 20 204 30 204 42 C204 56 180 64 148 62 Z" fill="var(--svg-glans-fill)" stroke="var(--cat-erectile)" stroke-width="2"/>
        <path d="M32 48 H120 Q132 48 134 62" fill="none" stroke="var(--svg-urethra-wall)" stroke-width="5" stroke-linecap="round"/>
        <circle cx="134" cy="63" r="4.5" fill="var(--accent-color)"/>
        <text x="134" y="80" text-anchor="middle" font-size="9.5" font-weight="700" fill="var(--accent-color)">Ventrale meatusopening</text>
      </svg>`;
    case 'pearly':
      return `<svg viewBox="0 0 240 90" width="${width}" height="${height}">
        <rect x="34" y="26" width="96" height="38" rx="10" fill="var(--svg-skin-fill)" stroke="var(--border-strong)" stroke-width="1.5"/>
        <path d="M130 22 C166 18 196 30 196 45 C196 60 166 72 130 68 Z" fill="var(--svg-glans-fill)" stroke="var(--cat-erectile)" stroke-width="1.8"/>
        <circle cx="132" cy="28" r="2.6" fill="#fff" stroke="var(--success)" stroke-width="1.2"/>
        <circle cx="132" cy="36" r="2.6" fill="#fff" stroke="var(--success)" stroke-width="1.2"/>
        <circle cx="132" cy="45" r="2.6" fill="#fff" stroke="var(--success)" stroke-width="1.2"/>
        <circle cx="132" cy="54" r="2.6" fill="#fff" stroke="var(--success)" stroke-width="1.2"/>
        <circle cx="132" cy="62" r="2.6" fill="#fff" stroke="var(--success)" stroke-width="1.2"/>
        <text x="130" y="83" text-anchor="middle" font-size="9.5" font-weight="700" fill="var(--success)">Symmetrische goedaardige papeltjes</text>
      </svg>`;
    default:
      return `<svg viewBox="0 0 240 90" width="${width}" height="${height}">
        <rect x="40" y="22" width="160" height="44" rx="14" fill="var(--svg-skin-fill)" stroke="var(--border-strong)" stroke-width="1.8"/>
        <circle cx="80" cy="42" r="2.5" fill="var(--cat-neural)"/>
        <circle cx="102" cy="35" r="2.2" fill="var(--cat-neural)"/>
        <circle cx="122" cy="49" r="2.4" fill="var(--cat-neural)"/>
        <circle cx="148" cy="40" r="2.5" fill="var(--cat-neural)"/>
        <circle cx="166" cy="51" r="2.1" fill="var(--cat-neural)"/>
        <text x="120" y="82" text-anchor="middle" font-size="9.5" font-weight="700" fill="var(--success)">Fysiologische ectopische talgklieren</text>
      </svg>`;
  }
}

function openClinicalDialog(pathologyId) {
  const item = PATHOLOGIES.find((p) => p.id === pathologyId);
  if (!item) return;

  document.getElementById('dialog-badge').textContent = item.badge;
  document.getElementById('dialog-title').textContent = item.name;
  document.getElementById('dialog-visual').innerHTML = renderPathologyGraphic(item.visualType, false);
  document.getElementById('dialog-short').textContent = item.shortDesc;
  document.getElementById('dialog-pathophys').textContent = item.pathophysiology;
  document.getElementById('dialog-diagnostics').textContent = item.diagnostics;
  document.getElementById('dialog-treatment').textContent = item.treatment;
  document.getElementById('dialog-redflags').textContent = item.redFlags;

  const symptomsList = document.getElementById('dialog-symptoms');
  symptomsList.innerHTML = '';
  for (const s of item.symptoms) {
    const li = document.createElement('li');
    li.textContent = s;
    symptomsList.appendChild(li);
  }

  clinicalDialog.showModal();
}

// MANDATORY dialog guide: reset returnValue bij sluiten
clinicalDialog.addEventListener('close', () => {
  clinicalDialog.returnValue = '';
});

// MANDATORY light-dismiss fallback voor browsers zonder closedby-ondersteuning
if (!('closedBy' in HTMLDialogElement.prototype)) {
  clinicalDialog.addEventListener('click', (event) => {
    if (event.target !== clinicalDialog) return;
    const rect = clinicalDialog.getBoundingClientRect();
    const isDialogContent =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (isDialogContent) return;
    clinicalDialog.close();
  });
}

function renderPathologyGrid() {
  const query = pathologySearch.value.trim().toLowerCase();
  const filtered = PATHOLOGIES.filter((item) => {
    const matchesCat = activePathologyFilter === 'all' || item.category === activePathologyFilter;
    const matchesQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.shortDesc.toLowerCase().includes(query) ||
      item.pathophysiology.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  pathologyGrid.innerHTML = '';

  if (filtered.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'Geen ziektebeelden gevonden voor deze zoekopdracht.';
    pathologyGrid.appendChild(empty);
    return;
  }

  for (const item of filtered) {
    const card = document.createElement('article');
    card.className = `pathology-card is-${item.category}`;

    const top = document.createElement('div');
    top.className = 'path-card-top';
    const badge = document.createElement('span');
    badge.className = 'path-badge';
    badge.textContent = item.badge;
    top.appendChild(badge);

    const thumb = document.createElement('div');
    thumb.className = 'path-thumb';
    thumb.setAttribute('aria-hidden', 'true');
    thumb.innerHTML = renderPathologyGraphic(item.visualType, true);

    const title = document.createElement('h3');
    title.textContent = item.name;

    const desc = document.createElement('p');
    desc.textContent = item.shortDesc;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-ghost';
    btn.textContent = 'Bekijk klinisch dossier';
    btn.addEventListener('click', () => openClinicalDialog(item.id));

    card.append(top, thumb, title, desc, btn);
    pathologyGrid.appendChild(card);
  }
}

for (const btn of filterButtons) {
  btn.addEventListener('click', () => {
    activePathologyFilter = btn.dataset.filter;
    for (const b of filterButtons) {
      b.classList.toggle('is-active', b === btn);
    }
    renderPathologyGrid();
  });
}

pathologySearch.addEventListener('input', renderPathologyGrid);

// ============================================================================
// 5. Zelfonderzoek & Medische Kennistest (Quiz)
// ============================================================================

const examStepsList = document.getElementById('exam-steps');
const quizContainer = document.getElementById('quiz-container');
const quizProgress = document.getElementById('quiz-progress');
const quizProgressText = document.getElementById('quiz-progress-text');

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function renderExamSteps() {
  examStepsList.innerHTML = '';
  for (const item of SELF_EXAM_STEPS) {
    const li = document.createElement('li');
    const title = document.createElement('strong');
    title.textContent = `${item.step}. ${item.title}`;
    const detail = document.createElement('span');
    detail.textContent = item.detail;
    li.append(title, detail);
    examStepsList.appendChild(li);
  }
}

function renderQuiz() {
  quizContainer.innerHTML = '';

  if (quizIndex >= QUIZ_QUESTIONS.length) {
    quizProgress.value = QUIZ_QUESTIONS.length;
    quizProgressText.textContent = 'Voltooid';

    const resultTitle = document.createElement('h4');
    resultTitle.textContent = `Score: ${quizScore} van de ${QUIZ_QUESTIONS.length} goed`;

    const summary = document.createElement('p');
    summary.textContent =
      quizScore >= 5
        ? 'Uitstekend! Je beheerst zowel de peniele anatomie als het veno-occlusieve mechanisme en de klinische alarmsignalen.'
        : 'Goede poging! Bekijk de Anatomie Atlas en Hemodynamica-simulator nog eens om de details op te frissen.';

    const restartBtn = document.createElement('button');
    restartBtn.type = 'button';
    restartBtn.className = 'btn-primary';
    restartBtn.textContent = 'Quiz opnieuw starten';
    restartBtn.addEventListener('click', () => {
      quizIndex = 0;
      quizScore = 0;
      quizAnswered = false;
      renderQuiz();
    });

    quizContainer.append(resultTitle, summary, restartBtn);
    return;
  }

  const current = QUIZ_QUESTIONS[quizIndex];
  quizProgress.max = QUIZ_QUESTIONS.length;
  quizProgress.value = quizIndex + 1;
  quizProgressText.textContent = `Vraag ${quizIndex + 1} van ${QUIZ_QUESTIONS.length}`;

  const qEl = document.createElement('p');
  qEl.className = 'quiz-question';
  qEl.textContent = current.question;

  const optionsWrap = document.createElement('div');
  optionsWrap.className = 'quiz-options';

  const feedbackBox = document.createElement('div');
  feedbackBox.className = 'quiz-feedback';
  feedbackBox.hidden = true;

  const actionsWrap = document.createElement('div');
  actionsWrap.className = 'quiz-actions';
  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'btn-primary';
  nextBtn.textContent = quizIndex === QUIZ_QUESTIONS.length - 1 ? 'Bekijk eindscore' : 'Volgende vraag';
  nextBtn.hidden = true;
  nextBtn.addEventListener('click', () => {
    quizIndex += 1;
    quizAnswered = false;
    renderQuiz();
  });
  actionsWrap.appendChild(nextBtn);

  current.options.forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option-btn';
    btn.textContent = optText;
    btn.addEventListener('click', () => {
      if (quizAnswered) return;
      quizAnswered = true;
      const isCorrect = idx === current.correctIndex;
      if (isCorrect) quizScore += 1;

      const allBtns = optionsWrap.querySelectorAll('button');
      allBtns.forEach((b, bIdx) => {
        b.disabled = true;
        if (bIdx === current.correctIndex) b.classList.add('is-correct');
        else if (bIdx === idx) b.classList.add('is-wrong');
      });

      feedbackBox.hidden = false;
      feedbackBox.textContent = `${isCorrect ? 'Correct! ' : 'Niet juist. '}${current.explanation}`;
      nextBtn.hidden = false;
    });
    optionsWrap.appendChild(btn);
  });

  quizContainer.append(qEl, optionsWrap, feedbackBox, actionsWrap);
}

// ============================================================================
// Initialisatie
// ============================================================================

switchAnatomyView('sagittal');
updateHemodynamics();
renderPathologyGrid();
renderExamSteps();
renderQuiz();
