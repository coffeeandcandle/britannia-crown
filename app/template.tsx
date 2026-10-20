import RootTransition from "./components/RootTransition";

// Marketing pages fade into one another (see RootTransition). The header and footer sit outside
// this template, so they stay put. A root template is re-created only when the first URL segment
// changes; moves inside the portal are handled by the portal's own templates.
export default function RootTemplate({ children }: { children: React.ReactNode }) {
  return <RootTransition>{children}</RootTransition>;
}
