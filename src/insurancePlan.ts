import { z } from "zod";
import {OccupationTypeSchema } from "./occupationType";
import { IncomeRangeSchema } from "./annualIncome";
import { YesNoSchema } from "./yesNo";

// Common reusable schemas
const PhoneNumberSchema = z
  .string()
  .min(10, "Mobile number must be 10 digits")
  .max(10, "Mobile number must be 10 digits")
  .regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number");

const emailSchema = z
  .string()
  .email()
  .max(50, "Email too long");

// Main schema
export const PersonalDetailsSchema = z.object({
  occupationType: OccupationTypeSchema,
  annualIncome: IncomeRangeSchema,
  educationalQualification: z.string(),
  tobaccoUse: YesNoSchema,
  email: emailSchema,
  phoneNumber: PhoneNumberSchema,
  agreeToTerms: z.boolean(),
});

export type PersonalDetailsType = z.infer<typeof PersonalDetailsSchema>;
