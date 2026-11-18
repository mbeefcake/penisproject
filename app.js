import {
  ANATOMY_CATEGORIES,
  ANATOMY_STRUCTURES,
  ORIENTATION_TERMS,
  HEMODYNAMIC_PHASES,
  SCENARIO_MODIFIERS,
  HEMO_HOTSPOTS,
  PATHOLOGIES,
  SYMPTOM_CHECKER_TAGS,
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

function goToTab(tabId) {
  const target = tabs.find((t) => t.id === tabId);
  if (target) {
    selectTab(target);
    target.focus();
  }
}

function initTabKeyboardFallback() {
  tablist.addEventListener('keydown', (event) => {
    const currentIndex = tabs.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = null;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      tabs[nextIndex].focus();
      selectTab(tabs[nextIndex]);
    }
  });
}

if (!(Object.hasOwn(HTMLElement.prototype, 'focusGroup'))) {
  import('@microsoft/focusgroup-polyfill')
    .then(({ polyfill }) => polyfill())
    .catch(() => initTabKeyboardFallback());
}

for (const tab of tabs) {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('focus', () => selectTab(tab));
}

for (const panel of panels) {
  panel.addEventListener('beforematch', () => {
    const tabId = panel.getAttribute('aria-labelledby');
    const matchingTab = tabs.find((t) => t.id === tabId);
    if (matchingTab) selectTab(matchingTab);
  });
}

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

// Header spoedwijzer knop -> schakel naar Tab 3 op urgent filter
document.getElementById('btn-quick-urgent').addEventListener('click', () => {
  goToTab('tab-pathology');
  setPathologyFilter('urgent');
});

// ============================================================================
// 2. Interactieve Anatomie Atlas
// ============================================================================

const svgSagittal = document.getElementById('svg-sagittal');
const svgTransverse = document.getElementById('svg-transverse');
const zoomFrame = document.getElementById('svg-zoom-frame');
const zoomReadout = document.getElementById('zoom-readout');
const svgTooltip = document.getElementById('svg-tooltip');
const atlasStateToggle = document.getElementById('atlas-state-toggle');
const structureChipsContainer = document.getElementById('structure-chips');
const inspOpenPathologyBtn = document.getElementById('insp-open-pathology');
const inspGotoHemoBtn = document.getElementById('insp-goto-hemo');
const inspDetailsBox = document.getElementById('insp-details');
const inspCounter = document.getElementById('insp-counter');

let currentView = 'sagittal';
let currentZoom = 1;
let isAtlasErect = false;
let selectedStructureId = 'corpus-cavernosum';

function getVisibleStructures() {
  return ANATOMY_STRUCTURES.filter((s) => s.views.includes(currentView));
}

function clearAtlasSelections() {
  for (const el of document.querySelectorAll('.anat-part, .label-callout, .orient-clickable')) {
    el.classList.remove('is-selected');
  }
  for (const chip of structureChipsContainer.querySelectorAll('.struct-chip')) {
    chip.classList.remove('is-active');
  }
}

