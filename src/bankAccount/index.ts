import { z } from "zod";
import { ACCOUNT_NUMBER_REGEX } from "../bse/schemas";

export const bnkAccNoSchema = z
    .string()
    .regex(ACCOUNT_NUMBER_REGEX, 'Account number must be 9-20 digits')