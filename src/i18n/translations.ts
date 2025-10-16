export type Language = 'en' | 'bg';

export const translations = {
  en: {
    // Common
    back: 'Back',
    next: 'Next',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Navigation
    myProjects: 'My Projects',
    simple: 'Simple',
    advanced: 'Advanced',
    howItWorks: 'How it works',
    
    // Top Bar & Help
    helpDialogTitle: 'How EstateVisio Studio Works',
    simpleFlowTitle: '📸 Simple Flow',
    simpleFlowDescription: 'Upload photos → Auto-process → Receive your montage video',
    advancedFlowTitle: '🎬 Advanced Flow',
    advancedFlowStep1: 'Upload your real-estate photos (max 10)',
    advancedFlowStep2: 'Analyze quality grades and object insights',
    advancedFlowStep3: 'Generate individual clips with custom regeneration',
    advancedFlowStep4: 'Choose cinematic transition presets',
    advancedFlowStep5: 'Create final montage with professional polish',
    demoModeTitle: 'Demo mode:',
    demoModeDescription: 'All processing is simulated with realistic delays. No real backend required.',
    
    // Projects Page
    projectsTitle: 'My Projects',
    projectsSubtitle: 'Create and manage your real estate video projects',
    newProject: 'New Project',
    createFirstProject: 'Create Your First Project',
    noProjectsTitle: 'No projects yet',
    noProjectsDescription: 'Get started by creating your first real estate video project',
    photos: 'photos',
    created: 'Created',
    updated: 'Updated',
    
    // Create Project Dialog
    newProjectTitle: 'New Project',
    newProjectSubtitle: 'Name your project and add a short note.',
    projectNameLabel: 'Project Name',
    projectDescriptionLabel: 'Description (optional)',
    projectNamePlaceholder: 'e.g., Downtown Loft Walkthrough',
    projectDescriptionPlaceholder: 'Optional notes for this project…',
    createProject: 'Create Project',
    creating: 'Creating…',
    enterProjectName: 'Enter a project name',
    projectNameRequired: 'Please enter a project name.',
    projectNameLength: 'Please enter a project name (2–80 characters).',
    projectNameInvalid: 'Only letters, numbers, spaces, dashes, and underscores allowed.',
    projectCreated: 'Project created',
    projectCreatedDesc: 'Project created',
    
    // Simple Flow
    simpleFlowPageTitle: 'Simple Flow',
    simpleFlowPageDescription: 'Upload your photos and let us create a beautiful video montage automatically',
    createVideo: 'Create Video',
    creatingMontage: 'Creating your montage',
    creatingDescription: "We're taking a closer look at lighting and framing…",
    montageReady: 'Your montage is ready! 🎬',
    previewVideo: 'Preview your video below',
    downloadVideo: 'Download Video',
    startOver: 'Start Over',
    tryAdvanced: 'Try Advanced',
    somethingWrong: 'Something went wrong',
    dontWorry: "Don't worry, you can try again",
    tryAgain: 'Try Again',
    
    // Simple Flow - Processing Stages
    analyzingPhotos: 'Analyzing photos…',
    generatingScenes: 'Generating scenes…',
    stitchingPreview: 'Stitching preview…',
    
    // Simple Flow - Toasts
    noPhotos: 'No photos',
    uploadAtLeastOne: 'Please upload at least one photo to continue.',
    videoReady: 'Video ready!',
    montageCreated: 'Your montage has been created successfully.',
    processingFailed: 'Processing failed',
    downloadStarted: 'Download started',
    videoDownloading: 'Your video is being downloaded.',
    
    // Advanced Flow - Steps
    stepUpload: 'Upload',
    stepUploadDesc: 'Add photos',
    stepAnalyze: 'Analyze',
    stepAnalyzeDesc: 'Quality check',
    stepClips: 'Clips',
    stepClipsDesc: 'Generate scenes',
    stepTransitions: 'Transitions',
    stepTransitionsDesc: 'Choose style',
    stepMontage: 'Montage',
    stepMontageDesc: 'Final video',
    
    // Advanced Flow - Upload
    uploadPhotosTitle: 'Upload Photos',
    uploadPhotosDescription: 'Add up to 10 real-estate photos to begin',
    analyzePhotos: 'Analyze Photos',
    
    // Advanced Flow - Analyze
    qualityAnalysisTitle: 'Quality Analysis',
    qualityAnalysisDescription: 'Review grades and filter by detected objects',
    generateClips: 'Generate Clips',
    
    // Advanced Flow - Clips
    generatedClipsTitle: 'Generated Clips',
    generatedClipsDescription: 'Review, regenerate, and arrange your clips',
    chooseTransitions: 'Choose Transitions',
    
    // Advanced Flow - Transitions
    transitionStyleTitle: 'Transition Style',
    transitionStyleDescription: 'Select how clips flow into each other',
    createFinalMontage: 'Create Final Montage',
    
    // Advanced Flow - Montage
    montageCompleteTitle: 'Your montage is ready! 🎬',
    montageCompleteDescription: 'Professional video created with',
    editTransitions: 'Edit Transitions',
    restartFlow: 'Restart Flow',
    
    // Advanced Flow - Processing
    sequencingClips: 'Sequencing clips…',
    applyingTransitions: 'Applying transitions…',
    colorUnification: 'Color unification…',
    masteringAudio: 'Mastering audio…',
    applyingTransitionsDescription: 'transitions…',
    
    // Advanced Flow - Transitions Presets
    cinematicDissolve: 'Cinematic Dissolve',
    cinematicDissolveDesc: 'Smooth crossfade with subtle motion blur, perfect for luxury estates.',
    cutMotionBlur: 'Cut + Motion Blur',
    cutMotionBlurDesc: 'Dynamic cuts with directional blur for modern, energetic pacing.',
    wipeMinimal: 'Wipe (Minimal)',
    wipeMinimalDesc: 'Clean geometric wipes with minimal distraction from the imagery.',
    parallaxSlide: 'Parallax Slide',
    parallaxSlideDesc: 'Layered sliding effect creating depth and dimension between scenes.',
    softFadeGold: 'Soft Fade + Gold Overlay',
    softFadeGoldDesc: 'Elegant fade with subtle gold tint for premium, warm transitions.',
    
    // Advanced Flow - Toasts
    analysisComplete: 'Analysis complete',
    photosAnalyzed: 'photos analyzed successfully.',
    analysisFailed: 'Analysis failed',
    clipsGenerated: 'Clips generated',
    clipsCreated: 'clips created successfully.',
    generationFailed: 'Generation failed',
    clipRegenerated: 'Clip regenerated',
    clipUpdated: 'Your clip has been updated.',
    regenerationFailed: 'Regeneration failed',
    noTransitionSelected: 'No transition selected',
    selectTransition: 'Please select a transition preset.',
    montageComplete: 'Montage complete!',
    videoReadyView: 'Your video is ready to view.',
    montageFailed: 'Montage failed',
    
    // Photo Uploader
    dragDropPhotos: 'Drag & drop photos here',
    orClickBrowse: 'or click to browse',
    maxPhotos: 'Maximum 10 photos',
    jpgPngWebp: 'JPG, PNG, or WEBP',
    
    // Footer
    builtWith: 'Built with',
    and: 'and',
    
    // User Menu
    account: 'Account',
    viewProfile: 'View Profile',
    settings: 'Settings',
    billing: 'Billing',
    signOut: 'Sign out',
    confirmSignOut: 'Are you sure you want to log out?',
    
    // 404 Page
    pageNotFound: 'Page Not Found',
    pageNotFoundDescription: 'The page you are looking for does not exist.',
    goHome: 'Go Home',
  },
  bg: {
    // Common
    back: 'Назад',
    next: 'Напред',
    cancel: 'Отказ',
    save: 'Запази',
    delete: 'Изтрий',
    edit: 'Редактирай',
    loading: 'Зареждане...',
    error: 'Грешка',
    success: 'Успех',
    
    // Navigation
    myProjects: 'Моите проекти',
    simple: 'Опростен',
    advanced: 'Разширен',
    howItWorks: 'Как работи',
    
    // Top Bar & Help
    helpDialogTitle: 'Как работи EstateVisio Studio',
    simpleFlowTitle: '📸 Опростен режим',
    simpleFlowDescription: 'Качете снимки → Автоматична обработка → Получете видео монтаж',
    advancedFlowTitle: '🎬 Разширен режим',
    advancedFlowStep1: 'Качете вашите снимки на имоти (максимум 10)',
    advancedFlowStep2: 'Анализирайте качеството и разпознатите обекти',
    advancedFlowStep3: 'Генерирайте клипове с персонализирана регенерация',
    advancedFlowStep4: 'Изберете стил на преходи',
    advancedFlowStep5: 'Създайте финалния монтаж с професионална полировка',
    demoModeTitle: 'Демо режим:',
    demoModeDescription: 'Всички процеси са симулирани с реалистични забавяния. Не е необходим реален бекенд.',
    
    // Projects Page
    projectsTitle: 'Моите проекти',
    projectsSubtitle: 'Създавайте и управлявайте вашите видео проекти за недвижими имоти',
    newProject: 'Нов проект',
    createFirstProject: 'Създайте първия си проект',
    noProjectsTitle: 'Все още няма проекти',
    noProjectsDescription: 'Започнете като създадете първия си видео проект за недвижими имоти',
    photos: 'снимки',
    created: 'Създаден',
    updated: 'Обновен',
    
    // Create Project Dialog
    newProjectTitle: 'Нов проект',
    newProjectSubtitle: 'Въведете име и кратко описание.',
    projectNameLabel: 'Име на проекта',
    projectDescriptionLabel: 'Описание (незадължително)',
    projectNamePlaceholder: 'напр. Тур на градско жилище',
    projectDescriptionPlaceholder: 'Незадължителни бележки за този проект…',
    createProject: 'Създай проект',
    creating: 'Създаване…',
    enterProjectName: 'Въведете име на проекта',
    projectNameRequired: 'Моля, въведете име на проекта.',
    projectNameLength: 'Моля, въведете име (2–80 знака).',
    projectNameInvalid: 'Позволени са само букви, цифри, интервали, тирета и долни черти.',
    projectCreated: 'Проектът е създаден',
    projectCreatedDesc: 'Проектът е създаден',
    
    // Simple Flow
    simpleFlowPageTitle: 'Опростен режим',
    simpleFlowPageDescription: 'Качете снимките си и ние ще създадем красив видео монтаж автоматично',
    createVideo: 'Създай видео',
    creatingMontage: 'Създаване на монтаж',
    creatingDescription: 'Вглеждаме се в осветлението и кадрирането...',
    montageReady: 'Вашият монтаж е готов! 🎬',
    previewVideo: 'Прегледайте видеото по-долу',
    downloadVideo: 'Изтегли видео',
    startOver: 'Започни отначало',
    tryAdvanced: 'Опитай разширен режим',
    somethingWrong: 'Нещо се обърка',
    dontWorry: 'Не се притеснявайте, можете да опитате отново',
    tryAgain: 'Опитай отново',
    
    // Simple Flow - Processing Stages
    analyzingPhotos: 'Анализиране на снимки...',
    generatingScenes: 'Генериране на сцени...',
    stitchingPreview: 'Свързване на визуализация...',
    
    // Simple Flow - Toasts
    noPhotos: 'Няма снимки',
    uploadAtLeastOne: 'Моля, качете поне една снимка, за да продължите.',
    videoReady: 'Видеото е готово!',
    montageCreated: 'Вашият монтаж беше създаден успешно.',
    processingFailed: 'Обработката се провали',
    downloadStarted: 'Изтеглянето започна',
    videoDownloading: 'Вашето видео се изтегля.',
    
    // Advanced Flow - Steps
    stepUpload: 'Качване',
    stepUploadDesc: 'Добави снимки',
    stepAnalyze: 'Анализ',
    stepAnalyzeDesc: 'Проверка на качеството',
    stepClips: 'Клипове',
    stepClipsDesc: 'Генериране на сцени',
    stepTransitions: 'Преходи',
    stepTransitionsDesc: 'Избери стил',
    stepMontage: 'Монтаж',
    stepMontageDesc: 'Финално видео',
    
    // Advanced Flow - Upload
    uploadPhotosTitle: 'Качване на снимки',
    uploadPhotosDescription: 'Добавете до 10 снимки на недвижими имоти, за да започнете',
    analyzePhotos: 'Анализирай снимки',
    
    // Advanced Flow - Analyze
    qualityAnalysisTitle: 'Анализ на качеството',
    qualityAnalysisDescription: 'Прегледайте оценките и филтрирайте по разпознати обекти',
    generateClips: 'Генерирай клипове',
    
    // Advanced Flow - Clips
    generatedClipsTitle: 'Генерирани клипове',
    generatedClipsDescription: 'Прегледайте, регенерирайте и подредете клиповете си',
    chooseTransitions: 'Изберете преходи',
    
    // Advanced Flow - Transitions
    transitionStyleTitle: 'Стил на преходите',
    transitionStyleDescription: 'Изберете как клиповете преминават един в друг',
    createFinalMontage: 'Създай финален монтаж',
    
    // Advanced Flow - Montage
    montageCompleteTitle: 'Вашият монтаж е готов! 🎬',
    montageCompleteDescription: 'Професионално видео създадено с',
    editTransitions: 'Редактирай преходи',
    restartFlow: 'Рестартирай процеса',
    
    // Advanced Flow - Processing
    sequencingClips: 'Подреждане на клипове...',
    applyingTransitions: 'Прилагане на преходи...',
    colorUnification: 'Цветно обединяване...',
    masteringAudio: 'Обработка на аудио...',
    applyingTransitionsDescription: 'преходи...',
    
    // Advanced Flow - Transitions Presets
    cinematicDissolve: 'Кинематографско разтваряне',
    cinematicDissolveDesc: 'Плавно кръстосано избледняване със субтилно размиване на движението, перфектно за луксозни имоти.',
    cutMotionBlur: 'Рязко + Размиване на движение',
    cutMotionBlurDesc: 'Динамични преходи с насочено размиване за модерен, енергичен темп.',
    wipeMinimal: 'Изтриване (Минимално)',
    wipeMinimalDesc: 'Чисти геометрични изтривания с минимално разсейване от изображенията.',
    parallaxSlide: 'Паралакс плъзгане',
    parallaxSlideDesc: 'Наслоен плъзгащ ефект, създаващ дълбочина и измерение между сцените.',
    softFadeGold: 'Меко избледняване + Златно наслагване',
    softFadeGoldDesc: 'Елегантно избледняване със субтилен златен оттенък за премиум, топли преходи.',
    
    // Advanced Flow - Toasts
    analysisComplete: 'Анализът завърши',
    photosAnalyzed: 'снимки анализирани успешно.',
    analysisFailed: 'Анализът се провали',
    clipsGenerated: 'Клиповете са генерирани',
    clipsCreated: 'клипа създадени успешно.',
    generationFailed: 'Генерирането се провали',
    clipRegenerated: 'Клипът е регенериран',
    clipUpdated: 'Вашият клип беше актуализиран.',
    regenerationFailed: 'Регенерирането се провали',
    noTransitionSelected: 'Не е избран преход',
    selectTransition: 'Моля, изберете стил на преход.',
    montageComplete: 'Монтажът завърши!',
    videoReadyView: 'Вашето видео е готово за преглед.',
    montageFailed: 'Монтажът се провали',
    
    // Photo Uploader
    dragDropPhotos: 'Плъзнете и пуснете снимки тук',
    orClickBrowse: 'или кликнете, за да прегледате',
    maxPhotos: 'Максимум 10 снимки',
    jpgPngWebp: 'JPG, PNG или WEBP',
    
    // Footer
    builtWith: 'Създадено с',
    and: 'и',
    
    // User Menu
    account: 'Профил',
    viewProfile: 'Виж профила',
    settings: 'Настройки',
    billing: 'Плащания',
    signOut: 'Изход',
    confirmSignOut: 'Сигурни ли сте, че искате да излезете?',
    
    // 404 Page
    pageNotFound: 'Страницата не е намерена',
    pageNotFoundDescription: 'Страницата, която търсите, не съществува.',
    goHome: 'Към началото',
  },
};

export type TranslationKey = keyof typeof translations.en;
