import { z } from 'zod';
import { DateObjOrString } from './date';

export const fundStyleboxSchema = z.object({
  plan_id: z.string(),
  scrip_date: DateObjOrString,
  rank: z.string().nullable().optional(),
  scrip_style: z.string().nullable().optional(),
  pescore: z.number().nullable().optional(),
  pbscore: z.number().nullable().optional(),
  giant_percentage: z.number().nullable().optional(),
  large_percentage: z.number().nullable().optional(),
  mid_percentage: z.number().nullable().optional(),
  small_percentage: z.number().nullable().optional(),
  tiny_percentage: z.number().nullable().optional(),
  modified_ts: DateObjOrString,
});

export const NewFundStyleboxSchema = fundStyleboxSchema;

export const UpdateFundStyleboxSchema = fundStyleboxSchema.partial();

export type FundStylebox = z.infer<typeof fundStyleboxSchema>;
export type NewFundStylebox = z.infer<typeof NewFundStyleboxSchema>;
export type UpdateFundStylebox = z.infer<typeof UpdateFundStyleboxSchema>;
