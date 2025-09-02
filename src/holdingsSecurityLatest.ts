import { z } from 'zod';
import { DateObjOrString } from './date';

export const holdingsSecurityLatestSchema = z.object({
  plan_id: z.string(),
  security_id: z.string(),
  asset_id: z.string(),
  asset_date: z.string(),
  asset_value: z.number().nullable().optional(),
  num_of_shares: z.string().nullable().optional(),
  asset_percentage: z.number().nullable().optional(),
  coupon_rate: z.number(),
  maturity: z.string(),
  rating_id: z.string(),
  modified_ts: DateObjOrString,
  sebi_rank: z.string().nullable().optional(),
});

export const NewHoldingsSecurityLatestSchema = holdingsSecurityLatestSchema;

export const UpdateHoldingsSecurityLatestSchema =
  holdingsSecurityLatestSchema.partial();

export type HoldingsSecurityLatest = z.infer<
  typeof holdingsSecurityLatestSchema
>;
export type NewHoldingsSecurityLatest = z.infer<
  typeof NewHoldingsSecurityLatestSchema
>;
export type UpdateHoldingsSecurityLatest = z.infer<
  typeof UpdateHoldingsSecurityLatestSchema
>;
