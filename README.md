import Hero from "@/components/Hero";
import ScoreGauge from "@/components/ScoreGauge";
import MetricCard from "@/components/MetricCard";
import PropertyScoreForm from "@/components/PropertyScoreForm";
import CTASection from "@/components/CTASection";

export default function Home() {

  return (

    <main>

      <Hero />

      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        <div>

          <ScoreGauge score={91} />

          <div className="text-center mt-8 text-white">

            <h2 className="text-3xl font-bold">

              Strong Buy Candidate

            </h2>

            <p className="mt-2 text-gray-300">

              High rental yield. Positive cash flow. Low downside risk.

            </p>

          </div>

        </div>

        <PropertyScoreForm />

      </section>

      <section className="max-w-7xl mx-auto px-6 py-28">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <MetricCard label="Estimated Value" value="R2.1M" />

          <MetricCard label="Monthly Cash Flow" value="+R3,450" />

          <MetricCard label="Gross Yield" value="9.2%" />

          <MetricCard label="Risk Score" value="18/100" />

        </div>

      </section>

      <CTASection />

    </main>

  );
}# EiX Property Score™ Beta

South Africa's first AI Property Concierge.

## Mission

Paste any Property24 or Private Property listing.

Receive an AI Investment Report within 24 hours.

## Current Features

- Investment Score™
- BondMatch™ Preview
- Rental Yield Estimate
- Cash Flow Analysis
- Risk Score
- AI Confidence Meter
- Property Submission Form

## Pricing

| Stage | Price |
|-------|--------|
| Founding 25 | Free |
| Beta Launch | R149 |
| Investor Report Pro | R349 |

## Local Development

npm install

npm run dev -- --webpack