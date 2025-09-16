
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("session")?.value || null;
  const path = req.nextUrl.pathname;
  const publicPath = ["/login","/"];

  if (!token && !publicPath.includes(path)) {
    console.log(token , "this is token")
    return NextResponse.redirect(new URL('/login', req.url))
  }

 if(token && path === "/login"){
    console.log(token , "this is token")

    return NextResponse.redirect(new URL('/', req.url))

 }
  return NextResponse.next()
}
export const config = {
  matcher: ['/','/login','/logout','/sell','/my-listing','/product/:path*'],
};