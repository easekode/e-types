import { z } from 'zod';

/**
 * Validation schema for account deletion request
 * User manually provides all information for the deletion request
 */
export const accDelRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 characters'),
  comment: z.string().optional(),
});

export type AccDelRequestInput = z.infer<typeof accDelRequestSchema>;
