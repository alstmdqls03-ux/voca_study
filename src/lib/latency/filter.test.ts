import { describe, it, expect } from 'vitest'
import { filterLatencyOutliers, computeMedianLatency } from './filter'

describe('filterLatencyOutliers', () => {
  it('returns original array when fewer than 3 valid items', () => {
    expect(filterLatencyOutliers([100, null])).toEqual([100, null])
  })

  it('nullifies values beyond ±2σ', () => {
    const latencies = [200, 210, 205, 195, 30000]
    const result = filterLatencyOutliers(latencies)
    expect(result[4]).toBeNull()
    expect(result[0]).toBe(200)
  })
})

describe('computeMedianLatency', () => {
  it('returns null for empty or all-null array', () => {
    expect(computeMedianLatency([null, null])).toBeNull()
  })

  it('computes median correctly', () => {
    expect(computeMedianLatency([100, 200, 300])).toBe(200)
    expect(computeMedianLatency([100, 200])).toBe(150)
  })
})