function updateInspector(structureId) {
  const item = ANATOMY_STRUCTURES.find((s) => s.id === structureId);
  if (!item) return;
  selectedStructureId = item.id;

  const visibleList = getVisibleStructures();
  const idx = visibleList.findIndex((s) => s.id === item.id);
  inspCounter.textContent = idx >= 0 ? `${idx + 1} / ${visibleList.length}` : `— / ${visibleList.length}`;

  const categoryInfo = ANATOMY_CATEGORIES[item.category];
  const catBadge = document.getElementById('insp-category');
  catBadge.textContent = categoryInfo ? categoryInfo.label : item.category;
  catBadge.style.color = categoryInfo ? `var(${categoryInfo.colorVar})` : 'var(--accent-color)';

  document.getElementById('insp-latin').textContent = item.latin;
  document.getElementById('insp-title').textContent = item.name;
  document.getElementById('insp-summary').textContent = item.summary;

  inspDetailsBox.hidden = false;
  document.getElementById('insp-histology').textContent = item.histology;
  document.getElementById('insp-physiology').textContent = item.physiology;
  document.getElementById('insp-neurovascular').textContent = item.neurovascular;
  document.getElementById('insp-clinical').textContent = item.clinical;

  if (item.hemoFocusId && HEMO_HOTSPOTS[item.hemoFocusId]) {
    inspGotoHemoBtn.hidden = false;
    inspGotoHemoBtn.dataset.hemoFocusId = item.hemoFocusId;
  } else {
    inspGotoHemoBtn.hidden = true;
  }

  const related = PATHOLOGIES.find((p) => p.id === item.relatedPathologyId);
  if (related) {
    inspOpenPathologyBtn.hidden = false;
    inspOpenPathologyBtn.dataset.pathologyId = related.id;
    inspOpenPathologyBtn.textContent = `Dossier: ${related.name.split(' (')[0]}`;
  } else {
    inspOpenPathologyBtn.hidden = true;
  }

  clearAtlasSelections();
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

function showOrientationInInspector(orientKey) {
  const info = ORIENTATION_TERMS[orientKey];
  if (!info) return;

  const catBadge = document.getElementById('insp-category');
  catBadge.textContent = info.badge;
  catBadge.style.color = 'var(--accent-color)';

  document.getElementById('insp-latin').textContent = info.latin;
  document.getElementById('insp-title').textContent = info.title;
  document.getElementById('insp-summary').textContent = info.summary;
  inspCounter.textContent = 'Oriëntatie';

  // Gebruik 1ste detailblok voor anatomische toelichting
  inspDetailsBox.hidden = false;
  document.getElementById('insp-histology').textContent = info.details;
  document.getElementById('insp-physiology').textContent = 'Wordt wereldwijd gebruikt als vaste richtingsaanduiding ongeacht de houding van de penis.';
  document.getElementById('insp-neurovascular').textContent = 'Klik op een structuur of chip om terug te keren naar de weefsels.';
  document.getElementById('insp-clinical').textContent = 'Cruciaal voor nauwkeurige beschrijving van injectieplekken, kromstand of operatierichtingen.';

  inspGotoHemoBtn.hidden = true;
  inspOpenPathologyBtn.hidden = true;

  clearAtlasSelections();
  for (const el of document.querySelectorAll(`.orient-clickable[data-orient="${orientKey}"]`)) {
    el.classList.add('is-selected');
  }
}

function renderStructureChips() {
  const visibleStructures = getVisibleStructures();
  structureChipsContainer.innerHTML = '';

  for (const item of visibleStructures) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'struct-chip';
    btn.dataset.structure = item.id;
    if (item.id === selectedStructureId) btn.classList.add('is-active');

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
    const firstMatch = getVisibleStructures()[0];
    if (firstMatch) selectedStructureId = firstMatch.id;
  }

  renderStructureChips();
  updateInspector(selectedStructureId);
}

function focusStructureInAtlas(structureId) {
  const target = ANATOMY_STRUCTURES.find((s) => s.id === structureId);
  if (!target) return;

  goToTab('tab-anatomy');
  if (!target.views.includes(currentView)) {
    switchAnatomyView(target.views[0]);
  }
  updateInspector(target.id);
}

for (const btn of document.querySelectorAll('.view-btn')) {
  btn.addEventListener('click', () => switchAnatomyView(btn.dataset.view));
}

atlasStateToggle.addEventListener('click', () => {
  isAtlasErect = !isAtlasErect;
  atlasStateToggle.setAttribute('aria-pressed', String(isAtlasErect));
  atlasStateToggle.classList.toggle('is-erect', isAtlasErect);
  atlasStateToggle.textContent = isAtlasErect
    ? 'Staat: Erect (Doorbloeding ×10)'
    : 'Staat: Flaccide (Rust)';
  svgSagittal.classList.toggle('is-erect', isAtlasErect);
  svgTransverse.classList.toggle('is-erect', isAtlasErect);
});

for (const toggle of document.querySelectorAll('[data-layer-toggle]')) {
  toggle.addEventListener('change', () => {
    const layerName = toggle.dataset.layerToggle;
    const show = toggle.checked;
    for (const group of document.querySelectorAll(`.svg-layer[data-layer="${layerName}"]`)) {
      group.classList.toggle('is-hidden', !show);
    }
  });
}

