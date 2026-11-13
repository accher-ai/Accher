import { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileText,
  Plus,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { SAMPLE_STORYBOARD } from '../data/ebookData';
import { ContentFormat, StoryboardPlan } from '../types/ebook';
import { formatStoryboardExportText, validateStoryboardPlan } from '../utils/ebookLogic';

interface ChapterPerencanaanProps {
  plan: StoryboardPlan;
  onChangePlan: (next: StoryboardPlan) => void;
}

const LOCAL_TOPIC_PRESETS = [
  'Filosofi & Proses Tenun Lipa’ Sabbe Sengkang',
  'Potensi Wisata & Ekosistem Danau Tempe Wajo',
  'Kuliner Tradisional Bugis di Kabupaten Wajo',
  'Kampanye Etika Digital & Anti-Hoaks di Sekolah',
];

export function ChapterPerencanaan({ plan, onChangePlan }: ChapterPerencanaanProps) {
  const [validationResult, setValidationResult] = useState<{
    checked: boolean;
    isValid: boolean;
    errors: string[];
  }>({ checked: false, isValid: false, errors: [] });

  const updateField = <K extends keyof StoryboardPlan>(key: K, value: StoryboardPlan[K]) => {
    onChangePlan({ ...plan, [key]: value });
  };

  const handleUpdateScene = (
    id: string,
    field: 'visualPlan' | 'narrationText' | 'audioAndDuration',
    value: string
  ) => {
    const nextScenes = plan.scenes.map((scene) =>
      scene.id === id ? { ...scene, [field]: value } : scene
    );
    onChangePlan({ ...plan, scenes: nextScenes });
  };

  const handleAddScene = () => {
    const nextNum = plan.scenes.length + 1;
    const newScene = {
      id: `sc-${Date.now()}`,
      sceneNumber: nextNum,
      visualPlan: '',
      narrationText: '',
      audioAndDuration: '',
    };
    onChangePlan({ ...plan, scenes: [...plan.scenes, newScene] });
  };

  const handleRemoveScene = (id: string) => {
    if (plan.scenes.length <= 1) return;
    const filtered = plan.scenes
      .filter((s) => s.id !== id)
      .map((s, idx) => ({ ...s, sceneNumber: idx + 1 }));
    onChangePlan({ ...plan, scenes: filtered });
  };

  const handleValidateAndSave = () => {
    const res = validateStoryboardPlan(plan);
    setValidationResult({ checked: true, isValid: res.isValid, errors: res.errors });
  };

  const handleDownloadTemplate = () => {
    const textContent = formatStoryboardExportText(plan);
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Template-Storyboard-Kreasi-Digital.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      {/* Header Bab */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-sky-700">
              Bab 03 · Perencanaan Ide &amp; Lembar Kerja Storyboard
            </p>
            <h1 className="mt-2 font-display text-2xl font-bold text-[#0F294A] sm:text-3xl">
              Perencanaan dan Storyboard
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
              Rancang ide konten digital Anda sebelum memulai produksi. Angkat tema budaya Bugis,
              potensi Kabupaten Wajo, atau literasi digital pelajar agar karya memiliki pesan yang
              kuat dan bermakna.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                onChangePlan(SAMPLE_STORYBOARD);
                setValidationResult({ checked: false, isValid: true, errors: [] });
              }}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-[#0F294A] hover:bg-slate-50 whitespace-nowrap"
            >
              <Sparkles className="h-4 w-4 text-[#EA580C]" aria-hidden="true" />
              <span>Muat Contoh Rancangan</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#0F294A] px-4 py-2 text-xs font-semibold text-white hover:bg-sky-900 whitespace-nowrap"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Unduh Template (.txt)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Form Konsep Utama */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-[#0F294A]">
          1. Identitas Konsep &amp; Audiens
        </h2>

        <div className="mt-4">
          <p className="text-xs font-semibold text-slate-700">
            Inspirasi Topik Cepat (klik untuk memakai):
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {LOCAL_TOPIC_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => updateField('topic', preset)}
                className="min-h-[36px] rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-sky-500 hover:bg-sky-50 hover:text-[#0F294A]"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="sb-topic" className="block text-sm font-semibold text-slate-800">
              Topik / Judul Rencana Konten
            </label>
            <input
              id="sb-topic"
              type="text"
              value={plan.topic}
              onChange={(e) => updateField('topic', e.target.value)}
              placeholder="Contoh: Pesona Rumah Apung Danau Tempe Wajo"
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="sb-format" className="block text-sm font-semibold text-slate-800">
              Format Konten Pilihan
            </label>
            <select
              id="sb-format"
              value={plan.format}
              onChange={(e) => updateField('format', e.target.value as ContentFormat)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
            >
              <option value="Poster">Poster</option>
              <option value="Infografis">Infografis</option>
              <option value="Video Pendek">Video Pendek</option>
            </select>
          </div>

          <div>
            <label htmlFor="sb-tool" className="block text-sm font-semibold text-slate-800">
              Alat &amp; Aplikasi Utama
            </label>
            <input
              id="sb-tool"
              type="text"
              value={plan.preferredTool}
              onChange={(e) => updateField('preferredTool', e.target.value)}
              placeholder="Contoh: Canva / Kamera Smartphone + Filmora"
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="sb-purpose" className="block text-sm font-semibold text-slate-800">
              Tujuan Konten
            </label>
            <input
              id="sb-purpose"
              type="text"
              value={plan.purpose}
              onChange={(e) => updateField('purpose', e.target.value)}
              placeholder="Contoh: Mengenalkan warisan tenun sutra kepada pelajar"
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="sb-audience" className="block text-sm font-semibold text-slate-800">
              Sasaran Audiens
            </label>
            <input
              id="sb-audience"
              type="text"
              value={plan.audience}
              onChange={(e) => updateField('audience', e.target.value)}
              placeholder="Contoh: Murid SMA & pengguna media sosial muda"
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="sb-message" className="block text-sm font-semibold text-slate-800">
              Pesan Utama (Key Message)
            </label>
            <textarea
              id="sb-message"
              rows={2}
              value={plan.keyMessage}
              onChange={(e) => updateField('keyMessage', e.target.value)}
              placeholder="Satu kalimat inti yang ingin diingat oleh audiens setelah melihat karya Anda..."
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Storyboard Panel Builder */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-[#0F294A]">
              2. Penyusunan Panel Storyboard ({plan.scenes.length} Adegan/Bagian)
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Susun minimal 3 bagian/adegan (Pembuka, Isi Utama, dan Penutup/Kredit Sumber).
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddScene}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-sky-600 bg-sky-50 px-4 py-2 text-xs font-semibold text-[#0F294A] hover:bg-sky-100 whitespace-nowrap shrink-0"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>Tambah Adegan</span>
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {plan.scenes.map((scene) => (
            <div
              key={scene.id}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-5"
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-sky-700" aria-hidden="true" />
                  <h3 className="font-display text-sm font-bold text-[#0F294A] tabular-nums">
                    Adegan / Panel 0{scene.sceneNumber}
                  </h3>
                </div>

                {plan.scenes.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => handleRemoveScene(scene.id)}
                    aria-label={`Hapus Adegan ${scene.sceneNumber}`}
                    className="inline-flex min-h-[34px] items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Hapus</span>
                  </button>
                ) : null}
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div>
                  <label
                    htmlFor={`vis-${scene.id}`}
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Rencana Visual / Tata Letak
                  </label>
                  <textarea
                    id={`vis-${scene.id}`}
                    rows={3}
                    value={scene.visualPlan}
                    onChange={(e) => handleUpdateScene(scene.id, 'visualPlan', e.target.value)}
                    placeholder="Contoh: Foto close-up kain sutra dengan judul besar di atas"
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-sky-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`nar-${scene.id}`}
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Teks Layar / Narasi Lisan
                  </label>
                  <textarea
                    id={`nar-${scene.id}`}
                    rows={3}
                    value={scene.narrationText}
                    onChange={(e) => handleUpdateScene(scene.id, 'narrationText', e.target.value)}
                    placeholder="Teks yang tampil atau diucapkan pada bagian ini..."
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-sky-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`aud-${scene.id}`}
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Audio / Durasi / Catatan Aset
                  </label>
                  <textarea
                    id={`aud-${scene.id}`}
                    rows={3}
                    value={scene.audioAndDuration}
                    onChange={(e) =>
                      handleUpdateScene(scene.id, 'audioAndDuration', e.target.value)
                    }
                    placeholder="Contoh: 10 detik · Musik instrumen bebas royalti"
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-sky-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Validation & Action Footer */}
        <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-600">
            Rancangan tersimpan otomatis dan dapat langsung dilihat di Bab 04 (Laboratorium
            Kreasi).
          </p>
          <button
            type="button"
            onClick={handleValidateAndSave}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#EA580C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 whitespace-nowrap shrink-0"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            <span>Periksa Kelengkapan Storyboard</span>
          </button>
        </div>

        {validationResult.checked ? (
          <div
            role="status"
            className={`mt-4 rounded-xl border p-4 text-sm ${
              validationResult.isValid
                ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                : 'border-amber-200 bg-amber-50 text-amber-950'
            }`}
          >
            {validationResult.isValid ? (
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                <div>
                  <p className="font-bold">Storyboard Lengkap &amp; Siap Diproduksi</p>
                  <p className="mt-0.5 text-xs">
                    Semua informasi konsep dan minimal 3 adegan sudah terisi. Silakan lanjut ke Bab
                    04 untuk panduan praktik produksi!
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2.5">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                <div>
                  <p className="font-bold">Perlu Dilengkapi Sebelum Produksi:</p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs">
                    {validationResult.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
}
