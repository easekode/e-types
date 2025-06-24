import { z } from "zod";

export enum OccupationTypeEnum {
  SALARIED = "Salaried",
  SELF_EMPLOYED = "Self-Employed",
  BUSINESS = "Business",
  PROFESSIONAL = "Professional",
  HOMEMAKER = "Homemaker",
  RETIRED = "Retired",
  STUDENT = "Student",
  OTHER = "Other",
}

export const OccupationTypeSchema = z.nativeEnum(OccupationTypeEnum);
export type OccupationType = z.infer<typeof OccupationTypeSchema>;