// Zwevende hover-tooltip in SVG
function showTooltip(title, subtitle) {
  svgTooltip.innerHTML = '';
  const strong = document.createElement('strong');
  strong.textContent = title;
  const span = document.createElement('span');
  span.textContent = subtitle;
  svgTooltip.append(strong, span);
  svgTooltip.hidden = false;
}

function hideTooltip() {
  svgTooltip.hidden = true;
}

function bindInteractiveTarget(elements, attr, handler, tooltipResolver) {
  for (const el of elements) {
    const trigger = (event) => {
      event.stopPropagation();
      const val = el.getAttribute(attr);
      if (val) handler(val);
    };
    el.addEventListener('click', trigger);
    el.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        trigger(event);
      }
    });
    if (tooltipResolver) {
      el.addEventListener('pointerenter', () => {
        const info = tooltipResolver(el.getAttribute(attr));
        if (info) showTooltip(info.title, info.subtitle);
      });
      el.addEventListener('pointerleave', hideTooltip);
      el.addEventListener('focus', () => {
        const info = tooltipResolver(el.getAttribute(attr));
        if (info) showTooltip(info.title, info.subtitle);
      });
      el.addEventListener('blur', hideTooltip);
    }
  }
}

const structureTooltip = (id) => {
  const s = ANATOMY_STRUCTURES.find((item) => item.id === id);
  return s ? { title: s.name, subtitle: `${s.latin} — klik voor details` } : null;
};

const orientTooltip = (key) => {
  const o = ORIENTATION_TERMS[key];
  return o ? { title: o.title, subtitle: `${o.latin} — klik voor uitleg` } : null;
};

bindInteractiveTarget(document.querySelectorAll('.anat-part'), 'data-structure', updateInspector, structureTooltip);
bindInteractiveTarget(document.querySelectorAll('.label-callout'), 'data-target', updateInspector, structureTooltip);
bindInteractiveTarget(document.querySelectorAll('.orient-clickable'), 'data-orient', showOrientationInInspector, orientTooltip);

// Vorige / Volgende structuurknoppen
document.getElementById('insp-prev').addEventListener('click', () => {
  const list = getVisibleStructures();
  const idx = list.findIndex((s) => s.id === selectedStructureId);
  const prevIdx = idx <= 0 ? list.length - 1 : idx - 1;
  if (list[prevIdx]) updateInspector(list[prevIdx].id);
});

document.getElementById('insp-next').addEventListener('click', () => {
  const list = getVisibleStructures();
  const idx = list.findIndex((s) => s.id === selectedStructureId);
  const nextIdx = idx === -1 || idx >= list.length - 1 ? 0 : idx + 1;
  if (list[nextIdx]) updateInspector(list[nextIdx].id);
});

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

inspGotoHemoBtn.addEventListener('click', () => {
  const hemoId = inspGotoHemoBtn.dataset.hemoFocusId;
  goToTab('tab-physiology');
  if (hemoId) selectHemoHotspot(hemoId);
});

// ============================================================================
// 3. Hemodynamica & Erectiefysiologie Simulator
// ============================================================================

const arousalSlider = document.getElementById('arousal-slider');
const arousalValueLabel = document.getElementById('arousal-value');
const scenarioSelect = document.getElementById('scenario-select');
const scenarioDesc = document.getElementById('scenario-desc');
const presetButtons = Array.from(document.querySelectorAll('.preset-btn'));
const playCycleBtn = document.getElementById('btn-play-cycle');
const stressPulseBtn = document.getElementById('btn-stress-pulse');
const hotspotActionBtn = document.getElementById('hotspot-action');

