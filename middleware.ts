import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define protected API routes
const isProtectedRoute = createRouteMatcher([
  '/api/cron',
  '/api/apolloapi',
  '/api/db',
  '/api/db/:id', // Dynamic route

]);

export default clerkMiddleware(async (auth, req) => {
  // Protect only the defined routes
  if (isProtectedRoute(req)) {
    await auth.protect(); // Enforce authentication
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next| [^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}