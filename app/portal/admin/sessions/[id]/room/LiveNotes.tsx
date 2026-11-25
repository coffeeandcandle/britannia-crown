"use client";

import { useEffect, useRef, useState } from "react";
import { addNote, saveNoteDraft } from "../../../actions";
import { SubmitButton } from "../../../../client-ui";

// Notes the tutor types beside the video while the lesson is happening. They save automatically
// as a private draft every few seconds, so nothing is lost if the page reloads or the call drops.
// When the tutor is ready, "Save note" publishes it for the family and team, or the team only.
export default function LiveNotes({ sessionId, initialBody, initialHomework, savedAt }: { sessionId: number; initialBody: string; initialHomework: string; savedAt: string | null }) {
  const [body, setBody] = useState(initialBody);
  const [homework, setHomework] = useState(initialHomework);
  const [status, setStatus] = useState<string>(savedAt ? `Draft saved ${time(savedAt)}` : "Notes save automatically as you type");
  const last = useRef({ body: initialBody, homework: initialHomework });

  useEffect(() => {
    if (body === last.current.body && homework === last.current.homework) return;
    setStatus("Saving…");
    const timer = setTimeout(async () => {
      try {
        const res = await saveNoteDraft(sessionId, body, homework);
        if (res.ok) {
          last.current = { body, homework };
          setStatus(`Draft saved ${time(res.savedAt)}`);
        } else setStatus("Couldn't save the draft. Check your connection.");
      } catch {
        setStatus("Couldn't save the draft. Check your connection.");
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [body, homework, sessionId]);

  return (
    <form action={addNote} className="pt-form live-notes">
      <input type="hidden" name="session_id" value={sessionId} />
      <input type="hidden" name="from" value="room" />
      <div className="live-notes-head">
        <h2>Lesson notes</h2>
        <span className="live-notes-status" role="status" aria-live="polite">{status}</span>
      </div>
      <p className="ui-hint">Only you can see these until you save them. Jot things down during the lesson and tidy up at the end.</p>
      <label className="sr-only" htmlFor="ln-body">What you covered and how it went</label>
      <textarea
        id="ln-body"
        name="body"
        rows={10}
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={"Covered:\nWent well:\nNext time:"}
      />
      <label htmlFor="ln-hw" className="live-notes-label">Homework (optional)</label>
      <textarea id="ln-hw" name="homework" rows={2} value={homework} onChange={(e) => setHomework(e.target.value)} placeholder="e.g. Exercise 4B, questions 1 to 10" />
      <fieldset className="ui-choice">
        <legend>Who can see this note?</legend>
        <label><input type="radio" name="shared_with_family" value="on" defaultChecked /> <span><strong>The family and team</strong> Appears in the family&apos;s portal.</span></label>
        <label><input type="radio" name="shared_with_family" value="off" /> <span><strong>Team only</strong> For internal notes the family shouldn&apos;t see.</span></label>
      </fieldset>
      <SubmitButton pendingText="Saving note…">Save note</SubmitButton>
    </form>
  );
}

function time(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(iso)).replace(" ", "").toLowerCase();
}
