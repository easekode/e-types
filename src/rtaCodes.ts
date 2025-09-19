import { z } from 'zod';
import { DateObjOrString } from './date';

export const rtaCodesSchema = z.object({
  plan_id: z.string(),
  subplan_id: z.string(),
  subplan_name: z.string().nullable().optional(),
  rta_code: z.string().nullable().optional(),
  rta_name: z.string().nullable().optional(),
  as_on_date: DateObjOrString,
  modified_ts: DateObjOrString,
  fund_amc_id: z.string().nullable().optional(),
  fund_scheme_id: z.string().nullable().optional(),
});

export const NewRtaCodesSchema = rtaCodesSchema.omit({
  // Don't omit plan_id as it's required for creation
});

export const UpdateRtaCodesSchema = rtaCodesSchema
  .omit({ plan_id: true, subplan_id: true, as_on_date: true })
  .partial();

export type RtaCodes = z.infer<typeof rtaCodesSchema>;
export type NewRtaCodes = z.infer<typeof NewRtaCodesSchema>;
export type UpdateRtaCodes = z.infer<typeof UpdateRtaCodesSchema>;
