import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Clerk only runs on the client portal, and only once its keys are set. The public site never
// passes through it, so marketing pages stay static and fast.
const clerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);
const isPublicPortalRoute = createRouteMatcher(["/portal/sign-in(.*)"]);

const clerk = clerkConfigured
  ? clerkMiddleware(async (auth, request) => {
      if (!isPublicPortalRoute(request)) await auth.protect();
    })
  : null;

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  return clerk ? clerk(request, event) : NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/api/portal/:path*"],
};
