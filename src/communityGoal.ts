import { z } from 'zod';

/**
 * Community Goal Schemas and Types
 *
 * Zod schemas for validation and TypeScript types for the Community Goal feature.
 * Matches backend Prisma models and mock API data structure.
 */

// ============================================================================
// ENUMS - Must match Prisma schema exactly
// ============================================================================

export const CommunityGoalStatusEnum = z.enum([
  'DRAFT', // Goal being created, not visible to others
  'OPEN', // Goal published and accepting participants
  'IN_PROGRESS', // Goal started, participants confirmed
  'COMPLETED', // Goal trip/event completed
  'CANCELLED', // Goal cancelled
  'ARCHIVED', // Final state, read-only
]);

export const CommunityGoalDateSelectionTypeEnum = z.enum([
  'ANY_DATE', // User can pick any date
  'SPECIFIC_MONTHS', // Limited to certain months
  'PREDEFINED_DATES', // Only specific date ranges allowed
]);

export const ParticipationStatusEnum = z.enum([
  'PENDING', // User expressed interest, not confirmed
  'CONFIRMED', // User confirmed participation
  'PAID', // User completed payment
  'CANCELLED', // User cancelled participation
  'REJECTED', // Organizer rejected participation
]);

export const InvitationStatusEnum = z.enum([
  'PENDING',
  'ACCEPTED',
  'DECLINED',
  'EXPIRED',
]);

export const ContributionStatusEnum = z.enum([
  'PENDING',
  'COMPLETED',
  'FAILED',
  'REFUNDED',
]);

export const ReviewStatusEnum = z.enum([
  'PENDING',
  'APPROVED',
  'REJECTED',
  'FLAGGED', // Review flagged for review
]);

// UI-specific enum for group member status (used in UI for simpler member management)
export const GroupMemberStatusEnum = z.enum(['active', 'pending', 'declined']);

// ============================================================================
// CORE SCHEMAS
// ============================================================================

// Amount schema - matches mock data structure
export const communityGoalAmountSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  value: z.number().positive(),
  target: z.number().positive().optional(), // For backend tracking
  current: z.number().min(0).optional(), // For backend tracking
  currency: z.string().default('INR').optional(),
});

// Duration schema - matches mock data array of objects
export const communityGoalDurationItemSchema = z.object({
  title: z.string(),
  value: z.number().positive(),
  unit: z.string(), // 'days', 'nights', 'hours', etc.
});

export const communityGoalDurationSchema = z.array(
  communityGoalDurationItemSchema,
);

// ============================================================================
// RELATED ENTITY SCHEMAS
// ============================================================================

// Category schema
export const communityGoalCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

