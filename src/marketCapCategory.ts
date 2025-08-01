import { z } from 'zod';
import { MarketCapCategoryEnum, RiskProfileEnum } from './marketCaps';

export const MarketCapCategorySchema = z.object({
  id: z.string(),
  category: z.nativeEnum(MarketCapCategoryEnum),
  shortDescription: z.string().min(5, 'Short description is required'),
  longDescription: z
    .string()
    .min(10, 'Long description is required')
    .optional(),
  riskProfile: z.nativeEnum(RiskProfileEnum),
  returnRateRange: z.tuple([
    z.number().min(0, 'Minimum return rate must be non-negative'),
    z.number().min(0, 'Maximum return rate must be non-negative'),
  ]),
});

export const NewMarketCapCategorySchema = MarketCapCategorySchema.omit({});

export const UpdateMarketCapCategorySchema =
  MarketCapCategorySchema.partial().omit({
    id: true,
    category: true,
  });

export type MarketCapCategory = z.infer<typeof MarketCapCategorySchema>;
export type NewMarketCapCategory = z.infer<typeof NewMarketCapCategorySchema>;
export type UpdateMarketCapCategory = z.infer<
  typeof UpdateMarketCapCategorySchema
>;
