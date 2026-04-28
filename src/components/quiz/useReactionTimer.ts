'use client'

import { useEffect, useCallback } from 'react'
import {
  startLatencyMeasure,
  endLatencyMeasure,
  invalidateLatencyMeasure,
} from '@/lib/latency/measure'

interface UseReactionTimerReturn {
  beginMeasure: () => void
  finishMeasure: () => number | null
}

// FR8: 문제 표시 시점부터 첫 입력까지 레이턴시 측정
// FR9: 탭 전환·포커스 이탈 시 무효 처리
export function useReactionTimer(): UseReactionTimerReturn {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        invalidateLatencyMeasure()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  const beginMeasure = useCallback(() => {
    startLatencyMeasure()
  }, [])

  const finishMeasure = useCallback((): number | null => {
    return endLatencyMeasure()
  }, [])

  return { beginMeasure, finishMeasure }
}
