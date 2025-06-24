import { z } from 'zod';

export enum BusinessTypeEnum {
  SELF_EMPLOYED_BUSINESS = 'Self Employed – Business',
  SELF_EMPLOYED_PROFESSIONAL = 'Self Employed – Professional',
}
export const BusinessTypeSchema = z.nativeEnum(BusinessTypeEnum);
export type BusinessType = z.infer<typeof BusinessTypeSchema>;
