import type { CognitiveLevel } from '@/types/quiz.types'

// FR17: Level별 동적 복습 주기 (단위: 일)
const REVIEW_INTERVALS: Record<CognitiveLevel, number[]> = {
  1: [1, 4, 7],
  2: [1, 4, 7],
  3: [4, 7, 14],
  4: [7, 14, 30],
  5: [7, 30, 90],
}

export function getNextIntervalDays(level: CognitiveLevel, repetitionCount: number): number {
  const intervals = REVIEW_INTERVALS[level]
  const idx = Math.min(repetitionCount, intervals.length - 1)
  return intervals[idx]
}

export function computeNextReviewDate(level: CognitiveLevel, repetitionCount: number, from: Date = new Date()): Date {
  const days = getNextIntervalDays(level, repetitionCount)
  const next = new Date(from)
  next.setDate(next.getDate() + days)
  return next
}
