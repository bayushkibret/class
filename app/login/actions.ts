'use server'

import { redirect } from 'next/navigation'

export async function loginUser(formData: FormData) {
  // Here you would typically verify the user's credentials
  const email = formData.get('email')
  const password = formData.get('password')
  
  console.log('Logging in user:', { email, password })
  
  // Simulate login
  // In a real application, you'd check the credentials against your database
  // and determine the user type
  const userType = 'student' // This would be determined based on the user's actual type
  
  // Redirect to appropriate dashboard
  redirect(`/dashboard/${userType}`)
}

