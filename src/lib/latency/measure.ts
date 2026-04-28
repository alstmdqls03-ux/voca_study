let measureStart: number | null = null
let invalidated = false

export function startLatencyMeasure(): void {
  invalidated = false
  requestAnimationFrame(() => {
    measureStart = performance.now()
  })
}

export function endLatencyMeasure(): number | null {
  if (invalidated || measureStart === null) return null
  const latencyMs = Math.round(performance.now() - measureStart)
  measureStart = null
  return latencyMs
}

export function invalidateLatencyMeasure(): void {
  invalidated = true
  measureStart = null
}
