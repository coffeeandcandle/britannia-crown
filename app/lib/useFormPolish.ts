"use client";

import { useCallback, useEffect, useRef } from "react";

// Small, dependency-free polish for the site's forms:
//  - friendly inline errors (shown under the field on blur, cleared as the person fixes it)
//  - on submit, the first problem is announced and focused instead of a browser pop-up
//  - what someone has typed survives an accidental back or refresh (kept for the tab only,
//    and cleared once the form sends)
// The hook only reads and decorates the form's own fields; React still owns the markup.

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const SKIP_DRAFT = new Set(["_gotcha", "referral-code"]);

function messageFor(field: Field): string {
  const v = field.validity;
  if (v.valid) {
    // Soft check: browsers accept almost anything in a phone field.
    if (field instanceof HTMLInputElement && field.type === "tel" && field.value.trim()) {
      const digits = field.value.replace(/\D/g, "");
      if (digits.length < 7) return "That phone number looks too short. Please check it.";
    }
    return "";
  }
  if (v.valueMissing) {
    if (field.name === "name") return "Please enter your name.";
    if (field.name === "email") return "Please enter your email address.";
    if (field.name === "phone") return "Please enter a phone number we can reach you on.";
    if (field instanceof HTMLSelectElement) return "Please choose an option.";
    if (field instanceof HTMLTextAreaElement) return "Please tell us a little about what you need.";
    return "Please fill this in.";
  }
  if (v.typeMismatch && field.type === "email") return "That email address doesn't look right. It should look like name@example.com.";
  return field.validationMessage || "Please check this field.";
}

export function useFormPolish(draftKey: string) {
  const formRef = useRef<HTMLFormElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const storageKey = `bc-draft:${draftKey}`;

  const fields = useCallback(
    () => Array.from(formRef.current?.querySelectorAll<Field>("input, select, textarea") ?? []).filter((f) => f.type !== "hidden" && f.name !== "_gotcha"),
    [],
  );

  const show = useCallback((field: Field, message: string) => {
    const group = field.closest<HTMLElement>(".form-group");
    if (message) {
      field.setAttribute("aria-invalid", "true");
      group?.setAttribute("data-error", message);
    } else {
      field.removeAttribute("aria-invalid");
      group?.removeAttribute("data-error");
    }
  }, []);

  const announce = useCallback((message: string) => {
    if (liveRef.current) liveRef.current.textContent = message;
  }, []);

  // Validates every field. Returns true when the form is fine to send.
  const validate = useCallback(() => {
    let first: Field | null = null;
    let firstMessage = "";
    for (const field of fields()) {
      const message = messageFor(field);
      show(field, message);
      if (message && !first) {
        first = field;
        firstMessage = message;
      }
    }
    if (first) {
      announce(firstMessage);
      first.focus();
      first.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      return false;
    }
    announce("");
    return true;
  }, [fields, show, announce]);

  const clearDraft = useCallback(() => {
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      /* private mode: nothing to clear */
    }
  }, [storageKey]);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    // Restore a draft, but never overwrite a value the page preselected (for example ?service=).
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? "{}") as Record<string, string>;
      for (const field of fields()) {
        const value = saved[field.name];
        if (value && !field.value) field.value = value;
      }
    } catch {
      /* no saved draft */
    }

    const onBlur = (e: FocusEvent) => {
      const field = e.target as Field;
      if (!(field instanceof HTMLElement) || !field.matches("input, select, textarea") || field.type === "hidden") return;
      if (field.name !== "_gotcha") show(field, field.value || field.required ? messageFor(field) : "");
    };
    const onInput = (e: Event) => {
      const field = e.target as Field;
      if (field.getAttribute("aria-invalid") === "true" && !messageFor(field)) show(field, "");
      try {
        const data: Record<string, string> = {};
        for (const f of fields()) if (f.name && !SKIP_DRAFT.has(f.name) && f.value) data[f.name] = f.value;
        sessionStorage.setItem(storageKey, JSON.stringify(data));
      } catch {
        /* storage unavailable: skip */
      }
    };
    form.addEventListener("focusout", onBlur);
    form.addEventListener("input", onInput);
    return () => {
      form.removeEventListener("focusout", onBlur);
      form.removeEventListener("input", onInput);
    };
  }, [fields, show, storageKey]);

  return { formRef, liveRef, validate, clearDraft };
}
