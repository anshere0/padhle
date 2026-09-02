import type { Exam, ExamStatus } from '../types';

// ===== EXAM DATABASE =====
// Sources: REFERENCE_DATA.md, official GATE/CUET/GAT-B portals
// All dates verified as of 2 September 2026

export const exams: Exam[] = [
  // ==================== GATE 2027 ====================
  {
    id: 'gate-2027',
    name: 'GATE 2027 — Biotechnology',
    shortName: 'GATE',
    year: 2027,
    paperCode: 'BT',
    organizingBody: 'IIT Madras',
    purpose: 'Admission to M.Tech, M.S., direct Ph.D., and fellowship programmes. Also used by some M.Sc. programmes.',
    mode: 'CBT (Computer Based Test)',
    duration: '3 hours',
    totalMarks: 100,
    questionCount: 65,
    markingScheme: '10 GA questions (15 marks) + 55 subject questions (85 marks). Engineering Mathematics = 13 marks within subject. MCQ, MSQ, NAT types.',
    negativeMarking: 'MCQ: −1/3 for 1-mark, −2/3 for 2-mark. MSQ & NAT: No negative marking. No partial marking in MSQ.',
    language: 'English',
    eligibilitySummary: 'Candidates in 3rd year or higher of any government-approved undergraduate degree programme are eligible to appear. A 3-year B.Sc. student may be eligible to APPEAR for GATE. Note: GATE exam eligibility does NOT automatically mean eligibility for every GATE-based postgraduate programme — programme eligibility must be checked separately.',
    officialUrl: 'https://gate2027.iitm.ac.in/',
    sourceUrl: 'https://gate2027.iitm.ac.in/important_dates',
    lastVerified: '2026-09-02',
    status: 'OFFICIAL',
    priority: 'SECONDARY',
    accentColor: '#6366f1', // indigo
    dates: {
      registrationOpen: {
        date: '2026-09-02',
        label: 'GOAPS Registration Opens',
        status: 'OFFICIAL',
      },
      registrationClose: {
        date: '2026-09-27',
        label: 'Regular Registration Closes',
        status: 'OFFICIAL',
      },
      extendedDeadline: {
        date: '2026-10-05',
        label: 'Extended Registration Closes',
        status: 'OFFICIAL',
      },
      rectificationStart: {
        date: '2026-10-14',
        label: 'Application Rectification Opens',
        status: 'OFFICIAL',
      },
      rectificationEnd: {
        date: '2026-10-21',
        label: 'Application Rectification Closes',
        status: 'OFFICIAL',
      },
      cityAllotment: {
        date: '2027-01-04',
        label: 'City Allotment Notification',
        status: 'OFFICIAL',
      },
      examWindowStart: {
        date: '2027-02-06',
        label: 'Exam Window Starts',
        status: 'OFFICIAL',
      },
      examWindowEnd: {
        date: '2027-02-21',
        label: 'Exam Window Ends',
        status: 'OFFICIAL',
      },
      btExamDate: {
        date: null,
        label: 'BT Paper Exact Date/Session',
        status: 'TBA',
      },
      result: {
        date: '2027-03-19',
        label: 'Result Declaration',
        status: 'OFFICIAL',
      },
    },
    sections: [
      { name: 'General Aptitude', questions: 10, marks: 15, details: '5 × 1-mark + 5 × 2-mark MCQ/MSQ/NAT' },
      { name: 'Engineering Mathematics', questions: 0, marks: 13, details: 'Included within the 85-mark subject component for BT-classified papers' },
      { name: 'Biotechnology Subject', questions: 55, marks: 72, details: 'Subject-specific MCQ/MSQ/NAT (85 marks total including Engg. Math)' },
    ],
    notes: 'GATE 2027 syllabus has been revised by IIT Madras — use the official 2027 syllabus as the canonical reference. Exam window: 6–7, 13–14, 20–21 February 2027. Exact BT paper date/session not yet published. Registration through DigiLocker is mandatory for Indian nationals.',
  },

  // ==================== CUET-PG 2027 ====================
  {
    id: 'cuet-pg-2027',
    name: 'CUET-PG 2027 — Life Sciences',
    shortName: 'CUET-PG',
    year: 2027,
    paperCode: 'SCQP17',
    organizingBody: 'NTA (National Testing Agency)',
    purpose: 'Admission to postgraduate programmes at Central Universities and participating institutions.',
    mode: 'CBT (Computer Based Test)',
    duration: '90 minutes',
    totalMarks: 300,
    questionCount: 75,
    markingScheme: '75 compulsory questions. +4 correct, −1 incorrect, 0 unanswered.',
    negativeMarking: '−1 per incorrect answer',
    language: 'English / Hindi (bilingual)',
    eligibilitySummary: 'Eligibility varies by participating university. Generally requires a relevant bachelor\'s degree. Check individual university admission bulletins for specific requirements.',
    officialUrl: 'https://exams.nta.ac.in/CUET-PG/',
    sourceUrl: 'https://exams.nta.ac.in/CUET-PG/images/syllabus/Science/Life%20Sciences%20%28SCQP17%29.pdf',
    lastVerified: '2026-09-02',
    status: 'HISTORICAL_REFERENCE',
    priority: 'PRIMARY',
    accentColor: '#10b981', // emerald
    dates: {
      registration: {
        date: null,
        label: 'Registration',
        status: 'TBA',
      },
      examDate: {
        date: null,
        label: 'Exam Date',
        status: 'TBA',
      },
      result: {
        date: null,
        label: 'Result',
        status: 'TBA',
      },
    },
    sections: [
      { name: 'Techniques', questions: 0, marks: 0, details: 'Chromatography, spectroscopy, microscopy, electrophoresis, centrifugation, blotting, PCR, radioisotope techniques' },
      { name: 'Chromatin Structure & Function', questions: 0, marks: 0, details: 'Prokaryotic/eukaryotic chromosomes, chromatin organization, gene concept' },
      { name: 'Biochemistry', questions: 0, marks: 0, details: 'Proteins, DNA, carbohydrates, lipids, vitamins, bioenergetics, metabolic pathways, membranes' },
      { name: 'Biotechnology', questions: 0, marks: 0, details: 'rDNA technology, gene cloning, medical/industrial/agricultural/environmental biotechnology, cell culture' },
      { name: 'Microbiology', questions: 0, marks: 0, details: 'Microbial diversity, bacterial reproduction, antimicrobials, industrial/agricultural/environmental microbiology, immunity, vaccines, viruses' },
      { name: 'Molecular Genetics', questions: 0, marks: 0, details: 'Mendelian inheritance, linkage, crossing over, chromosomal aberrations, replication, transcription, translation, DNA repair, population genetics' },
      { name: 'Plant Sciences', questions: 0, marks: 0, details: 'Bryophytes, Pteridophytes, Gymnosperms, Angiosperms, photosynthesis, photoperiodism, vernalization, biogeochemical cycles' },
      { name: 'Animal Sciences', questions: 0, marks: 0, details: 'Invertebrates, vertebrates, human anatomy/physiology, endocrinology, diseases, apoptosis, cancer' },
    ],
    notes: 'Latest reference pattern shown above is from the most recent official CUET-PG cycle. 2027 official notification has not been released yet. Do NOT treat this pattern as confirmed for 2027 until NTA publishes the 2027 notification.',
  },

  // ==================== GAT-B 2027 ====================
  {
    id: 'gatb-2027',
    name: 'GAT-B 2027',
    shortName: 'GAT-B',
    year: 2027,
    paperCode: 'GAT-B',
    organizingBody: 'DBT (Department of Biotechnology) / RCB',
    purpose: 'All-India entrance for admission to DBT-supported postgraduate programmes in Biotechnology and allied areas at participating institutions.',
    mode: 'CBT',
    duration: 'As per official notification',
    totalMarks: 240,
    questionCount: 160,
    markingScheme: 'Section A: 60 compulsory MCQs (10+2 level, 60 marks). Section B: 100 questions displayed, attempt 60 (graduate-level, 180 marks). Total: 120 attempted, 240 marks.',
    negativeMarking: 'Section A: +1 correct, −0.5 wrong. Section B: +3 correct, −1 wrong.',
    language: 'English',
    eligibilitySummary: 'Eligibility for specific DBT-supported programmes varies by institution. Generally requires a relevant bachelor\'s degree in biological/physical sciences. Check the official GAT-B bulletin for participating institutions and their specific eligibility criteria.',
    officialUrl: 'https://rcb.res.in/DBTPG/',
    sourceUrl: 'https://rcb.res.in/files/2026-03/information-bulletien-gatbet-2026.pdf',
    lastVerified: '2026-09-02',
    status: 'HISTORICAL_REFERENCE',
    priority: 'PRIMARY',
    accentColor: '#f59e0b', // amber
    dates: {
      registration: {
        date: null,
        label: 'Registration',
        status: 'TBA',
      },
      examDate: {
        date: null,
        label: 'Exam Date',
        status: 'TBA',
      },
      result: {
        date: null,
        label: 'Result',
        status: 'TBA',
      },
    },
    sections: [
      { name: 'Section A — 10+2 Level', questions: 60, marks: 60, details: 'Compulsory MCQs from Physics, Chemistry, Mathematics, Biology at 10+2 level. +1 correct, −0.5 wrong.' },
      { name: 'Section B — Graduate Level', questions: 100, marks: 180, details: 'Attempt 60 out of 100. Graduate-level Biotechnology, Life Sciences, and allied areas. +3 correct, −1 wrong. This is the major scoring component (75% of total marks).' },
    ],
    notes: 'GAT-B 2027 notification/dates are TBA as of 2 September 2026. The pattern shown is from the latest official GAT-B cycle (2026 reference). Section B is the major scoring component — do not over-prioritize Section A at the expense of Section B preparation. Verify all details when the 2027 bulletin is released.',
  },
];

