import { z } from 'zod';

export const mobileNumberSchema = z
  .string()
  .regex(/^[6-9]\d{9}$/, 'Invalid mobile number');

// Example usage:
// indianMobileNumberSchema.parse("9876543210"); // Passes
// indianMobileNumberSchema.parse("1234567890"); // Throws error