// SubCategory schema
export const communityGoalSubCategorySchema = z.object({
  id: z.string().uuid(),
  categoryId: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

// Itinerary schema - matches mock data structure
export const communityGoalItinerarySchema = z.object({
  id: z.string().uuid().optional(),
  communityGoalId: z.string().uuid().optional(),
  day: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string(),
  location: z.string().optional().nullable(),
  startTime: z.string().optional().nullable(),
  endTime: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  order: z.number().int().default(0).optional(),
  // CMS-like flexible content field for rich itinerary data
  // Format: {sections: [{type: "text|image|video|list", content: "..."}], metadata: {...}}
  content: z.record(z.any()).optional().nullable(), // Optional JSONB field
  createdAt: z.date().or(z.string()).optional(),
  updatedAt: z.date().or(z.string()).optional(),
});

// Available Date schema - matches backend Prisma schema
export const communityGoalAvailableDateSchema = z.object({
  id: z.string().uuid().optional(),
  communityGoalId: z.string().uuid().optional(),
  startDate: z.date().or(z.string()),
  endDate: z.date().or(z.string()),
  availableSlots: z.number().int().positive().optional().nullable(),
  bookedSlots: z.number().int().min(0).default(0).optional(),
  priceMultiplier: z.number().positive().optional().nullable(),
  notes: z.string().optional().nullable(),
  isActive: z.boolean().default(true).optional(),
  createdAt: z.date().or(z.string()).optional(),
  updatedAt: z.date().or(z.string()).optional(),
});

// Available Month schema - for month-based date selection
export const communityGoalAvailableMonthSchema = z.object({
  id: z.string().uuid().optional(),
  communityGoalId: z.string().uuid().optional(),
  year: z.number().int().min(2020).max(2100),
  month: z.number().int().min(1).max(12),
  isActive: z.boolean().default(true),
  createdAt: z.date().or(z.string()).optional(),
});

// Package/Pricing Tier schema - matches backend Prisma schema
export const communityGoalPackageSchema = z.object({
  id: z.string().uuid().optional(),
  communityGoalId: z.string().uuid().optional(),
  label: z.string().min(1), // "Standard", "Premium", "Deluxe"
  description: z.string().optional().nullable(),
  amount: z.number().positive(),
  isDefault: z.boolean().default(false),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  createdAt: z.date().or(z.string()).optional(),
  updatedAt: z.date().or(z.string()).optional(),
});

// Service schema - matches backend Prisma schema
export const communityGoalServiceSchema = z.object({
  id: z.string().uuid(),
  communityGoalId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  cost: z.number().optional().nullable(), // Null if included
  isRequired: z.boolean().default(false).optional(),
  icon: z.string().optional().nullable(),
  order: z.number().int().default(0).optional(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

// Review schema - matches backend Prisma schema
export const communityGoalReviewSchema = z.object({
  id: z.string(),
  communityGoalId: z.string().uuid(),
  participationId: z.string().uuid(),
  userId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  title: z.string().optional().nullable(),
  comment: z.string().optional().nullable(),
  images: z.array(z.string()).default([]).optional(),
  videos: z.array(z.string()).default([]).optional(),
  status: ReviewStatusEnum.default('PENDING').optional(),
  moderatedBy: z.string().uuid().optional().nullable(),
  moderatedAt: z.date().or(z.string()).optional().nullable(),
  moderationNotes: z.string().optional().nullable(),
  helpfulCount: z.number().int().min(0).default(0).optional(),
  reportCount: z.number().int().min(0).default(0).optional(),
  createdAt: z.date().or(z.string()).optional(),
  updatedAt: z.date().or(z.string()).optional(),
});

// Participation schema - matches backend Prisma schema
export const communityGoalParticipationSchema = z.object({
  id: z.string().uuid(),
  communityGoalId: z.string().uuid(),
  userId: z.string().uuid(),
  status: ParticipationStatusEnum,
  selectedDateId: z.string().uuid().optional().nullable(),
  groupId: z.string().uuid().optional().nullable(),
  totalCommitted: z.number().min(0).default(0),
  totalPaid: z.number().min(0).default(0),
  totalRefunded: z.number().min(0).default(0),
  joinedAt: z.date().or(z.string()),
  confirmedAt: z.date().or(z.string()).optional().nullable(),
  withdrawnAt: z.date().or(z.string()).optional().nullable(),
  completedAt: z.date().or(z.string()).optional().nullable(),
  preferences: z.record(z.any()).optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

// Group schema - matches backend Prisma schema
export const communityGoalGroupSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  creatorId: z.string().uuid(),
  communityGoalId: z.string().uuid().optional().nullable(),
  maxMembers: z.number().int().positive().optional().nullable(),
  isPrivate: z.boolean().default(false),
  inviteCode: z.string().optional().nullable(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

// Invitation schema - matches backend Prisma schema
export const communityGoalInvitationSchema = z.object({
  id: z.string().uuid(),
  groupId: z.string().uuid(),
  inviterId: z.string().uuid(),
  inviteeId: z.string().uuid().optional().nullable(),
  inviteeEmail: z.string().email().optional().nullable(),
  inviteePhone: z.string().optional().nullable(),
  status: InvitationStatusEnum,
  message: z.string().optional().nullable(),
  expiresAt: z.date().or(z.string()).optional().nullable(),
  sentAt: z.date().or(z.string()),
  respondedAt: z.date().or(z.string()).optional().nullable(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

// Contribution schema - matches backend Prisma schema
export const communityGoalContributionSchema = z.object({
  id: z.string().uuid(),
  participationId: z.string().uuid(),
  userId: z.string().uuid(),
  amount: z.number().positive(),
  status: ContributionStatusEnum,
  paymentMethod: z.string().optional().nullable(),
  transactionId: z.string().optional().nullable(),
  paymentGatewayRef: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  metadata: z.record(z.any()).optional().nullable(),
  paidAt: z.date().or(z.string()).optional().nullable(),
  refundedAt: z.date().or(z.string()).optional().nullable(),
  refundAmount: z.number().optional().nullable(),
  refundReason: z.string().optional().nullable(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

// ============================================================================
// UI-SPECIFIC SCHEMAS (for frontend workflows)
// ============================================================================

// Group member schema - individual member within a group (UI view)
export const groupMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  status: GroupMemberStatusEnum,
  invitedDate: z.string(), // ISO date string
  avatar: z.string().optional(), // URL to avatar image
});

// Group stats schema - aggregate stats for a group
export const groupStatsSchema = z.object({
  activeMembers: z.number().int().min(0),
  pendingInvites: z.number().int().min(0),
});

// Service item schema - for wedding/event goals with service selection
export const serviceItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
});

// Service section schema - grouped services (e.g., "SERVICES/PACKAGES", "ADDITIONAL SERVICES")
export const serviceSectionSchema = z.object({
  title: z.string(),
  items: z.array(serviceItemSchema),
});

// Select services schema - complete service selection structure for wedding goals
export const selectServicesSchema = z.object({
  sections: z.array(serviceSectionSchema),
});

// ============================================================================
// MAIN COMMUNITY GOAL SCHEMA
// ============================================================================

export const communityGoalSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1), // Backend uses 'name', not 'title'
  slug: z.string().min(1), // SEO-friendly URL
  description: z.string(),

  // Category and subcategory
  categoryId: z.string().uuid(),
  categoryName: z.string().optional(), // Denormalized for API responses
  category: z.string().optional(), // Alias for categoryId in some responses

  // Subcategory (optional second-level classification)
  subCategoryId: z.string().uuid().optional().nullable(),
  subCategoryName: z.string().optional(), // Denormalized for API responses

  // Marketing copy
  subtitleShort: z.string().optional().nullable(),
  subtitleLong: z.string().optional().nullable(),

  // Visual assets
  bannerImageUrl: z.string().optional().nullable(),
  bannerThumbnailUrl: z.string().optional().nullable(),
  bannerVideoUrl: z.string().optional().nullable(),
  galleryImages: z.array(z.string()).default([]).optional(),

  // Flexible duration structure (JSON array of duration options)
  // Format: [{"title": "Short Term", "value": 6, "unit": "months"}, ...]
  durationDetails: z.record(z.any()), // Backend stores as Json

  // Location and media
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),

  // Date selection configuration
  dateSelectionType:
    CommunityGoalDateSelectionTypeEnum.default('PREDEFINED_DATES').optional(),

  // Goal metadata
  maxParticipants: z.number().int().positive().optional().nullable(),
  minParticipants: z.number().int().positive().default(1).optional(),
  minAge: z.number().int().positive().optional().nullable(),
  maxAge: z.number().int().positive().optional().nullable(),

  // Timeline
  startDate: z.date().or(z.string()).optional().nullable(),
  endDate: z.date().or(z.string()).optional().nullable(),
  registrationDeadline: z.date().or(z.string()).optional().nullable(),

  // Status and visibility
  status: CommunityGoalStatusEnum.default('DRAFT').optional(),
  isFeatured: z.boolean().default(false).optional(),

  // SEO and discovery
  tags: z.array(z.string()).default([]).optional(),

  // Admin-only fields (all optional for backward compatibility)
  internalNotes: z.string().optional().nullable(),
  approvedBy: z.string().uuid().optional().nullable(),
  approvedAt: z.date().or(z.string()).optional().nullable(),
  rejectionReason: z.string().optional().nullable(),
  createdBy: z.string().uuid().optional().nullable(),
  updatedBy: z.string().uuid().optional().nullable(),

  // Organizer relation
  organizerId: z.string().uuid().optional().nullable(),

  // Timestamps
  createdAt: z.date().or(z.string()).optional(),
  updatedAt: z.date().or(z.string()).optional(),
  publishedAt: z.date().or(z.string()).optional().nullable(),
  completedAt: z.date().or(z.string()).optional().nullable(),
});

// Schema with relations - for detailed API responses
export const communityGoalWithRelationsSchema = communityGoalSchema.extend({
  category: communityGoalCategorySchema.optional(),
  subCategory: communityGoalSubCategorySchema.optional().nullable(),
  itinerary: z.array(communityGoalItinerarySchema).default([]).optional(),
  availableDates: z
    .array(communityGoalAvailableDateSchema)
    .default([])
    .optional(),
  availableMonths: z
    .array(communityGoalAvailableMonthSchema)
    .default([])
    .optional(),
  packages: z.array(communityGoalPackageSchema).default([]).optional(),
  services: z.array(communityGoalServiceSchema).default([]).optional(),
  participations: z
    .array(communityGoalParticipationSchema)
    .default([])
    .optional(),
  groups: z.array(communityGoalGroupSchema).default([]).optional(),
  reviews: z.array(communityGoalReviewSchema).default([]).optional(),
  selectServices: selectServicesSchema.optional(), // For wedding/event goals with service selection
});

// ============================================================================
// API RESPONSE SCHEMAS
// ============================================================================

export const communityGoalListResponseSchema = z.object({
  goals: z.array(communityGoalSchema),
  pagination: z
    .object({
      page: z.number().int().positive(),
      limit: z.number().int().positive(),
      total: z.number().int().min(0),
      totalPages: z.number().int().min(0),
    })
    .optional(),
});

export const communityGoalDetailResponseSchema =
  communityGoalWithRelationsSchema;

// Group members list response - for UI group management
export const groupMembersResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    stats: groupStatsSchema,
    members: z.array(groupMemberSchema),
  }),
  message: z.string(),
});

// Invite friend response
export const inviteFriendResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    memberId: z.string(),
    message: z.string(),
  }),
  message: z.string(),
});

