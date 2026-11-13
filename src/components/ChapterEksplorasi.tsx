import { useState } from 'react';
import {
  AlertTriangle,
  Camera,
  Captions,
  CheckCircle2,
  Grid,
  Sliders,
  Volume2,
  Wrench,
} from 'lucide-react';
import { EBOOK_IMAGES, TOOL_SPECS } from '../data/ebookData';
import { ContentFormat, StudioSimSettings } from '../types/ebook';
import { evaluateStudioSimulation } from '../utils/ebookLogic';
import { ResilientImage } from './ResilientImage';

export function ChapterEksplorasi() {
  const [formatFilter, setFormatFilter] = useState<'Semua' | ContentFormat>('Semua');
  const [selectedToolId, setSelectedToolId] = useState<string>(TOOL_SPECS[0].id);
  const [sim, setSim] = useState<StudioSimSettings>({
    lightingLevel: 72,
    audioClarity: 80,
    ruleOfThirds: true,
    captionEnabled: true,
  });

  const filteredTools =
    formatFilter === 'Semua'
      ? TOOL_SPECS
      : TOOL_SPECS.filter((t) => t.recommendedFor.includes(formatFilter));

  const activeTool =
    filteredTools.find((t) => t.id === selectedToolId) ?? filteredTools[0] ?? TOOL_SPECS[0];

  const simEval = evaluateStudioSimulation(sim);

  // Visual brightness simulation for preview stage (avoid black-out)
  const brightnessCss = 0.45 + (sim.lightingLevel / 100) * 0.9;

  return (
    <div className="space-y-10">
      {/* Header Bab */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold text-sky-700">
              Bab 02 · Peralatan, Aplikasi &amp; Teknik Produksi
            </p>
            <h1 className="mt-2 font-display text-2xl font-bold text-[#0F294A] sm:text-3xl">
              Eksplorasi Peralatan dan Aplikasi
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Membuat konten digital berkualitas tidak selalu menuntut peralatan mahal. Kombinasi
              kamera smartphone, pencahayaan alami yang tepat, mikrofon yang dekat dengan sumber
              suara, serta aplikasi seperti <strong>Canva</strong> dan{' '}
              <strong>Filmora / CapCut</strong> sudah cukup menghasilkan karya siap publikasi.
            </p>

            <div className="mt-5">
              <p className="text-xs font-semibold text-slate-700">
                Saring alat sesuai format karya yang ingin dibuat:
              </p>
              <div className="mt-2 inline-flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
                {(['Semua', 'Poster', 'Infografis', 'Video Pendek'] as const).map((fmt) => {
                  const active = formatFilter === fmt;
                  return (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setFormatFilter(fmt)}
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
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 lg:col-span-5">
            <ResilientImage
              src={EBOOK_IMAGES.alatStudio}
              alt="Peralatan produksi konten digital: smartphone di tripod, kamera, mikrofon, buku storyboard, dan tablet penyunting video"
              caption="Perlengkapan Produksi Konten Digital"
              className="h-full max-h-[260px] w-full object-cover"
              aspectClassName="h-[240px]"
            />
          </div>
        </div>
      </section>

      {/* Two-column Tool & Tutorial Explorer */}
      <section className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-5">
          <h2 className="font-display text-lg font-bold text-[#0F294A]">
            Daftar Peralatan &amp; Aplikasi ({filteredTools.length})
          </h2>
          {filteredTools.map((tool) => {
            const isSelected = activeTool.id === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setSelectedToolId(tool.id)}
                className={`w-full rounded-xl border p-4 text-left transition-colors ${
                  isSelected
                    ? 'border-sky-600 bg-sky-50/70'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-sky-800">{tool.category}</span>
                  <span className="text-slate-500">{tool.recommendedFor.join(' · ')}</span>
                </div>
                <p className="mt-1 font-display text-base font-bold text-[#0F294A]">
                  {tool.name}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{tool.primaryRole}</p>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700">
            <Wrench className="h-4 w-4" aria-hidden="true" />
            <span>Panduan Praktis Aplikasi / Perangkat</span>
          </div>
          <h3 className="mt-1 font-display text-xl font-bold text-[#0F294A]">
            {activeTool.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{activeTool.primaryRole}</p>

          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Kelebihan Utama</h4>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                {activeTool.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-sky-700"
                      aria-hidden="true"
                    />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-200 pt-5">
              <h4 className="text-sm font-bold text-slate-900">Langkah Dasar Penggunaan</h4>
              <ol className="mt-3 space-y-2.5">
                {activeTool.steps.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0F294A] font-mono text-xs font-semibold text-white tabular-nums">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Lighting, Audio & Framing Simulator */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700">
              <Sliders className="h-4 w-4" aria-hidden="true" />
              <span>Simulasi Teknis Produksi</span>
            </div>
            <h2 className="mt-1 font-display text-xl font-bold text-[#0F294A]">
              Simulator Pencahayaan, Suara &amp; Komposisi
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Ubah parameter di bawah untuk melihat pengaruhnya terhadap kualitas bidikan kamera
              dan skor kesiapan produksi.
            </p>
          </div>

          <div
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold tabular-nums ${
              simEval.gradeLabel === 'Siap Produksi'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                : simEval.gradeLabel === 'Perlu Penyesuaian'
                  ? 'border-amber-200 bg-amber-50 text-amber-900'
                  : 'border-rose-200 bg-rose-50 text-rose-900'
            }`}
          >
            {simEval.gradeLabel === 'Siap Produksi' ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-700" aria-hidden="true" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-700" aria-hidden="true" />
            )}
            <span>
              Skor Kesiapan: {simEval.readinessScore}/100 · {simEval.gradeLabel}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Interactive Preview Canvas */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-xl border border-slate-300 bg-slate-900">
              <img
                src={EBOOK_IMAGES.posterWajo}
                alt="Pratinjau simulasi framing kamera pada objek budaya Wajo"
                style={{ filter: `brightness(${brightnessCss.toFixed(2)})` }}
                className="h-[320px] w-full object-cover transition-all duration-150"
              />

              {/* Rule of Thirds Overlay */}
              {sim.ruleOfThirds ? (
                <div
                  className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3"
                  aria-hidden="true"
                >
                  <div className="border-r border-b border-white/45" />
                  <div className="border-r border-b border-white/45" />
                  <div className="border-b border-white/45" />
                  <div className="border-r border-b border-white/45" />
                  <div className="border-r border-b border-white/45" />
                  <div className="border-b border-white/45" />
                  <div className="border-r border-white/45" />
                  <div className="border-r border-white/45" />
                  <div />
                </div>
              ) : null}

              {/* Top camera HUD */}
              <div className="absolute top-3 right-3 left-3 flex items-center justify-between text-xs font-mono text-white">
                <span className="rounded bg-slate-900/75 px-2.5 py-1 tabular-nums">
                  Cahaya {sim.lightingLevel}% · Audio {sim.audioClarity}%
                </span>
                <span className="rounded bg-slate-900/75 px-2.5 py-1">
                  {sim.ruleOfThirds ? 'Grid 3×3 Aktif' : 'Grid Nonaktif'}
                </span>
              </div>

              {/* Caption Preview */}
              {sim.captionEnabled ? (
                <div className="absolute right-4 bottom-4 left-4 rounded-lg bg-slate-950/85 px-4 py-2.5 text-center text-xs text-white">
                  [Caption] Motif tenun Lipa’ Sabbe mencerminkan identitas dan ketekunan masyarakat
                  Wajo.
                </div>
              ) : null}
            </div>
          </div>

          {/* Control Deck */}
          <div className="flex flex-col justify-between space-y-5 rounded-xl border border-slate-200 bg-slate-50 p-5 lg:col-span-5">
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-[#0F294A]">
                  <label htmlFor="sim-lighting" className="inline-flex items-center gap-2">
                    <Camera className="h-4 w-4 text-sky-700" aria-hidden="true" />
                    <span>Intensitas Pencahayaan</span>
                  </label>
                  <span className="font-mono text-xs text-slate-700 tabular-nums">
                    {sim.lightingLevel}% (Ideal: 60–85%)
                  </span>
                </div>
                <input
                  id="sim-lighting"
                  type="range"
                  min={15}
                  max={100}
                  value={sim.lightingLevel}
                  onChange={(e) =>
                    setSim((prev) => ({ ...prev, lightingLevel: Number(e.target.value) }))
                  }
                  className="mt-2 h-2 w-full cursor-pointer accent-sky-700"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-[#0F294A]">
                  <label htmlFor="sim-audio" className="inline-flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-sky-700" aria-hidden="true" />
                    <span>Kejernihan Audio Narasi</span>
                  </label>
                  <span className="font-mono text-xs text-slate-700 tabular-nums">
                    {sim.audioClarity}% (Ideal: ≥75%)
                  </span>
                </div>
                <input
                  id="sim-audio"
                  type="range"
                  min={15}
                  max={100}
                  value={sim.audioClarity}
                  onChange={(e) =>
                    setSim((prev) => ({ ...prev, audioClarity: Number(e.target.value) }))
                  }
                  className="mt-2 h-2 w-full cursor-pointer accent-sky-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setSim((p) => ({ ...p, ruleOfThirds: !p.ruleOfThirds }))}
                  aria-pressed={sim.ruleOfThirds}
                  className={`flex min-h-[44px] items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                    sim.ruleOfThirds
                      ? 'border-sky-600 bg-sky-50 text-[#0F294A]'
                      : 'border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <Grid className="h-4 w-4" aria-hidden="true" />
                  <span>Grid Rule of Thirds</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSim((p) => ({ ...p, captionEnabled: !p.captionEnabled }))}
                  aria-pressed={sim.captionEnabled}
                  className={`flex min-h-[44px] items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                    sim.captionEnabled
                      ? 'border-sky-600 bg-sky-50 text-[#0F294A]'
                      : 'border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <Captions className="h-4 w-4" aria-hidden="true" />
                  <span>Teks Caption</span>
                </button>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <p className="text-xs font-bold text-[#0F294A]">Rekomendasi Teknis:</p>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
                {simEval.tips.map((tip, i) => (
                  <li key={i}>• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
