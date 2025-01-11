'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { register } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function RegisterForm() {
  const [role, setRole] = useState<'student' | 'teacher' | ''>('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      formData.append('role', role)
      const result = await register(formData)

      if (!result.success) {
        setError(result.message || 'An error occurred')
        return
      }

      if (role === 'teacher') {
        router.push('/register/pending')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Additional fields based on role
  const renderRoleSpecificFields = () => {
    switch (role) {
      case 'teacher':
        return (
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" name="department" type="text" placeholder="e.g., Mathematics" />
          </div>
        )
      case 'student':
        return (
          <div className="space-y-2">
            <Label htmlFor="grade">Grade Level</Label>
            <Input id="grade" name="grade" type="number" min="1" max="12" placeholder="e.g., 9" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select value={role} onValueChange={(value: 'student' | 'teacher') => setRole(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="teacher">Teacher</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {renderRoleSpecificFields()}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  )
}

