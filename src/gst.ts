import { z } from 'zod';

// Indian GSTIN regex: 15 characters, format: 2 digits (state code), 10 alphanumeric (PAN), 1 letter, 1 alphanumeric, 1 letter (Z by default), 1 digit/letter (checksum)
const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export const gstSchema = z
  .string()
  .min(1, { message: 'GSTIN is required' })
  .regex(GSTIN_REGEX, { message: 'Invalid GSTIN format' });

export type GstSchemaType = z.infer<typeof gstSchema>;
