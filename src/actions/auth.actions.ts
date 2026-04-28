'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { ActionResult } from '@/types/quiz.types'

function sanitizeSignupError(message: string): string {
  if (message.includes('already registered') || message.includes('already been registered')) {
    return '이미 가입된 이메일입니다.'
  }
  if (message.includes('Password should be at least')) {
    return '비밀번호는 6자 이상이어야 합니다.'
  }
  if (message.includes('invalid format') || message.includes('validate email')) {
    return '유효하지 않은 이메일 형식입니다.'
  }
  return '회원가입에 실패했습니다. 다시 시도해 주세요.'
}

export async function loginAction(
  _prevState: ActionResult<null>,
  formData: FormData,
): Promise<ActionResult<null>> {
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const password = (formData.get('password') as string | null) ?? ''

  if (!email || !password) {
    return { success: false, error: '이메일과 비밀번호를 입력해 주세요.' }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' }
    }
  } catch {
    return { success: false, error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' }
  }

  redirect('/')
}

export async function signupAction(
  _prevState: ActionResult<null>,
  formData: FormData,
): Promise<ActionResult<null>> {
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const password = (formData.get('password') as string | null) ?? ''

  if (!email || !password) {
    return { success: false, error: '이메일과 비밀번호를 입력해 주세요.' }
  }
  if (password.length < 6) {
    return { success: false, error: '비밀번호는 6자 이상이어야 합니다.' }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      return { success: false, error: sanitizeSignupError(error.message) }
    }
  } catch {
    return { success: false, error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' }
  }

  redirect('/')
}

export async function logoutAction(): Promise<void> {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch {
    // 로그아웃 실패해도 /login으로 리다이렉트
  }
  redirect('/login')
}
