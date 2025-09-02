import { z } from 'zod';
import { DateObjOrString } from './date';

export const sicSectorsSchema = z.object({
  sector_code: z.string(),
  sector_name: z.string(),
  sector_description: z.string(),
  modified_ts: DateObjOrString,
});

export const NewSicSectorsSchema = sicSectorsSchema.omit({
  sector_code: true,
});

export const UpdateSicSectorsSchema = sicSectorsSchema
  .omit({ sector_code: true })
  .partial();

export type SicSectors = z.infer<typeof sicSectorsSchema>;
export type NewSicSectors = z.infer<typeof NewSicSectorsSchema>;
export type UpdateSicSectors = z.infer<typeof UpdateSicSectorsSchema>;
