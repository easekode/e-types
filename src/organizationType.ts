import { z } from 'zod';

export enum GovOrgTypeEnum {
  GOVT = 'GOVT',
  NON_GOV = 'NON_GOV',
}

export const GovOrgTypeSchema = z.nativeEnum(GovOrgTypeEnum);
export type GovOrgType = z.infer<typeof GovOrgTypeSchema>;
