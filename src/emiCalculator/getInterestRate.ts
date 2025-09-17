import Decimal from 'decimal.js';

// Returns the monthly interest rate from an annual interest rate (as a decimal or percent)
// Example: r = 12% / 12 = 1% = 0.01
export function getMonthlyInterestRate(annualInterest: number): number {
  const annualRate = new Decimal(annualInterest).div(100);
  const safeAnnualRate = Decimal.max(annualRate, new Decimal(0));
  // Monthly rate as decimal
  return safeAnnualRate.div(12).toNumber();
}
