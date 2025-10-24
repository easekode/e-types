/**
 * BSE StARMF v2 Webhook Payload Validation Schemas
 * 
 * Zod schemas for validating incoming webhook payloads from BSE platform.
 * All webhooks follow a standard structure with event-specific action payloads.
 * 
 * @see specs/003-bse-webhook-events/contracts/openapi.yaml
 * @see specs/003-bse-webhook-events/data-model.md
 */

import { z } from 'zod';
import { WebhookEvent } from '../enums/WebhookEvent';

// ===============================
// Base Webhook Structure
// ===============================

const MemberSchema = z.object({
  memberid: z.string().min(1, 'Member ID is required'),
});

const InvestorSchema = z.object({
  ucc: z.string().min(1, 'UCC (client code) is required'),
});

/**
 * Base action schema - all events have an `at` timestamp
 * 
 * Note: BSE sends timestamps in ISO 8601 format with timezone offset
 * (e.g., "2025-10-24T12:00:00+0530")
 * Using offset: true to accept timezone information
 */
const BaseActionSchema = z.object({
  at: z.string().datetime({ offset: true, message: 'Invalid ISO 8601 datetime format with timezone' }),
});

// ===============================
// UCC Event Action Schemas
// ===============================

const UccNewActionSchema = BaseActionSchema.extend({
  clientcode: z.string(),
  membercode: z.string(),
});

const UccApprovedActionSchema = BaseActionSchema.extend({
  clientcode: z.string(),
  membercode: z.string(),
  status: z.string(),
});

const UccRejectedActionSchema = BaseActionSchema.extend({
  clientcode: z.string(),
  membercode: z.string(),
  reason: z.string().optional(),
});

const UccVerifyActionSchema = BaseActionSchema.extend({
  clientcode: z.string(),
  verificationstatus: z.string().optional(),
});

const UccInactiveActionSchema = BaseActionSchema.extend({
  clientcode: z.string(),
  membercode: z.string(),
});

// ===============================
// Order Event Action Schemas
// ===============================

const OrderNewActionSchema = BaseActionSchema.extend({
  orderid: z.union([z.string(), z.number()]).transform(String),
  memordrefid: z.string(),
});

const MatchedActionSchema = BaseActionSchema.extend({
  orderid: z.union([z.string(), z.number()]).transform(String),
  matchedbankrcpt: z.string().optional(),
  banktxnref: z.string().optional(),
});

const OrderAllottedActionSchema = BaseActionSchema.extend({
  orderid: z.union([z.string(), z.number()]).transform(String),
  memordrefid: z.string(),
  folionum: z.string().optional(),
  allottedunits: z.union([z.string(), z.number()]).transform(Number),
  allottedamount: z.union([z.string(), z.number()]).transform(Number),
  allottednav: z.union([z.string(), z.number()]).transform(Number),
  stampduty: z.union([z.string(), z.number()]).transform(Number).optional(),
});

const OrderRedeemedActionSchema = BaseActionSchema.extend({
  orderid: z.union([z.string(), z.number()]).transform(String),
  redeemedunits: z.union([z.string(), z.number()]).transform(Number),
  redeemedamount: z.union([z.string(), z.number()]).transform(Number),
  redemptionnav: z.union([z.string(), z.number()]).transform(Number),
});

const OrderRejectedActionSchema = BaseActionSchema.extend({
  orderid: z.union([z.string(), z.number()]).transform(String),
  errorcode: z.string(),
  errormessage: z.string(),
});

const OrderRefundActionSchema = BaseActionSchema.extend({
  orderid: z.union([z.string(), z.number()]).transform(String),
  refundamount: z.union([z.string(), z.number()]).transform(Number),
  refundreason: z.string().optional(),
});

const OrderRtaResponseActionSchema = BaseActionSchema.extend({
  orderid: z.union([z.string(), z.number()]).transform(String),
  rtatransactionno: z.string().optional(),
  rtaremarks: z.string().optional(),
});

// ===============================
// SxP (SIP/SWP/STP) Event Action Schemas
// ===============================

const SxpRegisteredActionSchema = BaseActionSchema.extend({
  sxpregnum: z.string().length(17, 'BSE SxP registration number must be 17 digits'),
  memsxprefid: z.string(),
});

const SxpCancelledActionSchema = BaseActionSchema.extend({
  sxpregnum: z.string().length(17),
});

const SxpPausedActionSchema = BaseActionSchema.extend({
  sxpregnum: z.string().length(17),
  pausedfrom: z.string().datetime().optional(),
});

const SxpResumedActionSchema = BaseActionSchema.extend({
  sxpregnum: z.string().length(17),
});

const SxpTopupActionSchema = BaseActionSchema.extend({
  sxpregnum: z.string().length(17),
  newamount: z.union([z.string(), z.number()]).transform(Number),
});

const SxpInstallmentGeneratedActionSchema = BaseActionSchema.extend({
  sxpregnum: z.string().length(17),
  memsxprefid: z.string(),
  orderid: z.union([z.string(), z.number()]).transform(String),
  installmentnumber: z.number().int().positive(),
  installmentdate: z.string(), // Date string YYYY-MM-DD
  amount: z.union([z.string(), z.number()]).transform(Number),
});

// ===============================
// Mandate Event Action Schemas
// ===============================

const MandateRegisteredActionSchema = BaseActionSchema.extend({
  mandateid: z.union([z.string(), z.number()]).transform(String),
  memmandaterefid: z.string(),
});

