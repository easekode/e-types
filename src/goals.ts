import { z } from 'zod';

export const DurationTypeSchema = z.enum([
  'hours',
  'days',
  'weeks',
  'months',
  'day',
]);

export const GoalSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
  targetAmount: z.number().positive(),
  startingAmount: z.number().positive(),
  duration: z.number().positive(),
  durationType: DurationTypeSchema,
  location: z.string().nullable(),
  category: z.string(),
});

// Service item schema for wedding goals
export const ServiceItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
});

// Service section schema for wedding goals
export const ServiceSectionSchema = z.object({
  title: z.string(), // e.g., "SERVICES/PACKAGES", "ADDITIONAL SERVICES", "PERSONAL EVENTS"
  items: z.array(ServiceItemSchema),
});

// Select services schema (only for wedding goals)
export const SelectServicesSchema = z.object({
  sections: z.array(ServiceSectionSchema),
});

// Extended schema for goal details page
export const GoalDetailsSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
  targetAmount: z.number().positive(),
  startingAmount: z.number().positive(),
  duration: z.number().positive(),
  durationType: DurationTypeSchema,
  location: z.string().nullable(),
  category: z.string(),
  overview: z.string(),
  itinerary: z.array(
    z.object({
      day: z.number(),
      title: z.string(),
      description: z.string(),
    }),
  ),
  reviews: z.array(
    z.object({
      id: z.string(),
      userName: z.string(),
      rating: z.number().min(1).max(5),
      comment: z.string(),
      date: z.string(),
    }),
  ),
  views: z.number(),
  availableDates: z.array(
    z.object({
      date: z.string(), // ISO date string "YYYY-MM-DD"
      label: z.string(), // e.g., "Independence Day Special - Peak time"
      price: z.number().positive(),
      isAvailable: z.boolean(),
    }),
  ),
  selectServices: SelectServicesSchema.optional(), // Only present for wedding goals
});

export const GoalDetailsResponseSchema = z.object({
  success: z.boolean(),
  data: GoalDetailsSchema,
  message: z.string(),
});

export const GoalCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  goals: z.array(GoalSchema),
});

export const GoalsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    categories: z.array(GoalCategorySchema),
  }),
  message: z.string(),
});

// Infer types from schemas
export type DurationType = z.infer<typeof DurationTypeSchema>;
export type Goal = z.infer<typeof GoalSchema>;
export type GoalCategory = z.infer<typeof GoalCategorySchema>;
export type GoalsResponse = z.infer<typeof GoalsResponseSchema>;
export type GoalDetails = z.infer<typeof GoalDetailsSchema>;
export type GoalDetailsResponse = z.infer<typeof GoalDetailsResponseSchema>;
