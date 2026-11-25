"use client";

import { useState } from "react";

// Lesson status, with "who cancelled it?" appearing when Cancelled is chosen.
// Tutors and consultants only get Scheduled and Cancelled: lessons complete automatically once they've
// taught them in the portal and the time has ended. Admins get every option.
export default function StatusFields({
  current,
  isAdmin,
  cancelOptions,
  cancelledBy,
}: {
  current: "scheduled" | "completed" | "cancelled";
  isAdmin: boolean;
  cancelOptions: string[];
  cancelledBy: string | null;
}) {
  const [status, setStatus] = useState(current);
  const options = isAdmin || current === "completed" ? ["scheduled", "completed", "cancelled"] : ["scheduled", "cancelled"];
  const label = { scheduled: "Scheduled", completed: "Completed", cancelled: "Cancelled" } as const;
  const locked = !isAdmin && current === "completed";
  const extra = cancelledBy && !cancelOptions.includes(cancelledBy) ? [cancelledBy] : [];

  return (
    <>
      <div className="form-group">
        <label htmlFor="us-status">Status</label>
        <select id="us-status" name="status" value={status} onChange={(e) => setStatus(e.target.value as typeof status)} disabled={locked}>
          {options.map((o) => <option key={o} value={o}>{label[o as keyof typeof label]}</option>)}
        </select>
        {locked && <input type="hidden" name="status" value="completed" />}
        <span className="ui-hint">
          {isAdmin
            ? "Lessons also complete automatically once the tutor has joined in the portal and the time has ended."
            : locked
              ? "Completed automatically. Ask an admin if this needs changing."
              : "Completes automatically once you've joined the lesson in the portal and the time has ended."}
        </span>
      </div>
      {status === "cancelled" && (
        <div className="form-group">
          <label htmlFor="us-cancelled-by">Who cancelled it? <span className="required">*</span></label>
          <select id="us-cancelled-by" name="cancelled_by" required defaultValue={cancelledBy ?? ""}>
            <option value="">Choose one…</option>
            {[...extra, ...cancelOptions].map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <span className="ui-hint">This is recorded in the activity log with the time.</span>
        </div>
      )}
    </>
  );
}
