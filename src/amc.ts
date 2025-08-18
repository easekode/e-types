import { z } from 'zod';
import { DateObjOrString } from './date';

export const amcSchema = z.object({
  id: z.string(),
  amcName: z.string(),
  amcId: z.string(),
  logoUrl: z.string().url().nullable().optional(),
  alias: z.string(),
  isActive: z.boolean(),
  createdAt: DateObjOrString,
  updatedAt: DateObjOrString,
});

export const NewAmcSchema = amcSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateAmcSchema = amcSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .partial();

export type Amc = z.infer<typeof amcSchema>;
export type NewAmc = z.infer<typeof NewAmcSchema>;
export type UpdateAmc = z.infer<typeof UpdateAmcSchema>;
