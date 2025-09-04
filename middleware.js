
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("session")?.value;
  const path = req.nextUrl.pathname;
  const publicPath = ["/login","/"];

  if (!token && !publicPath.includes(path)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

 if(token && publicPath.includes(path) && path !== '/'){
    return NextResponse.redirect(new URL('/', req.url))

 }
  return NextResponse.next()
}
export const config = {
  matcher: ['/','/login','/logout','/sell','/my-listing'],
};