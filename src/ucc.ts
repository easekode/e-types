import { z } from 'zod';

/**
 * UCC Details Response Schema
 * Returns user's UCC registration details in a flat structure
 */
export const UccDetailsResponseSchema = z.object({
  uccCode: z.string().nullable(),
  name: z.string(),
  dob: z.string().nullable(),
  mobile: z.string(),
  email: z.string().nullable(),
  pan: z.string().nullable(), // Masked PAN (e.g., "****1234F")
  occCode: z.string().nullable(), // Occupation code
  gender: z.string().nullable(),
  maritalStatus: z.string().nullable(),
  incomeRange: z.string().nullable(),
  fatherName: z.string().nullable(),
});

/**
 * Type for UCC Details Response
 */
export type UccDetailsResponse = z.infer<typeof UccDetailsResponseSchema>;
