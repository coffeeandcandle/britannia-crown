import { ViewTransition } from "react";

// Marketing pages fade into one another. The header and footer sit outside this template, so
// they stay put. A root template is re-created only when the first URL segment changes, which
// means moves inside the portal are handled by the portal's own templates (the sidebar stays
// still there), while site ↔ portal and page → page on the main site fade here.
export default function RootTemplate({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
