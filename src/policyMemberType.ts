import { z } from "zod";

// Enum for policy members
export enum PolicyMemberEnum {
  MYSELF = "Myself",
  SPOUSE = "Spouse",
  CHILD = "Child",
  PARENT = "Parent",
  PARENT_IN_LAW = "Parent-in-law",
}
export const PolicyMemberSchema = z.nativeEnum(PolicyMemberEnum);
export type PolicyMemberType = z.infer<typeof PolicyMemberSchema>;
