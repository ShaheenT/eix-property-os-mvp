"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const paymentId = params.get("payment_id") || "";

  return (
    <main className="min-h-screen bg-[#070b12] px-6 py-20 text-white">
      <div className="mx-auto max-w-xl rounded-[32px] border border-white/10 bg-white/[0.045] p-10 text-center backdrop-blur-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00C48C]/10 text-2xl text-[#00E0A0]">✓</div>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#00C48C]">Payment received</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Your Property Score™ is underway.</h1>
        <p className="mt-5 leading-7 text-slate-400">Your Beta report is prepared within 24 hours. We’ll use the contact details supplied during checkout to follow up.</p>
        <div className="mt-8 rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] p-6 text-left">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">Recommended upgrade</div>
          <h2 className="mt-2 text-2xl font-black">Investor Report Pro · R349</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">Get the deeper investment assessment plus a WhatsApp walkthrough of the property decision.</p>
          <a href={`/payment/pro${paymentId ? `?payment_id=${encodeURIComponent(paymentId)}` : ""}`} className="eix-button mt-5 flex w-full items-center justify-center no-underline">Upgrade to Investor Report Pro · R349</a>
        </div>
        <a href="/" className="mt-6 inline-block text-sm text-slate-400 underline underline-offset-4">Back to EiX Property Score™</a>
      </div>
    </main>
  );
}
