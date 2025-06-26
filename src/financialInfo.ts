import { z } from 'zod';
import { GovOrgTypeSchema } from './organizationType';

export const FinancialSchema = z.object({
  orgType: GovOrgTypeSchema,
  department: z.string().min(1, 'Department name is required'),
  organization: z.string().min(1, 'Organisation name is required'),
  salary: z
    .string()
    .min(1, 'Monthly Salary is required')
    .regex(/^\d+$/, 'Salary must be numeric'),
  designation: z.string().min(1, 'Designation is required'),
  emis: z
    .string()
    .min(1, 'Existing EMIs is required')
    .regex(/^\d+$/, 'EMIs must be numeric'),
  other: z.string().optional(),
});

export type FinancialSchemaType = z.infer<typeof FinancialSchema>;
