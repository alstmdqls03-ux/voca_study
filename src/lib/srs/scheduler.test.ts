import { describe, it, expect } from 'vitest'
import { getNextIntervalDays, computeNextReviewDate } from './scheduler'

describe('getNextIntervalDays', () => {
  it('Level 1 첫 복습은 1일', () => {
    expect(getNextIntervalDays(1, 0)).toBe(1)
  })

  it('Level 5 세 번째 복습은 90일', () => {
    expect(getNextIntervalDays(5, 2)).toBe(90)
  })

  it('반복 횟수가 범위 초과 시 마지막 인터벌 반환', () => {
    expect(getNextIntervalDays(3, 99)).toBe(14)
  })
})

describe('computeNextReviewDate', () => {
  it('기준일로부터 정확한 날짜 계산', () => {
    const base = new Date('2026-01-01')
    const result = computeNextReviewDate(5, 0, base)
    expect(result.toISOString().slice(0, 10)).toBe('2026-01-08')
  })
})
