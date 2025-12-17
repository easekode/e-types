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

// BSE SIP Registration Response Schema
export const sipRegisterResponseSchema = z.object({
  status: z.enum(['success', 'failure', 'error']),
  data: z.object({
    investor: z.object({
      ucc: z.string(),
    }),
    member: z.string(),
    exch_sxp_id: z.number().optional(),
    mem_sxp_ref_id: z.string().optional(),
  }),
  messages: z
    .array(
      z.object({
        msgid: z.number(),
        errcode: z.string(),
        field: z.string(),
        vals: z.array(z.unknown()).optional(),
      }),
    )
    .optional(),
});

// Type inference for BSE response
export type SipRegisterResponse = z.infer<typeof sipRegisterResponseSchema>;
