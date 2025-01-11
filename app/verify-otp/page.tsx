import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { verifyOTP } from './actions'

export default function VerifyOTP({ searchParams }: { searchParams: { email: string, userType: string } }) {
  const { email, userType } = searchParams

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
      <form action={verifyOTP} className="w-full max-w-xs">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="userType" value={userType} />
        <div className="space-y-4">
          <div>
            <Label htmlFor="otp">Enter OTP</Label>
            <Input id="otp" name="otp" required />
          </div>
          <Button type="submit" className="w-full">Verify OTP</Button>
        </div>
      </form>
    </div>
  )
}

