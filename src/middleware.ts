import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if we're in production
  if (process.env.NODE_ENV === 'production') {
    // Check if the request is for the /admin path
    if (request.nextUrl.pathname === '/admin') {
      // Redirect to home page
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: '/admin',
} 