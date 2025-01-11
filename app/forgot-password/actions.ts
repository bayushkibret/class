'use server'

import { redirect } from 'next/navigation'

export async function resetPassword(formData: FormData) {
  // Here you would typically send a password reset email to the user
  const email = formData.get('email')
  
  console.log('Resetting password for:', email)
  
  // Simulate sending password reset email
  console.log('Password reset email sent')

  // Redirect to login page
  redirect('/login')
}

