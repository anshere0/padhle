import type { RoadmapPhase } from '../types';

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 'phase-0',
    month: 'SEPTEMBER (Early)',
    title: 'Setup & Diagnostics',
    description: 'Create study plan, register for GATE, take baseline diagnostics, establish daily routine.',
    subjects: ['Student Profile', 'GATE Registration', 'Baseline Diagnostics', 'Study Plan'],
    startDate: '2026-09-02',
    endDate: '2026-09-04',
  },
  {
    id: 'phase-1',
    month: 'SEPTEMBER',
    title: 'Foundation Core',
    description: 'Build strong foundations in the four critical subjects. Start GATE Mathematics daily.',
    subjects: ['Molecular Biology', 'Genetics', 'Cell Biology', 'Biochemistry', 'GATE Mathematics (daily)'],
    startDate: '2026-09-05',
    endDate: '2026-09-30',
  },
  {
    id: 'phase-2',
    month: 'OCTOBER',
    title: 'Breadth & Techniques',
    description: 'Expand into Microbiology, Immunology, and lab techniques. Continue Biochemistry and daily Mathematics.',
    subjects: ['Microbiology', 'Immunology', 'Biotechnology Techniques', 'Biochemistry (continuation)', 'Mathematics (daily)'],
    startDate: '2026-10-01',
    endDate: '2026-10-31',
  },
  {
    id: 'phase-3',
    month: 'NOVEMBER',
    title: 'Biotechnology & Engineering',
    description: 'Recombinant DNA, genetic engineering, plant/animal biotechnology, bioprocess engineering.',
    subjects: ['Recombinant DNA / Genetic Engineering', 'Plant Biotechnology', 'Animal Biotechnology', 'Bioprocess Engineering', 'Biological Engineering'],
    startDate: '2026-11-01',
    endDate: '2026-11-30',
  },
  {
    id: 'phase-4',
    month: 'DECEMBER',
    title: 'Syllabus Completion & PYQs',
    description: 'Complete remaining syllabus. Engineering Mathematics intensive. Bioinformatics. Start intensive PYQs.',
    subjects: ['Engineering Mathematics', 'Bioinformatics', 'General Aptitude', 'Syllabus Gaps', 'PYQ Practice'],
    startDate: '2026-12-01',
    endDate: '2026-12-31',
  },
  {
    id: 'phase-5',
    month: 'JANUARY',
    title: 'GATE Intensive',
    description: '70-80% questions, PYQs, mocks, revision. 20-30% concept repair. Weekly mixed tests and full mocks.',
    subjects: ['PYQs & Mocks', 'Weak Topic Repair', 'Mathematics', 'Bioprocess', 'General Aptitude', 'Error Log Revision'],
    startDate: '2027-01-01',
    endDate: '2027-01-31',
  },
  {
    id: 'phase-6',
    month: 'FEBRUARY',
    title: 'GATE Exam Window',
    description: 'Final revision, PYQs, formula sheets, timed tests. No new giant textbooks.',
    subjects: ['Heavy PYQ Revision', 'Error Log', 'Formula Sheets', 'Timed Tests'],
    startDate: '2027-02-01',
    endDate: '2027-02-21',
  },
  {
    id: 'phase-7',
    month: 'POST-GATE',
    title: 'CUET-PG + GAT-B Preparation',
    description: 'Shift focus to CUET-PG Life Sciences breadth and GAT-B graduate-level biotechnology.',
    subjects: ['CUET SCQP17 Breadth', 'Plant Sciences', 'Animal Sciences', 'Microbiology', 'Molecular Genetics', 'Biochemistry', 'Techniques', 'GAT-B Section B', '10+2 Section A Refresh'],
    startDate: '2027-02-22',
    endDate: '2027-06-30',
  },
];

// Helper to find current phase
export function getCurrentPhase(phases: RoadmapPhase[]): RoadmapPhase | null {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  for (const phase of phases) {
    const start = new Date(phase.startDate);
    const end = new Date(phase.endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    if (now >= start && now <= end) return phase;
  }
  // If past all phases, return last
  if (phases.length > 0) {
    const last = phases[phases.length - 1];
    if (now > new Date(last.endDate)) return last;
  }
  return phases[0] || null;
}
