'use server'

import { redirect } from 'next/navigation'

export async function verifyOTP(formData: FormData) {
  // Here you would typically verify the OTP against what was sent
  const otp = formData.get('otp')
  const email = formData.get('email')
  const userType = formData.get('userType')
  
  console.log('Verifying OTP:', { otp, email, userType })
  
  // Simulate OTP verification
  if (otp === '123456') {
    console.log('OTP verified successfully')
    // Redirect to appropriate dashboard based on user type
    redirect(`/dashboard/${userType}`)
  } else {
    console.log('Invalid OTP')
    // In a real application, you'd want to show an error message
    redirect('/register')
  }
}

