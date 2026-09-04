
export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#04110d] text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="text-6xl mb-6">✓</div>

        <h1 className="text-4xl font-black">
          Payment Received
        </h1>

        <p className="mt-6 text-slate-300 text-lg leading-8">
          Your EiX Property Score™ request has been received.
        </p>

        <div className="mt-8 rounded-2xl border border-[#00C48C]/20 bg-white/5 p-6 text-left">
          <h2 className="font-bold text-[#63e6ba]">What happens next</h2>

          <ul className="mt-4 space-y-3 text-slate-300">
            <li>✓ Your property enters our AI analysis queue.</li>
            <li>✓ We review investment potential.</li>
            <li>✓ You'll receive your report within 24 hours.</li>
          </ul>
        </div>

        <a
          href="/"
          className="mt-10 inline-block rounded-full bg-[#00C48C] px-8 py-4 font-bold text-[#04110d]"
        >
          Analyze Another Property
        </a>
      </div>
    </main>
  );
}
