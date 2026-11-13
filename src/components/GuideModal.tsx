import { X, Compass, Laptop, ShieldCheck, FileDown } from 'lucide-react';
import { MODULE_IDENTITY } from '../data/ebookData';
import { ChapterId } from '../types/ebook';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartLearning: (target: ChapterId) => void;
}

export function GuideModal({ isOpen, onClose, onStartLearning }: GuideModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-semibold text-sky-700">Panduan Belajar Murid</p>
            <h2
              id="guide-modal-title"
              className="mt-1 font-display text-xl font-bold text-[#0F294A]"
            >
              Petunjuk Penggunaan E-Modul {MODULE_IDENTITY.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup petunjuk penggunaan"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-slate-700">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 font-semibold text-[#0F294A]">
                <Compass className="h-4 w-4 text-sky-700" aria-hidden="true" />
                <span>Alur Belajar 5 Tahap</span>
              </div>
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-slate-600">
                <li>Pelajari konsep, jenis konten, dan etika di Bab 01.</li>
                <li>Eksplorasi kamera, Canva, dan Filmora/CapCut di Bab 02.</li>
                <li>Rancang ide dan storyboard budaya lokal di Bab 03.</li>
                <li>Produksi karya dan lengkapi daftar periksa di Bab 04.</li>
                <li>Kerjakan kuis ketuntasan, rubrik, dan refleksi di Bab 05.</li>
              </ol>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 font-semibold text-[#0F294A]">
                <Laptop className="h-4 w-4 text-sky-700" aria-hidden="true" />
                <span>Pendekatan Pembelajaran</span>
              </div>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                <li>
                  <strong className="text-slate-800">Memahami (Mindful):</strong> Mengamati contoh
                  karya dan video pengantar ber-caption.
                </li>
                <li>
                  <strong className="text-slate-800">Mengaplikasikan (Meaningful):</strong> Membuat
                  karya bertema budaya Bugis &amp; potensi Wajo.
                </li>
                <li>
                  <strong className="text-slate-800">Merefleksikan (Joyful):</strong> Mengikuti
                  galeri kelas dan saling memberi apresiasi.
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-sky-50/50 p-4">
            <div className="flex items-center gap-2 font-semibold text-[#0F294A]">
              <ShieldCheck className="h-4 w-4 text-sky-700" aria-hidden="true" />
              <span>Penyimpanan Otomatis &amp; Mode Luring</span>
            </div>
            <p className="mt-1.5 text-xs text-slate-700">
              Rancangan storyboard, progres bab, jawaban kuis, dan refleksi tersimpan otomatis di
              peramban Anda. Jika koneksi internet di sekolah terbatas, gunakan tombol{' '}
              <strong>Cetak / Simpan PDF</strong> di bagian atas atau tombol{' '}
              <strong>Unduh Template</strong> di Bab 03 untuk menyimpan salinan luring.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onStartLearning('pengenalan');
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#EA580C] px-5 py-2 text-sm font-semibold text-white hover:bg-orange-700"
          >
            <FileDown className="h-4 w-4 rotate-180" aria-hidden="true" />
            <span>Mulai dari Bab 01</span>
          </button>
        </div>
      </div>
    </div>
  );
}
