import { z } from 'zod';
import {
  WebhookEventType,
  UccWebhookEvent,
  OrderWebhookEvent,
  SxpWebhookEvent,
  MandateWebhookEnachEvent,
  MandateWebhookUpiEvent,
} from '../enums/WebhookEvent';
import { PaymentGatewayEvent } from '../enums/v2Enums';

// ===============================
// Common Base Structures
// ===============================

/**
 * Member (Broker) Information
 */
const MemberSchema = z.object({
  member_id: z.string().min(1, 'Member ID is required'),
  subbr_code: z.string().optional().default(''),
  subbr_arn: z.string().optional().default(''),
  euin: z.string().optional().default(''),
  euin_flag: z.string().optional().default(''),
  partner_id: z.string().optional().default(''),
});

/**
 * Investor (Client) Information
 */
const InvestorSchema = z.object({
  client_code: z.string().min(1, 'Client code (UCC) is required'),
});

/**
 * Base Action Schema - Common fields for all webhook events
 * All events include timestamp and event metadata
 */
const BaseActionSchema = z.object({
  event_type: z.nativeEnum(WebhookEventType, {
    errorMap: () => ({ message: 'Invalid event type' }),
  }),
  msgcode: z.number().int().positive('Message code must be a positive integer'),
  event: z.string().min(1, 'Event name is required'),
  at: z
    .string()
    .datetime({
      offset: true,
      message: 'Invalid ISO 8601 datetime with timezone',
    }),
  event_message: z.string().optional().default(''),
  data: z.any().nullable().optional().default(null),
});

// ===============================
// State History Schema
// ===============================

/**
 * Webhook State History Schema
 * Tracks event state transitions in webhook-related entities
 */
export const WebhookStateHistorySchema = z.array(
  z.object({
    event: z.string(),
  }),
);

export type WebhookStateHistory = z.infer<typeof WebhookStateHistorySchema>;

// ===============================
// UCC (Client Onboarding) Event Schemas
// ===============================

/**
 * UCC Event Action Schema
 * Handles all UCC lifecycle events (registration, verification, activation, suspension)
 */
const UccActionSchema = BaseActionSchema.extend({
  event_type: z.literal(WebhookEventType.UCC),
  event: z.nativeEnum(UccWebhookEvent),
});

// ===============================
// ORDER (Lumpsum) Event Schemas
// ===============================

/**
 * Order Event Action Schema
 * Handles lumpsum order lifecycle from receipt to completion
 * Fields: order_id (exchange ID), mem_ord_ref_id (internal ref), bank_rcpt_id (refund ref)
 */
const OrderActionSchema = BaseActionSchema.extend({
  event_type: z.literal(WebhookEventType.ORDER),
  event: z.nativeEnum(OrderWebhookEvent),
  order_id: z.union([z.string(), z.number()]).transform(String).optional(),
  mem_ord_ref_id: z.string().optional(),
  bank_rcpt_id: z.string().optional(), // Present only in refund scenarios
});

// ===============================
// SXP (Systematic Investment) Event Schemas
// ===============================

/**
 * SXP Event Action Schema
 * Handles SIP/STP/SWP registration and installment execution
 * Fields: sxp_reg_num (SIP registration ID), order_id (only for 'sxp_order_triggered' event)
 */
const SxpActionSchema = BaseActionSchema.extend({
  event_type: z.literal(WebhookEventType.SXP),
  event: z.nativeEnum(SxpWebhookEvent),
  sxp_reg_num: z.string().optional(), // SIP registration ID - persistent across installments
  order_id: z.union([z.string(), z.number()]).transform(String).optional(), // Present only when event == 'sxp_order_triggered'
  mem_ord_ref_id: z.string().optional(),
});

// ===============================
// MANDATES (E-Mandate) Event Schemas
// ===============================

/**
 * Mandate Event Action Schema
 * Handles e-mandate registration and authentication (both eNach and UPI)
 * Fields: mandate_id (unique mandate identifier for e-mandate registration)
 */
const MandateActionSchema = BaseActionSchema.extend({
  event_type: z.literal(WebhookEventType.MANDATES),
  event: z.union([
    z.nativeEnum(MandateWebhookEnachEvent),
    z.nativeEnum(MandateWebhookUpiEvent),
  ]),
  mandate_id: z.union([z.string(), z.number()]).transform(String).optional(), // Unique e-mandate identifier
});

// ===============================
// PAYMENT GATEWAY Event Schemas
// ===============================

/**
 * Payment Gateway Event Action Schema
 * Handles payment confirmation for orders
 * Fields: pg_order_ids (array of order IDs settled in this payment)
 */
const PaymentGatewayActionSchema = BaseActionSchema.extend({
  event_type: z.literal(WebhookEventType.PAYMENT_GATEWAY),
  event: z.nativeEnum(PaymentGatewayEvent),
  pg_order_ids: z.array(z.string()).optional(), // Array of order IDs - multiple orders may be settled in single payment
});

// ===============================
// Main Webhook Payload Schema
// ===============================

/**
 * Root Webhook Payload Structure
 * Validates the complete payload structure with discriminated union for event types
 */
