import { z } from 'zod';

/**
 * Order Get Filter Parameters Schema
 * Used to filter order results
 */
export const OrderGetFilterParamSchema = z.object({
  open_close: z.enum(['o', 'c']).optional(), // 'o' for open, 'c' for closed
});

export type OrderGetFilterParam = z.infer<typeof OrderGetFilterParamSchema>;

/**
 * Order Get Request Body Schema
 * Request format for fetching order details from BSE
 */
export const OrderGetRequestBodySchema = z.object({
  id: z.number().int().positive(), // BSE Order ID (bseOrderId from our Order model)
  filter_param: OrderGetFilterParamSchema.optional(),
});

export type OrderGetRequestBody = z.infer<typeof OrderGetRequestBodySchema>;

/**
 * BSE Order Get Request Schema (with data wrapper)
 * Full request structure sent to BSE API
 */
export const BseOrderGetRequestSchema = z.object({
  data: OrderGetRequestBodySchema,
});

export type BseOrderGetRequest = z.infer<typeof BseOrderGetRequestSchema>;

/**
 * History Event Schema
 * Individual event in the order history timeline
 */
export const OrderHistoryEventSchema = z.object({
  event_status: z.string(),
  msg: z.string(),
  when: z.string(),
  user: z.string(),
});

export type OrderHistoryEvent = z.infer<typeof OrderHistoryEventSchema>;

/**
 * Investor Schema
 */
export const InvestorSchema = z.object({
  ucc: z.string(),
});

export type Investor = z.infer<typeof InvestorSchema>;

/**
 * Order Info Schema
 */
export const OrderInfoSchema = z.object({
  min_redeem_flag: z.boolean().optional(),
  src: z.string().optional(),
  reg_no: z.string().optional(),
  mem_details: z
    .object({
      broker_arn: z.string().optional(),
      euin_flag: z.boolean().optional(),
      sub_br_code: z.string().optional(),
      sub_br_arn: z.string().optional(),
      partner_id: z.string().optional(),
      mem_type: z.string().optional(),
    })
    .optional(),
});

export type OrderInfo = z.infer<typeof OrderInfoSchema>;

/**
 * Order Source Info Schema
 */
export const OrderSourceInfoSchema = z.object({
  src_isin: z.string().optional(),
  src_sch_rta_code: z.string().optional(),
  src_sch_opt: z.string().optional(),
  sip_rgdt: z.string().optional(),
  sip_fq: z.string().optional(),
  sip_st_dt: z.string().optional(),
  sip_end_dt: z.string().optional(),
  src_allowed_inst: z.number().optional(),
  cur_inst_no: z.number().optional(),
});

export type OrderSourceInfo = z.infer<typeof OrderSourceInfoSchema>;

/**
 * Depository Account Schema
 */
export const DepositoryAcctSchema = z.object({
  depository: z.string().optional(),
  dp_id: z.string().optional(),
  client_id: z.string().optional(),
});

export type DepositoryAcct = z.infer<typeof DepositoryAcctSchema>;

/**
 * Bank Account Schema
 */
export const BankAcctSchema = z.object({
  ifsc: z.string().optional(),
  no: z.string().optional(),
  type: z.string().optional(),
  name: z.string().optional(),
  branch_name: z.string().optional(),
  bank_city: z.string().optional(),
});

export type BankAcct = z.infer<typeof BankAcctSchema>;

/**
 * Rejection Reason Schema
 */
export const RejectionReasonSchema = z.object({
  by: z.string().optional(),
  reason: z.string().optional(),
});

export type RejectionReason = z.infer<typeof RejectionReasonSchema>;

/**
 * Nomination Schema
 */
export const NominationSchema = z.object({
  first_name: z.string().optional(),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),
  dob: z.string().optional(),
  nomination_relation: z.string().optional(),
  is_minor: z.boolean().optional(),
  nomination_percent: z.number().optional(),
  pan_exempt_category: z.string().optional(),
  identifier: z
    .array(
      z.object({
        identifier_type: z.string().optional(),
        identifier_number: z.string().optional(),
      }),
    )
    .optional(),
  guardian: z
    .object({
      first_name: z.string().optional(),
      middle_name: z.string().optional(),
      last_name: z.string().optional(),
      dob: z.string().optional(),
      identifier: z
        .array(
          z.object({
            identifier_type: z.string().optional(),
            identifier_number: z.string().optional(),
          }),
        )
        .optional(),
      pan_exempt_category: z.string().optional(),
    })
    .optional(),
});

export type Nomination = z.infer<typeof NominationSchema>;

/**
 * Holder Schema
 */
