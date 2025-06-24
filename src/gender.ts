import { z } from "zod";
export enum Gender {
  Male = "Male",
  Female = "Female",
}

export const GenderSchema = z.nativeEnum(Gender);
export type GenderType = z.infer<typeof GenderSchema>;
