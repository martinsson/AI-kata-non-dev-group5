(() => {
  'use strict';

  const STORAGE_KEY = 'agroassistant-v2';
  const LANG_KEY    = 'agroassistant-lang';

  // ── Traductions (UI) ───────────────────────────────────

  const TRANSLATIONS = {
    fr: {
      nav: { diagnostic: 'Diagnostic', garden: 'Mon Jardin', guide: 'Guide', history: 'Historique' },
      hero: { title: 'Diagnostiquez vos plantes', subtitle: 'Décrivez vos symptômes et obtenez des conseils de traitement personnalisés' },
      form: {
        step1: 'Quelle est votre plante ?', placeholder1: '— Choisissez votre plante —',
        step2: 'Décrivez les symptômes observés',
        placeholder2: 'Ex : feuilles qui jaunissent, taches brunes, duvet blanc, plante qui se fane…',
        step3: 'Photos de votre plante', optional: '— optionnel',
        uploadText: 'Glissez vos photos ici', uploadOr: 'ou',
        uploadBtn: 'Choisir des photos', uploadHint: 'JPG, PNG · Maximum 5 photos',
        searchBtn: 'RECHERCHER',
      },
      results: {
        title: 'Résultat du diagnostic', identified: 'maladie identifiée', identifiedPlural: 'maladies identifiées',
        for: 'pour', photosNote: 'photo enregistrée', photosNotePlural: 'photos enregistrées',
        matchScore: 'Correspondance', noResult: 'Aucune maladie identifiée',
        noResultDesc: 'La description ne correspond à aucune maladie connue. Consultez un agronome ou votre coopérative agricole.',
        treatments: 'Traitements recommandés', prevention: 'Prévention',
        addGarden: 'Ajouter à Mon Jardin',
        disclaimer: 'Diagnostic basé sur les symptômes décrits. Consultez un professionnel en cas de doute.',
        hypothesis: ['1re hypothèse', '2e hypothèse', '3e hypothèse'],
      },
      severity: { high: 'Risque élevé', medium: 'Risque moyen', low: 'Risque faible' },
      garden: {
        title: 'Mon Jardin', addBtn: 'Ajouter une plante',
        emptyTitle: 'Votre jardin est vide', emptyDesc: 'Ajoutez vos plantes pour les suivre dans le temps.',
        addFirst: 'Ajouter une plante', formAddTitle: 'Ajouter une plante', formEditTitle: 'Modifier la plante',
        fieldName: 'Nom / surnom *', fieldSpecies: 'Espèce *', fieldDisease: 'Maladie suspectée',
        fieldStatus: 'État *', fieldSince: 'Depuis le', fieldNotes: 'Notes',
        confirmDel: 'Supprimer cette plante du jardin ?',
        status: { healthy: 'Sain', sick: 'Malade', treated: 'En traitement', recovered: 'Rétabli' },
      },
      guide: { title: 'Guide des maladies', searchPlaceholder: 'Rechercher une maladie, une plante…', noResult: 'Aucun résultat.', treatmentsTitle: 'Traitements & prévention', preventionLabel: 'Prévention :' },
      history: {
        title: 'Historique', clearBtn: 'Tout effacer', clearConfirm: "Effacer tout l'historique ?",
        emptyTitle: 'Aucun diagnostic', emptyDesc: 'Vos diagnostics apparaîtront ici après votre première recherche.',
        hypotheses: 'Hypothèses :', photos: 'photo', photosPlural: 'photos', deleteBtn: 'Supprimer',
      },
      modal: { cancel: 'Annuler', save: 'Enregistrer', noneOption: '— aucun —' },
      notices: {
        selectPlant: 'Veuillez choisir une plante dans la liste.',
        describeSymptoms: 'Veuillez décrire les symptômes observés.',
        replaceData: 'Remplacer les données actuelles ?', invalidFile: 'Fichier invalide : ',
      },
    },
    en: {
      nav: { diagnostic: 'Diagnose', garden: 'My Garden', guide: 'Guide', history: 'History' },
      hero: { title: 'Diagnose your plants', subtitle: 'Describe your symptoms and get personalised treatment advice' },
      form: {
        step1: 'What is your plant?', placeholder1: '— Choose your plant —',
        step2: 'Describe the symptoms observed',
        placeholder2: 'Ex: yellowing leaves, brown spots, white powder, wilting despite watering…',
        step3: 'Photos of your plant', optional: '— optional',
        uploadText: 'Drag your photos here', uploadOr: 'or',
        uploadBtn: 'Choose photos', uploadHint: 'JPG, PNG · Maximum 5 photos',
        searchBtn: 'SEARCH',
      },
      results: {
        title: 'Diagnosis result', identified: 'disease identified', identifiedPlural: 'diseases identified',
        for: 'for', photosNote: 'photo saved', photosNotePlural: 'photos saved',
        matchScore: 'Match', noResult: 'No disease identified',
        noResultDesc: 'The description does not match any known disease. Consult an agronomist or your local agricultural cooperative.',
        treatments: 'Recommended treatments', prevention: 'Prevention',
        addGarden: 'Add to My Garden',
        disclaimer: 'Diagnosis based on described symptoms. Consult a professional if in doubt.',
        hypothesis: ['1st hypothesis', '2nd hypothesis', '3rd hypothesis'],
      },
      severity: { high: 'High risk', medium: 'Medium risk', low: 'Low risk' },
      garden: {
        title: 'My Garden', addBtn: 'Add a plant',
        emptyTitle: 'Your garden is empty', emptyDesc: 'Add your plants to track them over time.',
        addFirst: 'Add a plant', formAddTitle: 'Add a plant', formEditTitle: 'Edit plant',
        fieldName: 'Name / nickname *', fieldSpecies: 'Species *', fieldDisease: 'Suspected disease',
        fieldStatus: 'Status *', fieldSince: 'Since', fieldNotes: 'Notes',
        confirmDel: 'Remove this plant from the garden?',
        status: { healthy: 'Healthy', sick: 'Sick', treated: 'Under treatment', recovered: 'Recovered' },
      },
      guide: { title: 'Disease guide', searchPlaceholder: 'Search a disease or plant…', noResult: 'No results.', treatmentsTitle: 'Treatments & prevention', preventionLabel: 'Prevention:' },
      history: {
        title: 'History', clearBtn: 'Clear all', clearConfirm: 'Clear entire history?',
        emptyTitle: 'No diagnoses yet', emptyDesc: 'Your diagnoses will appear here after your first search.',
        hypotheses: 'Hypotheses:', photos: 'photo', photosPlural: 'photos', deleteBtn: 'Delete',
      },
      modal: { cancel: 'Cancel', save: 'Save', noneOption: '— none —' },
      notices: {
        selectPlant: 'Please select a plant from the list.',
        describeSymptoms: 'Please describe the symptoms observed.',
        replaceData: 'Replace current data?', invalidFile: 'Invalid file: ',
      },
    },
    zh: {
      nav: { diagnostic: '诊断', garden: '我的花园', guide: '指南', history: '历史' },
      hero: { title: '植物病害诊断', subtitle: '描述症状，获取个性化的治疗建议' },
      form: {
        step1: '您的植物是什么？', placeholder1: '— 请选择您的植物 —',
        step2: '描述观察到的症状',
        placeholder2: '例如：叶片变黄、棕色斑点、白色粉末、尽管浇水但植株仍萎蔫…',
        step3: '植物照片', optional: '— 可选',
        uploadText: '将照片拖放到此处', uploadOr: '或',
        uploadBtn: '选择照片', uploadHint: 'JPG、PNG · 最多5张照片',
        searchBtn: '搜索',
      },
      results: {
        title: '诊断结果', identified: '种疾病已识别', identifiedPlural: '种疾病已识别',
        for: '针对', photosNote: '张照片已保存', photosNotePlural: '张照片已保存',
        matchScore: '匹配度', noResult: '未识别任何疾病',
        noResultDesc: '您的描述与数据库中的已知疾病不匹配。请咨询农学家或当地农业合作社。',
        treatments: '推荐治疗方法', prevention: '预防措施',
        addGarden: '添加到花园',
        disclaimer: '此诊断基于所描述的症状。如有疑问，请咨询专业人士。',
        hypothesis: ['第1种可能', '第2种可能', '第3种可能'],
      },
      severity: { high: '高风险', medium: '中等风险', low: '低风险' },
      garden: {
        title: '我的花园', addBtn: '添加植物',
        emptyTitle: '您的花园是空的', emptyDesc: '添加您的植物以便随时跟踪其状态。',
        addFirst: '添加植物', formAddTitle: '添加植物', formEditTitle: '编辑植物',
        fieldName: '名称/别名 *', fieldSpecies: '种类 *', fieldDisease: '疑似疾病',
        fieldStatus: '状态 *', fieldSince: '自', fieldNotes: '备注',
        confirmDel: '从花园中删除这株植物？',
        status: { healthy: '健康', sick: '生病', treated: '治疗中', recovered: '康复' },
      },
      guide: { title: '疾病指南', searchPlaceholder: '搜索疾病或植物…', noResult: '无结果。', treatmentsTitle: '治疗与预防', preventionLabel: '预防：' },
      history: {
        title: '历史记录', clearBtn: '全部清除', clearConfirm: '清除所有历史记录？',
        emptyTitle: '暂无诊断记录', emptyDesc: '您的诊断记录将在第一次搜索后显示在此处。',
        hypotheses: '可能性：', photos: '张照片', photosPlural: '张照片', deleteBtn: '删除',
      },
      modal: { cancel: '取消', save: '保存', noneOption: '— 无 —' },
      notices: {
        selectPlant: '请从列表中选择一种植物。',
        describeSymptoms: '请描述观察到的症状。',
        replaceData: '用文件中的数据替换当前数据？', invalidFile: '无效文件：',
      },
    },
    es: {
      nav: { diagnostic: 'Diagnóstico', garden: 'Mi Jardín', guide: 'Guía', history: 'Historial' },
      hero: { title: 'Diagnostica tus plantas', subtitle: 'Describe tus síntomas y obtén consejos de tratamiento personalizados' },
      form: {
        step1: '¿Cuál es tu planta?', placeholder1: '— Elige tu planta —',
        step2: 'Describe los síntomas observados',
        placeholder2: 'Ej: hojas que amarillean, manchas marrones, polvo blanco, planta marchita pese al riego…',
        step3: 'Fotos de tu planta', optional: '— opcional',
        uploadText: 'Arrastra tus fotos aquí', uploadOr: 'o',
        uploadBtn: 'Elegir fotos', uploadHint: 'JPG, PNG · Máximo 5 fotos',
        searchBtn: 'BUSCAR',
      },
      results: {
        title: 'Resultado del diagnóstico', identified: 'enfermedad identificada', identifiedPlural: 'enfermedades identificadas',
        for: 'para', photosNote: 'foto guardada', photosNotePlural: 'fotos guardadas',
        matchScore: 'Correspondencia', noResult: 'Ninguna enfermedad identificada',
        noResultDesc: 'La descripción no coincide con ninguna enfermedad conocida. Consulta un agrónomo o tu cooperativa agrícola local.',
        treatments: 'Tratamientos recomendados', prevention: 'Prevención',
        addGarden: 'Añadir a Mi Jardín',
        disclaimer: 'Diagnóstico basado en los síntomas descritos. Consulta a un profesional en caso de duda.',
        hypothesis: ['1ª hipótesis', '2ª hipótesis', '3ª hipótesis'],
      },
      severity: { high: 'Riesgo alto', medium: 'Riesgo medio', low: 'Riesgo bajo' },
      garden: {
        title: 'Mi Jardín', addBtn: 'Añadir una planta',
        emptyTitle: 'Tu jardín está vacío', emptyDesc: 'Añade tus plantas para hacer seguimiento a lo largo del tiempo.',
        addFirst: 'Añadir una planta', formAddTitle: 'Añadir una planta', formEditTitle: 'Editar planta',
        fieldName: 'Nombre / apodo *', fieldSpecies: 'Especie *', fieldDisease: 'Enfermedad sospechada',
        fieldStatus: 'Estado *', fieldSince: 'Desde el', fieldNotes: 'Notas',
        confirmDel: '¿Eliminar esta planta del jardín?',
        status: { healthy: 'Sano', sick: 'Enfermo', treated: 'En tratamiento', recovered: 'Recuperado' },
      },
      guide: { title: 'Guía de enfermedades', searchPlaceholder: 'Buscar una enfermedad o planta…', noResult: 'Sin resultados.', treatmentsTitle: 'Tratamientos y prevención', preventionLabel: 'Prevención:' },
      history: {
        title: 'Historial', clearBtn: 'Borrar todo', clearConfirm: '¿Borrar todo el historial?',
        emptyTitle: 'Sin diagnósticos', emptyDesc: 'Tus diagnósticos aparecerán aquí tras tu primera búsqueda.',
        hypotheses: 'Hipótesis:', photos: 'foto', photosPlural: 'fotos', deleteBtn: 'Eliminar',
      },
      modal: { cancel: 'Cancelar', save: 'Guardar', noneOption: '— ninguno —' },
      notices: {
        selectPlant: 'Por favor, elige una planta de la lista.',
        describeSymptoms: 'Por favor, describe los síntomas observados.',
        replaceData: '¿Reemplazar los datos actuales?', invalidFile: 'Archivo no válido: ',
      },
    },
    ar: {
      nav: { diagnostic: 'التشخيص', garden: 'حديقتي', guide: 'الدليل', history: 'السجل' },
      hero: { title: 'شخِّص نباتاتك', subtitle: 'صف الأعراض واحصل على نصائح علاجية مخصصة' },
      form: {
        step1: 'ما هو نباتك؟', placeholder1: '— اختر نباتك —',
        step2: 'صف الأعراض الملاحظة',
        placeholder2: 'مثال: اصفرار الأوراق، بقع بنية، مسحوق أبيض، ذبول رغم الري…',
        step3: 'صور نباتك', optional: '— اختياري',
        uploadText: 'اسحب صورك هنا', uploadOr: 'أو',
        uploadBtn: 'اختيار الصور', uploadHint: 'JPG، PNG · بحد أقصى 5 صور',
        searchBtn: 'بحث',
      },
      results: {
        title: 'نتيجة التشخيص', identified: 'مرض تم تحديده', identifiedPlural: 'أمراض تم تحديدها',
        for: 'لـ', photosNote: 'صورة محفوظة', photosNotePlural: 'صور محفوظة',
        matchScore: 'التطابق', noResult: 'لم يتم التعرف على أي مرض',
        noResultDesc: 'الوصف لا يتطابق مع أي مرض معروف في قاعدة البيانات. استشر زراعيًا أو جمعيتك الزراعية المحلية.',
        treatments: 'العلاجات الموصى بها', prevention: 'الوقاية',
        addGarden: 'إضافة إلى حديقتي',
        disclaimer: 'يعتمد هذا التشخيص على الأعراض الموصوفة. استشر متخصصًا في حالة الشك.',
        hypothesis: ['الفرضية الأولى', 'الفرضية الثانية', 'الفرضية الثالثة'],
      },
      severity: { high: 'خطر مرتفع', medium: 'خطر متوسط', low: 'خطر منخفض' },
      garden: {
        title: 'حديقتي', addBtn: 'إضافة نبتة',
        emptyTitle: 'حديقتك فارغة', emptyDesc: 'أضف نباتاتك لمتابعة حالتها بمرور الوقت.',
        addFirst: 'إضافة نبتة', formAddTitle: 'إضافة نبتة', formEditTitle: 'تعديل النبتة',
        fieldName: 'الاسم / اللقب *', fieldSpecies: 'النوع *', fieldDisease: 'المرض المشتبه به',
        fieldStatus: 'الحالة *', fieldSince: 'منذ', fieldNotes: 'ملاحظات',
        confirmDel: 'هل تريد حذف هذه النبتة من الحديقة؟',
        status: { healthy: 'سليمة', sick: 'مريضة', treated: 'تحت العلاج', recovered: 'تعافت' },
      },
      guide: { title: 'دليل الأمراض', searchPlaceholder: 'ابحث عن مرض أو نبات…', noResult: 'لا توجد نتائج.', treatmentsTitle: 'العلاجات والوقاية', preventionLabel: 'الوقاية:' },
      history: {
        title: 'السجل', clearBtn: 'مسح الكل', clearConfirm: 'هل تريد مسح كل السجل؟',
        emptyTitle: 'لا توجد تشخيصات', emptyDesc: 'ستظهر تشخيصاتك هنا بعد أول بحث.',
        hypotheses: 'الفرضيات:', photos: 'صورة', photosPlural: 'صور', deleteBtn: 'حذف',
      },
      modal: { cancel: 'إلغاء', save: 'حفظ', noneOption: '— لا شيء —' },
      notices: {
        selectPlant: 'الرجاء اختيار نبات من القائمة.',
        describeSymptoms: 'الرجاء وصف الأعراض الملاحظة.',
        replaceData: 'هل تريد استبدال البيانات الحالية؟', invalidFile: 'ملف غير صالح: ',
      },
    },
  };

  // ── Données multilingues des plantes ──────────────────

  const PLANTS = [
    { id: 'tomato',     icon: '🍅', names: { fr: 'Tomate',          en: 'Tomato',         zh: '番茄',     es: 'Tomate',       ar: 'طماطم' } },
    { id: 'potato',     icon: '🥔', names: { fr: 'Pomme de terre',   en: 'Potato',         zh: '马铃薯',   es: 'Patata',       ar: 'بطاطس' } },
    { id: 'rose',       icon: '🌹', names: { fr: 'Rose',             en: 'Rose',           zh: '玫瑰',     es: 'Rosa',         ar: 'وردة' } },
    { id: 'wheat',      icon: '🌾', names: { fr: 'Blé',              en: 'Wheat',          zh: '小麦',     es: 'Trigo',        ar: 'قمح' } },
    { id: 'corn',       icon: '🌽', names: { fr: 'Maïs',             en: 'Corn',           zh: '玉米',     es: 'Maíz',         ar: 'ذرة' } },
    { id: 'zucchini',   icon: '🥒', names: { fr: 'Courgette',        en: 'Zucchini',       zh: '西葫芦',   es: 'Calabacín',    ar: 'كوسة' } },
    { id: 'cucumber',   icon: '🥒', names: { fr: 'Concombre',        en: 'Cucumber',       zh: '黄瓜',     es: 'Pepino',       ar: 'خيار' } },
    { id: 'vine',       icon: '🍇', names: { fr: 'Vigne',            en: 'Grapevine',      zh: '葡萄藤',   es: 'Vid',          ar: 'كرمة' } },
    { id: 'apple',      icon: '🍎', names: { fr: 'Pommier',          en: 'Apple tree',     zh: '苹果树',   es: 'Manzano',      ar: 'شجرة تفاح' } },
    { id: 'lettuce',    icon: '🥬', names: { fr: 'Laitue',           en: 'Lettuce',        zh: '生菜',     es: 'Lechuga',      ar: 'خس' } },
    { id: 'strawberry', icon: '🍓', names: { fr: 'Fraisier',         en: 'Strawberry',     zh: '草莓',     es: 'Fresa',        ar: 'فراولة' } },
    { id: 'bean',       icon: '🫘', names: { fr: 'Haricot',          en: 'Bean',           zh: '豆角',     es: 'Judía',        ar: 'فاصوليا' } },
    { id: 'pepper',     icon: '🫑', names: { fr: 'Poivron / Piment', en: 'Pepper',         zh: '甜椒/辣椒', es: 'Pimiento',    ar: 'فلفل' } },
    { id: 'basil',      icon: '🌿', names: { fr: 'Basilic',          en: 'Basil',          zh: '罗勒',     es: 'Albahaca',     ar: 'ريحان' } },
    { id: 'carrot',     icon: '🥕', names: { fr: 'Carotte',          en: 'Carrot',         zh: '胡萝卜',   es: 'Zanahoria',    ar: 'جزر' } },
    { id: 'garlic',     icon: '🧄', names: { fr: 'Ail / Oignon',     en: 'Garlic / Onion', zh: '大蒜/洋葱', es: 'Ajo/Cebolla', ar: 'ثوم/بصل' } },
  ];

  // ── Données multilingues des maladies ─────────────────

  const DISEASES = [
    {
      id: 'mildew', pathogen: 'Phytophthora infestans / Plasmopara viticola',
      plants: ['tomato', 'potato', 'vine', 'lettuce'], severity: 'high',
      names: { fr: 'Mildiou', en: 'Downy Mildew', zh: '霜霉病', es: 'Mildiu', ar: 'عفن زغبي' },
      keywords: {
        fr: ['brun', 'tache', 'duvet', 'gris', 'humide', 'mildiou', 'jaun', 'chute', 'mouillé'],
        en: ['brown', 'spot', 'fuzz', 'mold', 'mildew', 'humid', 'yellow', 'drop', 'wet'],
        zh: ['棕', '斑', '霉', '灰', '湿', '黄', '落叶', '白霉'],
        es: ['marrón', 'mancha', 'moho', 'húmedo', 'mildiu', 'amarill', 'caída'],
        ar: ['بني', 'بقعة', 'عفن', 'رطوبة', 'اصفرار', 'سقوط', 'رمادي'],
      },
      descriptions: {
        fr: "Maladie fongique très répandue favorisée par l'humidité et la chaleur. Taches brunes sur les feuilles avec un duvet grisâtre sous la feuille.",
        en: 'A widespread fungal disease favored by humidity and warmth. Brown spots on leaves with a grayish fuzz on the underside.',
        zh: '霜霉病是一种广泛流行的真菌病害，在湿热环境下易发生。叶片上出现棕色斑点，叶背面有灰白色霉层。',
        es: 'Enfermedad fúngica favorecida por la humedad y el calor. Manchas marrones en las hojas con un moho grisáceo en el envés.',
        ar: 'مرض فطري شائع يفضله الرطوبة والدفء. بقع بنية على الأوراق مع طبقة رمادية زغبية على الجانب السفلي.',
      },
      treatments: {
        fr: ["Traitement à la bouillie bordelaise (cuivre) dès les premiers symptômes", "Retirer et détruire les parties atteintes (ne pas composter)", "Arroser au pied uniquement, jamais sur le feuillage", "Améliorer la circulation d'air entre les plants", "Pulvérisations préventives de décoction de prêle"],
        en: ['Apply Bordeaux mixture (copper) at first symptoms', 'Remove and destroy affected parts (do not compost)', 'Water at the base only, never on foliage', 'Improve air circulation between plants', 'Preventive spraying with horsetail decoction'],
        zh: ['出现首个症状时立即使用波尔多液（铜制剂）处理', '清除并销毁病变部位（勿堆肥）', '只在根部浇水，避免叶面沾湿', '改善植株间通风条件', '预防性喷施木贼草煎液'],
        es: ['Aplicar caldo bordelés (cobre) ante los primeros síntomas', 'Retirar y destruir las partes afectadas (no compostar)', 'Regar solo en la base, nunca sobre el follaje', 'Mejorar la circulación de aire entre plantas', 'Pulverizaciones preventivas con decocción de cola de caballo'],
        ar: ['رش محلول بوردو (النحاس) عند ظهور أولى الأعراض', 'إزالة الأجزاء المصابة وإتلافها (لا تضعها في السماد)', 'الري عند الجذور فقط، وليس على الأوراق', 'تحسين تهوية الهواء بين النباتات', 'الرش الوقائي بمغلي ذيل الحصان'],
      },
      prevention: {
        fr: "Choisir des variétés résistantes, respecter les distances de plantation, éviter l'excès d'humidité.",
        en: 'Choose resistant varieties, maintain proper plant spacing, avoid excess moisture.',
        zh: '选择抗病品种，保持适当的种植间距，避免过度潮湿。',
        es: 'Elegir variedades resistentes, respetar las distancias de plantación, evitar el exceso de humedad.',
        ar: 'اختيار أصناف مقاومة، مراعاة المسافات بين النباتات، تجنب الإفراط في الرطوبة.',
      },
    },
    {
      id: 'powdery_mildew', pathogen: 'Erysiphales (diverses espèces)',
      plants: ['rose', 'zucchini', 'cucumber', 'vine', 'apple', 'strawberry', 'pepper'], severity: 'medium',
      names: { fr: 'Oïdium', en: 'Powdery Mildew', zh: '白粉病', es: 'Oídio', ar: 'البياض الدقيقي' },
      keywords: {
        fr: ['blanc', 'blanche', 'poudre', 'farin', 'oïdi', 'enroulé', 'crispé'],
        en: ['white', 'powder', 'powdery', 'mildew', 'flour', 'curled'],
        zh: ['白', '粉', '白粉', '卷叶', '褪绿'],
        es: ['blanco', 'blanca', 'polvo', 'harinoso', 'oídio', 'enrollad'],
        ar: ['أبيض', 'بيضاء', 'مسحوق', 'دقيق', 'بياض', 'ملتوية'],
      },
      descriptions: {
        fr: "Champignon superficiel qui recouvre les feuilles d'un feutrage blanc poudreux. Favorisé par des nuits fraîches et journées chaudes.",
        en: 'A superficial fungus covering leaves with a white powdery coating. Favored by cool nights and warm, dry days.',
        zh: '白粉病是一种表面真菌，使叶片覆盖白色粉状物。易在夜凉昼热、空气干燥的条件下发生。',
        es: 'Un hongo superficial que cubre las hojas con un polvo blanco. Favorecido por noches frescas y días cálidos y secos.',
        ar: 'فطر سطحي يغطي الأوراق بطبقة بيضاء مسحوقية. يفضله الليالي الباردة والأيام الدافئة الجافة.',
      },
      treatments: {
        fr: ["Pulvériser du soufre micronisé (fongicide homologué)", "Solution de bicarbonate de soude (1 c. à soupe/litre) + quelques gouttes de savon noir", "Huile de neem en pulvérisation hebdomadaire", "Retirer les parties fortement atteintes"],
        en: ['Spray with micronized sulfur (approved fungicide)', 'Sodium bicarbonate solution (1 tbsp/liter) + a few drops of black soap', 'Weekly neem oil spray', 'Remove heavily affected parts'],
        zh: ['喷施微粉化硫磺（经认证的杀菌剂）', '小苏打溶液（1汤匙/升）加几滴肥皂水', '每周喷施印楝油', '清除严重受损部位'],
        es: ['Pulverizar con azufre micronizado (fungicida homologado)', 'Solución de bicarbonato sódico (1 cucharada/litro) + unas gotas de jabón negro', 'Pulverización semanal con aceite de neem', 'Retirar las partes gravemente afectadas'],
        ar: ['رش الكبريت الميكروني (مبيد فطري معتمد)', 'محلول بيكربونات الصوديوم (ملعقة كبيرة/لتر) مع بضع قطرات صابون', 'رش زيت النيم أسبوعيًا', 'إزالة الأجزاء المصابة بشدة'],
      },
      prevention: {
        fr: "Aérer les plants, éviter les excès d'azote, arroser le matin.",
        en: 'Ensure good plant spacing, avoid nitrogen excess, water in the morning.',
        zh: '保证植株间距，避免氮肥过量，早晨浇水。',
        es: 'Buena aireación, evitar exceso de nitrógeno, regar por la mañana.',
        ar: 'ضمان مسافة جيدة بين النباتات، تجنب زيادة النيتروجين، الري صباحًا.',
      },
    },
    {
      id: 'rust', pathogen: 'Puccinia spp. / Phragmidium spp.',
      plants: ['rose', 'wheat', 'corn', 'bean'], severity: 'medium',
      names: { fr: 'Rouille', en: 'Rust', zh: '锈病', es: 'Roya', ar: 'الصدأ' },
      keywords: {
        fr: ['rouille', 'orange', 'pustule', 'brun-rouge', 'brun', 'noir', 'chute'],
        en: ['rust', 'orange', 'pustule', 'brown', 'black', 'spot', 'drop'],
        zh: ['锈', '橙', '棕红', '脓疱', '黑', '落叶'],
        es: ['roya', 'naranja', 'pústula', 'marrón', 'negro', 'caída'],
        ar: ['صدأ', 'برتقالي', 'بثرة', 'بني', 'أسود', 'سقوط'],
      },
      descriptions: {
        fr: "Maladie fongique se manifestant par des pustules orangées à brun-noir sur les feuilles, souvent visibles sur la face inférieure.",
        en: 'Fungal disease showing orange to brown-black pustules on leaves, often visible on the underside.',
        zh: '锈病是一种真菌病害，在叶片上（通常是叶背）出现橙色至褐黑色孢子堆。',
        es: 'Enfermedad fúngica que muestra pústulas de color naranja a marrón-negro en las hojas, especialmente en el envés.',
        ar: 'مرض فطري يظهر على شكل بثرات برتقالية إلى بنية-سوداء على الأوراق، غالبًا على الجانب السفلي.',
      },
      treatments: {
        fr: ["Fongicide à base de triazole", "Enlever et détruire les feuilles atteintes", "Bouillie bordelaise en début d'attaque", "Nettoyer soigneusement les outils entre chaque plant"],
        en: ['Triazole-based fungicide', 'Remove and destroy affected leaves', 'Bordeaux mixture at early stages', 'Clean tools thoroughly between plants'],
        zh: ['使用三唑类杀菌剂', '清除并销毁病叶', '发病初期使用波尔多液', '植株之间彻底清洁工具'],
        es: ['Fungicida a base de triazol', 'Retirar y destruir las hojas afectadas', 'Caldo bordelés en fases iniciales', 'Limpiar bien las herramientas entre plantas'],
        ar: ['مبيد فطري على أساس ثلاثي الأزول', 'إزالة الأوراق المصابة وإتلافها', 'محلول بوردو في المراحل الأولى', 'تنظيف الأدوات جيدًا بين النباتات'],
      },
      prevention: {
        fr: "Rotation des cultures, variétés résistantes, éviter le feuillage mouillé.",
        en: 'Crop rotation, resistant varieties, avoid wet foliage.',
        zh: '轮作，选用抗病品种，避免叶面潮湿。',
        es: 'Rotación de cultivos, variedades resistentes, evitar el follaje mojado.',
        ar: 'تناوب المحاصيل، أصناف مقاومة، تجنب ترطيب الأوراق.',
      },
    },
    {
      id: 'botrytis', pathogen: 'Botrytis cinerea',
      plants: ['tomato', 'strawberry', 'vine', 'lettuce', 'rose', 'bean', 'pepper'], severity: 'high',
      names: { fr: 'Pourriture grise', en: 'Gray Mold', zh: '灰霉病', es: 'Podredumbre gris', ar: 'العفن الرمادي' },
      keywords: {
        fr: ['gris', 'moisissure', 'duvet', 'pourr', 'botrytis', 'brun', 'fruit', 'humide'],
        en: ['gray', 'grey', 'mold', 'mould', 'fuzz', 'rot', 'botrytis', 'brown', 'fruit', 'humid'],
        zh: ['灰', '霉', '腐', '灰霉', '棕', '果实', '潮湿'],
        es: ['gris', 'moho', 'podredumbre', 'botrytis', 'marrón', 'fruto', 'húmedo'],
        ar: ['رمادي', 'عفن', 'تعفن', 'بوتريتيس', 'بني', 'ثمار', 'رطوبة'],
      },
      descriptions: {
        fr: "Champignon ubiquiste attaquant les parties affaiblies ou blessées. Se reconnaît au duvet gris caractéristique sur les tissus pourris.",
        en: 'Ubiquitous fungus attacking weakened or injured tissues. Recognised by the characteristic gray fuzz on rotted tissue.',
        zh: '灰霉病是一种广泛存在的真菌，侵染衰弱或受伤的组织。病变组织上覆盖典型的灰色绒毛状霉层。',
        es: 'Hongo ubicuo que ataca los tejidos débiles o dañados. Se reconoce por el típico moho gris sobre los tejidos podridos.',
        ar: 'فطر واسع الانتشار يهاجم الأنسجة الضعيفة أو التالفة. يُعرف بالطبقة الرمادية الزغبية على الأنسجة المتعفنة.',
      },
      treatments: {
        fr: ["Améliorer impérativement la ventilation", "Retirer toutes les parties atteintes et détruire", "Éviter les blessures sur les plantes", "Réduire l'humidité ambiante", "Fongicide spécifique si nécessaire"],
        en: ['Improve ventilation urgently', 'Remove all affected parts and destroy', 'Avoid wounds on plants', 'Reduce ambient humidity', 'Specific fungicide if necessary'],
        zh: ['立即改善通风条件', '清除所有病变部位并销毁', '避免植株受伤', '降低环境湿度', '必要时使用特定杀菌剂'],
        es: ['Mejorar la ventilación urgentemente', 'Retirar todas las partes afectadas y destruirlas', 'Evitar heridas en las plantas', 'Reducir la humedad ambiental', 'Fungicida específico si es necesario'],
        ar: ['تحسين التهوية بشكل عاجل', 'إزالة جميع الأجزاء المصابة وإتلافها', 'تجنب إحداث جروح في النباتات', 'تقليل الرطوبة المحيطة', 'استخدام مبيد فطري محدد إذا لزم الأمر'],
      },
      prevention: {
        fr: "Bonne aération, ne pas surplanter, éviter l'arrosage le soir.",
        en: 'Good aeration, avoid overcrowding, do not water in the evening.',
        zh: '保持良好通风，避免种植密度过高，傍晚不要浇水。',
        es: 'Buena aireación, no sobreplantar, evitar el riego nocturno.',
        ar: 'تهوية جيدة، عدم الإفراط في الزراعة، تجنب الري مساءً.',
      },
    },
    {
      id: 'chlorosis', pathogen: 'Carence en fer (non-pathogène)',
      plants: ['rose', 'vine', 'apple', 'strawberry', 'tomato'], severity: 'low',
      names: { fr: 'Chlorose ferrique', en: 'Iron Chlorosis', zh: '缺铁黄化', es: 'Clorosis férrica', ar: 'الكلوروز الحديدي' },
      keywords: {
        fr: ['jaun', 'pâle', 'nervure', 'veine', 'chlorose', 'fer', 'décolor'],
        en: ['yellow', 'pale', 'vein', 'chlorosis', 'iron', 'discolor', 'green vein'],
        zh: ['黄', '叶脉', '缺铁', '褪绿', '失绿', '苍白'],
        es: ['amarill', 'pálido', 'nervadura', 'clorosis', 'hierro', 'decolor'],
        ar: ['اصفرار', 'شاحب', 'عروق', 'كلوروز', 'حديد', 'تغير لون'],
      },
      descriptions: {
        fr: "Jaunissement du limbe entre les nervures qui restent vertes. Dû à une carence en fer, souvent liée à un pH du sol trop élevé.",
        en: 'Yellowing of the leaf blade between the veins, which remain green. Due to iron deficiency, often linked to high soil pH.',
        zh: '缺铁黄化：叶脉间叶片变黄，但叶脉保持绿色。通常与土壤pH值过高（石灰性土壤）有关。',
        es: 'Amarillamiento del limbo foliar entre las nervaduras, que permanecen verdes. Causado por deficiencia de hierro, a menudo por pH del suelo elevado.',
        ar: 'اصفرار نسيج الورقة بين العروق التي تبقى خضراء. ناجم عن نقص الحديد، غالبًا بسبب ارتفاع درجة pH التربة.',
      },
      treatments: {
        fr: ["Apport de chélate de fer (disponible en jardinerie)", "Abaisser le pH du sol avec de la tourbe ou du soufre", "Arroser avec de l'eau de pluie plutôt que l'eau calcaire", "Traitement foliaire au sulfate de fer dilué"],
        en: ['Apply iron chelate (available at garden centres)', 'Lower soil pH with peat or sulfur', 'Water with rainwater instead of hard water', 'Foliar treatment with diluted iron sulphate'],
        zh: ['施用铁螯合剂（园艺店有售）', '用泥炭或硫磺降低土壤pH值', '用雨水代替硬水浇灌', '叶面喷施稀释硫酸铁'],
        es: ['Aplicar quelato de hierro (disponible en viveros)', 'Reducir el pH del suelo con turba o azufre', 'Regar con agua de lluvia en lugar de agua calcárea', 'Tratamiento foliar con sulfato de hierro diluido'],
        ar: ['إضافة خالب الحديد (متوفر في محلات الحدائق)', 'تخفيض pH التربة بالخث أو الكبريت', 'الري بماء المطر بدلاً من الماء الكلسي', 'رش ورقي بكبريتات الحديد المخففة'],
      },
      prevention: {
        fr: "Vérifier et corriger le pH du sol avant plantation. Éviter les excès de calcaire.",
        en: 'Check and correct soil pH before planting. Avoid excess limestone.',
        zh: '种植前检测并调整土壤pH值，避免使用过多石灰。',
        es: 'Verificar y corregir el pH del suelo antes de plantar. Evitar exceso de cal.',
        ar: 'التحقق من pH التربة وتصحيحه قبل الزراعة. تجنب الإفراط في الجير.',
      },
    },
    {
      id: 'root_rot', pathogen: 'Pythium spp. / Rhizoctonia solani',
      plants: ['tomato', 'cucumber', 'zucchini', 'lettuce', 'bean', 'pepper', 'basil'], severity: 'high',
      names: { fr: 'Pourriture racinaire', en: 'Root Rot', zh: '根腐病', es: 'Podredumbre radicular', ar: 'عفن الجذور' },
      keywords: {
        fr: ['racine', 'pourr', 'flétr', 'fané', 'affaiss', 'trop arros', 'collet', 'base', 'sol'],
        en: ['root', 'rot', 'wilt', 'droop', 'overwater', 'crown', 'base', 'soil', 'soggy'],
        zh: ['根', '腐', '萎', '枯萎', '积水', '茎基', '土壤'],
        es: ['raíz', 'podredumbre', 'marchitar', 'exceso riego', 'cuello', 'base', 'suelo'],
        ar: ['جذر', 'تعفن', 'ذبول', 'إفراط ري', 'قاعدة', 'تربة', 'تعفن الجذور'],
      },
      descriptions: {
        fr: "Pourriture des racines et du collet causée par des champignons du sol, favorisée par un excès d'humidité et des sols peu drainants.",
        en: 'Root and crown rot caused by soil fungi, favoured by excess moisture and poorly draining soils.',
        zh: '根腐病由土壤真菌引起，在排水不良和积水土壤中易发生，导致根部和茎基腐烂。',
        es: 'Podredumbre de raíces y cuello causada por hongos del suelo, favorecida por el exceso de humedad y suelos mal drenados.',
        ar: 'عفن الجذور والتاج الناجم عن فطريات التربة، ويفضله الإفراط في الرطوبة والتربة سيئة التصريف.',
      },
      treatments: {
        fr: ["Réduire drastiquement l'arrosage", "Améliorer le drainage (ajout de sable, gravier)", "Retirer et détruire les plants gravement atteints", "Traitement du sol avec un fongicide approprié", "Rempotage avec un substrat sain si en pot"],
        en: ['Drastically reduce watering', 'Improve drainage (add sand, gravel)', 'Remove and destroy severely affected plants', 'Treat soil with an appropriate fungicide', 'Repot with healthy substrate if in a pot'],
        zh: ['大幅度减少浇水量', '改善排水条件（加砂砾）', '清除并销毁严重受病植株', '使用合适的杀菌剂处理土壤', '如盆栽，换用新鲜健康基质重新种植'],
        es: ['Reducir drásticamente el riego', 'Mejorar el drenaje (añadir arena, grava)', 'Retirar y destruir las plantas gravemente afectadas', 'Tratar el suelo con fungicida adecuado', 'Trasplantar con sustrato sano si está en maceta'],
        ar: ['تقليل الري بشكل جذري', 'تحسين الصرف (إضافة رمل أو حصى)', 'إزالة النباتات المصابة بشدة وإتلافها', 'معالجة التربة بمبيد فطري مناسب', 'إعادة الزراعة في تربة صحية إذا كانت في أصيص'],
      },
      prevention: {
        fr: "Sol bien drainé, arrosage raisonné, ne pas planter trop profond.",
        en: 'Well-drained soil, careful watering, do not plant too deep.',
        zh: '保持土壤排水良好，适量浇水，不要种植过深。',
        es: 'Suelo bien drenado, riego moderado, no plantar demasiado profundo.',
        ar: 'تربة جيدة التصريف، ري معقول، عدم الزراعة بعمق زائد.',
      },
    },
    {
      id: 'alternaria', pathogen: 'Alternaria solani',
      plants: ['tomato', 'potato', 'corn', 'carrot'], severity: 'medium',
      names: { fr: 'Alternariose', en: 'Alternaria Blight', zh: '交链孢菌病', es: 'Alternariosis', ar: 'مرض الألترناريا' },
      keywords: {
        fr: ['concentrique', 'cible', 'alternaria', 'brun', 'noir', 'chute', 'fruit'],
        en: ['concentric', 'target', 'alternaria', 'brown', 'black', 'drop', 'fruit', 'ring'],
        zh: ['同心环', '靶状', '棕', '黑', '落果', '轮纹'],
        es: ['concéntrico', 'diana', 'alternaria', 'marrón', 'negro', 'caída', 'fruto'],
        ar: ['متحدة المركز', 'هدف', 'ألترناريا', 'بني', 'أسود', 'سقوط', 'ثمار'],
      },
      descriptions: {
        fr: "Taches brunes à noires concentriques sur les feuilles et les fruits, ressemblant à des cibles. Favorisée par des temps chauds et humides.",
        en: 'Brown to black concentric spots on leaves and fruit, resembling targets. Favoured by warm, humid weather.',
        zh: '叶片和果实上出现同心环形棕色至黑色斑点，形似靶心。高温潮湿天气易发生。',
        es: 'Manchas concéntricas marrones a negras en hojas y frutos, similares a dianas. Favorecida por tiempo cálido y húmedo.',
        ar: 'بقع متحدة المركز من البني إلى الأسود على الأوراق والثمار، تشبه الأهداف. تفضلها الأحوال الجوية الدافئة والرطبة.',
      },
      treatments: {
        fr: ["Fongicide à base de mancozèbe ou de cuivre", "Retirer les feuilles et fruits atteints", "Rotation des cultures sur 3-4 ans", "Tuteurage des tomates pour améliorer l'aération"],
        en: ['Mancozeb or copper-based fungicide', 'Remove affected leaves and fruit', 'Crop rotation over 3-4 years', 'Stake tomatoes to improve aeration'],
        zh: ['代森锰锌或铜制剂杀菌', '清除病叶和病果', '3-4年轮作', '搭架支撑番茄，改善通风'],
        es: ['Fungicida a base de mancozeb o cobre', 'Retirar hojas y frutos afectados', 'Rotación de cultivos durante 3-4 años', 'Tutorar los tomates para mejorar la aireación'],
        ar: ['مبيد فطري على أساس المانكوزيب أو النحاس', 'إزالة الأوراق والثمار المصابة', 'تناوب المحاصيل لمدة 3-4 سنوات', 'دعم نباتات الطماطم بأوتاد لتحسين التهوية'],
      },
      prevention: {
        fr: "Rotation des cultures, irrigation goutte-à-goutte, variétés résistantes.",
        en: 'Crop rotation, drip irrigation, resistant varieties.',
        zh: '轮作，滴灌，选用抗病品种。',
        es: 'Rotación de cultivos, riego por goteo, variedades resistentes.',
        ar: 'تناوب المحاصيل، الري بالتنقيط، أصناف مقاومة.',
      },
    },
    {
      id: 'aphids', pathogen: 'Insectes (Aphididae)',
      plants: ['rose', 'bean', 'lettuce', 'apple', 'tomato', 'zucchini', 'pepper', 'basil'], severity: 'medium',
      names: { fr: 'Pucerons', en: 'Aphids', zh: '蚜虫', es: 'Pulgones', ar: 'حشرة المن' },
      keywords: {
        fr: ['collant', 'miellat', 'puceron', 'insecte', 'enroulé', 'crispe', 'vert', 'noir', 'petits'],
        en: ['sticky', 'honeydew', 'aphid', 'insect', 'curled', 'small', 'green', 'black', 'colony'],
        zh: ['粘', '蜜露', '蚜', '昆虫', '卷叶', '小虫', '绿', '黑', '群落'],
        es: ['pegajoso', 'melaza', 'pulgón', 'insecto', 'enrollado', 'pequeños', 'verde', 'negro'],
        ar: ['لزج', 'ندوة عسلية', 'من', 'حشرة', 'ملتوية', 'صغيرة', 'أخضر', 'أسود'],
      },
      descriptions: {
        fr: "Petits insectes colonisant les nouvelles pousses et le dessous des feuilles. Ils sécrètent un miellat collant propice à la fumagine.",
        en: 'Small insects colonising new shoots and leaf undersides, secreting sticky honeydew that promotes sooty mould.',
        zh: '蚜虫是小型昆虫，聚集在新梢和叶背，分泌粘性蜜露，促进烟煤病发生。',
        es: 'Pequeños insectos que colonizan los brotes nuevos y el envés de las hojas, secretando un melado pegajoso que favorece la fumagina.',
        ar: 'حشرات صغيرة تستعمر البراعم الجديدة والجانب السفلي للأوراق، تفرز ندوة عسلية لزجة تشجع على نمو العفن الأسود.',
      },
      treatments: {
        fr: ["Savon noir dilué en pulvérisation (2 c. à soupe/litre)", "Pyréthrine végétale si infestation forte", "Favoriser les prédateurs naturels (coccinelles, chrysopes)", "Jet d'eau puissant pour les déloger mécaniquement"],
        en: ['Black soap spray diluted (2 tbsp/liter)', 'Plant-based pyrethrin for heavy infestations', 'Encourage natural predators (ladybirds, lacewings)', 'Strong water jet to dislodge mechanically'],
        zh: ['喷施稀释黑皂液（2汤匙/升）', '严重侵染时使用植物源除虫菊', '引入天敌（瓢虫、草蛉）', '用强水流机械冲洗蚜虫'],
        es: ['Pulverización con jabón negro diluido (2 cucharadas/litro)', 'Piretrina vegetal para infestaciones graves', 'Favorecer depredadores naturales (mariquitas, crisopas)', 'Chorro de agua fuerte para eliminarlos mecánicamente'],
        ar: ['رش صابون أسود مخفف (2 ملعقة كبيرة/لتر)', 'بيريثرين نباتي للإصابات الشديدة', 'تشجيع الحشرات المفيدة (أبو العيد، أسد المن)', 'رش بالماء بضغط قوي للتخلص منها ميكانيكيًا'],
      },
      prevention: {
        fr: "Plantation d'œillets d'Inde repoussants, éviter les excès d'azote, surveiller régulièrement.",
        en: 'Plant marigolds to repel aphids, avoid nitrogen excess, monitor regularly.',
        zh: '种植万寿菊驱虫，避免氮肥过量，定期检查。',
        es: 'Plantar caléndulas repelentes, evitar exceso de nitrógeno, vigilar regularmente.',
        ar: 'زراعة القطيفة طاردة للحشرات، تجنب الإفراط في النيتروجين، المراقبة المنتظمة.',
      },
    },
    {
      id: 'nitrogen', pathogen: 'Carence nutritive (non-pathogène)',
      plants: ['tomato', 'corn', 'lettuce', 'wheat', 'zucchini', 'pepper'], severity: 'low',
      names: { fr: "Carence en azote", en: 'Nitrogen Deficiency', zh: '缺氮', es: 'Deficiencia de nitrógeno', ar: 'نقص النيتروجين' },
      keywords: {
        fr: ['jaun', 'pâle', 'chétif', 'lent', 'croissance', 'azote', 'engrais'],
        en: ['yellow', 'pale', 'stunted', 'slow', 'growth', 'nitrogen', 'fertilizer', 'thin'],
        zh: ['黄', '苍白', '矮小', '缓慢', '生长', '缺氮', '氮肥'],
        es: ['amarill', 'pálido', 'raquítico', 'lento', 'crecimiento', 'nitrógeno', 'abono'],
        ar: ['اصفرار', 'شاحب', 'ضامر', 'بطيء', 'نمو', 'نيتروجين', 'سماد'],
      },
      descriptions: {
        fr: "Jaunissement général des feuilles commençant par les plus vieilles. La plante présente un aspect chétif avec une croissance très ralentie.",
        en: 'General yellowing of leaves starting from the oldest. Plant looks pale and stunted with very slow growth.',
        zh: '从老叶开始的全面叶片变黄现象，植株矮小发白，生长极为缓慢。',
        es: 'Amarillamiento generalizado de las hojas, comenzando por las más viejas. La planta tiene aspecto pálido y raquítico.',
        ar: 'اصفرار عام للأوراق يبدأ من الأقدم. تبدو النبتة شاحبة وضامرة مع نمو بطيء جدًا.',
      },
      treatments: {
        fr: ["Apport d'engrais azoté (orties fermentées, corne broyée)", "Purin d'ortie concentré dilué à 10%", "Engrais soluble à libération rapide en urgence"],
        en: ['Apply nitrogen fertiliser (fermented nettles, horn shavings)', 'Nettle manure diluted to 10%', 'Fast-release soluble fertiliser in emergency'],
        zh: ['施用含氮肥料（发酵荨麻肥、角质肥）', '稀释10%的荨麻肥液', '紧急情况下施用速效水溶肥'],
        es: ['Aplicar fertilizante nitrogenado (ortigas fermentadas, cuerno triturado)', 'Purín de ortigas diluido al 10%', 'Fertilizante soluble de liberación rápida en casos urgentes'],
        ar: ['إضافة سماد نيتروجيني (شبة اللقاء المتخمر، مسحوق القرن)', 'سماد القراص المخفف 10%', 'سماد سريع الإذابة في الحالات العاجلة'],
      },
      prevention: {
        fr: "Apport régulier de compost mature, rotation des cultures avec des légumineuses.",
        en: 'Regular compost applications, crop rotation with legumes.',
        zh: '定期施用堆肥，与豆科植物轮作。',
        es: 'Aportaciones regulares de compost, rotación con leguminosas.',
        ar: 'إضافة سماد عضوي بانتظام، التناوب مع البقوليات.',
      },
    },
    {
      id: 'caterpillar', pathogen: 'Insectes (Lépidoptères, Coléoptères)',
      plants: ['tomato', 'corn', 'apple', 'lettuce', 'carrot'], severity: 'medium',
      names: { fr: 'Chenilles / larves', en: 'Caterpillars', zh: '毛虫/幼虫', es: 'Orugas', ar: 'اليرقات' },
      keywords: {
        fr: ['trou', 'rongé', 'mangé', 'percé', 'chenille', 'larve', 'insecte'],
        en: ['hole', 'chewed', 'eaten', 'caterpillar', 'larva', 'insect', 'damage', 'bored'],
        zh: ['孔', '啃', '食', '毛虫', '幼虫', '昆虫', '蛀', '钻孔'],
        es: ['agujero', 'roído', 'comido', 'oruga', 'larva', 'insecto', 'daño'],
        ar: ['ثقب', 'مقرود', 'مأكول', 'يرقة', 'حشرة', 'ضرر', 'نخر'],
      },
      descriptions: {
        fr: "Dégâts mécaniques caractéristiques : trous irréguliers dans les feuilles, galeries dans les fruits, déjections visibles.",
        en: 'Characteristic mechanical damage: irregular holes in leaves, galleries in fruit, visible droppings.',
        zh: '机械性损伤：叶片上出现不规则孔洞，果实内部有蛀道，可见虫粪。',
        es: 'Daños mecánicos característicos: agujeros irregulares en hojas, galerías en frutos, excrementos visibles.',
        ar: 'أضرار ميكانيكية مميزة: ثقوب غير منتظمة في الأوراق، أنفاق داخل الثمار، فضلات مرئية.',
      },
      treatments: {
        fr: ["Bacillus thuringiensis (Bt) — biopesticide efficace et sans danger", "Ramassage manuel des chenilles (de préférence le soir)", "Filets de protection anti-insectes", "Décoction de tanaisie ou d'absinthe en répulsif"],
        en: ['Bacillus thuringiensis (Bt) — safe and effective biopesticide', 'Hand-pick caterpillars (preferably in the evening)', 'Insect protection nets', 'Tansy or wormwood decoction as repellent'],
        zh: ['苏云金杆菌（Bt）——安全有效的生物农药', '人工捡除毛虫（最好傍晚进行）', '防虫网覆盖', '艾菊或苦艾煎液作为驱虫剂'],
        es: ['Bacillus thuringiensis (Bt) — biopesticida eficaz y seguro', 'Recogida manual de orugas (preferiblemente por la noche)', 'Mallas de protección anti-insectos', 'Decocción de tanaceto o ajenjo como repelente'],
        ar: ['باسيلوس ثورينجينسيس (Bt) — مبيد حيوي آمن وفعال', 'التقاط اليرقات يدويًا (يفضل مساءً)', 'شباك واقية من الحشرات', 'مغلي نبات العرعر أو الشيح طاردًا للحشرات'],
      },
      prevention: {
        fr: "Filets anti-insectes, contrôle régulier, favoriser les oiseaux insectivores.",
        en: 'Insect nets, regular inspection, encourage insect-eating birds.',
        zh: '防虫网，定期检查，吸引食虫鸟类。',
        es: 'Mallas anti-insectos, control regular, favorecer aves insectívoras.',
        ar: 'شباك الحشرات، الفحص المنتظم، تشجيع الطيور الحشرية.',
      },
    },
    {
      id: 'fusarium', pathogen: 'Fusarium oxysporum',
      plants: ['tomato', 'wheat', 'corn', 'bean', 'strawberry'], severity: 'high',
      names: { fr: 'Fusariose', en: 'Fusarium Wilt', zh: '枯萎病', es: 'Fusariosis', ar: 'مرض الفيوزاريوم' },
      keywords: {
        fr: ['flétr', 'fané', 'vasculaire', 'brun', 'intérieur', 'tige', 'racine', 'fusarium'],
        en: ['wilt', 'droop', 'vascular', 'brown', 'internal', 'stem', 'root', 'fusarium'],
        zh: ['萎', '枯萎', '维管束', '棕', '内部', '茎', '根', '镰刀菌'],
        es: ['marchitar', 'vascular', 'marrón', 'interno', 'tallo', 'raíz', 'fusarium'],
        ar: ['ذبول', 'وعائي', 'بني', 'داخلي', 'ساق', 'جذر', 'فيوزاريوم'],
      },
      descriptions: {
        fr: "Maladie vasculaire : le champignon bouche les vaisseaux conducteurs. La tige coupée montre un brunissement interne caractéristique.",
        en: 'Vascular disease: the fungus blocks conducting vessels. Cut stems show characteristic internal browning.',
        zh: '枯萎病是一种维管束病害：病菌堵塞输导组织。剖开茎部可见特征性的内部褐变。',
        es: 'Enfermedad vascular: el hongo bloquea los vasos conductores. El tallo cortado muestra un pardeamiento interno característico.',
        ar: 'مرض وعائي: الفطر يسد القنوات الموصلة. يُظهر جذع النبتة عند قطعه اسمرارًا داخليًا مميزًا.',
      },
      treatments: {
        fr: ["Retirer et détruire les plantes atteintes — pas de compostage", "Désinfecter les outils entre chaque plant", "Rotation des cultures sur au moins 4-5 ans", "Trichoderma pour traitement biologique du sol"],
        en: ['Remove and destroy affected plants — no composting', 'Disinfect tools between each plant', 'Crop rotation for at least 4-5 years', 'Trichoderma for biological soil treatment'],
        zh: ['清除并销毁病株——禁止堆肥', '每株之间彻底消毒工具', '至少4-5年轮作', '木霉菌（Trichoderma）进行生物土壤处理'],
        es: ['Retirar y destruir las plantas afectadas — sin compostar', 'Desinfectar las herramientas entre cada planta', 'Rotación de cultivos durante al menos 4-5 años', 'Trichoderma para tratamiento biológico del suelo'],
        ar: ['إزالة النباتات المصابة وإتلافها — لا تضعها في السماد', 'تعقيم الأدوات بين كل نبتة', 'تناوب المحاصيل لمدة 4-5 سنوات على الأقل', 'تريكوديرما للمعالجة البيولوجية للتربة'],
      },
      prevention: {
        fr: "Variétés résistantes (F sur l'étiquette pour les tomates), sol bien drainé, rotation stricte.",
        en: 'Resistant varieties (F on label for tomatoes), well-drained soil, strict crop rotation.',
        zh: '抗病品种（番茄标签上标有F的品种），排水良好的土壤，严格轮作。',
        es: 'Variedades resistentes (F en la etiqueta para tomates), suelo bien drenado, rotación estricta.',
        ar: 'أصناف مقاومة (F على علامة الطماطم)، تربة جيدة التصريف، تناوب محاصيل صارم.',
      },
    },
  ];

  // ── État ───────────────────────────────────────────────

  let state      = loadState();
  let currentLang; try { currentLang = localStorage.getItem(LANG_KEY) || 'fr'; } catch { currentLang = 'fr'; }
  let currentView = 'diagnostic';
  let uploadedPhotos = [];

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { garden: [], history: [], ...JSON.parse(raw) } : { garden: [], history: [] };
    } catch { return { garden: [], history: [] }; }
  }
  function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {} }
  function uid()  { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
  function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function fmtDate(s) { if (!s) return ''; const d = new Date(s); return isNaN(d) ? s : d.toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : currentLang === 'zh' ? 'zh-CN' : currentLang === 'es' ? 'es-ES' : currentLang === 'en' ? 'en-GB' : 'fr-FR'); }
  function refreshIcons() { if (window.lucide) window.lucide.createIcons(); }

  // ── i18n helpers ───────────────────────────────────────

  function t(key) {
    const keys = key.split('.');
    let obj = TRANSLATIONS[currentLang] || TRANSLATIONS.fr;
    for (const k of keys) { if (obj == null) break; obj = obj[k]; }
    if (obj == null) { obj = TRANSLATIONS.fr; for (const k of keys) { if (obj == null) break; obj = obj[k]; } }
    return typeof obj === 'string' ? obj : key;
  }

  function plantName(plant)          { return plant.names?.[currentLang] || plant.names?.fr || plant.id; }
  function diseaseName(d)            { return d.names?.[currentLang] || d.names?.fr || d.id; }
  function diseaseDesc(d)            { return d.descriptions?.[currentLang] || d.descriptions?.fr || ''; }
  function diseaseTreatments(d)      { return d.treatments?.[currentLang] || d.treatments?.fr || []; }
  function diseasePrevention(d)      { return d.prevention?.[currentLang] || d.prevention?.fr || ''; }
  function diseaseKeywords(d)        { return d.keywords?.[currentLang] || d.keywords?.fr || []; }

  // ── Changement de langue ───────────────────────────────

  const LANG_LABELS = { fr: '🇫🇷 Français', en: '🇬🇧 English', zh: '🇨🇳 中文', es: '🇪🇸 Español', ar: '🇸🇦 العربية' };

  function showLangToast(lang) {
    const toast = document.getElementById('lang-toast');
    if (!toast) return;
    toast.textContent = LANG_LABELS[lang] || lang;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  function setLang(lang) {
    currentLang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch {}
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('.lang-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.lang === lang)
    );
    applyNavTranslations();
    render();
    showLangToast(lang);
  }

  function applyNavTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key  = el.dataset.i18n;
      const span = el.querySelector('span');
      if (span) span.textContent = t(key);
    });
  }

  // ── Navigation ─────────────────────────────────────────

  function setView(name) {
    currentView    = name;
    uploadedPhotos = [];
    document.querySelectorAll('[data-view]').forEach(el =>
      el.classList.toggle('active', el.dataset.view === name)
    );
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function render() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    ({ diagnostic: renderDiagnostic, garden: renderGarden, guide: renderGuide, history: renderHistory })[currentView]?.(app);
    refreshIcons();
  }

  // ── VUE DIAGNOSTIC ─────────────────────────────────────

  function renderDiagnostic(container) {
    const plantOptions = PLANTS.map(p => `<option value="${p.id}">${p.icon} ${esc(plantName(p))}</option>`).join('');

    container.innerHTML = `
      <div class="view">
        <div class="diag-hero">
          <div class="hero-icon"><i data-lucide="leaf"></i></div>
          <div class="hero-text">
            <h1>${t('hero.title')}</h1>
            <p>${t('hero.subtitle')}</p>
          </div>
        </div>

        <div class="form-card">
          <div class="form-step">
            <div class="step-header">
              <div class="step-num">1</div>
              <div class="step-label"><i data-lucide="sprout"></i> ${t('form.step1')}</div>
            </div>
            <div class="select-wrap">
              <i data-lucide="sprout" class="select-leaf"></i>
              <select id="plant-select" class="plant-select">
                <option value="">${t('form.placeholder1')}</option>
                ${plantOptions}
              </select>
              <i data-lucide="chevron-down" class="select-arrow"></i>
            </div>
          </div>

          <div class="step-divider"></div>

          <div class="form-step">
            <div class="step-header">
              <div class="step-num">2</div>
              <div class="step-label"><i data-lucide="message-square"></i> ${t('form.step2')}</div>
            </div>
            <textarea id="symptom-text" class="symptom-textarea" rows="5"
              placeholder="${t('form.placeholder2')}"></textarea>
          </div>

          <div class="step-divider"></div>

          <div class="form-step">
            <div class="step-header">
              <div class="step-num">3</div>
              <div class="step-label">
                <i data-lucide="camera"></i> ${t('form.step3')}
                <span class="opt">${t('form.optional')}</span>
              </div>
            </div>
            <div class="upload-zone" id="upload-zone">
              <i data-lucide="image-plus"></i>
              <p>${t('form.uploadText')}<br><span class="upload-or">${t('form.uploadOr')}</span></p>
              <button type="button" class="btn-upload" id="upload-btn">
                <i data-lucide="folder-open"></i> ${t('form.uploadBtn')}
              </button>
              <span class="upload-hint">${t('form.uploadHint')}</span>
              <input type="file" id="photo-input" accept="image/*" multiple hidden />
            </div>
            <div id="photo-preview"></div>
          </div>

          <button class="search-btn" id="search-btn">
            <i data-lucide="search"></i>
            <span>${t('form.searchBtn')}</span>
          </button>
        </div>

        <div id="results-section" class="results-section" style="display:none"></div>
      </div>`;

    initDiagnosticEvents();
  }

  function initDiagnosticEvents() {
    const zone  = document.getElementById('upload-zone');
    const input = document.getElementById('photo-input');
    document.getElementById('upload-btn')?.addEventListener('click', e => { e.stopPropagation(); input.click(); });
    zone?.addEventListener('click', () => input.click());
    input?.addEventListener('change', e => { handleFiles(Array.from(e.target.files)); input.value = ''; });
    zone?.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone?.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone?.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('drag-over'); handleFiles(Array.from(e.dataTransfer.files)); });
    document.getElementById('search-btn')?.addEventListener('click', runDiagnostic);
  }

  // ── Gestion des photos ─────────────────────────────────

  function handleFiles(files) {
    const images = files.filter(f => f.type.startsWith('image/'));
    images.slice(0, 5 - uploadedPhotos.length).forEach(file => {
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
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      cb(c.toDataURL('image/jpeg', 0.75));
    };
    img.src = src;
  }

  function renderPhotoPreview() {
    const preview = document.getElementById('photo-preview');
    if (!preview) return;
    if (!uploadedPhotos.length) { preview.innerHTML = ''; return; }
    preview.innerHTML = `<div class="photo-grid">${uploadedPhotos.map((p, i) => `
      <div class="photo-thumb">
        <img src="${p.dataUrl}" alt="${esc(p.name)}" />
        <button class="photo-del" data-idx="${i}"><i data-lucide="x"></i></button>
      </div>`).join('')}</div>`;
    preview.querySelectorAll('.photo-del').forEach(btn =>
      btn.addEventListener('click', e => { e.stopPropagation(); uploadedPhotos.splice(Number(btn.dataset.idx), 1); renderPhotoPreview(); })
    );
    refreshIcons();
  }

  // ── Moteur de diagnostic ───────────────────────────────

  function runDiagnostic() {
    const plantId = document.getElementById('plant-select')?.value;
    const text    = document.getElementById('symptom-text')?.value.trim();
    if (!plantId) { document.getElementById('plant-select')?.classList.add('shake'); showNotice(t('notices.selectPlant')); return; }
    if (!text || text.length < 5) { document.getElementById('symptom-text')?.classList.add('shake'); showNotice(t('notices.describeSymptoms')); return; }

    const btn = document.getElementById('search-btn');
    btn.classList.add('loading'); btn.disabled = true;

    setTimeout(() => {
      const plant   = PLANTS.find(p => p.id === plantId);
      const results = scoreDiseases(plantId, text);
      state.history.unshift({
        id: uid(), date: new Date().toISOString(),
        plant: plantName(plant), plantIcon: plant?.icon || '🌱', plantId,
        text, photos: uploadedPhotos.length,
        results: results.slice(0, 3).map(r => r.id),
        lang: currentLang,
      });
      save();
      btn.classList.remove('loading'); btn.disabled = false;
      displayResults(results, plant);
    }, 900);
  }

  function scoreDiseases(plantId, text) {
    const lower = text.toLowerCase();
    return DISEASES.map(disease => {
      let score = 0;
      if (plantId && disease.plants.includes(plantId)) score += 22;
      const kws = diseaseKeywords(disease);
      const matchCount = kws.filter(kw => lower.includes(kw)).length;
      score += matchCount * 10;
      if (kws.length > 0) score += Math.round((matchCount / kws.length) * 15);
      return { ...disease, score, matchCount };
    }).filter(d => d.score > 8).sort((a, b) => b.score - a.score);
  }

  function displayResults(results, plant) {
    const section = document.getElementById('results-section');
    section.style.display = 'flex';
    if (!results.length) {
      section.innerHTML = `<div class="result-empty"><i data-lucide="help-circle"></i><h3>${t('results.noResult')}</h3><p>${t('results.noResultDesc')}</p></div>`;
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      refreshIcons();
      return;
    }
    const top = results.slice(0, 3);
    const countLabel = top.length === 1 ? t('results.identified') : t('results.identifiedPlural');
    const photoNote  = uploadedPhotos.length === 1 ? t('results.photosNote') : t('results.photosNotePlural');
    section.innerHTML = `
      <div class="result-header-card">
        <div class="result-header-icon"><i data-lucide="clipboard-check"></i></div>
        <div>
          <h2>${t('results.title')}</h2>
          <p>${top.length} ${countLabel} ${t('results.for')} <strong>${esc(plantName(plant))}</strong></p>
          ${uploadedPhotos.length ? `<div class="photo-count-badge"><i data-lucide="camera"></i> ${uploadedPhotos.length} ${photoNote}</div>` : ''}
        </div>
      </div>
      ${top.map((d, i) => buildDiseaseCard(d, i, plant)).join('')}
      <div class="result-footer"><i data-lucide="info"></i>${t('results.disclaimer')}</div>`;
    section.querySelectorAll('.add-to-garden-btn').forEach(btn =>
      btn.addEventListener('click', () => openGardenModal(null, btn.dataset.plant, btn.dataset.disease))
    );
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    refreshIcons();
  }

  function buildDiseaseCard(d, rank, plant) {
    const SEV = {
      high:   { cls: 'sev-high', icon: 'alert-triangle' },
      medium: { cls: 'sev-med',  icon: 'alert-circle' },
      low:    { cls: 'sev-low',  icon: 'info' },
    };
    const sev        = SEV[d.severity] || SEV.low;
    const confidence = Math.min(100, Math.round((d.score / 65) * 100));
    const hyp        = t('results.hypothesis').split ? (TRANSLATIONS[currentLang]?.results?.hypothesis?.[rank] || `${rank + 1}.`) : `${rank + 1}.`;
    return `
      <div class="disease-card ${rank === 0 ? 'disease-card-top' : ''} ${sev.cls}">
        <div class="disease-card-header">
          <div class="disease-rank-badge">${hyp}</div>
          <div class="sev-badge ${sev.cls}"><i data-lucide="${sev.icon}"></i> ${t('severity.' + d.severity)}</div>
        </div>
        <h3 class="disease-title">${esc(diseaseName(d))}</h3>
        <p class="disease-pathogen"><i data-lucide="microscope"></i> ${esc(d.pathogen)}</p>
        <div class="confidence-row">
          <span class="confidence-lbl">${t('results.matchScore')}</span>
          <div class="confidence-bar"><div class="confidence-fill" style="width:${confidence}%"></div></div>
          <span class="confidence-val">${confidence}%</span>
        </div>
        <p class="disease-desc">${esc(diseaseDesc(d))}</p>
        <div class="disease-section">
          <h4 class="section-title"><i data-lucide="pill"></i> ${t('results.treatments')}</h4>
          <ol class="treatment-list">${diseaseTreatments(d).map(tr => `<li>${esc(tr)}</li>`).join('')}</ol>
        </div>
        <div class="disease-section prevention-box">
          <h4 class="section-title"><i data-lucide="shield-check"></i> ${t('results.prevention')}</h4>
          <p>${esc(diseasePrevention(d))}</p>
        </div>
        <div class="disease-card-footer">
          <button class="add-to-garden-btn" data-plant="${plant?.id || ''}" data-disease="${d.id}">
            <i data-lucide="plus-circle"></i> ${t('results.addGarden')}
          </button>
        </div>
      </div>`;
  }

  function showNotice(msg) {
    document.querySelector('.notice')?.remove();
    const el = document.createElement('div');
    el.className = 'notice';
    el.innerHTML = `<i data-lucide="alert-circle"></i> ${msg}`;
    document.querySelector('.form-card')?.before(el);
    refreshIcons();
    setTimeout(() => el.remove(), 3500);
  }

  // ── VUE MON JARDIN ─────────────────────────────────────

  function renderGarden(container) {
    container.innerHTML = `
      <div class="view">
        <div class="view-header">
          <div class="view-title"><i data-lucide="sprout"></i><h2>${t('garden.title')}</h2></div>
          <button class="btn-primary" id="add-plant-btn"><i data-lucide="plus"></i> ${t('garden.addBtn')}</button>
        </div>
        <div class="garden-grid" id="garden-grid"></div>
      </div>`;
    renderGardenCards();
    document.getElementById('add-plant-btn').addEventListener('click', () => openGardenModal());
    refreshIcons();
  }

  function renderGardenCards() {
    const grid = document.getElementById('garden-grid');
    if (!grid) return;
    if (!state.garden.length) {
      grid.innerHTML = `<div class="empty-state"><i data-lucide="sprout"></i><h3>${t('garden.emptyTitle')}</h3><p>${t('garden.emptyDesc')}</p><button class="btn-primary" id="add-first"><i data-lucide="plus"></i> ${t('garden.addFirst')}</button></div>`;
      document.getElementById('add-first')?.addEventListener('click', () => openGardenModal());
      refreshIcons();
      return;
    }
    grid.innerHTML = state.garden.map(p => {
      const meta    = PLANTS.find(pl => pl.id === p.plantId);
      const disease = DISEASES.find(d => d.id === p.diseaseId);
      const stLabel = t('garden.status.' + p.status) || p.status;
      return `
        <div class="garden-card">
          <div class="garden-card-top">
            <span class="garden-emoji">${meta?.icon || '🌱'}</span>
            <div class="garden-info">
              <strong>${esc(p.name)}</strong>
              <span>${esc(meta ? plantName(meta) : p.plantId)}</span>
            </div>
            <div class="garden-card-actions">
              <button class="btn-icon" data-edit="${p.id}"><i data-lucide="pencil"></i></button>
              <button class="btn-icon danger" data-del="${p.id}"><i data-lucide="trash-2"></i></button>
            </div>
          </div>
          ${disease ? `<div class="disease-chip"><i data-lucide="alert-triangle"></i>${esc(diseaseName(disease))}</div>` : ''}
          ${p.notes ? `<p class="garden-notes">${esc(p.notes)}</p>` : ''}
          <div class="garden-meta">
            <span class="status-chip status-${p.status}">${stLabel}</span>
            ${p.since ? `<span class="garden-date">${fmtDate(p.since)}</span>` : ''}
          </div>
        </div>`;
    }).join('');
    grid.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => openGardenModal(b.dataset.edit)));
    grid.querySelectorAll('[data-del]').forEach(b =>
      b.addEventListener('click', () => {
        if (!confirm(t('garden.confirmDel'))) return;
        state.garden = state.garden.filter(p => p.id !== b.dataset.del);
        save(); renderGardenCards(); refreshIcons();
      }));
    refreshIcons();
  }

  function openGardenModal(id, defaultPlantId, defaultDiseaseId) {
    const editing     = id ? state.garden.find(p => p.id === id) : null;
    const plantOpts   = PLANTS.map(p => ({ value: p.id, label: `${p.icon} ${plantName(p)}` }));
    const diseaseOpts = DISEASES.map(d => ({ value: d.id, label: diseaseName(d) }));
    const statusOpts  = ['sick', 'treated', 'healthy', 'recovered'].map(s => ({ value: s, label: t('garden.status.' + s) }));
    openModal(editing ? t('garden.formEditTitle') : t('garden.formAddTitle'), [
      { name: 'name',      label: t('garden.fieldName'),    required: true, default: editing?.name || '' },
      { name: 'plantId',   label: t('garden.fieldSpecies'), required: true, type: 'select', options: plantOpts,    default: editing?.plantId   || defaultPlantId   || '' },
      { name: 'diseaseId', label: t('garden.fieldDisease'),                 type: 'select', options: diseaseOpts,  default: editing?.diseaseId || defaultDiseaseId || '' },
      { name: 'status',    label: t('garden.fieldStatus'),  required: true, type: 'select', options: statusOpts,   default: editing?.status    || 'sick' },
      { name: 'since',     label: t('garden.fieldSince'),                   type: 'date',                          default: editing?.since     || new Date().toISOString().slice(0, 10) },
      { name: 'notes',     label: t('garden.fieldNotes'),                   type: 'textarea',                      default: editing?.notes     || '' },
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
          <div class="view-title"><i data-lucide="book-open"></i><h2>${t('guide.title')}</h2></div>
        </div>
        <div class="guide-search">
          <i data-lucide="search" class="guide-search-icon"></i>
          <input class="guide-search-input" id="guide-input" placeholder="${t('guide.searchPlaceholder')}" />
        </div>
        <div class="guide-grid" id="guide-grid"></div>
      </div>`;
    const render = term => {
      const q = term.toLowerCase();
      const filtered = DISEASES.filter(d =>
        !q || diseaseName(d).toLowerCase().includes(q) || d.pathogen.toLowerCase().includes(q) ||
        d.plants.some(pid => PLANTS.find(p => p.id === pid)?.names?.[currentLang]?.toLowerCase().includes(q) || PLANTS.find(p => p.id === pid)?.names?.fr?.toLowerCase().includes(q))
      );
      const grid = document.getElementById('guide-grid');
      if (!filtered.length) { grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i data-lucide="search-x"></i><p>${t('guide.noResult')}</p></div>`; refreshIcons(); return; }
      const SEV = { high: 'sev-high', medium: 'sev-med', low: 'sev-low' };
      grid.innerHTML = filtered.map(d => {
        const plantLabels = d.plants.map(pid => { const pl = PLANTS.find(p => p.id === pid); return pl ? plantName(pl) : pid; });
        return `
          <div class="guide-card">
            <div class="guide-card-header">
              <h3>${esc(diseaseName(d))}</h3>
              <span class="sev-badge ${SEV[d.severity] || ''}">${t('severity.' + d.severity)}</span>
            </div>
            <p class="guide-pathogen"><i data-lucide="microscope"></i> ${esc(d.pathogen)}</p>
            <p class="guide-desc">${esc(diseaseDesc(d))}</p>
            <div class="plant-chips">${plantLabels.map(l => `<span class="plant-chip">${esc(l)}</span>`).join('')}</div>
            <details class="guide-details">
              <summary>${t('guide.treatmentsTitle')}</summary>
              <ul>${diseaseTreatments(d).map(tr => `<li>${esc(tr)}</li>`).join('')}</ul>
              <p class="prevention-note"><strong>${t('guide.preventionLabel')}</strong> ${esc(diseasePrevention(d))}</p>
            </details>
          </div>`;
      }).join('');
      refreshIcons();
    };
    refreshIcons();
    render('');
    document.getElementById('guide-input')?.addEventListener('input', e => render(e.target.value));
  }

  // ── VUE HISTORIQUE ─────────────────────────────────────

  function renderHistory(container) {
    container.innerHTML = `
      <div class="view">
        <div class="view-header">
          <div class="view-title"><i data-lucide="clock"></i><h2>${t('history.title')}</h2></div>
          <button class="btn-danger" id="clear-all"><i data-lucide="trash-2"></i> ${t('history.clearBtn')}</button>
        </div>
        <div class="history-list" id="history-list"></div>
      </div>`;
    document.getElementById('clear-all')?.addEventListener('click', () => {
      if (!confirm(t('history.clearConfirm'))) return;
      state.history = []; save(); renderHistoryList();
    });
    renderHistoryList();
    refreshIcons();
  }

  function renderHistoryList() {
    const list = document.getElementById('history-list');
    if (!list) return;
    if (!state.history.length) {
      list.innerHTML = `<div class="empty-state"><i data-lucide="clock"></i><h3>${t('history.emptyTitle')}</h3><p>${t('history.emptyDesc')}</p></div>`;
      refreshIcons(); return;
    }
    list.innerHTML = state.history.map(e => {
      const diseaseNames = (e.results || []).map(id => { const d = DISEASES.find(x => x.id === id); return d ? diseaseName(d) : id; });
      const photoLabel   = e.photos === 1 ? t('history.photos') : t('history.photosPlural');
      return `
        <div class="history-card">
          <div class="history-card-top">
            <div class="history-plant-label"><span class="history-plant-emoji">${e.plantIcon || '🌱'}</span>${esc(e.plant)}</div>
            <span class="history-date">${fmtDate(e.date)}</span>
          </div>
          ${e.text ? `<p class="history-symptom-text">"${esc(e.text.slice(0, 120))}${e.text.length > 120 ? '…' : ''}"</p>` : ''}
          ${diseaseNames.length ? `<div class="history-results"><strong>${t('history.hypotheses')}</strong>${diseaseNames.map(n => `<span class="disease-tag">${esc(n)}</span>`).join('')}</div>` : ''}
          ${e.photos ? `<div class="photos-badge"><i data-lucide="camera"></i>${e.photos} ${photoLabel}</div>` : ''}
          <button class="btn-del-history" data-id="${e.id}"><i data-lucide="trash-2"></i> ${t('history.deleteBtn')}</button>
        </div>`;
    }).join('');
    list.querySelectorAll('.btn-del-history').forEach(b =>
      b.addEventListener('click', () => { state.history = state.history.filter(e => e.id !== b.dataset.id); save(); renderHistoryList(); refreshIcons(); })
    );
    refreshIcons();
  }

  // ── Modal générique ────────────────────────────────────

  const modal = document.getElementById('modal');
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
        el = document.createElement('select'); el.id = `mf-${f.name}`; el.name = f.name;
        if (!f.required) el.appendChild(new Option(t('modal.noneOption'), ''));
        (f.options || []).forEach(o => { const opt = new Option(o.label, o.value); if (String(f.default ?? '') === String(o.value)) opt.selected = true; el.appendChild(opt); });
      } else if (f.type === 'textarea') {
        el = document.createElement('textarea'); el.id = `mf-${f.name}`; el.name = f.name; el.value = f.default ?? '';
      } else {
        el = document.createElement('input'); el.id = `mf-${f.name}`; el.name = f.name; el.type = f.type || 'text'; el.value = f.default ?? '';
      }
      if (f.required) el.required = true;
      wrap.appendChild(el);
      modalForm.appendChild(wrap);
    });
    const actions = document.createElement('div');
    actions.className = 'modal-actions';
    actions.innerHTML = `<button type="button" class="btn-secondary" id="cancel-modal">${t('modal.cancel')}</button><button type="submit" class="btn-primary"><i data-lucide="save"></i> ${t('modal.save')}</button>`;
    modalForm.appendChild(actions);
    document.getElementById('cancel-modal')?.addEventListener('click', closeModal);
    modalForm.onsubmit = e => {
      e.preventDefault();
      const data = {};
      fields.forEach(f => { const el = modalForm.elements[f.name]; if (el) data[f.name] = el.value; });
      onSubmit(data); closeModal();
    };
    modal.hidden = false;
    refreshIcons();
    setTimeout(() => modalForm.querySelector('input,select,textarea')?.focus(), 30);
  }

  function closeModal() { modal.hidden = true; modalForm.innerHTML = ''; }

  // ── Import / Export ────────────────────────────────────

  document.getElementById('export-btn')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    Object.assign(document.createElement('a'), { href: url, download: `agroassistant-${new Date().toISOString().slice(0, 10)}.json` }).click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('import-file')?.addEventListener('change', e => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!confirm(t('notices.replaceData'))) return;
        state = { garden: [], history: [], ...parsed }; save(); render();
      } catch (err) { alert(t('notices.invalidFile') + err.message); }
    };
    reader.readAsText(file); e.target.value = '';
  });

  // ── Sélecteur de langue ────────────────────────────────

  document.querySelectorAll('.lang-btn').forEach(btn =>
    btn.addEventListener('click', () => setLang(btn.dataset.lang))
  );

  // ── Init ───────────────────────────────────────────────

  document.querySelectorAll('[data-view]').forEach(btn =>
    btn.addEventListener('click', () => setView(btn.dataset.view))
  );

  setLang(currentLang);
  setView('diagnostic');
})();
