import { z } from 'zod';

// Accepts either Udyam Registration Number (e.g., UDYAM-XX-00-0000000) or Udyog Aadhaar Number (12 digits)
export const udyamNoSchema = z.string().refine(
  val => {
    // Udyam: UDYAM-XX-00-0000000 (with hyphens, letters, and numbers)
    const udyamPattern = /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/i;
    // Udyog: 12 digits
    const udyogPattern = /^\d{12}$/;
    return udyamPattern.test(val) || udyogPattern.test(val);
  },
  {
    message:
      'Please enter a valid Udyam Registration Number (UDYAM-XX-00-0000000) or Udyog Aadhaar Number (12 digits).',
  },
);
