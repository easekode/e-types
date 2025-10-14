import { z } from 'zod';

export const CreateOrderSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  goalId: z.string(),
  investmentMode: z.enum(['SIP', 'LUMPSUM'], {
    errorMap: () => ({ message: 'Investment mode must be SIP or LUMPSUM' }),
  }),
  amount: z.number().positive('Amount must be positive'),
});

// Zod schemas for order types
export const CreateOrderParamsSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  goalId: z.string(),
  investmentMode: z.enum(['SIP', 'LUMPSUM'], {
    errorMap: () => ({ message: 'Investment mode must be SIP or LUMPSUM' }),
  }),
  amount: z.number().positive('Amount must be positive'),
  userId: z.string().min(1, 'User ID is required'),
});

export const OrderEntryResultSchema = z.object({
  TransCode: z.string().optional(),
  TransNo: z.string().optional(),
  OrderId: z.string().optional(),
  UserID: z.string().optional(),
  MemberId: z.string().optional(),
  ClientCode: z.string().optional(),
  BSERemarks: z.string().optional(),
  SuccessFlag: z.string().optional(),
});

// Inferred types from schemas
export type CreateOrderParams = z.infer<typeof CreateOrderParamsSchema>;
export type OrderEntryResult = z.infer<typeof OrderEntryResultSchema>;

export interface PurchaseRequestParams {
  transCode: string;
  transNo: string;
  orderId?: string;
  userId: string;
  memberId: string;
  clientCode: string;
  schemeCd: string;
  buySell: string;
  buySellType: string;
  dpTxn: string;
  orderVal: string;
  qty?: string;
  allRedeem: string;
  folioNo?: string;
  remarks?: string;
  kycStatus: string;
  refNo?: string;
  subBrCode?: string;
  euin?: string;
  euinVal: string;
  minRedeem: string;
  dpc: string;
  ipAdd?: string;
  password: string;
  passKey: string;
  param1?: string;
  param2?: string;
  param3?: string;
  mobileNo?: string;
  emailId?: string;
  mandateId?: string;
  filler1?: string;
  filler2?: string;
  filler3?: string;
  filler4?: string;
  filler5?: string;
  filler6?: string;
}
