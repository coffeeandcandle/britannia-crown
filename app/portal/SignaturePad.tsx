"use client";

import { useEffect, useRef, useState } from "react";

// Draw a signature with a finger or mouse. The drawing is sent as a PNG with the form.
export default function SignaturePad({ defaultName }: { defaultName: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const hidden = useRef<HTMLInputElement>(null);
  const drawing = useRef(false);
  const [drawn, setDrawn] = useState(false);
  const [problem, setProblem] = useState("");

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    c.width = c.offsetWidth * ratio;
    c.height = c.offsetHeight * ratio;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#2a0d1a";
  }, []);

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function down(e: React.PointerEvent<HTMLCanvasElement>) {
    const ctx = e.currentTarget.getContext("2d");
    if (!ctx) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = e.currentTarget.getContext("2d");
    if (!ctx) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    if (!drawn) setDrawn(true);
  }
  // The drawing is attached to the form as soon as a stroke ends, because the form's data is read before submit handlers run.
  function up() {
    if (!drawing.current) return;
    drawing.current = false;
    if (canvas.current && hidden.current) hidden.current.value = canvas.current.toDataURL("image/png");
  }
  function clear() {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    if (hidden.current) hidden.current.value = "";
    setDrawn(false);
  }

  return (
    <div
      onSubmitCapture={(e) => {
        if (!drawn || !hidden.current?.value) {
          e.preventDefault();
          setProblem("Please draw your signature in the box.");
        }
      }}
    >
      <div className="form-group">
        <label htmlFor="sg-name">Your full name <span className="required">*</span></label>
        <input id="sg-name" name="signer_name" defaultValue={defaultName} autoComplete="name" required minLength={2} />
      </div>
      <div className="form-group">
        <label htmlFor="sg-pad">Draw your signature <span className="required">*</span></label>
        <canvas
          id="sg-pad"
          ref={canvas}
          className="sg-pad"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerLeave={up}
          aria-label="Signature box. Draw with your finger or mouse."
        />
        <button type="button" className="rg-link" onClick={clear}>Clear and start again</button>
      </div>
      <input type="hidden" name="signature" ref={hidden} />
      <label className="onboarding-check">
        <input type="checkbox" name="consent" required />
        <span>I have read this document and I agree to sign it electronically. I understand this has the same effect as signing by hand.</span>
      </label>
      {problem && <p className="enq-error" role="alert">{problem}</p>}
    </div>
  );
}
