import { z } from 'zod';

export const panSchema = z
  .string()
  .min(1, 'PAN number is required')
  .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN format');
