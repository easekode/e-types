import { z } from 'zod';
import { DateObjOrString } from './date';
import { MarketCapCategorySchema } from './marketCapCategory';
import { mfHoldingSchema } from './mfHolding';
import { mfEquityAllocationSchema } from './mfEquitySectorAllocation';

export const mfPortfolioSchema = z.object({
  id: z.string(),
  mutualFundId: z.string(),
  aum: z.number().nullable().optional(),
  aumDate: DateObjOrString,
  // categoryId: z.string(),
  // category: MarketCapCategorySchema.optional(),
  fullHoldings: z.array(mfHoldingSchema).optional(),
  assetAllocation: mfEquityAllocationSchema.optional(),
  createdAt: DateObjOrString,
  updatedAt: DateObjOrString,
  // Replace with MutualFundSchemeSchema if imported
});

export const NewMfPortfolioSchema = mfPortfolioSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateMfPortfolioSchema = mfPortfolioSchema
  .omit({
    id: true,
  })
  .partial();
export type MfPortfolio = z.infer<typeof mfPortfolioSchema>;
export type NewMfPortfolio = z.infer<typeof NewMfPortfolioSchema>;
export type UpdateMfPortfolio = z.infer<typeof UpdateMfPortfolioSchema>;
