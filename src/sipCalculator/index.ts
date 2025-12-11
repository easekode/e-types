import Decimal from 'decimal.js';

// Interface for SIP parameters
export interface SIPParams {
  monthlyInvestment: number; // Monthly SIP amount
  annualReturnRate: number; // Annual return rate in %
  years: number; // Investment duration in years
}

// Interface for Lump Sum parameters
export interface LumpSumParams {
  initialInvestment: number; // One-time investment amount
  annualReturnRate: number; // Annual return rate in %
  years: number; // Investment duration in years
}

// Interface for calculating required SIP from target
export interface TargetSIPParams {
  targetAmount: number; // Target amount to achieve
  years: number; // Investment duration in years
  annualReturnRate?: number; // Optional: Annual return rate in % (default 0 for simple calculation)
}

// SIP: Calculate estimated return (already implemented)
export function calculateSIPReturn({
  monthlyInvestment,
  annualReturnRate,
  years,
}: SIPParams): number {
  const P = new Decimal(monthlyInvestment);
  const i = new Decimal(annualReturnRate).div(100).div(12); // monthly rate
  const n = new Decimal(years).times(12); // total months

  // Groww formula: M = P × ( ((1 + i)^n – 1) / i ) × (1 + i)
  const growthFactor = i.add(1).pow(n).sub(1).div(i);
  const maturity = P.times(growthFactor).times(i.add(1));

  return maturity.toNumber();
}

// SIP: Parent function to calculate all details using alternative formula
export function calculateSIPDetails(
  params: SIPParams,
  options?: { includeDecimal?: boolean },
) {
  const periodMonths = new Decimal(params.years).times(12);
  let investedAmt = new Decimal(params.monthlyInvestment).times(periodMonths);
  let totalValue = new Decimal(calculateSIPReturn(params));
  let estReturns = totalValue.minus(investedAmt);

  if (!options?.includeDecimal) {
    investedAmt = investedAmt.toDecimalPlaces(0, Decimal.ROUND_HALF_UP);
    totalValue = totalValue.toDecimalPlaces(0, Decimal.ROUND_HALF_UP);
    estReturns = estReturns.toDecimalPlaces(0, Decimal.ROUND_HALF_UP);
  }
  return {
    investedAmt: investedAmt.toNumber(),
    estReturns: estReturns.toNumber(),
    totalValue: totalValue.toNumber(),
    rate: params.annualReturnRate,
    tenureMonths: periodMonths.toNumber(),
  };
}

// Lump Sum Calculator
export function calculateLumpSumReturn({
  initialInvestment,
  annualReturnRate,
  years,
}: LumpSumParams): number {
  const L = new Decimal(initialInvestment);
  const r = new Decimal(annualReturnRate).div(100); // annual rate

  const futureValue = L.times(r.add(1).pow(years));

  return futureValue.toNumber();
}

// Lump Sum: Parent function to calculate all details
export function calculateLumpSumDetails(
  params: LumpSumParams,
  options?: { includeDecimal?: boolean },
) {
  let investedAmt = params.initialInvestment;
  let totalValue = calculateLumpSumReturn(params);
  let estReturns = totalValue - investedAmt;
  if (!options?.includeDecimal) {
    investedAmt = new Decimal(investedAmt)
      .toDecimalPlaces(0, Decimal.ROUND_HALF_UP)
      .toNumber();
    totalValue = new Decimal(totalValue)
      .toDecimalPlaces(0, Decimal.ROUND_HALF_UP)
      .toNumber();
    estReturns = new Decimal(estReturns)
      .toDecimalPlaces(0, Decimal.ROUND_HALF_UP)
      .toNumber();
  }
  return {
    investedAmt,
    estReturns,
    totalValue,
    rate: params.annualReturnRate,
    tenureMonths: params.years * 12,
  };
}

// Calculate required monthly SIP to reach a target amount
// Simple version: Divides target by months (no returns assumed)
export function calculateRequiredSIPSimple(
  targetAmount: number,
  years: number,
): number {
  const target = new Decimal(targetAmount);
  const months = new Decimal(Math.max(1, years * 12));
  const monthlySIP = target.div(months);
  
  return monthlySIP.toDecimalPlaces(0, Decimal.ROUND_HALF_UP).toNumber();
}

// Calculate required monthly SIP to reach a target amount (with expected returns)
// Uses reverse SIP formula: P = M / (((1 + i)^n - 1) / i) × (1 + i))
export function calculateRequiredSIP({
  targetAmount,
  years,
  annualReturnRate = 0,
}: TargetSIPParams): number {
  // If no return rate, use simple division
  if (annualReturnRate === 0) {
    return calculateRequiredSIPSimple(targetAmount, years);
  }

  const M = new Decimal(targetAmount); // Target maturity amount
  const i = new Decimal(annualReturnRate).div(100).div(12); // monthly rate
  const n = new Decimal(years).times(12); // total months

  // Reverse formula: P = M / (((1 + i)^n - 1) / i × (1 + i))
  const growthFactor = i.add(1).pow(n).sub(1).div(i).times(i.add(1));
  const monthlyInvestment = M.div(growthFactor);

  return monthlyInvestment.toDecimalPlaces(0, Decimal.ROUND_HALF_UP).toNumber();
}

// Helper: Calculate months difference between today and target date
export function calculateMonthsDifference(targetDateString: string): number {
  const today = new Date();
  const targetDate = new Date(targetDateString);
  const monthsDiff = Math.max(
    1,
    (targetDate.getFullYear() - today.getFullYear()) * 12 +
      (targetDate.getMonth() - today.getMonth()),
  );
  return monthsDiff;
}

// Calculate required monthly SIP from target date string
export function calculateRequiredSIPFromDate(
  targetAmount: number,
  targetDateString: string,
  annualReturnRate?: number,
): number {
  const monthsDiff = calculateMonthsDifference(targetDateString);
  const years = monthsDiff / 12;

  return calculateRequiredSIP({
    targetAmount,
    years,
    annualReturnRate,
  });
}

// Interface for calculating monthly SIP from target amount
export interface TargetMonthlySIPParams {
  targetAmount: number; // Desired maturity amount
  annualReturnRate: number; // Annual return rate in %
  years: number; // Investment duration in years
}

// Calculate monthly SIP amount needed to reach a target amount
// Formula: P = M / (((1 + i)^n - 1) / i) × (1 + i))
// Where P = monthly investment, M = target maturity amount, i = monthly rate, n = months
export function calculateMonthlySIPFromTarget({
  targetAmount,
  annualReturnRate,
  years,
}: TargetMonthlySIPParams): number {
  const M = new Decimal(targetAmount);
  const i = new Decimal(annualReturnRate).div(100).div(12); // monthly rate
  const n = new Decimal(years).times(12); // total months

  // P = M / (((1 + i)^n - 1) / i × (1 + i))
  const growthFactor = i.add(1).pow(n).sub(1).div(i).times(i.add(1));
  const monthlyInvestment = M.div(growthFactor);

  return monthlyInvestment.toDecimalPlaces(0, Decimal.ROUND_HALF_UP).toNumber();
}
