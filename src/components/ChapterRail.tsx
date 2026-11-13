import { ArrowLeft, ArrowRight, CheckCircle2, Home, Printer } from 'lucide-react';
import { CHAPTERS } from '../data/ebookData';
import { ChapterId } from '../types/ebook';
import { calculateModuleProgress } from '../utils/ebookLogic';

interface ChapterStatusStripProps {
  activeChapter: ChapterId;
  completedChapters: ChapterId[];
  onSelectChapter: (id: ChapterId) => void;
  onPrintModule: () => void;
}

export function ChapterStatusStrip({
  activeChapter,
  completedChapters,
  onSelectChapter,
  onPrintModule,
}: ChapterStatusStripProps) {
  const progress = calculateModuleProgress(completedChapters, 5);
  const currentMeta = CHAPTERS.find((c) => c.id === activeChapter) ?? CHAPTERS[0];

  return (
    <div className="no-print border-b border-slate-200 bg-slate-50/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          {activeChapter === 'beranda' ? (
            <span className="font-semibold text-[#0F294A]">
              Halaman Sampul · Peta Pembelajaran
            </span>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onSelectChapter('beranda')}
                className="inline-flex items-center gap-1.5 font-medium text-sky-800 hover:underline focus-visible:outline-2 focus-visible:outline-sky-600"
              >
                <Home className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Beranda</span>
              </button>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-[#0F294A]">{currentMeta.numberLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{currentMeta.title}</span>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-600 tabular-nums">
              Progres Modul: {progress.completedCount}/{progress.totalCount} Bab ({progress.percentage}%)
            </span>
            <div
              className="h-2 w-28 overflow-hidden rounded-full bg-slate-200"
              role="progressbar"
              aria-valuenow={progress.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progres penyelesaian E-Modul"
            >
              <div
                className="h-full bg-sky-700 transition-all duration-200"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onPrintModule}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100 whitespace-nowrap shrink-0"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface ChapterPagerProps {
  activeChapter: ChapterId;
  isCompleted: boolean;
  onSelectChapter: (id: ChapterId) => void;
  onMarkCompleteAndNext: (current: ChapterId, next: ChapterId | null) => void;
}

export function ChapterPager({
  activeChapter,
  isCompleted,
  onSelectChapter,
  onMarkCompleteAndNext,
}: ChapterPagerProps) {
  const index = CHAPTERS.findIndex((c) => c.id === activeChapter);
  const prevChapter = index > 0 ? CHAPTERS[index - 1] : null;
  const nextChapter = index >= 0 && index < CHAPTERS.length - 1 ? CHAPTERS[index + 1] : null;

  return (
    <div className="no-print mt-12 border-t border-slate-200 pt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {prevChapter ? (
            <button
              type="button"
              onClick={() => onSelectChapter(prevChapter.id)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Sebelumnya: {prevChapter.shortLabel}</span>
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => onSelectChapter('beranda')}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Beranda</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {nextChapter ? (
            <button
              type="button"
              onClick={() => onMarkCompleteAndNext(activeChapter, nextChapter.id)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#EA580C] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700 whitespace-nowrap shrink-0"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span>
                {isCompleted
                  ? `Lanjut ke ${nextChapter.shortLabel}`
                  : `Tandai Selesai & Lanjut`}
              </span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onMarkCompleteAndNext(activeChapter, null)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 whitespace-nowrap shrink-0"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span>{isCompleted ? 'Bab Evaluasi Selesai' : 'Tandai E-Modul Selesai'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
