import { z } from 'zod';
import { DateObjOrString } from './date';

//This schemas may needs incremental updates in the future
export const healthInsurancePlanSchema = z.object({
  id: z.string(),
  provider: z.string(),
  planName: z.string(),
  coverageAmount: z.number(),
  premium: z.number(),
  termYears: z.number().int(),
  features: z.array(z.string()),
  riskLevel: z.string(),
  createdAt: DateObjOrString,
  updatedAt: DateObjOrString,
});

export const NewHealthInsurancePlanSchema = healthInsurancePlanSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const UpdateHealthInsurancePlanSchema = healthInsurancePlanSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .partial();

export type HealthInsurancePlan = z.infer<typeof healthInsurancePlanSchema>;
export type NewHealthInsurancePlan = z.infer<
  typeof NewHealthInsurancePlanSchema
>;
export type UpdateHealthInsurancePlan = z.infer<
  typeof UpdateHealthInsurancePlanSchema
>;
