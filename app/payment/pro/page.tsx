"use client";

import { FormEvent, useState } from "react";

export default function InvestorReportProPage() {
  const [email, setEmail] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/payfast/pro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, paymentId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to start checkout.");

      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.checkoutUrl;
      form.style.display = "none";
      Object.entries(data.fields as Record<string, string>).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start checkout.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#070b12] px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center text-xs font-bold uppercase tracking-[0.22em] text-[#00C48C]">EiX Property Score™</div>
        <div className="rounded-[36px] border border-[#00C48C]/20 bg-white/[0.045] p-8 shadow-2xl backdrop-blur-2xl sm:p-12">
          <div className="inline-flex rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#D4AF37]">Investor Report Pro</div>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Go deeper on the property.</h1>
          <p className="mt-5 text-base leading-7 text-slate-400">Upgrade your completed Property Score to the full Investor Report Pro for a deeper investment assessment and a WhatsApp walkthrough.</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/15 p-4"><strong>Detailed investment analysis</strong><p className="mt-1 text-sm text-slate-400">More context behind the score, yield, cash flow and risk.</p></div>
            <div className="rounded-2xl border border-white/10 bg-black/15 p-4"><strong>WhatsApp walkthrough</strong><p className="mt-1 text-sm text-slate-400">A practical walkthrough of the investment decision.</p></div>
          </div>

          <div className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-[#0B1220] p-5">
            <div><div className="text-sm font-semibold text-white">Investor Report Pro</div><div className="mt-1 text-xs text-slate-500">One property · one upgraded report</div></div>
            <div className="text-2xl font-black text-[#00E0A0]">R349</div>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label htmlFor="pro-email" className="mb-2 block text-sm font-semibold text-slate-200">Email used for your Property Score</label>
              <input id="pro-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input" required />
            </div>
            <div>
              <label htmlFor="payment-id" className="mb-2 block text-sm font-semibold text-slate-200">Property Score payment ID <span className="font-normal text-slate-500">(optional)</span></label>
              <input id="payment-id" value={paymentId} onChange={(e) => setPaymentId(e.target.value)} placeholder="EIX-..." className="input" />
            </div>
            {error && <div role="alert" className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</div>}
            <button type="submit" className="eix-button" disabled={submitting}>{submitting ? "Opening secure checkout…" : "Upgrade to Investor Report Pro · R349"}</button>
            <p className="text-center text-xs leading-5 text-slate-500">Secure PayFast checkout · One-time payment · No subscription</p>
          </form>
        </div>
      </div>
    </main>
  );
}
