// ±2σ 이상치 필터링 — 단일 극단값이 평균을 왜곡하는 문제를 막기 위해
// 중앙값(median) 기반 MAD로 σ를 추정한 뒤 필터링
export function filterLatencyOutliers(latencies: (number | null)[]): (number | null)[] {
  const valid = latencies.filter((v): v is number => v !== null)
  if (valid.length < 3) return latencies

  const sorted = [...valid].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  const median =
    sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]

  const deviations = valid.map((v) => Math.abs(v - median)).sort((a, b) => a - b)
  const madMid = Math.floor(deviations.length / 2)
  const mad =
    deviations.length % 2 === 0
      ? (deviations[madMid - 1] + deviations[madMid]) / 2
      : deviations[madMid]

  // MAD → σ 변환 (정규분포 일관성 상수 0.6745)
  const sigma = mad / 0.6745
  const lower = median - 2 * sigma
  const upper = median + 2 * sigma

  return latencies.map((v) => {
    if (v === null) return null
    return v >= lower && v <= upper ? v : null
  })
}

export function computeMedianLatency(latencies: (number | null)[]): number | null {
  const valid = latencies.filter((v): v is number => v !== null)
  if (valid.length === 0) return null
  const sorted = [...valid].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? Math.round((sorted[mid - 1] + sorted[mid]) / 2) : sorted[mid]
}
