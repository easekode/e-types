/**
 * BSE StARMF v2 API - All Enums
 * Aggregated from bse_starmf_enums.ts and doc constants
 * Do not edit existing files, only add new enums here
 */

// ===============================
// API Response Status
// ===============================
export enum ApiStatus {
  SUCCESS = 'success',
  ERROR = 'error'
}

// ===============================
// UCC (Unique Client Code) Module
// ===============================
export enum HoldingNature {
  SINGLE = 'SI',
  JOINT = 'JO',
  ANYONE_OR_SURVIVOR = 'AS',
  MINOR = 'MI',
  INSTITUTION = 'IN',
  CUSTODY = 'CU'
}

export enum TaxCode {
  RESIDENT_INDIVIDUAL = '01',
  RESIDENT_INDIVIDUAL_MINOR = '02',
  NRI_NRO_REPATRIABLE = '03',
  NRI_NRO_NON_REPATRIABLE = '04',
  NRI_NRE = '05',
  FII = '06',
  FOREIGN_NATIONAL = '07',
  COMPANY = '08',
  HINDU_UNDIVIDED_FAMILY = '09',
  PARTNERSHIP_FIRM = '10',
  TRUST = '11',
  LIMITED_LIABILITY_PARTNERSHIP = '12',
  ASSOCIATION_OF_PERSONS = '13',
  BODY_OF_INDIVIDUALS = '14',
  SOCIETY = '15',
  OVERSEAS_CORPORATE_BODIES = '16',
  FPI_CORPORATE = '17',
  FPI_INDIVIDUAL = '18',
  FPI_TRUST = '19',
  NRI_MINOR = '24',
  NRI_CHILD = '26'
}

export enum RedemptionPaymentMode {
  NEFT = '01',
  RTGS = '02',
  CHEQUE = '03',
  DIRECT_CREDIT = '04'
}

export enum UCCStatus {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  REJECTED = 'REJECTED',
  INACTIVE = 'INACTIVE'
}

export enum CommunicationMode {
  PHYSICAL = 'P',
  EMAIL = 'E',
  BOTH = 'B'
}

export enum OnboardingType {
  PAPER = 'P',
  PAPERLESS = 'Z'
}

export enum HolderRank {
  PRIMARY = 1,
  SECOND = 2,
  THIRD = 3
}

export enum OccupationCode {
  BUSINESS = '01',
  SERVICE = '02',
  PROFESSIONAL = '03',
  AGRICULTURIST = '04',
  RETIRED = '05',
  HOUSEWIFE = '06',
  STUDENT = '07',
  OTHERS = '08',
  PRIVATE_SECTOR_SERVICE = '41',
  PUBLIC_SECTOR = '42',
  GOVERNMENT_SERVICE = '43',
  FOREX_DEALER = '44'
}

export enum AuthMode {
  MANUAL = 'M',
  PHYSICAL_SIGN = 'P',
  ESIGN = 'E',
  AADHAAR_OTP = 'A',
  DIGIT_SIGNATURE = 'D'
}

export enum NominationAuthMode {
  OFFLINE = 'O',
  DIGITAL_WET_SIGNATURE = 'W',
  ESIGN = 'E'
}

export enum BankAccountType {
  SAVINGS = 'SB',
  CURRENT = 'CA',
  CASH_CREDIT = 'CC',
  OVERDRAFT = 'OD',
  NRE = 'NE',
  NRO = 'NO'
}

export enum DepositoryCode {
  CDSL = 'CDSL',
  NSDL = 'NSDL'
}

export enum KYCType {
  CKYC = 'ckyc',
  KRA = 'kra',
  AADHAAR = 'aadhaar',
  BIOMETRIC = 'biometric'
}

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
  TRANSGENDER = 'T'
}

export enum ContactType {
  MOBILE = 'M',
  RESIDENCE = 'RE',
  OFFICE = 'OF'
}

export enum IdentifierType {
  PAN = 'pan',
  PAN_EXEMPT_REF_NO = 'panexemptrefno',
  AADHAAR = 'aadhaar',
  PASSPORT = 'passport',
  DRIVING_LICENCE = 'drivinglicence',
  VOTER_ID = 'voterid',
  AOF = 'aof',
  FATCA_FORM = 'fatca_form',
  AOF_RIA = 'aof_ria',
  CANCEL_CHEQUE = 'cancelcheque',
  BANK_STATEMENT = 'bankstatement',
  BANK_LOG = 'banklog',
  CML_COPY = 'cmlcopy',
  NACH_SCAN_IMG = 'nachscanimg',
  NOMINATION_FORM = 'nominationform',
  WET_SIGNATURE = 'wetsignature',
  AADHAAR_ESIGN = 'aadhaaresign',
  ELOG = 'elog',
  SUPPORTING_DOCUMENT = 'supportingdocument'
}

