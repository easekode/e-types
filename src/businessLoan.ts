import { z } from 'zod';
import { BusinessTypeSchema } from './businessType';

// Loan amount and income validations
const AmountSchema = z.number().min(10000, 'Amount must be at least ₹10,000');

const AnnualIncomeSchema = z
  .number()
  .min(10000, 'Annual income must be at least ₹10,000');

// Main form schema
export const BusinessLoanFormSchema = z.object({
  businessType: BusinessTypeSchema,
  loanAmount: AmountSchema,
  annualIncome: AnnualIncomeSchema,
});

export type BusinessLoanFormType = z.infer<typeof BusinessLoanFormSchema>;