let selectedHemoId = 'hemo-sinusoid';
let cycleIntervalId = null;
let cycleDirection = 1;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function updateHemodynamics() {
  const arousal = Number(arousalSlider.value);
  const scenario = SCENARIO_MODIFIERS[scenarioSelect.value] || SCENARIO_MODIFIERS.normal;
  arousalValueLabel.textContent = `${arousal}%`;
  scenarioDesc.textContent = scenario.description;

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

  for (const btn of presetButtons) {
    const val = Number(btn.dataset.arousal);
    btn.classList.toggle('is-active', val >= phase.min && val <= phase.max);
  }

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

  const arteryEl = document.getElementById('hemo-artery');
  const arteryFlowEl = document.getElementById('hemo-arterial-flow');
  const effectiveArteryWidth = Math.max(3, phase.arteryWidth * (scenario.id === 'endothelial' ? 0.55 : 1));
  arteryEl.setAttribute('stroke-width', effectiveArteryWidth.toFixed(1));
  arteryFlowEl.style.animationDuration = `${Math.max(0.25, 2.2 - flow / 32).toFixed(2)}s`;
  arteryFlowEl.style.opacity = flow > 2 ? '0.95' : '0.25';

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

function selectHemoHotspot(hemoId) {
  const info = HEMO_HOTSPOTS[hemoId];
  if (!info) return;
  selectedHemoId = hemoId;

  for (const el of document.querySelectorAll('.hemo-clickable')) {
    el.classList.toggle('is-selected', el.dataset.hemoId === hemoId);
  }

  document.getElementById('hotspot-subtitle').textContent = info.subtitle;
  document.getElementById('hotspot-title').textContent = info.title;
  document.getElementById('hotspot-detail').textContent = info.detail;
  document.getElementById('hotspot-tip').textContent = info.clinicalTip;
  hotspotActionBtn.textContent = info.actionLabel;
}

function stopCycle() {
  if (cycleIntervalId !== null) {
    clearInterval(cycleIntervalId);
    cycleIntervalId = null;
  }
  playCycleBtn.textContent = '▶ Speel erectiecyclus af';
}

function startCycle() {
  if (cycleIntervalId !== null) {
    stopCycle();
    return;
  }
  if (Number(arousalSlider.value) >= 98) {
    arousalSlider.value = '0';
  }
  cycleDirection = 1;
  playCycleBtn.textContent = '⏸ Pauzeer cyclus';

  cycleIntervalId = setInterval(() => {
    const current = Number(arousalSlider.value);
    const next = current + cycleDirection * 2;
    if (next >= 100) {
      arousalSlider.value = '100';
      cycleDirection = -1;
    } else if (next <= 0) {
      arousalSlider.value = '0';
      stopCycle();
    } else {
      arousalSlider.value = String(next);
    }
    updateHemodynamics();
  }, 75);
}

function triggerStressPulse() {
  stopCycle();
  arousalSlider.value = '12';
  scenarioSelect.value = 'normal';
  updateHemodynamics();
  selectHemoHotspot('hemo-trabecula');
}

playCycleBtn.addEventListener('click', startCycle);
stressPulseBtn.addEventListener('click', triggerStressPulse);

hotspotActionBtn.addEventListener('click', () => {
  const info = HEMO_HOTSPOTS[selectedHemoId];
  if (!info) return;

  if (info.actionType === 'anatomy') {
    focusStructureInAtlas(info.actionPayload);
  } else if (info.actionType === 'scenario') {
    scenarioSelect.value = info.actionPayload;
    if (Number(arousalSlider.value) < 60) arousalSlider.value = '80';
    updateHemodynamics();
  } else if (info.actionType === 'toggle-pde5') {
    scenarioSelect.value = scenarioSelect.value === 'pde5i' ? 'normal' : 'pde5i';
    if (Number(arousalSlider.value) < 50) arousalSlider.value = '75';
    updateHemodynamics();
  } else if (info.actionType === 'stress') {
    triggerStressPulse();
  } else if (info.actionType === 'cycle') {
    startCycle();
  } else if (info.actionType === 'arousal') {
    stopCycle();
    arousalSlider.value = String(info.actionPayload);
    updateHemodynamics();
  }
});

bindInteractiveTarget(document.querySelectorAll('.hemo-clickable'), 'data-hemo-id', selectHemoHotspot);

arousalSlider.addEventListener('input', () => {
  stopCycle();
  updateHemodynamics();
});
scenarioSelect.addEventListener('change', updateHemodynamics);

for (const btn of presetButtons) {
  btn.addEventListener('click', () => {
    stopCycle();
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
const symptomBar = document.getElementById('symptom-checker-bar');
const clinicalDialog = document.getElementById('clinical-dialog');
const dialogGotoAnatomyBtn = document.getElementById('dialog-goto-anatomy');

let activePathologyFilter = 'all';
let activeSymptomTagId = 'all';
let activeDialogPathology = null;

function setPathologyFilter(filterValue) {
  activePathologyFilter = filterValue;
  for (const b of filterButtons) {
    b.classList.toggle('is-active', b.dataset.filter === filterValue);
  }
  renderPathologyGrid();
}

function renderSymptomChecker() {
  symptomBar.innerHTML = '';
  for (const tag of SYMPTOM_CHECKER_TAGS) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'symptom-chip';
    if (tag.id === activeSymptomTagId) btn.classList.add('is-active');
    btn.textContent = tag.label;
    btn.addEventListener('click', () => {
      activeSymptomTagId = tag.id;
      if (tag.id !== 'all') {
        activePathologyFilter = 'all';
        for (const b of filterButtons) {
          b.classList.toggle('is-active', b.dataset.filter === 'all');
        }
      }
      renderSymptomChecker();
      renderPathologyGrid();
    });
    symptomBar.appendChild(btn);
  }
}

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
  activeDialogPathology = item;

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

  dialogGotoAnatomyBtn.hidden = !item.relatedAnatomyId;
  clinicalDialog.showModal();
}

dialogGotoAnatomyBtn.addEventListener('click', () => {
  const anatomyId = activeDialogPathology?.relatedAnatomyId;
  clinicalDialog.close();
  if (anatomyId) focusStructureInAtlas(anatomyId);
});

clinicalDialog.addEventListener('close', () => {
  clinicalDialog.returnValue = '';
});

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
  const activeTag = SYMPTOM_CHECKER_TAGS.find((t) => t.id === activeSymptomTagId);

  const filtered = PATHOLOGIES.filter((item) => {
    const matchesCat = activePathologyFilter === 'all' || item.category === activePathologyFilter;
    const matchesSymptom = !activeTag || !activeTag.matchIds || activeTag.matchIds.includes(item.id);
    const matchesQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.shortDesc.toLowerCase().includes(query) ||
      item.pathophysiology.toLowerCase().includes(query);
    return matchesCat && matchesSymptom && matchesQuery;
  });

  pathologyGrid.innerHTML = '';

  if (filtered.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'Geen ziektebeelden gevonden voor deze filtercombinatie.';
    pathologyGrid.appendChild(empty);
    return;
  }

  for (const item of filtered) {
    const card = document.createElement('article');
    card.className = `pathology-card is-${item.category}`;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open klinisch dossier: ${item.name}`);

    const open = () => openClinicalDialog(item.id);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });

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

    const cta = document.createElement('span');
    cta.className = 'btn-ghost';
    cta.style.textAlign = 'center';
    cta.textContent = 'Bekijk klinisch dossier →';

    card.append(top, thumb, title, desc, cta);
    pathologyGrid.appendChild(card);
  }
}

for (const btn of filterButtons) {
  btn.addEventListener('click', () => {
    activeSymptomTagId = 'all';
    renderSymptomChecker();
    setPathologyFilter(btn.dataset.filter);
  });
}

pathologySearch.addEventListener('input', renderPathologyGrid);

// ============================================================================
// 5. Interactief Zelfonderzoek & Medische Kennistest (Quiz)
// ============================================================================

const examStepsList = document.getElementById('exam-steps');
const examProgress = document.getElementById('exam-progress');
const examProgressText = document.getElementById('exam-progress-text');
const svgSelfExam = document.getElementById('svg-self-exam');
const btnExamUncircumcised = document.getElementById('btn-exam-uncircumcised');
const btnExamCircumcised = document.getElementById('btn-exam-circumcised');
const btnRetractForeskin = document.getElementById('btn-retract-foreskin');
const cardUncircumcised = document.getElementById('card-uncircumcised');
const cardCircumcised = document.getElementById('card-circumcised');

const quizContainer = document.getElementById('quiz-container');
const quizProgress = document.getElementById('quiz-progress');
const quizProgressText = document.getElementById('quiz-progress-text');

const completedExamSteps = new Set();
let activeExamStep = 1;
let isExamCircumcised = false;
let isForeskinRetracted = false;

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function setActiveExamStep(stepNumber) {
  activeExamStep = stepNumber;
  const stepData = SELF_EXAM_STEPS.find((s) => s.step === stepNumber);
  if (!stepData) return;

  for (const li of examStepsList.querySelectorAll('li')) {
    li.classList.toggle('is-active', Number(li.dataset.step) === stepNumber);
  }
  for (const zone of svgSelfExam.querySelectorAll('.exam-zone')) {
    zone.classList.toggle('is-active', zone.dataset.zone === stepData.zoneId);
  }
}

function updateExamChecklistProgress() {
  const count = completedExamSteps.size;
  examProgress.value = count;
  examProgressText.textContent = `${count} van ${SELF_EXAM_STEPS.length} stappen afgevinkt`;
}

function updateExamAnatomyMode(circumcised) {
  isExamCircumcised = circumcised;
  svgSelfExam.classList.toggle('is-circumcised', circumcised);
  btnExamUncircumcised.classList.toggle('is-active', !circumcised);
  btnExamUncircumcised.setAttribute('aria-pressed', String(!circumcised));
  btnExamCircumcised.classList.toggle('is-active', circumcised);
  btnExamCircumcised.setAttribute('aria-pressed', String(circumcised));

  cardUncircumcised.classList.toggle('is-selected', !circumcised);
  cardUncircumcised.setAttribute('aria-pressed', String(!circumcised));
  cardCircumcised.classList.toggle('is-selected', circumcised);
  cardCircumcised.setAttribute('aria-pressed', String(circumcised));

  btnRetractForeskin.disabled = circumcised;
  if (circumcised) {
    isForeskinRetracted = false;
    svgSelfExam.classList.remove('is-retracted');
    btnRetractForeskin.classList.remove('is-active');
    btnRetractForeskin.setAttribute('aria-pressed', 'false');
  }
}

btnExamUncircumcised.addEventListener('click', () => updateExamAnatomyMode(false));
btnExamCircumcised.addEventListener('click', () => updateExamAnatomyMode(true));

cardUncircumcised.addEventListener('click', () => updateExamAnatomyMode(false));
cardUncircumcised.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    updateExamAnatomyMode(false);
  }
});

cardCircumcised.addEventListener('click', () => updateExamAnatomyMode(true));
cardCircumcised.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    updateExamAnatomyMode(true);
  }
});

btnRetractForeskin.addEventListener('click', () => {
  if (isExamCircumcised) return;
  isForeskinRetracted = !isForeskinRetracted;
  svgSelfExam.classList.toggle('is-retracted', isForeskinRetracted);
  btnRetractForeskin.classList.toggle('is-active', isForeskinRetracted);
  btnRetractForeskin.setAttribute('aria-pressed', String(isForeskinRetracted));
  setActiveExamStep(2);
});

for (const zone of svgSelfExam.querySelectorAll('.exam-zone')) {
  const select = (e) => {
    e.stopPropagation();
    setActiveExamStep(Number(zone.dataset.step));
  };
  zone.addEventListener('click', select);
  zone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      select(e);
    }
  });
}

for (const flagBtn of document.querySelectorAll('[data-open-pathology]')) {
  flagBtn.addEventListener('click', () => openClinicalDialog(flagBtn.dataset.openPathology));
}

function renderExamSteps() {
  examStepsList.innerHTML = '';
  for (const item of SELF_EXAM_STEPS) {
    const li = document.createElement('li');
    li.dataset.step = String(item.step);

    const row = document.createElement('div');
    row.className = 'exam-step-row';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'exam-step-check';
    checkbox.id = `exam-check-${item.step}`;
    checkbox.setAttribute('aria-label', `Markeer stap ${item.step} als gecontroleerd`);
    checkbox.checked = completedExamSteps.has(item.step);
    checkbox.addEventListener('click', (e) => e.stopPropagation());
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) completedExamSteps.add(item.step);
      else completedExamSteps.delete(item.step);
      updateExamChecklistProgress();
      setActiveExamStep(item.step);
    });

    const content = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = `${item.step}. ${item.title}`;
    const detail = document.createElement('span');
    detail.textContent = item.detail;
    content.append(title, detail);

    row.append(checkbox, content);
    li.appendChild(row);
    li.addEventListener('click', () => setActiveExamStep(item.step));
    examStepsList.appendChild(li);
  }
  setActiveExamStep(activeExamStep);
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
selectHemoHotspot('hemo-sinusoid');
renderSymptomChecker();
renderPathologyGrid();
renderExamSteps();
updateExamChecklistProgress();
renderQuiz();