// Remove member response
export const removeMemberResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

// Send reminder response
export const sendReminderResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

// ============================================================================
// INPUT SCHEMAS (for create/update operations)
// ============================================================================

export const createCommunityGoalInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  categoryId: z.string().uuid('Valid category ID is required'),
  subCategoryId: z.string().uuid().optional().nullable(),
  durationDetails: z.record(z.any()),
  startDate: z.date().or(z.string()).optional(),
  endDate: z.date().or(z.string()).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  bannerImageUrl: z.string().url().optional(),
  galleryImages: z.array(z.string().url()).default([]),
  maxParticipants: z.number().int().positive().optional(),
  minParticipants: z.number().int().positive().optional(),
  tags: z.array(z.string()).default([]),
});

export const updateCommunityGoalInputSchema =
  createCommunityGoalInputSchema.partial();

export const updateCommunityGoalStatusInputSchema = z.object({
  status: CommunityGoalStatusEnum,
  rejectionReason: z.string().optional(),
  internalNotes: z.string().optional(),
  adminTags: z.array(z.string()).optional(),
});

// Filter and query schemas
export const communityGoalFilterSchema = z.object({
  categoryId: z.string().uuid().optional(),
  status: CommunityGoalStatusEnum.optional(),
  isFeatured: z.boolean().optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
  city: z.string().optional(),
  tags: z.array(z.string()).optional(),
  createdBy: z.string().uuid().optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(20),
  sortBy: z.enum(['createdAt', 'updatedAt', 'name']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Participation input schemas
export const createParticipationInputSchema = z.object({
  communityGoalId: z.string().uuid(),
  groupId: z.string().uuid().optional(),
});

export const updateParticipationInputSchema = z.object({
  status: ParticipationStatusEnum,
});

// Contribution input schema
export const createContributionInputSchema = z.object({
  participationId: z.string().uuid(),
  amount: z.number().positive('Amount must be positive'),
  paymentMethod: z.string().optional(),
  notes: z.string().optional(),
});

// Review input schemas
export const createReviewInputSchema = z.object({
  communityGoalId: z.string().uuid(),
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
  comment: z.string().optional(),
});

export const updateReviewInputSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  comment: z.string().optional(),
});

// Group input schemas
export const createGroupInputSchema = z.object({
  communityGoalId: z.string().uuid(),
  name: z.string().min(1, 'Group name is required'),
  description: z.string().optional(),
  maxMembers: z.number().int().positive().optional(),
  isPublic: z.boolean().default(true),
});

export const updateGroupInputSchema = createGroupInputSchema
  .partial()
  .omit({ communityGoalId: true });

// Invitation input schemas
export const createInvitationInputSchema = z.object({
  communityGoalId: z.string().uuid(),
  groupId: z.string().uuid().optional(),
  inviteeId: z.string().uuid(),
  expiresAt: z.date().or(z.string()).optional(),
});

export const updateInvitationInputSchema = z.object({
  status: InvitationStatusEnum,
});

// UI-specific input schemas for group management
export const inviteFriendInputSchema = z.object({
  email: z.string().email('Valid email is required'),
  goalId: z.string(),
});

export const removeMemberInputSchema = z.object({
  memberId: z.string(),
  goalId: z.string(),
});

export const sendReminderInputSchema = z.object({
  memberId: z.string(),
  goalId: z.string(),
});

// ============================================================================
// TYPESCRIPT TYPES (inferred from schemas)
// ============================================================================

// Enum types
export type CommunityGoalStatus = z.infer<typeof CommunityGoalStatusEnum>;
export type CommunityGoalDateSelectionType = z.infer<
  typeof CommunityGoalDateSelectionTypeEnum
>;
export type ParticipationStatus = z.infer<typeof ParticipationStatusEnum>;
export type InvitationStatus = z.infer<typeof InvitationStatusEnum>;
export type ContributionStatus = z.infer<typeof ContributionStatusEnum>;
export type ReviewStatus = z.infer<typeof ReviewStatusEnum>;
export type GroupMemberStatus = z.infer<typeof GroupMemberStatusEnum>;

// Core entity types
export type CommunityGoalAmount = z.infer<typeof communityGoalAmountSchema>;
export type CommunityGoalDurationItem = z.infer<
  typeof communityGoalDurationItemSchema
>;
export type CommunityGoalDuration = z.infer<typeof communityGoalDurationSchema>;
export type CommunityGoal = z.infer<typeof communityGoalSchema>;
export type CommunityGoalWithRelations = z.infer<
  typeof communityGoalWithRelationsSchema
>;

// Related entity types
export type CommunityGoalCategory = z.infer<typeof communityGoalCategorySchema>;
export type CommunityGoalSubCategory = z.infer<
  typeof communityGoalSubCategorySchema
>;
export type CommunityGoalItinerary = z.infer<
  typeof communityGoalItinerarySchema
>;
export type CommunityGoalAvailableDate = z.infer<
  typeof communityGoalAvailableDateSchema
>;
export type CommunityGoalAvailableMonth = z.infer<
  typeof communityGoalAvailableMonthSchema
>;
export type CommunityGoalPackage = z.infer<typeof communityGoalPackageSchema>;
export type CommunityGoalService = z.infer<typeof communityGoalServiceSchema>;
export type CommunityGoalReview = z.infer<typeof communityGoalReviewSchema>;
export type CommunityGoalParticipation = z.infer<
  typeof communityGoalParticipationSchema
>;
export type CommunityGoalGroup = z.infer<typeof communityGoalGroupSchema>;
export type CommunityGoalInvitation = z.infer<
  typeof communityGoalInvitationSchema
>;
export type CommunityGoalContribution = z.infer<
  typeof communityGoalContributionSchema
>;

// UI-specific types
export type CommunityGroupMember = z.infer<typeof groupMemberSchema>;
export type CommunityGroupStats = z.infer<typeof groupStatsSchema>;
export type ServiceItem = z.infer<typeof serviceItemSchema>;
export type ServiceSection = z.infer<typeof serviceSectionSchema>;
export type SelectServices = z.infer<typeof selectServicesSchema>;

// API Response types
export type CommunityGoalListResponse = z.infer<
  typeof communityGoalListResponseSchema
>;
export type CommunityGoalDetailResponse = z.infer<
  typeof communityGoalDetailResponseSchema
>;
export type CommunityGroupMembersResponse = z.infer<
  typeof groupMembersResponseSchema
>;
export type CommunityInviteFriendResponse = z.infer<
  typeof inviteFriendResponseSchema
>;
export type CommunityRemoveMemberResponse = z.infer<
  typeof removeMemberResponseSchema
>;
export type CommunitySendReminderResponse = z.infer<
  typeof sendReminderResponseSchema
>;

// Input types for API operations
export type CreateCommunityGoalInput = z.infer<
  typeof createCommunityGoalInputSchema
>;
export type UpdateCommunityGoalInput = z.infer<
  typeof updateCommunityGoalInputSchema
>;
export type UpdateCommunityGoalStatusInput = z.infer<
  typeof updateCommunityGoalStatusInputSchema
>;
export type CommunityGoalFilter = z.infer<typeof communityGoalFilterSchema>;

// Participation input types
export type CreateParticipationInput = z.infer<
  typeof createParticipationInputSchema
>;
export type UpdateParticipationInput = z.infer<
  typeof updateParticipationInputSchema
>;

// Contribution input types
export type CreateContributionInput = z.infer<
  typeof createContributionInputSchema
>;

// Review input types
export type CreateReviewInput = z.infer<typeof createReviewInputSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewInputSchema>;

// Group input types
export type CreateGroupInput = z.infer<typeof createGroupInputSchema>;
export type UpdateGroupInput = z.infer<typeof updateGroupInputSchema>;

// Invitation input types
export type CreateInvitationInput = z.infer<typeof createInvitationInputSchema>;
export type UpdateInvitationInput = z.infer<typeof updateInvitationInputSchema>;

// UI-specific input types
export type InviteFriendInput = z.infer<typeof inviteFriendInputSchema>;
export type RemoveMemberInput = z.infer<typeof removeMemberInputSchema>;
export type SendReminderInput = z.infer<typeof sendReminderInputSchema>;

// ============================================================================
// HELPER TYPES (for common use cases)
// ============================================================================

/**
 * Community Goal card data - minimal data for displaying in cards/lists
 */
export type CommunityGoalCard = Pick<
  CommunityGoal,
  | 'id'
  | 'name'
  | 'description'
  | 'categoryName'
  | 'durationDetails'
  | 'city'
  | 'bannerImageUrl'
  | 'maxParticipants'
  | 'isFeatured'
  | 'tags'
  | 'createdAt'
>;

/**
 * Community Goal with computed fields - includes calculated fields for UI display
 */
export type CommunityGoalWithComputedFields = CommunityGoal & {
  progressPercentage: number;
  daysRemaining: number | null;
  isFullyFunded: boolean;
  canJoin: boolean;
  participantsRemaining: number | null;
};

/**
 * Community Goal summary - for admin dashboards and analytics
 */
export type CommunityGoalSummary = {
  id: string;
  name: string;
  status: CommunityGoalStatus;
  participantsCount: number;
  createdAt: Date | string;
  createdBy: string | null;
};

/**
 * Participation with user details
 */
export type ParticipationWithUser = CommunityGoalParticipation & {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
  };
};

