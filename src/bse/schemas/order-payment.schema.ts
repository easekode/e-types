import { z } from 'zod';

/**
 * Base OrderPayment schema for reading from database
 * Junction table tracking multiple payment attempts per order (only one can succeed)
 */
export const orderPaymentSchema = z.object({
  id: z.string(),
  
  // Foreign keys
  orderId: z.string(),
  paymentGatewayId: z.string(),
  
  // Status tracking
  paymentStatus: z.string(),
  isSuccessful: z.boolean(),
  amount: z.number(),
  
  // Tracking
  matchedAt: z.date(),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * Schema for creating new order payment (omits id, timestamps)
 * Business rule: Application logic must ensure only one successful payment per orderId
 */
export const createOrderPaymentSchema = orderPaymentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * Schema for updating order payment (partial)
 */
export const updateOrderPaymentSchema = orderPaymentSchema
  .omit({
    id: true,
    orderId: true,
    paymentGatewayId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// Export inferred TypeScript types
export type OrderPayment = z.infer<typeof orderPaymentSchema>;
export type CreateOrderPayment = z.infer<typeof createOrderPaymentSchema>;
export type UpdateOrderPayment = z.infer<typeof updateOrderPaymentSchema>;
