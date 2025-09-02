import { z } from 'zod';
import { DateObjOrString } from './date';

export const fundReturnLatestSchema = z.object({
  plan_id: z.string(),
  return_date: z.string(),
  ret_ytd: z.number().nullable().optional(),
  ret_1day: z.number().nullable().optional(),
  ret_1week: z.number().nullable().optional(),
  ret_1month: z.number().nullable().optional(),
  ret_3month: z.number().nullable().optional(),
  ret_6month: z.number().nullable().optional(),
  ret_9month: z.number().nullable().optional(),
  ret_1year: z.number().nullable().optional(),
  ret_2year: z.number().nullable().optional(),
  ret_3year: z.number().nullable().optional(),
  ret_4year: z.number().nullable().optional(),
  ret_5year: z.number().nullable().optional(),
  ret_10year: z.number().nullable().optional(),
  ret_since_launch: z.number().nullable().optional(),
  modified_ts: DateObjOrString,
  ret_7year: z.number().nullable().optional(),
  ret_15year: z.number().nullable().optional(),
  ret_20year: z.number().nullable().optional(),
});

export const NewFundReturnLatestSchema = fundReturnLatestSchema.omit({
  plan_id: true,
});

export const UpdateFundReturnLatestSchema = fundReturnLatestSchema
  .omit({ plan_id: true })
  .partial();

export type FundReturnLatest = z.infer<typeof fundReturnLatestSchema>;
export type NewFundReturnLatest = z.infer<typeof NewFundReturnLatestSchema>;
export type UpdateFundReturnLatest = z.infer<
  typeof UpdateFundReturnLatestSchema
>;
