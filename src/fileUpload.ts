import { z } from 'zod';

export const FileTypeSchema = z.object({
  fileType: z.string().optional(),
  name: z.string(),
  url: z.string().optional(),
  alt: z.string().optional(),
});

export type FileType = z.infer<typeof FileTypeSchema>;
