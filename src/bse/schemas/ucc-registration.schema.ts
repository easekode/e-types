import { z } from 'zod';

/**
 * Base UccRegistration schema for reading from database
 */
export const uccRegistrationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  
  // BSE Identifiers
  clientCode: z.string().nullable(),
  memberCode: z.string(),
  
  // Mandatory transaction fields
  holdingNature: z.string(),
  clientType: z.string(),
  taxCode: z.string(),
  rdmpIdcwPayMode: z.string(),
  divPayMode: z.string(),
  
  // Transaction type flags
  isClientPhysical: z.boolean(),
  isClientDemat: z.boolean(),
  isClientNri: z.boolean(),
  
  // Configuration
  isNominationOpted: z.boolean(),
  commMode: z.string(),
  onboarding: z.string(),
  
  // BSE Response data
  uccStatus: z.string().nullable(),
  
  // Existing fields
  paperlessFlag: z.string().nullable(),
  chequeName: z.string().nullable(),
  mobileDeclarationFlag: z.string(),
  emailDeclarationFlag: z.string(),
  nominationAuthenticationMode: z.string(),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * Schema for creating new UCC registration (omits id, timestamps, auto-generated fields)
 */
export const createUccRegistrationSchema = uccRegistrationSchema.omit({
  id: true,
  clientCode: true, // BSE-assigned
  uccStatus: true, // BSE response
  createdAt: true,
  updatedAt: true,
});

/**
 * Schema for updating UCC registration (partial updates allowed)
 */
export const updateUccRegistrationSchema = uccRegistrationSchema
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// Export inferred TypeScript types
export type UccRegistration = z.infer<typeof uccRegistrationSchema>;
export type CreateUccRegistration = z.infer<typeof createUccRegistrationSchema>;
export type UpdateUccRegistration = z.infer<typeof updateUccRegistrationSchema>;
