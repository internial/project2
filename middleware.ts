import { authMiddleware } from '@clerk/nextjs';

/**
 * Middleware to protect routes
 * All routes that start with /books/add, /books/edit, or /books/delete will require authentication
 */
export default authMiddleware({
  publicRoutes: [
    '/',                // Home page
    '/books',           // Public books listing
    '/api/books',       // Public API for getting books
    '/api/books/(.*)',  // Any other public book-related API endpoints
  ],
  ignoredRoutes: [
    // No ignored routes needed unless you have specific cases
  ],
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',  // Match all routes except static files and Next.js internals
    '/',                            // Include the home page
    '/api/:path*',                  // Include all API routes
    '/books/(add|edit|delete)',     // Protect book-related routes requiring authentication
  ],
};
