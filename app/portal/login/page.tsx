import type { Metadata } from "next";
import AuthFrame from "../AuthFrame";
import AudienceChoice from "../AudienceChoice";

export const metadata: Metadata = { title: "Log in | Britannia Crown", robots: { index: false, follow: false } };

export default function LoginChoicePage() {
  return (
    <AuthFrame area="Log in" title="Log in to Britannia Crown" lead="Choose the option that describes you.">
      <AudienceChoice mode="in" />
    </AuthFrame>
  );
}
