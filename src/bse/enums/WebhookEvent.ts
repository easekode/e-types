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
  INITIATED = 'initiated',
  
  // State 1: Awaiting BSE approval
  PENDING_APPROVAL = 'pending_approval',
  
  // State 2: SIP active, installments will execute
  ACTIVE = 'active',
  
  // State 3: Installment order created (contains order_id for child order)
  SXP_ORDER_TRIGGERED = 'sxp_order_triggered',
  
  // State S: Auto-cancelled after 3 consecutive failures
  AUTOCANCELLED = 'autocancelled',
}

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

