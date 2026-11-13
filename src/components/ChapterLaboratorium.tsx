import { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ClipboardCheck,
  Film,
  Image as ImageIcon,
  Send,
} from 'lucide-react';
import {
  ChapterId,
  ContentFormat,
  GalleryWork,
  QualityChecklistState,
  StoryboardPlan,
} from '../types/ebook';
import { countChecklistReady, validateGallerySubmission } from '../utils/ebookLogic';

interface ChapterLaboratoriumProps {
  plan: StoryboardPlan;
  checklist: QualityChecklistState;
  onChangeChecklist: (next: QualityChecklistState) => void;
  onSubmitWork: (work: GalleryWork) => void;
  onNavigateChapter: (id: ChapterId) => void;
}

const CHECKLIST_ITEMS: {
  key: keyof QualityChecklistState;
  title: string;
  detail: string;
}[] = [
  {
    key: 'clearResolution',
    title: 'Visual Tajam & Audio Jernih',
    detail: 'Gambar tidak buram/pecah dan suara narasi terdengar jelas di atas musik latar.',
  },
  {
    key: 'readableContrast',
    title: 'Keterbacaan & Kontras di Layar HP',
    detail: 'Teks judul dan isi memiliki kontras warna tinggi serta nyaman dibaca di smartphone.',
  },
  {
    key: 'factChecked',
    title: 'Cek Fakta & Akurasi Informasi',
    detail: 'Data, istilah budaya Bugis/Wajo, dan fakta edukasi sudah diperiksa kebenarannya.',
  },
  {
    key: 'copyrightAttribution',
    title: 'Hak Cipta & Atribusi Sumber',
    detail: 'Menggunakan aset buatan sendiri atau berlisensi terbuka dengan kredit sumber jelas.',
  },
  {
    key: 'privacyConsent',
    title: 'Persetujuan Publikasi & Privasi',
    detail: 'Tidak menampilkan data pribadi sensitif dan sudah meminta izin wajah narasumber.',
  },
];

