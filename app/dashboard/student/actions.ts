'use server'

interface Grade {
  course: string;
  grade: number;
}

interface Course {
  id: string;
  name: string;
  code: string;
}

let grades: Grade[] = [
  { course: 'Mathematics', grade: 85 },
  { course: 'Science', grade: 92 },
  { course: 'History', grade: 78 },
]

let courses: Course[] = [
  { id: '1', name: 'Mathematics', code: 'MATH101' },
  { id: '2', name: 'Science', code: 'SCI101' },
  { id: '3', name: 'History', code: 'HIST101' },
  { id: '4', name: 'English', code: 'ENG101' },
]

export async function getGrades(): Promise<Grade[]> {
  // Here you would typically fetch grades from your database
  // This is a mock implementation
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return grades
}

export async function getCourses(): Promise<Course[]> {
  // Here you would typically fetch courses from your database
  // This is a mock implementation
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return courses
}

export async function enrollCourse(courseId: string) {
  // Here you would typically enroll the student in the course in your database
  console.log('Enrolling in course:', courseId)
  
  // Simulate enrolling in the course
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const course = courses.find(c => c.id === courseId)
  if (course) {
    grades.push({ course: course.name, grade: 0 })
    console.log('Enrolled successfully')
  } else {
    console.log('Course not found')
  }
}

