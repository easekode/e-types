import { z } from 'zod';
import { DateObjOrString } from './date';

//rating is discarded by the business owners

export const mfRatingSchema = z.object({
  id: z.string(),
  rating: z.number().nullable().optional(), // this holds the overall rating as per morning start data
  rating3yr: z.number().nullable().optional(), // out of 5 or 10
  rating5yr: z.number().nullable().optional(),
  rating10yr: z.number().nullable().optional(),
  return1Yr: z.number().min(-100).max(100).nullable().optional(), // percentage, e.g. 8.3
  return2Yr: z.number().min(-100).max(100).nullable().optional(),
  return3Yr: z.number().min(-100).max(100).nullable().optional(),
  return5Yr: z.number().min(-100).max(100).nullable().optional(),
  createdAt: DateObjOrString,
  updatedAt: DateObjOrString,
});

export const NewMfRatingSchema = mfRatingSchema.omit({
  id: true,
});
export const UpdateMfRatingSchema = mfRatingSchema
  .omit({
    id: true,
  })
  .partial();
export type MfRating = z.infer<typeof mfRatingSchema>;
export type NewMfRating = z.infer<typeof NewMfRatingSchema>;
export type UpdateMfRating = z.infer<typeof UpdateMfRatingSchema>;
