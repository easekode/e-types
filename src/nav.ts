import { z } from 'zod';
import { DateObjOrString } from './date';

export const navSchema = z.object({
  plan_id: z.string(),
  nav_date: z.string(),
  nav: z.number(),
  adjusted_nav: z.number().nullable().optional(),
  modified_ts: DateObjOrString,
});

export const NewNavSchema = navSchema;

export const UpdateNavSchema = navSchema.partial();

export type Nav = z.infer<typeof navSchema>;
export type NewNav = z.infer<typeof NewNavSchema>;
export type UpdateNav = z.infer<typeof UpdateNavSchema>;