// Helper to get the next important date for an exam
export function getNextExamDate(exam: Exam): { label: string; date: string | null; status: ExamStatus } {
  const now = new Date();
  let nearest: { label: string; date: string | null; status: ExamStatus } | null = null;
  let nearestDiff = Infinity;

  for (const [, dateInfo] of Object.entries(exam.dates)) {
    if (dateInfo.date) {
      const d = new Date(dateInfo.date);
      const diff = d.getTime() - now.getTime();
      if (diff > 0 && diff < nearestDiff) {
        nearestDiff = diff;
        nearest = dateInfo;
      }
    }
  }

  // If no future date, check for exam date specifically
  if (!nearest) {
    const examDate = exam.dates.examDate || exam.dates.examWindowStart || exam.dates.btExamDate;
    if (examDate) return examDate;
    return { label: 'Exam Date', date: null, status: 'TBA' as ExamStatus };
  }

  return nearest;
}

// Helper to get the primary exam date for countdown
export function getExamCountdownDate(exam: Exam): string | null {
  // For GATE, use exam window start since BT date is TBA
  if (exam.id === 'gate-2027') {
    return exam.dates.examWindowStart?.date || null;
  }
  return exam.dates.examDate?.date || null;
}

// Helper: days remaining
export function daysRemaining(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
