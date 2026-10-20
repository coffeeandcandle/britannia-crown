import PortalSkeleton from "./PortalSkeleton";

// The portal's whole frame in skeleton form. It renders the same .pt-app wrapper as the real
// PortalShell, so the marketing header and footer are hidden the instant it appears (see
// `body:has(.pt-app)` in site.css) and the page never shows an empty gap between site and portal.
export default function PortalFrameSkeleton() {
  return (
    <div className="pt-app" aria-busy="true">
      <aside className="pt-skel-side" aria-hidden="true">
        <div className="pt-skel-brand" />
        <div className="pt-skel-nav" />
        <div className="pt-skel-nav" />
        <div className="pt-skel-nav" />
        <div className="pt-skel-nav pt-skel-nav-short" />
      </aside>
      <div className="pt-content">
        <div className="pt-body">
          <PortalSkeleton />
        </div>
      </div>
    </div>
  );
}
