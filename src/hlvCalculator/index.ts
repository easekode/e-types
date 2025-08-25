export interface SimpleHLVParams {
  currentAge: number;
  retirementAge: number;
  annualIncome: number; // Annual income
  savings: number; // Current savings
  liabilities: number; // Current loans/liabilities
  existingCover: number; // Existing life cover
}

// Constants
const RUPEES_PER_CRORE = 10000000; // ₹1 Cr = 1,00,00,000

export function calculateSimpleHLV({
  currentAge,
  retirementAge,
  annualIncome,
  savings,
  liabilities,
  existingCover,
}: SimpleHLVParams) {
  // Validate inputs
  if (currentAge >= retirementAge) {
    throw new Error('Current age must be less than retirement age');
  }

  if (annualIncome < 0 || savings < 0 || liabilities < 0 || existingCover < 0) {
    throw new Error('Financial values cannot be negative');
  }

  const yearsLeft = retirementAge - currentAge;
  const futureIncome = annualIncome * yearsLeft;

  // Simple HLV formula: future income + liabilities - savings - existing cover
  let hlv = futureIncome + liabilities - savings - existingCover;

  // Ensure HLV is not negative
  hlv = Math.max(0, hlv);
  hlv = hlv * 0.7; //using flat factor of 0.7

  // Convert rupees to crores
  const hlvInCrores = hlv / RUPEES_PER_CRORE;

  return Number(hlvInCrores.toFixed(2));
}
