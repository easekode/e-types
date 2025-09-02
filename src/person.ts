import { z } from 'zod';
import { DateObjOrString } from './date';

export const personSchema = z.object({
  person_id: z.string(),
  person_name: z.string(),
  education: z.string().nullable().optional(),
  experience: z.string().nullable().optional(),
  modified_ts: DateObjOrString,
});

export const NewPersonSchema = personSchema.omit({
  person_id: true,
});

export const UpdatePersonSchema = personSchema
  .omit({ person_id: true })
  .partial();

export type Person = z.infer<typeof personSchema>;
export type NewPerson = z.infer<typeof NewPersonSchema>;
export type UpdatePerson = z.infer<typeof UpdatePersonSchema>;
