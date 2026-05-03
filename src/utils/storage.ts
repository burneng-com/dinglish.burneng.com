const STORAGE_PREFIX = 'dinglish_';

export interface Progress {
  knownWords: string[];
  reviewWords: string[];
  dailyStreak: number;
  lastDailyDate: string;
  quizScore: { correct: number; total: number };
  dailyWordIndex: number;
}

const DEFAULT_PROGRESS: Progress = {
  knownWords: [],
  reviewWords: [],
  dailyStreak: 0,
  lastDailyDate: '',
  quizScore: { correct: 0, total: 0 },
  dailyWordIndex: 0,
};

function getKey(key: string): string {
  return `${STORAGE_PREFIX}${key}`;
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(getKey('progress'));
    if (!raw) return { ...DEFAULT_PROGRESS };
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(data: Partial<Progress>): void {
  const current = loadProgress();
  const merged = { ...current, ...data };
  localStorage.setItem(getKey('progress'), JSON.stringify(merged));
}

export function markWordKnown(word: string): void {
  const p = loadProgress();
  if (!p.knownWords.includes(word)) {
    p.knownWords.push(word);
  }
  p.reviewWords = p.reviewWords.filter(w => w !== word);
  saveProgress(p);
}

export function markWordReview(word: string): void {
  const p = loadProgress();
  if (!p.reviewWords.includes(word) && !p.knownWords.includes(word)) {
    p.reviewWords.push(word);
  }
}

export function updateDailyStreak(): void {
  const p = loadProgress();
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (p.lastDailyDate === today) return;

  if (p.lastDailyDate === yesterday) {
    p.dailyStreak += 1;
  } else if (p.lastDailyDate !== today) {
    p.dailyStreak = 1;
  }

  p.lastDailyDate = today;
  saveProgress(p);
}

export function getDailyWordIndex(totalWords: number): number {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return seed % totalWords;
}

export function recordQuizAnswer(correct: boolean): void {
  const p = loadProgress();
  p.quizScore.total += 1;
  if (correct) p.quizScore.correct += 1;
  saveProgress(p);
}

export function resetAllProgress(): void {
  localStorage.removeItem(getKey('progress'));
}

export function getQuizAccuracy(): number {
  const p = loadProgress();
  if (p.quizScore.total === 0) return 0;
  return Math.round((p.quizScore.correct / p.quizScore.total) * 100);
}
