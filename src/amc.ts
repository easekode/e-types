import { z } from 'zod';

export const amcSchema = z.object({
  id: z.string(),
  name: z.string(),
  logoUrl: z.string().url().nullable().optional(),
});

export const NewAmcSchema = amcSchema.omit({ id: true });

export const UpdateAmcSchema = amcSchema.omit({ id: true }).partial();

export type Amc = z.infer<typeof amcSchema>;
export type NewAmc = z.infer<typeof NewAmcSchema>;
export type UpdateAmc = z.infer<typeof UpdateAmcSchema>;
