import { z } from 'zod';

export enum ReferralStatusEnum {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
}

export const ReferralStatusSchema = z.nativeEnum(ReferralStatusEnum);

export const referralSchema = z.object({
  referalPhone: z
    .string()
    .min(10, 'Referral mobile is required')
    .max(10, 'Referral phone must be 10 digits')
    .regex(/^[0-9]{10}$/, 'Referral phone must be 10 digits'),
  name: z.string().min(1, 'Name is required'),
  referedBy: z.string().min(1, 'User ID is required'),
  createdAt: z.date().optional(),
  contactedAt: z.date().optional(),
  status: ReferralStatusSchema.default(ReferralStatusEnum.NEW),
});

export type ReferralInput = z.infer<typeof referralSchema>;
export type ReferralStatus = z.infer<typeof ReferralStatusSchema>;
