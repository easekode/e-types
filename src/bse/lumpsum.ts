import { z } from 'zod';
import {
  OrderEntryTransCode,
  OrderEntryBuySell,
  OrderEntryBuySellType,
  OrderEntryDPTxn,
  OrderEntryAllRedeem,
  OrderEntryKYCStatus,
  OrderEntryEUINVal,
  OrderEntryMinRedeem,
} from './enums';

// Lumpsum Purchase & Redemption Order Entry Request Schema
export const LumpsumOrderEntryRequestSchema = z.object({
  TransCode: z.nativeEnum(OrderEntryTransCode), // Order message type ("NEW" for new order)
  TransNo: z.string(), // Unique reference number (YYYYMMDD<memberid>000001)
  OrderId: z.number().optional(), // BSE unique order number (blank for new order)
  UserID: z.number(), // User ID given by BSE
  MemberId: z.string(), // Member code given by BSE
  ClientCode: z.string(), // Client Code
  SchemeCd: z.string(), // BSE scheme code
  BuySell: z.nativeEnum(OrderEntryBuySell), // Purchase or Redemption
  BuySellType: z.nativeEnum(OrderEntryBuySellType), // Type of buy/sell
  DPTxn: z.nativeEnum(OrderEntryDPTxn), // CDSL/NSDL/PHYSICAL
  OrderVal: z.number().optional(), // Purchase/Redemption amount (mandatory for purchase, optional for redemption)
  Qty: z.number().optional(), // Redemption quantity (mandatory for redemption, either OrderVal or Qty required)
  AllRedeem: z.nativeEnum(OrderEntryAllRedeem), // All units flag
  FolioNo: z.string().optional(), // Folio No (mandatory for physical redemption/purchase additional)
  Remarks: z.string().optional(),
  KYCStatus: z.nativeEnum(OrderEntryKYCStatus), // KYC status
  RefNo: z.string().optional(), // Internal reference number
  SubBrCode: z.string().optional(), // Sub Broker code
  EUIN: z.string().optional(), // EUIN number
  EUINVal: z.nativeEnum(OrderEntryEUINVal), // EUIN declaration flag
  MinRedeem: z.nativeEnum(OrderEntryMinRedeem), // Minimum redemption flag
  DPC: z.literal('Y'), // DPC flag for purchase transactions
  IPAdd: z.string().optional(), // IP Address (optional)
  Password: z.string(), // Encrypted password (session ID)
  PassKey: z.string(), // Passkey
  Param1: z.string().optional(), // Sub Broker ARN (optional)
  Param2: z.string().optional(), // PG Reference No (purchase only, funds mapping)
  Param3: z.string().optional(), // Bank Account No (redemption only)
  MobileNo: z.string().optional(), // 10 digit Indian Mobile No (optional)
  EmailID: z.string().optional(), // Email ID (optional)
  MandateID: z.string().optional(), // Mandate ID (purchase only)
  Filler1: z.string().optional(),
  Filler2: z.string().optional(),
  Filler3: z.string().optional(),
  Filler4: z.string().optional(),
  Filler5: z.string().optional(),
  Filler6: z.string().optional(),
});

// Inferred type from Zod schema
export type LumpsumOrderEntryRequest = z.infer<
  typeof LumpsumOrderEntryRequestSchema
>;
