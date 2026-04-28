import { describe, it, expect } from 'vitest'
import { calculateCognitiveLevel } from './cognitive-level'

describe('calculateCognitiveLevel', () => {
  it('returns 1 when accuracy < 50%', () => {
    expect(calculateCognitiveLevel({ medianLatencyMs: 1000, accuracyRate: 0.4 })).toBe(1)
  })

  it('returns 5 when accuracy >= 90% and latency <= 1500ms', () => {
    expect(calculateCognitiveLevel({ medianLatencyMs: 1200, accuracyRate: 0.95 })).toBe(5)
  })

  it('returns 3 when latency is null but accuracy 70%+', () => {
    expect(calculateCognitiveLevel({ medianLatencyMs: null, accuracyRate: 0.75 })).toBe(3)
  })
})
