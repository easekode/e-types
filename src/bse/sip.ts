import { z } from 'zod';
import {
  SIPTransactionCode,
  SIPTransMode,
  SIPDPTxn,
  SIPFrequencyType,
  SIPEuinDeclarationFlag,
  SIPFirstOrderFlag,
} from './enums';

// SIP Order Entry Request Schema
export const SipOrderEntryRequestSchema = z.object({
  TransactionCode: z.nativeEnum(SIPTransactionCode), // New SIP or Cancel SIP
  UniqueRefNo: z.string(), // Unique reference number (YYYYMMDD<usercode>000001)
  SchemeCode: z.string(), // BSE scheme code
  MemberCode: z.string(), // BSE member code
  ClientCode: z.string(), // BSE client code
  UserID: z.number(), // User ID
  InternalRefNo: z.string().optional(), // Internal reference number or PG reference no (optional)
  TransMode: z.nativeEnum(SIPTransMode), // Demat or Physical (D/P)
  DpTxnMode: z.nativeEnum(SIPDPTxn), // CDSL/NSDL/PHYSICAL
  StartDate: z.string(), // Start date (DD/MM/YYYY)
  FrequencyType: z.nativeEnum(SIPFrequencyType), // Frequency type
  FrequencyAllowed: z.number(), // Rolling frequency (1)
  InstallmentAmount: z.number(), // Installment amount
  NoOfInstallments: z.number(), // Number of installments
  Remarks: z.string().optional(),
  FolioNo: z.string().optional(), // Mandatory if physical SIP
  FirstOrderFlag: z.nativeEnum(SIPFirstOrderFlag), // First order today flag
  SubBrCode: z.string().optional(), // Sub Broker code (optional)
  EUIN: z.string().optional(), // EUIN number
  EUINVal: z.nativeEnum(SIPEuinDeclarationFlag), // EUIN declaration flag
  DPC: z.literal('Y'), // DPC flag
  RegId: z.number().optional(), // SIP registration number (blank for new)
  IPAdd: z.string().optional(), // IP Address (optional)
  Password: z.string(), // Encrypted password
  PassKey: z.string(), // Pass key
  Param1: z.string().optional(), // Sub Broker ARN code (optional)
  Param2: z.string().optional(), // End Date for Daily SIP (DD/MM/YYYY) (mandatory only for daily SIP)
  Param3: z.string().optional(), // Mobile No (optional)
  Filler1: z.string().optional(), // Email ID (optional)
  Filler2: z.string().optional(),
  Filler3: z.string().optional(),
  Filler4: z.string().optional(),
  Filler5: z.string().optional(),
  Filler6: z.string().optional(),
});

// Inferred type from Zod schema
export type SipOrderEntryRequest = z.infer<typeof SipOrderEntryRequestSchema>;
