import { describe, it, expect, beforeEach, vi } from 'vitest'
import { startLatencyMeasure, endLatencyMeasure, invalidateLatencyMeasure } from './measure'

describe('latency/measure', () => {
  beforeEach(() => {
    vi.stubGlobal('performance', { now: vi.fn().mockReturnValue(100) })
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => { cb(0); return 0 })
  })

  it('returns null when measure not started', () => {
    expect(endLatencyMeasure()).toBeNull()
  })

  it('returns null after invalidation', () => {
    startLatencyMeasure()
    invalidateLatencyMeasure()
    expect(endLatencyMeasure()).toBeNull()
  })
})
