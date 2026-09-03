import Hero from "@/components/Hero";
import ScoreGauge from "@/components/ScoreGauge";
import MetricCard from "@/components/MetricCard";
import PropertyScoreForm from "@/components/PropertyScoreForm";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="eix-glow -top-48 left-1/2 -translate-x-1/2" />
        <div className="eix-glow top-[35%] -left-64" />
      </div>

      <header className="relative z-20 max-w-7xl mx-auto px-6 pt-6">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-xl px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#00C48C] flex items-center justify-center text-[#04110d] font-black">E</div>
            <div>
              <div className="text-white font-bold tracking-tight">EiX Property Score™</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">AI Property Intelligence</div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-5 text-sm text-slate-400">
            <span>Property Analysis</span>
            <span className="h-1 w-1 rounded-full bg-[#00C48C]" />
            <span className="text-white">Beta Access</span>
          </div>
        </div>
      </header>

      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#00C48C]/20 bg-[#00C48C]/[0.07] px-4 py-2 text-xs font-semibold tracking-wide text-[#63e6ba]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00C48C] shadow-[0_0_12px_#00C48C]" />
          SOUTH AFRICA · PROPERTY INTELLIGENCE BETA
        </div>

        <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.045em] leading-[0.98] text-white">
          Know if the property
          <span className="block mt-2 bg-gradient-to-r from-white via-[#8ff5d0] to-[#00C48C] bg-clip-text text-transparent">
            is worth buying.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl mx-auto text-base sm:text-lg leading-8 text-slate-400">
          Paste any Property24 or Private Property listing and see the investment picture before you make an offer.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs text-slate-400">
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">Investment Score™</span>
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">Cash Flow</span>
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">Rental Yield</span>
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">Risk Analysis</span>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-stretch">
          <div className="relative rounded-[32px] border border-white/10 bg-white/[0.045] backdrop-blur-2xl p-8 sm:p-10 flex flex-col justify-center text-center shadow-2xl">
            <div className="absolute top-5 left-5 right-5 flex justify-between text-[10px] uppercase tracking-[0.2em] text-slate-600">
              <span>Sample Analysis</span>
              <span>Beta</span>
            </div>
            <div className="pt-7">
              <ScoreGauge score={91} />
            </div>
            <div className="mt-7">
              <div className="inline-flex rounded-full bg-[#00C48C]/10 border border-[#00C48C]/20 px-3 py-1 text-xs font-semibold text-[#63e6ba]">
                STRONG BUY CANDIDATE
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white">A clearer investment picture.</h2>
              <p className="mt-3 max-w-md mx-auto text-sm leading-6 text-slate-400">
                Turn property data into an investment signal you can understand before committing your money.
              </p>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.055] backdrop-blur-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between mb-7">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00C48C]">Property analysis</div>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">Analyze this property</h2>
                <p className="mt-2 text-sm text-slate-400">Get your preliminary Property Score™.</p>
              </div>
              <div className="hidden sm:block rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] px-3 py-2 text-right">
                <div className="text-[9px] uppercase tracking-widest text-[#D4AF37]">Founding</div>
                <div className="text-xs font-bold text-white">25 Free</div>
              </div>
            </div>

            <PropertyScoreForm />
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#00C48C] font-semibold">What the score sees</div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">The numbers behind the decision.</h2>
          </div>
          <div className="hidden md:block text-xs text-slate-500">Illustrative example</div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Estimated Value" value="R2.1M" />
          <MetricCard label="Monthly Cash Flow" value="+R3,450" />
          <MetricCard label="Gross Yield" value="9.2%" />
          <MetricCard label="Risk Score" value="18/100" />
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.025] backdrop-blur-2xl p-8 sm:p-12 text-center shadow-2xl">
          <div className="mx-auto h-12 w-12 rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-bold">25</div>
          <div className="mt-6 text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">Founding Investor Access</div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-white">Be one of the first 25.</h2>
          <p className="mt-5 max-w-2xl mx-auto text-base leading-7 text-slate-400">
            Submit a property during the Beta and receive a professional AI Investment Report within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs text-slate-400">
            <span>Property analysis</span><span>·</span><span>Investment Score™</span><span>·</span><span>AI report</span>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.07] py-8 text-center text-xs text-slate-600">
        <p>EiX Property Score™ · ENTRPRNRiX AI (Pty) Ltd</p>
        <p className="mt-2">Property intelligence for informed decisions. Beta preview — not financial advice.</p>
      </footer>
    </main>
  );
}
