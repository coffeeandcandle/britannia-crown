"use client";

import { useRef } from "react";
import Link from "next/link";
import { track } from "../lib/track";
import { useFormPolish } from "../lib/useFormPolish";
import { YEAR_GROUPS, FOCUS_AREAS } from "../lib/onboarding";

const ATTRIBUTION_KEY = "bc_attribution";

type Defaults = { name?: string; email?: string; phone?: string; childName?: string; yearGroup?: string };

// The short form everyone completes before payment, so every customer arrives with the details we need.
// It posts to /api/checkout, which checks it again, saves the lead and then opens Stripe.
export default function OnboardingForm({
  productId,
  productName,
  priceLabel,
  returnPath,
  defaults = {},
  lockEmail = false,
  childOptions = [],
  error,
}: {
  productId: string;
  productName: string;
  priceLabel: string;
  returnPath: string;
  defaults?: Defaults;
  lockEmail?: boolean;
  childOptions?: string[];
  error?: string;
}) {
  const { formRef, liveRef, validate } = useFormPolish(`checkout-${productId}`);
  const attributionRef = useRef<HTMLDivElement>(null);

  // Adds the visit's marketing attribution just before sending, so it reaches Stripe and the CRM.
  function addAttribution() {
    const holder = attributionRef.current;
    if (!holder) return;
    holder.replaceChildren();
    try {
      const stored = JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) ?? "{}") as Record<string, string>;
      for (const [name, value] of Object.entries(stored)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        holder.appendChild(input);
      }
    } catch {
      /* storage unavailable: checkout still works without attribution */
    }
  }

  return (
    <form
      action="/api/checkout"
      method="POST"
      noValidate
      ref={formRef}
      className="enq-form onboarding-form"
      onSubmit={(e) => {
        if (!validate()) e.preventDefault();
        else {
          addAttribution();
          track("begin_checkout", { items: [{ item_id: productId, item_name: productName }] });
        }
      }}
    >
      <p className="form-live" role="status" aria-live="polite" ref={liveRef} />
      <input type="hidden" name="product" value={productId} />
      <input type="hidden" name="return_path" value={returnPath} />
      <div ref={attributionRef} hidden />
      {/* Honeypot: real visitors never fill this. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="enq-hp" aria-hidden="true" />

      {error && <p className="enq-error" role="alert">{error}</p>}

      <h2 className="onboarding-h">About you</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ob-name">Your full name <span className="required">*</span></label>
          <input id="ob-name" name="parent_name" autoComplete="name" defaultValue={defaults.name} required />
        </div>
        <div className="form-group">
          <label htmlFor="ob-phone">Mobile number <span className="required">*</span></label>
          <input id="ob-phone" name="phone" type="tel" autoComplete="tel" defaultValue={defaults.phone} placeholder="07700 900123" required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="ob-email">Email address <span className="required">*</span></label>
        <input id="ob-email" name="customer_email" type="email" autoComplete="email" defaultValue={defaults.email} readOnly={lockEmail} required />
        {lockEmail && <span className="ui-hint">This is the email on your account, so your purchase appears there.</span>}
      </div>

      <h2 className="onboarding-h">About your child</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ob-child">Child&apos;s first name <span className="required">*</span></label>
          <input id="ob-child" name="child_name" defaultValue={defaults.childName} list="ob-children" required />
          {childOptions.length > 0 && (
            <datalist id="ob-children">
              {childOptions.map((c) => <option key={c} value={c} />)}
            </datalist>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="ob-year">Year group <span className="required">*</span></label>
          <select id="ob-year" name="year_group" defaultValue={defaults.yearGroup ?? ""} required>
            <option value="">Choose one…</option>
            {YEAR_GROUPS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      <h2 className="onboarding-h">What would you like help with?</h2>
      <div className="form-group">
        <label htmlFor="ob-area">Main area <span className="required">*</span></label>
        <select id="ob-area" name="focus_area" defaultValue="" required>
          <option value="">Choose one…</option>
          {FOCUS_AREAS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="ob-focus">Tell us a little <span className="required">*</span></label>
        <textarea id="ob-focus" name="focus" placeholder="For example: GCSE maths, exam board Edexcel, currently a grade 4 and aiming for a 6." required></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="ob-times">Best days and times (optional)</label>
        <input id="ob-times" name="times" placeholder="e.g. weekday evenings after 5pm" />
      </div>

      <div className="form-group onboarding-consent">
        <label className="onboarding-check" htmlFor="ob-consent">
          <input id="ob-consent" name="consent" type="checkbox" required />
          <span>
            I agree to the <Link href="/terms-and-conditions" target="_blank">terms</Link>, the{" "}
            <Link href="/refunds-and-cancellations" target="_blank">refunds and cancellations policy</Link> and the{" "}
            <Link href="/privacy-policy" target="_blank">privacy policy</Link>.
          </span>
        </label>
      </div>

      <button type="submit" className="form-submit">Continue to secure payment ({priceLabel})</button>
      <p className="enq-note">You will pay on the next page through Stripe. We use these details to match your tutor and set up your account.</p>
    </form>
  );
}
