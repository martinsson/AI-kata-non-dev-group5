(() => {
  'use strict';

  const STORAGE_KEY = 'agroassistant-v1';

  // ── Knowledge base ─────────────────────────────────────

  const PLANTS = [
    { id: 'tomato',   label: 'Tomate',       icon: '🍅' },
    { id: 'potato',   label: 'Pomme de terre',icon: '🥔' },
    { id: 'rose',     label: 'Rose',          icon: '🌹' },
    { id: 'wheat',    label: 'Blé',           icon: '🌾' },
    { id: 'corn',     label: 'Maïs',          icon: '🌽' },
    { id: 'zucchini', label: 'Courgette',     icon: '🥒' },
    { id: 'cucumber', label: 'Concombre',     icon: '🥒' },
    { id: 'vine',     label: 'Vigne',         icon: '🍇' },
    { id: 'apple',    label: 'Pommier',       icon: '🍎' },
    { id: 'lettuce',  label: 'Laitue',        icon: '🥬' },
    { id: 'strawberry', label: 'Fraisier',    icon: '🍓' },
    { id: 'bean',     label: 'Haricot',       icon: '🫘' },
  ];

  const SYMPTOMS = [
    { id: 'yellow_leaves',   label: 'Feuilles jaunissantes',       icon: 'leaf' },
    { id: 'brown_spots',     label: 'Taches brunes',               icon: 'circle-dot' },
    { id: 'white_powder',    label: 'Poudre / taches blanches',    icon: 'cloud-snow' },
    { id: 'gray_mold',       label: 'Moisissure grise',            icon: 'cloud' },
    { id: 'black_spots',     label: 'Taches noires',               icon: 'minus-circle' },
    { id: 'wilting',         label: 'Flétrissement / affaissement',icon: 'trending-down' },
    { id: 'root_rot',        label: 'Pourriture à la base / racines',icon: 'alert-triangle' },
    { id: 'holes',           label: 'Trous dans les feuilles',     icon: 'scissors' },
    { id: 'vein_discolor',   label: 'Décoloration des nervures',   icon: 'git-branch' },
    { id: 'leaf_drop',       label: 'Chute prématurée des feuilles',icon: 'wind' },
    { id: 'fruit_spots',     label: 'Fruits tachetés / pourris',   icon: 'alert-circle' },
    { id: 'slow_growth',     label: 'Croissance ralentie',         icon: 'arrow-down-narrow-wide' },
    { id: 'sticky',          label: 'Feuilles collantes / miellat',icon: 'droplets' },
    { id: 'curled_leaves',   label: 'Feuilles enroulées / crispées',icon: 'refresh-cw' },
  ];

  const PARTS = [
    { id: 'leaves', label: 'Feuilles' },
    { id: 'stem',   label: 'Tiges / tige' },
    { id: 'roots',  label: 'Racines' },
    { id: 'fruits', label: 'Fruits / fleurs' },
    { id: 'whole',  label: 'Plante entière' },
  ];

  const DISEASES = [
    {
      id: 'mildew',
      name: 'Mildiou',
      pathogen: 'Phytophthora infestans / Plasmopara viticola',
      plants: ['tomato', 'potato', 'vine', 'lettuce'],
      symptoms: ['brown_spots', 'yellow_leaves', 'gray_mold', 'leaf_drop'],
      conditions: ['humid'],
      severity: 'high',
      description: 'Maladie fongique très répandue favorisée par l\'humidité et la chaleur. Se manifeste par des taches brunes sur les feuilles avec un duvet grisâtre sous la feuille.',
      treatments: [
        'Traiter à la bouillie bordelaise (cuivre) dès les premiers symptômes',
        'Retirer et détruire les parties atteintes (ne pas composter)',
        'Éviter d\'arroser le feuillage, arroser au pied',
        'Améliorer la circulation d\'air entre les plants',
        'En préventif : pulvérisations de décoction de prêle',
      ],
      prevention: 'Choisir des variétés résistantes, respecter les distances de plantation, éviter l\'excès d\'humidité.',
    },
    {
      id: 'powdery_mildew',
      name: 'Oïdium',
      pathogen: 'Erysiphales (diverses espèces)',
      plants: ['rose', 'zucchini', 'cucumber', 'vine', 'apple', 'strawberry'],
      symptoms: ['white_powder', 'curled_leaves', 'leaf_drop'],
      conditions: ['humid', 'normal'],
      severity: 'medium',
      description: 'Champignon superficiel qui recouvre les feuilles d\'un feutrage blanc poudreux. Favorisé par des nuits fraîches et journées chaudes.',
      treatments: [
        'Pulvériser du soufre micronisé (fongicide homologué)',
        'Solution de bicarbonate de soude (1 c. à soupe/litre) + quelques gouttes de savon',
        'Huile de neem en pulvérisation hebdomadaire',
        'Retirer les parties fortement atteintes',
        'Purin de prêle en préventif',
      ],
      prevention: 'Aérer les plants, éviter les excès d\'azote, arroser le matin.',
    },
    {
      id: 'rust',
      name: 'Rouille',
      pathogen: 'Puccinia spp. / Phragmidium spp.',
      plants: ['rose', 'wheat', 'corn', 'bean'],
      symptoms: ['brown_spots', 'black_spots', 'yellow_leaves', 'leaf_drop'],
      conditions: ['humid', 'normal'],
      severity: 'medium',
      description: 'Maladie fongique se manifestant par des pustules orangées à brun-noir sur les feuilles, souvent visibles sur la face inférieure.',
      treatments: [
        'Traitement fongicide à base de triazole',
        'Enlever et détruire les feuilles atteintes',
        'Bouillie bordelaise en début d\'attaque',
        'Nettoyer soigneusement les outils',
      ],
      prevention: 'Rotation des cultures, variétés résistantes, éviter le feuillage mouillé.',
    },
    {
      id: 'botrytis',
      name: 'Pourriture grise (Botrytis)',
      pathogen: 'Botrytis cinerea',
      plants: ['tomato', 'strawberry', 'vine', 'lettuce', 'rose', 'bean'],
      symptoms: ['gray_mold', 'root_rot', 'brown_spots', 'fruit_spots'],
      conditions: ['humid'],
      severity: 'high',
      description: 'Champignon ubiquiste qui attaque les parties affaiblies ou blessées. Se reconnaît au duvet gris caractéristique sur les tissus pourris.',
      treatments: [
        'Améliorer impérativement la ventilation',
        'Retirer toutes les parties atteintes et détruire',
        'Éviter les blessures sur les plantes',
        'Réduire l\'humidité ambiante',
        'Fongicide spécifique (iprodione ou pyrimethanil) si nécessaire',
      ],
      prevention: 'Bonne aération, ne pas surplanter, éviter l\'arrosage le soir.',
    },
    {
      id: 'chlorosis',
      name: 'Chlorose ferrique',
      pathogen: 'Carence en fer (non-pathogène)',
      plants: ['rose', 'vine', 'apple', 'strawberry', 'tomato'],
      symptoms: ['yellow_leaves', 'vein_discolor', 'slow_growth'],
      conditions: [],
      severity: 'low',
      description: 'Jaunissement du limbe entre les nervures qui restent vertes. Dû à une carence en fer, souvent lié à un pH du sol trop élevé.',
      treatments: [
        'Apporter du chélate de fer (disponible en jardinerie)',
        'Abaisser le pH du sol avec de la tourbe ou du soufre',
        'Arroser avec de l\'eau de pluie plutôt que de l\'eau calcaire',
        'Traitement foliaire au sulfate de fer dilué',
      ],
      prevention: 'Vérifier et corriger le pH du sol avant plantation. Éviter les excès de calcaire.',
    },
    {
      id: 'root_rot',
      name: 'Pourriture racinaire / Fonte des semis',
      pathogen: 'Pythium spp. / Rhizoctonia solani',
      plants: ['tomato', 'cucumber', 'zucchini', 'lettuce', 'bean'],
      symptoms: ['wilting', 'root_rot', 'yellow_leaves', 'slow_growth'],
      conditions: ['humid', 'over'],
      severity: 'high',
      description: 'Pourriture des racines et du collet causée par des champignons du sol, favorisée par un excès d\'humidité et des sols peu drainants.',
      treatments: [
        'Réduire drastiquement l\'arrosage',
        'Améliorer le drainage (ajout de sable, gravier)',
        'Retirer et détruire les plants gravement atteints',
        'Traitement du sol avec un fongicide approprié',
        'Rempotage avec un substrat sain si en pot',
      ],
      prevention: 'Sol bien drainé, arrosage raisonné, ne pas planter trop profond.',
    },
    {
      id: 'alternaria',
      name: 'Alternariose',
      pathogen: 'Alternaria solani',
      plants: ['tomato', 'potato', 'corn'],
      symptoms: ['brown_spots', 'black_spots', 'leaf_drop', 'fruit_spots'],
      conditions: ['humid', 'normal'],
      severity: 'medium',
      description: 'Taches brunes à noires concentriques sur les feuilles et les fruits, ressemblant à des cibles. Favorisée par des temps chauds et humides.',
      treatments: [
        'Fongicide à base de mancozèbe ou de cuivre',
        'Retirer les feuilles et fruits atteints',
        'Rotation des cultures sur 3-4 ans',
        'Tuteurage des tomates pour améliorer l\'aération',
      ],
      prevention: 'Rotation des cultures, irrigation goutte-à-goutte, variétés résistantes.',
    },
    {
      id: 'aphids',
      name: 'Pucerons',
      pathogen: 'Insectes (Aphididae)',
      plants: ['rose', 'bean', 'lettuce', 'apple', 'tomato', 'zucchini'],
      symptoms: ['curled_leaves', 'yellow_leaves', 'sticky', 'slow_growth'],
      conditions: [],
      severity: 'medium',
      description: 'Petits insectes (verts, noirs, gris) qui colonisent les nouvelles pousses et le dessous des feuilles. Ils sécrètent un miellat collant propice à la fumagine.',
      treatments: [
        'Savon noir dilué en pulvérisation (2 c. à soupe/litre)',
        'Pyréthrine végétale si infestation forte',
        'Favoriser les prédateurs naturels (coccinelles, chrysopes)',
        'Jet d\'eau fort pour les déloger mécaniquement',
        'Purin d\'ortie en préventif',
      ],
      prevention: 'Plantation d\'œillets d\'Inde repoussants, éviter les excès d\'azote, surveiller régulièrement.',
    },
    {
      id: 'nitrogen',
      name: 'Carence en azote',
      pathogen: 'Carence nutritive (non-pathogène)',
      plants: ['tomato', 'corn', 'lettuce', 'wheat', 'zucchini'],
      symptoms: ['yellow_leaves', 'slow_growth'],
      conditions: ['dry'],
      severity: 'low',
      description: 'Jaunissement général des feuilles, commençant par les plus vieilles. La plante présente un aspect chétif avec une croissance très ralentie.',
      treatments: [
        'Apport d\'engrais azoté (orties fermentées, corne broyée)',
        'Purin d\'ortie concentré dilué à 10%',
        'Engrais soluble à libération rapide en urgence',
        'Améliorer la vie biologique du sol (compost)',
      ],
      prevention: 'Apport régulier de compost mature, rotation des cultures avec des légumineuses.',
    },
    {
      id: 'caterpillar',
      name: 'Chenilles / larves',
      pathogen: 'Insectes (Lépidoptères, Coléoptères)',
      plants: ['tomato', 'corn', 'cabbage', 'apple', 'lettuce'],
      symptoms: ['holes', 'fruit_spots', 'leaf_drop'],
      conditions: [],
      severity: 'medium',
      description: 'Dégâts mécaniques caractéristiques : trous irréguliers dans les feuilles, galeries dans les fruits, déjections visibles.',
      treatments: [
        'Bacillus thuringiensis (Bt) — biopesticide efficace et sans danger',
        'Ramassage manuel des chenilles (de préférence le soir)',
        'Filets de protection anti-insectes',
        'Décoction de tanaisie ou d\'absinthe en répulsif',
      ],
      prevention: 'Filets anti-insectes, contrôle régulier, favoriser les oiseaux insectivores.',
    },
    {
      id: 'fusarium',
      name: 'Fusariose',
      pathogen: 'Fusarium oxysporum',
      plants: ['tomato', 'wheat', 'corn', 'bean', 'strawberry'],
      symptoms: ['wilting', 'vein_discolor', 'slow_growth', 'root_rot'],
      conditions: ['humid', 'normal'],
      severity: 'high',
      description: 'Maladie vasculaire : le champignon bouche les vaisseaux conducteurs de la plante. La tige coupée montre un brunissement interne caractéristique.',
      treatments: [
        'Retirer et détruire les plantes atteintes — pas de compostage',
        'Désinfecter les outils entre chaque plant',
        'Rotation des cultures sur au moins 4-5 ans',
        'Trichoderma en traitement biologique du sol',
      ],
      prevention: 'Variétés résistantes (F sur l\'étiquette pour les tomates), sol bien drainé, rotation stricte.',
    },
  ];

  // ── State ──────────────────────────────────────────────

  const defaultState = () => ({
    garden: [],
    history: [],
  });

  let state = loadState();
  let currentView = 'diagnostic';

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...defaultState(), ...JSON.parse(raw) } : defaultState();
    } catch { return defaultState(); }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  // ── Routing ────────────────────────────────────────────

  const VIEW_META = {
    diagnostic: { title: 'Diagnostic' },
    garden:     { title: 'Mon jardin' },
    history:    { title: 'Historique des diagnostics' },
    guide:      { title: 'Guide des maladies' },
  };

  function setView(name) {
    currentView = name;
    document.querySelectorAll('.nav-item').forEach(el =>
      el.classList.toggle('active', el.dataset.view === name)
    );
    document.getElementById('page-title').textContent = VIEW_META[name]?.title || '';
    closeSidebar();
    render();
  }

  // ── Rendering ──────────────────────────────────────────

  function render() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    const tpl = document.getElementById(`tpl-${currentView}`);
    if (!tpl) return;
    app.appendChild(tpl.content.cloneNode(true));
    ({ diagnostic: renderDiagnostic, garden: renderGarden, history: renderHistory, guide: renderGuide })[currentView]?.();
    refreshIcons();
  }

  // ── Diagnostic ─────────────────────────────────────────

  function renderDiagnostic() {
    const plantGrid = document.getElementById('plant-grid');
    PLANTS.forEach(p => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'plant-btn';
      btn.dataset.plant = p.id;
      btn.innerHTML = `<span class="plant-emoji">${p.icon}</span><span>${esc(p.label)}</span>`;
      btn.addEventListener('click', () => {
        plantGrid.querySelectorAll('.plant-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.toggle('selected');
      });
      plantGrid.appendChild(btn);
    });

    const symptomGrid = document.getElementById('symptom-grid');
    SYMPTOMS.forEach(s => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'symptom-btn';
      btn.dataset.symptom = s.id;
      btn.innerHTML = `<i data-lucide="${s.icon}"></i><span>${esc(s.label)}</span>`;
      btn.addEventListener('click', () => btn.classList.toggle('selected'));
      symptomGrid.appendChild(btn);
    });

    const partGroup = document.getElementById('part-group');
    PARTS.forEach(p => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tag-btn';
      btn.dataset.part = p.id;
      btn.textContent = p.label;
      btn.addEventListener('click', () => btn.classList.toggle('selected'));
      partGroup.appendChild(btn);
    });

    document.getElementById('diag-form').addEventListener('submit', e => {
      e.preventDefault();
      runDiagnostic();
    });

    document.getElementById('diag-form').addEventListener('reset', () => {
      setTimeout(() => {
        document.querySelectorAll('.plant-btn, .symptom-btn, .tag-btn').forEach(b => b.classList.remove('selected'));
        document.getElementById('diag-result').classList.add('hidden');
        document.getElementById('diag-result').innerHTML = '';
      }, 0);
    });

    refreshIcons();
  }

  function runDiagnostic() {
    const selectedPlant = document.querySelector('.plant-btn.selected')?.dataset.plant;
    const customPlant   = document.getElementById('plant-custom').value.trim();
    const selectedSymptoms = [...document.querySelectorAll('.symptom-btn.selected')].map(b => b.dataset.symptom);
    const selectedParts    = [...document.querySelectorAll('.tag-btn.selected')].map(b => b.dataset.part);
    const weather    = document.getElementById('weather').value;
    const watering   = document.getElementById('watering').value;
    const description = document.getElementById('description').value.trim();

    if (!selectedPlant && !customPlant) {
      alert('Veuillez sélectionner ou préciser une plante.');
      return;
    }
    if (selectedSymptoms.length === 0) {
      alert('Veuillez sélectionner au moins un symptôme.');
      return;
    }

    const plantLabel = customPlant || PLANTS.find(p => p.id === selectedPlant)?.label || selectedPlant;
    const results = scoreDiseases(selectedPlant, selectedSymptoms, weather, watering);
    const entry = {
      id: uid(),
      date: new Date().toISOString(),
      plant: plantLabel,
      plantId: selectedPlant || 'other',
      symptoms: selectedSymptoms,
      parts: selectedParts,
      weather, watering, description,
      results: results.slice(0, 3).map(r => r.id),
    };
    state.history.unshift(entry);
    save();

    displayResults(results, plantLabel, entry);
  }

  function scoreDiseases(plantId, symptoms, weather, watering) {
    return DISEASES.map(disease => {
      let score = 0;

      // symptom matches
      const matchedSymptoms = symptoms.filter(s => disease.symptoms.includes(s));
      score += matchedSymptoms.length * 10;

      // bonus if most disease symptoms are matched
      if (disease.symptoms.length > 0) {
        score += Math.round((matchedSymptoms.length / disease.symptoms.length) * 20);
      }

      // plant match
      if (plantId && disease.plants.includes(plantId)) score += 15;

      // condition match
      if (weather && disease.conditions.includes(weather)) score += 8;
      if (watering === 'over' && disease.conditions.includes('over')) score += 8;

      return { ...disease, score, matchedSymptoms };
    })
    .filter(d => d.score > 0)
    .sort((a, b) => b.score - a.score);
  }

  function displayResults(results, plantLabel, entry) {
    const el = document.getElementById('diag-result');
    el.classList.remove('hidden');

    if (!results.length) {
      el.innerHTML = `
        <div class="result-empty">
          <i data-lucide="help-circle"></i>
          <p>Aucune maladie correspondante trouvée dans la base de données.<br>
          Consultez un agronome ou votre coopérative agricole locale.</p>
        </div>`;
      refreshIcons();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const top = results.slice(0, 3);
    el.innerHTML = `
      <div class="result-header">
        <i data-lucide="clipboard-list"></i>
        <div>
          <h3>Résultats pour <strong>${esc(plantLabel)}</strong></h3>
          <p class="result-sub">${top.length} maladie(s) probable(s) identifiée(s)</p>
        </div>
      </div>
      ${top.map((d, i) => diseaseResultCard(d, i)).join('')}
      <div class="save-banner">
        <i data-lucide="check-circle"></i>
        Diagnostic sauvegardé dans l'historique
      </div>
    `;

    el.querySelectorAll('.result-save-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const plantId = entry.plantId;
        openGardenForm(null, plantId, btn.dataset.diseaseId);
      });
    });

    refreshIcons();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function severityLabel(s) {
    return { high: { text: 'Élevé', cls: 'sev-high' }, medium: { text: 'Moyen', cls: 'sev-medium' }, low: { text: 'Faible', cls: 'sev-low' } }[s] || { text: s, cls: '' };
  }

  function diseaseResultCard(d, rank) {
    const sev = severityLabel(d.severity);
    const confidence = Math.min(100, Math.round((d.score / 60) * 100));
    return `
      <div class="result-card ${rank === 0 ? 'result-top' : ''}">
        <div class="result-card-header">
          <div class="result-rank">${rank === 0 ? '1re hypothèse' : `${rank + 1}e hypothèse`}</div>
          <span class="sev-badge ${sev.cls}">${sev.text} risque</span>
        </div>
        <h4 class="disease-name">${esc(d.name)}</h4>
        <p class="disease-pathogen"><i data-lucide="microscope"></i> ${esc(d.pathogen)}</p>
        <p class="disease-desc">${esc(d.description)}</p>
        <div class="confidence-bar-wrap">
          <span class="confidence-label">Correspondance</span>
          <div class="confidence-bar"><div class="confidence-fill" style="width:${confidence}%"></div></div>
          <span class="confidence-pct">${confidence}%</span>
        </div>
        <div class="result-section">
          <h5><i data-lucide="shield-check"></i> Traitements recommandés</h5>
          <ul>${d.treatments.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        </div>
        <div class="result-section">
          <h5><i data-lucide="lock"></i> Prévention</h5>
          <p>${esc(d.prevention)}</p>
        </div>
        <div class="result-actions">
          <button class="btn-secondary result-save-btn" data-disease-id="${d.id}">
            <i data-lucide="sprout"></i> Ajouter à Mon jardin
          </button>
        </div>
      </div>
    `;
  }

  // ── Garden ─────────────────────────────────────────────

  function renderGarden() {
    document.querySelector('[data-action="add"]').addEventListener('click', () => openGardenForm());
    const grid = document.getElementById('garden-grid');

    if (!state.garden.length) {
      grid.innerHTML = `<div class="empty-garden">
        <i data-lucide="sprout"></i>
        <p>Votre jardin est vide.<br>Ajoutez vos plantes pour les suivre dans le temps.</p>
        <button class="btn-primary" id="add-first"><i data-lucide="plus"></i>Ajouter une plante</button>
      </div>`;
      document.getElementById('add-first').addEventListener('click', () => openGardenForm());
      refreshIcons();
      return;
    }

    grid.innerHTML = state.garden.map(p => {
      const plantMeta = PLANTS.find(pl => pl.id === p.plantId);
      const disease   = DISEASES.find(d => d.id === p.diseaseId);
      return `
        <div class="garden-card" data-id="${p.id}">
          <div class="garden-card-top">
            <span class="garden-emoji">${plantMeta?.icon || '🌱'}</span>
            <div class="garden-info">
              <strong>${esc(p.name)}</strong>
              <span class="garden-plant-label">${esc(plantMeta?.label || p.plantId)}</span>
            </div>
            <div class="garden-actions">
              <button class="btn-icon" data-edit="${p.id}"><i data-lucide="pencil"></i></button>
              <button class="btn-icon danger" data-del="${p.id}"><i data-lucide="trash-2"></i></button>
            </div>
          </div>
          ${disease ? `<div class="garden-disease-tag"><i data-lucide="alert-triangle"></i>${esc(disease.name)}</div>` : ''}
          ${p.notes ? `<p class="garden-notes">${esc(p.notes)}</p>` : ''}
          <div class="garden-meta">
            <span class="status-chip status-${p.status}">${statusLabel(p.status)}</span>
            ${p.addedDate ? `<span class="garden-date">Depuis le ${fmtDate(p.addedDate)}</span>` : ''}
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('[data-edit]').forEach(b =>
      b.addEventListener('click', () => openGardenForm(b.dataset.edit)));
    grid.querySelectorAll('[data-del]').forEach(b =>
      b.addEventListener('click', () => {
        if (confirm('Supprimer cette plante du jardin ?')) {
          state.garden = state.garden.filter(p => p.id !== b.dataset.del);
          save(); render();
        }
      }));
    refreshIcons();
  }

  function statusLabel(s) {
    return { healthy: 'Sain', sick: 'Malade', treated: 'En traitement', recovered: 'Rétabli' }[s] || s;
  }

  function fmtDate(s) {
    if (!s) return '';
    const d = new Date(s);
    return isNaN(d) ? s : d.toLocaleDateString('fr-FR');
  }

  function openGardenForm(id, defaultPlantId, defaultDiseaseId) {
    const editing = id ? state.garden.find(p => p.id === id) : null;
    const plantOptions = PLANTS.map(p => ({ value: p.id, label: `${p.icon} ${p.label}` }));
    const diseaseOptions = DISEASES.map(d => ({ value: d.id, label: d.name }));

    openModal(editing ? 'Modifier la plante' : 'Ajouter une plante', [
      { name: 'name', label: 'Nom / surnom', required: true, placeholder: 'Ex: Tomates du potager' },
      { name: 'plantId', label: 'Espèce', type: 'select', required: true,
        options: plantOptions, default: defaultPlantId || '' },
      { name: 'diseaseId', label: 'Maladie suspectée', type: 'select',
        options: diseaseOptions, default: defaultDiseaseId || '' },
      { name: 'status', label: 'État', type: 'select', required: true,
        options: [
          { value: 'healthy',   label: 'Sain' },
          { value: 'sick',      label: 'Malade' },
          { value: 'treated',   label: 'En traitement' },
          { value: 'recovered', label: 'Rétabli' },
        ], default: editing?.status || 'sick' },
      { name: 'addedDate', label: 'Date d\'ajout', type: 'date', default: editing?.addedDate || new Date().toISOString().slice(0, 10) },
      { name: 'notes', label: 'Notes', type: 'textarea' },
    ], editing || {}, data => {
      if (editing) Object.assign(editing, data);
      else state.garden.push({ id: uid(), ...data });
      save();
      if (currentView === 'garden') render();
    });
  }

  // ── History ────────────────────────────────────────────

  function renderHistory() {
    document.getElementById('clear-history').addEventListener('click', () => {
      if (confirm('Effacer tout l\'historique ?')) {
        state.history = [];
        save(); render();
      }
    });

    const list = document.getElementById('history-list');
    if (!state.history.length) {
      list.innerHTML = `<div class="empty-garden"><i data-lucide="history"></i><p>Aucun diagnostic encore réalisé.</p></div>`;
      refreshIcons();
      return;
    }

    list.innerHTML = state.history.map(entry => {
      const symptomLabels = entry.symptoms.map(id => SYMPTOMS.find(s => s.id === id)?.label || id);
      const diseaseNames  = entry.results.map(id => DISEASES.find(d => d.id === id)?.name || id);
      return `
        <div class="history-card">
          <div class="history-card-header">
            <span class="history-plant">${esc(entry.plant)}</span>
            <span class="history-date">${fmtDate(entry.date)}</span>
          </div>
          <div class="history-symptoms">
            ${symptomLabels.map(l => `<span class="symptom-tag">${esc(l)}</span>`).join('')}
          </div>
          ${diseaseNames.length ? `
            <div class="history-results">
              <strong>Hypothèses :</strong>
              ${diseaseNames.map(n => `<span class="disease-tag">${esc(n)}</span>`).join('')}
            </div>` : ''}
          ${entry.description ? `<p class="history-desc">"${esc(entry.description)}"</p>` : ''}
          <button class="btn-icon danger del-history" data-id="${entry.id}">
            <i data-lucide="trash-2"></i> Supprimer
          </button>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.del-history').forEach(b =>
      b.addEventListener('click', () => {
        state.history = state.history.filter(e => e.id !== b.dataset.id);
        save(); render();
      }));
    refreshIcons();
  }

  // ── Guide ──────────────────────────────────────────────

  function renderGuide() {
    const container = document.getElementById('disease-list');
    const search    = document.getElementById('guide-search');

    function displayDiseases(filter) {
      const term = filter.toLowerCase();
      const filtered = DISEASES.filter(d =>
        !term ||
        d.name.toLowerCase().includes(term) ||
        d.pathogen.toLowerCase().includes(term) ||
        d.plants.some(pid => (PLANTS.find(p => p.id === pid)?.label || '').toLowerCase().includes(term))
      );

      if (!filtered.length) {
        container.innerHTML = `<div class="empty-garden"><i data-lucide="search-x"></i><p>Aucun résultat.</p></div>`;
        refreshIcons();
        return;
      }

      container.innerHTML = filtered.map(d => {
        const sev = severityLabel(d.severity);
        const plantLabels = d.plants.map(pid => PLANTS.find(p => p.id === pid)?.label || pid);
        return `
          <div class="guide-card">
            <div class="guide-card-header">
              <h3>${esc(d.name)}</h3>
              <span class="sev-badge ${sev.cls}">${sev.text}</span>
            </div>
            <p class="guide-pathogen"><i data-lucide="microscope"></i> ${esc(d.pathogen)}</p>
            <p class="guide-desc">${esc(d.description)}</p>
            <div class="guide-plants">
              ${plantLabels.map(l => `<span class="plant-chip">${esc(l)}</span>`).join('')}
            </div>
            <details class="guide-details">
              <summary>Traitements & prévention</summary>
              <ul>${d.treatments.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
              <p class="prevention-note"><strong>Prévention :</strong> ${esc(d.prevention)}</p>
            </details>
          </div>
        `;
      }).join('');
      refreshIcons();
    }

    displayDiseases('');
    search.addEventListener('input', () => displayDiseases(search.value));
  }

  // ── Modal ──────────────────────────────────────────────

  const modal      = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalForm  = document.getElementById('modal-form');

  document.getElementById('modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  function openModal(title, fields, initial, onSubmit) {
    modalTitle.textContent = title;
    modalForm.innerHTML = '';
    const data = { ...initial };

    fields.forEach(f => {
      const wrap = document.createElement('div');
      wrap.className = 'field';
      const id = `mf-${f.name}`;
      wrap.innerHTML = `<label for="${id}">${f.label}${f.required ? ' *' : ''}</label>`;
      let el;

      if (f.type === 'select') {
        el = document.createElement('select');
        el.id = id; el.name = f.name;
        if (!f.required) el.appendChild(new Option('— aucun —', ''));
        f.options.forEach(o => {
          const opt = new Option(o.label, o.value);
          if (String(data[f.name] ?? f.default ?? '') === String(o.value)) opt.selected = true;
          el.appendChild(opt);
        });
      } else if (f.type === 'textarea') {
        el = document.createElement('textarea');
        el.id = id; el.name = f.name;
        el.value = data[f.name] ?? f.default ?? '';
      } else {
        el = document.createElement('input');
        el.id = id; el.name = f.name;
        el.type = f.type || 'text';
        el.value = data[f.name] ?? f.default ?? '';
        if (f.placeholder) el.placeholder = f.placeholder;
      }
      if (f.required) el.required = true;
      wrap.appendChild(el);
      modalForm.appendChild(wrap);
    });

    const actions = document.createElement('div');
    actions.className = 'modal-actions';
    actions.innerHTML = `<button type="button" class="btn-secondary" id="cancel-btn">Annuler</button>
      <button type="submit" class="btn-primary"><i data-lucide="save"></i>Enregistrer</button>`;
    modalForm.appendChild(actions);
    modalForm.querySelector('#cancel-btn').addEventListener('click', closeModal);

    modalForm.onsubmit = e => {
      e.preventDefault();
      const result = {};
      fields.forEach(f => {
        const el = modalForm.elements[f.name];
        if (el) result[f.name] = el.value;
      });
      onSubmit(result);
      closeModal();
    };

    modal.hidden = false;
    refreshIcons();
    setTimeout(() => modalForm.querySelector('input,select,textarea')?.focus(), 30);
  }

  function closeModal() {
    modal.hidden = true;
    modalForm.innerHTML = '';
  }

  // ── Sidebar (mobile) ───────────────────────────────────

  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  document.getElementById('menu-toggle').addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('open');
  });
  overlay.addEventListener('click', closeSidebar);

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  }

  // ── Import / Export ────────────────────────────────────

  document.getElementById('export-btn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), {
      href: url, download: `agroassistant-${new Date().toISOString().slice(0, 10)}.json`,
    });
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('import-btn').addEventListener('click', () =>
    document.getElementById('import-file').click()
  );

  document.getElementById('import-file').addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!confirm('Remplacer les données actuelles par celles du fichier ?')) return;
        state = { ...defaultState(), ...parsed };
        save(); render();
      } catch (err) {
        alert('Fichier invalide : ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  // ── Navigation init ────────────────────────────────────

  document.querySelectorAll('.nav-item').forEach(b =>
    b.addEventListener('click', () => setView(b.dataset.view))
  );

  setView('diagnostic');
})();
