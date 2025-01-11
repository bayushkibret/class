'use server'

interface User {
  name: string;
  email: string;
  userType: string;
}

let users: User[] = []

export async function addUser(user: User) {
  // Here you would typically save the user to your database
  console.log('Adding user:', user)
  
  // Simulate saving to database
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  users.push(user)
  console.log('User added successfully')
}

export async function getUsers(): Promise<User[]> {
  // Here you would typically fetch users from your database
  // This is a mock implementation
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return users
}

