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

// Type inference from the schema
export type sxpDraftFormData = z.infer<typeof sxpDraftFormDataSchema>;
export type sxpConfirmFormData = z.infer<typeof sxpConfirmFormDataSchema>;
export * from './sxpRequest';