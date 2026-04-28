import type { CognitiveLevel } from '@/types/quiz.types'

interface LevelInput {
  medianLatencyMs: number | null
  accuracyRate: number
}

// FR13: 레이턴시 + 정답률 → Cognitive Level 1~5 산출
export function calculateCognitiveLevel({ medianLatencyMs, accuracyRate }: LevelInput): CognitiveLevel {
  if (accuracyRate < 0.5) return 1
  if (accuracyRate < 0.7) return 2

  if (medianLatencyMs === null) return 3

  if (accuracyRate >= 0.9 && medianLatencyMs <= 1500) return 5
  if (accuracyRate >= 0.8 && medianLatencyMs <= 2500) return 4
  if (accuracyRate >= 0.7 && medianLatencyMs <= 4000) return 3

  return 2
}
