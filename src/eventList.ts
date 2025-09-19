import { z } from 'zod';
import { DateObjOrString } from './date';

export const eventListSchema = z.object({
  event_id: z.number(),
  event_type: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  modified_ts: DateObjOrString,
  // related/nested entities - circular import handled at runtime
  fundEvents: z.array(z.any()).nullable().optional(),
});

export const NewEventListSchema = eventListSchema.omit({
  // Don't omit event_id as it's required for creation
});

export const UpdateEventListSchema = eventListSchema
  .omit({ event_id: true })
  .partial();

export type EventList = z.infer<typeof eventListSchema>;
export type NewEventList = z.infer<typeof NewEventListSchema>;
export type UpdateEventList = z.infer<typeof UpdateEventListSchema>;
