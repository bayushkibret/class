import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Grade Management System',
  description: 'A system for managing grades with multiple user types',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/register">Register</Link></li>
            <li><Link href="/dashboard/admin">Admin Dashboard</Link></li>
            <li><Link href="/dashboard/admin/courses">Course Management</Link></li>
            <li><Link href="/dashboard/teacher">Teacher Dashboard</Link></li>
            <li><Link href="/dashboard/student">Student Dashboard</Link></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}

