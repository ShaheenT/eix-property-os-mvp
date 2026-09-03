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
  const [submitted, setSubmitted] = useState(false);

  const result = calculateInvestmentScore({
    purchasePrice: price,
    monthlyRent: rent,
    deposit: 210000,
    interestRate: 10.75,
    termYears: 20,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div id="score-form" className="glass rounded-[36px] p-8">
        <div className="mb-6 inline-flex rounded-full border border-[#00C48C]/20 bg-[#00C48C]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#00E0A0]">
          Request ready
        </div>
        <h2 className="text-3xl font-bold text-white">Your property is queued.</h2>
        <p className="mt-3 leading-7 text-slate-300">
          We have your property details. The EiX Property Score™ Beta report is prepared for one property and delivered within 24 hours.
        </p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0B1220]/80 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">Beta Property Report</p>
              <p className="mt-1 text-sm text-slate-400">Founding 25 complimentary · Beta thereafter R149</p>
            </div>
            <span className="text-xl font-black text-[#00E0A0]">R149</span>
          </div>
        </div>
        <p className="mt-5 text-xs leading-5 text-slate-500">
          Payment is the next step. No subscription. One property per report. Not financial advice.
        </p>
      </div>
    );
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

        <button type="submit" className="eix-button">
          Get My Property Score™
        </button>
        <p className="text-center text-xs leading-5 text-slate-500">
          No subscription · Report within 24 hours · Not financial advice
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
