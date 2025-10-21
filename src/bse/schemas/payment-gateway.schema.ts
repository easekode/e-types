import { z } from 'zod';

/**
 * Base PaymentGateway schema for reading from database
 */
export const paymentGatewaySchema = z.object({
  id: z.string(),
  
  // Payment identifiers
  paymentRefId: z.string(),
  bsePaymentId: z.string().nullable(),
  gatewayType: z.string(),
  
  // Payment details
  paymentMode: z.string(),
  amount: z.number(),
  currency: z.string(),
  
  // Status tracking
  paymentStatus: z.string(),
  errorCode: z.string().nullable(),
  errorMessage: z.string().nullable(),
  
  // Bank details
  bankTxnRef: z.string().nullable(),
  bankCode: z.string().nullable(),
  
  // Foreign key
  uccRegistrationId: z.string(),
  
  // Timestamps
  initiatedAt: z.date(),
  completedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * Schema for creating new payment gateway record (omits id, timestamps, BSE/gateway response)
 */
export const createPaymentGatewaySchema = paymentGatewaySchema.omit({
  id: true,
  bsePaymentId: true, // BSE-assigned
  paymentStatus: true, // Set by system
  errorCode: true,
  errorMessage: true,
  bankTxnRef: true, // Gateway response
  bankCode: true, // Gateway response
  completedAt: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * Schema for updating payment gateway (partial, allows status updates)
 */
export const updatePaymentGatewaySchema = paymentGatewaySchema
  .omit({
    id: true,
    paymentRefId: true,
    uccRegistrationId: true,
    initiatedAt: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// Export inferred TypeScript types
export type PaymentGateway = z.infer<typeof paymentGatewaySchema>;
export type CreatePaymentGateway = z.infer<typeof createPaymentGatewaySchema>;
export type UpdatePaymentGateway = z.infer<typeof updatePaymentGatewaySchema>;
