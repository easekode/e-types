import { z } from 'zod';

// Insurance category enum validation
export const insuranceCategorySchema = z.enum(['HEALTH', 'TERM', 'MOTOR']);

// Insurance provider schemas
export const createInsuranceProviderSchema = z.object({
  name: z
    .string()
    .min(1, 'Provider name is required')
    .max(100, 'Provider name too long'),
  category: insuranceCategorySchema,
  description: z.string().optional(),
  logo: z.string().url('Invalid logo URL').optional().or(z.literal('')),
  isActive: z.boolean().optional().default(true),
});

export const updateInsuranceProviderSchema = z.object({
  name: z
    .string()
    .min(1, 'Provider name is required')
    .max(100, 'Provider name too long')
    .optional(),
  category: insuranceCategorySchema.optional(),
  description: z.string().optional(),
  logo: z.string().url('Invalid logo URL').optional().or(z.literal('')),
  isActive: z.boolean().optional(),
});

// Claim step schemas
export const createClaimStepSchema = z.object({
  providerId: z.string().cuid('Invalid provider ID'),
  title: z
    .string()
    .min(1, 'Step title is required')
    .max(200, 'Step title too long'),
  description: z.string().min(1, 'Step description is required'),
  stepOrder: z.number().int().positive('Step order must be a positive integer'),
  stepType: z.string().optional(),
  details: z.record(z.any()).optional(),
  isActive: z.boolean().optional(),
});

export const updateClaimStepSchema = z.object({
  title: z
    .string()
    .min(1, 'Step title is required')
    .max(200, 'Step title too long')
    .optional(),
  description: z.string().min(1, 'Step description is required').optional(),
  stepOrder: z
    .number()
    .int()
    .positive('Step order must be a positive integer')
    .optional(),
  stepType: z.string().optional(),
  details: z.record(z.any()).optional(),
  isActive: z.boolean().optional(),
});

// Parameter validation schemas
export const providerParamsSchema = z.object({
  id: z.string().cuid('Invalid provider ID'),
});

export const stepParamsSchema = z.object({
  id: z.string().cuid('Invalid step ID'),
});

export const categoryParamsSchema = z.object({
  category: insuranceCategorySchema,
});

// Query parameter schemas
export const providerQuerySchema = z.object({
  category: insuranceCategorySchema.optional(),
  isActive: z
    .string()
    .transform(val => val === 'true')
    .optional(),
  page: z
    .string()
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0, 'Page must be positive')
    .optional(),
  limit: z
    .string()
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0 && val <= 100, 'Limit must be between 1 and 100')
    .optional(),
});

// Response type inference
export type CreateInsuranceProviderInput = z.infer<
  typeof createInsuranceProviderSchema
>;
export type UpdateInsuranceProviderInput = z.infer<
  typeof updateInsuranceProviderSchema
>;
export type CreateClaimStepInput = z.infer<typeof createClaimStepSchema>;
export type UpdateClaimStepInput = z.infer<typeof updateClaimStepSchema>;
export type ProviderParams = z.infer<typeof providerParamsSchema>;
export type StepParams = z.infer<typeof stepParamsSchema>;
export type CategoryParams = z.infer<typeof categoryParamsSchema>;
export type ProviderQuery = z.infer<typeof providerQuerySchema>;
export type InsuranceCategory = z.infer<typeof insuranceCategorySchema>;

// User Policy schemas
export const createUserPolicySchema = z.object({
  providerId: z.string().cuid('Invalid provider ID'),
  category: insuranceCategorySchema,
  policyNumber: z
    .string()
    .min(1, 'Policy number is required')
    .max(50, 'Policy number too long'),
  policyType: z
    .string()
    .min(1, 'Policy type is required')
    .max(100, 'Policy type too long'),
  customerName: z
    .string()
    .min(1, 'Customer name is required')
    .max(100, 'Customer name too long'),
  contactNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid contact number')
    .optional(),
  dateOfBirth: z
    .string()
    .transform(val => new Date(val))
    .refine(val => val <= new Date(), 'Date of birth cannot be in the future')
    .optional(),
  sumInsured: z.coerce.number().positive('Sum insured must be positive'),
  startDate: z.string().transform(val => new Date(val)),
  endDate: z
    .string()
    .transform(val => new Date(val))
    .optional(),
  isActive: z.boolean().optional().default(true),
});

