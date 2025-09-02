import { z } from 'zod';
import { DateObjOrString } from './date';

export const fundCategorySchema = z.object({
  category_id: z.string(),
  primary_category_name: z.string(),
  category_name: z.string(),
  modified_ts: DateObjOrString,
  is_active: z.boolean(),
  primary_category_id: z.number(),
});

export const NewFundCategorySchema = fundCategorySchema.omit({
  category_id: true,
});

export const UpdateFundCategorySchema = fundCategorySchema
  .omit({ category_id: true })
  .partial();

export type FundCategory = z.infer<typeof fundCategorySchema>;
export type NewFundCategory = z.infer<typeof NewFundCategorySchema>;
export type UpdateFundCategory = z.infer<typeof UpdateFundCategorySchema>;
