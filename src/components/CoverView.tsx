import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Circle,
  Clock,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { CHAPTERS, EBOOK_IMAGES, MODULE_IDENTITY } from '../data/ebookData';
import { ChapterId } from '../types/ebook';
import { ResilientImage } from './ResilientImage';

interface CoverViewProps {
  completedChapters: ChapterId[];
  onSelectChapter: (id: ChapterId) => void;
  onOpenGuide: () => void;
}

export function CoverView({
  completedChapters,
  onSelectChapter,
  onOpenGuide,
}: CoverViewProps) {
  return (
    <div className="space-y-12">
      {/* Hero Split Section */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="bugis-weave-rule" aria-hidden="true" />
        <div className="grid items-stretch lg:grid-cols-12">
          <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-7">
            <div>
              <p className="text-xs font-semibold tracking-wide text-sky-700">
                {MODULE_IDENTITY.subject} · {MODULE_IDENTITY.school}
              </p>

              <h1
                className="mt-3 font-display font-bold leading-tight text-[#0F294A]"
                style={{
                  fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)',
                  textWrap: 'balance',
                }}
              >
                {MODULE_IDENTITY.title}: {MODULE_IDENTITY.heroHeadline}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                {MODULE_IDENTITY.subtitle} ini memandu murid kelas XI menyusun ide konten,
                membuat storyboard, memproduksi poster/infografis dan video dengan Canva maupun
                Filmora/CapCut, hingga memublikasikan karya bertema budaya Bugis dan potensi
                Kabupaten Wajo secara etis.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectChapter('pengenalan')}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-[#EA580C] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  <span>Mulai Belajar</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onOpenGuide}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#0F294A] transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  <HelpCircle className="h-4 w-4 text-sky-700" aria-hidden="true" />
                  <span>Petunjuk Penggunaan</span>
                </button>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-5 text-xs text-slate-600 space-y-1">
              <p>
                Penulis: <strong className="text-slate-900">{MODULE_IDENTITY.author}</strong> ·{' '}
                {MODULE_IDENTITY.school}
              </p>
              <p className="text-slate-500">{MODULE_IDENTITY.program}</p>
            </div>
          </div>

          <div className="relative min-h-[280px] border-t border-slate-200 bg-slate-100 lg:col-span-5 lg:border-t-0 lg:border-l">
            <ResilientImage
              src={EBOOK_IMAGES.cover}
              alt="Ilustrasi murid SMA Negeri 4 Wajo membuat konten digital menggunakan smartphone dan laptop"
              caption="KREASI DIGITAL · Laboratorium Kreasi Konten"
              className="h-full w-full object-cover"
              aspectClassName="h-full min-h-[280px]"
            />
          </div>
        </div>
      </section>

      {/* Tujuan & Indikator Keberhasilan */}
      <section className="grid gap-6 lg:grid-cols-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-sky-800">
            <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
            <span>Tujuan Pembelajaran</span>
          </div>
          <p className="mt-3 text-base leading-relaxed text-slate-800">
            {MODULE_IDENTITY.learningObjective}
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-200 pt-5 text-center">
            <div>
              <p className="font-display text-lg font-bold text-[#0F294A] tabular-nums">1</p>
              <p className="text-xs text-slate-600">Memahami</p>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-sky-700 tabular-nums">2</p>
              <p className="text-xs text-slate-600">Mengaplikasikan</p>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-[#EA580C] tabular-nums">3</p>
              <p className="text-xs text-slate-600">Merefleksikan</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#0F294A]">
            <Sparkles className="h-4 w-4 text-[#EA580C]" aria-hidden="true" />
            <span>Indikator Keberhasilan Modul</span>
          </div>
          <ul className="mt-4 space-y-3">
            {MODULE_IDENTITY.successIndicators.map((indicator, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sky-50 font-mono text-xs font-semibold text-sky-800 tabular-nums">
                  0{idx + 1}
                </span>
                <span>{indicator}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Peta Modul / Daftar Isi Interaktif */}
      <section aria-labelledby="peta-modul-heading">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="peta-modul-heading"
              className="font-display text-2xl font-bold text-[#0F294A]"
            >
              Peta Modul &amp; Daftar Isi
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Pilih bab di bawah ini untuk membaca materi, mencoba simulasi, atau mengerjakan proyek.
            </p>
          </div>
          <p className="text-xs font-medium text-slate-500 tabular-nums">
            Total 6 Bagian · Estimasi ±130 Menit Belajar
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHAPTERS.map((chapter) => {
            const isDone = completedChapters.includes(chapter.id);
            const isCover = chapter.id === 'beranda';

            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => onSelectChapter(chapter.id)}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 text-left transition-colors hover:border-sky-500 hover:bg-sky-50/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-sky-800">{chapter.numberLabel}</span>
                    {!isCover ? (
                      <span
                        className={`inline-flex items-center gap-1 font-medium ${
                          isDone ? 'text-emerald-700' : 'text-slate-500'
                        }`}
                      >
                        {isDone ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Selesai</span>
                          </>
                        ) : (
                          <>
                            <Circle className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Belum Selesai</span>
                          </>
                        )}
                      </span>
                    ) : (
                      <span className="text-slate-500">Halaman Awal</span>
                    )}
                  </div>

                  <h3 className="mt-2 font-display text-base font-bold text-[#0F294A] group-hover:text-sky-800">
                    {chapter.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {chapter.subtitle}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {chapter.estimatedMinutes} menit
                  </span>
                  <span className="font-semibold text-sky-700 group-hover:translate-x-0.5 transition-transform">
                    Buka Bab →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
