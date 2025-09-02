import { z } from 'zod';
import { DateObjOrString } from './date';

export const fundExpenseSchema = z.object({
  plan_id: z.string(),
  as_on_date: z.string(),
  expense_ratio: z.number().nullable().optional(),
  turnover_ratio: z.number().nullable().optional(),
  frequency: z.string(),
  modified_ts: DateObjOrString,
});

export const NewFundExpenseSchema = fundExpenseSchema;

export const UpdateFundExpenseSchema = fundExpenseSchema.partial();

export type FundExpense = z.infer<typeof fundExpenseSchema>;
export type NewFundExpense = z.infer<typeof NewFundExpenseSchema>;
export type UpdateFundExpense = z.infer<typeof UpdateFundExpenseSchema>;
