import { PropertyInput, ScoreResult } from "./types";

export function calculateInvestmentScore(
  input: PropertyInput
): ScoreResult {

  const loan = input.purchasePrice - input.deposit;

  const monthlyRate = input.interestRate / 1200;

  const months = input.termYears * 12;

  const repayment =
    loan *
    ((monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1));

  const grossYield =
    (input.monthlyRent * 12 / input.purchasePrice) * 100;

  const cashFlow = input.monthlyRent - repayment;

  let score = 50;

  score += Math.min(grossYield * 3, 30);

  score += cashFlow > 0 ? 15 : -10;

  score += input.deposit >= input.purchasePrice * 0.2 ? 5 : 0;

  score = Math.max(0, Math.min(100, Math.round(score)));

  return {
    investmentScore: score,
    grossYield: Number(grossYield.toFixed(1)),
    monthlyCashFlow: Math.round(cashFlow),
    bondRepayment: Math.round(repayment),
    riskScore: Math.max(5, 100 - score),
    confidence: 84,
    recommendation:
      score >= 80
        ? "Strong Buy Candidate"
        : score >= 65
        ? "Worth Investigating"
        : "Proceed With Caution",
  };
}