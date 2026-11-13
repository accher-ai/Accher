import { useEffect, useState } from 'react';
import { ChapterPager, ChapterStatusStrip } from './components/ChapterRail';
import { ChapterEksplorasi } from './components/ChapterEksplorasi';
import { ChapterEvaluasi } from './components/ChapterEvaluasi';
import { ChapterLaboratorium } from './components/ChapterLaboratorium';
import { ChapterPengenalan } from './components/ChapterPengenalan';
import { ChapterPerencanaan } from './components/ChapterPerencanaan';
import { CoverView } from './components/CoverView';
import { GuideModal } from './components/GuideModal';
import { TopHeader } from './components/TopHeader';
import { INITIAL_GALLERY_WORKS, MODULE_IDENTITY } from './data/ebookData';
import {
  ChapterId,
  GalleryWork,
  QualityChecklistState,
  ReflectionForm,
  StoryboardPlan,
} from './types/ebook';

const STORAGE_KEY = 'kreasi_digital_emodul_v1';

interface PersistedState {
  completedChapters: ChapterId[];
  storyboardPlan: StoryboardPlan;
  qualityChecklist: QualityChecklistState;
  quizAnswers: Record<string, number>;
  rubricScores: Record<string, number>;
  reflection: ReflectionForm;
  galleryWorks: GalleryWork[];
}

const DEFAULT_STORYBOARD: StoryboardPlan = {
  topic: '',
  purpose: '',
  audience: '',
  keyMessage: '',
  format: 'Poster',
  preferredTool: 'Canva',
  scenes: [
    {
      id: 'sc-init-1',
      sceneNumber: 1,
      visualPlan: '',
      narrationText: '',
      audioAndDuration: '',
    },
    {
      id: 'sc-init-2',
      sceneNumber: 2,
      visualPlan: '',
      narrationText: '',
      audioAndDuration: '',
    },
    {
      id: 'sc-init-3',
      sceneNumber: 3,
      visualPlan: '',
      narrationText: '',
      audioAndDuration: '',
    },
  ],
};

const DEFAULT_CHECKLIST: QualityChecklistState = {
  clearResolution: false,
  readableContrast: false,
  factChecked: false,
  copyrightAttribution: false,
  privacyConsent: false,
};

const DEFAULT_REFLECTION: ReflectionForm = {
  studentName: '',
  keyLearning: '',
  biggestChallenge: '',
  toolJustification: '',
  improvementPlan: '',
};

function loadInitialState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedState>;
      return {
        completedChapters: Array.isArray(parsed.completedChapters) ? parsed.completedChapters : [],
        storyboardPlan: parsed.storyboardPlan ?? DEFAULT_STORYBOARD,
        qualityChecklist: parsed.qualityChecklist ?? DEFAULT_CHECKLIST,
        quizAnswers: parsed.quizAnswers ?? {},
        rubricScores: parsed.rubricScores ?? {},
        reflection: parsed.reflection ?? DEFAULT_REFLECTION,
        galleryWorks:
          Array.isArray(parsed.galleryWorks) && parsed.galleryWorks.length > 0
            ? parsed.galleryWorks
            : INITIAL_GALLERY_WORKS,
      };
    }
  } catch {
    // Fallback cleanly if storage is unavailable or corrupted
  }
  return {
    completedChapters: [],
    storyboardPlan: DEFAULT_STORYBOARD,
    qualityChecklist: DEFAULT_CHECKLIST,
    quizAnswers: {},
    rubricScores: {},
    reflection: DEFAULT_REFLECTION,
    galleryWorks: INITIAL_GALLERY_WORKS,
  };
}

function getInitialChapter(): ChapterId {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      return 'pengenalan';
    }
  }
  return 'beranda';
}

