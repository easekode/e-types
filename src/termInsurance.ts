import { z } from 'zod';
import { GenderSchema } from './gender';

export const TermInsuranceSchema = z.object({
  gender: GenderSchema,
  name: z.string().min(1, 'Name required'),
  dob: z
    .string()
    .regex(/^\d{2}-\d{2}-\d{4}$/, 'must be in DD-MM-YYYY format')
    .refine(
      dob => {
        const [day, month, year] = dob.split('-').map(Number);
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      },
      { message: 'You must be at least 18 years old' },
    ),
  whatsappUpdates: z.boolean().optional(),
});

export type TermInsuranceType = z.infer<typeof TermInsuranceSchema>;
