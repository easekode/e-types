import { z } from 'zod';
import { DateObjOrString } from './date';

export const termInsurancePlanSchema = z.object({
  id: z.string(), // cuid
  provider: z.string(),
  planName: z.string(),
  coverageAmount: z.number(),
  premium: z.number(),
  termYears: z.number().int(),
  ageLimit: z.number().int(),
  medicalRequired: z.boolean(),
  createdAt: DateObjOrString,
  updatedAt: DateObjOrString,
});

export const NewTermInsurancePlanSchema = termInsurancePlanSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const UpdateTermInsurancePlanSchema = termInsurancePlanSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .partial();

export type TermInsurancePlan = z.infer<typeof termInsurancePlanSchema>;
export type NewTermInsurancePlan = z.infer<typeof NewTermInsurancePlanSchema>;
export type UpdateTermInsurancePlan = z.infer<
  typeof UpdateTermInsurancePlanSchema
>;
