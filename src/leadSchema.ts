import { z } from 'zod';
import { DateObjOrString } from './date';
import { GovOrgTypeSchema } from './organizationType';
import { BusinessTypeListEnum } from './businessTypeList';
import { IndustryTypeEnum, IndustryTypeSchema } from './industryTypeList';
import { gstSchema } from './gst';
import { EmploymentTypeSchema } from './employmentType';
import { udyamNoSchema } from './udyam';
import { pinCodeSchema } from './pincode';
import { panSchema } from './pan';
import {
  CA_COUNCIL,
  DEGREES,
  ProfessionEnum,
  SALARY_NON_SALARY,
  SPECIALIZATION,
} from './profession';
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
  expectedAmt: z.number().positive('Expected amount must be positive'), // newly added
  emiForExptAmt: z
    .number()
    .positive('EMI for expected amount must be positive'), // newly added
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
  pan: panSchema.optional(),
  pinCode: z
    .string()
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
  salarySlip: z.array(z.string()).optional(),

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
  applicationId: z.string().optional(),
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

export const businessLoanSchema = leadSchema.partial().extend({
  employmentType: EmploymentTypeSchema,
  salutation: SalutationSchema,
  name: z.string().min(1, 'Name is required'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  email: z.string().email('Invalid email address'),
  dob: DateObjOrString,
  pan: panSchema,
  pinCode: pinCodeSchema,
  hasExistingLoan: z.boolean(),
  monthlyEmiAmount: z
    .number()
    .min(1, 'Monthly EMI amount is required')
    .optional(),
  businessType: z.nativeEnum(BusinessTypeListEnum),
  otherBusinessType: z
    .string()
    .min(1, 'Please specify your business type.')
    .optional(),
  enterpriseName: z.string().min(1, 'Enterprise name is required'),
  industryType: IndustryTypeSchema,
  otherIndustryType: z
    .string()
    .min(1, 'Please specify your industry type.')
    .optional(),
  businessEstablishedDate: DateObjOrString,
  bankingTurnoverGross: z.number(),
  gstRegistered: z.boolean(),
  gstNumber: gstSchema.optional(),
  itrFilled: z.boolean(),
  netProfit: z.number().gt(0, 'Net Profit must be greater than 0').optional(),
  annualTurnoverGross: z
    .number()
    .gt(0, 'Gross Annual Turnover must be greater than 0')
    .optional(),
  hasUdyamRegistration: z.boolean(),
  udyamNo: udyamNoSchema.optional(),
  loanAmount: z.number(),
  loanTenure: z.number(),
  loanEmi: z.number().gt(0, 'Loan EMI must be greater than 0'),
  businessOwnershipDoc: z.array(z.string()).optional(),
  registrationDoc: z.array(z.string()).optional(),
  professionType: z.nativeEnum(ProfessionEnum).optional(),
  otherProfessionType: z.string().optional(),
  degree: z.nativeEnum(DEGREES).optional(),
  otherDegree: z.string().optional(),
  specialization: z.nativeEnum(SPECIALIZATION).optional(),
  salaryNonSalary: z.nativeEnum(SALARY_NON_SALARY).optional(),
  monthlySalary: z.number().optional(),
  grossIncome: z.number().optional(),
  council: z.nativeEnum(CA_COUNCIL).optional(),
  registrationDate: DateObjOrString.optional(),
});

export const businessLoanFormSchema = businessLoanSchema.superRefine(
  businessLoanSuperRefine,
);

export const newBusinessLoanSchema = businessLoanSchema
  .pick({
    employmentType: true,
    loanType: true,
    expectedAmount: true,
    userId: true,
  })
  .extend({
    loanType: LoanTypeSchema,
  });

function businessLoanSuperRefine(
  data: Partial<z.infer<typeof businessLoanSchema>>,
  ctx: z.RefinementCtx,
) {
  if (
    data.hasExistingLoan &&
    (data.monthlyEmiAmount === undefined ||
      data.monthlyEmiAmount === null ||
      typeof data.monthlyEmiAmount !== 'number' ||
      data.monthlyEmiAmount <= 0)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        'Please enter the monthly EMI amount if you have an existing loan.',
      path: ['monthlyEmiAmount'],
    });
  }
  if (
    data.businessType === BusinessTypeListEnum.OTHERS &&
    (!data.otherBusinessType ||
      typeof data.otherBusinessType !== 'string' ||
      data.otherBusinessType.trim() === '')
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please specify your business type.',
      path: ['otherBusinessType'],
    });
  }
  if (
    data.industryType === IndustryTypeEnum.OTHERS &&
    (!data.otherIndustryType ||
      typeof data.otherIndustryType !== 'string' ||
      data.otherIndustryType.trim() === '')
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please specify your industry type.',
      path: ['otherIndustryType'],
    });
  }
  if (data.gstRegistered && !data.gstNumber) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please provide your GST number.',
      path: ['gstNumber'],
    });
  }
  if (
    data.itrFilled &&
    (data.netProfit === undefined || data.annualTurnoverGross === undefined)
  ) {
    if (data.netProfit === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide Net Profit if ITR is filled.',
        path: ['netProfit'],
      });
    }
    if (data.annualTurnoverGross === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide Annual Turnover Gross if ITR is filled.',
        path: ['annualTurnoverGross'],
      });
    }
  }
  if (
    data.hasUdyamRegistration &&
    (!data.udyamNo ||
      typeof data.udyamNo !== 'string' ||
      data.udyamNo.trim() === '')
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please provide your Udyam/Udyog number.',
      path: ['udyamNo'],
    });
  }
}

export const updateBusinessLoanSchema = businessLoanSchema
  .partial()
  .omit({
    userId: true,
    optedEligibilityId: true,
    optedEligibility: true,
    eligibilityList: true,
    applicationId: true,
  })
  .strict()
  .superRefine(businessLoanSuperRefine);

export type BusinessLoan = z.infer<typeof businessLoanSchema>;
export type NewBusinessLoan = z.infer<typeof newBusinessLoanSchema>;
export type UpdateBusinessLoan = z.infer<typeof updateBusinessLoanSchema>;
