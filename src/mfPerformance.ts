import { z } from 'zod';
import { DateObjOrString } from './date';

export const mfPerformanceSchema = z.object({
  id: z.string(),
  mutualFundId: z.string(),
  dayEndNav: z.number(),
  dayEndNavDate: DateObjOrString,
  navChange: z.number(),
  createdAt: DateObjOrString,
  updatedAt: DateObjOrString, // Replace with MutualFundSchemeSchema if imported
});

export const NewMfPerformanceSchema = mfPerformanceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateMfPerformanceSchema = mfPerformanceSchema
  .omit({
    id: true,
  })
  .partial();

export type MfPerformance = z.infer<typeof mfPerformanceSchema>;
export type NewMfPerformance = z.infer<typeof NewMfPerformanceSchema>;
export type UpdateMfPerformance = z.infer<typeof UpdateMfPerformanceSchema>;
