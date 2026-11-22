# 📚 Padhle

**Comprehensive Exam Preparation, Academic Milestone Tracker & Gamified Study Dashboard**

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite 8](https://img.shields.io/badge/Bundler-Vite_8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Styling-Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Chart.js](https://img.shields.io/badge/Analytics-Chart.js-FF6384?style=for-the-badge&logo=chart.js)](https://www.chartjs.org/)

---

## 📌 Executive Summary

Preparing for competitive university exams and entrance tests requires disciplined tracking of deadlines, syllabus milestones, mock scores, and revision weaknesses.

**Padhle** is an all-in-one student productivity and exam roadmap application. Built with React 19, TypeScript, and Vite, it combines gamified study sessions (Pomodoro timers, streak multipliers, achievement rewards) with structured academic management tools: syllabus roadmaps, previous year question (PYQ) banks, mock exam analytics, college application deadlines, and a dedicated mistake notebook.

---

## ✨ Features & Modules

- **⏱️ Gamified Study Timer (`StudyTimer.tsx`)**:
  - Focus sessions with configurable intervals.
  - Automated XP calculation, streak counters, and celebratory unlock modals (`RewardModal.tsx`).
- **🗺️ Curriculum Roadmaps (`data/roadmap.ts`)**:
  - Step-by-step topic breakdown for core subjects (Physics, Mathematics, Computer Science, Aptitude).
  - Progress percentages and subtopic completion checklists.
- **📝 Mock Test Analytics & Mistake Notebook**:
  - Visual score trends powered by **Chart.js** (`react-chartjs-2`).
  - Cataloging mistakes, conceptual errors, and revision bookmarks.
- **📅 College Application & Exam Deadlines**:
  - Centralized calendar tracking application dates, admit card releases, and exam slots (`data/exams.ts`, `data/colleges.ts`).
- **💾 Local Persistence (`usePersistedState.ts`)**:
  - All user progress, custom notes, and session logs persist securely in browser local storage with zero server login required.

---

## 📂 Repository Structure

```text
padhle/
├── src/
│   ├── components/             # StudyTimer, RewardModal, Navbar
│   ├── data/                   # Seed datasets for colleges, exams, roadmaps, and subjects
│   ├── hooks/                  # Gamification engine and persisted local state hooks
│   ├── lib/                    # Client store and state management
│   ├── pages/
│   │   ├── Dashboard.tsx       # Main student command center
│   │   ├── Calendar.tsx        # Exam schedule and daily agendas
│   │   ├── Colleges.tsx        # University rankings and cutoff details
│   │   ├── Deadlines.tsx       # Countdown timers for application forms
│   │   ├── Exams.tsx           # Target exam syllabus views
│   │   ├── Mistakes.tsx        # Revision error logs
│   │   ├── Mocks.tsx           # Test series score tracker & charts
│   │   └── PYQs.tsx            # Previous year questions directory
│   ├── types/                  # Type definitions for exams, milestones, and sessions
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/anshere0/padhle.git
cd padhle

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 👤 Author
**Ansh Arora**  
- GitHub: [@anshere0](https://github.com/anshere0)  
- LinkedIn: [Ansh Arora](https://www.linkedin.com/in/ansh-arora0/)
