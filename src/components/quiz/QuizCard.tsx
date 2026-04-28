'use client'

import { useEffect } from 'react'
import type { QuizQuestion } from '@/types/quiz.types'
import { useReactionTimer } from './useReactionTimer'
import { OptionList } from './OptionList'

interface QuizCardProps {
  question: QuizQuestion
  questionNumber: number
  totalQuestions: number
  onAnswer: (selectedAnswer: string, latencyMs: number | null) => void
}

export function QuizCard({ question, questionNumber, totalQuestions, onAnswer }: QuizCardProps) {
  const { beginMeasure, finishMeasure } = useReactionTimer()

  useEffect(() => {
    beginMeasure()
  }, [question.id, beginMeasure])

  const handleSelect = (answer: string) => {
    const latencyMs = finishMeasure()
    onAnswer(answer, latencyMs)
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{questionNumber} / {totalQuestions}</span>
        <span className="capitalize text-xs bg-gray-100 px-2 py-1 rounded">
          Level {question.cognitiveLevel}
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <p className="text-lg font-medium text-gray-900 leading-relaxed">
          {question.questionText}
        </p>
        {question.word && (
          <p className="mt-2 text-2xl font-bold text-blue-600">{question.word}</p>
        )}
      </div>

      <OptionList
        options={question.options}
        onSelect={handleSelect}
      />
    </div>
  )
}