export const updateUserPolicySchema = z.object({
  providerId: z.string().cuid('Invalid provider ID').optional(),
  category: insuranceCategorySchema.optional(),
  policyNumber: z
    .string()
    .min(1, 'Policy number is required')
    .max(50, 'Policy number too long')
    .optional(),
  policyType: z
    .string()
    .min(1, 'Policy type is required')
    .max(100, 'Policy type too long')
    .optional(),
  customerName: z
    .string()
    .min(1, 'Customer name is required')
    .max(100, 'Customer name too long')
    .optional(),
  contactNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid contact number')
    .optional(),
  dateOfBirth: z
    .string()
    .transform(val => new Date(val))
    .refine(val => val <= new Date(), 'Date of birth cannot be in the future')
    .optional(),
  sumInsured: z.coerce
    .number()
    .positive('Sum insured must be positive')
    .optional(),
  startDate: z
    .string()
    .transform(val => new Date(val))
    .optional(),
  endDate: z
    .string()
    .transform(val => new Date(val))
    .optional(),
  isActive: z.boolean().optional(),
});

// Assistance Contact schemas
export const createAssistanceContactSchema = z.object({
  type: z.string().min(1, 'Type is required').max(50, 'Type too long'),
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  phoneNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  description: z
    .string()
    .max(500, 'Description too long')
    .optional()
    .or(z.literal('')),
  priority: z
    .number()
    .int()
    .positive('Priority must be a positive integer')
    .optional(),
  isActive: z.boolean().optional().default(true),
});

export const updateAssistanceContactSchema = z.object({
  type: z
    .string()
    .min(1, 'Type is required')
    .max(50, 'Type too long')
    .optional(),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title too long')
    .optional(),
  phoneNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  description: z
    .string()
    .max(500, 'Description too long')
    .optional()
    .or(z.literal('')),
  priority: z
    .number()
    .int()
    .positive('Priority must be a positive integer')
    .optional(),
  isActive: z.boolean().optional(),
});

// Policy parameter schemas
export const policyParamsSchema = z.object({
  id: z.string().cuid('Invalid policy ID'),
});

export const assistanceParamsSchema = z.object({
  id: z.string().cuid('Invalid assistance contact ID'),
});

// Policy query parameter schemas
export const policyQuerySchema = z.object({
  category: insuranceCategorySchema.optional(),
  providerId: z.string().cuid('Invalid provider ID').optional(),
  isActive: z
    .string()
    .transform(val => val === 'true')
    .optional(),
  page: z
    .string()
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0, 'Page must be positive')
    .optional(),
  limit: z
    .string()
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0 && val <= 100, 'Limit must be between 1 and 100')
    .optional(),
});

export const assistanceQuerySchema = z.object({
  type: z.string().optional(),
  isActive: z
    .string()
    .transform(val => val === 'true')
    .optional(),
  page: z
    .string()
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0, 'Page must be positive')
    .optional(),
  limit: z
    .string()
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0 && val <= 100, 'Limit must be between 1 and 100')
    .optional(),
});

// Additional type exports
export type CreateUserPolicyInput = z.infer<typeof createUserPolicySchema>;
export type UpdateUserPolicyInput = z.infer<typeof updateUserPolicySchema>;
export type CreateAssistanceContactInput = z.infer<
  typeof createAssistanceContactSchema
>;
export type UpdateAssistanceContactInput = z.infer<
  typeof updateAssistanceContactSchema
