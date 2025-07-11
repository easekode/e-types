import { z } from 'zod';

export enum IndustryTypeEnum {
  MANUFACTURING = 'MANUFACTURING',
  RETAIL = 'RETAIL',
  SERVICES = 'SERVICES',
  TRADING = 'TRADING',
  HEALTHCARE = 'HEALTHCARE',
  EDUCATION = 'EDUCATION',
  OTHERS = 'OTHERS',
}

export const IndustryTypeSchema = z.nativeEnum(IndustryTypeEnum);
export type IndustryType = z.infer<typeof IndustryTypeSchema>;
