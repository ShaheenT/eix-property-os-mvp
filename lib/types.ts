export interface PropertyInput {
  purchasePrice: number;
  monthlyRent: number;
  deposit: number;
  interestRate: number;
  termYears: number;
}

export interface ScoreResult {
  investmentScore: number;
  grossYield: number;
  monthlyCashFlow: number;
  bondRepayment: number;
  riskScore: number;
  confidence: number;
  recommendation: string;
}