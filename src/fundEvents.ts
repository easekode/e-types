import { z } from 'zod';
import { DateObjOrString } from './date';
import { eventListSchema } from './eventList';

export const fundEventsSchema = z.object({
  plan_id: z.string(),
  event_id: z.number(),
  as_on_date: DateObjOrString,
  notes: z.string().nullable().optional(),
  redemption_value: z.number().nullable().optional(),
  new_scheme: z.string().nullable().optional(),
  modified_ts: DateObjOrString,
  // related/nested entities
  event: eventListSchema.nullable().optional(),
});

export const NewFundEventsSchema = fundEventsSchema.omit({
  // Don't omit plan_id as it's required for creation
});

export const UpdateFundEventsSchema = fundEventsSchema
  .omit({ plan_id: true, event_id: true, as_on_date: true })
  .partial();

export type FundEvents = z.infer<typeof fundEventsSchema>;
export type NewFundEvents = z.infer<typeof NewFundEventsSchema>;
export type UpdateFundEvents = z.infer<typeof UpdateFundEventsSchema>;
