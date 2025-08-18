import { z } from 'zod';
import { DateObjOrString } from './date';

export const mfHoldingSchema = z.object({
  msId: z.string(),
  holdingType: z.string(),
  name: z.string(),
  isin: z.string(),
  country: z.string(),
  currency: z.string(),
  maturityDate: DateObjOrString,
  coupon: z.number(),
  weighting: z.number(),
  numberOfShare: z.number(),
  marketValue: z.number(),
  shareChange: z.number(),
  globalSector: z.string(),
  indianCreditQualityClassification: z.string(),
});