export const HolderSchema = z.object({
  holder_rank: z.string().optional(),
  email: z.string().optional(),
  mobnum: z.string().optional(),
  is_nomination_opted: z.boolean().optional(),
  nomination_auth_mode: z.string().optional(),
});

export type Holder = z.infer<typeof HolderSchema>;

/**
 * BSE Order Data Schema
 * Complete order information from BSE
 */
export const BseOrderDataSchema = z.object({
  id: z.number(),
  exch_order_id: z.string().optional(),
  type: z.string().optional(),
  mem_ord_ref_id: z.string().optional(),
  investor: InvestorSchema.optional(),
  status: z.string().optional(),
  member: z.string().optional(),
  scheme: z.string().optional(),
  scheme_name: z.string().optional().nullable(), // Added: scheme name from SchemeCodeMaster
  amount: z.number().optional(),
  cur: z.string().optional(),
  is_units: z.boolean().optional(),
  all_units: z.boolean().optional(),
  is_fresh: z.boolean().optional(),
  folio_num: z.string().optional(),
  phys_or_demat: z.string().optional(),
  info: OrderInfoSchema.optional(),
  mem_2fa: z.string().optional(),
  mem_2fa_action_at: z.string().optional(),
  mem_paymt: z.string().optional(),
  order_src_info: OrderSourceInfoSchema.optional(),
  email: z.string().optional(),
  mobnum: z.string().optional(),
  placed_at: z.string().optional(),
  exch_mandate_id: z.number().optional(),
  kyc_passed: z.boolean().optional(),
  tracker_id: z.string().optional(),
  depository_acct: DepositoryAcctSchema.optional(),
  bank_acct: BankAcctSchema.optional(),
  dpc: z.boolean().optional(),
  remarks: z.string().optional(),
  dest_scheme: z.string().optional(),
  payment_ref_id: z.string().optional(),
  matched_pa: z.unknown().nullable().optional(),
  pa_matched_at: z.string().optional(),
  matched_bank_rcpt: z.unknown().nullable().optional(),
  bank_matched_at: z.string().optional(),
  full_matched_at: z.string().optional(),
  rejection_reason: RejectionReasonSchema.optional(),
  rta_resp_at: z.string().optional(),
  rta_resp: z.unknown().nullable().optional(),
  dp_resp: z.unknown().nullable().optional(),
  refund_details: z.unknown().nullable().optional(),
  manually_updated_at: z.string().optional(),
  manually_updated_by: z.string().optional(),
  threshold_isapproved: z.boolean().optional(),
  threshold_app_rej_by: z.string().optional(),
  threshold_app_rej_at: z.string().optional(),
  expires_at: z.string().optional(),
  order_added_at: z.string().optional(),
  history: z.array(OrderHistoryEventSchema).optional(),
  matched_bank_rcpt_id: z.number().optional(),
  matched_pa_ids: z.number().optional(),
  dest_folio: z.string().optional(),
  expiresat: z.string().optional(),
  nomination: z.array(NominationSchema).optional(),
  holder: z.array(HolderSchema).optional(),
  settlement_no: z.string().optional(),
  rta_txn_no: z.string().optional(),
  rta_remark: z.unknown().nullable().optional(),
  reg_no: z.string().optional(),
  payment_aggr_code: z.string().optional(),
  settlement_date: z.string().optional(),
  settlement_type: z.string().optional(),
  pg_ref_no: z.string().optional(),
  fund_receipt_date: z.string().optional(),
  allotment_details: z.unknown().nullable().optional(),
  redempt_details: z.unknown().nullable().optional(),
});

export type BseOrderData = z.infer<typeof BseOrderDataSchema>;

/**
 * BSE Order Get Response Schema
 * Complete response structure from BSE API
 */
export const BseOrderGetResponseSchema = z.object({
  status: z.string(),
  data: BseOrderDataSchema.nullable(),
  messages: z
    .array(
      z.object({
        msgid: z.number().optional(),
        errcode: z.string().optional(),
        field: z.string().optional(),
        vals: z.array(z.string()).optional(),
      }),
    )
    .nullable(),
});

export type BseOrderGetResponse = z.infer<typeof BseOrderGetResponseSchema>;

/**
 * API Order Get Response Schema
 * Wrapper response returned by our API endpoint
 */
export const ApiOrderGetResponseSchema = z.object({
  status: z.string(),
  data: BseOrderDataSchema.nullable().or(z.unknown()),
  messages: z.array(z.unknown()),
});

export type ApiOrderGetResponse = z.infer<typeof ApiOrderGetResponseSchema>;
