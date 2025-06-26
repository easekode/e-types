import { z } from 'zod';

export const PersonalSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  email: z.string().email('Invalid email format'),
  address: z.string().min(1, 'Address is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  zip: z
    .string()
    .min(1, 'Zip code is required')
    .regex(/^\d+$/, 'Zip code must be numeric'),
});

export type PersonalSchemaType = z.infer<typeof PersonalSchema>;
