"use client";

import Link from "next/link";
import SignupLink from "./SignupLink";
import { useSignedIn } from "../lib/useSignedIn";

// A prompt to create a free account. "band" is the full panel (home page); "inline" is a slim strip for
// the end of other pages. Hidden for people who are already signed in.
export default function AccountBand({ variant = "inline", location }: { variant?: "band" | "inline"; location: string }) {
  const signedIn = useSignedIn();
  if (signedIn) return null;

  if (variant === "inline") {
    return (
      <section className="account-inline" aria-label="Create a free account">
        <div className="uk-wrap account-inline-inner">
          <p>
            <strong>Create your free account</strong> to see lessons, tutor notes and receipts in one place.
          </p>
          <div className="account-inline-actions">
            <SignupLink location={location} className="btn-primary">Create free account</SignupLink>
            <Link href="/portal/login" className="account-login">Log in</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="uk-section white account-band" id="account" aria-labelledby="account-title">
      <div className="uk-wrap account-band-inner">
        <div>
          <span className="uk-kicker">Free account</span>
          <h2 className="uk-h2" id="account-title">Create your free account in a minute</h2>
          <p className="uk-lead">Everything for your child in one place, from your first consultation to every lesson.</p>
          <ul className="account-points">
            <li>Lessons, joining links and tutor notes</li>
            <li>Your purchases, plans and receipts</li>
            <li>Book and manage sessions with your consultant</li>
          </ul>
          <div className="account-actions">
            <SignupLink location={location} className="btn-primary">Create free account</SignupLink>
            <Link href="/portal/login" className="btn-secondary">Log in</Link>
          </div>
          <p className="account-note">Use the same email you gave us, and anything you have bought links up automatically.</p>
        </div>
        <div className="account-card" aria-hidden="true">
          <p className="account-card-title">Your client portal <small>(example view)</small></p>
          <ul>
            <li><span>Next lesson</span><strong>Maths, Thursday 4:30pm</strong></li>
            <li><span>Latest note</span><strong>Fractions: great progress</strong></li>
            <li><span>Plan</span><strong>Partner membership</strong></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
