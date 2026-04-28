'use client'

import { useEffect, useCallback } from 'react'

interface OptionListProps {
  options: string[]
  onSelect: (answer: string) => void
  disabled?: boolean
}

// FR10: 키보드 단축키 (1~4) 퀴즈 보기 선택
export function OptionList({ options, onSelect, disabled = false }: OptionListProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (disabled) return
      const index = parseInt(e.key, 10) - 1
      if (index >= 0 && index < options.length) {
        onSelect(options[index])
      }
    },
    [options, onSelect, disabled],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <ul className="flex flex-col gap-3">
      {options.map((option, idx) => (
        <li key={option}>
          <button
            onClick={() => !disabled && onSelect(option)}
            disabled={disabled}
            className="w-full text-left px-5 py-4 rounded-xl border border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span className="text-gray-400 font-mono mr-3">{idx + 1}</span>
            {option}
          </button>
        </li>
      ))}
    </ul>
  )
}
