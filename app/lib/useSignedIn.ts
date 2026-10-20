"use client";

import { useSyncExternalStore } from "react";

// Clerk only runs inside /portal, so public pages read its readable session marker (__client_uat, a timestamp that
// is 0 or absent when signed out) to decide whether to show "Sign up" prompts or a link to the portal.
const subscribe = () => () => {};
const read = () => document.cookie.split("; ").some((c) => /^__client_uat(_[^=]+)?=/.test(c) && Number(c.split("=")[1]) > 0);

export function useSignedIn() {
  return useSyncExternalStore(subscribe, read, () => false);
}
