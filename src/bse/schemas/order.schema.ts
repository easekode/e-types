import { z } from 'zod';

/**
 * Base Order schema for reading from database
 */
export const orderSchema = z.object({
  id: z.string(),
  
  // Member identifiers
  memOrdRefId: z.string(),
  memberCode: z.string(),
  clientCode: z.string(),
  
  // Order details
  orderType: z.string(),
  holdingNature: z.string(),
  schemeCode: z.string(),
  amount: z.number(),
  units: z.number().nullable(),
  
  // Conditional mandatory fields
  isIpAllowed: z.boolean(),
  redemType: z.string().nullable(),
  
  // Bank details
  bankAccountNo: z.string().nullable(),
  
  // Payment details
  paymentMode: z.string(),
  matchedBankRcpt: z.string().nullable(),
  bankTxnRef: z.string().nullable(),
  
  // BSE Response
  bseOrderId: z.string().nullable(),
  
  // Status tracking
  apiStatus: z.string(),
  orderStatus: z.string(),
  errorCode: z.string().nullable(),
  errorMessage: z.string().nullable(),
  
  // Allotment data
  allotmentDate: z.date().nullable(),
  allottedUnits: z.number().nullable(),
  allottedNav: z.number().nullable(),
  allottedAmount: z.number().nullable(),
  
  // Foreign keys
  uccRegistrationId: z.string(),
  sipId: z.string().nullable(),
  mandateId: z.string().nullable(),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * Schema for creating new order (omits id, timestamps, BSE response fields)
 */
export const createOrderSchema = orderSchema.omit({
  id: true,
  bseOrderId: true, // BSE-assigned
  apiStatus: true, // Set by system
  orderStatus: true, // Set by system
  errorCode: true,
  errorMessage: true,
  allotmentDate: true, // BSE response
  allottedUnits: true,
  allottedNav: true,
  allottedAmount: true,
  matchedBankRcpt: true, // Matched later
  bankTxnRef: true, // Matched later
  createdAt: true,
  updatedAt: true,
});

/**
 * Schema for updating order (partial, allows status updates)
 */
export const updateOrderSchema = orderSchema
  .omit({
    id: true,
    memOrdRefId: true,
    uccRegistrationId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// Export inferred TypeScript types
export type Order = z.infer<typeof orderSchema>;
export type CreateOrder = z.infer<typeof createOrderSchema>;
export type UpdateOrder = z.infer<typeof updateOrderSchema>;
