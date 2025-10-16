export type Language = 'en' | 'bg';

export const translations = {
  // Common
  back: { en: 'Back', bg: 'Назад' },
  next: { en: 'Next', bg: 'Напред' },
  cancel: { en: 'Cancel', bg: 'Отказ' },
  save: { en: 'Save', bg: 'Запази' },
  delete: { en: 'Delete', bg: 'Изтрий' },
  edit: { en: 'Edit', bg: 'Редактирай' },
  loading: { en: 'Loading...', bg: 'Зареждане...' },
  error: { en: 'Error', bg: 'Грешка' },
  success: { en: 'Success', bg: 'Успех' },

  // Navigation
  myProjects: { en: 'My Projects', bg: 'Моите проекти' },
  simple: { en: 'Simple', bg: 'Опростен' },
  advanced: { en: 'Advanced', bg: 'Разширен' },
  howItWorks: { en: 'How it works', bg: 'Как работи' },

  // Top Bar & Help
  helpDialogTitle: { en: 'How EstateVisio Studio Works', bg: 'Как работи EstateVisio Studio' },
  simpleFlowTitle: { en: '📸 Simple Flow', bg: '📸 Опростен режим' },
  simpleFlowDescription: {
    en: 'Upload photos → Auto-process → Receive your montage video',
    bg: 'Качете снимки → Автоматична обработка → Получете видео монтаж',
  },
  advancedFlowTitle: { en: '🎬 Advanced Flow', bg: '🎬 Разширен режим' },
  advancedFlowStep1: {
    en: 'Upload your real-estate photos (max 10)',
    bg: 'Качете вашите снимки на имота (максимум 10)',
  },
  advancedFlowStep2: {
    en: 'Analyze quality grades and object insights',
    bg: 'Анализирайте качеството и разпознатите обекти',
  },
  advancedFlowStep3: {
    en: 'Generate scenes',
    bg: 'Създайте сцени',
  },
  advancedFlowStep4: {
    en: 'Choose cinematic transition presets',
    bg: 'Изберете стил на транзиции',
  },
  advancedFlowStep5: {
    en: 'Create final montage',
    bg: 'Създайте финалния монтаж',
  },
  demoModeTitle: { en: 'Demo mode:', bg: 'Демо режим:' },
  demoModeDescription: {
    en: 'All processing is simulated with artificial delays.',
    bg: 'Всички процеси са симулирани с изкуствени забавяния.',
  },

  // Projects Page
  projectsTitle: { en: 'My Projects', bg: 'Моите проекти' },
  projectsSubtitle: {
    en: 'Create and manage your real estate videos',
    bg: 'Създавайте и управлявайте вашите видео проекти.',
  },
  newProject: { en: 'New Project', bg: 'Нов проект' },
  createFirstProject: { en: 'Create Your First Project', bg: 'Създайте първия си проект' },
  noProjectsTitle: { en: 'No projects yet', bg: 'Все още няма проекти' },
  noProjectsDescription: {
    en: 'Get started by creating your first video',
    bg: 'Започнете като създадете първия си видео проект',
  },
  photos: { en: 'photos', bg: 'снимки' },
  created: { en: 'Created', bg: 'Създаден' },
  updated: { en: 'Updated', bg: 'Обновен' },

  // Create Project Dialog
  newProjectTitle: { en: 'New Project', bg: 'Нов проект' },
  newProjectSubtitle: {
    en: 'Name your project and add a short note.',
    bg: 'Въведете име и кратко описание.',
  },
  projectNameLabel: { en: 'Project Name', bg: 'Име на проекта' },
  projectDescriptionLabel: { en: 'Description (optional)', bg: 'Описание (незадължително)' },
  projectNamePlaceholder: { en: 'e.g., Downtown Loft Walkthrough', bg: 'напр. Тур на градско жилище' },
  projectDescriptionPlaceholder: {
    en: 'Optional notes for this project…',
    bg: 'Допълнителни бележки за този проект…',
  },
  createProject: { en: 'Create Project', bg: 'Създай проект' },
  creating: { en: 'Creating…', bg: 'Създаване…' },
  enterProjectName: { en: 'Enter a project name', bg: 'Въведете име на проекта' },
  projectNameRequired: { en: 'Please enter a project name.', bg: 'Моля, въведете име на проекта.' },
  projectNameLength: {
    en: 'Please enter a project name (2–64 characters).',
    bg: 'Моля, въведете име (2–64 знака).',
  },
  projectNameInvalid: {
    en: 'Only letters, numbers, spaces, dashes, and underscores allowed.',
    bg: 'Позволени са само букви, цифри, интервали, тирета и долни черти.',
  },
  projectCreated: { en: 'Project created', bg: 'Проектът е създаден' },
  projectCreatedDesc: { en: 'Project created', bg: 'Проектът е създаден' },

  // Simple Flow
  simpleFlowPageTitle: { en: 'Simple Flow', bg: 'Опростен режим' },
  simpleFlowPageDescription: {
    en: 'Upload your photos and let us create a beautiful video montage automatically',
    bg: 'Качете снимките си и ние ще създадем красив видео монтаж автоматично',
  },
  createVideo: { en: 'Create Video', bg: 'Създай видео' },
  creatingMontage: { en: 'Creating your montage', bg: 'Създаване на монтаж' },
  creatingDescription: {
    en: "We're taking a closer look at lighting and framing…",
    bg: 'Разглеждаме осветлението и кадрите...',
  },
  montageReady: { en: 'Your montage is ready! 🎬', bg: 'Вашият монтаж е готов! 🎬' },
  previewVideo: { en: 'Preview your video below', bg: 'Прегледайте видеото по-долу' },
  downloadVideo: { en: 'Download Video', bg: 'Изтегли видео' },
  startOver: { en: 'Start Over', bg: 'Започни отначало' },
  editVideo: { en: 'Edit Video', bg: 'Редактирай видео' },
  tryAdvanced: { en: 'Try Advanced', bg: 'Опитай разширен режим' },
  somethingWrong: { en: 'Something went wrong', bg: 'Нещо се обърка' },
  dontWorry: { en: "Don't worry, you can try again", bg: 'Не се притеснявайте, можете да опитате отново' },
  tryAgain: { en: 'Try Again', bg: 'Опитай отново' },

  // Simple Flow - Processing Stages
  analyzingPhotos: { en: 'Analyzing photos…', bg: 'Анализиране на снимки...' },
  generatingScenes: { en: 'Generating scenes…', bg: 'Генериране на сцени...' },
  stitchingPreview: { en: 'Stitching preview…', bg: 'Свързване на визуализация...' },

  // Simple Flow - Toasts
  noPhotos: { en: 'No photos', bg: 'Няма снимки' },
  uploadAtLeastOne: {
    en: 'Please upload at least one photo to continue.',
    bg: 'Моля, качете поне една снимка, за да продължите.',
  },
  videoReady: { en: 'Video ready!', bg: 'Видеото е готово!' },
  montageCreated: {
    en: 'Your montage has been created successfully.',
    bg: 'Вашият монтаж беше създаден успешно.',
  },
  processingFailed: { en: 'Processing failed', bg: 'Обработката се провали' },
  downloadStarted: { en: 'Download started', bg: 'Изтеглянето започна' },
  videoDownloading: { en: 'Your video is being downloaded.', bg: 'Вашето видео се изтегля.' },

  // Advanced Flow - Steps
  stepUpload: { en: 'Upload', bg: 'Качване' },
  stepUploadDesc: { en: 'Add photos', bg: 'Добави снимки' },
  stepAnalyze: { en: 'Analyze', bg: 'Анализ' },
  stepAnalyzeDesc: { en: 'Quality check', bg: 'Проверка на качеството' },
  stepClips: { en: 'Clips', bg: 'Клипове' },
  stepClipsDesc: { en: 'Generate scenes', bg: 'Генериране на сцени' },
  stepTransitions: { en: 'Transitions', bg: 'Транзиции' },
  stepTransitionsDesc: { en: 'Choose style', bg: 'Избери стил' },
  stepMontage: { en: 'Montage', bg: 'Монтаж' },
  stepMontageDesc: { en: 'Final video', bg: 'Финално видео' },

  // Advanced Flow - Upload
  uploadPhotosTitle: { en: 'Upload Photos', bg: 'Качване на снимки' },
  uploadPhotosDescription: {
    en: 'Add up to 10 real-estate photos to begin',
    bg: 'Добавете до 10 снимки на недвижими имоти, за да започнете',
  },
  analyzePhotos: { en: 'Analyze Photos', bg: 'Анализирай снимки' },

  // Advanced Flow - Analyze
  qualityAnalysisTitle: { en: 'Quality Analysis', bg: 'Анализ на качеството' },
  qualityAnalysisDescription: {
    en: 'Review grades and filter by detected objects',
    bg: 'Прегледайте оценките и филтрирайте по разпознати обекти',
  },
  generateClips: { en: 'Generate Clips', bg: 'Генерирай клипове' },

  // Advanced Flow - Clips
  generatedClipsTitle: { en: 'Generated Clips', bg: 'Генерирани клипове' },
  generatedClipsDescription: {
    en: 'Review, regenerate, and arrange your clips',
    bg: 'Прегледайте, регенерирайте и подредете клиповете си',
  },
  chooseTransitions: { en: 'Choose Transitions', bg: 'Изберете транзиции' },

  // Advanced Flow - Transitions
  transitionStyleTitle: { en: 'Transition Style', bg: 'Стил на транзициите' },
  transitionStyleDescription: {
    en: 'Select how clips flow into each other',
    bg: 'Изберете как клиповете преминават един в друг',
  },
  createFinalMontage: { en: 'Create Final Montage', bg: 'Създай финален монтаж' },

  // Advanced Flow - Montage
  montageCompleteTitle: { en: 'Your montage is ready! 🎬', bg: 'Вашият монтаж е готов! 🎬' },
  montageCompleteDescription: {
    en: 'Professional video created with',
    bg: 'Професионално видео създадено с',
  },
  editTransitions: { en: 'Edit Transitions', bg: 'Редактирай транзициите' },
  restartFlow: { en: 'Restart Flow', bg: 'Рестартирай процеса' },

  // Advanced Flow - Processing
  sequencingClips: { en: 'Sequencing clips…', bg: 'Подреждане на клипове...' },
  applyingTransitions: { en: 'Applying transitions…', bg: 'Прилагане на транзиции...' },
  colorUnification: { en: 'Color unification…', bg: 'Цветно обединяване...' },
  masteringAudio: { en: 'Mastering audio…', bg: 'Обработка на аудио...' },
  applyingTransitionsDescription: { en: 'transitions…', bg: 'транзиции...' },

  // Advanced Flow - Transitions Presets
  cinematicDissolve: { en: 'Cinematic Dissolve', bg: 'Кинематографско разтваряне' },
  cinematicDissolveDesc: {
    en: 'Smooth crossfade with subtle motion blur, perfect for luxury estates.',
    bg: 'Плавно кръстосано избледняване със субтилно размиване на движението, перфектно за луксозни имоти.',
  },
  cutMotionBlur: { en: 'Cut + Motion Blur', bg: 'Рязко + Размиване на движение' },
  cutMotionBlurDesc: {
    en: 'Dynamic cuts with directional blur for modern, energetic pacing.',
    bg: 'Динамични преходи с насочено размиване за модерен, енергичен темп.',
  },
  wipeMinimal: { en: 'Wipe (Minimal)', bg: 'Изтриване (Минимално)' },
  wipeMinimalDesc: {
    en: 'Clean geometric wipes with minimal distraction from the imagery.',
    bg: 'Чисти геометрични изтривания с минимално разсейване от изображенията.',
  },
  parallaxSlide: { en: 'Parallax Slide', bg: 'Паралакс плъзгане' },
  parallaxSlideDesc: {
    en: 'Layered sliding effect creating depth and dimension between scenes.',
    bg: 'Наслоен плъзгащ ефект, създаващ дълбочина и измерение между сцените.',
  },
  softFadeGold: { en: 'Soft Fade + Gold Overlay', bg: 'Меко избледняване + Златно наслагване' },
  softFadeGoldDesc: {
    en: 'Elegant fade with subtle gold tint for premium, warm transitions.',
    bg: 'Елегантно избледняване със субтилен златен оттенък за премиум, топли преходи.',
  },

  // Advanced Flow - Toasts
  analysisComplete: { en: 'Analysis complete', bg: 'Анализът завърши' },
  photosAnalyzed: { en: 'photos analyzed successfully.', bg: 'снимки анализирани успешно.' },
  analysisFailed: { en: 'Analysis failed', bg: 'Анализът се провали' },
  clipsGenerated: { en: 'Clips generated', bg: 'Клиповете са генерирани' },
  clipsCreated: { en: 'clips created successfully.', bg: 'клипа създадени успешно.' },
  generationFailed: { en: 'Generation failed', bg: 'Генерирането се провали' },
  clipRegenerated: { en: 'Clip regenerated', bg: 'Клипът е регенериран' },
  clipUpdated: { en: 'Your clip has been updated.', bg: 'Вашият клип беше актуализиран.' },
  regenerationFailed: { en: 'Regeneration failed', bg: 'Регенерирането се провали' },
  noTransitionSelected: { en: 'No transition selected', bg: 'Не е избран преход' },
  selectTransition: { en: 'Please select a transition preset.', bg: 'Моля, изберете стил на преход.' },
  montageComplete: { en: 'Montage complete!', bg: 'Монтажът завърши!' },
  videoReadyView: { en: 'Your video is ready to view.', bg: 'Вашето видео е готово за преглед.' },
  montageFailed: { en: 'Montage failed', bg: 'Монтажът се провали' },

  // Photo Uploader
  dragDropPhotos: { en: 'Drag & drop photos here', bg: 'Плъзнете и пуснете снимки тук' },
  orClickBrowse: { en: 'or click to browse', bg: 'или кликнете, за да прегледате' },
  maxPhotos: { en: 'Maximum 10 photos', bg: 'Максимум 10 снимки' },
  jpgPngWebp: { en: 'JPG, PNG, or WEBP', bg: 'JPG, PNG или WEBP' },

  // Footer
  builtWith: { en: 'Built with', bg: 'Създадено с' },
  and: { en: 'and', bg: 'и' },

  // User Menu
  account: { en: 'Account', bg: 'Профил' },
  viewProfile: { en: 'View Profile', bg: 'Виж профила' },
  settings: { en: 'Settings', bg: 'Настройки' },
  billing: { en: 'Billing', bg: 'Плащания' },
  signOut: { en: 'Sign out', bg: 'Изход' },
  confirmSignOut: {
    en: 'Are you sure you want to log out?',
    bg: 'Сигурни ли сте, че искате да излезете?',
  },

  // User Settings
  userSettingsTitle: { en: 'User Settings', bg: 'Потребителски настройки' },
  userSettingsSubtitle: {
    en: 'Update your profile and password.',
    bg: 'Обновете профила и паролата си.',
  },
  name: { en: 'Name', bg: 'Име' },
  namePlaceholder: { en: 'John Doe', bg: 'Иван Петров' },
  email: { en: 'Email', bg: 'Имейл' },
  emailPlaceholder: { en: 'john@example.com', bg: 'ivan@example.com' },
  changePassword: { en: 'Change Password', bg: 'Промяна на парола' },
  currentPassword: { en: 'Current password', bg: 'Текуща парола' },
  newPassword: { en: 'New password', bg: 'Нова парола' },
  confirmPassword: { en: 'Confirm new password', bg: 'Потвърдете новата парола' },
  passwordHelper: {
    en: 'At least 8 characters, including a letter and a number.',
    bg: 'Минимум 8 знака, поне една буква и една цифра.',
  },
  saveChanges: { en: 'Save Changes', bg: 'Запази промените' },
  saving: { en: 'Saving…', bg: 'Запазване…' },
  settingsUpdated: { en: 'Settings updated.', bg: 'Настройките са обновени.' },
  errorNameRequired: {
    en: 'Please enter a name (2–60 characters).',
    bg: 'Моля, въведете име (2–60 знака).',
  },
  errorEmailFormat: { en: 'Please enter a valid email.', bg: 'Моля, въведете валиден имейл.' },
  errorEmailTaken: { en: 'This email is already in use.', bg: 'Този имейл вече се използва.' },
  errorPasswordWeak: {
    en: 'Password must meet the requirements.',
    bg: 'Паролата не отговаря на изискванията.',
  },
  errorPasswordMatch: { en: 'Passwords do not match.', bg: 'Паролите не съвпадат.' },
  errorCurrentPasswordRequired: {
    en: 'Current password is required.',
    bg: 'Текущата парола е задължителна.',
  },

  // 404 Page
  pageNotFound: { en: 'Page Not Found', bg: 'Страницата не е намерена' },
  pageNotFoundDescription: {
    en: 'The page you are looking for does not exist.',
    bg: 'Страницата, която търсите, не съществува.',
  },
  goHome: { en: 'Go Home', bg: 'Към началото' },

  // Additional UI Text
  close: { en: 'Close', bg: 'Затвори' },
  details: { en: 'Details', bg: 'Детайли' },
  tweak: { en: 'Tweak', bg: 'Настрой' },
  regenerateClip: { en: 'Regenerate Clip', bg: 'Регенерирай клип' },
  regenerating: { en: 'Regenerating...', bg: 'Регенериране...' },
  customInstructions: {
    en: 'Custom Instructions (Optional)',
    bg: 'Персонализирани инструкции (незадължително)',
  },
  customInstructionsPlaceholder: {
    en: 'E.g., focus on the fireplace, add golden hour lighting...',
    bg: 'Напр., фокус върху камината, добави златно осветление...',
  },
  quickTweaks: { en: 'Quick Tweaks', bg: 'Бързи настройки' },
  tweakClip: { en: 'Tweak Clip', bg: 'Настрой клип' },

  // Photo Uploader (second block)
  dropPhotosHere: {
    en: 'Drop photos here or click to browse',
    bg: 'Плъзнете снимки тук или кликнете за преглед',
  },
  jpegPngMaxPhotos: {
    en: 'JPEG or PNG • Max {maxPhotos} photos • {current}/{maxPhotos} uploaded',
    bg: 'JPEG или PNG • Макс {maxPhotos} снимки • {current}/{maxPhotos} качени',
  },
  photosAdded: { en: 'Photos added', bg: 'Снимки добавени' },
  photosAddedDesc: {
    en: '{count} photo{plural} added successfully.',
    bg: '{count} снимк{plural} добавени успешно.',
  },
  invalidFileType: { en: 'Invalid file type', bg: 'Невалиден тип файл' },
  invalidFileTypeDesc: {
    en: '{filename} is not a JPEG or PNG image.',
    bg: '{filename} не е JPEG или PNG изображение.',
  },
  tooManyPhotos: { en: 'Too many photos', bg: 'Твърде много снимки' },
  tooManyPhotosDesc: {
    en: 'Maximum {maxPhotos} photos allowed. You tried to add {count} more.',
    bg: 'Максимум {maxPhotos} снимки разрешени. Опитахте да добавите {count} повече.',
  },
  failedToReadFiles: { en: 'Failed to read files', bg: 'Неуспешно четене на файлове' },
  failedToReadFilesDesc: {
    en: 'Please try again with different images.',
    bg: 'Моля, опитайте отново с различни изображения.',
  },

  // Grade Card
  overallScore: { en: 'Overall score:', bg: 'Общ резултат:' },

  // Analysis Detail Drawer
  qualityAnalysis: { en: 'Quality Analysis', bg: 'Анализ на качеството' },
  grade: { en: 'Grade', bg: 'Оценка' },
  scoreBreakdown: { en: 'Score Breakdown', bg: 'Разбивка на резултата' },
  exposure: { en: 'Exposure', bg: 'Експозиция' },
  sharpness: { en: 'Sharpness', bg: 'Острота' },
  framing: { en: 'Framing', bg: 'Кадриране' },
  lighting: { en: 'Lighting', bg: 'Осветление' },
  recommendation: { en: 'Recommendation', bg: 'Препоръка' },
  detectedObjects: { en: 'Detected Objects', bg: 'Разпознати обекти' },

  // Progress Stages
  processingComplete: { en: 'Processing complete! 🎬', bg: 'Обработката завърши! 🎬' },

  // Footer (marketing)
  luxuryVisions: { en: 'Luxury visions, powered by AI.', bg: 'Луксозни визии, задвижвани от AI.' },

  // User Menu (version)
  version: { en: 'v1.0.0', bg: 'v1.0.0' },

  // Clip Tweak Options
  fixHallucinations: { en: 'Fix Hallucinations', bg: 'Поправи халюцинации' },
  fixHallucinationsDesc: {
    en: 'Remove any AI hallucinations or unrealistic elements, keep only authentic property features',
    bg: 'Премахни всички AI халюцинации или нереалистични елементи, запази само автентични характеристики на имота',
  },
  addMovement: { en: 'Add Movement', bg: 'Добави движение' },
  addMovementDesc: {
    en: 'Add subtle camera movement and motion to make the video more dynamic and engaging',
    bg: 'Добави субтилно движение на камерата и моция, за да направи видеото по-динамично и привлекателно',
  },
  improveLighting: { en: 'Improve Lighting', bg: 'Подобри осветлението' },
  improveLightingDesc: {
    en: 'Enhance lighting and color grading for a more premium, professional look',
    bg: 'Подобри осветлението и цветовото градиране за по-премиум, професионален вид',
  },
  warmerTone: { en: 'Warmer Tone', bg: 'По-топъл тон' },
  warmerToneDesc: {
    en: 'Apply warmer color tones for a more inviting, cozy atmosphere',
    bg: 'Приложи по-топли цветови тонове за по-приветлива, уютна атмосфера',
  },
  increaseSharpness: { en: 'Increase Sharpness', bg: 'Увеличи остротата' },
  increaseSharpnessDesc: {
    en: 'Enhance sharpness and clarity of details throughout the clip',
    bg: 'Подобри остротата и яснотата на детайлите в целия клип',
  },
  slowMotion: { en: 'Slow Motion', bg: 'Забавен каданс' },
  slowMotionDesc: {
    en: 'Slow down the pace for a more cinematic, elegant feel',
    bg: 'Забави темпа за по-кинематографско, елегантно усещане',
  },

  // Error Messages
  failedToUpdateSettings: { en: 'Failed to update settings', bg: 'Неуспешно обновяване на настройките' },
} as const;

export type TranslationKey = keyof typeof translations;
