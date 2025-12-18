/**
 * BSE SxP (SIP/SWP/STP) Registration Request Schema
 * 
 * Example SIP Request:
 * {
 *   "data": {
 *     "sxp_type": "sip",
 *     "mem_sxp_ref_id": "DUMMY-SXP-001",
 *     "investor": { "ucc": "DUMMYUCC0001" },
 *     "member": "00000",
 *     "src_scheme": "DUMMY-SCHEME-GR",
 *     "amount": 1000,
 *     "cur": "INR",
 *     "is_fresh": true,
 *     "phys_or_demat": "d",
 *     "start_date": "2025-10-09",
 *     "freq": "m",
 *     "is_nomination_opted": false,
 *     "holder": [{ "holder_rank": "1", "email": "test@example.com", "mobnum": "+919000000001" }]
 *   }
 * }
 */

import { z } from 'zod';
import {
  SxPType,
  SxPFrequency,
  PhysicalOrDemat,
  Currency,
  YesNo,
  HolderRank,
  NominationAuthMode,
  BankAccountType,
  DepositoryCode,
} from '../bse/enums/v2Enums';
import { bseSuccessResponseSchema } from '../bse/success';

// Investor schema
const InvestorSchema = z.object({
  ucc: z.string().describe('Unique Client Code'),
});

// Holder schema
const HolderSchema = z.object({
  holder_rank: z.nativeEnum(HolderRank).describe('Holder rank (1, 2, 3, -1 for guardian)'),
  email: z.string().email().describe('Holder email address'),
  mobnum: z.string().describe('Holder mobile number with country code'),
});

// Bank account schema (optional)
const BankAccountSchema = z.object({
  ifsc: z.string().describe('Bank IFSC code'),
  no: z.string().describe('Bank account number'),
  type: z.nativeEnum(BankAccountType).describe('Bank account type'),
});

// Depository account schema (optional)
const DepositoryAccountSchema = z.object({
  depository: z.nativeEnum(DepositoryCode).describe('Depository provider'),
  dp_id: z.string().describe('Depository participant ID'),
  client_id: z.string().describe('Client ID with depository'),
});

// Main SxP Request Schema
export const SxPRequestSchema = z.object({
  // ========== MANDATORY FIELDS ==========
  sxp_type: z.nativeEnum(SxPType).describe('Type of systematic transaction: sip, swp, stp, sprod, topup'),
  mem_sxp_ref_id: z.string().describe('Member SxP reference ID (unique identifier)'),
  investor: InvestorSchema.describe('Investor details with UCC'),
  member: z.string().describe('Member code'),
  src_scheme: z.string().describe('Source scheme code (BSE scheme code)'),
  amount: z.number().positive().describe('Transaction amount'),
  cur: z.nativeEnum(Currency).default(Currency.INR).describe('Currency (INR)'),
  is_fresh: z.boolean().describe('Whether this is a fresh SxP registration'),
  phys_or_demat: z.nativeEnum(PhysicalOrDemat).describe('Physical or Demat mode'),
  start_date: z.string().describe('SxP start date (YYYY-MM-DD)'),
  freq: z.nativeEnum(SxPFrequency).describe('Frequency: d, w, m, q, h, y'),
  is_nomination_opted: z.boolean().describe('Whether nomination is opted'),
  holder: z.array(HolderSchema).min(1).describe('Array of holders (at least primary holder)'),

  // ========== OPTIONAL FIELDS ==========
  kyc_passed: z.boolean().optional().describe('KYC verification status'),
  dest_scheme: z.string().optional().describe('Destination scheme (for STP)'),
  amc_code: z.string().optional().describe('AMC code'),
  exch_mandate_id: z.number().optional().describe('Exchange mandate ID'),
  src_folio: z.string().optional().describe('Source folio number'),
  dest_folio: z.string().optional().describe('Destination folio number (for STP)'),
  isunits: z.boolean().optional().describe('Whether transaction is in units'),
  end_date: z.string().nullable().optional().describe('SxP end date (YYYY-MM-DD)'),
  txn_date: z.number().optional().describe('Transaction date of the month'),
  payment_ref_id: z.string().optional().describe('Payment reference ID'),
  remark: z.string().optional().describe('Additional remarks'),
  dpc: z.boolean().optional().describe('DPC flag'),
  email: z.string().email().optional().describe('Primary email address'),
  mobnum: z.string().optional().describe('Primary mobile number'),
  first_order_today: z.boolean().optional().describe('Whether first order is today'),
  brokerage: z.number().optional().describe('Brokerage percentage'),
  ninstallments: z.number().optional().describe('Number of installments'),
  depository_acct: DepositoryAccountSchema.optional().describe('Depository account details'),
  bank_acct: BankAccountSchema.optional().describe('Bank account details'),
  nomination_auth_mode: z.nativeEnum(NominationAuthMode).optional().describe('Nomination authentication mode'),
});

// Inferred TypeScript type
export type SxPRequest = z.infer<typeof SxPRequestSchema>;

// BSE SxP Registration Response Schema
// Two possible response formats:
// 1. Standard response: { data: { id: "98765432123456789" } }
// 2. First Order Today (FOT=true): { data: { order_id: 0, sxp_id: "98765432123456789" } }
export const SxPRegisterResponseSchema =bseSuccessResponseSchema.extend({
  data: z.union([
    // Standard response
    z.object({
      id: z.string().describe('SxP registration ID'),
    }),
    // First Order Today response (FOT=true)
    z.object({
      order_id: z.number().describe('Order ID (when first_order_today is true)'),
      sxp_id: z.string().describe('SxP registration ID'),
    }),
  ]),
});

// Inferred TypeScript type for response
export type SxPRegisterResponse = z.infer<typeof SxPRegisterResponseSchema>;

// Export the schema as default
export default SxPRequestSchema;