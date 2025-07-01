import { z } from 'zod';
import { mobileNumberSchema } from './mobile';

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  mobile: mobileNumberSchema,
});

export type RegisterSchema = z.infer<typeof registerSchema>;
