import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define protected routes
  const isAdminRoute = path.startsWith('/admin');
  
  if (isAdminRoute) {
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    
    // Check if the user is authenticated and is an admin
    const isAuthenticated = !!session;
    const isAdmin = session?.role === 'admin';
    
    // If not authenticated or not an admin, redirect to home page
    if (!isAuthenticated || !isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // For admin routes, ensure the response is not cached
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  }
  
  return NextResponse.next();
}

// Configure the paths that should be matched by this middleware
export const config = {
  matcher: [
    '/admin',
    '/admin/changes',
    '/admin/products',
    '/admin/categories',
    '/admin/:path*',
  ],
};
