import { z } from 'zod';

// SMS Category enum for different types of SMS
export enum SmsCategory {
  REGISTRATION_OTP = 'registrationOtp',
  AUTH_OTP = 'authOtp',
  GOAL_INVITE = 'goalInvite'
}

export const sendSmsSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid mobile number'),
  message: z.string().min(1, 'Message is required'),
});

export type SendSmsInputType = z.infer<typeof sendSmsSchema>;
