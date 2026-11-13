import coverImg from '../assets/images/cover_kreasi_digital_1794570136195.jpg';
import posterWajoImg from '../assets/images/contoh_poster_wajo_1794570136901.jpg';
import infografisEtikaImg from '../assets/images/contoh_infografis_etika_1794570137068.jpg';
import alatStudioImg from '../assets/images/alat_studio_produksi_1794570137465.jpg';

import {
  ChapterMeta,
  ContentExampleCard,
  GalleryWork,
  QuickCheckItem,
  QuizQuestion,
  RubricCriterion,
  StoryboardPlan,
  ToolSpec,
} from '../types/ebook';

export const EBOOK_IMAGES = {
  cover: coverImg,
  posterWajo: posterWajoImg,
  infografisEtika: infografisEtikaImg,
  alatStudio: alatStudioImg,
};

export const MODULE_IDENTITY = {
  title: 'KREASI DIGITAL',
  subtitle: 'E-Modul Interaktif Kreasi Konten Digital',
  heroHeadline: 'Belajar Merancang, Membuat, dan Memublikasikan Konten Digital',
  author: 'Yasser Arafat',
  school: 'UPT SMA Negeri 4 Wajo',
  subject: 'Informatika · Kelas XI Fase F',
  program: 'Program 10.000 Karya Digital Guru Tahun 2026 · Dinas Pendidikan Provinsi Sulawesi Selatan',
  learningObjective:
    'Murid mampu mengkreasi konten digital (poster, infografis, dan video) secara terencana dengan peralatan dan metode yang bervariasi, serta menjunjung tinggi etika digital dan hak cipta.',
  successIndicators: [
    'Minimal 80% murid mencapai nilai ketuntasan evaluasi pembelajaran.',
    'Minimal 80% murid menghasilkan satu produk konten digital sesuai rubrik.',
    'Setiap kelompok menghasilkan minimal satu karya layak publikasi bertema lokal.',
    'Murid mampu menjelaskan proses pembuatan serta alasan pemilihan alat dan metode.',
  ],
};

export const CHAPTERS: ChapterMeta[] = [
  {
    id: 'beranda',
    numberLabel: 'Sampul',
    shortLabel: 'Beranda',
    title: 'Beranda & Peta Modul',
    subtitle: 'Identitas modul, tujuan pembelajaran, petunjuk penggunaan, dan alur belajar.',
    estimatedMinutes: 5,
  },
  {
    id: 'pengenalan',
    numberLabel: 'Bab 01',
    shortLabel: 'Pengenalan',
    title: 'Pengenalan Kreasi Konten Digital',
    subtitle: 'Konsep, karakteristik, jenis konten, penentuan audiens, etika digital, dan hak cipta.',
    estimatedMinutes: 20,
  },
  {
    id: 'eksplorasi',
    numberLabel: 'Bab 02',
    shortLabel: 'Peralatan',
    title: 'Eksplorasi Peralatan dan Aplikasi',
    subtitle: 'Smartphone, kamera, mikrofon, Canva, Filmora/CapCut, serta simulasi pencahayaan dan komposisi.',
    estimatedMinutes: 25,
  },
  {
    id: 'perencanaan',
    numberLabel: 'Bab 03',
    shortLabel: 'Perencanaan',
    title: 'Perencanaan dan Storyboard',
    subtitle: 'Menentukan topik lokal Bugis/Wajo, pesan utama, naskah, dan menyusun panel storyboard.',
    estimatedMinutes: 25,
  },
  {
    id: 'laboratorium',
    numberLabel: 'Bab 04',
    shortLabel: 'Laboratorium',
    title: 'Laboratorium Kreasi Digital',
    subtitle: 'Panduan praktik membuat poster/infografis dan video, cek kualitas, dan pengumpulan karya.',
    estimatedMinutes: 35,
  },
  {
    id: 'evaluasi',
    numberLabel: 'Bab 05',
    shortLabel: 'Evaluasi',
    title: 'Evaluasi, Galeri Karya, dan Penutup',
    subtitle: 'Kuis ketuntasan, rubrik penilaian proyek, refleksi belajar, dan pameran karya kelas.',
    estimatedMinutes: 20,
  },
];

