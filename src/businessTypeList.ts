import { z } from 'zod';

export enum BusinessTypeListEnum {
  PROPRIETORSHIP = 'PROPRIETORSHIP',
  PARTNERSHIP = 'PARTNERSHIP',
  COMPANY = 'COMPANY',
  LLP = 'LLP',
  OTHERS = 'OTHERS',
}

export const BusinessTypeListSchema = z.nativeEnum(BusinessTypeListEnum);
export type BusinessTypeList = z.infer<typeof BusinessTypeListSchema>;
