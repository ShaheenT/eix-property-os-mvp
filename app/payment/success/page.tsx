export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-[#070b12] px-6 py-20 text-white">
      <div className="mx-auto max-w-xl rounded-[32px] border border-white/10 bg-white/[0.045] p-10 text-center backdrop-blur-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00C48C]/10 text-2xl text-[#00E0A0]">✓</div>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#00C48C]">Payment received</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Your property analysis is underway.</h1>
        <p className="mt-5 leading-7 text-slate-400">Your EiX Property Score™ Beta report is prepared within 24 hours. We’ll use the contact details supplied during checkout to follow up.</p>
        <a href="/" className="eix-button mx-auto mt-8 flex max-w-xs items-center justify-center no-underline">Back to EiX Property Score™</a>
      </div>
    </main>
  );
}
