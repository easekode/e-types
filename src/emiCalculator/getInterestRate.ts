// NOTE: This file was edited to fix interest-rate
// interpretation (treat `1` as 1%). These changes were applied to address a
// bug that caused `1.0` to be treated as 100% annual interest.

import Decimal from 'decimal.js';
// import { MONTHLY_INTEREST_RATE } from './interestRates';

// Returns the monthly interest rate from an annual interest rate (as a decimal or percent)
// Example: r = 12% / 12 = 1% = 0.01
export function getMonthlyInterestRate(annualInterest: number): number {
  // If annualInterest is a percent (e.g., 12 for 12%), convert to decimal
  // Treat values >= 1 as percent (e.g. 1 === 1%), otherwise treat as decimal (0.01)
  const annualRate =
    annualInterest >= 1
      ? new Decimal(annualInterest).div(100)
      : new Decimal(annualInterest);
  // clamp negative values to 0
  const safeAnnualRate = Decimal.max(annualRate, new Decimal(0));
  // Monthly rate as decimal
  return safeAnnualRate.div(12).toNumber();
}
