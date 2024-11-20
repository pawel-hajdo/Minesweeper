import { NextRequest, NextResponse } from 'next/server';
import { isExpired } from "react-jwt";

const publicRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const isAuthenticated = token && !isExpired(token);

    const { pathname } = request.nextUrl;

    if (isAuthenticated && publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isAuthenticated && !publicRoutes.includes(request.nextUrl.pathname)) {
        const absoluteURL = new URL('/login', request.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
