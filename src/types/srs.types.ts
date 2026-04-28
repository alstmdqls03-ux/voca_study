import type { CognitiveLevel } from './quiz.types'

export interface ReviewSchedule {
  wordId: string
  userId: string
  cognitiveLevel: CognitiveLevel
  nextReviewAt: string
  intervalDays: number
  createdAt: string
  updatedAt: string
}

export interface GapDetectionResult {
  hasGap: boolean
  gapDays: number
  requiresReturnSession: boolean
}