export const VIDEO_LESSON_SCENES = [
  {
    step: 1,
    timestamp: '00:00 – 00:35',
    heading: 'Dari Konsumen Menjadi Kreator Produktif',
    visualCue: 'Ilustrasi pelajar SMA mengamati berita dan konten media sosial lalu merancang ide karya sendiri.',
    caption:
      'Setiap hari kita melihat ratusan poster dan video di layar ponsel. Sebagai pelajar Informatika Fase F, kita tidak cukup hanya menjadi pengguna pasif—kita belajar merancang konten yang informatif, akurat, dan bermanfaat.',
  },
  {
    step: 2,
    timestamp: '00:36 – 01:15',
    heading: 'Mengenal Karakteristik Konten Berkualitas',
    visualCue: 'Perbandingan tata letak poster yang padat teks vs poster dengan hierarki judul dan kontras jelas.',
    caption:
      'Konten digital yang baik memiliki pesan tunggal yang jelas, mudah dibaca di layar HP, didukung data atau fakta tepercaya, serta memadukan teks, visual, dan audio secara seimbang.',
  },
  {
    step: 3,
    timestamp: '01:16 – 01:55',
    heading: 'Etika Digital, Hak Cipta & Atribusi',
    visualCue: 'Ikon perisai hak cipta, lisensi Creative Commons, dan pencantuman nama sumber.',
    caption:
      'Sebelum memublikasikan karya, pastikan kita tidak mengambil gambar atau musik tanpa izin. Gunakan aset berlisensi terbuka, cantumkan atribusi pemilik karya, dan minta persetujuan apabila menampilkan wajah orang lain.',
  },
];

export const CONTENT_EXAMPLES: ContentExampleCard[] = [
  {
    id: 'ex-poster',
    title: 'Poster Budaya: Lipa’ Sabbe & Danau Tempe',
    format: 'Poster',
    topic: 'Warisan Budaya Bugis & Potensi Kabupaten Wajo',
    imagePath: posterWajoImg,
    purpose: 'Mengenalkan kekayaan tenun sutra Sengkang dan rumah apung Danau Tempe kepada generasi muda.',
    audience: 'Pelajar SMA dan wisatawan muda pengguna media sosial (usia 15–22 tahun).',
    keyMessage: 'Melestarikan tenun Lipa’ Sabbe berarti menjaga identitas budaya dan ekonomi kreatif Wajo.',
    ethicsNote: 'Foto dan ilustrasi dibuat sendiri atau memakai aset Canva berlisensi bebas dengan pencantuman sumber.',
  },
  {
    id: 'ex-infografis',
    title: 'Infografis: Alur Produksi Konten Etis',
    format: 'Infografis',
    topic: 'Literasi Digital dan Hak Cipta Pelajar',
    imagePath: infografisEtikaImg,
    purpose: 'Menjelaskan 4 langkah produksi konten dari perekaman hingga publikasi yang aman secara hukum.',
    audience: 'Murid kelas XI SMA yang aktif membuat tugas proyek digital.',
    keyMessage: 'Rancang dengan storyboard, periksa lisensi hak cipta, baru publikasikan ke ruang publik.',
    ethicsNote: 'Menggunakan ikon vektor orisinal dan menyebut rujukan Undang-Undang Hak Cipta serta lisensi terbuka.',
  },
  {
    id: 'ex-video',
    title: 'Video Pendek: Sehari di Sentra Tenun Sengkang',
    format: 'Video Pendek',
    topic: 'Ekonomi Kreatif Lokal Sulawesi Selatan',
    imagePath: coverImg,
    purpose: 'Mendokumentasikan proses menenun benang sutra secara ringkas dalam durasi 60 detik.',
    audience: 'Pengguna platform video vertikal dan masyarakat umum.',
    keyMessage: 'Setiap helai kain sutra melewati ketekunan perajin lokal yang layak diapresiasi.',
    ethicsNote: 'Merekam wawancara dengan izin narasumber, memakai musik bebas royalti, dan menyertakan teks/caption.',
  },
];

