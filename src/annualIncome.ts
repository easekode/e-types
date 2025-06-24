import { z } from 'zod';

export const IncomeUnitEnum = z.enum([
  'Thousand',
  'Lakh',
  'Crore',
  'Million',
  'Billion',
]);

export const IncomeRangeSchema = z.object({
  unit: IncomeUnitEnum,
  min: z.number(),
  max: z.number().optional(), // undefined means no upper limit (infinity)
  isInfinity: z.boolean().default(false), // true if max is infinity (no upper limit)
});

export type AnnualIncomeRange = z.infer<typeof IncomeRangeSchema>;
