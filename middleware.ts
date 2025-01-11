import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Get session from cookie
  const session = req.cookies.get('session')

  // If no session, redirect to login
  if (!session && req.nextUrl.pathname !== '/login' && req.nextUrl.pathname !== '/register') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/teacher/:path*', '/student/:path*'],
}

