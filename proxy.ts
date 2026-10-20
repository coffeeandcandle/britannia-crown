import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { clerkConfigured, portalEnabled, SIGN_IN_PATH, STAFF_SIGN_IN_PATH } from "./app/lib/portal/config";

// Clerk only runs on the client portal, and only once its keys are set. The public site never
// passes through it, so marketing pages stay static and fast.
const isSignInRoute = createRouteMatcher(["/portal/sign-in(.*)", "/portal/staff/sign-in(.*)"]);
const isStaffRoute = createRouteMatcher(["/portal/admin(.*)", "/portal/staff(.*)"]);

const clerk = clerkConfigured
  ? clerkMiddleware(async (auth, request) => {
      if (isSignInRoute(request)) return;
      // Signed-out visitors go to the sign-in page for the area they were trying to reach.
      const signIn = isStaffRoute(request) ? STAFF_SIGN_IN_PATH : SIGN_IN_PATH;
      await auth.protect({ unauthenticatedUrl: new URL(signIn, request.url).toString() });
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
