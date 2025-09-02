import { z } from 'zod';
import { DateObjOrString } from './date';

export const amcSchema = z.object({
  amc_id: z.string(),
  amc_full_name: z.string(),
  owner_type: z.string().nullable().optional(),
  cio: z.string().nullable().optional(),
  investors_relations_officer: z.string().nullable().optional(),
  amc_short_name: z.string(),
  ceo: z.string().nullable().optional(),
  management_trustee: z.string().nullable().optional(),
  start_date: z.string(),
  is_excluded: z.boolean().default(false),
  website: z.string().nullable().optional(),
  address1: z.string().nullable().optional(),
  address2: z.string().nullable().optional(),
  address3: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  pin: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  fax: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  modified_ts: DateObjOrString,
  row_number: z.string().nullable().optional(),
});

export const NewAmcSchema = amcSchema.omit({
  amc_id: true,
});

export const UpdateAmcSchema = amcSchema.omit({ amc_id: true }).partial();

export type Amc = z.infer<typeof amcSchema>;
export type NewAmc = z.infer<typeof NewAmcSchema>;
export type UpdateAmc = z.infer<typeof UpdateAmcSchema>;
