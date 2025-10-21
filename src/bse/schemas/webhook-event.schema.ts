import { z } from 'zod';

/**
 * Base WebhookEvent schema for reading from database
 */
export const webhookEventSchema = z.object({
  id: z.string(),
  
  // Event metadata
  eventType: z.string(),
  eventCategory: z.string(),
  payload: z.any(), // Json type
  
  // Entity references (string-based, no FK)
  clientCode: z.string().nullable(),
  bseOrderId: z.string().nullable(),
  bseSxpRegNum: z.string().nullable(),
  exchMandateId: z.string().nullable(),
  
  // Processing status
  processed: z.boolean(),
  processedAt: z.date().nullable(),
  errorMessage: z.string().nullable(),
  
  // Timestamps
  receivedAt: z.date(),
  createdAt: z.date(),
});

/**
 * Schema for creating new webhook event (omits id, timestamps, processed, processedAt)
 */
export const createWebhookEventSchema = webhookEventSchema.omit({
  id: true,
  processed: true, // Defaults to false
  processedAt: true,
  createdAt: true,
});

/**
 * Schema for updating webhook event (partial, allows processed status)
 */
export const updateWebhookEventSchema = webhookEventSchema
  .omit({
    id: true,
    eventType: true,
    eventCategory: true,
    payload: true,
    receivedAt: true,
    createdAt: true,
  })
  .partial();

// Export inferred TypeScript types
export type WebhookEvent = z.infer<typeof webhookEventSchema>;
export type CreateWebhookEvent = z.infer<typeof createWebhookEventSchema>;
export type UpdateWebhookEvent = z.infer<typeof updateWebhookEventSchema>;
