'use client'

import { useActionState, useState } from 'react'
import { loginAction, signupAction } from '@/actions/auth.actions'
import type { ActionResult } from '@/types/quiz.types'

const initialState: ActionResult<null> = { success: false, error: '' }

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [loginState, loginDispatch, loginPending] = useActionState(loginAction, initialState)
  const [signupState, signupDispatch, signupPending] = useActionState(signupAction, initialState)

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">VOCA</h1>

        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`flex-1 pb-2 text-sm font-medium ${tab === 'login' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-400'}`}
            onClick={() => setTab('login')}
            type="button"
          >
            로그인
          </button>
          <button
            className={`flex-1 pb-2 text-sm font-medium ${tab === 'signup' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-400'}`}
            onClick={() => setTab('signup')}
            type="button"
          >
            회원가입
          </button>
        </div>

        {tab === 'login' && (
          <form action={loginDispatch} className="flex flex-col gap-4">
            <input
              name="email"
              type="email"
              placeholder="이메일"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            {loginState.success === false && loginState.error && (
              <p className="text-sm text-red-600">{loginState.error}</p>
            )}
            <button
              type="submit"
              disabled={loginPending}
              className="w-full py-2 bg-gray-900 text-white rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {loginPending ? '로그인 중...' : '로그인'}
            </button>
          </form>
        )}

        {tab === 'signup' && (
          <form action={signupDispatch} className="flex flex-col gap-4">
            <input
              name="email"
              type="email"
              placeholder="이메일"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <input
              name="password"
              type="password"
              placeholder="비밀번호 (6자 이상)"
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            {signupState.success === false && signupState.error && (
              <p className="text-sm text-red-600">{signupState.error}</p>
            )}
            <button
              type="submit"
              disabled={signupPending}
              className="w-full py-2 bg-gray-900 text-white rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {signupPending ? '가입 중...' : '가입하기'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
