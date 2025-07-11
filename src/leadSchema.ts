import { z } from 'zod';
import { DateObjOrString } from './date';
import { GovOrgTypeSchema } from './organizationType';
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
  BANKING = 'BANKING',
  BBG_CORPORATE = 'BBG CORPORATE',
  BPO = 'BPO',
  CENTRAL_GOVERNMENT = 'CENTRAL GOVERNMENT',
  DEFENSE = 'DEFENSE',
  EDUCATION = 'EDUCATION',
  GEMS_JEWELRY = 'GEMS AND JEWELRY',
  GOVERNMENT = 'GOVERNMENT',
  HOSPITAL = 'HOSPITAL',
  INSURANCE = 'INSURANCE',
  ITES = 'ITES',
  JOURNALIST = 'JOURNALIST',
  MANUFACTURING = 'MANUFACTURING',
  METALS = 'METALS',
  MINING = 'MINING',
  NBFC = 'NBFC',
  POLICE = 'POLICE',
  PREMIUM_INSTITUTES = 'PREMIUM INSTITUTES',
  RAILWAY = 'RAILWAY',
  REAL_ESTATE = 'REAL ESTATE',
  SERVICE = 'SERVICE',
  SOFTWARE = 'SOFTWARE',
  STAFFING = 'STAFFING',
  STATE_GOVERNMENT = 'STATE GOVERNMENT',
  STOCK_BROKING = 'STOCK BROKING AND TRADING',
}

export const DepartmentSchema = z.nativeEnum(DepartmentEnum);
export type Department = z.infer<typeof DepartmentSchema>;

export enum SalutationEnum {
  MR = 'Mr',
  MS = 'Ms',
  MRS = 'Mrs',
}

export const SalutationSchema = z.nativeEnum(SalutationEnum);
export type Salutation = z.infer<typeof SalutationSchema>;

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
  userId: z.string().optional(),
  salutation: SalutationSchema.optional(), // <-- now optional for multi-step flexibility
  name: z.string().min(1, 'Name is required').optional(),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[0-9]{10}$/, 'Phone number must be 10 digits')
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
  isSubmitted: z.boolean().default(false),
  status: z
    .enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'])
    .optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
  optedEligibilityId: z.string().optional(),
  optedEligibility: optedEligibilitySchema.optional(),
  eligibilityList: z.array(optedEligibilitySchema).optional(),
});

export const leadPersonalInfoSchema = leadSchema
  .partial()
  .extend({
    salutation: SalutationSchema,
    name: z.string().min(1, 'Name is required'),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    dob: DateObjOrString,
    pinCode: z
      .string()
      .min(1, 'Pin code is required')
      .regex(/^[0-9]{6}$/, 'Pin code must be 6 digits'),
    salary: z.number().min(1, 'Monthly Salary is required'),
    hasExistingLoan: z.boolean(),
    monthlyEmiAmount: z
      .number()
      .min(1, 'Monthly EMI amount is required')
      .optional(),
    orgType: GovOrgTypeSchema,
    department: DepartmentSchema,
    employerName: z.string().min(1, 'Employer name is required'),
  })
  .refine(
    data => {
      console.log('Validating lead personal info:', data);
      if (data.hasExistingLoan) {
        return data.monthlyEmiAmount !== undefined && data.monthlyEmiAmount > 0;
      }
      return true;
    },
    {
      message: 'Monthly EMI amount is required when hasExistingLoan is true',
      path: ['monthlyEmiAmount'],
    },
  );

export type LeadPersonalInfo = z.infer<typeof leadPersonalInfoSchema>;
export const leadParamsSchema = z.object({
  id: z.string().cuid('Invalid lead ID'),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type LeadParams = z.infer<typeof leadParamsSchema>;
export const updateLeadSchema = leadSchema.partial();
