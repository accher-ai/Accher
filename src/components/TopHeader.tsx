import { useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { CHAPTERS } from '../data/ebookData';
import { ChapterId } from '../types/ebook';

interface TopHeaderProps {
  activeChapter: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
  onOpenGuide: () => void;
}

const NAV_CHAPTERS: { id: ChapterId; label: string }[] = [
  { id: 'pengenalan', label: 'Pengenalan' },
  { id: 'eksplorasi', label: 'Peralatan' },
  { id: 'perencanaan', label: 'Storyboard' },
  { id: 'laboratorium', label: 'Laboratorium' },
  { id: 'evaluasi', label: 'Evaluasi' },
];

export function TopHeader({
  activeChapter,
  onSelectChapter,
  onOpenGuide,
}: TopHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: ChapterId) => {
    onSelectChapter(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
        {/* Zone 1: Single-line brand wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('beranda')}
          className="flex items-center gap-2.5 text-left font-display text-lg font-bold tracking-tight text-[#0F294A] transition-colors hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 whitespace-nowrap shrink-0"
        >
          <BookOpen className="h-5 w-5 text-sky-700" aria-hidden="true" />
          <span>KREASI DIGITAL</span>
        </button>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Navigasi Bab E-Modul"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          {NAV_CHAPTERS.map((item) => {
            const isActive = activeChapter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 ${
                  isActive
                    ? 'font-semibold text-[#0F294A] underline decoration-sky-600 decoration-2 underline-offset-8'
                    : 'text-slate-600 hover:text-[#0F294A] hover:underline hover:decoration-slate-300 hover:underline-offset-8'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile drawer trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenGuide}
            className="min-h-[40px] rounded-lg bg-[#0F294A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 whitespace-nowrap shrink-0"
          >
            Petunjuk
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup menu bab' : 'Buka menu bab'}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <nav
          aria-label="Menu Bab Seluler"
          className="border-t border-slate-200 bg-white px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {CHAPTERS.map((chapter) => {
              const isActive = activeChapter === chapter.id;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => handleNavClick(chapter.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? 'bg-sky-50 font-semibold text-[#0F294A]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>
                    {chapter.numberLabel} · {chapter.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
