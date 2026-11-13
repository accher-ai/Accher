import { useState } from 'react';
import {
  AlertCircle,
  Captions,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
  ShieldCheck,
  Users,
  Video,
} from 'lucide-react';
import {
  CONTENT_EXAMPLES,
  PENGENALAN_QUICK_CHECK,
  VIDEO_LESSON_SCENES,
} from '../data/ebookData';
import { ResilientImage } from './ResilientImage';

export function ChapterPengenalan() {
  const [selectedExampleId, setSelectedExampleId] = useState(CONTENT_EXAMPLES[0].id);
  const [videoStep, setVideoStep] = useState(0);
  const [showCaptions, setShowCaptions] = useState(true);
  const [quickAnswers, setQuickAnswers] = useState<Record<string, number>>({});

  const selectedExample =
    CONTENT_EXAMPLES.find((item) => item.id === selectedExampleId) ?? CONTENT_EXAMPLES[0];
  const currentScene = VIDEO_LESSON_SCENES[videoStep];

  return (
    <div className="space-y-10">
      {/* Header Bab */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <p className="text-xs font-semibold text-sky-700">Bab 01 · Tahap Memahami (Mindful)</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-[#0F294A] sm:text-3xl">
          Pengenalan Kreasi Konten Digital
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Konten digital bukan sekadar unggahan gambar atau video singkat di media sosial. Konten
          yang bermakna dirancang untuk menyampaikan pesan yang jelas kepada audiens yang tepat,
          dengan tetap menjaga akurasi informasi dan etika hak cipta.
        </p>

        {/* 3 Pilar Konsep */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-display text-base font-bold text-[#0F294A]">
              1. Karakteristik Konten Baik
            </h2>
            <ul className="mt-2.5 space-y-1.5 text-sm text-slate-700">
              <li>Pesan utama fokus dan mudah dipahami dalam hitungan detik.</li>
              <li>Teks ringkas dengan kontras warna yang nyaman dibaca di layar HP.</li>
              <li>Berdasarkan fakta terverifikasi, bukan informasi hoaks.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-sky-700" aria-hidden="true" />
              <h2 className="font-display text-base font-bold text-[#0F294A]">
                2. Tujuan &amp; Audiens
              </h2>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
              Sebelum membuka aplikasi desain, tentukan terlebih dahulu: <strong>mengapa</strong>{' '}
              konten dibuat (edukasi, informasi, promosi budaya) dan <strong>siapa</strong> yang
              akan membacanya (pelajar, warga lokal, atau masyarakat umum).
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#EA580C]" aria-hidden="true" />
              <h2 className="font-display text-base font-bold text-[#0F294A]">
                3. Etika &amp; Hak Cipta
              </h2>
            </div>
            <ul className="mt-2.5 space-y-1.5 text-sm text-slate-700">
              <li>Utamakan foto, ilustrasi, dan rekaman buatan sendiri.</li>
              <li>Cantumkan atribusi bila memakai aset berlisensi terbuka.</li>
              <li>Minta izin sebelum merekam atau memublikasikan wajah orang lain.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Video Pengantar Konsep dengan Caption */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700">
              <Video className="h-4 w-4" aria-hidden="true" />
              <span>Media Pembelajaran Interaktif</span>
            </div>
            <h2 className="mt-1 font-display text-xl font-bold text-[#0F294A]">
              Video Pengantar: Menjadi Kreator Konten Bertanggung Jawab
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowCaptions((prev) => !prev)}
            aria-pressed={showCaptions}
            className={`inline-flex min-h-[40px] items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              showCaptions
                ? 'border-sky-600 bg-sky-50 text-sky-900'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Captions className="h-4 w-4" aria-hidden="true" />
            <span>{showCaptions ? 'Caption Aktif (CC)' : 'Aktifkan Caption (CC)'}</span>
          </button>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-[#0F294A] text-white">
          <div className="grid items-stretch md:grid-cols-12">
            <div className="flex flex-col justify-between p-6 md:col-span-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-sky-300 tabular-nums">
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>
                    Segmen {currentScene.step} dari {VIDEO_LESSON_SCENES.length} ·{' '}
                    {currentScene.timestamp}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-xl font-bold text-white">
                  {currentScene.heading}
                </h3>
                <p className="mt-2 text-sm text-sky-100">{currentScene.visualCue}</p>
              </div>

              {showCaptions ? (
                <div className="mt-6 rounded-lg border border-sky-400/30 bg-slate-900/75 p-4">
                  <p className="text-xs font-semibold text-amber-300">Teks Caption / Narasi:</p>
                  <p className="mt-1 text-sm leading-relaxed text-white">
                    “{currentScene.caption}”
                  </p>
                </div>
              ) : (
                <p className="mt-6 text-xs text-slate-300">
                  Caption disembunyikan. Tekan tombol “Aktifkan Caption (CC)” untuk menampilkan teks
                  narasi.
                </p>
              )}
            </div>

            <div className="flex flex-col justify-between border-t border-white/10 bg-slate-900/50 p-5 md:col-span-4 md:border-t-0 md:border-l">
              <div>
                <p className="text-xs font-semibold text-sky-200">Daftar Segmen Video</p>
                <div className="mt-3 space-y-2">
                  {VIDEO_LESSON_SCENES.map((scene, idx) => (
                    <button
                      key={scene.step}
                      type="button"
                      onClick={() => setVideoStep(idx)}
                      className={`flex w-full items-start gap-2.5 rounded-lg p-2.5 text-left text-xs transition-colors ${
                        idx === videoStep
                          ? 'bg-sky-600 font-semibold text-white'
                          : 'bg-white/5 text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      <span className="font-mono tabular-nums">0{scene.step}</span>
                      <span>{scene.heading}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2 pt-3">
                <button
                  type="button"
                  disabled={videoStep === 0}
                  onClick={() => setVideoStep((s) => Math.max(0, s - 1))}
                  className="inline-flex min-h-[38px] items-center gap-1 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Mundur</span>
                </button>
                <button
                  type="button"
                  disabled={videoStep === VIDEO_LESSON_SCENES.length - 1}
                  onClick={() =>
                    setVideoStep((s) => Math.min(VIDEO_LESSON_SCENES.length - 1, s + 1))
                  }
                  className="inline-flex min-h-[38px] items-center gap-1 rounded-lg bg-[#EA580C] px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-700 disabled:opacity-40"
                >
                  <span>Lanjut</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kartu Contoh Konten Interaktif */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-[#0F294A]">
              Bedah Contoh Jenis Konten Digital
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Klik salah satu jenis konten untuk mengamati struktur tujuan, audiens, dan catatan
              etikanya.
            </p>
          </div>

          <div
            className="inline-flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1"
            role="tablist"
            aria-label="Pilih contoh jenis konten"
          >
            {CONTENT_EXAMPLES.map((ex) => {
              const active = ex.id === selectedExample.id;
              return (
                <button
                  key={ex.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedExampleId(ex.id)}
                  className={`min-h-[40px] rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-white text-[#0F294A] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {ex.format}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid items-stretch gap-6 lg:grid-cols-12">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 lg:col-span-5">
            <ResilientImage
              src={selectedExample.imagePath}
              alt={selectedExample.title}
              caption={selectedExample.topic}
              className="h-full max-h-[380px] w-full object-cover"
              aspectClassName="h-[320px]"
            />
          </div>

          <div className="flex flex-col justify-between space-y-4 lg:col-span-7">
            <div>
              <p className="text-xs font-semibold text-sky-700">
                {selectedExample.format} · {selectedExample.topic}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-[#0F294A]">
                {selectedExample.title}
              </h3>

              <dl className="mt-4 space-y-3 divide-y divide-slate-100 text-sm">
                <div className="pt-2">
                  <dt className="font-semibold text-slate-900">Tujuan Konten</dt>
                  <dd className="mt-0.5 text-slate-600">{selectedExample.purpose}</dd>
                </div>
                <div className="pt-3">
                  <dt className="font-semibold text-slate-900">Sasaran Audiens</dt>
                  <dd className="mt-0.5 text-slate-600">{selectedExample.audience}</dd>
                </div>
                <div className="pt-3">
                  <dt className="font-semibold text-slate-900">Pesan Utama</dt>
                  <dd className="mt-0.5 text-slate-600">{selectedExample.keyMessage}</dd>
                </div>
                <div className="pt-3">
                  <dt className="font-semibold text-slate-900">Penerapan Etika &amp; Hak Cipta</dt>
                  <dd className="mt-0.5 text-slate-600">{selectedExample.ethicsNote}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Cek Pemahaman Singkat */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-[#0F294A]">
          Cek Pemahaman Singkat (Pertanyaan Pemantik)
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Pilih jawaban yang paling tepat untuk menguji pemahaman konsep dasar sebelum lanjut ke
          Bab 02.
        </p>

        <div className="mt-6 space-y-6">
          {PENGENALAN_QUICK_CHECK.map((item, qIdx) => {
            const picked = quickAnswers[item.id];
            const hasAnswered = typeof picked === 'number';
            const isCorrect = picked === item.correctIndex;

            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <p className="text-sm font-semibold text-[#0F294A]">
                  {qIdx + 1}. {item.question}
                </p>

                <div className="mt-3 space-y-2">
                  {item.options.map((opt, optIdx) => {
                    const isSelected = picked === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() =>
                          setQuickAnswers((prev) => ({ ...prev, [item.id]: optIdx }))
                        }
                        className={`flex min-h-[44px] w-full items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                          isSelected
                            ? 'border-sky-600 bg-sky-50 font-semibold text-[#0F294A]'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-300 font-mono text-xs">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {hasAnswered ? (
                  <div
                    className={`mt-3 flex items-start gap-2.5 rounded-lg border p-3.5 text-xs ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                        : 'border-amber-200 bg-amber-50 text-amber-950'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                    )}
                    <div>
                      <p className="font-bold">
                        {isCorrect ? 'Benar — Pemahaman Tepat' : 'Perlu Diperbaiki'}
                      </p>
                      <p className="mt-0.5 leading-relaxed">{item.explanation}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
