// ===== Core Types for PadhLeKonu =====

// ----- Exams -----
export type ExamStatus = 'OFFICIAL' | 'TBA' | 'HISTORICAL_REFERENCE' | 'TENTATIVE' | 'PLANNING' | 'VERIFY' | 'CONFLICT';

export interface ExamDate {
  date: string | null; // ISO date string, null if TBA
  label: string;
  status: ExamStatus;
}

export interface Exam {
  id: string;
  name: string;
  shortName: string;
  year: number;
  paperCode: string;
  organizingBody: string;
  purpose: string;
  mode: string;
  duration: string;
  totalMarks: number;
  questionCount: number;
  markingScheme: string;
  negativeMarking: string;
  language: string;
  eligibilitySummary: string;
  officialUrl: string;
  sourceUrl: string;
  lastVerified: string;
  status: ExamStatus;
  priority: 'PRIMARY' | 'SECONDARY';
  dates: Record<string, ExamDate>;
  sections: ExamSection[];
  notes: string;
  accentColor: string;
}

export interface ExamSection {
  name: string;
  questions: number;
  marks: number;
  details: string;
}

// ----- Subjects & Topics -----
export type TopicStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface ExamRelevance {
  gate: number; // 0-5
  cuet: number; // 0-5
  gatb: number; // 0-5
}

export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  status: TopicStatus;
  confidence: number; // 1-5
  examRelevance: ExamRelevance;
  questionsAttempted: number;
  questionsCorrect: number;
  notes: string;
  revision1: boolean;
  revision2: boolean;
  revision3: boolean;
  revision1Date: string | null;
  revision2Date: string | null;
  revision3Date: string | null;
}

export type SubjectPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface Subject {
  id: string;
  name: string;
  icon: string;
  priority: SubjectPriority;
  examRelevance: ExamRelevance;
  topics: Topic[];
  notes: string;
}

// ----- Study Sessions -----
export interface StudySession {
  id: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  exam: string;
  subject: string;
  topic: string;
  completed: boolean;
}

// ----- Tasks (Today) -----
export interface DailyTask {
  id: string;
  date: string; // YYYY-MM-DD
  text: string;
  completed: boolean;
  subject?: string;
  notes?: string;
}

// ----- PYQ Tracking -----
export interface PYQStats {
  exam: string;
  attempted: number;
  correct: number;
  wrong: number;
}

// ----- Mock Tests -----
export interface MockTest {
  id: string;
  exam: string;
  name: string;
  date: string;
  score: number;
  maxMarks: number;
  attempted: number;
  correct: number;
  wrong: number;
  duration: string;
  notes: string;
}

// ----- Error/Mistake Log -----
export type MistakeType = 'CONCEPT' | 'MEMORY' | 'CALCULATION' | 'SILLY_MISTAKE' | 'TIME_PRESSURE' | 'MISREAD';

export interface Mistake {
  id: string;
  exam: string;
  subject: string;
  topic: string;
  description: string;
  correctConcept: string;
  mistakeType: MistakeType;
  resolved: boolean;
  createdAt: string;
  notes: string;
}

// ----- Colleges -----
export type CollegePriority = 'DREAM' | 'TARGET' | 'BACKUP' | 'NONE';

export interface College {
  id: string;
  institution: string;
  programme: string;
  degree: string;
  specialization: string;
  city: string;
  state: string;
  institutionType: string;
  examRoute: string;
  paperCode: string;
  eligibilitySummary: string;
  seatCount: number | null;
  seatYear: string;
  dbtSupported: boolean;
  officialUrl: string;
  sourceUrl: string;
  sourceStatus: ExamStatus;
  lastVerified: string;
  notes: string;
}

// User's college preferences (stored in localStorage)
export interface CollegePreference {
  collegeId: string;
  priority: CollegePriority;
  isFavourite: boolean;
  notes: string;
}

// ----- Deadlines -----
export type DeadlineStatus = 'UPCOMING' | 'TODAY' | 'OPEN' | 'TBA' | 'OVERDUE' | 'COMPLETED';

export interface Deadline {
  id: string;
  title: string;
  exam: string;
  date: string | null; // null if TBA
  type: string;
  status: DeadlineStatus;
  source: string;
  notes: string;
  isCustom: boolean;
}

// ----- Documents -----
export interface DocumentItem {
  id: string;
  label: string;
  checked: boolean;
}

// ----- Settings -----
export interface UserSettings {
  name: string;
  goal: string;
  targetDegree: string;
  dailyStudyHoursTarget: number;
  theme: 'light' | 'dark' | 'system';
  startDate: string;
  targetGraduationYear: number;
  onboardingComplete: boolean;
  // Target scores
  gateTarget: number;
  cuetTarget: number;
  gatbTarget: number;
  // Weak subjects to show on dashboard (empty = auto-detect)
  weakSubjectIds: string[];
  // Gamification
  xp: number;
  level: number;
  unlockedRewards: { id: string; reward: string; date: string }[];
}

// ----- Streaks -----
export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastStudyDate: string | null;
  studyDays: string[]; // array of YYYY-MM-DD
}

// ----- Roadmap -----
export interface RoadmapPhase {
  id: string;
  month: string;
  title: string;
  description: string;
  subjects: string[];
  startDate: string;
  endDate: string;
}