/**
 * Review with user details
 */
export type ReviewWithUser = CommunityGoalReview & {
  user: {
    id: string;
    name: string;
    avatar?: string | null;
  };
};

/**
 * Group with members
 */
export type GroupWithMembers = CommunityGoalGroup & {
  members: ParticipationWithUser[];
  memberCount: number;
};

/**
 * Contribution with details
 */
export type ContributionWithDetails = CommunityGoalContribution & {
  participation: {
    id: string;
    user: {
      id: string;
      name: string;
      avatar?: string | null;
    };
  };
};

/**
 * Full Community Goal details - complete data structure for detail pages
 */
export type CommunityGoalFullDetails = CommunityGoalWithRelations & {
  creator: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
  };
  participationsWithUsers?: ParticipationWithUser[];
  reviewsWithUsers?: ReviewWithUser[];
  groupsWithMembers?: GroupWithMembers[];
  contributionsWithDetails?: ContributionWithDetails[];
};

// ============================================================================
// CONSTANTS (for UI - dropdowns, labels, colors)
// ============================================================================

export const COMMUNITY_GOAL_STATUSES: CommunityGoalStatus[] = [
  'DRAFT',
  'OPEN',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'ARCHIVED',
];

export const PARTICIPATION_STATUSES: ParticipationStatus[] = [
  'PENDING',
  'CONFIRMED',
  'PAID',
  'CANCELLED',
  'REJECTED',
];

