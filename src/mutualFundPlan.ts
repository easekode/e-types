import { z } from 'zod';

// Example enums for goals and tenure (customize as needed)
export enum GoalEnum {
  RETIREMENT = 'Retirement',
  EDUCATION = 'Education',
  TRAVEL = 'Travel',
  OTHER = 'Other',
}
export const GoalSchema = z.nativeEnum(GoalEnum);
export type GoalType = z.infer<typeof GoalSchema>;

export enum TenureEnum {
  ONE_YEAR = '1 Year',
  THREE_YEARS = '3 Years',
  FIVE_YEARS = '5 Years',
  TEN_YEARS = '10 Years',
  OTHER = 'Other',
}
export const TenureSchema = z.nativeEnum(TenureEnum);
export type TenureType = z.infer<typeof TenureSchema>;

// Main schema
export const MutualFundPlanSchema = z.object({
  goal: GoalSchema,
  budget: z.number().min(1, 'Budget must be greater than 0'),
  tenure: TenureSchema,
  description: z.string().optional(),
});

export type MutualFundPlanType = z.infer<typeof MutualFundPlanSchema>;
