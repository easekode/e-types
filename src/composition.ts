import { z } from 'zod';
import { DateObjOrString } from './date';

export const compositionSchema = z.object({
  plan_id: z.string(),
  as_on_date: DateObjOrString,
  equity: z.number().nullable().optional(),
  debt: z.number().nullable().optional(),
  others: z.number().nullable().optional(),
  commodities: z.number().nullable().optional(),
  modified_ts: DateObjOrString,
  realestate: z.number().nullable().optional(),
  others_excluding_derivatives: z.number().nullable().optional(),
  hedged_equity: z.number().nullable().optional(),
});

export const NewCompositionSchema = compositionSchema.omit({
  // Don't omit plan_id as it's required for creation
});

export const UpdateCompositionSchema = compositionSchema
  .omit({ plan_id: true, as_on_date: true })
  .partial();

export type Composition = z.infer<typeof compositionSchema>;
export type NewComposition = z.infer<typeof NewCompositionSchema>;
export type UpdateComposition = z.infer<typeof UpdateCompositionSchema>;