export const INVITATION_STATUSES: InvitationStatus[] = [
  'PENDING',
  'ACCEPTED',
  'DECLINED',
  'EXPIRED',
];

export const CONTRIBUTION_STATUSES: ContributionStatus[] = [
  'PENDING',
  'COMPLETED',
  'FAILED',
  'REFUNDED',
];

export const REVIEW_STATUSES: ReviewStatus[] = [
  'PENDING',
  'APPROVED',
  'REJECTED',
];

export const GROUP_MEMBER_STATUSES: GroupMemberStatus[] = [
  'active',
  'pending',
  'declined',
];

// Status labels for UI display
export const COMMUNITY_GOAL_STATUS_LABELS: Record<CommunityGoalStatus, string> =
  {
    DRAFT: 'Draft',
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    ARCHIVED: 'Archived',
  };

export const GROUP_MEMBER_STATUS_LABELS: Record<GroupMemberStatus, string> = {
  active: 'Active',
  pending: 'Pending',
  declined: 'Declined',
};

// Status colors for UI styling
export const COMMUNITY_GOAL_STATUS_COLORS: Record<CommunityGoalStatus, string> =
  {
    DRAFT: 'gray',
    OPEN: 'blue',
    IN_PROGRESS: 'yellow',
    COMPLETED: 'green',
    CANCELLED: 'red',
    ARCHIVED: 'gray',
  };

export const GROUP_MEMBER_STATUS_COLORS: Record<GroupMemberStatus, string> = {
  active: 'green',
  pending: 'yellow',
  declined: 'red',
};
