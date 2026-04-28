import type { Metadata } from 'next'
import QuizSession from './_components/QuizSession'

export const metadata: Metadata = { title: 'Quiz — VOCA' }

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <QuizSession />
    </main>
  )
}
