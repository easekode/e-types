import { z } from 'zod';

export const sendSmsSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid mobile number'),
  message: z.string().min(1, 'Message is required'),
});

export type SendSmsInputType = z.infer<typeof sendSmsSchema>;