export function ChapterLaboratorium({
  plan,
  checklist,
  onChangeChecklist,
  onSubmitWork,
  onNavigateChapter,
}: ChapterLaboratoriumProps) {
  const [activeTrack, setActiveTrack] = useState<'canva' | 'video'>(
    plan.format === 'Video Pendek' ? 'video' : 'canva'
  );

  const [studentOrGroup, setStudentOrGroup] = useState('');
  const [className, setClassName] = useState('XI Fase F-1');
  const [title, setTitle] = useState(plan.topic || '');
  const [format, setFormat] = useState<ContentFormat>(plan.format);
  const [localTheme, setLocalTheme] = useState('Budaya Bugis & Potensi Kabupaten Wajo');
  const [toolUsed, setToolUsed] = useState(plan.preferredTool || 'Canva');
  const [toolReason, setToolReason] = useState('');
  const [summary, setSummary] = useState('');
  const [workLink, setWorkLink] = useState('');

  const [submitState, setSubmitState] = useState<{
    status: 'idle' | 'error' | 'success';
    errors: string[];
  }>({ status: 'idle', errors: [] });

  const checklistProgress = countChecklistReady(checklist);

  const toggleCheck = (key: keyof QualityChecklistState) => {
    onChangeChecklist({ ...checklist, [key]: !checklist[key] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateGallerySubmission({
      studentOrGroup,
      className,
      title,
      localTheme,
      toolUsed,
      toolReason,
      summary,
    });

    if (!validation.isValid) {
      setSubmitState({ status: 'error', errors: validation.errors });
      return;
    }

    const newWork: GalleryWork = {
      id: `work-${Date.now()}`,
      studentOrGroup: studentOrGroup.trim(),
      className: className.trim(),
      title: title.trim(),
      format,
      localTheme: localTheme.trim(),
      toolUsed: toolUsed.trim(),
      toolReason: toolReason.trim(),
      summary: summary.trim(),
      workLink: workLink.trim() || undefined,
      appreciations: 1,
      createdAt: 'Baru Dikumpulkan',
      isUserSubmitted: true,
    };

    onSubmitWork(newWork);
    setSubmitState({ status: 'success', errors: [] });
    setStudentOrGroup('');
    setTitle('');
    setToolReason('');
    setSummary('');
    setWorkLink('');
  };

  return (
    <div className="space-y-10">
      {/* Header Bab */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <p className="text-xs font-semibold text-sky-700">
          Bab 04 · Tahap Mengaplikasikan (Meaningful)
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-[#0F294A] sm:text-3xl">
          Laboratorium Kreasi Digital
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Ikuti panduan produksi langkah demi langkah sesuai format pilihan Anda, periksa daftar
          kualitas dan hak cipta, lalu kumpulkan karya terbaik Anda ke Galeri Kelas.
        </p>

        {/* Live Storyboard Reference Strip */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-[#0F294A]">
              Rujukan Storyboard Aktif: {plan.topic || 'Belum diisi di Bab 03'}
            </span>
            <button
              type="button"
              onClick={() => onNavigateChapter('perencanaan')}
              className="font-semibold text-sky-700 hover:underline"
            >
              Ubah di Bab 03 →
            </button>
          </div>
          <p className="mt-1 text-slate-600">
            Format: <strong>{plan.format}</strong> · Audiens: {plan.audience || '-'} · Jumlah
            Adegan: <span className="tabular-nums">{plan.scenes.length}</span>
          </p>
        </div>
      </section>

      {/* Panduan Praktik Langkah Demi Langkah */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-[#0F294A]">
              Panduan Praktik Produksi &amp; Penyuntingan
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Pilih jalur praktik sesuai jenis karya yang sedang Anda kerjakan.
            </p>
          </div>

          <div
            className="inline-flex rounded-lg bg-slate-100 p-1"
            role="tablist"
            aria-label="Jalur panduan praktik"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTrack === 'canva'}
              onClick={() => setActiveTrack('canva')}
              className={`inline-flex min-h-[40px] items-center gap-2 rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeTrack === 'canva'
                  ? 'bg-white text-[#0F294A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="h-4 w-4" aria-hidden="true" />
              <span>Poster &amp; Infografis (Canva)</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTrack === 'video'}
              onClick={() => setActiveTrack('video')}
              className={`inline-flex min-h-[40px] items-center gap-2 rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeTrack === 'video'
                  ? 'bg-white text-[#0F294A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Film className="h-4 w-4" aria-hidden="true" />
              <span>Video Pendek (Filmora / CapCut)</span>
            </button>
          </div>
        </div>

        {activeTrack === 'canva' ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                step: '01',
                title: 'Atur Kanvas & Kisi Tata Letak',
                desc: 'Buka Canva, pilih ukuran Poster (4:5 atau A3) atau Infografis. Beri ruang kosong (margin) minimal 10% di tepi agar teks tidak sesak.',
              },
              {
                step: '02',
                title: 'Terapkan Hierarki Tipografi & Warna',
                desc: 'Gunakan maksimal 2 jenis huruf (misal Poppins untuk judul dan Open Sans untuk isi). Pastikan kontras teks gelap di latar terang atau sebaliknya.',
              },
              {
                step: '03',
                title: 'Masukkan Foto Lokal & Elemen Grafis',
                desc: 'Unggah foto asli kegiatan/budaya Wajo yang sudah Anda ambil. Hindari menumpuk elemen hiasan yang mengganggu keterbacaan pesan.',
              },
              {
                step: '04',
                title: 'Tambahkan Kredit Sumber & Ekspor',
                desc: 'Tulis nama pembuat, kelas, dan atribusi sumber di bagian kaki poster. Ekspor sebagai PNG beresolusi tinggi atau PDF standar.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <span className="font-mono text-xs font-bold text-sky-700 tabular-nums">
                  Langkah {item.step}
                </span>
                <h3 className="mt-1 font-display text-base font-bold text-[#0F294A]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                step: '01',
                title: 'Rekam Klip Sesuai Storyboard',
                desc: 'Ambil gambar pembuka, adegan inti, dan penutup sesuai panel Bab 03. Pastikan wajah subjek menghadap sumber cahaya dan kamera stabil.',
              },
              {
                step: '02',
                title: 'Susun & Potong di Timeline',
                desc: 'Buka Filmora atau CapCut, impor klip, lalu susun berurutan. Potong bagian hening/jeda agar alur video terasa padat (45–90 detik).',
              },
              {
                step: '03',
                title: 'Seimbangkan Audio & Tambah Caption',
                desc: 'Tambahkan rekaman narasi di jalur utama, turunkan volume musik latar bebas royalti (-20 dB), dan beri teks caption untuk poin penting.',
              },
              {
                step: '04',
                title: 'Tambahkan Kredit & Ekspor MP4 Hemat Kuota',
                desc: 'Tutup video dengan layar kredit sumber dan izin narasumber. Ekspor resolusi 720p atau 1080p dengan bitrate wajar agar mudah dibagikan.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <span className="font-mono text-xs font-bold text-[#EA580C] tabular-nums">
                  Langkah {item.step}
                </span>
                <h3 className="mt-1 font-display text-base font-bold text-[#0F294A]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Daftar Periksa Kualitas + Form Pengumpulan */}
      <section className="grid gap-6 lg:grid-cols-12">
        {/* Quality Checklist */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-sky-700" aria-hidden="true" />
              <h2 className="font-display text-lg font-bold text-[#0F294A]">
                Daftar Periksa Kualitas
              </h2>
            </div>
            <span className="font-mono text-xs font-semibold text-sky-800 tabular-nums">
              {checklistProgress.checkedCount}/{checklistProgress.totalCount} Siap
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Centang seluruh kriteria pemeriksaan mandiri sebelum memublikasikan karya Anda.
          </p>

          <div className="mt-5 space-y-3">
            {CHECKLIST_ITEMS.map((item) => {
              const checked = checklist[item.key];
              return (
                <label
                  key={item.key}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors ${
                    checked
                      ? 'border-emerald-300 bg-emerald-50/60'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCheck(item.key)}
                    className="mt-0.5 h-4 w-4 accent-emerald-700"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#0F294A]">{item.title}</p>
                    <p className="mt-0.5 text-xs text-slate-600">{item.detail}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Submission Form to Class Gallery */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7"
        >
          <h2 className="font-display text-xl font-bold text-[#0F294A]">
            Kumpulkan Karya ke Galeri Kelas
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Karya yang dikirim akan langsung tampil di pameran Galeri Karya pada Bab 05 untuk
            dipresentasikan dan diapresiasi teman sekelas.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="sub-name" className="block text-xs font-semibold text-slate-700">
                Nama Murid / Kelompok *
              </label>
              <input
                id="sub-name"
                type="text"
                value={studentOrGroup}
                onChange={(e) => setStudentOrGroup(e.target.value)}
                placeholder="Contoh: Kelompok 2 · Aisyah & Arif"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="sub-class" className="block text-xs font-semibold text-slate-700">
                Kelas *
              </label>
              <input
                id="sub-class"
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="XI Fase F-1"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="sub-title" className="block text-xs font-semibold text-slate-700">
                Judul Karya Digital *
              </label>
              <input
                id="sub-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Mengenal Motif Lipa' Sabbe Sengkang"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="sub-format" className="block text-xs font-semibold text-slate-700">
                Format Karya *
              </label>
              <select
                id="sub-format"
                value={format}
                onChange={(e) => setFormat(e.target.value as ContentFormat)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
              >
                <option value="Poster">Poster</option>
                <option value="Infografis">Infografis</option>
                <option value="Video Pendek">Video Pendek</option>
              </select>
            </div>

            <div>
              <label htmlFor="sub-tool" className="block text-xs font-semibold text-slate-700">
                Alat &amp; Aplikasi yang Digunakan *
              </label>
              <input
                id="sub-tool"
                type="text"
                value={toolUsed}
                onChange={(e) => setToolUsed(e.target.value)}
                placeholder="Canva / Filmora / CapCut"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="sub-theme" className="block text-xs font-semibold text-slate-700">
                Tema Budaya Lokal / Topik *
              </label>
              <input
                id="sub-theme"
                type="text"
                value={localTheme}
                onChange={(e) => setLocalTheme(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="sub-reason" className="block text-xs font-semibold text-slate-700">
                Alasan Pemilihan Alat &amp; Metode Produksi *
              </label>
              <textarea
                id="sub-reason"
                rows={2}
                value={toolReason}
                onChange={(e) => setToolReason(e.target.value)}
                placeholder="Jelaskan mengapa alat dan metode tersebut paling sesuai dengan karya Anda..."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="sub-summary" className="block text-xs font-semibold text-slate-700">
                Deskripsi Singkat Isi Karya *
              </label>
              <textarea
                id="sub-summary"
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Ceritakan pesan utama dan isi karya Anda..."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="sub-link" className="block text-xs font-semibold text-slate-700">
                Tautan Google Drive / Canva (opsional jika dikumpulkan luring)
              </label>
              <input
                id="sub-link"
                type="url"
                value={workLink}
                onChange={(e) => setWorkLink(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
              />
            </div>
          </div>

          {submitState.status === 'error' ? (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-950"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              <div>
                <p className="font-bold">Mohon lengkapi isian berikut:</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-4">
                  {submitState.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}

          {submitState.status === 'success' ? (
            <div
              role="status"
              className="mt-4 flex flex-col gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-950 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                <div>
                  <p className="font-bold">Karya Berhasil Dikirim ke Galeri Kelas!</p>
                  <p className="mt-0.5">
                    Anda dapat melihat karya pada bagian Galeri Karya di Bab 05.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigateChapter('evaluasi')}
                className="min-h-[36px] rounded-lg bg-emerald-700 px-3.5 py-1.5 font-semibold text-white hover:bg-emerald-800 whitespace-nowrap shrink-0"
              >
                Lihat Galeri Karya →
              </button>
            </div>
          ) : null}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#EA580C] px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>Kirim ke Galeri Karya</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
