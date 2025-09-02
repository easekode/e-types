import { z } from 'zod';
import { DateObjOrString } from './date';

export const fundAumSchema = z.object({
  plan_id: z.string(),
  as_on_date: z.string(),
  aum: z.number(),
  modified_ts: DateObjOrString,
});

export const NewFundAumSchema = fundAumSchema;

export const UpdateFundAumSchema = fundAumSchema.partial();

export type FundAum = z.infer<typeof fundAumSchema>;
export type NewFundAum = z.infer<typeof NewFundAumSchema>;
export type UpdateFundAum = z.infer<typeof UpdateFundAumSchema>;
