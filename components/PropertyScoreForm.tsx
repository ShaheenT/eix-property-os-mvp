"use client";

import { useState } from "react";
import { calculateInvestmentScore } from "@/lib/calculations";

export default function PropertyScoreForm() {

  const [price, setPrice] = useState(2100000);

  const [rent, setRent] = useState(16000);

  const result = calculateInvestmentScore({
    purchasePrice: price,
    monthlyRent: rent,
    deposit: 210000,
    interestRate: 10.75,
    termYears: 20,
  });

  return (

    <div className="glass rounded-[36px] p-8">

      <h2 className="text-2xl font-bold mb-6">

        Analyze This Property

      </h2>

      <div className="space-y-5">

        <input placeholder="Full Name" className="input" />

        <input placeholder="Email" className="input" />

        <input placeholder="WhatsApp" className="input" />

        <input placeholder="Paste Property24 Link" className="input" />

        <input
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="input"
        />

        <input
          value={rent}
          onChange={(e) => setRent(Number(e.target.value))}
          className="input"
        />

        <button className="w-full bg-[#00C48C] hover:bg-[#00B17E] text-black font-bold rounded-2xl py-4 transition">

          Get My Property Score™

        </button>

      </div>

      <div className="mt-8 bg-[#0B1220] rounded-3xl p-6 text-white">

        <div className="flex justify-between">

          <span>Investment Score™</span>

          <strong>{result.investmentScore}</strong>

        </div>

        <div className="mt-4 text-sm space-y-2">

          <div>Gross Yield: {result.grossYield}%</div>

          <div>Cash Flow: R {result.monthlyCashFlow}</div>

          <div>Risk Score: {result.riskScore}</div>

          <div>Confidence: {result.confidence}%</div>

        </div>

      </div>

    </div>
  );
}