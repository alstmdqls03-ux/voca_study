export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }

export type QuizType = 'multiple-choice' | 'fill-in-blank' | 'context-reading'

export interface QuizQuestion {
  id: string
  wordId: string
  word: string
  questionText: string
  options: string[]
  correctAnswer: string
  quizType: QuizType
  cognitiveLevel: CognitiveLevel
}

export interface QuizAnswer {
  questionId: string
  wordId: string
  selectedAnswer: string
  isCorrect: boolean
  responseLatencyMs: number | null
}

export type CognitiveLevel = 1 | 2 | 3 | 4 | 5
