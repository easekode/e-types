import Decimal from 'decimal.js';
// import { MONTHLY_INTEREST_RATE } from './interestRates';

// Returns the monthly interest rate from an annual interest rate (as a decimal or percent)
// Example: r = 12% / 12 = 1% = 0.01
export function getMonthlyInterestRate(annualInterest: number): number {
  // If annualInterest is a percent (e.g., 12 for 12%), convert to decimal
  const annualRate =
    annualInterest > 1
      ? new Decimal(annualInterest).div(100)
      : new Decimal(annualInterest);
  // Monthly rate as decimal
  return annualRate.div(12).toNumber();
}
