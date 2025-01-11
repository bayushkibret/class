'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { addUser, getUsers } from './actions'

export default function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addUser({ name, email, userType })
    setName('')
    setEmail('')
    setUserType('')
    fetchUsers()
  }

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers()
    setUsers(fetchedUsers)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="w-full max-w-md space-y-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="userType">User Type</Label>
            <Select value={userType} onValueChange={setUserType}>
              <SelectTrigger>
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Add User</Button>
        </form>
        <div>
          <h2 className="text-xl font-semibold mb-2">User List</h2>
          <Button onClick={fetchUsers} className="mb-2">Refresh Users</Button>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.name} - {user.email} ({user.userType})</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