>;
export type PolicyParams = z.infer<typeof policyParamsSchema>;
export type AssistanceParams = z.infer<typeof assistanceParamsSchema>;
export type PolicyQuery = z.infer<typeof policyQuerySchema>;
export type AssistanceQuery = z.infer<typeof assistanceQuerySchema>;

// User Request schemas (for assistance requests)
export const userRequestStatusSchema = z.enum([
  'NEW',
  'PENDING',
  'RESOLVED',
  'CLOSED',
]);

export const userRequestCreateSchema = z
  .object({
    policyId: z.string().cuid('Invalid policy ID'),
    message: z
      .string()
      .max(1000, 'Message cannot exceed 1000 characters')
      .optional(),
    contactNumber: z
      .string()
      .regex(/^[6-9]\d{9}$/, 'Invalid contact number')
      .optional(),
  })
  .strict();

// User Request update schema (admin-only)
export const userRequestUpdateSchema = z
  .object({
    status: userRequestStatusSchema.optional(),
    remarks: z
      .string()
      .max(1000, 'Remarks cannot exceed 1000 characters')
      .nullable()
      .optional(),
    message: z
      .string()
      .max(1000, 'Message cannot exceed 1000 characters')
      .optional(),
    contactNumber: z
      .string()
      .regex(/^[6-9]\d{9}$/, 'Invalid contact number')
      .optional(),
  })
  .strict()
  .refine(
    data =>
      data.status !== undefined ||
      data.remarks !== undefined ||
      data.message !== undefined ||
      data.contactNumber !== undefined,
    { message: 'At least one field must be provided' },
  );

// User Request parameter validation
export const userRequestParamsSchema = z
  .object({
    id: z.string().cuid('Invalid request ID'),
  })
  .strict();

// Type exports for UserRequest
export type UserRequestCreateInput = z.infer<typeof userRequestCreateSchema>;
export type UserRequestUpdateInput = z.infer<typeof userRequestUpdateSchema>;
export type UserRequestParams = z.infer<typeof userRequestParamsSchema>;
export type UserRequestStatus = z.infer<typeof userRequestStatusSchema>;

// --- API Response Types ---
export type ClaimStep = z.infer<typeof createClaimStepSchema> & {
  id: string;
  details?: {
    instruction?: { desc: string; type: string }[];
    bullets?: string[];
    [key: string]: any;
  };
};

export type InsuranceProvider = {
  id: string;
  name: string;
  category: InsuranceCategory;
  description?: string;
  logo?: string | null;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  claimSteps: ClaimStep[];
};

export interface ProvidersApiResponse {
  providers: InsuranceProvider[];
  total: number;
}

// --- User Policy Types ---
export interface Provider {
  id: string;
  name: string;
  category: InsuranceCategory;
  description?: string;
  logo?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserPolicy {
  id: string;
  userId: string;
  providerId: string;
  category: InsuranceCategory;
  policyNumber: string;
  policyType: string;
  customerName: string;
  contactNumber: string;
  dateOfBirth: string;
  sumInsured: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  provider: Provider;
}

export interface UserPoliciesResponse {
  policies: UserPolicy[];
  total: number;
  page: number;
  limit: number;
}

// --- Assistance Contact Types ---
export interface AssistanceContact {
  id: string;
  type: string; // 'TERM' | 'MOTOR' | 'HEALTH'
  title: string;
  phoneNumber?: string;
  email?: string;
  description?: string;
  isActive: boolean;
  priority?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AssistanceContactsResponse {
  contacts: AssistanceContact[];
  total: number;
  page: number;
  limit: number;
}

// --- Assistance Request Types ---
export interface AssistanceRequestInput {
  policyId: string;
}

export interface AssistanceRequestResponse {
  success: boolean;
  message: string;
  request: {
    id: string;
    userId: string;
    policyId: string;
    message: string | null;
  };
}
