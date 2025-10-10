import { z } from 'zod';

// IFSC code format: 4 letters (bank code), 0, 6 digits (branch code)
export const ifscCodeSchema = z.string().regex(/^[A-Z]{4}0\d{6}$/, {
  message:
    'Invalid IFSC code format. Expected 4 letters, 0, and 6 digits (e.g., SBIN0001234).',
});
