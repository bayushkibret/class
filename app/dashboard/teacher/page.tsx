'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { submitGrade, getGradeOverview } from './actions'

export default function TeacherDashboard() {
  const [student, setStudent] = useState('')
  const [course, setCourse] = useState('')
  const [grade, setGrade] = useState('')
  const [gradeOverview, setGradeOverview] = useState([])

  useEffect(() => {
    fetchGradeOverview()
  }, [])

  const fetchGradeOverview = async () => {
    const overview = await getGradeOverview()
    setGradeOverview(overview)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!student || !course || !grade) {
      alert('Please fill in all fields')
      return
    }
    await submitGrade({ student, course, grade })
    setStudent('')
    setCourse('')
    setGrade('')
    fetchGradeOverview()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
      <div className="w-full max-w-md space-y-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="student">Student</Label>
            <Select value={student} onValueChange={setStudent}>
              <SelectTrigger>
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student1">Student 1</SelectItem>
                <SelectItem value="student2">Student 2</SelectItem>
                <SelectItem value="student3">Student 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="course">Course</Label>
            <Select value={course} onValueChange={setCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="grade">Grade</Label>
            <Input 
              id="grade" 
              value={grade} 
              onChange={(e) => setGrade(e.target.value)} 
              type="number" 
              min="0" 
              max="100" 
              required 
            />
          </div>
          <Button type="submit" className="w-full">Submit Grade</Button>
        </form>
        <div>
          <h2 className="text-xl font-semibold mb-2">Grade Overview</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Student</th>
                <th className="text-left">Course</th>
                <th className="text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {gradeOverview.map((grade, index) => (
                <tr key={index}>
                  <td>{grade.student}</td>
                  <td>{grade.course}</td>
                  <td>{grade.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

