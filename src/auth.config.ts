import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isOnTools = ["/budget", "/portfolio", "/analytics", "/tax", "/goals", "/settings"].some(p => nextUrl.pathname.startsWith(p))
      
      if (isOnDashboard || isOnTools) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }
      return true
    },
  },
  providers: [], // Add providers in auth.ts
} satisfies NextAuthConfig
