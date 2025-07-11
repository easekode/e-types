import { z } from 'zod';

export enum EmploymentTypeEnum {
  SELF_EMPLOYED_BUSINESS = 'SELF_EMPLOYED_BUSINESS',
  SELF_EMPLOYED_PROFESSIONAL = 'SELF_EMPLOYED_PROFESSIONAL',
}

export const EmploymentTypeSchema = z.nativeEnum(EmploymentTypeEnum);
export type EmploymentType = z.infer<typeof EmploymentTypeSchema>;
