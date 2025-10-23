/**
 * BSE StARMF v2 Webhook Type Definitions
 * 
 * TypeScript types inferred from Zod validation schemas.
 * These types provide compile-time type safety for webhook processing.
 * 
 * @see specs/003-bse-webhook-events/contracts/openapi.yaml
 * @see specs/003-bse-webhook-events/data-model.md
 */

import { z } from 'zod';
import { WebhookPayloadSchema, ActionSchemas } from './schemas';
import { WebhookEvent } from '../enums/WebhookEvent';

// ===============================
// Main Webhook Payload Type
// ===============================

/**
 * Complete webhook payload structure from BSE
 */
export type WebhookPayload = z.infer<typeof WebhookPayloadSchema>;

/**
 * Webhook data wrapper
 */
export type WebhookData = WebhookPayload['data'];

/**
 * Member information
 */
export type Member = WebhookData['member'];

/**
 * Investor information (UCC)
 */
export type Investor = WebhookData['investor'];

// ===============================
// Action Type Unions by Event Family
// ===============================

/**
 * UCC event action types
 */
export type UccAction =
  | z.infer<typeof ActionSchemas.ucc_new>
  | z.infer<typeof ActionSchemas.ucc_approved>
  | z.infer<typeof ActionSchemas.ucc_rejected>
  | z.infer<typeof ActionSchemas.ucc_verify>
  | z.infer<typeof ActionSchemas.ucc_inactive>;

/**
 * Order event action types
 */
export type OrderAction =
  | z.infer<typeof ActionSchemas.order_new>
  | z.infer<typeof ActionSchemas.matched>
  | z.infer<typeof ActionSchemas.order_allotted>
  | z.infer<typeof ActionSchemas.order_redeemed>
  | z.infer<typeof ActionSchemas.order_rejected>
  | z.infer<typeof ActionSchemas.order_refund>
  | z.infer<typeof ActionSchemas.order_rta_response>;

/**
 * SxP (SIP/SWP/STP) event action types
 */
export type SxpAction =
  | z.infer<typeof ActionSchemas.sxp_registered>
  | z.infer<typeof ActionSchemas.sxp_cancelled>
  | z.infer<typeof ActionSchemas.sxp_paused>
  | z.infer<typeof ActionSchemas.sxp_resumed>
  | z.infer<typeof ActionSchemas.sxp_topup>
  | z.infer<typeof ActionSchemas.sxp_installment_generated>;

/**
 * Mandate event action types
 */
export type MandateAction =
  | z.infer<typeof ActionSchemas.mandate_registered>
  | z.infer<typeof ActionSchemas.mandate_verified>
  | z.infer<typeof ActionSchemas.mandate_cancelled>
  | z.infer<typeof ActionSchemas.mandate_linked>
  | z.infer<typeof ActionSchemas.mandate_delinked>
  | z.infer<typeof ActionSchemas.mandate_rejected>;

/**
 * Payment Gateway event action types
 */
export type PaymentAction =
  | z.infer<typeof ActionSchemas.pg_payment_initiated>
  | z.infer<typeof ActionSchemas.pg_payment_success>
  | z.infer<typeof ActionSchemas.pg_payment_failed>;

// ===============================
// Specific Event Payload Types
// ===============================

/**
 * Type-safe webhook payload with specific event type and action
 */
export type TypedWebhookPayload<E extends WebhookEvent, A> = {
  data: {
    member: Member;
    investor: Investor;
    event: E;
    action: A;
  };
};

// UCC Event Payloads
export type UccNewPayload = TypedWebhookPayload<
  WebhookEvent.UCC_NEW,
  z.infer<typeof ActionSchemas.ucc_new>
>;

export type UccApprovedPayload = TypedWebhookPayload<
  WebhookEvent.UCC_APPROVED,
  z.infer<typeof ActionSchemas.ucc_approved>
>;

export type UccRejectedPayload = TypedWebhookPayload<
  WebhookEvent.UCC_REJECTED,
  z.infer<typeof ActionSchemas.ucc_rejected>
>;

export type UccVerifyPayload = TypedWebhookPayload<
  WebhookEvent.UCC_VERIFY,
  z.infer<typeof ActionSchemas.ucc_verify>
>;

export type UccInactivePayload = TypedWebhookPayload<
  WebhookEvent.UCC_INACTIVE,
  z.infer<typeof ActionSchemas.ucc_inactive>
>;

// Order Event Payloads
export type OrderNewPayload = TypedWebhookPayload<
  WebhookEvent.ORDER_NEW,
  z.infer<typeof ActionSchemas.order_new>
>;

export type MatchedPayload = TypedWebhookPayload<
  WebhookEvent.MATCHED,
  z.infer<typeof ActionSchemas.matched>
>;

export type OrderAllottedPayload = TypedWebhookPayload<
  WebhookEvent.ORDER_ALLOTTED,
  z.infer<typeof ActionSchemas.order_allotted>
>;

export type OrderRedeemedPayload = TypedWebhookPayload<
  WebhookEvent.ORDER_REDEEMED,
  z.infer<typeof ActionSchemas.order_redeemed>