export const PENGENALAN_QUICK_CHECK: QuickCheckItem[] = [
  {
    id: 'qc1',
    question:
      'Mengapa penentuan sasaran audiens perlu dilakukan sebelum memilih format dan gaya desain konten?',
    options: [
      'Agar ukuran file konten otomatis menjadi lebih kecil saat diunggah.',
      'Agar bahasa, gaya visual, dan media publikasi sesuai dengan kebutuhan penerima pesan.',
      'Supaya kita tidak perlu membuat storyboard sebelum merekam video.',
    ],
    correctIndex: 1,
    explanation:
      'Mengenali audiens membantu menentukan gaya bahasa, jenis visual, dan saluran publikasi yang paling efektif.',
  },
  {
    id: 'qc2',
    question:
      'Saat menemukan foto Danau Tempe di internet tanpa keterangan bebas pakai, tindakan paling etis adalah...',
    options: [
      'Mengunduh dan menghapus tanda air (watermark) pemilik foto agar terlihat rapi.',
      'Tetap memakainya tanpa menulis sumber karena foto tersebut sudah ada di mesin pencari.',
      'Meminta izin pemilik atau menggantinya dengan foto karya sendiri / sumber berlisensi terbuka beserta atribusi.',
    ],
    correctIndex: 2,
    explanation:
      'Menghargai hak cipta berarti menggunakan karya milik sendiri, aset berlisensi terbuka dengan atribusi, atau meminta izin resmi.',
  },
  {
    id: 'qc3',
    question:
      'Mengapa video edukasi disarankan menyertakan teks keterangan (caption/subtitle)?',
    options: [
      'Membantu aksesibilitas bagi penonton dengan gangguan dengar atau saat menonton tanpa suara.',
      'Agar durasi video dapat diperpanjang dua kali lipat.',
      'Untuk menggantikan seluruh gambar visual di dalam video.',
    ],
    correctIndex: 0,
    explanation:
      'Sesuai prinsip aksesibilitas, caption memastikan informasi utama tetap terbaca meski audio dimatikan atau oleh penyandang disabilitas.',
  },
];

export const TOOL_SPECS: ToolSpec[] = [
  {
    id: 'tool-smartphone',
    name: 'Kamera Smartphone & Mikrofon',
    category: 'Perangkat Keras',
    primaryRole: 'Perekaman foto, video, dan suara narasi secara portabel di kelas maupun lapangan.',
    strengths: [
      'Mudah dibawa dan sudah dimiliki sebagian besar murid.',
      'Mendukung garis kisi (grid) Rule of Thirds dan perekaman HD.',
      'Dapat dipasangkan dengan tripod meja dan mikrofon clip-on agar stabil serta jernih.',
    ],
    recommendedFor: ['Poster', 'Infografis', 'Video Pendek'],
    steps: [
      'Bersihkan lensa kamera sebelum memotret atau merekam.',
      'Aktifkan fitur Grid 3×3 di pengaturan kamera untuk komposisi seimbang.',
      'Hadapkan subjek ke arah sumber cahaya alami (jendela), hindari membelakangi cahaya.',
      'Dekatkan mikrofon 15–20 cm dari pembicara dan hindari tempat berangin.',
    ],
  },
  {
    id: 'tool-canva',
    name: 'Canva',
    category: 'Aplikasi Desain',
    primaryRole: 'Platform utama desain poster, infografis, presentasi, dan ekspor PDF/gambar.',
    strengths: [
      'Berjalan mulus di HP maupun laptop melalui peramban atau aplikasi.',
      'Menyediakan templat, tata letak kisi, dan integrasi teks-gambar yang cepat.',
      'Mendukung kolaborasi kelompok dan tautan berbagi hasil desain.',
    ],
    recommendedFor: ['Poster', 'Infografis'],
    steps: [
      'Pilih ukuran kanvas sesuai format (Poster A3/Instagram 4:5 atau Infografis memanjang).',
      'Terapkan palet warna konsisten (maksimal 3–4 warna utama) dan kontras teks tinggi.',
      'Susun hierarki ukuran huruf: Judul besar (24–32 pt), subjudul, lalu isi ringkas.',
      'Unduh dalam format PNG/PDF beresolusi tinggi atau salin tautan lihat saja.',
    ],
  },
  {
    id: 'tool-filmora',
    name: 'Wondershare Filmora & CapCut',
    category: 'Aplikasi Video',
    primaryRole: 'Penyuntingan video multitrack, pemotongan klip, audio latar, dan penambahan subtitle.',
    strengths: [
      'Antarmuka timeline jelas untuk menyusun klip pembuka, isi, dan penutup.',
      'Tersedia fitur penyesuaian volume musik latar agar tidak menenggelamkan suara narator.',
      'Mendukung teks keterangan (caption) dan ekspor MP4 terkompresi agar hemat kuota.',
    ],
    recommendedFor: ['Video Pendek'],
    steps: [
      'Impor seluruh klip video dan rekaman suara hasil produksi ke media bin.',
      'Susun klip sesuai urutan adegan storyboard, potong bagian jeda yang tidak perlu.',
      'Tambahkan teks judul dan caption singkat pada setiap penjelasan penting.',
      'Atur volume musik latar sekitar -18 dB hingga -22 dB agar narasi tetap terdengar jelas.',
    ],
  },
  {
    id: 'tool-drive-forms',
    name: 'Google Drive & Google Forms',
    category: 'Evaluasi & Penyimpanan',
    primaryRole: 'Penyimpanan aset proyek kolaboratif, pengumpulan tugas, dan instrumen evaluasi kelas.',
    strengths: [
      'Memudahkan pengumpulan tautan karya agar dapat diakses guru dan teman sekelas.',
      'Menyimpan cadangan aset foto, naskah, dan PDF modul agar tetap aman.',
    ],
    recommendedFor: ['Poster', 'Infografis', 'Video Pendek'],
    steps: [
      'Buat folder kelompok di Google Drive dengan penamaan rapi (mis. XI-F1_Kelompok2_Wajo).',
      'Unggah berkas final dan atur izin akses tautan ke "Siapa saja yang memiliki tautan dapat melihat".',
      'Tempel tautan karya ke formulir pengumpulan kelas beserta refleksi singkat.',
    ],
  },
];

