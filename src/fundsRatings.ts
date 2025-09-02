import { z } from 'zod';
import { DateObjOrString } from './date';

export const fundsRatingsSchema = z.object({
  plan_id: z.string(),
  short_name: z.string(),
  asset_class: z.string(),
  category: z.string(),
  rating_date: z.string(),
  fund_rating: z.number().nullable().optional(),
  previous_rating: z.number().nullable().optional(),
  change: z.string().nullable().optional(),
  risk_grade: z.string().nullable().optional(),
  return_grade: z.string().nullable().optional(),
  code: z.string().nullable().optional(),
  rta_code: z.string().nullable().optional(),
  modified_ts: DateObjOrString,
});

export const NewFundsRatingsSchema = fundsRatingsSchema.omit({
  plan_id: true,
});

export const UpdateFundsRatingsSchema = fundsRatingsSchema
  .omit({ plan_id: true })
  .partial();

export type FundsRatings = z.infer<typeof fundsRatingsSchema>;
export type NewFundsRatings = z.infer<typeof NewFundsRatingsSchema>;
export type UpdateFundsRatings = z.infer<typeof UpdateFundsRatingsSchema>;
