import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isProtectedRoute = ["/dashboard", "/budget", "/portfolio", "/analytics", "/tax", "/goals", "/settings"].some(p => nextUrl.pathname.startsWith(p))
  const isAuthRoute = ["/login", "/register"].some(p => nextUrl.pathname === p)

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl))
  }

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", nextUrl))
  }

  return // NextResponse.next() is implicit in the auth() wrapper if no return
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