// ===============================
// Order Module
// ===============================
export enum OrderType {
  PURCHASE = 'purchase',
  REDEMPTION = 'redemption',
  SWITCH = 'switch'
}

export enum OrderSource {
  LUMPSUM = 'lumpsum',
  NFO = 'nfo',
  SIP = 'sip',
  SWP = 'swp',
  STP = 'stp'
}

export enum PhysicalOrDemat {
  PHYSICAL = 'p',
  DEMAT = 'd'
}

export enum OrderStatus {
  OPEN = 'o',
  CLOSED = 'c'
}

export enum OrderLifecycleStatus {
  RECEIVED = 'received',
  OPS_REJECTED = 'ops_rejected',
  ORDER_2FA_PENDING = 'order_2fa_pending',
  BANK_TPV_PENDING = 'bank_tpv_pending',
  MATCHED = 'matched',
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
  PLATFORM_REJECTED = 'platform_rejected',
  REFUND_PENDING = 'refund_pending',
  EXCH_REFUND_INIT = 'exch_refund_init',
  EXCH_REFUND_ATTEMPTED = 'exch_refund_attempted',
  EXCH_REFUND_FAILED = 'exch_refund_failed'
}

// ===============================
// SIP/SWP/STP Module
// ===============================
export enum SxPType {
  SIP = 'sip',
  SWP = 'swp',
  STP = 'stp',
  SPECIAL_PRODUCT = 'sprod',
  TOPUP = 'topup'
}

export enum SxPFrequency {
  DAILY = 'd',
  WEEKLY = 'w',
  MONTHLY = 'm',
  QUARTERLY = 'q',
  HALF_YEARLY = 'h',
  YEARLY = 'y'
}

export enum SxPStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

// ===============================
// Mandate Module
// ===============================
export enum MandateType {
  UPI_AUTOPAY = 'U',
  ENACH = 'N',
  NACH = 'X'
}

export enum MandateMode {
  ACH = 'ACH',
  DIRECT_DEBIT = 'DD'
}

export enum MandateFrequency {
  AS_AND_WHEN_PRESENTED = 'AS AND WHEN PRESENTED',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  HALF_YEARLY = 'HALF_YEARLY',
  YEARLY = 'YEARLY'
}

export enum MandateRequestType {
  REGISTRATION = 'REGISTRATION',
  ENTRY = 'ENTRY'
}

export enum MandateStatus {
  PENDING = 'P',
  VERIFIED = 'V',
  CANCELLED = 'C',
  REJECTED = 'R'
}

// ===============================
// Payment Gateway Module
// ===============================
export enum PaymentMode {
  UPI = 'upi',
  NET_BANKING = 'netbanking',
  MANDATE = 'mandate',
  NEFT = 'NEFT',
  RTGS = 'RTGS',
  NACH = 'NACH',
  ENACH = 'ENACH',
  CHEQUE = 'CHEQUE',
  DIRECT_DEBIT = 'DIRECT_DEBIT'
}

export enum PaymentGatewayRequestMethod {
  EXCHPG_PAGE = 'exchpg_page',
  PAYMENT_INFO_DATA = 'payment_info_data'
}

export enum PaymentStatus {
  INITIATED = 'initiated',
  IN_PROGRESS = 'INPROGRESS',
  SUCCESS = 'success',
  FAILED = 'failed'
}

export enum MISType {
  NEFT = 'NEFT',
  RTGS = 'RTGS',
  UPI = 'UPI',
  UPI_RECURRING = 'UPIR',
  NACH = 'NACH',
  ENACH = 'ENACH',
  CHEQUE = 'CHEQUE',
  DIRECT_DEBIT = 'DIRECT_DEBIT'
}

// ===============================
// Webhook Events
// ===============================
export enum WebhookEventType {
  UCC = 'UCC',
  ORDER = 'ORDER',
  SXP = 'SXP',
  MANDATE = 'MANDATE',
  NFT = 'NFT',
  PAYMENT_GATEWAY = 'PAYMENT_GATEWAY'
}

