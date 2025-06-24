import { z } from 'zod';
import { PolicyMemberSchema } from './policyMemberType';

export const MemberAgeSchema = z
  .number()
  .min(1, 'Age must be at least 1')
  .max(120, 'Age must be 120 or less');

export const PincodeSchema = z
  .string()
  .regex(/^\d{6}$/, 'Pincode must be a valid 6-digit number');

// New field for cover amount (e.g., sum insured)
export const CoverAmountSchema = z
  .number()
  .min(10000, 'Cover amount must be at least ₹10,000');

// Updated form schema (with cover amount)
export const HealthInsuranceMemberFormSchema = z.object({
  member: PolicyMemberSchema,
  age: MemberAgeSchema,
  pincode: PincodeSchema,
  coverAmount: CoverAmountSchema,
});

export type HealthInsuranceMemberFormType = z.infer<
  typeof HealthInsuranceMemberFormSchema
>;
