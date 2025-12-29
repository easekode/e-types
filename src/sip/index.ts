import { z } from 'zod';
import { DateObjOrString } from '../date';

// Main SIP registration schema
export const sxpDraftFormDataSchema = z.object({
  investmentGoalId: z.string(),
  planId: z.string(),
  amount: z.number().positive('Amount must be greater than 0'),
  startDate: DateObjOrString,
});

export const sxpConfirmFormDataSchema = z.object({
  draftSipId: z.string(),
  mandateId: z.string(),
});

export const updateDraftSipSchema = z.object({
  sipId: z.string(),
  investmentGoalId: z.string(),
  amount: z.number().positive('Amount must be greater than 0').optional(),
  startDate: DateObjOrString.optional(),
  planId: z.string().optional(),
});

// Type inference from the schema
export type sxpDraftFormData = z.infer<typeof sxpDraftFormDataSchema>;
export type sxpConfirmFormData = z.infer<typeof sxpConfirmFormDataSchema>;
export type UpdateDraftSip = z.infer<typeof updateDraftSipSchema>;
export * from './sxpRequest';