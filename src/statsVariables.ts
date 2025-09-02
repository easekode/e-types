import { z } from 'zod';
import { DateObjOrString } from './date';

export const statsVariablesSchema = z.object({
  plan_id: z.string(),
  as_on_date: DateObjOrString,
  standard_deviation: z.number().nullable().optional(),
  mean: z.number().nullable().optional(),
  sharpe_ratio: z.number().nullable().optional(),
  rsquared: z.number().nullable().optional(),
  beta: z.number().nullable().optional(),
  alpha: z.number().nullable().optional(),
  information_ratio: z.number().nullable().optional(),
  sortino_ratio: z.number().nullable().optional(),
  rating_date: DateObjOrString.nullable().optional(),
  alpha_stated: z.number().nullable().optional(),
  beta_stated: z.number().nullable().optional(),
  rsquare_stated: z.number().nullable().optional(),
  modified_ts: DateObjOrString,
  treynor: z.number().nullable().optional(),
  treynor_stated: z.number().nullable().optional(),
});

export const NewStatsVariablesSchema = statsVariablesSchema.omit({
  plan_id: true,
});

export const UpdateStatsVariablesSchema = statsVariablesSchema
  .omit({ plan_id: true })
  .partial();

export type StatsVariables = z.infer<typeof statsVariablesSchema>;
export type NewStatsVariables = z.infer<typeof NewStatsVariablesSchema>;
export type UpdateStatsVariables = z.infer<typeof UpdateStatsVariablesSchema>;
