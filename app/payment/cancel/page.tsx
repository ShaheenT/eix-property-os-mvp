export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen bg-[#070b12] px-6 py-20 text-white">
      <div className="mx-auto max-w-xl rounded-[32px] border border-white/10 bg-white/[0.045] p-10 text-center backdrop-blur-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Checkout cancelled</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Your property was not charged.</h1>
        <p className="mt-5 leading-7 text-slate-400">No payment was completed. You can return to the property form and try again whenever you’re ready.</p>
        <a href="/#score-form" className="eix-button mx-auto mt-8 flex max-w-xs items-center justify-center no-underline">Return to the form</a>
      </div>
    </main>
  );
}
