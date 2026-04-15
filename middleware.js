import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log(request.cookies.getAll());
  const token = request.cookies.get('jwt')?.value;
  const isAuth = Boolean(token);

  const path = request.nextUrl.pathname;

  const isProtected =
    path === '/my-tours' ||
    path === '/account' ||
    path.startsWith('/account/');

  if (!isAuth && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuth && path === '/login') {
    return NextResponse.redirect(new URL('/tours', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/my-tours', '/account', '/login'],
};