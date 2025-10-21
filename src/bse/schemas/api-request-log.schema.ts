import { z } from 'zod';

/**
 * ApiRequestLog schema for CloudWatch logging (NOT a Prisma model)
 * Used by LogHelper to send comprehensive observability data to CloudWatch
 */
export const apiRequestLogSchema = z.object({
  // Core identifiers
  traceId: z.string(),
  endpoint: z.string(),
  method: z.string(),
  status: z.number(),
  duration: z.number(), // milliseconds
  
  // Entity correlation (optional)
  userId: z.string().optional(),
  clientCode: z.string().optional(),
  bseOrderId: z.string().optional(),
  bseSxpRegNum: z.string().optional(),
  exchMandateId: z.string().optional(),
  
  // Request/Response payloads (sanitized)
  requestPayload: z.any().optional(),
  responsePayload: z.any().optional(),
  
  // Performance breakdown (optional)
  bseApiTime: z.number().optional(), // milliseconds spent calling BSE API
  dbQueryTime: z.number().optional(), // milliseconds spent in database
  processingTime: z.number().optional(), // milliseconds spent processing
  
  // Error details (optional)
  errorCode: z.string().optional(),
  errorMessage: z.string().optional(),
  stackTrace: z.string().optional(),
  
  // Timestamp
  timestamp: z.date(),
});

/**
 * Schema for creating API request log (omits only id and timestamp which are auto-generated)
 */
export const createApiRequestLogSchema = apiRequestLogSchema.omit({
  timestamp: true, // Auto-set to now()
});

// Export inferred TypeScript types
export type ApiRequestLog = z.infer<typeof apiRequestLogSchema>;
export type CreateApiRequestLog = z.infer<typeof createApiRequestLogSchema>;
