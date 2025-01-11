import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { loginUser } from './actions'

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form action={loginUser} className="w-full max-w-xs">
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </div>
      </form>
      <Link href="/forgot-password" className="mt-4 text-sm text-blue-500 hover:underline">
        Forgot password?
      </Link>
    </div>
  )
}