export enum WebhookEvent {
  UCC_NEW = 'ucc_new',
  UCC_UPDATE = 'ucc_update',
  UCC_APPROVED = 'ucc_approved',
  UCC_REJECTED = 'ucc_rejected',
  UCC_VERIFY = 'ucc_verify',
  UCC_INACTIVE = 'ucc_inactive',
  ORDER_NEW = 'order_new',
  ORDER_UPDATE = 'order_update',
  ORDER_CANCEL = 'order_cancel',
  ORDER_MATCHED = 'matched',
  ORDER_RTA_RESPONSE = 'order_rta_response',
  ORDER_ALLOTTED = 'order_allotted',
  ORDER_REDEEMED = 'order_redeemed',
  ORDER_REFUND = 'order_refund',
  ORDER_REJECTED = 'order_rejected',
  SXP_REGISTERED = 'sxp_registered',
  SXP_CANCELLED = 'sxp_cancelled',
  SXP_PAUSED = 'sxp_paused',
  SXP_RESUMED = 'sxp_resumed',
  SXP_TOPUP = 'sxp_topup',
  SXP_INSTALLMENT_GENERATED = 'sxp_installment_generated',
  MANDATE_REGISTERED = 'mandate_registered',
  MANDATE_UPDATED = 'mandate_updated',
  MANDATE_CANCELLED = 'mandate_cancelled',
  MANDATE_VERIFIED = 'mandate_verified',
  MANDATE_LINKED = 'mandate_linked',
  MANDATE_DELINKED = 'mandate_delinked',
  PG_PAYMENT_INITIATED = 'pg_payment_initiated',
  PG_PAYMENT_SUCCESS = 'pg_payment_success',
  PG_PAYMENT_FAILED = 'pg_payment_failed'
}

// ===============================
// Error Codes
// ===============================
export enum ErrorCode {
  TOKEN_MISSING = '508',
  TOKEN_VERIFICATION_FAILED = '509',
  TOKEN_CACHE_FAILED = '510',
  UNABLE_TO_GET_TOKEN = '580',
  LOGIN_FAILED = '672',
  UNAUTHORIZED = '673',
  TOKEN_MEMBER_MISMATCH = '1023',
  REQUIRED = '522',
  INVALID_VALUE = '561',
  VALIDATION_FAILED = '1011',
  APPLICATION_ERROR = '1020',
  INVALID = '579',
  INVALID_AMOUNT = '3689',
  DUPLICATE_RECORD = '539',
  RECORD_NOT_FOUND = '1507',
  ID_NOT_EXIST = '1505',
  DETAIL_MISMATCH = '3896',
  PAYMENT_FAILED = '3707',
  BILLDESK_API_ERROR = '3708',
  ORDER_MAPPING_FAILED = '3709',
  RAZORPAY_FAILED = '3812',
  ORDER_CREATION_FAILED = '3813',
  ENDPOINT_NOT_FOUND = '3520',
  MISSING = '3517',
  ID_DOES_NOT_EXIST = '3663'
}

// ===============================
// Additional Enums
// ===============================
export enum Currency {
  INR = 'INR'
}

export enum VerificationStatus {
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  PENDING = 'PENDING'
}

export enum RTACode {
  CAMS = 'CAMS',
  KFIN = 'KFIN',
  KARVY = 'KARVY',
  FRANKLIN = 'Franklin'
}

export enum YesNo {
  YES = 'Y',
  NO = 'N'
}

export enum APIEndpoint {
  LOGIN = '/api/login',
  ADD_UCC = '/v2/add_ucc',
  UPDATE_UCC = '/v2/update_ucc',
  GET_UCC = '/v2/get_ucc',
  LIST_UCC = '/v2/list_ucc',
  ORDER_NEW = '/v2/order_new',
  ORDER_UPDATE = '/v2/order_update',
  ORDER_CANCEL = '/v2/order_cancel',
  ORDER_GET = '/v2/order_get',
  ORDER_LIST = '/v2/order_list',
  SXP_REGISTER = '/v2/sxp_register',
  SXP_CANCEL = '/v2/sxp_cancel',
  SXP_GET = '/v2/sxp_get',
  SXP_LIST = '/v2/sxp_list',
  MANDATE_REGISTER = '/v2/mandate_register',
  MANDATE_UPDATE = '/v2/mandate_update',
  MANDATE_CANCEL = '/v2/mandate_cancel',
  MANDATE_GET = '/v2/mandate_get',
  MANDATE_LIST = '/v2/mandate_list',
  MANDATE_LINK = '/v2/mandate_link',
  MANDATE_DELINK = '/v2/mandate_delink',
  GET_EXCHPG_SERVICE = '/v2/get_exchpg_service',
  SEND_PAYMENT_INFO = '/v2/send_payment_info',
  UPLOAD_MIS = '/v2/upload_mis',
  GET_PAYMENT_DETAIL = '/v2/get_payment_detail',
  SCHEME_LIST = '/v2/master_scheme_list',
  NAV_MASTER_LIST = '/v2/nav_master_list',
  GET_2FA_LINK = '/v2/get_2fa_link'
}

export enum ContentType {
  JSON = 'application/json',
  JOSE = 'application/jose'
}

// ===============================
// End of All BSE Enums
// ===============================
