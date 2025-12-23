import { z } from 'zod';
import {
  Currency,
  PhysicalOrDemat,
  OrderSource,
  OrderTypeCode,
} from '../enums/v2Enums';

const OrderHolderSchema = z.object({
  holder_rank: z.string(),
  email: z.string().email(),
  mobnum: z.string(),
  is_nomination_opted: z.boolean(),
  nomination_auth_mode: z.string().optional(),
});

export const BseOrderSchema = z.object({
  type: z.nativeEnum(OrderTypeCode), // "p" for purchase, "r" for redemption, "s" for switch
  mem_ord_ref_id: z.string(),
  investor: z.object({
    ucc: z.string(),
  }),
  member: z.string(),
  scheme: z.string(),
  amount: z.number(),
  cur: z.nativeEnum(Currency),
  min_redeem_flag: z.boolean(),
  is_fresh: z.boolean(),
  dst_folio: z.string(),
  phys_or_demat: z.nativeEnum(PhysicalOrDemat),
  payment_ref_id: z.string(),
  src: z.nativeEnum(OrderSource),
  holder: z.array(OrderHolderSchema),
  is_nomination_opted: z.boolean(),
})
/**
 * Wrapper schema for the complete BSE order payload
 * This includes the data object with orders array
 */
export const BseOrderPayloadSchema = z.object({
  data: z.object({
    orders: z.array(BseOrderSchema),
  }),
});



export type BseOrder = z.infer<typeof BseOrderSchema>;
export type BseOrderPayload = z.infer<typeof BseOrderPayloadSchema>;


/**
 * Schema for lumpsum order response
 */
export const LumpsumOrderResponseSchema = z.object({
  status: z.string(),
  data: z.object({
    items: z.array(z.object({
  mem_ord_ref_id: z.string(),
  id: z.number(),
  status: z.string(),
})),
  }),
  messages: z.array(z.unknown()),
});

export type LumpsumOrderResponse = z.infer<typeof LumpsumOrderResponseSchema>;
