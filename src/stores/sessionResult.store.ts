import { create } from 'zustand'
import type { CognitiveLevel, QuizAnswer } from '@/types/quiz.types'

interface LevelChange {
  wordId: string
  word: string
  previousLevel: CognitiveLevel
  newLevel: CognitiveLevel
}

interface SessionResultState {
  totalAnswered: number
  correctCount: number
  levelChanges: LevelChange[]
  medianLatencyMs: number | null
  completedAt: string | null
}

interface SessionResultActions {
  setResult: (result: Omit<SessionResultState, 'completedAt'>) => void
  clearResult: () => void
}

export const useSessionResultStore = create<SessionResultState & SessionResultActions>((set) => ({
  totalAnswered: 0,
  correctCount: 0,
  levelChanges: [],
  medianLatencyMs: null,
  completedAt: null,

  setResult: (result) => set({ ...result, completedAt: new Date().toISOString() }),
  clearResult: () =>
    set({ totalAnswered: 0, correctCount: 0, levelChanges: [], medianLatencyMs: null, completedAt: null }),
}))

export type { LevelChange, QuizAnswer }
