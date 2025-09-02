import { z } from 'zod';
import { DateObjOrString } from './date';

export const securitiesSchema = z.object({
  security_id: z.string(),
  security_type_code: z.string(),
  base_currency_iso_code: z.string(),
  instrument_description: z.string(),
  isin: z.string().nullable().optional(),
  isin_as_of_date: z.string().nullable().optional(),
  full_name: z.string(),
  short_name: z.string(),
  name_as_of_date: z.string(),
  series: z.string().nullable().optional(),
  coupon_rate: z.string().nullable().optional(),
  maturity: z.string().nullable().optional(),
  asset_class: z.string(),
  description: z.string(),
  modified_ts: DateObjOrString,
  entity_id: z.string(),
});

export const NewSecuritiesSchema = securitiesSchema.omit({
  security_id: true,
});

export const UpdateSecuritiesSchema = securitiesSchema
  .omit({ security_id: true })
  .partial();

export type Securities = z.infer<typeof securitiesSchema>;
export type NewSecurities = z.infer<typeof NewSecuritiesSchema>;
export type UpdateSecurities = z.infer<typeof UpdateSecuritiesSchema>;
