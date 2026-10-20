import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { clerkConfigured, portalEnabled } from "./app/lib/portal/config";

// Clerk only runs on the client portal, and only once its keys are set. The public site never
// passes through it, so marketing pages stay static and fast.
const isPublicPortalRoute = createRouteMatcher(["/portal/sign-in(.*)"]);

const clerk = clerkConfigured
  ? clerkMiddleware(async (auth, request) => {
      if (!isPublicPortalRoute(request)) await auth.protect();
    })
  : null;

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  // Until the portal is configured, every /portal URL shows the holding page, so no portal
  // code (which needs the database) runs.
  if (!portalEnabled) return NextResponse.rewrite(new URL("/portal-coming-soon", request.url));
  return clerk ? clerk(request, event) : NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/api/portal/:path*"],
};
