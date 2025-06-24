import { z } from "zod";
import { OrganisationTypeSchema } from "./organisationType";

// Main schema
export const PersonalLoanEligibilitySchema = z.object({
  organisationType: OrganisationTypeSchema,
  department: z.string().min(1, "Department is required"),
  organisationName: z.string().min(1, "Organisation name is required"),
  salary: z
    .string()
    .min(1, "Salary is required")
    .regex(/^\d+$/, "Salary must be a number"), // assuming a reasonable lower limit
  designation: z.string().min(1, "Designation is required"),
  existingEmi: z
    .string()
    .min(1, "Existing EMI is required")
    .regex(/^\d*$/, "EMI must be a number")
    .optional(),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be a 6-digit number"),
});

export type PersonalLoanEligibilityType = z.infer<
  typeof PersonalLoanEligibilitySchema
>;
