import { z } from 'zod';

/**
 * Order Get Request Body Schema
 * Used for fetching order details from BSE
 */
export const OrderGetRequestBodySchema = z.object({
  id: z.number().int().positive(), // BSE Order ID
  filter_param: z
    .object({
      open_close: z.enum(['o', 'c']).optional(), // 'o' for open, 'c' for closed orders
    })
    .optional(),
});

/**
 * BSE Order Data Schema
 * Represents the complete order data structure from BSE
 */
export const BseOrderDataSchema = z.object({
  id: z.number(),
  exch_order_id: z.string().optional(),
  type: z.string().optional(),
  mem_ord_ref_id: z.string().optional(),
  investor: z
    .object({
      ucc: z.string(),
    })
    .optional(),
  parent_client_code: z.string().optional(),
  status: z.string().optional(),
  member: z.string().optional(),
  scheme: z.string().optional(),
  scheme_name: z.string().optional(),
  amount: z.number().optional(),
  cur: z.string().optional(),
  is_units: z.boolean().optional(),
  all_units: z.boolean().optional(),
  is_fresh: z.boolean().optional(),
  folio_num: z.string().optional(),
  phys_or_demat: z.string().optional(),
  info: z
    .object({
      min_redeem_flag: z.boolean().optional(),
      src: z.string().optional(),
      reg_no: z.string().optional(),
      mem_details: z
        .object({
          broker_arn: z.string().optional(),
          euin_flag: z.any().optional(),
          euin: z.string().optional(),
          sub_br_code: z.string().optional(),
          sub_br_arn: z.string().optional(),
          partner_id: z.string().optional(),
          mem_type: z.string().optional(),
          broker_code: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  mem_2fa: z.string().optional(),
  mem_2fa_action_at: z.string().optional(),
  mem_paymt: z.string().optional(),
  order_src_info: z
    .object({
      src_isin: z.string().optional(),
      src_sch_rta_code: z.string().optional(),
      src_sch_opt: z.string().optional(),
      sip_rgdt: z.string().optional(),
      sip_fq: z.string().optional(),
      sip_st_dt: z.string().optional(),
      sip_end_dt: z.string().optional(),
      src_allowed_inst: z.number().optional(),
      is_new_order: z.boolean().optional(),
    })
    .optional(),
  email: z.string().optional(),
  mobnum: z.string().optional(),
  placed_at: z.string().optional(),
  order_added_at: z.string().optional(),
  exch_mandate_id: z.number().optional(),
  kyc_passed: z.boolean().optional(),
  tracker_id: z.string().optional(),
  depository_acct: z
    .object({
      depository: z.string().optional(),
      dp_id: z.string().optional(),
      client_id: z.string().optional(),
    })
    .optional(),
  bank_acct: z
    .object({
      ifsc: z.string().optional(),
      no: z.string().optional(),
      type: z.string().optional(),
      name: z.string().optional(),
      branch_name: z.string().optional(),
      bank_city: z.string().optional(),
    })
    .optional(),
  dpc: z.boolean().optional(),
  remarks: z.string().optional(),
  dest_scheme: z.string().optional(),
  payment_ref_id: z.string().optional(),
  matched_pa: z.any().optional(),
  pa_matched_at: z.string().optional(),
  matched_bank_rcpt: z.any().optional(),
  bank_matched_at: z.string().optional(),
  full_matched_at: z.string().optional(),
  rejection_reason: z
    .object({
      by: z.string().optional(),
      reason: z.string().optional(),
    })
    .optional(),
  rta_resp_at: z.string().optional(),
  rta_resp: z.any().optional(),
  dp_resp: z.any().optional(),
  refund_details: z.any().optional(),
  manually_updated_at: z.string().optional(),
  manually_updated_by: z.string().optional(),
  threshold_isapproved: z.boolean().optional(),
  threshold_app_rej_by: z.string().optional(),
  threshold_app_rej_at: z.string().optional(),
  expires_at: z.string().optional(),
  history: z
    .array(
      z.object({
        event_status: z.string(),
        msg: z.string(),
        when: z.string(),
        user: z.string(),
      }),
    )
    .optional(),
  matched_bank_rcpt_id: z.number().optional(),
  matched_pa_ids: z.number().optional(),
  dest_folio: z.string().optional(),
  expiresat: z.string().optional(),
  nomination: z.any().optional(),
  holder: z
    .array(
      z.object({
        holder_rank: z.string().optional(),
        email: z.string().optional(),
        mobnum: z.string().optional(),
        is_nomination_opted: z.boolean().optional(),
        nomination_auth_mode: z.string().optional(),
      }),
    )
    .optional(),
  settlement_no: z.string().optional(),
  rta_txn_no: z.string().optional(),
  rta_remark: z.any().optional(),
  reg_no: z.string().optional(),
  payment_aggr_code: z.string().optional(),
  settlement_date: z.string().optional(),
  settlement_type: z.string().optional(),
  pg_ref_no: z.string().optional(),
  fund_receipt_date: z.string().optional(),
  allotment_details: z.any().optional(),
  redempt_details: z.any().optional(),
  payout_details: z.any().optional(),
  scheme_tat: z.string().optional(),
});

/**
 * API Order Get Response Schema
 */
export const ApiOrderGetResponseSchema = z.object({
  status: z.string(),
  data: BseOrderDataSchema.optional(),
  messages: z.array(z.string()).optional(),
});

// Inferred TypeScript types
export type OrderGetRequestBody = z.infer<typeof OrderGetRequestBodySchema>;
export type BseOrderData = z.infer<typeof BseOrderDataSchema>;
export type ApiOrderGetResponse = z.infer<typeof ApiOrderGetResponseSchema>;
