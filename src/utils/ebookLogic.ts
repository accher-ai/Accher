import {
  ChapterId,
  GalleryWork,
  QualityChecklistState,
  QuizQuestion,
  ReflectionForm,
  StoryboardPlan,
  StudioSimSettings,
} from '../types/ebook';

export const PASSING_SCORE_PERCENT = 80;

export function calculateModuleProgress(
  completedChapters: ChapterId[],
  totalChapters: number = 5
): { completedCount: number; totalCount: number; percentage: number } {
  const trackable = new Set(
    completedChapters.filter((id) => id !== 'beranda')
  );
  const completedCount = Math.min(trackable.size, totalChapters);
  const percentage =
    totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;
  return {
    completedCount,
    totalCount: totalChapters,
    percentage,
  };
}

export function evaluateQuiz(
  questions: QuizQuestion[],
  answers: Record<string, number>
): {
  answeredCount: number;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  isComplete: boolean;
  isPassed: boolean;
  statusLabel: 'Tuntas' | 'Perlu Pendalaman' | 'Belum Selesai';
} {
  const totalQuestions = questions.length;
  let answeredCount = 0;
  let correctCount = 0;

  for (const q of questions) {
    const selected = answers[q.id];
    if (typeof selected === 'number') {
      answeredCount += 1;
      if (selected === q.correctIndex) {
        correctCount += 1;
      }
    }
  }

  const percentage =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const isComplete = totalQuestions > 0 && answeredCount === totalQuestions;
  const isPassed = isComplete && percentage >= PASSING_SCORE_PERCENT;

  let statusLabel: 'Tuntas' | 'Perlu Pendalaman' | 'Belum Selesai' = 'Belum Selesai';
  if (isComplete) {
    statusLabel = isPassed ? 'Tuntas' : 'Perlu Pendalaman';
  }

  return {
    answeredCount,
    correctCount,
    totalQuestions,
    percentage,
    isComplete,
    isPassed,
    statusLabel,
  };
}

export function calculateRubricSummary(
  scores: Record<string, number>,
  totalCriteria: number = 5
): {
  ratedCount: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  predicate: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan' | 'Belum Lengkap';
} {
  const values = Object.values(scores).filter(
    (v) => typeof v === 'number' && v >= 1 && v <= 4
  );
  const ratedCount = values.length;
  const totalScore = values.reduce((acc, v) => acc + v, 0);
  const maxScore = totalCriteria * 4;
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  let predicate: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan' | 'Belum Lengkap' =
    'Belum Lengkap';
  if (ratedCount >= totalCriteria && totalCriteria > 0) {
    if (percentage >= 85) predicate = 'Sangat Baik';
    else if (percentage >= 75) predicate = 'Baik';
    else if (percentage >= 60) predicate = 'Cukup';
    else predicate = 'Perlu Bimbingan';
  }

  return {
    ratedCount,
    totalScore,
    maxScore,
    percentage,
    predicate,
  };
}

export function evaluateStudioSimulation(settings: StudioSimSettings): {
  readinessScore: number;
  gradeLabel: 'Siap Produksi' | 'Perlu Penyesuaian' | 'Kurang Optimal';
  tips: string[];
} {
  let score = 0;
  const tips: string[] = [];

  // Lighting ideal window: 60 - 85
  if (settings.lightingLevel >= 60 && settings.lightingLevel <= 85) {
    score += 35;
  } else if (settings.lightingLevel >= 40 && settings.lightingLevel <= 95) {
    score += 22;
    tips.push(
      settings.lightingLevel < 60
        ? 'Tambah intensitas cahaya depan atau arahkan wajah ke jendela agar detail jelas.'
        : 'Kurangi cahaya berlebih agar sorotan tidak overexposed (silau).'
    );
  } else {
    score += 10;
    tips.push('Atur ulang pencahayaan di kisaran 60%–85% untuk eksposur seimbang.');
  }

  // Audio clarity ideal >= 70
  if (settings.audioClarity >= 75) {
    score += 35;
  } else if (settings.audioClarity >= 50) {
    score += 20;
    tips.push('Gunakan mikrofon eksternal atau rekam di ruangan tenang agar suara vokal jernih.');
  } else {
    score += 8;
    tips.push('Kebisingan terlalu tinggi. Dekatkan mikrofon 15–20 cm dari pembicara.');
  }

  if (settings.ruleOfThirds) {
    score += 15;
  } else {
    tips.push('Aktifkan garis bantu Rule of Thirds agar subjek utama proporsional.');
  }

  if (settings.captionEnabled) {
    score += 15;
  } else {
    tips.push('Sertakan teks/caption agar konten tetap informatif saat diputar tanpa suara.');
  }

  const gradeLabel: 'Siap Produksi' | 'Perlu Penyesuaian' | 'Kurang Optimal' =
    score >= 85 ? 'Siap Produksi' : score >= 60 ? 'Perlu Penyesuaian' : 'Kurang Optimal';

  if (tips.length === 0) {
    tips.push('Pengaturan pencahayaan, audio, komposisi, dan aksesibilitas sudah optimal.');
  }

  return {
    readinessScore: score,
    gradeLabel,
    tips,
  };
}

