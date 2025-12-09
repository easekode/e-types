import { z } from 'zod';

/**
 * Base Mandate schema for reading from database
 */
export const mandateSchema = z.object({
  id: z.string(),
  
  // Member identifiers
  memMandateId: z.string(),
  memberCode: z.string(),
  clientCode: z.string(),
  
  // Mandate configuration
  mandateType: z.string(),
  maxAmount: z.number(),
  
  // Bank details
  bankAccountNo: z.string(),
  bankName: z.string(),
  ifscCode: z.string(),
  accountType: z.string(),
  
  // UPI
  vpa: z.string().nullable(),
  
  // BSE Response
  exchMandateId: z.string().nullable(),
  umrn: z.string().nullable(),
  
  // Status tracking
  verificationStatus: z.string(),
  isActive: z.boolean(),
  errorCode: z.string().nullable(),
  errorMessage: z.string().nullable(),
  
  // Foreign key
  uccRegistrationId: z.string(),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
  verifiedAt: z.date().nullable(),
});

/**
 * Schema for creating new mandate (omits id, timestamps, exchMandateId, umrn)
 */
export const createMandateSchema = mandateSchema.omit({
  id: true,
  exchMandateId: true, // BSE-assigned
  umrn: true, // BSE-assigned
  verificationStatus: true, // Set by system
  errorCode: true,
  errorMessage: true,
  verifiedAt: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * Schema for updating mandate (partial, allows status updates)
 */
export const updateMandateSchema = mandateSchema
  .omit({
    id: true,
    memMandateId: true,
    uccRegistrationId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// Export inferred TypeScript types
export type Mandate = z.infer<typeof mandateSchema>;
export type CreateMandate = z.infer<typeof createMandateSchema>;
export type UpdateMandate = z.infer<typeof updateMandateSchema>;