export const SAMPLE_STORYBOARD: StoryboardPlan = {
  topic: 'Filosofi dan Proses Pembuatan Lipa’ Sabbe Sengkang',
  purpose: 'Mengedukasi pelajar tentang nilai budaya dan ketekunan di balik kain sutra khas Wajo.',
  audience: 'Pelajar SMA/SMK dan generasi muda di Sulawesi Selatan.',
  keyMessage: 'Mengenakan dan mempromosikan Lipa’ Sabbe berarti ikut menjaga warisan leluhur Bugis.',
  format: 'Video Pendek',
  preferredTool: 'Kamera Smartphone + Filmora / CapCut',
  scenes: [
    {
      id: 'sc-1',
      sceneNumber: 1,
      visualPlan: 'Close-up helai kain Lipa’ Sabbe bermotif Balo Renni dengan cahaya pagi dari samping.',
      narrationText: 'Tahukah kamu? Satu lembar sarung sutra Wajo menyimpan filosofi hidup masyarakat Bugis.',
      audioAndDuration: 'Musik kecapi lembut · 00:00–00:08 (8 detik)',
    },
    {
      id: 'sc-2',
      sceneNumber: 2,
      visualPlan: 'Medium shot perajin menenun menggunakan alat tenun bukan mesin (gedogan), sudut 45 derajat.',
      narrationText: 'Proses menenun membutuhkan ketelitian tinggi dari pemintalan benang hingga penyusunan motif.',
      audioAndDuration: 'Suara alat tenun + narasi · 00:09–00:25 (17 detik)',
    },
    {
      id: 'sc-3',
      sceneNumber: 3,
      visualPlan: 'Tampilan infografis singkat 3 motif populer Wajo di layar dengan teks besar terbaca.',
      narrationText: 'Motif Balo Tettong melambangkan keteguhan, sedangkan Cobo melambangkan harapan dan kebaikan.',
      audioAndDuration: 'Narasi jernih + caption · 00:26–00:45 (20 detik)',
    },
    {
      id: 'sc-4',
      sceneNumber: 4,
      visualPlan: 'Pelajar SMA memakai selendang sutra sambil tersenyum, diakhiri kredit sumber & ucapan terima kasih.',
      narrationText: 'Mari bangga memakai dan mengenalkan karya lokal Wajo di ruang digital!',
      audioAndDuration: 'Musik penutup + kredit izin · 00:46–00:58 (13 detik)',
    },
  ],
};