const MandateVerifiedActionSchema = BaseActionSchema.extend({
  mandateid: z.union([z.string(), z.number()]).transform(String),
  status: z.string(), // P/V/C/R status codes
  umrnnumber: z.string().optional(),
  verifiedat: z.string().datetime().optional(),
});

const MandateCancelledActionSchema = BaseActionSchema.extend({
  mandateid: z.union([z.string(), z.number()]).transform(String),
});

const MandateLinkedActionSchema = BaseActionSchema.extend({
  mandateid: z.union([z.string(), z.number()]).transform(String),
  sxpregnum: z.string().length(17),
});

const MandateDelinkedActionSchema = BaseActionSchema.extend({
  mandateid: z.union([z.string(), z.number()]).transform(String),
  sxpregnum: z.string().length(17),
});

const MandateRejectedActionSchema = BaseActionSchema.extend({
  mandateid: z.union([z.string(), z.number()]).transform(String),
  rejectionreason: z.string(),
});

// ===============================
// Payment Gateway Event Action Schemas
// ===============================

const PgPaymentInitiatedActionSchema = BaseActionSchema.extend({
  paymentid: z.string(),
  orderid: z.union([z.string(), z.number()]).transform(String),
  amount: z.union([z.string(), z.number()]).transform(Number),
});

const PgPaymentSuccessActionSchema = BaseActionSchema.extend({
  paymentid: z.string(),
  orderid: z.union([z.string(), z.number()]).transform(String),
  transactionid: z.string(),
  bankutr: z.string().optional(),
  amount: z.union([z.string(), z.number()]).transform(Number),
});

const PgPaymentFailedActionSchema = BaseActionSchema.extend({
  paymentid: z.string(),
  orderid: z.union([z.string(), z.number()]).transform(String),
  failurereason: z.string(),
});

// ===============================
// Generic Action Schema (for unspecified events)
// ===============================

const GenericActionSchema = BaseActionSchema.extend({
  // Allow any additional fields for events without specific schemas
}).passthrough();

// ===============================
// Main Webhook Payload Schema
// ===============================

/**
 * Standard webhook payload structure from BSE
 */
export const WebhookPayloadSchema = z.object({
  data: z.object({
    member: MemberSchema,
    investor: InvestorSchema,
    event: z.nativeEnum(WebhookEvent, {
      errorMap: () => ({ message: 'Invalid webhook event type' }),
    }),
    action: z.union([
      // UCC events
      UccNewActionSchema,
      UccApprovedActionSchema,
      UccRejectedActionSchema,
      UccVerifyActionSchema,
      UccInactiveActionSchema,
      // Order events
      OrderNewActionSchema,
      MatchedActionSchema,
      OrderAllottedActionSchema,
      OrderRedeemedActionSchema,
      OrderRejectedActionSchema,
      OrderRefundActionSchema,
      OrderRtaResponseActionSchema,
      // SxP events
      SxpRegisteredActionSchema,
      SxpCancelledActionSchema,
      SxpPausedActionSchema,
      SxpResumedActionSchema,
      SxpTopupActionSchema,
      SxpInstallmentGeneratedActionSchema,
      // Mandate events
      MandateRegisteredActionSchema,
      MandateVerifiedActionSchema,
      MandateCancelledActionSchema,
      MandateLinkedActionSchema,
      MandateDelinkedActionSchema,
      MandateRejectedActionSchema,
      // Payment events
      PgPaymentInitiatedActionSchema,
      PgPaymentSuccessActionSchema,
      PgPaymentFailedActionSchema,
      // Generic fallback
      GenericActionSchema,
    ]),
  }),
});

// ===============================
// Export individual action schemas for handler-specific validation
// ===============================

export const ActionSchemas = {
  // UCC
  ucc_new: UccNewActionSchema,
  ucc_approved: UccApprovedActionSchema,
  ucc_rejected: UccRejectedActionSchema,
  ucc_verify: UccVerifyActionSchema,
  ucc_inactive: UccInactiveActionSchema,
  
  // Order
  order_new: OrderNewActionSchema,
  matched: MatchedActionSchema,
  order_allotted: OrderAllottedActionSchema,
  order_redeemed: OrderRedeemedActionSchema,
  order_rejected: OrderRejectedActionSchema,
  order_refund: OrderRefundActionSchema,
  order_rta_response: OrderRtaResponseActionSchema,
  
  // SxP
  sxp_registered: SxpRegisteredActionSchema,
  sxp_cancelled: SxpCancelledActionSchema,
  sxp_paused: SxpPausedActionSchema,
  sxp_resumed: SxpResumedActionSchema,
  sxp_topup: SxpTopupActionSchema,
  sxp_installment_generated: SxpInstallmentGeneratedActionSchema,
  
  // Mandate
  mandate_registered: MandateRegisteredActionSchema,
  mandate_verified: MandateVerifiedActionSchema,
  mandate_cancelled: MandateCancelledActionSchema,
  mandate_linked: MandateLinkedActionSchema,
  mandate_delinked: MandateDelinkedActionSchema,
  mandate_rejected: MandateRejectedActionSchema,
  
  // Payment
  pg_payment_initiated: PgPaymentInitiatedActionSchema,
  pg_payment_success: PgPaymentSuccessActionSchema,
  pg_payment_failed: PgPaymentFailedActionSchema,
};
