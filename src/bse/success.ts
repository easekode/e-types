/**
 * BSE Success Response Types
 *
 * Generic success response structure from BSE APIs
 */

import { z } from 'zod';

/**
 * BSE Success Response Zod Schema
 * Base schema that can be extended with .extend() to specify the data type
 * 
 * @example
 * const MyResponseSchema = bseSuccessResponseSchema.extend({
 *   data: z.object({ id: z.string() })
 * });
 */
export const bseSuccessResponseSchema = z.object({
  status: z.literal('success'),
  data: z.unknown(),
  messages: z.array(z.unknown()).optional(),
});

/**
 * Inferred TypeScript type from the base schema
 */
export type BseSuccessResponse = z.infer<typeof bseSuccessResponseSchema>;
