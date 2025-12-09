import { z } from 'zod';
import { UCCStatus } from './bse/enums/v2Enums';

/**
 * Communication Address Schema
 */
export const CommAddressSchema = z.object({
  address_line_1: z.string(),
  city: z.string(),
  state: z.string(),
  postalcode: z.string(),
  country: z.string(), // CountryCode enum value (e.g., 'IND')
});

/**
 * UCC Details Response Schema
 * Returns user's UCC registration details in a flat structure
 */
export const UccDetailsSchema = z.object({
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
    comm_addr: CommAddressSchema.nullable(),
    uccStatus: z.nativeEnum(UCCStatus).nullable(),
});

export const UccDetailsResponseSchema = z.object({
  status: z.string(),
  missingFields: z.array(z.string()).optional(),
  data: UccDetailsSchema,
})

/**
 * Type for Communication Address
 */
export type CommAddress = z.infer<typeof CommAddressSchema>;

/**
 * Type for UCC Details Response
 */
export type UccDetails = z.infer<typeof UccDetailsSchema>;
export type UccDetailsResponse = z.infer<typeof UccDetailsResponseSchema>;

