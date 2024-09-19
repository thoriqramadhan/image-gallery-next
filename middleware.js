import { NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const publicRoutes = ['/login', '/register']

export default async function middleware(req) {
  const path = req.nextUrl.pathname

  // 2. Check if the current route is public
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route))

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  // 4. Redirect to /login if the user is not authenticated and route is protected
  if (!isPublicRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 5. Redirect to /profile if the user is authenticated and accessing a public route
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL('/?page=1&per_page=12', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
