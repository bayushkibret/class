'use server'

interface GradeSubmission {
  student: string;
  course: string;
  grade: string;
}

interface GradeOverview {
  student: string;
  course: string;
  grade: string;
}

let grades: GradeOverview[] = []

export async function submitGrade(data: GradeSubmission) {
  // Here you would typically save the grade to your database
  console.log('Submitting grade:', data)
  
  // Simulate saving to database
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  grades.push(data)
  console.log('Grade submitted successfully')
}

export async function getGradeOverview(): Promise<GradeOverview[]> {
  // Here you would typically fetch grades from your database
  // This is a mock implementation
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return grades
}