export const WebhookPayloadSchema = z.object({
  member: MemberSchema,
  request_id: z.string().uuid('Request ID must be a valid UUID'),
  investor: InvestorSchema,
  action: z.discriminatedUnion('event_type', [
    UccActionSchema,
    OrderActionSchema,
    SxpActionSchema,
    MandateActionSchema,
    PaymentGatewayActionSchema,
  ]),
});

// ===============================
// Event-Specific Payload Schemas
// ===============================

/**
 * UCC-specific webhook payload
 */
export const UccWebhookPayloadSchema = WebhookPayloadSchema.extend({
  parent_client_code: z.string().optional().default(''),
  action: UccActionSchema,
});

/**
 * Order-specific webhook payload
 */
export const OrderWebhookPayloadSchema = WebhookPayloadSchema.extend({
  action: OrderActionSchema,
});

/**
 * SXP-specific webhook payload
 */
export const SxpWebhookPayloadSchema = WebhookPayloadSchema.extend({
  action: SxpActionSchema,
});

/**
 * Mandate-specific webhook payload
 */
export const MandateWebhookPayloadSchema = WebhookPayloadSchema.extend({
  action: MandateActionSchema,
});

/**
 * Payment Gateway-specific webhook payload
 */
export const PaymentGatewayWebhookPayloadSchema = WebhookPayloadSchema.extend({
  action: PaymentGatewayActionSchema,
});

// ===============================
// Export Individual Schemas
// ===============================

export const ActionSchemas = {
  ucc: UccActionSchema,
  order: OrderActionSchema,
  sxp: SxpActionSchema,
  mandate: MandateActionSchema,
  payment_gateway: PaymentGatewayActionSchema,
};

// ===============================
// Exported Types
// ===============================

// Main webhook payload type
export type WebhookPayload = z.infer<typeof WebhookPayloadSchema>;

// Event-specific payload types
export type UccWebhookPayload = z.infer<typeof UccWebhookPayloadSchema>;
export type OrderWebhookPayload = z.infer<typeof OrderWebhookPayloadSchema>;
export type SxpWebhookPayload = z.infer<typeof SxpWebhookPayloadSchema>;
export type MandateWebhookPayload = z.infer<typeof MandateWebhookPayloadSchema>;
export type PaymentGatewayWebhookPayload = z.infer<
  typeof PaymentGatewayWebhookPayloadSchema
>;

// Action types
export type UccAction = z.infer<typeof UccActionSchema>;
export type OrderAction = z.infer<typeof OrderActionSchema>;
export type SxpAction = z.infer<typeof SxpActionSchema>;
export type MandateAction = z.infer<typeof MandateActionSchema>;
export type PaymentGatewayAction = z.infer<typeof PaymentGatewayActionSchema>;

// Utility types
export type Member = WebhookPayload['member'];
export type Investor = WebhookPayload['investor'];
export type Action = WebhookPayload['action'];

// ===============================
// API Response Types
// ===============================

/**
 * Standard API message structure for webhook responses
 */
export interface ApiMessage {
  msgid: string;
  errcode: string;
  field: string;
  vals: string[];
}

/**
 * Webhook success response
 */
export interface WebhookSuccessResponse {
  status: 'success';
  data: {
    id: number | string;
    message: string;
  };
  messages: ApiMessage[];
}

/**
 * Webhook error response
 */
export interface WebhookErrorResponse {
  status: 'error';
  data: Record<string, never>;
  messages: ApiMessage[];
}

/**
 * Webhook response union type
 */
export type WebhookResponse = WebhookSuccessResponse | WebhookErrorResponse;

// ===============================
// Webhook Processing Types
// ===============================

/**
 * Webhook processing result
 */
export interface WebhookProcessingResult {
  success: boolean;
  entityId?: string;
  entityType?: string;
  error?: string;
}

/**
 * Webhook event context for logging and tracing
 */
export interface WebhookEventContext {
  traceId: string;
  requestId: string;
  eventType: string;
  event: string;
  ucc: string;
  memberCode: string;
  timestamp: string;
  receivedAt: Date;
}

/**
 * Webhook processing context for handlers
 */
export interface WebhookProcessingContext {
  traceId: string;
  event: string;
  clientCode: string;
  memberCode: string;
  eventTimestamp: Date;
  webhookEventId?: string;
}

/**
 * Handler result type
 */
export interface HandlerResult {
  success: boolean;
  entityId?: string | number;
  message?: string;
  error?: string;
}

// ===============================
// Utility Functions
// ===============================

/**
 * Extract webhook event type from payload
 *
 * @param payload - Webhook payload with action.event_type field
 * @returns WebhookEventType enum value or null if invalid
 */
export const getEventType = (
  payload: WebhookPayload,
): WebhookEventType | null => {
  const eventType = payload.action?.event_type;

  switch (eventType) {
    case WebhookEventType.UCC:
      return WebhookEventType.UCC;
    case WebhookEventType.ORDER:
      return WebhookEventType.ORDER;
    case WebhookEventType.SXP:
      return WebhookEventType.SXP;
    case WebhookEventType.MANDATES:
      return WebhookEventType.MANDATES;
    case WebhookEventType.PAYMENT_GATEWAY:
      return WebhookEventType.PAYMENT_GATEWAY;
    default:
      return null;
  }
};
