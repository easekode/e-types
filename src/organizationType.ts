import { z } from 'zod';

export enum GovOrgTypeEnum {
  GOVT = 'govt',
  NON_GOV = 'non-govt',
}

export const GovOrgTypeSchema = z.nativeEnum(GovOrgTypeEnum);
export type GovOrgType = z.infer<typeof GovOrgTypeSchema>;
