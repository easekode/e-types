import { z } from 'zod';

export enum ReferralPurposeEnum {
  PERSONAL_LOAN = 'PERSONAL_LOAN',
  BUSINESS_LOAN = 'BUSINESS_LOAN',
  PROPERTY_LOAN = 'PROPERTY_LOAN',
}

export const ReferralPurposeSchema = z.nativeEnum(ReferralPurposeEnum);

export enum ReferralStatusEnum {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
}
export const ReferralStatusSchema = z.nativeEnum(ReferralStatusEnum);

export const referralSchema = z.object({
  referalPhone: z
    .string()
    .min(10, 'Referral phone must be 10 digits')
    .max(10, 'Referral phone must be 10 digits')
    .regex(/^[6-9]\d{9}$/, 'Enter a valid mobile number'),
  name: z.string().min(1, 'Name is required'),
  referedBy: z.string().min(1, 'User ID is required').optional(),
  purpose: ReferralPurposeSchema,
  createdAt: z.date().optional(),
  contactedAt: z.date().optional(),
  status: ReferralStatusSchema.default(ReferralStatusEnum.NEW),
});

export type ReferralInput = z.infer<typeof referralSchema>;
export type ReferralPurpose = z.infer<typeof ReferralPurposeSchema>;
