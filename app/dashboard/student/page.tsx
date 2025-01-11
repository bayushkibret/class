'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getGrades, getCourses, enrollCourse } from './actions'

export default function StudentDashboard() {
  const [grades, setGrades] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('')

  useEffect(() => {
    fetchGrades()
    fetchCourses()
  }, [])

  const fetchGrades = async () => {
    const fetchedGrades = await getGrades()
    setGrades(fetchedGrades)
  }

  const fetchCourses = async () => {
    const fetchedCourses = await getCourses()
    setCourses(fetchedCourses)
  }

  const handleEnroll = async () => {
    if (!selectedCourse) {
      alert('Please select a course')
      return
    }
    await enrollCourse(selectedCourse)
    setSelectedCourse('')
    fetchCourses()
    fetchGrades()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Your Grades</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Course</th>
                <th className="text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => (
                <tr key={index}>
                  <td>{grade.course}</td>
                  <td>{grade.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Enroll in a Course</h2>
          <div className="flex space-x-2">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleEnroll}>Enroll</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

