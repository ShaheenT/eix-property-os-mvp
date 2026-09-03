export default function CTASection() {
  return (
    <section className="px-6 py-24 text-center">
      <div className="glass mx-auto max-w-5xl rounded-[40px] p-10 md:p-14">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00E0A0]">EiX Property Score™ Beta</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
            Stop guessing. Run the property before you make the offer.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Get a decision-ready investment report covering value, rental yield, cash flow and risk — delivered within 24 hours.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <span>Founding 25 complimentary</span>
            <span>Beta thereafter R149</span>
            <span>No subscription</span>
          </div>
          <a href="#score-form" className="eix-button mx-auto mt-9 flex max-w-md items-center justify-center no-underline">
            Claim My Property Score™
          </a>
        </div>
      </div>
    </section>
  );
}