export const INITIAL_GALLERY_WORKS: GalleryWork[] = [
  {
    id: 'gal-1',
    studentOrGroup: 'Kelompok 1 · Andi Nurul & Tim',
    className: 'XI Fase F-1',
    title: 'Menjaga Ekosistem Danau Tempe sebagai Jantung Wajo',
    format: 'Poster',
    localTheme: 'Potensi Wisata & Lingkungan Danau Tempe',
    toolUsed: 'Canva + Kamera Smartphone',
    toolReason:
      'Canva dipilih karena memudahkan penyusunan hierarki tipografi poster agar mudah dibaca di layar HP.',
    summary:
      'Poster edukasi yang memadukan ilustrasi rumah apung Danau Tempe dan 3 aksi nyata pelajar menjaga kebersihan danau.',
    appreciations: 14,
    createdAt: '12 November 2026',
  },
  {
    id: 'gal-2',
    studentOrGroup: 'Kelompok 3 · Muh. Fadli & Risma',
    className: 'XI Fase F-2',
    title: 'Jejak Sutra Sengkang: Dari Benang Hingga Karya Digital',
    format: 'Infografis',
    localTheme: 'Budaya Bugis & Kerajinan Lipa’ Sabbe',
    toolUsed: 'Canva',
    toolReason:
      'Format infografis vertikal di Canva cocok untuk menampilkan tahapan berurutan secara ringkas dan sistematis.',
    summary:
      'Infografis 5 langkah proses tenun sutra Wajo lengkap dengan atribusi foto kunjungan sentra tenun setempat.',
    appreciations: 19,
    createdAt: '13 November 2026',
  },
  {
    id: 'gal-3',
    studentOrGroup: 'Kelompok 4 · Besse Aulia & Rekan',
    className: 'XI Fase F-1',
    title: 'Tutorial Singkat Cek Fakta & Lisensi Foto Sebelum Posting',
    format: 'Video Pendek',
    localTheme: 'Etika Digital Pelajar SMA Negeri 4 Wajo',
    toolUsed: 'Smartphone + CapCut + Mikrofon Clip-on',
    toolReason:
      'CapCut memungkinkan penambahan teks subtitle otomatis dan pengaturan volume audio narasi agar jelas.',
    summary:
      'Video berdurasi 55 detik yang memperagakan cara mencari aset Creative Commons dan menulis kredit sumber.',
    appreciations: 22,
    createdAt: '14 November 2026',
  },
];

