'use server'

import { redirect } from 'next/navigation'

export async function registerUser(formData: FormData) {
  // Here you would typically save the user to your database
  // and send an OTP to their email
  const email = formData.get('email')
  const userType = formData.get('userType')
  
  console.log('Registering user:', Object.fromEntries(formData))
  
  // Simulate sending OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  console.log('OTP sent:', otp)

  // Redirect to OTP verification page
  redirect(`/verify-otp?email=${email}&userType=${userType}`)
}

