import { z } from 'zod';

export enum CarouselSection {
  HOME = 'HOME',
}

export const CarouselItemSchema = z.object({
  id: z.string().uuid(),
  carouselId: z.string().uuid(),
  imageUrl: z.string().url(),
  ctaLabel: z.string().optional().nullable(),
  ctaUrl: z.string().url().optional().nullable(),
  order: z.number(),
  extraElements: z.any().optional().nullable(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CarouselItemCreateSchema = CarouselItemSchema.omit({
  id: true,
  carouselId: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  isActive: z.boolean().optional(),
});

export const CarouselItemUpdateSchema = CarouselItemCreateSchema.partial();

export const CarouselSchema = z.object({
  id: z.string().uuid(),
  section: z.nativeEnum(CarouselSection),
  title: z.string(),
  description: z.string().optional().nullable(),
  isActive: z.boolean(),
  items: z.array(CarouselItemSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CarouselCreateSchema = CarouselSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  items: true,
}).extend({
  isActive: z.boolean().optional(),
  items: z.array(CarouselItemCreateSchema).optional(),
});

export const CarouselUpdateSchema = CarouselCreateSchema.partial();

export type Carousel = z.infer<typeof CarouselSchema>;
export type CarouselItem = z.infer<typeof CarouselItemSchema>;
export type CarouselCreate = z.infer<typeof CarouselCreateSchema>;
export type CarouselUpdate = z.infer<typeof CarouselUpdateSchema>;
export type CarouselItemCreate = z.infer<typeof CarouselItemCreateSchema>;
export type CarouselItemUpdate = z.infer<typeof CarouselItemUpdateSchema>;
