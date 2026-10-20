"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

// Submit button that shows progress while the form is saving, so people don't click twice.
export function SubmitButton({
  children,
  pendingText = "Saving…",
  className = "form-submit",
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending} aria-busy={pending}>
      {pending ? pendingText : children}
    </button>
  );
}

// Asks for confirmation before submitting a destructive form (removing a child, deleting a note).
export function ConfirmSubmit({ message, children, className = "pt-link-button" }: { message: string; children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {pending ? "Removing…" : children}
    </button>
  );
}

// Success and error messages after an action. Success fades out on its own; both clear
// themselves from the address bar so a refresh doesn't show them again.
export function Toast({ ok, error }: { ok?: string; error?: string }) {
  const [visible, setVisible] = useState(true);
  const message = error ?? ok;

  useEffect(() => {
    if (!message) return;
    const url = new URL(window.location.href);
    if (url.searchParams.has("ok") || url.searchParams.has("error")) {
      url.searchParams.delete("ok");
      url.searchParams.delete("error");
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    }
    if (error) return;
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, [message, error]);

  if (!message || !visible) return null;
  return (
    <div className={`ui-toast${error ? " is-error" : ""}`} role={error ? "alert" : "status"}>
      <span className="ui-toast-icon" aria-hidden="true">{error ? "!" : "✓"}</span>
      <p>{message}</p>
      <button type="button" className="ui-toast-close" aria-label="Dismiss" onClick={() => setVisible(false)}>×</button>
    </div>
  );
}

// Copies a value (such as the portal sign-in link) and confirms it was copied.
export function CopyButton({ value, label = "Copy link" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="ui-copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          window.prompt("Copy this link:", value);
        }
      }}
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}
