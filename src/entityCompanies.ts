import { z } from 'zod';
import { DateObjOrString } from './date';

export const entityCompaniesSchema = z.object({
  entity_id: z.string(),
  company: z.string(),
  short_name: z.string(),
  website: z.string().nullable().optional(),
  country_code: z.string(),
  amfi_industry_code: z.string().nullable().optional(),
  lei_number: z.string().nullable().optional(),
  modified_ts: DateObjOrString,
});

export const NewEntityCompaniesSchema = entityCompaniesSchema.omit({
  entity_id: true,
});

export const UpdateEntityCompaniesSchema = entityCompaniesSchema
  .omit({ entity_id: true })
  .partial();

export type EntityCompanies = z.infer<typeof entityCompaniesSchema>;
export type NewEntityCompanies = z.infer<typeof NewEntityCompaniesSchema>;
export type UpdateEntityCompanies = z.infer<typeof UpdateEntityCompaniesSchema>;
