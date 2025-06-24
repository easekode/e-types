import { z } from "zod";

export enum OrganisationTypeEnum {
  GOVT = "Govt",
  NON_GOVT = "Non Govt"
}
export const OrganisationTypeSchema = z.nativeEnum(OrganisationTypeEnum);
export type OrganisationType = z.infer<typeof OrganisationTypeSchema>;
