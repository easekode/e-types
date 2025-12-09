import { z } from 'zod';

// Group member status
export const MemberStatusSchema = z.enum(['active', 'pending', 'declined']);

// Individual group member
export const GroupMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  status: MemberStatusSchema,
  invitedDate: z.string(), // ISO date string
  avatar: z.string().optional(), // URL to avatar image
});

// Group stats
export const GroupStatsSchema = z.object({
  activeMembers: z.number(),
  pendingInvites: z.number(),
});

// Group members list response
export const GroupMembersResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    stats: GroupStatsSchema,
    members: z.array(GroupMemberSchema),
  }),
  message: z.string(),
});

// Invite friend request
export const InviteFriendRequestSchema = z.object({
  email: z.string().email(),
  goalId: z.string(),
});

// Invite friend response
export const InviteFriendResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    memberId: z.string(),
    message: z.string(),
  }),
  message: z.string(),
});

// Remove member request
export const RemoveMemberRequestSchema = z.object({
  memberId: z.string(),
  goalId: z.string(),
});

// Remove member response
export const RemoveMemberResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

// Send reminder request
export const SendReminderRequestSchema = z.object({
  memberId: z.string(),
  goalId: z.string(),
});

// Send reminder response
export const SendReminderResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

// Infer types
export type MemberStatus = z.infer<typeof MemberStatusSchema>;
export type GroupMember = z.infer<typeof GroupMemberSchema>;
export type GroupStats = z.infer<typeof GroupStatsSchema>;
export type GroupMembersResponse = z.infer<typeof GroupMembersResponseSchema>;
export type InviteFriendRequest = z.infer<typeof InviteFriendRequestSchema>;
export type InviteFriendResponse = z.infer<typeof InviteFriendResponseSchema>;
export type RemoveMemberRequest = z.infer<typeof RemoveMemberRequestSchema>;
export type RemoveMemberResponse = z.infer<typeof RemoveMemberResponseSchema>;
export type SendReminderRequest = z.infer<typeof SendReminderRequestSchema>;
export type SendReminderResponse = z.infer<typeof SendReminderResponseSchema>;
