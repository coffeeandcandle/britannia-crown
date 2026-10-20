import type { Metadata } from "next";
import AuthFrame from "../AuthFrame";
import AudienceChoice from "../AudienceChoice";

export const metadata: Metadata = { title: "Sign up | Britannia Crown", robots: { index: false, follow: false } };

export default function JoinChoicePage() {
  return (
    <AuthFrame area="Sign up" title="Create your Britannia Crown account" lead="Choose the option that describes you.">
      <AudienceChoice mode="up" />
    </AuthFrame>
  );
}
