import { z } from 'zod';

// Goal status enum values
export const GOAL_STATUS = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  PAUSED: 'PAUSED',
  CANCELLED: 'CANCELLED',
} as const;

export const goalStatusSchema = z.enum([
  'DRAFT',
  'ACTIVE',
  'COMPLETED',
  'PAUSED',
  'CANCELLED',
]);

export const goalFiltersSchema = z.object({
  status: goalStatusSchema.optional(),
  userId: z.string().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});

export const updateGoalStatusSchema = z.object({
  goalId: z.string().cuid('Invalid goal ID'),
  status: goalStatusSchema,
});

export const goalAnalyticsSchema = z.object({
  total: z.number(),
  draft: z.number(),
  active: z.number(),
  completed: z.number(),
  totalTargetAmount: z.number(),
  totalInvestedAmount: z.number(),
});

// Shared Goal interface for frontend and backend
export const goalSchema = z.object({
  id: z.string(),
  userId: z.string(), // Required field from DB
  type: z.string(),
  name: z.string(),
  targetAmt: z
    .union([z.number(), z.string()])
    .transform(val => (typeof val === 'string' ? val : val.toString())), // Keep as string to match backend
  targetDate: z
    .union([z.string(), z.date()])
    .transform(val => (val instanceof Date ? val.toISOString() : val)),
  description: z.string(),
  investedAmt: z
    .union([z.number(), z.string(), z.null()])
    .nullable()
    .transform(val =>
      val === null ? null : typeof val === 'string' ? val : val.toString(),
    ),
  sipInstallment: z
    .union([z.number(), z.string(), z.null()])
    .nullable()
    .transform(val =>
      val === null ? null : typeof val === 'string' ? val : val.toString(),
    ),
  status: z.string(),
  createdAt: z
    .union([z.string(), z.date()])
    .transform(val => (val instanceof Date ? val.toISOString() : val)),
  updatedAt: z
    .union([z.string(), z.date()])
    .transform(val => (val instanceof Date ? val.toISOString() : val)),
  user: z
    .object({
      id: z.string(),
      name: z.string(),
      email: z.string().nullable(),
      mobile: z.string(),
    })
    .nullable(),
});

export type GoalFiltersInput = z.infer<typeof goalFiltersSchema>;
export type UpdateGoalStatusInput = z.infer<typeof updateGoalStatusSchema>;
export type GoalAnalyticsOutput = z.infer<typeof goalAnalyticsSchema>;
export type Goal = z.infer<typeof goalSchema>;
export type GoalStatus = z.infer<typeof goalStatusSchema>;
