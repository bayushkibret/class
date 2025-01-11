export type Role = 'admin' | 'teacher' | 'student'

export interface User {
  id: string
  email: string
  name: string
  role: Role
  status: 'pending' | 'active'
  password: string // In a real app, this would be hashed
  createdAt: Date
}

export interface AuthResponse {
  success: boolean
  message?: string
  user?: Omit<User, 'password'>
}