export const EVALUATION_QUIZ: QuizQuestion[] = [
  {
    id: 'eq-1',
    chapterRef: 'Bab 01 · Konsep Konten',
    question: 'Urutan alur produksi konten digital yang sistematis sesuai panduan modul ini adalah...',
    options: [
      'Langsung publikasi → Mengedit video → Menentukan audiens → Membuat storyboard',
      'Mengenali konsep → Menentukan ide & audiens → Membuat storyboard → Produksi/edit → Evaluasi & publikasi',
      'Memilih aplikasi berbayar → Mengunggah ke media sosial → Menghapus draf → Cek fakta',
    ],
    correctIndex: 1,
    explanation:
      'Perencanaan ide, audiens, dan storyboard sebelum produksi mencegah pemborosan waktu serta menjaga kesesuaian pesan.',
  },
  {
    id: 'eq-2',
    chapterRef: 'Bab 01 · Etika Digital',
    question:
      'Ketika menggunakan musik latar dari sumber terbuka (Creative Commons Attribution / CC BY) dalam video edukasi, kreator wajib...',
    options: [
      'Mencantumkan nama pencipta dan sumber musik di deskripsi atau kredit akhir video.',
      'Menjual musik tersebut secara terpisah sebagai karya pribadi.',
      'Mempercepat tempo musik agar tidak dikenali pemilik aslinya.',
    ],
    correctIndex: 0,
    explanation:
      'Lisensi CC BY memperbolehkan penggunaan karya sepanjang kita mencantumkan atribusi pencipta aslinya secara jelas.',
  },
  {
    id: 'eq-3',
    chapterRef: 'Bab 02 · Peralatan',
    question:
      'Fungsi utama mengaktifkan garis bantu (grid) Rule of Thirds pada kamera smartphone saat merekam adalah...',
    options: [
      'Menambah kecerahan lampu ruangan secara otomatis.',
      'Membantu menempatkan subjek utama pada titik pertemuan garis agar komposisi seimbang dan enak dilihat.',
      'Memperkecil ukuran resolusi video sebelum masuk ke aplikasi penyunting.',
    ],
    correctIndex: 1,
    explanation:
      'Rule of Thirds membagi bingkai menjadi 9 kotak sehingga penempatan objek dan ruang pandang terasa alami.',
  },
  {
    id: 'eq-4',
    chapterRef: 'Bab 02 · Aplikasi',
    question:
      'Mengapa pada penyuntingan video di Filmora/CapCut volume musik latar perlu diturunkan di bawah suara narator?',
    options: [
      'Agar suara penjelasan narator tetap terdengar jernih dan tidak tertutup musik.',
      'Supaya durasi video otomatis terpotong menjadi lebih pendek.',
      'Karena aplikasi video tidak mendukung dua jalur audio sekaligus.',
    ],
    correctIndex: 0,
    explanation:
      'Keseimbangan audio (audio mixing) memastikan informasi utama dari suara narator tersampaikan tanpa gangguan.',
  },
  {
    id: 'eq-5',
    chapterRef: 'Bab 03 · Perencanaan',
    question: 'Komponen inti yang wajib ada pada setiap baris adegan dalam storyboard adalah...',
    options: [
      'Harga perangkat lunak dan merek ponsel pengembang.',
      'Rencana visual/tata letak, teks atau narasi yang disampaikan, serta catatan audio/durasi.',
      'Daftar nilai rapor seluruh anggota kelompok.',
    ],
    correctIndex: 1,
    explanation:
      'Storyboard menjadi peta kerja visual dan naratif sehingga tim produksi tahu apa yang harus diambil di setiap adegan.',
  },
  {
    id: 'eq-6',
    chapterRef: 'Bab 04 · Kualitas & Desain',
    question:
      'Untuk menjamin keterbacaan poster digital di layar smartphone murid, ukuran huruf isi dan kontras yang disarankan adalah...',
    options: [
      'Teks isi sangat kecil (6 pt) dengan warna abu-abu muda di atas latar putih.',
      'Teks ringkas ukuran terbaca (14–16 pt pada desain halaman), hierarki jelas, dan kontras teks-latar tinggi.',
      'Menggunakan 7 jenis huruf berbeda dalam satu halaman agar tampak ramai.',
    ],
    correctIndex: 1,
    explanation:
      'Kontras tinggi dan hierarki judul–subjudul–isi yang ringkas membuat konten nyaman dibaca di HP maupun laptop.',
  },
  {
    id: 'eq-7',
    chapterRef: 'Bab 04 · Privasi & Publikasi',
    question:
      'Sebelum memublikasikan foto atau wawancara warga/teman dalam proyek budaya lokal Wajo, langkah yang tepat adalah...',
    options: [
      'Mengunggah langsung beserta nomor telepon dan alamat rumah narasumber.',
      'Meminta persetujuan narasumber dan memastikan tidak mencantumkan data pribadi sensitif.',
      'Menyebarkan foto tanpa memberi tahu narasumber agar menjadi kejutan.',
    ],
    correctIndex: 1,
    explanation:
      'Menjaga privasi dan meminta izin publikasi adalah bagian wajib dari etika digital.',
  },
  {
    id: 'eq-8',
    chapterRef: 'Bab 05 · Evaluasi & Antisipasi',
    question:
      'Apabila saat presentasi di kelas koneksi internet sekolah mendadak terputus, langkah antisipasi terbaik sesuai modul ini adalah...',
    options: [
      'Membatalkan pengumpulan karya tanpa pemberitahuan.',
      'Menyiapkan salinan luring berupa berkas PDF atau video terkompresi di perangkat penyimpanan.',
      'Menghapus seluruh proyek di aplikasi desain.',
    ],
    correctIndex: 1,
    explanation:
      'Menyimpan salinan berkas luring (PDF/MP4 terkompresi) menjamin karya tetap dapat diakses dan dinilai meski internet terkendala.',
  },
];

