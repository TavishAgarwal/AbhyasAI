/**
 * NCERT Textbook Catalog — Classes 1-10, English Medium
 * 
 * PDF URL pattern:
 *   https://ncert.nic.in/textbook/pdf/{bookCode}{chapterNum}.pdf
 *   e.g. https://ncert.nic.in/textbook/pdf/gesc101.pdf
 *
 * All book codes verified via HTTP 200 on chapter 01 against ncert.nic.in
 */

const ncertCatalog = [
  // ─── Class 1 ────────────────────────────────────────────────────────────────
  { bookCode: 'aemr1', classNum: 1, subject: 'English', bookTitle: 'Mridang', maxChapters: 15, subSubject: null },
  { bookCode: 'aejm1', classNum: 1, subject: 'Mathematics', bookTitle: 'Joyful Mathematics', maxChapters: 13, subSubject: null },

  // ─── Class 2 ────────────────────────────────────────────────────────────────
  { bookCode: 'bemr1', classNum: 2, subject: 'English', bookTitle: 'Mridang', maxChapters: 15, subSubject: null },
  { bookCode: 'bejm1', classNum: 2, subject: 'Mathematics', bookTitle: 'Joyful Mathematics', maxChapters: 15, subSubject: null },

  // ─── Class 3 ────────────────────────────────────────────────────────────────
  { bookCode: 'ceky1', classNum: 3, subject: 'English', bookTitle: 'English', maxChapters: 15, subSubject: null },
  { bookCode: 'cemm1', classNum: 3, subject: 'Mathematics', bookTitle: 'Math Magic', maxChapters: 14, subSubject: null },
  { bookCode: 'ceev1', classNum: 3, subject: 'EVS', bookTitle: 'Looking Around', maxChapters: 24, subSubject: null },

  // ─── Class 4 ────────────────────────────────────────────────────────────────
  { bookCode: 'deky1', classNum: 4, subject: 'English', bookTitle: 'English', maxChapters: 15, subSubject: null },
  { bookCode: 'demm1', classNum: 4, subject: 'Mathematics', bookTitle: 'Math Magic', maxChapters: 14, subSubject: null },
  { bookCode: 'deev1', classNum: 4, subject: 'EVS', bookTitle: 'Looking Around', maxChapters: 27, subSubject: null },
  { bookCode: 'deap1', classNum: 4, subject: 'EVS', bookTitle: 'Aas Paas', maxChapters: 27, subSubject: null },

  // ─── Class 5 ────────────────────────────────────────────────────────────────
  { bookCode: 'eeen1', classNum: 5, subject: 'English', bookTitle: 'English (Marigold)', maxChapters: 10, subSubject: null },
  { bookCode: 'eeky1', classNum: 5, subject: 'English', bookTitle: 'English', maxChapters: 15, subSubject: null },
  { bookCode: 'eemm1', classNum: 5, subject: 'Mathematics', bookTitle: 'Math Magic', maxChapters: 14, subSubject: null },
  { bookCode: 'eemh1', classNum: 5, subject: 'Mathematics', bookTitle: 'Mathematics', maxChapters: 14, subSubject: null },
  { bookCode: 'eeev1', classNum: 5, subject: 'EVS', bookTitle: 'Looking Around', maxChapters: 22, subSubject: null },
  { bookCode: 'eeap1', classNum: 5, subject: 'EVS', bookTitle: 'Aas Paas', maxChapters: 22, subSubject: null },

  // ─── Class 6 ────────────────────────────────────────────────────────────────
  { bookCode: 'fekb1', classNum: 6, subject: 'English', bookTitle: 'English', maxChapters: 12, subSubject: null },
  { bookCode: 'feky1', classNum: 6, subject: 'English', bookTitle: 'English Textbook', maxChapters: 12, subSubject: null },
  { bookCode: 'fees1', classNum: 6, subject: 'English', bookTitle: 'English Supplementary', maxChapters: 12, subSubject: null },
  { bookCode: 'fecu1', classNum: 6, subject: 'Science', bookTitle: 'Curiosity (Science)', maxChapters: 12, subSubject: null },
  { bookCode: 'fepr1', classNum: 6, subject: 'Social Science', bookTitle: 'Exploring Society', maxChapters: 12, subSubject: 'History' },
  { bookCode: 'fekr1', classNum: 6, subject: 'Social Science', bookTitle: 'Knowledge Tradition', maxChapters: 10, subSubject: 'History' },
  { bookCode: 'fegp1', classNum: 6, subject: 'Social Science', bookTitle: 'Geography', maxChapters: 8, subSubject: 'Geography' },

  // ─── Class 7 ────────────────────────────────────────────────────────────────
  { bookCode: 'geah1', classNum: 7, subject: 'English', bookTitle: 'An Alien Hand', maxChapters: 10, subSubject: null },
  { bookCode: 'gees2', classNum: 7, subject: 'English', bookTitle: 'English Supplementary', maxChapters: 10, subSubject: null },
  { bookCode: 'gesc1', classNum: 7, subject: 'Science', bookTitle: 'Science', maxChapters: 18, subSubject: null },
  { bookCode: 'gess1', classNum: 7, subject: 'Social Science', bookTitle: 'Our Pasts II', maxChapters: 10, subSubject: 'History' },
  { bookCode: 'gess2', classNum: 7, subject: 'Social Science', bookTitle: 'Our Environment', maxChapters: 9, subSubject: 'Geography' },
  { bookCode: 'gess3', classNum: 7, subject: 'Social Science', bookTitle: 'Social and Political Life II', maxChapters: 9, subSubject: 'Political Science' },
  { bookCode: 'gegp1', classNum: 7, subject: 'Social Science', bookTitle: 'Geography Practical', maxChapters: 10, subSubject: 'Geography' },
  { bookCode: 'gecu1', classNum: 7, subject: 'Science', bookTitle: 'Curiosity (Science)', maxChapters: 12, subSubject: null },
  { bookCode: 'gekb1', classNum: 7, subject: 'English', bookTitle: 'English', maxChapters: 7, subSubject: null },
  { bookCode: 'geky1', classNum: 7, subject: 'English', bookTitle: 'English Textbook', maxChapters: 12, subSubject: null },
  { bookCode: 'gekr1', classNum: 7, subject: 'Social Science', bookTitle: 'Knowledge Tradition', maxChapters: 18, subSubject: 'History' },
  { bookCode: 'gepr1', classNum: 7, subject: 'Social Science', bookTitle: 'Exploring Society', maxChapters: 12, subSubject: 'History' },
  { bookCode: 'gegp2', classNum: 7, subject: 'Social Science', bookTitle: 'Geography Part 2', maxChapters: 10, subSubject: 'Geography' },

  // ─── Class 8 ────────────────────────────────────────────────────────────────
  { bookCode: 'hemh1', classNum: 8, subject: 'Mathematics', bookTitle: 'Mathematics', maxChapters: 16, subSubject: null },
  { bookCode: 'hesc1', classNum: 8, subject: 'Science', bookTitle: 'Science', maxChapters: 18, subSubject: null },
  { bookCode: 'hehd1', classNum: 8, subject: 'Social Science', bookTitle: 'Our Pasts III Part 1', maxChapters: 8, subSubject: 'History' },
  { bookCode: 'hess2', classNum: 8, subject: 'Social Science', bookTitle: 'Our Pasts III Part 2', maxChapters: 7, subSubject: 'History' },
  { bookCode: 'hess3', classNum: 8, subject: 'Social Science', bookTitle: 'Resources and Development', maxChapters: 6, subSubject: 'Geography' },
  { bookCode: 'hess4', classNum: 8, subject: 'Social Science', bookTitle: 'Social and Political Life III', maxChapters: 10, subSubject: 'Political Science' },
  { bookCode: 'hegp1', classNum: 8, subject: 'Social Science', bookTitle: 'Geography Practical', maxChapters: 8, subSubject: 'Geography' },
  { bookCode: 'heky1', classNum: 8, subject: 'English', bookTitle: 'English Textbook', maxChapters: 12, subSubject: null },
  { bookCode: 'hekb1', classNum: 8, subject: 'English', bookTitle: 'English', maxChapters: 12, subSubject: null },
  { bookCode: 'hekr1', classNum: 8, subject: 'English', bookTitle: 'English Supplementary', maxChapters: 12, subSubject: null },
  { bookCode: 'heih1', classNum: 8, subject: 'English', bookTitle: 'It So Happened', maxChapters: 10, subSubject: null },
  { bookCode: 'hecu1', classNum: 8, subject: 'Science', bookTitle: 'Curiosity (Science)', maxChapters: 12, subSubject: null },
  { bookCode: 'hepr1', classNum: 8, subject: 'Social Science', bookTitle: 'Exploring Society', maxChapters: 12, subSubject: 'History' },

  // ─── Class 9 ────────────────────────────────────────────────────────────────
  { bookCode: 'iemr1', classNum: 9, subject: 'English', bookTitle: 'Mridang', maxChapters: 12, subSubject: null },
  { bookCode: 'iebe1', classNum: 9, subject: 'English', bookTitle: 'Beehive', maxChapters: 11, subSubject: null },
  { bookCode: 'iemh1', classNum: 9, subject: 'Mathematics', bookTitle: 'Mathematics', maxChapters: 15, subSubject: null },
  { bookCode: 'iesc1', classNum: 9, subject: 'Science', bookTitle: 'Science', maxChapters: 15, subSubject: null },
  { bookCode: 'iehp1', classNum: 9, subject: 'Social Science', bookTitle: 'India and the Contemporary World I', maxChapters: 5, subSubject: 'History' },

  // ─── Class 10 ───────────────────────────────────────────────────────────────
  { bookCode: 'jeff1', classNum: 10, subject: 'English', bookTitle: 'First Flight', maxChapters: 11, subSubject: null },
  { bookCode: 'jemh1', classNum: 10, subject: 'Mathematics', bookTitle: 'Mathematics', maxChapters: 15, subSubject: null },
  { bookCode: 'jesc1', classNum: 10, subject: 'Science', bookTitle: 'Science', maxChapters: 16, subSubject: null },
  { bookCode: 'jehp1', classNum: 10, subject: 'Social Science', bookTitle: 'India and the Contemporary World II', maxChapters: 8, subSubject: 'History' },
  { bookCode: 'jess1', classNum: 10, subject: 'Social Science', bookTitle: 'History', maxChapters: 8, subSubject: 'History' },
  { bookCode: 'jess2', classNum: 10, subject: 'Social Science', bookTitle: 'Contemporary India II', maxChapters: 7, subSubject: 'Geography' },
  { bookCode: 'jess3', classNum: 10, subject: 'Social Science', bookTitle: 'Democratic Politics II', maxChapters: 8, subSubject: 'Political Science' },
  { bookCode: 'jess4', classNum: 10, subject: 'Social Science', bookTitle: 'Understanding Economic Development', maxChapters: 5, subSubject: 'Economics' },
];

module.exports = ncertCatalog;
