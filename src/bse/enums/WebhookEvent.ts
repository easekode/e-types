/**
 * BSE StARMF v2 Webhook Event Types
 * 
 * Comprehensive enum of all webhook events sent by BSE platform
 * for UCC, Order, SxP (SIP/SWP/STP), Mandate, NFT, and Payment Gateway operations.
 * 
 * @see specs/003-bse-webhook-events/contracts/openapi.yaml
 */

export enum WebhookEvent {
  // ===============================
  // UCC (Unique Client Code) Events
  // ===============================
  UCC_NEW = 'ucc_new',
  UCC_UPDATE = 'ucc_update',
  UCC_APPROVED = 'ucc_approved',
  UCC_REJECTED = 'ucc_rejected',
  UCC_VERIFY = 'ucc_verify',
  UCC_INACTIVE = 'ucc_inactive',
  UCC_AUTH_UCC = 'ucc_auth_ucc',
  UCC_AUTH_ELOG = 'ucc_auth_elog',

  // ===============================
  // Order Lifecycle Events
  // ===============================
  ORDER_NEW = 'order_new',
  ORDER_UPDATE = 'order_update',
  ORDER_CANCEL = 'order_cancel',
  MATCHED = 'matched',
  ORDER_RTA_RESPONSE = 'order_rta_response',
  ORDER_ALLOTTED = 'order_allotted',
  ORDER_REDEEMED = 'order_redeemed',
  ORDER_REFUND = 'order_refund',
  ORDER_REJECTED = 'order_rejected',
  OPS_REJECTED = 'ops_rejected',
  RECEIVED = 'received',
  ORDER_2FA_PENDING = 'order_2fa_pending',
  BANK_TPV_PENDING = 'bank_tpv_pending',
  QUEUED_FOR_RTA = 'queued_for_rta',
  SENT_TO_RTA = 'sent_to_rta',
  RTA_RESP_RCVD = 'rta_resp_rcvd',
  UNITS_PAYOUT_SENT = 'units_payout_sent',
  DP_UNITS_MATCHED = 'dp_units_matched',
  UNITS_RTA_SETTLED = 'units_rta_settled',
  DONE = 'done',
  PARTIAL_UNITS_DONE = 'partial_units_done',
  REDEMPT_RTA_SETTLED = 'redempt_rta_settled',
  QUEUED_FOR_DP = 'queued_for_dp',
  RTA_REJECTED = 'rta_rejected',
  REFUND_PENDING = 'refund_pending',
  EXCH_REFUND_INIT = 'exch_refund_init',

  // ===============================
  // SxP (SIP/SWP/STP) Events
  // ===============================
  SXP_REGISTERED = 'sxp_registered',
  SXP_CANCELLED = 'sxp_cancelled',
  SXP_PAUSED = 'sxp_paused',
  SXP_RESUMED = 'sxp_resumed',
  SXP_TOPUP = 'sxp_topup',
  SXP_INSTALLMENT_GENERATED = 'sxp_installment_generated',

  // ===============================
  // Mandate Events
  // ===============================
  MANDATE_REGISTERED = 'mandate_registered',
  MANDATE_UPDATED = 'mandate_updated',
  MANDATE_CANCELLED = 'mandate_cancelled',
  MANDATE_VERIFIED = 'mandate_verified',
  MANDATE_LINKED = 'mandate_linked',
  MANDATE_DELINKED = 'mandate_delinked',
  
  // Mandate Status Events
  ACTIVE = 'active',
  INVESTOR_AUTH_AWAITED = 'investor_auth_awaited',
  SCAN_UPLOAD_PENDING = 'scan_upload_pending',
  REJECTED = 'rejected',
  IN_PROCESS_AGENCY = 'in_process_agency',
  AUTO_REJECTED = 'auto_rejected',
  PRE_DEBIT_NOTIFICATION_SENT_SUCCESSFULLY = 'pre_debit_notification_sent_successfully',
  COMPLETED = 'completed',

  // ===============================
  // NFT (Nominee/Contact/Bank) Events
  // ===============================
  NFT_NOMINEE_CHANGE = 'nft_nominee_change',
  NFT_CONTACT_CHANGE = 'nft_contact_change',
  NFT_BANK_CHANGE = 'nft_bank_change',

  // ===============================
  // Payment Gateway Events
  // ===============================
  PG_PAYMENT_INITIATED = 'pg_payment_initiated',
  PG_PAYMENT_SUCCESS = 'pg_payment_success',
  PG_PAYMENT_FAILED = 'pg_payment_failed',
  
  // Agency Payment Events
  AGENCY_PENDING = 'agency_pending',
  AGENCY_IN_PROCESS = 'agency_in_process',
  AGENCY_APPROVED = 'agency_approved',
  AGENCY_REJECTED = 'agency_rejected',
  AGENCY_CANCELLED = 'agency_cancelled',
  AGENCY_PAYMENT_COMPLETE = 'agency_payment_complete',
}

/**
 * Helper function to check if an event belongs to a specific category
 */
export const WebhookEventCategory = {
  isUccEvent: (event: WebhookEvent): boolean => {
    return event.startsWith('ucc_');
  },
  
  isOrderEvent: (event: WebhookEvent): boolean => {
    return event.startsWith('order_') || 
           event === WebhookEvent.MATCHED ||
           event === WebhookEvent.RECEIVED ||
           event === WebhookEvent.OPS_REJECTED ||
           event === WebhookEvent.DONE ||
           event === WebhookEvent.RTA_REJECTED ||
           event === WebhookEvent.REFUND_PENDING ||
           event === WebhookEvent.EXCH_REFUND_INIT ||
           event.includes('rta_') ||
           event.includes('units_') ||
           event.includes('dp_') ||
           event.includes('queued_');
  },
  
  isSxpEvent: (event: WebhookEvent): boolean => {
    return event.startsWith('sxp_');
  },
  
  isMandateEvent: (event: WebhookEvent): boolean => {
    return event.startsWith('mandate_') ||
           event === WebhookEvent.ACTIVE ||
           event === WebhookEvent.INVESTOR_AUTH_AWAITED ||
           event === WebhookEvent.SCAN_UPLOAD_PENDING ||
           event === WebhookEvent.REJECTED ||
           event === WebhookEvent.IN_PROCESS_AGENCY ||
           event === WebhookEvent.AUTO_REJECTED ||
           event === WebhookEvent.PRE_DEBIT_NOTIFICATION_SENT_SUCCESSFULLY ||
           event === WebhookEvent.COMPLETED;
  },
  
  isNftEvent: (event: WebhookEvent): boolean => {
    return event.startsWith('nft_');
  },
  
  isPaymentEvent: (event: WebhookEvent): boolean => {
    return event.startsWith('pg_') || event.startsWith('agency_');
  },
};
