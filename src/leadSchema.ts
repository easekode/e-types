import { z } from 'zod';
import { GovOrgTypeSchema, GovOrgTypeEnum } from './organizationType';
import { DateObjOrString } from './date';
// Loan Type Enum
export enum LoanTypeEnum {
  PERSONAL_LOAN = 'PERSONAL_LOAN',
  HOME_LOAN = 'HOME_LOAN',
  CAR_LOAN = 'CAR_LOAN',
  BUSINESS_LOAN = 'BUSINESS_LOAN',
  EDUCATION_LOAN = 'EDUCATION_LOAN',
  GOLD_LOAN = 'GOLD_LOAN',
  PROPERTY_LOAN = 'PROPERTY_LOAN',
}

export const LoanTypeSchema = z.nativeEnum(LoanTypeEnum);
export type LoanType = z.infer<typeof LoanTypeSchema>;

export enum DepartmentEnum {
  EDUCATION = 'EDUCATION',
  BANKING = 'BANKING',
  HOSPITAL = 'HOSPITAL',
  INSURANCE = 'INSURANCE',
  RAILWAY = 'RAILWAY',
  OTHERS = 'OTHERS',
}

export const DepartmentSchema = z.nativeEnum(DepartmentEnum);
export type Department = z.infer<typeof DepartmentSchema>;

// Opted Eligibility Schema
export const optedEligibilitySchema = z.object({
  id: z.string().min(1, 'ID is required'),
  tenure: z.number().positive('Tenure must be positive'),
  rate: z.number().positive('Rate must be positive'),
  amt: z.number().positive('Amount must be positive'),
  emi: z.number().positive('EMI must be positive'),
});

export type OptedEligibility = z.infer<typeof optedEligibilitySchema>;

export const leadSchema = z.object({
  // Step 1: Personal Information
  name: z.string().min(1, 'Name is required').optional(),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\d{10}$/, 'Phone number must be 10 digits')
    .optional(),
  email: z.string().email('Invalid email address').optional(),
  dob: DateObjOrString.optional(),
  pan: z
    .string()
    .min(1, 'PAN number is required')
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN format')
    .optional(),
  pinCode: z
    .string()
    .min(1, 'Pin code is required')
    .regex(/^\d{6}$/, 'Pin code must be 6 digits')
    .optional(),
  hasExistingLoan: z.boolean().optional(),
  monthlyEmiAmount: z
    .number()
    .min(1, 'Monthly EMI amount is required')
    .optional(),
  salary: z.number().min(1, 'Monthly Salary is required').optional(),

  // Step 2: Employment Details
  orgType: GovOrgTypeSchema.optional(), // GOVT / NON_GOV
  department: DepartmentSchema.optional(),
  employerName: z.string().min(1, 'Employer name is required').optional(),

  // Loan Details
  loanType: LoanTypeSchema.optional(),
  expectedAmount: z.number().min(1, 'Expected amount is required').optional(),
  salarySlip: z.string().min(1, 'Salary slip is required').optional(),

  // Lead Management
  isSubmitted: z.boolean().optional().default(false),
  status: z
    .enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'])
    .optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
  optedEligibility: optedEligibilitySchema.optional(),
  eligibilityList: z.array(optedEligibilitySchema).optional(),
});

export const leadParamsSchema = z.object({
  id: z.string().cuid('Invalid lead ID'),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type LeadParams = z.infer<typeof leadParamsSchema>;
export const updateLeadSchema = leadSchema.partial();