export function validateStoryboardPlan(plan: StoryboardPlan): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (!plan.topic.trim()) errors.push('Topik konten wajib diisi.');
  if (!plan.purpose.trim()) errors.push('Tujuan konten wajib diisi.');
  if (!plan.audience.trim()) errors.push('Sasaran audiens wajib diisi.');
  if (!plan.keyMessage.trim()) errors.push('Pesan utama wajib diisi.');

  const filledScenes = plan.scenes.filter(
    (s) => s.visualPlan.trim().length > 0 && s.narrationText.trim().length > 0
  );
  if (filledScenes.length < 3) {
    errors.push('Minimal 3 adegan storyboard harus memiliki rencana visual dan narasi.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function countChecklistReady(state: QualityChecklistState): {
  checkedCount: number;
  totalCount: number;
  allReady: boolean;
} {
  const entries = Object.values(state);
  const checkedCount = entries.filter(Boolean).length;
  return {
    checkedCount,
    totalCount: entries.length,
    allReady: checkedCount === entries.length,
  };
}

export function validateGallerySubmission(input: {
  studentOrGroup: string;
  className: string;
  title: string;
  localTheme: string;
  toolUsed: string;
  toolReason: string;
  summary: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!input.studentOrGroup.trim()) errors.push('Nama murid atau kelompok wajib diisi.');
  if (!input.className.trim()) errors.push('Kelas wajib diisi.');
  if (!input.title.trim()) errors.push('Judul karya wajib diisi.');
  if (!input.localTheme.trim()) errors.push('Tema lokal / topik wajib diisi.');
  if (!input.toolUsed.trim()) errors.push('Alat / aplikasi yang digunakan wajib diisi.');
  if (!input.toolReason.trim()) {
    errors.push('Alasan pemilihan alat dan metode wajib dijelaskan (sesuai indikator LK-1).');
  }
  if (!input.summary.trim()) errors.push('Deskripsi singkat karya wajib diisi.');

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function filterGalleryWorks(
  works: GalleryWork[],
  formatFilter: 'Semua' | GalleryWork['format']
): GalleryWork[] {
  if (formatFilter === 'Semua') return works;
  return works.filter((w) => w.format === formatFilter);
}

export function formatStoryboardExportText(plan: StoryboardPlan): string {
  const lines: string[] = [
    'LEMBAR PERENCANAAN & STORYBOARD KONTEN DIGITAL',
    'KREASI DIGITAL – E-Modul Interaktif Informatika Fase F',
    'UPT SMA Negeri 4 Wajo',
    '====================================================',
    `Topik Konten     : ${plan.topic || '-'}`,
    `Format Konten    : ${plan.format}`,
    `Tujuan Konten    : ${plan.purpose || '-'}`,
    `Sasaran Audiens  : ${plan.audience || '-'}`,
    `Pesan Utama      : ${plan.keyMessage || '-'}`,
    `Alat Pilihan     : ${plan.preferredTool || '-'}`,
    '',
    'DAFTAR ADEGAN / PANEL STORYBOARD:',
    '----------------------------------------------------',
  ];

  plan.scenes.forEach((scene) => {
    lines.push(
      `Adegan ${scene.sceneNumber} (${scene.audioAndDuration || 'Durasi fleksibel'})`,
      `  Visual / Tata Letak : ${scene.visualPlan || '-'}`,
      `  Narasi / Teks Layar : ${scene.narrationText || '-'}`,
      ''
    );
  });

  return lines.join('\n');
}

export function formatReflectionExportText(
  reflection: ReflectionForm,
  rubricScore: number,
  rubricMax: number
): string {
  return [
    'LEMBAR REFLEKSI & PENILAIAN DIRI',
    'KREASI DIGITAL – E-Modul Interaktif Informatika Fase F',
    '====================================================',
    `Nama Murid                  : ${reflection.studentName || '-'}`,
    `Skor Rubrik Mandiri         : ${rubricScore} / ${rubricMax}`,
    '',
    '1. Hal utama yang saya pelajari:',
    reflection.keyLearning || '-',
    '',
    '2. Tantangan saat produksi dan cara mengatasinya:',
    reflection.biggestChallenge || '-',
    '',
    '3. Alasan pemilihan alat dan metode produksi:',
    reflection.toolJustification || '-',
    '',
    '4. Rencana perbaikan untuk karya berikutnya:',
    reflection.improvementPlan || '-',
  ].join('\n');
}
