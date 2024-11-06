import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get('token')?.value
  const path = req.nextUrl.pathname

  if (path.startsWith('/login') && path.startsWith('/register')) { return NextResponse.next() }

  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = '/login' 
    return NextResponse.redirect(url)
  }
  
    return NextResponse.next()
  }
  
export const config = {
  matcher: ['/feed/:path*', '/post/:path*'], 
};