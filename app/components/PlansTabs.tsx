"use client";

import { useState, type ReactNode } from "react";

// A two-way switch between sets of plans. Every panel is rendered on the server and stays in the page
// (hidden panels are simply not displayed), so search engines and no-JS visitors still get all of them.
export default function PlansTabs({ tabs }: { tabs: { id: string; label: string; hint: string; panel: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0].id);
  return (
    <div className="plans">
      <div className="plans-tabs" role="tablist" aria-label="Choose what you need">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`plans-tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`plans-panel-${t.id}`}
            className={`plans-tab${active === t.id ? " is-active" : ""}`}
            onClick={() => setActive(t.id)}
          >
            <strong>{t.label}</strong>
            <span>{t.hint}</span>
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} role="tabpanel" id={`plans-panel-${t.id}`} aria-labelledby={`plans-tab-${t.id}`} hidden={active !== t.id} className="plans-panel">
          {t.panel}
        </div>
      ))}
    </div>
  );
}
