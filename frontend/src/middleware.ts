import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("backend.token");

  const publicPaths = ["/signin"];
  const url = req.url;

  if (!token && !publicPaths.some(path => url.includes(path))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
