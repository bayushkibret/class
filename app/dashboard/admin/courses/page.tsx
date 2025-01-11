'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addCourse, getCourses, deleteCourse } from './actions'

export default function AdminCourseManagement() {
  const [courses, setCourses] = useState([])
  const [courseName, setCourseName] = useState('')
  const [courseCode, setCourseCode] = useState('')

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    const fetchedCourses = await getCourses()
    setCourses(fetchedCourses)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!courseName.trim() || !courseCode.trim()) {
      alert('Please fill in all fields')
      return
    }
    await addCourse({ name: courseName, code: courseCode })
    setCourseName('')
    setCourseCode('')
    fetchCourses()
  }

  const handleDelete = async (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      await deleteCourse(courseId)
      fetchCourses()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Course Management</h1>
      <div className="w-full max-w-md space-y-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="courseName">Course Name</Label>
            <Input 
              id="courseName" 
              value={courseName} 
              onChange={(e) => setCourseName(e.target.value)} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="courseCode">Course Code</Label>
            <Input 
              id="courseCode" 
              value={courseCode} 
              onChange={(e) => setCourseCode(e.target.value)} 
              required 
            />
          </div>
          <Button type="submit" className="w-full">Add Course</Button>
        </form>
        <div>
          <h2 className="text-xl font-semibold mb-2">Course List</h2>
          <ul className="space-y-2">
            {courses.map((course) => (
              <li key={course.id} className="flex justify-between items-center">
                <span>{course.name} ({course.code})</span>
                <Button variant="destructive" onClick={() => handleDelete(course.id)}>Delete</Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

