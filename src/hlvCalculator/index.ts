import Decimal from 'decimal.js';

// Interface for HLV calculation parameters
export interface SimpleHLVParams {
  currentAge: number; // Current age of the individual
  retirementAge: number; // Expected retirement age
  annualIncome: number; // Annual income in rupees
  savings: number; // Current savings in rupees
  liabilities: number; // Current loans/liabilities in rupees
  existingCover: number; // Existing life cover in rupees
}

// Constant for conversion: 1 crore = 10,000,000 rupees
const RUPEES_PER_CRORE = 10000000;

/**
 * Calculates Human Life Value (HLV) in crores using precise decimal arithmetic.
 * Formula: (Annual Income × Years to Retirement) + Liabilities - Savings - Existing Cover
 * All calculations use decimal.js for accuracy.
 * Returns HLV in crores, rounded to two decimal places.
 */
export function calculateSimpleHLV({
  currentAge,
  retirementAge,
  annualIncome,
  savings,
  liabilities,
  existingCover,
}: SimpleHLVParams) {
  // Validate input values
  if (currentAge >= retirementAge) {
    throw new Error('Current age must be less than retirement age');
  }
  if (annualIncome < 0 || savings < 0 || liabilities < 0 || existingCover < 0) {
    throw new Error('Financial values cannot be negative');
  }

  // Calculate years left until retirement using Decimal for precision
  const yearsLeft = new Decimal(retirementAge).minus(currentAge);
  // Calculate total future income till retirement
  const futureIncome = new Decimal(annualIncome).mul(yearsLeft);

  // HLV calculation using Decimal: future income + liabilities - savings - existing cover
  let hlv = futureIncome.plus(liabilities).minus(savings).minus(existingCover);

  // Ensure HLV is not negative
  hlv = Decimal.max(hlv, 0);

  // Convert HLV from rupees to crores
  const hlvInCrores = hlv.div(RUPEES_PER_CRORE);

  // Return HLV in crores, rounded to two decimal places
  return Number(hlvInCrores.toFixed(2));
}
