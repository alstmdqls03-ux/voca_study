'use client'

import { useEffect } from 'react'
import { useQuizSessionStore } from '@/stores/quizSession.store'
import { QuizCard } from '@/components/quiz/QuizCard'
import type { QuizQuestion } from '@/types/quiz.types'

// 개발용 stub — 실제 구현 시 Server Action으로 교체
const STUB_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    wordId: 'w1',
    word: 'precipitously',
    questionText: 'What does the word best mean in context?',
    options: ['gradually', 'steeply and suddenly', 'carefully', 'repeatedly'],
    correctAnswer: 'steeply and suddenly',
    quizType: 'multiple-choice',
    cognitiveLevel: 3,
  },
]

export default function QuizSession() {
  const { status, currentIndex, startSession, recordAnswer, nextQuestion, completeSession, restoreDraft, saveDraft } =
    useQuizSessionStore()

  useEffect(() => {
    const restored = restoreDraft()
    if (!restored) {
      startSession(STUB_QUESTIONS.length)
    }
  }, [restoreDraft, startSession])

  // FR22: 페이지 이탈 시 세션 상태 저장
  useEffect(() => {
    window.addEventListener('beforeunload', saveDraft)
    return () => window.removeEventListener('beforeunload', saveDraft)
  }, [saveDraft])

  if (status === 'idle') return <p className="text-gray-400">세션 준비 중...</p>

  if (status === 'completed') {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">세션 완료!</h2>
        <p className="text-gray-500 mt-2">결과를 집계하는 중입니다...</p>
      </div>
    )
  }

  const currentQuestion = STUB_QUESTIONS[currentIndex]
  if (!currentQuestion) return null

  const handleAnswer = (selectedAnswer: string, latencyMs: number | null) => {
    recordAnswer(
      {
        questionId: currentQuestion.id,
        wordId: currentQuestion.wordId,
        selectedAnswer,
        isCorrect: selectedAnswer === currentQuestion.correctAnswer,
        responseLatencyMs: latencyMs ?? 0,
      },
      latencyMs,
    )

    if (currentIndex + 1 >= STUB_QUESTIONS.length) {
      completeSession()
    } else {
      nextQuestion()
    }
  }

  return (
    <QuizCard
      question={currentQuestion}
      questionNumber={currentIndex + 1}
      totalQuestions={STUB_QUESTIONS.length}
      onAnswer={handleAnswer}
    />
  )
}
