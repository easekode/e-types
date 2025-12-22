export enum WebhookEventType {
  UCC = 'UCC',
  ORDER = 'ORDER',
  SXP = 'SXP',
  MANDATES = 'MANDATES',
  PAYMENT_GATEWAY = 'PAYMENT GATEWAY',
}

export enum UccWebhookEvent {
  // State 0: User registered, awaiting authentication
  PENDING_AUTHENTICATION = 'PENDING_AUTHENTICATION',
  
  // State 1: Authentication completed
  UCC_AUTH_UCC = 'ucc_auth_ucc',
  
  // State 1: Demat account verification (for demat clients)
  UCC_DP_ACC = 'ucc_dp_acc',
  
  // State 2: Submitted to KRA/Bank for verification
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  
  // State 3: Parallel verification steps
  UCC_KYC_VERIFICATION = 'ucc_kyc_verification',
  UCC_PAN_VERIFICATION = 'ucc_pan_verification',
  UCC_BANK_ACC = 'ucc_bank_acc',
  
  // State 4: All verifications complete - Ready to trade
  ACTIVE = 'active',
  
  // State S: Account suspended
  SUSPENDED = 'suspended',
}

export enum OrderWebhookEvent {
  // State 0: Order received at exchange
  RECEIVED = 'received',
  
  // State 1: Two-factor authentication pending (if enabled)
  ORDER_2FA_PENDING = 'order_2fa_pending',
  
  // State 2: Awaiting payment confirmation
  PAYMENT_PENDING = 'payment_pending',
  
  // State 3: Payment received, matching in progress
  MATCH_PENDING = 'match_pending',
  
  // State 4: Order matched with AMC scheme
  MATCHED = 'matched',
  
  // State 5: Order sent to RTA for unit allocation
  SENT_TO_RTA = 'sent_to_rta',
  
  // State 8: Units allocated by RTA
  UNITS_RTA_SETTLED = 'units_rta_settled',
  
  // State 9: Order complete
  DONE = 'done',
}

export enum SxpWebhookEvent {
  // State 0: SIP registration initiated
  // This will be initial event indicating SXP has been successfully registered at BSE
  REG = 'reg',
  
  // State 1: Two-factor authentication pending (for 2FA included members)
  SXP_2FA_PENDING = 'sxp_2fa_pending',
  // State 1,2: SIP active, installments will execute
  // For 2FA Included Member: Triggered after client completes 2FA authentication
  // For 2FA Excluded Members: The SXP order will be default in active state
  ACTIVE = 'active',

  // State 3: Installment order created (contains order_id for child order)
  // This event will be triggered when child orders are initiated for the registered SXPs
  SXP_ORDER_TRIGGERED = 'sxp_order_triggered',
  
  // State S: SIP paused by client
  // This event will be triggered depending upon client initiation
  PAUSED = 'paused',
  
  // State S: SIP cancelled by investor
  // This event will be triggered depending upon client initiation
  SXP_INVESTOR_CANC = 'sxp_investor_canc',
  
  // State S: SIP cancelled by the exchange
  // This event will be triggered if the SXP order is cancelled by the exchange
  CANCELLED = 'cancelled',
  
  // State S: Mandate unlinked from SIP
  // This event will be triggered depending upon client initiation
  MANDATE_UNLINK = 'mandate_unlink',
  
  // State S: Auto-cancelled after 3 consecutive failures
  // This event will only trigger if three consecutive SIPs fail
  AUTOCANCELLED = 'autocancelled',
  
  // State S: SIP matured
  // This event will only trigger if SXP order has matured
  MATURED = 'matured',
}

/**
 * Mapping between SxpWebhookEvent and SxPStatus from v2Enums
 * Maps webhook events to their corresponding SIP status values
 */
export const SxpWebhookEventToStatusMap: Record<SxpWebhookEvent, string> = {
  [SxpWebhookEvent.REG]: 'pending',
  [SxpWebhookEvent.SXP_2FA_PENDING]: 'pending',
  [SxpWebhookEvent.ACTIVE]: 'active',
  [SxpWebhookEvent.SXP_ORDER_TRIGGERED]: 'active', // Remains active during installment execution
  [SxpWebhookEvent.PAUSED]: 'paused',
  [SxpWebhookEvent.SXP_INVESTOR_CANC]: 'cancelled',
  [SxpWebhookEvent.CANCELLED]: 'cancelled',
  [SxpWebhookEvent.MANDATE_UNLINK]: 'cancelled',
  [SxpWebhookEvent.AUTOCANCELLED]: 'cancelled',
  [SxpWebhookEvent.MATURED]: 'completed',
};

export enum MandateWebhookEnachEvent {
  // State 0: Mandate registration initiated
  INITIATED = 'initiated',
  
  // State 1: Awaiting investor authentication via bank
  INVESTOR_AUTH_AWAITED = 'investor_auth_awaited',
  
  // State 2: Mandate authenticated and active (required for SIP registration)
  ACTIVE = 'active',
  
  // State 2: Mandate authentication failed/rejected
  REJECTED = 'rejected',
  
  // State S: Mandate cancelled by the investor
  CANCELLED = 'cancelled',
  
  // State S: Mandate completed (end date reached)
  COMPLETED = 'completed',
}

export enum MandateWebhookUpiEvent {
  // State 0: Mandate registration process initiated
  INITIATED = 'initiated',
  
  // State 1: Investor authentication pending
  IN_PROCESS_AGENCY = 'in_process_agency',
  
  // State 2: Mandate successfully active at agency
  ACTIVE = 'active',
  
  // State 2: Mandate registration process not completed at agency
  REJECTED = 'rejected',
  
  // State S: Mandate cancelled by the investor
  CANCELLED = 'cancelled',
  
  // State S: Mandate completed (end date reached)
  COMPLETED = 'completed',
  
  // State S: Mandate rejected by agency
  AUTO_REJECTED = 'auto_rejected',
  
  // State S: Amount successfully pre-debited from the account
  PRE_DEBIT_NOTIFICATION_SENT_SUCCESSFULLY = 'pre_debit_notification_sent_successfully',
  
  // State S: Investor wants to cancel the mandate (2FA enabled members)
  INVESTOR_AUTH_AWAITED = 'investor_auth_awaited',
}

export enum PaymentGatewayWebhookEvent {
  // State 3: Payment captured successfully (resumes order processing)
  AGENCY_APPROVED = 'agency_approved',
  
  // State 3: Payment failed/declined
  AGENCY_REJECTED = 'agency_rejected',
}

export type WebhookEvent = 
  | UccWebhookEvent 
  | OrderWebhookEvent 
  | SxpWebhookEvent 
  | MandateWebhookEnachEvent
  | MandateWebhookUpiEvent
  | PaymentGatewayWebhookEvent;

