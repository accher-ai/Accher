export type ChapterId =
  | 'beranda'
  | 'pengenalan'
  | 'eksplorasi'
  | 'perencanaan'
  | 'laboratorium'
  | 'evaluasi';

export type ContentFormat = 'Poster' | 'Infografis' | 'Video Pendek';

export interface ChapterMeta {
  id: ChapterId;
  numberLabel: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
}

export interface ContentExampleCard {
  id: string;
  title: string;
  format: ContentFormat;
  topic: string;
  imagePath: string;
  purpose: string;
  audience: string;
  keyMessage: string;
  ethicsNote: string;
}

export interface QuickCheckItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ToolSpec {
  id: string;
  name: string;
  category: 'Perangkat Keras' | 'Aplikasi Desain' | 'Aplikasi Video' | 'Evaluasi & Penyimpanan';
  primaryRole: string;
  strengths: string[];
  recommendedFor: ContentFormat[];
  steps: string[];
}

export interface StoryboardScene {
  id: string;
  sceneNumber: number;
  visualPlan: string;
  narrationText: string;
  audioAndDuration: string;
}

export interface StoryboardPlan {
  topic: string;
  purpose: string;
  audience: string;
  keyMessage: string;
  format: ContentFormat;
  preferredTool: string;
  scenes: StoryboardScene[];
}

export interface QualityChecklistState {
  clearResolution: boolean;
  readableContrast: boolean;
  factChecked: boolean;
  copyrightAttribution: boolean;
  privacyConsent: boolean;
}

export interface GalleryWork {
  id: string;
  studentOrGroup: string;
  className: string;
  title: string;
  format: ContentFormat;
  localTheme: string;
  toolUsed: string;
  toolReason: string;
  summary: string;
  workLink?: string;
  appreciations: number;
  createdAt: string;
  isUserSubmitted?: boolean;
}

export interface QuizQuestion {
  id: string;
  chapterRef: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface RubricCriterion {
  id: string;
  aspect: string;
  description: string;
  levels: {
    score: 1 | 2 | 3 | 4;
    label: string;
    descriptor: string;
  }[];
}

export interface ReflectionForm {
  studentName: string;
  keyLearning: string;
  biggestChallenge: string;
  toolJustification: string;
  improvementPlan: string;
}

export interface StudioSimSettings {
  lightingLevel: number; // 0-100
  audioClarity: number; // 0-100
  ruleOfThirds: boolean;
  captionEnabled: boolean;
}