export default function App() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>(getInitialChapter);
  const [guideOpen, setGuideOpen] = useState(false);
  const [state, setState] = useState<PersistedState>(loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota issues safely
    }
  }, [state]);

  const handleSelectChapter = (id: ChapterId) => {
    setActiveChapter(id);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleMarkCompleteAndNext = (current: ChapterId, next: ChapterId | null) => {
    setState((prev) => {
      const nextCompleted = prev.completedChapters.includes(current)
        ? prev.completedChapters
        : [...prev.completedChapters, current];
      return { ...prev, completedChapters: nextCompleted };
    });
    if (next) {
      handleSelectChapter(next);
    }
  };

  const handleSubmitWork = (work: GalleryWork) => {
    setState((prev) => ({
      ...prev,
      galleryWorks: [work, ...prev.galleryWorks],
    }));
  };

  const handleAppreciateWork = (id: string) => {
    setState((prev) => ({
      ...prev,
      galleryWorks: prev.galleryWorks.map((w) =>
        w.id === id ? { ...w, appreciations: w.appreciations + 1 } : w
      ),
    }));
  };

  const handlePrintModule = () => {
    if (typeof window !== 'undefined' && typeof window.print === 'function') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TopHeader
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
        onOpenGuide={() => setGuideOpen(true)}
      />

      <ChapterStatusStrip
        activeChapter={activeChapter}
        completedChapters={state.completedChapters}
        onSelectChapter={handleSelectChapter}
        onPrintModule={handlePrintModule}
      />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {activeChapter === 'beranda' ? (
          <CoverView
            completedChapters={state.completedChapters}
            onSelectChapter={handleSelectChapter}
            onOpenGuide={() => setGuideOpen(true)}
          />
        ) : null}

        {activeChapter === 'pengenalan' ? <ChapterPengenalan /> : null}

        {activeChapter === 'eksplorasi' ? <ChapterEksplorasi /> : null}

        {activeChapter === 'perencanaan' ? (
          <ChapterPerencanaan
            plan={state.storyboardPlan}
            onChangePlan={(storyboardPlan) => setState((p) => ({ ...p, storyboardPlan }))}
          />
        ) : null}

        {activeChapter === 'laboratorium' ? (
          <ChapterLaboratorium
            plan={state.storyboardPlan}
            checklist={state.qualityChecklist}
            onChangeChecklist={(qualityChecklist) =>
              setState((p) => ({ ...p, qualityChecklist }))
            }
            onSubmitWork={handleSubmitWork}
            onNavigateChapter={handleSelectChapter}
          />
        ) : null}

        {activeChapter === 'evaluasi' ? (
          <ChapterEvaluasi
            quizAnswers={state.quizAnswers}
            onChangeQuizAnswers={(quizAnswers) => setState((p) => ({ ...p, quizAnswers }))}
            rubricScores={state.rubricScores}
            onChangeRubricScores={(rubricScores) => setState((p) => ({ ...p, rubricScores }))}
            reflection={state.reflection}
            onChangeReflection={(reflection) => setState((p) => ({ ...p, reflection }))}
            galleryWorks={state.galleryWorks}
            onAppreciateWork={handleAppreciateWork}
          />
        ) : null}

        {activeChapter !== 'beranda' ? (
          <ChapterPager
            activeChapter={activeChapter}
            isCompleted={state.completedChapters.includes(activeChapter)}
            onSelectChapter={handleSelectChapter}
            onMarkCompleteAndNext={handleMarkCompleteAndNext}
          />
        ) : null}
      </main>

      <footer className="no-print border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-semibold text-[#0F294A]">
              {MODULE_IDENTITY.title} – {MODULE_IDENTITY.subtitle}
            </p>
            <p className="mt-0.5">
              {MODULE_IDENTITY.author} · {MODULE_IDENTITY.school} · {MODULE_IDENTITY.subject}
            </p>
          </div>
          <p className="text-slate-500">{MODULE_IDENTITY.program}</p>
        </div>
      </footer>

      <GuideModal
        isOpen={guideOpen}
        onClose={() => setGuideOpen(false)}
        onStartLearning={handleSelectChapter}
      />
    </div>
  );
}
