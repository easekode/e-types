/**
 * BSE Authentication Types and Schemas
 *
 * This file contains Zod schemas and TypeScript types for BSE login/authentication.
 * Uses Zod for runtime validation and type inference.
 */

import { z } from 'zod';

/**
 * BSE Login Request Schema
 * Used when calling the BSE GetPassword (login) API
 */
export const BseLoginRequestSchema = z.object({
  data: z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
  }),
});

/**
 * BSE Login Success Response Schema
 * Response from BSE when login is successful
 */
export const BseLoginSuccessResponseSchema = z.object({
  status: z.literal('success'),
  data: z.object({
    access_token: z.string(),
  }),
});

/**
 * BSE Login Error Response Schema
 * Response from BSE when login fails
 */
export const BseLoginErrorResponseSchema = z.object({
  status: z.literal('error'),
  data: z.null(),
  messages: z
    .array(
      z.object({
        msgid: z.string().optional(),
        msgcode: z.string().optional(),
        errcode: z.string().optional(),
      }),
    )
    .optional(),
});

/**
 * BSE Token Schema (matches Prisma MFSessionPassword model)
 * Represents the stored token in the database
 */
export const BseTokenSchema = z.object({
  id: z.string(),
  serviceName: z.enum(['BSE']),
  token: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Export inferred TypeScript types
export type BseLoginRequest = z.infer<typeof BseLoginRequestSchema>;
export type BseLoginSuccessResponse = z.infer<
  typeof BseLoginSuccessResponseSchema
>;
export type BseLoginErrorResponse = z.infer<typeof BseLoginErrorResponseSchema>;
export type BseToken = z.infer<typeof BseTokenSchema>;
