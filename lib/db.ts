import { User, Role } from './types'
import { hash, compare } from 'bcrypt'

// In-memory database
class LocalDB {
  private users: Map<string, User>
  private sessions: Map<string, string> // sessionId -> userId

  constructor() {
    this.users = new Map()
    this.sessions = new Map()

    // Create default admin user
    this.createUser({
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
      status: 'active',
    })
  }

  async createUser({ email, password, name, role, status }: Omit<User, 'id' | 'createdAt'>) {
    const id = Math.random().toString(36).slice(2)
    const hashedPassword = await hash(password, 10)

    const user: User = {
      id,
      email,
      password: hashedPassword,
      name,
      role,
      status,
      createdAt: new Date(),
    }

    this.users.set(id, user)
    return user
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = Array.from(this.users.values()).find(u => u.email === email)
    if (!user) return null

    const isValid = await compare(password, user.password)
    if (!isValid) return null

    return user
  }

  getUser(id: string) {
    return this.users.get(id) || null
  }

  getUserByEmail(email: string) {
    return Array.from(this.users.values()).find(u => u.email === email) || null
  }

  getAllUsers() {
    return Array.from(this.users.values())
  }

  createSession(userId: string): string {
    const sessionId = Math.random().toString(36).slice(2)
    this.sessions.set(sessionId, userId)
    return sessionId
  }

  getUserBySession(sessionId: string): User | null {
    const userId = this.sessions.get(sessionId)
    if (!userId) return null
    return this.getUser(userId)
  }

  removeSession(sessionId: string) {
    this.sessions.delete(sessionId)
  }
}

// Create a singleton instance
const db = new LocalDB()
export default db

