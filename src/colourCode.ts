import { z } from 'zod';
import { DateObjOrString } from './date';

export const colourCodeSchema = z.object({
  colour_id: z.string(),
  colour_name: z.string(),
  risk: z.string(),
  modified_ts: DateObjOrString,
});

export const NewColourCodeSchema = colourCodeSchema.omit({
  colour_id: true,
});

export const UpdateColourCodeSchema = colourCodeSchema
  .omit({ colour_id: true })
  .partial();

export type ColourCode = z.infer<typeof colourCodeSchema>;
export type NewColourCode = z.infer<typeof NewColourCodeSchema>;
export type UpdateColourCode = z.infer<typeof UpdateColourCodeSchema>;
