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
