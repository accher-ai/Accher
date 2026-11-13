import { useState } from 'react';
import {
  AlertCircle,
  Award,
  CheckCircle2,
  Download,
  ExternalLink,
  Heart,
  RotateCcw,
} from 'lucide-react';
import {
  EVALUATION_QUIZ,
  MODULE_IDENTITY,
  RUBRIC_CRITERIA,
} from '../data/ebookData';
import { ContentFormat, GalleryWork, ReflectionForm } from '../types/ebook';
import {
  calculateRubricSummary,
  evaluateQuiz,
  filterGalleryWorks,
  formatReflectionExportText,
} from '../utils/ebookLogic';

interface ChapterEvaluasiProps {
  quizAnswers: Record<string, number>;
  onChangeQuizAnswers: (next: Record<string, number>) => void;
  rubricScores: Record<string, number>;
  onChangeRubricScores: (next: Record<string, number>) => void;
  reflection: ReflectionForm;
  onChangeReflection: (next: ReflectionForm) => void;
  galleryWorks: GalleryWork[];
  onAppreciateWork: (id: string) => void;
}

export function ChapterEvaluasi({
  quizAnswers,
  onChangeQuizAnswers,
  rubricScores,
  onChangeRubricScores,
  reflection,
  onChangeReflection,
  galleryWorks,
  onAppreciateWork,
}: ChapterEvaluasiProps) {
  const [showQuizReview, setShowQuizReview] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'Semua' | ContentFormat>('Semua');
  const [reflectionSavedMsg, setReflectionSavedMsg] = useState(false);

  const quizEval = evaluateQuiz(EVALUATION_QUIZ, quizAnswers);
  const rubricEval = calculateRubricSummary(rubricScores, RUBRIC_CRITERIA.length);
  const visibleWorks = filterGalleryWorks(galleryWorks, galleryFilter);

  const handleDownloadReflection = () => {
    const content = formatReflectionExportText(
      reflection,
      rubricEval.totalScore,
      rubricEval.maxScore
    );
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Refleksi-dan-Rubrik-Kreasi-Digital.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      {/* Header Bab */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <p className="text-xs font-semibold text-sky-700">
          Bab 05 · Tahap Merefleksikan (Joyful) &amp; Evaluasi Ketuntasan
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-[#0F294A] sm:text-3xl">
          Evaluasi, Galeri Karya, dan Penutup
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Uji pemahaman Anda melalui kuis evaluasi (target ketuntasan minimal 80%), nilai kualitas
          karya menggunakan rubrik, tulis refleksi pembelajaran, dan apresiasi karya teman sekelas
          di Galeri Karya.
        </p>
      </section>

      {/* Bagian A: Kuis Evaluasi Ketuntasan */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-[#0F294A]">
              1. Kuis Evaluasi Pemahaman ({EVALUATION_QUIZ.length} Soal)
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Terjawab{' '}
              <span className="font-mono font-semibold text-[#0F294A] tabular-nums">
                {quizEval.answeredCount}/{quizEval.totalQuestions}
              </span>{' '}
              soal · Kriteria Ketuntasan Minimal: 80%
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowQuizReview(true)}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#0F294A] px-4 py-2 text-xs font-semibold text-white hover:bg-sky-900 whitespace-nowrap"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span>Periksa Skor &amp; Pembahasan</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onChangeQuizAnswers({});
                setShowQuizReview(false);
              }}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Ulangi Kuis</span>
            </button>
          </div>
        </div>

        {showQuizReview ? (
          <div
            role="status"
            className={`mt-5 flex flex-col gap-2 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
              quizEval.isPassed
                ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                : 'border-amber-200 bg-amber-50 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {quizEval.isPassed ? (
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
              ) : (
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
              )}
              <div>
                <p className="text-sm font-bold">
                  Status: {quizEval.statusLabel} · Skor{' '}
                  <span className="font-mono tabular-nums">
                    {quizEval.percentage}% ({quizEval.correctCount}/{quizEval.totalQuestions} benar)
                  </span>
                </p>
                <p className="mt-0.5 text-xs">
                  {quizEval.isPassed
                    ? 'Selamat! Anda telah melampaui batas ketuntasan 80% pada E-Modul KREASI DIGITAL.'
                    : 'Lengkapi seluruh soal atau pelajari pembahasan di bawah untuk mencapai nilai minimal 80%.'}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-6 space-y-5">
          {EVALUATION_QUIZ.map((q, idx) => {
            const selected = quizAnswers[q.id];
            const isCorrect = selected === q.correctIndex;
            return (
              <div key={q.id} className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                <p className="text-xs font-semibold text-sky-800">{q.chapterRef}</p>
                <p className="mt-1 text-sm font-semibold text-[#0F294A]">
                  {idx + 1}. {q.question}
                </p>

                <div className="mt-3 space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const active = selected === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() =>
                          onChangeQuizAnswers({ ...quizAnswers, [q.id]: optIdx })
                        }
                        className={`flex min-h-[42px] w-full items-center gap-3 rounded-lg border px-3.5 py-2 text-left text-sm transition-colors ${
                          active
                            ? 'border-sky-600 bg-sky-50 font-semibold text-[#0F294A]'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-slate-300 font-mono text-xs">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {showQuizReview && typeof selected === 'number' ? (
                  <div
                    className={`mt-3 rounded-lg border p-3 text-xs ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                        : 'border-amber-200 bg-amber-50 text-amber-950'
                    }`}
                  >
                    <p className="font-bold">
                      {isCorrect ? 'Jawaban Benar' : 'Jawaban Belum Tepat'}
                    </p>
                    <p className="mt-0.5">{q.explanation}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bagian B: Rubrik Penilaian Proyek Interaktif */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-[#0F294A]">
              2. Rubrik Penilaian Proyek Konten Digital
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Klik tingkat capaian (1–4) pada tiap aspek untuk menilai hasil karya secara mandiri
              maupun oleh guru.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-right">
            <p className="text-xs text-slate-600">Total Skor Rubrik</p>
            <p className="font-mono text-lg font-bold text-[#0F294A] tabular-nums">
              {rubricEval.totalScore}/{rubricEval.maxScore} ({rubricEval.percentage}%) ·{' '}
              <span className="text-sky-700">{rubricEval.predicate}</span>
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {RUBRIC_CRITERIA.map((criterion, idx) => {
            const currentVal = rubricScores[criterion.id];
            return (
              <div
                key={criterion.id}
                className="rounded-xl border border-slate-200 bg-slate-50/50 p-5"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-display text-base font-bold text-[#0F294A]">
                    {idx + 1}. {criterion.aspect}
                  </h3>
                  <span className="font-mono text-xs font-semibold text-slate-600 tabular-nums">
                    {currentVal ? `Skor Dipilih: ${currentVal}/4` : 'Belum Dinilai'}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-600">{criterion.description}</p>

                <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                  {criterion.levels.map((lvl) => {
                    const active = currentVal === lvl.score;
                    return (
                      <button
                        key={lvl.score}
                        type="button"
                        onClick={() =>
                          onChangeRubricScores({
                            ...rubricScores,
                            [criterion.id]: lvl.score,
                          })
                        }
                        className={`flex flex-col justify-between rounded-lg border p-3 text-left transition-colors ${
                          active
                            ? 'border-sky-600 bg-sky-50 text-[#0F294A]'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-xs font-bold">
                          <span>{lvl.label}</span>
                          <span className="font-mono tabular-nums">{lvl.score}</span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                          {lvl.descriptor}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bagian C: Galeri & Pameran Karya Kelas */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-[#0F294A]">
              3. Galeri Pameran Karya Murid ({visibleWorks.length})
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Amati alasan pemilihan alat setiap kelompok dan berikan apresiasi terhadap karya teman.
            </p>
          </div>

          <div className="inline-flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
            {(['Semua', 'Poster', 'Infografis', 'Video Pendek'] as const).map((fmt) => {
              const active = galleryFilter === fmt;
              return (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setGalleryFilter(fmt)}
                  className={`min-h-[38px] rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-white text-[#0F294A] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {fmt}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleWorks.map((work) => (
            <article
              key={work.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-sky-800">{work.format}</span>
                  <span>{work.className}</span>
                </div>
                <h3 className="mt-2 font-display text-base font-bold text-[#0F294A]">
                  {work.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-600">
                  {work.studentOrGroup} · {work.localTheme}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-slate-700">{work.summary}</p>

                <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3 text-xs">
                  <p className="font-semibold text-[#0F294A]">Alat: {work.toolUsed}</p>
                  <p className="mt-1 text-slate-600">
                    <strong className="text-slate-800">Alasan pemilihan:</strong> {work.toolReason}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-200 pt-3">
                <button
                  type="button"
                  onClick={() => onAppreciateWork(work.id)}
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-[#0F294A] hover:border-rose-300 hover:bg-rose-50 hover:text-rose-800"
                >
                  <Heart className="h-3.5 w-3.5 text-[#EA580C]" aria-hidden="true" />
                  <span className="tabular-nums">Apresiasi ({work.appreciations})</span>
                </button>

                {work.workLink ? (
                  <a
                    href={work.workLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:underline"
                  >
                    <span>Tautan Karya</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-500">{work.createdAt}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bagian D: Formulir Refleksi Pembelajaran */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-[#0F294A]">
              4. Formulir Refleksi Belajar
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Catat pengalaman belajar Anda dan unduh sebagai bukti portofolio pembelajaran.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadReflection}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-[#0F294A] hover:bg-slate-50 whitespace-nowrap shrink-0"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            <span>Unduh Refleksi (.txt)</span>
          </button>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="ref-name" className="block text-xs font-semibold text-slate-700">
              Nama Lengkap Murid
            </label>
            <input
              id="ref-name"
              type="text"
              value={reflection.studentName}
              onChange={(e) => {
                setReflectionSavedMsg(false);
                onChangeReflection({ ...reflection, studentName: e.target.value });
              }}
              placeholder="Tuliskan nama Anda..."
              className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="ref-learn" className="block text-xs font-semibold text-slate-700">
              Hal utama yang saya pelajari dari modul ini
            </label>
            <textarea
              id="ref-learn"
              rows={3}
              value={reflection.keyLearning}
              onChange={(e) => {
                setReflectionSavedMsg(false);
                onChangeReflection({ ...reflection, keyLearning: e.target.value });
              }}
              placeholder="Contoh: Pentingnya menyusun storyboard dan memeriksa hak cipta..."
              className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="ref-chal" className="block text-xs font-semibold text-slate-700">
              Tantangan saat produksi dan cara mengatasinya
            </label>
            <textarea
              id="ref-chal"
              rows={3}
              value={reflection.biggestChallenge}
              onChange={(e) => {
                setReflectionSavedMsg(false);
                onChangeReflection({ ...reflection, biggestChallenge: e.target.value });
              }}
              placeholder="Contoh: Pencahayaan ruangan agak redup, diatasi dengan merekam dekat jendela..."
              className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="ref-tool" className="block text-xs font-semibold text-slate-700">
              Alasan pemilihan alat dan metode kerja
            </label>
            <textarea
              id="ref-tool"
              rows={3}
              value={reflection.toolJustification}
              onChange={(e) => {
                setReflectionSavedMsg(false);
                onChangeReflection({ ...reflection, toolJustification: e.target.value });
              }}
              placeholder="Mengapa memilih Canva / Filmora / kamera smartphone untuk karya ini..."
              className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="ref-next" className="block text-xs font-semibold text-slate-700">
              Rencana perbaikan untuk karya berikutnya
            </label>
            <textarea
              id="ref-next"
              rows={3}
              value={reflection.improvementPlan}
              onChange={(e) => {
                setReflectionSavedMsg(false);
                onChangeReflection({ ...reflection, improvementPlan: e.target.value });
              }}
              placeholder="Hal yang ingin ditingkatkan di proyek selanjutnya..."
              className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          {reflectionSavedMsg ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span>Refleksi tersimpan di perangkat Anda.</span>
            </span>
          ) : (
            <span className="text-xs text-slate-500">Perubahan otomatis tersimpan.</span>
          )}
          <button
            type="button"
            onClick={() => setReflectionSavedMsg(true)}
            className="min-h-[42px] rounded-lg bg-[#0F294A] px-5 py-2 text-xs font-semibold text-white hover:bg-sky-900"
          >
            Simpan Refleksi
          </button>
        </div>
      </section>

      {/* Bagian E: Rangkuman & Pesan Penutup */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-[#0F294A] text-white">
        <div className="bugis-weave-rule" aria-hidden="true" />
        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold text-sky-300">Rangkuman &amp; Pesan Penutup</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white">
            Terus Berkarya di Ruang Digital dengan Etika &amp; Kebanggaan Lokal
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200">
            Melalui lima tahapan di E-Modul <strong>{MODULE_IDENTITY.title}</strong>—mengenali
            konsep dan hak cipta, mengeksplorasi peralatan, merancang storyboard, memproduksi
            karya di laboratorium, serta mengevaluasi bersama—kalian telah membuktikan bahwa
            pelajar SMA Negeri 4 Wajo mampu menjadi pencipta konten digital yang kreatif, kritis,
            dan bertanggung jawab.
          </p>
          <div className="mt-6 border-t border-white/15 pt-4 text-xs text-sky-200">
            <p>
              Disusun oleh <strong>{MODULE_IDENTITY.author}</strong> · {MODULE_IDENTITY.school}
            </p>
            <p className="mt-0.5 text-slate-300">{MODULE_IDENTITY.program}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
