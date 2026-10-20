// Shown inside the portal frame while a page loads its data, so the sidebar and header never
// disappear and the content area never sits blank. Shimmer styles are in site.css (.pt-skel).
export default function PortalSkeleton() {
  return (
    <div className="pt-skel" role="status" aria-live="polite" aria-label="Loading">
      <div className="pt-skel-bar pt-skel-title" />
      <div className="pt-skel-bar pt-skel-sub" />
      <div className="pt-skel-row">
        <div className="pt-skel-card" />
        <div className="pt-skel-card" />
        <div className="pt-skel-card" />
      </div>
      <div className="pt-skel-panel">
        <div className="pt-skel-bar" />
        <div className="pt-skel-bar" />
        <div className="pt-skel-bar pt-skel-short" />
      </div>
      <span className="pt-skel-sr">Loading…</span>
    </div>
  );
}
