import { z } from "zod";

export enum YesNoEnum {
  YES = "YES",
  NO = "NO",
}

export const YesNoSchema = z.nativeEnum(YesNoEnum);
export type YesNoType = z.infer<typeof YesNoSchema>;
