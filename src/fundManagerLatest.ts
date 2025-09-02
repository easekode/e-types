import { z } from 'zod';
import { DateObjOrString } from './date';

export const fundManagerLatestSchema = z.object({
  plan_id: z.string(),
  person_id: z.string(),
  date_from: DateObjOrString,
  modified_ts: DateObjOrString,
  person_type: z.string().nullable().optional(),
});

export const NewFundManagerLatestSchema = fundManagerLatestSchema;

export const UpdateFundManagerLatestSchema = fundManagerLatestSchema.partial();

export type FundManagerLatest = z.infer<typeof fundManagerLatestSchema>;
export type NewFundManagerLatest = z.infer<typeof NewFundManagerLatestSchema>;
export type UpdateFundManagerLatest = z.infer<
  typeof UpdateFundManagerLatestSchema
>;
