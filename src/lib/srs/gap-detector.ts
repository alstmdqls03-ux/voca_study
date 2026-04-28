import type { GapDetectionResult } from '@/types/srs.types'

const GAP_THRESHOLD_DAYS = 14

// FR19: 14일 이상 공백 감지 시 복귀 세션 모드 전환
export function detectStudyGap(lastStudiedAt: string | null): GapDetectionResult {
  if (!lastStudiedAt) {
    return { hasGap: false, gapDays: 0, requiresReturnSession: false }
  }

  const gapMs = Date.now() - new Date(lastStudiedAt).getTime()
  const gapDays = Math.floor(gapMs / (1000 * 60 * 60 * 24))
  const requiresReturnSession = gapDays >= GAP_THRESHOLD_DAYS

  return { hasGap: gapDays > 0, gapDays, requiresReturnSession }
}
