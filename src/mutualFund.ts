import { z } from 'zod';
import { amcSchema } from './amc';
import { MarketCapCategorySchema } from './marketCapCategory';
import { RiskProfileEnum } from './marketCaps';
import { DateObjOrString } from './date';

export const MutualFundSchema = z.object({
  id: z.string(),
  name: z.string(),
  fundCode: z.string(),
  amcId: z.string(),
  amc: amcSchema.optional(),
  categoryId: z.string(),
  category: MarketCapCategorySchema.optional(),
  riskProfile: z.nativeEnum(RiskProfileEnum),
  minSipAmount: z.number(),
  nav: z.number(), // Net Asset Value
  isSipAvailable: z.boolean().default(true),
  expenseRatio: z.number(), // e.g., 0.015 for 1.5%
  rating: z.number().nullable().optional(), // out of 5 or 10
  return1Yr: z.number().min(-100).max(100).nullable().optional(), // percentage, e.g. 8.3
  return2Yr: z.number().min(-100).max(100).nullable().optional(),
  return3Yr: z.number().min(-100).max(100).nullable().optional(),
  return5Yr: z.number().min(-100).max(100).nullable().optional(),
  fundManager: z.string().nullable().optional(),
  inceptionDate: z.date().nullable().optional(),
  aum: z.number().nullable().optional(), // value only
  minLumpsumAmount: z.number().nullable().optional(),
  createdAt: DateObjOrString,
  updatedAt: DateObjOrString,
});

export const NewMutualFundSchema = MutualFundSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const UpdateMutualFundSchema = MutualFundSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export type MutualFund = z.infer<typeof MutualFundSchema>;
export type NewMutualFund = z.infer<typeof NewMutualFundSchema>;
export type UpdateMutualFund = z.infer<typeof UpdateMutualFundSchema>;
