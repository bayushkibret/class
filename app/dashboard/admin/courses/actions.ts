'use server'

import { v4 as uuidv4 } from 'uuid'

interface Course {
  id: string;
  name: string;
  code: string;
}

let courses: Course[] = []

export async function addCourse(course: Omit<Course, 'id'>) {
  // Here you would typically save the course to your database
  console.log('Adding course:', course)
  
  // Simulate saving to database
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const newCourse = { ...course, id: uuidv4() }
  courses.push(newCourse)
  console.log('Course added successfully')
}

export async function getCourses(): Promise<Course[]> {
  // Here you would typically fetch courses from your database
  // This is a mock implementation
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return courses
}

export async function deleteCourse(courseId: string) {
  // Here you would typically delete the course from your database
  console.log('Deleting course:', courseId)
  
  // Simulate deleting from database
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  courses = courses.filter(course => course.id !== courseId)
  console.log('Course deleted successfully')
}

