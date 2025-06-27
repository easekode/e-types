import { z } from 'zod';

export const otpSchema = z.string().regex(/^\d{4}$/, {
  message: 'OTP must be exactly 4 digits',
});

// Example usage:
export type Otp = z.infer<typeof otpSchema>;
