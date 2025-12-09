import { z } from 'zod';

/**
 * Base SIP schema for reading from database
 */
export const sipSchema = z.object({
  id: z.string(),
  
  // Member identifiers
  memSxpRegNum: z.string(),
  memberCode: z.string(),
  clientCode: z.string(),
  
  // SxP configuration
  sxpType: z.string(),
  schemeCode: z.string(),
  amount: z.number(),
  
  // Schedule
  frequency: z.string(),
  startDate: z.date(),
  nInstallments: z.number().nullable(),
  
  // Execution tracking
  executedInstallments: z.number(),
  lastExecutedAt: z.date().nullable(),
  pausedFrom: z.date().nullable(),
  
  // BSE Response
  bseSxpRegNum: z.string().nullable(),
  
  // Status tracking
  sipStatus: z.string(),
  apiStatus: z.string(),
  errorCode: z.string().nullable(),
  errorMessage: z.string().nullable(),
  
  // Foreign keys
  uccRegistrationId: z.string(),
  mandateId: z.string().nullable(),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * Schema for creating new SIP (omits id, timestamps, executedInstallments, BSE response)
 */
export const createSipSchema = sipSchema.omit({
  id: true,
  bseSxpRegNum: true, // BSE-assigned
  sipStatus: true, // Set by system
  apiStatus: true, // Set by system
  errorCode: true,
  errorMessage: true,
  executedInstallments: true, // Starts at 0
  lastExecutedAt: true,
  pausedFrom: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * Schema for updating SIP (partial, allows status and execution updates)
 */
export const updateSipSchema = sipSchema
  .omit({
    id: true,
    memSxpRegNum: true,
    uccRegistrationId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// Export inferred TypeScript types
export type Sip = z.infer<typeof sipSchema>;
export type CreateSip = z.infer<typeof createSipSchema>;
export type UpdateSip = z.infer<typeof updateSipSchema>;
