import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateModuleProgress,
  calculateRubricSummary,
  countChecklistReady,
  evaluateQuiz,
  evaluateStudioSimulation,
  filterGalleryWorks,
  formatStoryboardExportText,
  validateGallerySubmission,
  validateStoryboardPlan,
} from './ebookLogic';
import { GalleryWork, QuizQuestion, StoryboardPlan } from '../types/ebook';

test('calculateModuleProgress tracks unique chapters excluding beranda', () => {
  const res = calculateModuleProgress(['beranda', 'pengenalan', 'eksplorasi', 'pengenalan'], 5);
  assert.equal(res.completedCount, 2);
  assert.equal(res.totalCount, 5);
  assert.equal(res.percentage, 40);
});

test('evaluateQuiz enforces 80% KKM threshold and complete status', () => {
  const questions: QuizQuestion[] = [
    { id: 'q1', chapterRef: 'Bab 1', question: 'Q1', options: ['A', 'B'], correctIndex: 0, explanation: 'E1' },
    { id: 'q2', chapterRef: 'Bab 1', question: 'Q2', options: ['A', 'B'], correctIndex: 1, explanation: 'E2' },
    { id: 'q3', chapterRef: 'Bab 2', question: 'Q3', options: ['A', 'B'], correctIndex: 0, explanation: 'E3' },
    { id: 'q4', chapterRef: 'Bab 3', question: 'Q4', options: ['A', 'B'], correctIndex: 1, explanation: 'E4' },
    { id: 'q5', chapterRef: 'Bab 4', question: 'Q5', options: ['A', 'B'], correctIndex: 0, explanation: 'E5' },
  ];

  const incomplete = evaluateQuiz(questions, { q1: 0, q2: 1 });
  assert.equal(incomplete.isComplete, false);
  assert.equal(incomplete.statusLabel, 'Belum Selesai');

  const passing = evaluateQuiz(questions, { q1: 0, q2: 1, q3: 0, q4: 1, q5: 1 });
  assert.equal(passing.percentage, 80);
  assert.equal(passing.isPassed, true);
  assert.equal(passing.statusLabel, 'Tuntas');

  const failing = evaluateQuiz(questions, { q1: 0, q2: 0, q3: 1, q4: 1, q5: 0 });
  assert.equal(failing.percentage, 60);
  assert.equal(failing.isPassed, false);
  assert.equal(failing.statusLabel, 'Perlu Pendalaman');
});

test('calculateRubricSummary aggregates scores and derives predicate', () => {
  const incomplete = calculateRubricSummary({ a: 4, b: 3 }, 5);
  assert.equal(incomplete.predicate, 'Belum Lengkap');

  const full = calculateRubricSummary({ a: 4, b: 4, c: 3, d: 4, e: 3 }, 5);
  assert.equal(full.totalScore, 18);
  assert.equal(full.maxScore, 20);
  assert.equal(full.percentage, 90);
  assert.equal(full.predicate, 'Sangat Baik');
});

test('evaluateStudioSimulation rewards balanced lighting, clear audio, grid, and captions', () => {
  const optimal = evaluateStudioSimulation({
    lightingLevel: 75,
    audioClarity: 85,
    ruleOfThirds: true,
    captionEnabled: true,
  });
  assert.equal(optimal.readinessScore, 100);
  assert.equal(optimal.gradeLabel, 'Siap Produksi');

  const poor = evaluateStudioSimulation({
    lightingLevel: 20,
    audioClarity: 30,
    ruleOfThirds: false,
    captionEnabled: false,
  });
  assert.equal(poor.gradeLabel, 'Kurang Optimal');
  assert.ok(poor.tips.length >= 3);
});

test('validateStoryboardPlan requires metadata and at least 3 filled scenes', () => {
  const invalidPlan: StoryboardPlan = {
    topic: '',
    purpose: 'Edukasi',
    audience: 'Pelajar',
    keyMessage: 'Lestarikan sutra',
    format: 'Poster',
    preferredTool: 'Canva',
    scenes: [
      { id: '1', sceneNumber: 1, visualPlan: 'Cover', narrationText: 'Judul', audioAndDuration: '5s' },
    ],
  };
  const check1 = validateStoryboardPlan(invalidPlan);
  assert.equal(check1.isValid, false);
  assert.equal(check1.errors.length, 2);

  const validPlan: StoryboardPlan = {
    ...invalidPlan,
    topic: 'Lipa Sabbe Wajo',
    scenes: [
      { id: '1', sceneNumber: 1, visualPlan: 'Foto penenun', narrationText: 'Intro', audioAndDuration: '5s' },
      { id: '2', sceneNumber: 2, visualPlan: 'Detail motif', narrationText: 'Filosofi', audioAndDuration: '10s' },
      { id: '3', sceneNumber: 3, visualPlan: 'Ajakan cinta produk lokal', narrationText: 'Penutup', audioAndDuration: '5s' },
    ],
  };
  const check2 = validateStoryboardPlan(validPlan);
  assert.equal(check2.isValid, true);

  const exported = formatStoryboardExportText(validPlan);
  assert.ok(exported.includes('Lipa Sabbe Wajo'));
  assert.ok(exported.includes('Adegan 3'));
});

test('validateGallerySubmission requires toolReason and checks checklist counts', () => {
  const bad = validateGallerySubmission({
    studentOrGroup: 'Kelompok 1',
    className: 'XI.F1',
    title: 'Pesona Danau Tempe',
    localTheme: 'Wisata Wajo',
    toolUsed: 'Canva',
    toolReason: '',
    summary: 'Poster wisata',
  });
  assert.equal(bad.isValid, false);

  const checklist = countChecklistReady({
    clearResolution: true,
    readableContrast: true,
    factChecked: true,
    copyrightAttribution: false,
    privacyConsent: true,
  });
  assert.equal(checklist.checkedCount, 4);
  assert.equal(checklist.allReady, false);
});

test('filterGalleryWorks filters by format accurately', () => {
  const items: GalleryWork[] = [
    {
      id: 'g1',
      studentOrGroup: 'A',
      className: 'XI',
      title: 'T1',
      format: 'Poster',
      localTheme: 'Wajo',
      toolUsed: 'Canva',
      toolReason: 'Cepat',
      summary: 'S',
      appreciations: 2,
      createdAt: '2026-11-10',
    },
    {
      id: 'g2',
      studentOrGroup: 'B',
      className: 'XI',
      title: 'T2',
      format: 'Video Pendek',
      localTheme: 'Bugis',
      toolUsed: 'Filmora',
      toolReason: 'Timeline rapi',
      summary: 'S',
      appreciations: 5,
      createdAt: '2026-11-10',
    },
  ];
  assert.equal(filterGalleryWorks(items, 'Semua').length, 2);
  assert.equal(filterGalleryWorks(items, 'Video Pendek').length, 1);
});
