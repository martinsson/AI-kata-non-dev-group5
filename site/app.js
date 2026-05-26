(() => {
  'use strict';

  const STORAGE_KEY = 'agroassistant-v2';

  // ── Base de connaissances ──────────────────────────────

  const PLANTS = [
    { id: 'tomato',     label: 'Tomate',          icon: '🍅' },
    { id: 'potato',     label: 'Pomme de terre',   icon: '🥔' },
    { id: 'rose',       label: 'Rose',             icon: '🌹' },
    { id: 'wheat',      label: 'Blé',              icon: '🌾' },
    { id: 'corn',       label: 'Maïs',             icon: '🌽' },
    { id: 'zucchini',   label: 'Courgette',        icon: '🥒' },
    { id: 'cucumber',   label: 'Concombre',        icon: '🥒' },
    { id: 'vine',       label: 'Vigne',            icon: '🍇' },
    { id: 'apple',      label: 'Pommier',          icon: '🍎' },
    { id: 'lettuce',    label: 'Laitue',           icon: '🥬' },
    { id: 'strawberry', label: 'Fraisier',         icon: '🍓' },
    { id: 'bean',       label: 'Haricot',          icon: '🫘' },
    { id: 'pepper',     label: 'Poivron / Piment', icon: '🫑' },
    { id: 'basil',      label: 'Basilic',          icon: '🌿' },
    { id: 'carrot',     label: 'Carotte',          icon: '🥕' },
    { id: 'garlic',     label: 'Ail / Oignon',     icon: '🧄' },
  ];

  const DISEASES = [
    {
      id: 'mildew',
      name: 'Mildiou',
      pathogen: 'Phytophthora infestans / Plasmopara viticola',
      plants: ['tomato', 'potato', 'vine', 'lettuce'],
      keywords: ['brun', 'tache', 'duvet', 'gris', 'humide', 'mouillé', 'mildiou', 'jaun', 'chute'],
      severity: 'high',
      description: 'Maladie fongique très répandue favorisée par l\'humidité et la chaleur. Se manifeste par des taches brunes sur les feuilles avec un duvet grisâtre sous la feuille.',
      treatments: [
        'Traitement à la bouillie bordelaise (cuivre) dès les premiers symptômes',
        'Retirer et détruire les parties atteintes (ne pas composter)',
        'Arroser au pied uniquement, jamais sur le feuillage',
        'Améliorer la circulation d\'air entre les plants',
        'Pulvérisations préventives de décoction de prêle',
      ],
      prevention: 'Choisir des variétés résistantes, respecter les distances de plantation, éviter l\'excès d\'humidité.',
    },
    {
      id: 'powdery_mildew',
      name: 'Oïdium',
      pathogen: 'Erysiphales (diverses espèces)',
      plants: ['rose', 'zucchini', 'cucumber', 'vine', 'apple', 'strawberry', 'pepper'],
      keywords: ['blanc', 'blanche', 'poudre', 'farin', 'oïdi', 'enroulé', 'crispé'],
      severity: 'medium',
      description: 'Champignon superficiel qui recouvre les feuilles d\'un feutrage blanc poudreux. Favorisé par des nuits fraîches et journées chaudes avec humidité.',
      treatments: [
        'Soufre micronisé en pulvérisation (fongicide homologué)',
        'Solution de bicarbonate de soude (1 c. à soupe/litre) + quelques gouttes de savon noir',
        'Huile de neem en pulvérisation hebdomadaire',
        'Retirer les parties fortement atteintes',
      ],
      prevention: 'Aérer les plants, éviter les excès d\'azote, arroser le matin.',
    },
    {
      id: 'rust',
      name: 'Rouille',
      pathogen: 'Puccinia spp. / Phragmidium spp.',
      plants: ['rose', 'wheat', 'corn', 'bean'],
      keywords: ['rouille', 'orange', 'pustule', 'brun-rouge', 'brun', 'noir', 'chute'],
      severity: 'medium',
      description: 'Maladie fongique se manifestant par des pustules orangées à brun-noir sur les feuilles, souvent visibles sur la face inférieure.',
      treatments: [
        'Fongicide à base de triazole',
        'Enlever et détruire les feuilles atteintes',
        'Bouillie bordelaise en début d\'attaque',
        'Nettoyer soigneusement les outils entre chaque plant',
      ],
      prevention: 'Rotation des cultures, variétés résistantes, éviter le feuillage mouillé.',
    },
    {
      id: 'botrytis',
      name: 'Pourriture grise (Botrytis)',
      pathogen: 'Botrytis cinerea',
      plants: ['tomato', 'strawberry', 'vine', 'lettuce', 'rose', 'bean', 'pepper'],
      keywords: ['gris', 'moisissure', 'duvet', 'pourr', 'botrytis', 'brun', 'fruit', 'humide'],
      severity: 'high',
      description: 'Champignon ubiquiste attaquant les parties affaiblies ou blessées. Se reconnaît au duvet gris caractéristique sur les tissus pourris.',
      treatments: [
        'Améliorer impérativement la ventilation',
        'Retirer toutes les parties atteintes et détruire',
        'Éviter les blessures sur les plantes',
        'Réduire l\'humidité ambiante',
        'Fongicide spécifique si nécessaire',
      ],
      prevention: 'Bonne aération, ne pas surplanter, éviter l\'arrosage le soir.',
    },
    {
      id: 'chlorosis',
      name: 'Chlorose ferrique',
      pathogen: 'Carence en fer (non-pathogène)',
      plants: ['rose', 'vine', 'apple', 'strawberry', 'tomato'],
      keywords: ['jaun', 'pâle', 'nervure', 'veine', 'chlorose', 'fer', 'décolor'],
      severity: 'low',
      description: 'Jaunissement du limbe entre les nervures qui restent vertes. Dû à une carence en fer, souvent liée à un pH du sol trop élevé (sol calcaire).',
      treatments: [
        'Apport de chélate de fer (disponible en jardinerie)',
        'Abaisser le pH du sol avec de la tourbe ou du soufre',
        'Arroser avec de l\'eau de pluie plutôt que l\'eau calcaire',
        'Traitement foliaire au sulfate de fer dilué',
      ],
      prevention: 'Vérifier et corriger le pH du sol avant plantation.',
    },
    {
      id: 'root_rot',
      name: 'Pourriture racinaire',
      pathogen: 'Pythium spp. / Rhizoctonia solani',
      plants: ['tomato', 'cucumber', 'zucchini', 'lettuce', 'bean', 'pepper', 'basil'],
      keywords: ['racine', 'pourr', 'flétr', 'fané', 'affaiss', 'trop arros', 'stagnant', 'collet', 'base', 'sol'],
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
      plants: ['tomato', 'potato', 'corn', 'carrot'],
      keywords: ['concentrique', 'cible', 'alternaria', 'brun', 'noir', 'chute', 'fruit'],
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
      plants: ['rose', 'bean', 'lettuce', 'apple', 'tomato', 'zucchini', 'pepper', 'basil'],
      keywords: ['collant', 'miellat', 'puceron', 'insecte', 'enroulé', 'crispe', 'vert', 'noir', 'petits'],
      severity: 'medium',
      description: 'Petits insectes colonisant les nouvelles pousses et le dessous des feuilles. Ils sécrètent un miellat collant propice à la fumagine.',
      treatments: [
        'Savon noir dilué en pulvérisation (2 c. à soupe / litre)',
        'Pyréthrine végétale si infestation forte',
        'Favoriser les prédateurs naturels (coccinelles, chrysopes)',
        'Jet d\'eau puissant pour les déloger mécaniquement',
      ],
      prevention: 'Plantation d\'œillets d\'Inde, éviter les excès d\'azote, surveiller régulièrement.',
    },
    {
      id: 'nitrogen',
      name: 'Carence en azote',
      pathogen: 'Carence nutritive (non-pathogène)',
      plants: ['tomato', 'corn', 'lettuce', 'wheat', 'zucchini', 'pepper'],
      keywords: ['jaun', 'pâle', 'chétif', 'lent', 'croissance', 'azote', 'engrais'],
      severity: 'low',
      description: 'Jaunissement général des feuilles commençant par les plus vieilles. La plante présente un aspect chétif avec une croissance très ralentie.',
      treatments: [
        'Apport d\'engrais azoté (orties fermentées, corne broyée)',
        'Purin d\'ortie concentré dilué à 10%',
        'Engrais soluble à libération rapide en urgence',
      ],
      prevention: 'Apport régulier de compost mature, rotation des cultures avec des légumineuses.',
    },
    {
      id: 'caterpillar',
      name: 'Chenilles / larves',
      pathogen: 'Insectes (Lépidoptères, Coléoptères)',
      plants: ['tomato', 'corn', 'apple', 'lettuce', 'carrot'],
      keywords: ['trou', 'rongé', 'mangé', 'percé', 'chenille', 'larve', 'insecte'],
      severity: 'medium',
      description: 'Dégâts mécaniques caractéristiques : trous irréguliers dans les feuilles, galeries dans les fruits, déjections visibles.',
      treatments: [
        'Bacillus thuringiensis (Bt) — biopesticide efficace',
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
      keywords: ['flétr', 'fané', 'vasculaire', 'brun', 'intérieur', 'tige', 'racine', 'fusarium'],
      severity: 'high',
      description: 'Maladie vasculaire : le champignon bouche les vaisseaux conducteurs. La tige coupée montre un brunissement interne caractéristique.',
      treatments: [
        'Retirer et détruire les plantes atteintes — pas de compostage',
        'Désinfecter les outils entre chaque plant',
        'Rotation des cultures sur au moins 4-5 ans',
        'Trichoderma en traitement biologique du sol',
      ],
      prevention: 'Variétés résistantes (F sur l\'étiquette pour les tomates), sol bien drainé, rotation stricte.',
    },
  ];

  // ── État ───────────────────────────────────────────────

  let state = loadState();
  let currentView = 'diagnostic';
  let uploadedPhotos = [];

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { garden: [], history: [], ...JSON.parse(raw) } : { garden: [], history: [] };
    } catch { return { garden: [], history: [] }; }
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

  function fmtDate(s) {
    if (!s) return '';
    const d = new Date(s);
    return isNaN(d) ? s : d.toLocaleDateString('fr-FR');
  }

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  // ── Navigation ─────────────────────────────────────────

  function setView(name) {
    currentView = name;
    uploadedPhotos = [];
    document.querySelectorAll('[data-view]').forEach(el =>
      el.classList.toggle('active', el.dataset.view === name)
    );
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Rendu principal ────────────────────────────────────

  function render() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    ({ diagnostic: renderDiagnostic, garden: renderGarden, guide: renderGuide, history: renderHistory })[currentView]?.(app);
    refreshIcons();
  }

  // ── VUE DIAGNOSTIC ─────────────────────────────────────

  function renderDiagnostic(container) {
    const plantOptions = PLANTS
      .map(p => `<option value="${p.id}">${p.icon} ${p.label}</option>`)
      .join('');

    container.innerHTML = `
      <div class="view">

        <!-- Hero -->
        <div class="diag-hero">
          <div class="hero-icon"><i data-lucide="leaf"></i></div>
          <div class="hero-text">
            <h1>Diagnostiquez vos plantes</h1>
            <p>Décrivez vos symptômes et obtenez des conseils de traitement personnalisés</p>
          </div>
        </div>

        <!-- Formulaire -->
        <div class="form-card">

          <!-- Étape 1 : Plante -->
          <div class="form-step">
            <div class="step-header">
              <div class="step-num">1</div>
              <div class="step-label"><i data-lucide="sprout"></i> Quelle est votre plante ?</div>
            </div>
            <div class="select-wrap">
              <i data-lucide="sprout" class="select-leaf"></i>
              <select id="plant-select" class="plant-select">
                <option value="">— Choisissez votre plante —</option>
                ${plantOptions}
              </select>
              <i data-lucide="chevron-down" class="select-arrow"></i>
            </div>
          </div>

          <div class="step-divider"></div>

          <!-- Étape 2 : Symptômes -->
          <div class="form-step">
            <div class="step-header">
              <div class="step-num">2</div>
              <div class="step-label"><i data-lucide="message-square"></i> Décrivez les symptômes observés</div>
            </div>
            <textarea id="symptom-text" class="symptom-textarea" rows="5"
              placeholder="Ex : Les feuilles jaunissent à partir du bas, des taches brunes apparaissent sur les tiges, la plante se fane malgré l'arrosage, présence d'un duvet grisâtre sur les feuilles..."></textarea>
          </div>

          <div class="step-divider"></div>

          <!-- Étape 3 : Photos -->
          <div class="form-step">
            <div class="step-header">
              <div class="step-num">3</div>
              <div class="step-label">
                <i data-lucide="camera"></i> Photos de votre plante
                <span class="opt">— optionnel</span>
              </div>
            </div>
            <div class="upload-zone" id="upload-zone">
              <i data-lucide="image-plus"></i>
              <p>Glissez vos photos ici<br><span class="upload-or">ou</span></p>
              <button type="button" class="btn-upload" id="upload-btn">
                <i data-lucide="folder-open"></i> Choisir des photos
              </button>
              <span class="upload-hint">JPG, PNG · Maximum 5 photos</span>
              <input type="file" id="photo-input" accept="image/*" multiple hidden />
            </div>
            <div id="photo-preview"></div>
          </div>

          <!-- Bouton -->
          <button class="search-btn" id="search-btn">
            <i data-lucide="search"></i>
            <span>RECHERCHER</span>
          </button>
        </div>

        <!-- Résultats (cachés au départ) -->
        <div id="results-section" class="results-section" style="display:none"></div>

      </div>
    `;

    initDiagnosticEvents();
  }

  function initDiagnosticEvents() {
    const zone      = document.getElementById('upload-zone');
    const input     = document.getElementById('photo-input');
    const uploadBtn = document.getElementById('upload-btn');

    uploadBtn?.addEventListener('click', e => { e.stopPropagation(); input.click(); });
    zone?.addEventListener('click', () => input.click());

    input?.addEventListener('change', e => {
      handleFiles(Array.from(e.target.files));
      input.value = '';
    });

    zone?.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone?.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone?.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      handleFiles(Array.from(e.dataTransfer.files));
    });

    document.getElementById('search-btn')?.addEventListener('click', runDiagnostic);
  }

  // ── Gestion des photos ─────────────────────────────────

  function handleFiles(files) {
    const images    = files.filter(f => f.type.startsWith('image/'));
    const remaining = 5 - uploadedPhotos.length;
    images.slice(0, remaining).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => resizeImage(e.target.result, 500, dataUrl => {
        uploadedPhotos.push({ name: file.name, dataUrl });
        renderPhotoPreview();
      });
      reader.readAsDataURL(file);
    });
  }

  function resizeImage(src, maxSize, cb) {
    const img = new Image();
    img.onload = () => {
      let w = img.width, h = img.height;
      if (w > h) { if (w > maxSize) { h = Math.round(h * maxSize / w); w = maxSize; } }
      else        { if (h > maxSize) { w = Math.round(w * maxSize / h); h = maxSize; } }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      cb(canvas.toDataURL('image/jpeg', 0.75));
    };
    img.src = src;
  }

  function renderPhotoPreview() {
    const preview = document.getElementById('photo-preview');
    if (!preview) return;
    if (!uploadedPhotos.length) { preview.innerHTML = ''; return; }
    preview.innerHTML = `<div class="photo-grid">
      ${uploadedPhotos.map((p, i) => `
        <div class="photo-thumb">
          <img src="${p.dataUrl}" alt="${esc(p.name)}" />
          <button class="photo-del" data-idx="${i}" aria-label="Supprimer"><i data-lucide="x"></i></button>
        </div>`).join('')}
    </div>`;
    preview.querySelectorAll('.photo-del').forEach(btn =>
      btn.addEventListener('click', e => {
        e.stopPropagation();
        uploadedPhotos.splice(Number(btn.dataset.idx), 1);
        renderPhotoPreview();
      })
    );
    refreshIcons();
  }

  // ── Moteur de diagnostic ───────────────────────────────

  function runDiagnostic() {
    const plantId = document.getElementById('plant-select')?.value;
    const text    = document.getElementById('symptom-text')?.value.trim();

    if (!plantId) {
      document.getElementById('plant-select')?.classList.add('shake');
      showNotice('Veuillez choisir une plante dans la liste.');
      return;
    }
    if (!text || text.length < 5) {
      document.getElementById('symptom-text')?.classList.add('shake');
      showNotice('Veuillez décrire les symptômes observés.');
      return;
    }

    const btn = document.getElementById('search-btn');
    btn.classList.add('loading');
    btn.disabled = true;

    setTimeout(() => {
      const plant   = PLANTS.find(p => p.id === plantId);
      const results = scoreDiseases(plantId, text);

      state.history.unshift({
        id: uid(),
        date: new Date().toISOString(),
        plant: plant?.label || plantId,
        plantIcon: plant?.icon || '🌱',
        plantId,
        text,
        photos: uploadedPhotos.length,
        results: results.slice(0, 3).map(r => r.id),
      });
      save();

      btn.classList.remove('loading');
      btn.disabled = false;
      displayResults(results, plant);
    }, 900);
  }

  function scoreDiseases(plantId, text) {
    const lower = text.toLowerCase();
    return DISEASES.map(disease => {
      let score = 0;

      if (plantId && disease.plants.includes(plantId)) score += 22;

      const matchCount = disease.keywords.filter(kw => lower.includes(kw)).length;
      score += matchCount * 10;

      if (disease.keywords.length > 0) {
        score += Math.round((matchCount / disease.keywords.length) * 15);
      }

      return { ...disease, score, matchCount };
    })
    .filter(d => d.score > 8)
    .sort((a, b) => b.score - a.score);
  }

  function displayResults(results, plant) {
    const section = document.getElementById('results-section');
    section.style.display = 'flex';

    if (!results.length) {
      section.innerHTML = `
        <div class="result-empty">
          <i data-lucide="help-circle"></i>
          <h3>Aucune maladie identifiée</h3>
          <p>La description ne correspond pas à une maladie connue dans notre base.<br>
          Consultez un agronome ou votre coopérative agricole locale.</p>
        </div>`;
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      refreshIcons();
      return;
    }

    const top = results.slice(0, 3);
    section.innerHTML = `
      <div class="result-header-card">
        <div class="result-header-icon"><i data-lucide="clipboard-check"></i></div>
        <div>
          <h2>Résultat du diagnostic</h2>
          <p>${top.length} maladie${top.length > 1 ? 's' : ''} identifiée${top.length > 1 ? 's' : ''}
             pour <strong>${esc(plant?.label || '')}</strong></p>
          ${uploadedPhotos.length
            ? `<div class="photo-count-badge"><i data-lucide="camera"></i> ${uploadedPhotos.length} photo${uploadedPhotos.length > 1 ? 's' : ''} enregistrée${uploadedPhotos.length > 1 ? 's' : ''}</div>`
            : ''}
        </div>
      </div>

      ${top.map((d, i) => buildDiseaseCard(d, i, plant)).join('')}

      <div class="result-footer">
        <i data-lucide="info"></i>
        Ce diagnostic est basé sur les symptômes décrits. Consultez un professionnel agréé en cas de doute.
      </div>
    `;

    section.querySelectorAll('.add-to-garden-btn').forEach(btn =>
      btn.addEventListener('click', () => openGardenModal(null, btn.dataset.plant, btn.dataset.disease))
    );
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    refreshIcons();
  }

  function buildDiseaseCard(d, rank, plant) {
    const SEV = {
      high:   { cls: 'sev-high', label: 'Risque élevé',  icon: 'alert-triangle' },
      medium: { cls: 'sev-med',  label: 'Risque moyen',  icon: 'alert-circle'   },
      low:    { cls: 'sev-low',  label: 'Risque faible', icon: 'info'           },
    };
    const sev        = SEV[d.severity] || SEV.low;
    const confidence = Math.min(100, Math.round((d.score / 65) * 100));
    const isTop      = rank === 0;
    const suffix     = ['re', 'e', 'e'][rank] || 'e';

    return `
      <div class="disease-card ${isTop ? 'disease-card-top' : ''} ${sev.cls}">
        <div class="disease-card-header">
          <div class="disease-rank-badge">${rank + 1}${suffix} hypothèse</div>
          <div class="sev-badge ${sev.cls}">
            <i data-lucide="${sev.icon}"></i> ${sev.label}
          </div>
        </div>

        <h3 class="disease-title">${esc(d.name)}</h3>
        <p class="disease-pathogen"><i data-lucide="microscope"></i> ${esc(d.pathogen)}</p>

        <div class="confidence-row">
          <span class="confidence-lbl">Correspondance</span>
          <div class="confidence-bar">
            <div class="confidence-fill" style="width:${confidence}%"></div>
          </div>
          <span class="confidence-val">${confidence}%</span>
        </div>

        <p class="disease-desc">${esc(d.description)}</p>

        <div class="disease-section">
          <h4 class="section-title"><i data-lucide="pill"></i> Traitements recommandés</h4>
          <ol class="treatment-list">
            ${d.treatments.map(t => `<li>${esc(t)}</li>`).join('')}
          </ol>
        </div>

        <div class="disease-section prevention-box">
          <h4 class="section-title"><i data-lucide="shield-check"></i> Prévention</h4>
          <p>${esc(d.prevention)}</p>
        </div>

        <div class="disease-card-footer">
          <button class="add-to-garden-btn" data-plant="${plant?.id || ''}" data-disease="${d.id}">
            <i data-lucide="plus-circle"></i> Ajouter à Mon Jardin
          </button>
        </div>
      </div>
    `;
  }

  function showNotice(msg) {
    const existing = document.querySelector('.notice');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.className = 'notice';
    el.innerHTML = `<i data-lucide="alert-circle"></i> ${msg}`;
    const form = document.querySelector('.form-card');
    if (form) form.before(el);
    refreshIcons();
    setTimeout(() => el.remove(), 3500);
  }

  // ── VUE MON JARDIN ─────────────────────────────────────

  function renderGarden(container) {
    container.innerHTML = `
      <div class="view">
        <div class="view-header">
          <div class="view-title"><i data-lucide="sprout"></i><h2>Mon Jardin</h2></div>
          <button class="btn-primary" id="add-plant-btn"><i data-lucide="plus"></i> Ajouter une plante</button>
        </div>
        <div class="garden-grid" id="garden-grid"></div>
      </div>
    `;
    renderGardenCards();
    document.getElementById('add-plant-btn').addEventListener('click', () => openGardenModal());
    refreshIcons();
  }

  function renderGardenCards() {
    const grid = document.getElementById('garden-grid');
    if (!grid) return;

    if (!state.garden.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <i data-lucide="sprout"></i>
          <h3>Votre jardin est vide</h3>
          <p>Ajoutez vos plantes pour les suivre dans le temps et noter les traitements appliqués.</p>
          <button class="btn-primary" id="add-first"><i data-lucide="plus"></i> Ajouter une plante</button>
        </div>`;
      document.getElementById('add-first')?.addEventListener('click', () => openGardenModal());
      refreshIcons();
      return;
    }

    grid.innerHTML = state.garden.map(p => {
      const meta    = PLANTS.find(pl => pl.id === p.plantId);
      const disease = DISEASES.find(d => d.id === p.diseaseId);
      return `
        <div class="garden-card">
          <div class="garden-card-top">
            <span class="garden-emoji">${meta?.icon || '🌱'}</span>
            <div class="garden-info">
              <strong>${esc(p.name)}</strong>
              <span>${esc(meta?.label || p.plantId)}</span>
            </div>
            <div class="garden-card-actions">
              <button class="btn-icon" data-edit="${p.id}"><i data-lucide="pencil"></i></button>
              <button class="btn-icon danger" data-del="${p.id}"><i data-lucide="trash-2"></i></button>
            </div>
          </div>
          ${disease ? `<div class="disease-chip"><i data-lucide="alert-triangle"></i>${esc(disease.name)}</div>` : ''}
          ${p.notes ? `<p class="garden-notes">${esc(p.notes)}</p>` : ''}
          <div class="garden-meta">
            <span class="status-chip status-${p.status}">${statusLabel(p.status)}</span>
            ${p.since ? `<span class="garden-date">Depuis le ${fmtDate(p.since)}</span>` : ''}
          </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('[data-edit]').forEach(b =>
      b.addEventListener('click', () => openGardenModal(b.dataset.edit)));
    grid.querySelectorAll('[data-del]').forEach(b =>
      b.addEventListener('click', () => {
        if (!confirm('Supprimer cette plante du jardin ?')) return;
        state.garden = state.garden.filter(p => p.id !== b.dataset.del);
        save();
        renderGardenCards();
        refreshIcons();
      }));
    refreshIcons();
  }

  function statusLabel(s) {
    return { healthy: 'Sain', sick: 'Malade', treated: 'En traitement', recovered: 'Rétabli' }[s] || s;
  }

  function openGardenModal(id, defaultPlantId, defaultDiseaseId) {
    const editing  = id ? state.garden.find(p => p.id === id) : null;
    const plantOpts = PLANTS.map(p => ({ value: p.id, label: `${p.icon} ${p.label}` }));
    const diseaseOpts = DISEASES.map(d => ({ value: d.id, label: d.name }));
    const statusOpts = [
      { value: 'sick',      label: 'Malade' },
      { value: 'treated',   label: 'En traitement' },
      { value: 'healthy',   label: 'Sain' },
      { value: 'recovered', label: 'Rétabli' },
    ];

    openModal(editing ? 'Modifier la plante' : 'Ajouter une plante', [
      { name: 'name',      label: 'Nom / surnom *', required: true, default: editing?.name || '' },
      { name: 'plantId',   label: 'Espèce *', type: 'select', required: true, options: plantOpts,    default: editing?.plantId   || defaultPlantId   || '' },
      { name: 'diseaseId', label: 'Maladie suspectée', type: 'select', options: diseaseOpts,         default: editing?.diseaseId || defaultDiseaseId || '' },
      { name: 'status',    label: 'État *', type: 'select', required: true, options: statusOpts,     default: editing?.status    || 'sick' },
      { name: 'since',     label: 'Depuis le', type: 'date',                                         default: editing?.since || new Date().toISOString().slice(0, 10) },
      { name: 'notes',     label: 'Notes', type: 'textarea', default: editing?.notes || '' },
    ], data => {
      if (editing) Object.assign(editing, data);
      else state.garden.push({ id: uid(), ...data });
      save();
      if (currentView === 'garden') renderGardenCards();
    });
  }

  // ── VUE GUIDE ──────────────────────────────────────────

  function renderGuide(container) {
    container.innerHTML = `
      <div class="view-wide">
        <div class="view-header">
          <div class="view-title"><i data-lucide="book-open"></i><h2>Guide des maladies</h2></div>
        </div>
        <div class="guide-search">
          <i data-lucide="search" class="guide-search-icon"></i>
          <input class="guide-search-input" id="guide-input" placeholder="Rechercher une maladie, une plante…" />
        </div>
        <div class="guide-grid" id="guide-grid"></div>
      </div>
    `;

    const displayDiseases = term => {
      const q = term.toLowerCase();
      const filtered = DISEASES.filter(d =>
        !q || d.name.toLowerCase().includes(q) || d.pathogen.toLowerCase().includes(q) ||
        d.plants.some(pid => PLANTS.find(p => p.id === pid)?.label.toLowerCase().includes(q))
      );
      const grid = document.getElementById('guide-grid');
      if (!filtered.length) {
        grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i data-lucide="search-x"></i><p>Aucun résultat.</p></div>`;
        refreshIcons();
        return;
      }
      const SEV = { high: { cls: 'sev-high', label: 'Risque élevé' }, medium: { cls: 'sev-med', label: 'Risque moyen' }, low: { cls: 'sev-low', label: 'Risque faible' } };
      grid.innerHTML = filtered.map(d => {
        const sev = SEV[d.severity] || SEV.low;
        const plantLabels = d.plants.map(pid => PLANTS.find(p => p.id === pid)?.label || pid);
        return `
          <div class="guide-card">
            <div class="guide-card-header">
              <h3>${esc(d.name)}</h3>
              <span class="sev-badge ${sev.cls}">${sev.label}</span>
            </div>
            <p class="guide-pathogen"><i data-lucide="microscope"></i> ${esc(d.pathogen)}</p>
            <p class="guide-desc">${esc(d.description)}</p>
            <div class="plant-chips">${plantLabels.map(l => `<span class="plant-chip">${esc(l)}</span>`).join('')}</div>
            <details class="guide-details">
              <summary>Traitements &amp; prévention</summary>
              <ul>${d.treatments.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
              <p class="prevention-note"><strong>Prévention :</strong> ${esc(d.prevention)}</p>
            </details>
          </div>`;
      }).join('');
      refreshIcons();
    };

    refreshIcons();
    displayDiseases('');
    document.getElementById('guide-input')?.addEventListener('input', e => displayDiseases(e.target.value));
  }

  // ── VUE HISTORIQUE ─────────────────────────────────────

  function renderHistory(container) {
    container.innerHTML = `
      <div class="view">
        <div class="view-header">
          <div class="view-title"><i data-lucide="clock"></i><h2>Historique</h2></div>
          <button class="btn-danger" id="clear-all"><i data-lucide="trash-2"></i> Tout effacer</button>
        </div>
        <div class="history-list" id="history-list"></div>
      </div>
    `;

    document.getElementById('clear-all')?.addEventListener('click', () => {
      if (!confirm('Effacer tout l\'historique ?')) return;
      state.history = [];
      save();
      renderHistoryList();
    });

    renderHistoryList();
    refreshIcons();
  }

  function renderHistoryList() {
    const list = document.getElementById('history-list');
    if (!list) return;
    if (!state.history.length) {
      list.innerHTML = `<div class="empty-state"><i data-lucide="clock"></i><h3>Aucun diagnostic</h3><p>Vos diagnostics apparaîtront ici après votre première recherche.</p></div>`;
      refreshIcons();
      return;
    }
    list.innerHTML = state.history.map(e => {
      const diseaseNames = e.results?.map(id => DISEASES.find(d => d.id === id)?.name || id) || [];
      return `
        <div class="history-card">
          <div class="history-card-top">
            <div class="history-plant-label">
              <span class="history-plant-emoji">${e.plantIcon || '🌱'}</span>
              ${esc(e.plant)}
            </div>
            <span class="history-date">${fmtDate(e.date)}</span>
          </div>
          ${e.text ? `<p class="history-symptom-text">"${esc(e.text.slice(0, 120))}${e.text.length > 120 ? '…' : ''}"</p>` : ''}
          ${diseaseNames.length ? `<div class="history-results"><strong>Hypothèses :</strong>${diseaseNames.map(n => `<span class="disease-tag">${esc(n)}</span>`).join('')}</div>` : ''}
          ${e.photos ? `<div class="photos-badge"><i data-lucide="camera"></i>${e.photos} photo${e.photos > 1 ? 's' : ''}</div>` : ''}
          <button class="btn-del-history" data-id="${e.id}"><i data-lucide="trash-2"></i> Supprimer</button>
        </div>`;
    }).join('');
    list.querySelectorAll('.btn-del-history').forEach(b =>
      b.addEventListener('click', () => {
        state.history = state.history.filter(e => e.id !== b.dataset.id);
        save();
        renderHistoryList();
        refreshIcons();
      })
    );
    refreshIcons();
  }

  // ── Modal générique ────────────────────────────────────

  const modal      = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalForm  = document.getElementById('modal-form');

  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  function openModal(title, fields, onSubmit) {
    modalTitle.textContent = title;
    modalForm.innerHTML = '';

    fields.forEach(f => {
      const wrap = document.createElement('div');
      wrap.className = 'modal-field';
      wrap.innerHTML = `<label for="mf-${f.name}">${f.label}</label>`;
      let el;

      if (f.type === 'select') {
        el = document.createElement('select');
        el.id = `mf-${f.name}`; el.name = f.name;
        if (!f.required) el.appendChild(new Option('— aucun —', ''));
        (f.options || []).forEach(o => {
          const opt = new Option(o.label, o.value);
          if (String(f.default ?? '') === String(o.value)) opt.selected = true;
          el.appendChild(opt);
        });
      } else if (f.type === 'textarea') {
        el = document.createElement('textarea');
        el.id = `mf-${f.name}`; el.name = f.name;
        el.value = f.default ?? '';
      } else {
        el = document.createElement('input');
        el.id = `mf-${f.name}`; el.name = f.name;
        el.type = f.type || 'text';
        el.value = f.default ?? '';
      }
      if (f.required) el.required = true;
      wrap.appendChild(el);
      modalForm.appendChild(wrap);
    });

    const actions = document.createElement('div');
    actions.className = 'modal-actions';
    actions.innerHTML = `
      <button type="button" class="btn-secondary" id="cancel-modal">Annuler</button>
      <button type="submit" class="btn-primary"><i data-lucide="save"></i> Enregistrer</button>`;
    modalForm.appendChild(actions);
    document.getElementById('cancel-modal')?.addEventListener('click', closeModal);

    modalForm.onsubmit = e => {
      e.preventDefault();
      const data = {};
      fields.forEach(f => { const el = modalForm.elements[f.name]; if (el) data[f.name] = el.value; });
      onSubmit(data);
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

  // ── Import / Export ────────────────────────────────────

  document.getElementById('export-btn')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    Object.assign(document.createElement('a'), {
      href: url, download: `agroassistant-${new Date().toISOString().slice(0, 10)}.json`,
    }).click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('import-file')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!confirm('Remplacer les données actuelles ?')) return;
        state = { garden: [], history: [], ...parsed };
        save(); render();
      } catch (err) { alert('Fichier invalide : ' + err.message); }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  // ── Init ───────────────────────────────────────────────

  document.querySelectorAll('[data-view]').forEach(btn =>
    btn.addEventListener('click', () => setView(btn.dataset.view))
  );

  setView('diagnostic');
})();
