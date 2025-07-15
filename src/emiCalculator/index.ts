// personalLoanCalculation.ts

import { getMonthlyInterestRate } from './getInterestRate';
import Decimal from 'decimal.js';

export type EmiCalculationParams = {
  principal: number; // Loan amount (P)
  annualInterestRate: number; // Annual interest rate in percent (e.g., 12 for 12%)
  tenureMonths: number; // Number of monthly installments (n)
};

export type EmiCalculationResult = {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  tenure: number; // Number of monthly installments
};

/**
 * Calculates the EMI, total payment, and total interest for a personal loan.
 */
export function calculateEmi({
  principal,
  tenureMonths,
  annualInterestRate,
}: EmiCalculationParams): EmiCalculationResult {
  const r = new Decimal(getMonthlyInterestRate(annualInterestRate));
  const n = new Decimal(tenureMonths);
  const P = new Decimal(principal);

  if (r.isZero()) {
    // No interest case
    const emi = P.div(n).toNumber();
    return {
      emi,
      totalPayment: P.toNumber(),
      totalInterest: 0,
      tenure: n.toNumber(),
    };
  }

  const one = new Decimal(1);
  const numerator = P.mul(r).mul(one.plus(r).pow(n));
  const denominator = one.plus(r).pow(n).minus(one);
  const emi = numerator.div(denominator);
  const totalPayment = emi.mul(n);
  const totalInterest = totalPayment.minus(P);

  return {
    emi: emi.toNumber(),
    totalPayment: totalPayment.toNumber(),
    totalInterest: totalInterest.toNumber(),
    tenure: n.toNumber(),
  };
}

/**
 * Calculates the principal loan amount based on EMI, interest rate, and tenure.
 */
export function calculatePrincipalFromEmi({
  emi,
  tenureMonths,
  annualInterestRate,
}: {
  emi: number;
  tenureMonths: number;
  annualInterestRate: number; // Annual interest rate in percent (e.g., 12 for 12%)
}): Decimal {
  const r = new Decimal(getMonthlyInterestRate(annualInterestRate));
  const n = new Decimal(tenureMonths);
  const one = new Decimal(1);

  if (r.isZero()) {
    // No interest case
    return new Decimal(emi).mul(n);
  }

  const pow = one.plus(r).pow(n);
  const numerator = pow.minus(one);
  const denominator = r.mul(pow);
  const principal = new Decimal(emi).mul(numerator).div(denominator);

  return principal;
}