export const RUBRIC_CRITERIA: RubricCriterion[] = [
  {
    id: 'rub-1',
    aspect: 'Perencanaan & Storyboard',
    description: 'Kejelasan ide, penentuan audiens, pesan utama, dan kelengkapan adegan storyboard.',
    levels: [
      { score: 4, label: 'Sangat Baik', descriptor: 'Ide orisinal bertema lokal jelas, audiens tepat, storyboard lengkap & runtut.' },
      { score: 3, label: 'Baik', descriptor: 'Ide dan audiens jelas, storyboard mencakup alur utama dengan baik.' },
      { score: 2, label: 'Cukup', descriptor: 'Perencanaan ada namun beberapa bagian visual atau narasi kurang rinci.' },
      { score: 1, label: 'Perlu Bimbingan', descriptor: 'Tidak menyusun storyboard sebelum memproduksi karya.' },
    ],
  },
  {
    id: 'rub-2',
    aspect: 'Kualitas Visual, Audio & Keterbacaan',
    description: 'Komposisi, pencahayaan, kejelasan suara/caption, kontras warna, dan tipografi.',
    levels: [
      { score: 4, label: 'Sangat Baik', descriptor: 'Visual tajam, pencahayaan seimbang, teks sangat terbaca di HP, audio jernih + caption.' },
      { score: 3, label: 'Baik', descriptor: 'Visual dan suara cukup jelas, tata letak rapi meski ada minor perbaikan.' },
      { score: 2, label: 'Cukup', descriptor: 'Sebagian teks kurang kontras atau suara latar masih mengganggu narasi.' },
      { score: 1, label: 'Perlu Bimbingan', descriptor: 'Gambar buram/gelap, teks bertumpuk sulit dibaca, atau audio tidak terdengar.' },
    ],
  },
  {
    id: 'rub-3',
    aspect: 'Kesesuaian Isi & Potensi Lokal',
    description: 'Keakuratan fakta dan keterkaitan pesan dengan budaya Bugis, potensi Wajo, atau literasi digital.',
    levels: [
      { score: 4, label: 'Sangat Baik', descriptor: 'Informasi akurat, mendalam, dan mengangkat konteks lokal secara kreatif.' },
      { score: 3, label: 'Baik', descriptor: 'Informasi benar dan relevan dengan tujuan pembelajaran.' },
      { score: 2, label: 'Cukup', descriptor: 'Isi masih umum dan kurang menonjolkan pesan utama.' },
      { score: 1, label: 'Perlu Bimbingan', descriptor: 'Isi menyimpang dari topik atau memuat informasi yang belum diverifikasi.' },
    ],
  },
  {
    id: 'rub-4',
    aspect: 'Etika Digital & Hak Cipta',
    description: 'Penggunaan aset legal/orisinal, pencantuman atribusi sumber, dan perlindungan privasi.',
    levels: [
      { score: 4, label: 'Sangat Baik', descriptor: 'Seluruh aset orisinal/berlisensi terbuka, atribusi lengkap, dan bebas pelanggaran privasi.' },
      { score: 3, label: 'Baik', descriptor: 'Menggunakan aset aman dengan atribusi cukup jelas.' },
      { score: 2, label: 'Cukup', descriptor: 'Terdapat aset pihak ketiga yang belum dilengkapi keterangan sumber.' },
      { score: 1, label: 'Perlu Bimbingan', descriptor: 'Mengambil karya berhak cipta tanpa izin atau menampilkan data pribadi.' },
    ],
  },
  {
    id: 'rub-5',
    aspect: 'Refleksi Proses & Pemilihan Alat',
    description: 'Kemampuan menjelaskan langkah produksi serta alasan pemilihan alat dan metode.',
    levels: [
      { score: 4, label: 'Sangat Baik', descriptor: 'Menjelaskan alasan teknis pemilihan alat, kendala, dan solusi dengan sangat runtut.' },
      { score: 3, label: 'Baik', descriptor: 'Mampu menjelaskan alat yang dipakai dan alasan utamanya dengan jelas.' },
      { score: 2, label: 'Cukup', descriptor: 'Menyebutkan nama alat namun alasan pemilihannya masih singkat.' },
      { score: 1, label: 'Perlu Bimbingan', descriptor: 'Belum dapat menjelaskan proses produksi maupun alasan pemilihan alat.' },
    ],
  },
];
