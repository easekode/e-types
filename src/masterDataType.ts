// Master data for Business Loan
import { z } from 'zod';

export const tenuresInMonths = Object.freeze([12, 24, 36, 48, 60, 72, 84]);

export const loanTenureSchema = z
  .number()
  .refine(val => tenuresInMonths.includes(val), {
    message: `Loan tenure must be one of: ${tenuresInMonths.join(', ')}`,
  });

export type LoanConfig = {
  readonly interestRate: number;
  readonly minLoanAmount: number;
  readonly maxLoanAmount: number;
  readonly emiStartingFrom: number;
  readonly months: readonly number[]; // months array is also readonly
};

export type BusinessLoanMasterData = {
  readonly selfEmployed: LoanConfig;
  readonly selfEmployedProfessional: LoanConfig;
};

// You can add more master data exports here as needed
export interface MasterData {
  businessLoan: BusinessLoanMasterData;
}
