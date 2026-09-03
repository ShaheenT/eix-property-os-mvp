"use client";

import { FormEvent, useState } from "react";
import { calculateInvestmentScore } from "@/lib/calculations";

export default function PropertyScoreForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [listingUrl, setListingUrl] = useState("");
  const [price, setPrice] = useState(2100000);
  const [rent, setRent] = useState(16000);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const result = calculateInvestmentScore({
    purchasePrice: price,
    monthlyRent: rent,
    deposit: 210000,
    interestRate: 10.75,
    termYears: 20,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/payfast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, whatsapp, listingUrl, price, rent }),
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
      setError(err instanceof Error ? err.message : "Unable to start checkout. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div id="score-form" className="glass rounded-[36px] p-8">
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Run the property.</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Send us the listing and your numbers. We turn them into a decision-ready investment report.
          </p>
        </div>
        <div className="shrink-0 rounded-2xl border border-[#00C48C]/20 bg-[#00C48C]/10 px-3 py-2 text-right">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#00E0A0]">Beta</div>
          <div className="text-lg font-black text-white">R149</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="full-name" className="mb-2 block text-sm font-semibold text-slate-200">Full name</label>
          <input id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Sarah Jacobs" className="input" required />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-200">Email address</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input" required />
        </div>
        <div>
          <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold text-slate-200">WhatsApp number</label>
          <input id="whatsapp" type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="082 123 4567" className="input" required />
        </div>
        <div>
          <label htmlFor="listing-url" className="mb-2 block text-sm font-semibold text-slate-200">Property listing URL</label>
          <input id="listing-url" type="url" value={listingUrl} onChange={(e) => setListingUrl(e.target.value)} placeholder="https://www.property24.com/..." className="input" required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="price" className="mb-2 block text-sm font-semibold text-slate-200">Purchase price</label>
            <input id="price" type="number" min="0" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="input" required />
          </div>
          <div>
            <label htmlFor="rent" className="mb-2 block text-sm font-semibold text-slate-200">Expected monthly rent</label>
            <input id="rent" type="number" min="0" value={rent} onChange={(e) => setRent(Number(e.target.value))} className="input" required />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">One property · Investment Report</span>
            <strong className="text-lg text-white">R149</strong>
          </div>
          <p className="mt-1 text-xs text-slate-500">Founding 25 receive complimentary access.</p>
        </div>

        {error && (
          <div role="alert" className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <button type="submit" className="eix-button" disabled={submitting}>
          {submitting ? "Opening secure checkout…" : "Get My Property Score™ · R149"}
        </button>
        <p className="text-center text-xs leading-5 text-slate-500">
          Secure PayFast checkout · No subscription · Report within 24 hours · Not financial advice
        </p>
      </form>

      <div className="mt-7 rounded-3xl bg-[#0B1220] p-6 text-white">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Live calculation preview</span>
          <strong className="text-2xl">{result.investmentScore}</strong>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
          <div>Gross Yield: <span className="text-white">{result.grossYield}%</span></div>
          <div>Cash Flow: <span className="text-white">R {result.monthlyCashFlow}</span></div>
          <div>Risk Score: <span className="text-white">{result.riskScore}</span></div>
          <div>Confidence: <span className="text-white">{result.confidence}%</span></div>
        </div>
      </div>
    </div>
  );
}
