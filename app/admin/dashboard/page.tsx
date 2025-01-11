import { Suspense } from 'react'
import { getCurrentUser } from '@/lib/actions'
import { DataTable } from './data-table'
import { columns } from './columns'
import db from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserCheck, Clock, AlertCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

function StatsCard({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string
  value: string | number
  icon: React.ElementType
  description: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function DashboardStats() {
  const users = db.getAllUsers()
  const totalUsers = users.length
  const activeTeachers = users.filter(u => u.role === 'teacher' && u.status === 'active').length
  const pendingTeachers = users.filter(u => u.role === 'teacher' && u.status === 'pending').length
  const totalStudents = users.filter(u => u.role === 'student').length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Users"
        value={totalUsers}
        icon={Users}
        description="Total registered users"
      />
      <StatsCard
        title="Active Teachers"
        value={activeTeachers}
        icon={UserCheck}
        description="Approved teacher accounts"
      />
      <StatsCard
        title="Pending Approvals"
        value={pendingTeachers}
        icon={Clock}
        description="Teachers awaiting approval"
      />
      <StatsCard
        title="Total Students"
        value={totalStudents}
        icon={AlertCircle}
        description="Registered students"
      />
    </div>
  )
}

export default async function AdminDashboard() {
  const currentUser = await getCurrentUser()
  if (!currentUser || currentUser.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  const users = db.getAllUsers().map(({ password, ...user }) => user)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {currentUser.name}
        </p>
      </div>

      <Suspense fallback={
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4).fill(0).map((_, i) => (
            <Card key={i}>
              <CardHeader className="space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-32 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      }>
        <DashboardStats />
      </Suspense>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <h2 className="text-xl font-semibold">User Management</h2>
          <p className="text-sm text-muted-foreground">
            Manage and monitor user accounts
          </p>
        </div>
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  )
}

