import { create } from 'zustand'
import type { QuizAnswer } from '@/types/quiz.types'

const STORAGE_KEY = 'voca_quiz_session_draft'

interface QuizSessionState {
  currentIndex: number
  answers: QuizAnswer[]
  latencies: (number | null)[]
  status: 'idle' | 'active' | 'paused' | 'completed'
  totalQuestions: number
}

interface QuizSessionActions {
  startSession: (totalQuestions: number) => void
  recordAnswer: (answer: QuizAnswer, latencyMs: number | null) => void
  nextQuestion: () => void
  pauseSession: () => void
  resumeSession: () => void
  completeSession: () => void
  resetSession: () => void
  saveDraft: () => void
  restoreDraft: () => boolean
}

const initialState: QuizSessionState = {
  currentIndex: 0,
  answers: [],
  latencies: [],
  status: 'idle',
  totalQuestions: 0,
}

export const useQuizSessionStore = create<QuizSessionState & QuizSessionActions>((set, get) => ({
  ...initialState,

  startSession: (totalQuestions) =>
    set({ ...initialState, status: 'active', totalQuestions }),

  recordAnswer: (answer, latencyMs) =>
    set((state) => ({
      answers: [...state.answers, answer],
      latencies: [...state.latencies, latencyMs],
    })),

  nextQuestion: () =>
    set((state) => ({ currentIndex: state.currentIndex + 1 })),

  pauseSession: () => set({ status: 'paused' }),

  resumeSession: () => set({ status: 'active' }),

  completeSession: () => set({ status: 'completed' }),

  resetSession: () => set(initialState),

  saveDraft: () => {
    const { currentIndex, answers, latencies, status, totalQuestions } = get()
    if (status === 'idle' || status === 'completed') return
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ currentIndex, answers, latencies, status, totalQuestions }),
    )
  },

  restoreDraft: () => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    try {
      const draft = JSON.parse(raw) as QuizSessionState
      set(draft)
      return true
    } catch {
      return false
    }
  },
}))
