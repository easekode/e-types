import { z } from 'zod';
import { DateObjOrString } from './date';

export const fundHoldingsSicSectorwiseImputedLatestSchema = z.object({
  plan_id: z.string(),
  sector_code: z.string(),
  as_on_date: z.string(),
  percentage: z.number(),
  modified_ts: DateObjOrString,
});

export const NewFundHoldingsSicSectorwiseImputedLatestSchema =
  fundHoldingsSicSectorwiseImputedLatestSchema;

export const UpdateFundHoldingsSicSectorwiseImputedLatestSchema =
  fundHoldingsSicSectorwiseImputedLatestSchema.partial();

export type FundHoldingsSicSectorwiseImputedLatest = z.infer<
  typeof fundHoldingsSicSectorwiseImputedLatestSchema
>;
export type NewFundHoldingsSicSectorwiseImputedLatest = z.infer<
  typeof NewFundHoldingsSicSectorwiseImputedLatestSchema
>;
export type UpdateFundHoldingsSicSectorwiseImputedLatest = z.infer<
  typeof UpdateFundHoldingsSicSectorwiseImputedLatestSchema
>;
