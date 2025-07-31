import { z } from 'zod';
import { InvestmentGoalType } from './goalType';
import { UserSchema } from './auth';

export enum InvestmentGoalStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export const InvestmentGoalSchema = z.object({
  type: z.nativeEnum(InvestmentGoalType),
  name: z.string(),
  targetAmt: z.number(),
  targetDate: z.coerce.date(),
  description: z.string().optional(),
  userId: z.string(),
  user: UserSchema.optional(),
  investedAmt: z.number(),
  sipInstallment: z.number(),
  status: z.nativeEnum(InvestmentGoalStatus),
});

export const NewInvestmentGoalSchema = InvestmentGoalSchema.omit({
  userId: true,
  user: true,
  investedAmt: true,
  sipInstallment: true,
  status: true,
});

export const UpdateInvestmentGoalSchema = InvestmentGoalSchema.partial()
  .omit({
    type: true,
    userId: true,
    user: true,
  })
  .strict();

export type NewInvestmentGoal = z.infer<typeof NewInvestmentGoalSchema>;
export type UpdateInvestmentGoal = z.infer<typeof UpdateInvestmentGoalSchema>;
export type InvestmentGoal = z.infer<typeof InvestmentGoalSchema>;