>;

export type OrderRejectedPayload = TypedWebhookPayload<
  WebhookEvent.ORDER_REJECTED,
  z.infer<typeof ActionSchemas.order_rejected>
>;

export type OrderRefundPayload = TypedWebhookPayload<
  WebhookEvent.ORDER_REFUND,
  z.infer<typeof ActionSchemas.order_refund>
>;

export type OrderRtaResponsePayload = TypedWebhookPayload<
  WebhookEvent.ORDER_RTA_RESPONSE,
  z.infer<typeof ActionSchemas.order_rta_response>
>;

// SxP Event Payloads
export type SxpRegisteredPayload = TypedWebhookPayload<
  WebhookEvent.SXP_REGISTERED,
  z.infer<typeof ActionSchemas.sxp_registered>
>;

export type SxpCancelledPayload = TypedWebhookPayload<
  WebhookEvent.SXP_CANCELLED,
  z.infer<typeof ActionSchemas.sxp_cancelled>
>;

export type SxpPausedPayload = TypedWebhookPayload<
  WebhookEvent.SXP_PAUSED,
  z.infer<typeof ActionSchemas.sxp_paused>
>;

export type SxpResumedPayload = TypedWebhookPayload<
  WebhookEvent.SXP_RESUMED,
  z.infer<typeof ActionSchemas.sxp_resumed>
>;

export type SxpTopupPayload = TypedWebhookPayload<
  WebhookEvent.SXP_TOPUP,
  z.infer<typeof ActionSchemas.sxp_topup>
>;

export type SxpInstallmentGeneratedPayload = TypedWebhookPayload<
  WebhookEvent.SXP_INSTALLMENT_GENERATED,
  z.infer<typeof ActionSchemas.sxp_installment_generated>
>;

// Mandate Event Payloads
export type MandateRegisteredPayload = TypedWebhookPayload<
  WebhookEvent.MANDATE_REGISTERED,
  z.infer<typeof ActionSchemas.mandate_registered>
>;

export type MandateVerifiedPayload = TypedWebhookPayload<
  WebhookEvent.MANDATE_VERIFIED,
  z.infer<typeof ActionSchemas.mandate_verified>
>;

export type MandateCancelledPayload = TypedWebhookPayload<
  WebhookEvent.MANDATE_CANCELLED,
  z.infer<typeof ActionSchemas.mandate_cancelled>
>;

export type MandateLinkedPayload = TypedWebhookPayload<
  WebhookEvent.MANDATE_LINKED,
  z.infer<typeof ActionSchemas.mandate_linked>
>;

export type MandateDelinkedPayload = TypedWebhookPayload<
  WebhookEvent.MANDATE_DELINKED,
  z.infer<typeof ActionSchemas.mandate_delinked>
>;

export type MandateRejectedPayload = TypedWebhookPayload<
  WebhookEvent.REJECTED,
  z.infer<typeof ActionSchemas.mandate_rejected>
>;

// Payment Gateway Event Payloads
export type PgPaymentInitiatedPayload = TypedWebhookPayload<
  WebhookEvent.PG_PAYMENT_INITIATED,
  z.infer<typeof ActionSchemas.pg_payment_initiated>
>;

export type PgPaymentSuccessPayload = TypedWebhookPayload<
  WebhookEvent.PG_PAYMENT_SUCCESS,
  z.infer<typeof ActionSchemas.pg_payment_success>
>;

export type PgPaymentFailedPayload = TypedWebhookPayload<
  WebhookEvent.PG_PAYMENT_FAILED,
  z.infer<typeof ActionSchemas.pg_payment_failed>
>;

// ===============================
// Webhook Response Types
// ===============================

/**
 * Standard API response message structure
 */
export interface ApiMessage {
  msgid: string;
  errcode: string;
  field: string;
  vals: string[];
}

/**
 * Standard webhook response format (BSE StARMF v2 standard)
 */
export interface WebhookResponse<T = unknown> {
  status: 'success' | 'error';
  data: T;
  messages: ApiMessage[];
}

/**
 * Success response with data
 */
export interface WebhookSuccessResponse<T = unknown> extends WebhookResponse<T> {
  status: 'success';
  data: T;
  messages: [];
}

/**
 * Error response with error messages
 */
export interface WebhookErrorResponse extends WebhookResponse<Record<string, never>> {
  status: 'error';
  data: Record<string, never>;
  messages: ApiMessage[];
}

// ===============================
// Processing Context Types
// ===============================

/**
 * Context passed to event handlers
 */
export interface WebhookProcessingContext {
  /** Trace ID from X-STARMFv2-Trace-ID header for correlation */
  traceId: string;
  /** Webhook event type */
  event: WebhookEvent;
  /** Client code (UCC) */
  clientCode: string;
  /** BSE member code */
  memberCode: string;
  /** Event timestamp from action.at */
  eventTimestamp: Date;
}

/**
 * Handler processing result
 */
export interface HandlerResult {
  success: boolean;
  entityId?: string | number;
  message?: string;
  error?: string;
}
