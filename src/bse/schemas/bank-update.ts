import { z } from 'zod';
import { BseBankAccountSchema } from './ucc-api.schema';

/**
 * BSE Bank Account Update Schemas
 *
 * ARCHITECTURE:
 * - BankUpdateRequestSchema: API endpoint schema (client sends this)
 * - BseBankUpdatePayloadSchema: BSE API schema (sent to BSE after transformation)
 * - member_id and client_code are populated internally in the service layer
 *
 * Based on BSE StARMF v2 API /v2/update_ucc endpoint
 */

/**
 * Bank account update operations schema
 * Enforces one bank account per operation type
 */
export const BankAccountUpdateSchema = z
  .object({
    delete: z
      .array(BseBankAccountSchema)
      .max(1, 'Only one bank account can be deleted at a time')
      .optional(),
    add: z
      .array(BseBankAccountSchema)
      .max(1, 'Only one bank account can be added at a time')
      .optional(),
  })
  .refine(
    data => (data.add && data.add.length > 0) || (data.delete && data.delete.length > 0),
    { message: 'At least one bank account operation (add or delete) is required' }
  );

/**
 * Base schema for API request
 * Client sends this - member_id and client_code are NOT required
 */
export const BankUpdateRequestSchema = z.object({
  bank_account: BankAccountUpdateSchema,
});

/**
 * Member schema for BSE API payload
 */
export const BseMemberSchema = z.object({
  member_id: z.string().min(1),
});

/**
 * Investor schema for BSE API payload
 */
export const BseInvestorSchema = z.object({
  client_code: z.string().min(1),
});

/**
 * Complete BSE API payload schema
 * This is sent to BSE API after populating member_id and client_code internally
 */
export const BseBankUpdatePayloadSchema = z.object({
  data: z.object({
    member: BseMemberSchema,
    investor: BseInvestorSchema,
    bank_account: BankAccountUpdateSchema,
  }),
});

// Export TypeScript types
export type BankAccountUpdate = z.infer<typeof BankAccountUpdateSchema>;
export type BankUpdateRequest = z.infer<typeof BankUpdateRequestSchema>;
export type BseMember = z.infer<typeof BseMemberSchema>;
export type BseInvestor = z.infer<typeof BseInvestorSchema>;
export type BseBankUpdatePayload = z.infer<typeof BseBankUpdatePayloadSchema>;
