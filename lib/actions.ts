'use server'

import { cookies } from 'next/headers'
import db from './db'
import { AuthResponse, Role } from './types'

export async function login(formData: FormData): Promise<AuthResponse> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const user = await db.validateUser(email, password)
    if (!user) {
      return { success: false, message: 'Invalid credentials' }
    }

    if (user.status !== 'active') {
      return { success: false, message: 'Account is pending approval' }
    }

    // Create session
    const sessionId = db.createSession(user.id)
    cookies().set('session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    const { password: _, ...userWithoutPassword } = user
    return { success: true, user: userWithoutPassword }
  } catch (error) {
    return { success: false, message: 'An error occurred' }
  }
}

export async function register(formData: FormData): Promise<AuthResponse> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string
  const role = formData.get('role') as Role

  try {
    // Check if user exists
    const existingUser = db.getUserByEmail(email)
    if (existingUser) {
      return { success: false, message: 'Email already exists' }
    }

    // Create user
    const user = await db.createUser({
      email,
      password,
      name,
      role,
      status: role === 'teacher' ? 'pending' : 'active',
    })

    if (role === 'teacher') {
      return { success: true, message: 'Registration successful. Waiting for approval.' }
    }

    // Create session
    const sessionId = db.createSession(user.id)
    cookies().set('session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    const { password: _, ...userWithoutPassword } = user
    return { success: true, user: userWithoutPassword }
  } catch (error) {
    return { success: false, message: 'An error occurred' }
  }
}

export async function logout() {
  const sessionId = cookies().get('session')?.value
  if (sessionId) {
    db.removeSession(sessionId)
    cookies().delete('session')
  }
}

export async function getCurrentUser() {
  const sessionId = cookies().get('session')?.value
  if (!sessionId) return null

  const user = db.getUserBySession(sessionId)
  if (!user) return null

  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function approveTeacher(userId: string) {
  const user = db.getUser(userId)
  if (!user || user.role !== 'teacher' || user.status !== 'pending') {
    return { success: false, message: 'Invalid user or status' }
  }

  user.status = 'active'
  return { success: true, message: 'Teacher approved successfully' }
}

export async function rejectTeacher(userId: string) {
  const user = db.getUser(userId)
  if (!user || user.role !== 'teacher' || user.status !== 'pending') {
    return { success: false, message: 'Invalid user or status' }
  }

  user.status = 'rejected'
  return { success: true, message: 'Teacher rejected successfully' }
}

export async function deleteUser(userId: string) {
  const user = db.getUser(userId)
  if (!user) {
    return { success: false, message: 'User not found' }
  }

  // Don't allow deleting the last admin
  if (user.role === 'admin') {
    const admins = db.getAllUsers().filter(u => u.role === 'admin')
    if (admins.length === 1) {
      return { success: false, message: 'Cannot delete the last admin' }
    }
  }

  db.users.delete(userId)
  return { success: true, message: 'User deleted successfully' }
}

