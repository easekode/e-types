import { z } from 'zod';

export const pinCodeSchema = z
  .string()
  .regex(/^[0-9]{6}$/, 'Pin code must be 6 digits');
