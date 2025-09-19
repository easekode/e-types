import { z } from 'zod';
import { DateObjOrString } from './date';
import { amcSchema } from './amc';
import { fundCategorySchema } from './fundCategory';
import { fundReturnLatestSchema } from './fundReturnLatest';
import { fundsRatingsSchema } from './fundsRatings';
import { fundExpenseSchema } from './fundExpense';
import { navSchema } from './nav';
import { fundAumSchema } from './fundAum';
import { holdingsSecurityLatestSchema } from './holdingsSecurityLatest';
import { fundHoldingsSicSectorwiseImputedLatestSchema } from './fundHoldingsSicSectorwiseImputedLatest';
import { fundManagerLatestSchema } from './fundManagerLatest';
import { statsVariablesSchema } from './statsVariables';
import { fundStyleboxSchema } from './fundStylebox';
import { colourCodeSchema } from './colourCode';
import { compositionSchema } from './composition';
import { rtaCodesSchema } from './rtaCodes';
import { fundEventsSchema } from './fundEvents';

export const fundsSchema = z.object({
  plan_id: z.string(),
  basic_name: z.string(),
  short_name: z.string(),
  plan_name: z.string(),
  basic_short_name: z.string(),
  scheme_name: z.string(),
  amc_id: z.string(),
  category_id: z.string(),
  type_id: z.string(),
  face_value: z.number().nullable().optional(),
  min_initial_investment: z.number().nullable().optional(),
  min_subsequent_investment: z.number().nullable().optional(),
  min_withdrawl_amount: z.number().nullable().optional(),
  sip: z.boolean(),
  min_subsequent_sip_investment: z.number().nullable().optional(),
  sip_note: z.string().nullable().optional(),
  swp: z.boolean(),
  stp: z.boolean(),
  issue_open: z.string().nullable().optional(),
  issue_stated_close: z.string().nullable().optional(),
  issue_actual_close: z.string().nullable().optional(),
  allottment_date: z.string().nullable().optional(),
  late_redemption: z.string().nullable().optional(),
  resale_start_date: z.string().nullable().optional(),
  transfer_agent: z.string().nullable().optional(),
  transfer_agent_short_name: z.string().nullable().optional(),
  transfer_agent_email: z.string().nullable().optional(),
  amfi_code: z.string().nullable().optional(),
  min_balance: z.number().nullable().optional(),
  objective_text: z.string().nullable().optional(),
  benchmark: z.string().nullable().optional(),
  dividend_periodicity: z.string().nullable().optional(),
  minor_investments_allowed: z.boolean().nullable().optional(),
  is_retirement_fund: z.boolean().nullable().optional(),
  is_interval_fund: z.boolean().nullable().optional(),
  comm_max: z.number().nullable().optional(),
  min_swp_widw: z.number().nullable().optional(),
  redemption_note: z.string().nullable().optional(),
  equity_max: z.number().nullable().optional(),
  equity_min: z.number().nullable().optional(),
  debt_max: z.number().nullable().optional(),
  debt_min: z.number().nullable().optional(),
  money_mkt_max: z.number().nullable().optional(),
  money_mkt_min: z.number().nullable().optional(),
  colour: z.string().nullable().optional(),
  isin_code: z.string().nullable().optional(),
  modified_ts: DateObjOrString.nullable().optional(),
  is_dividend: z.boolean().nullable().optional(),
  auditor_code: z.string().nullable().optional(),
  custodian_code: z.string().nullable().optional(),
  is_direct_plan: z.boolean().nullable().optional(),
  reg_plan_id: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  new_fund: z.boolean().nullable().optional(),
  comm_min: z.number().nullable().optional(),
  is_etf_fund: z.boolean().nullable().optional(),
  lock_in: z.boolean().nullable().optional(),
  lock_in_period_days: z.string().nullable().optional(),
  variant: z.boolean().nullable().optional(),
  variant_fund_id: z.string().nullable().optional(),
  is_rgess_plan: z.boolean().nullable().optional(),
  min_widw_unit: z.number().nullable().optional(),
  min_subsequent_investment_unit: z.number().nullable().optional(),
  min_investment_multiples: z.number().nullable().optional(),
  transaction_status: z.string().nullable().optional(),
  stated_annual_expense: z.number().nullable().optional(),
  max_inv_amount: z.number().nullable().optional(),
  is_fof: z.boolean().nullable().optional(),
  last_etf_trade_date: DateObjOrString.nullable().optional(),
  is_index_fund: z.boolean().nullable().optional(),
  min_withdrawal_multiple_amount: z.number().nullable().optional(),
  interest_risk_name: z.string().nullable().optional(),
  credit_risk_name: z.string().nullable().optional(),
  potential_risk_class: z.string().nullable().optional(),
  fund_name: z.string().nullable().optional(),
  equity_derivatives_min: z.number().nullable().optional(),
  equity_derivatives_max: z.number().nullable().optional(),
  reit_invit_min: z.number().nullable().optional(),
  reit_invit_max: z.number().nullable().optional(),
  fund_objective_description: z.string().nullable().optional(),
  fund_id: z.string().nullable().optional(),
  instant_redemption_facility: z.boolean().nullable().optional(),
  nsdl_code: z.string().nullable().optional(),
  createdAt: DateObjOrString,
  updatedAt: DateObjOrString,
  amc: amcSchema.optional(),
  marketCapCategory: fundCategorySchema.optional(),
  // related/nested entities
  navRecords: z.array(navSchema).nullable().optional(),
  fundReturns: fundReturnLatestSchema.nullable().optional(),
  fundRatings: fundsRatingsSchema.nullable().optional(),
  fundExpenses: z.array(fundExpenseSchema).nullable().optional(),
  colourCode: colourCodeSchema.nullable().optional(),
  fundAum: z.array(fundAumSchema).nullable().optional(),
  holdingsSecurityLatest: z
    .array(holdingsSecurityLatestSchema)
    .nullable()
    .optional(),
  fundHoldingsSicSectorwise: z
    .array(fundHoldingsSicSectorwiseImputedLatestSchema)
    .nullable()
    .optional(),
  fundManagerLatest: z.array(fundManagerLatestSchema).nullable().optional(),
  statsVariables: statsVariablesSchema.nullable().optional(),
  fundStylebox: z.array(fundStyleboxSchema).nullable().optional(),
  composition: z.array(compositionSchema).nullable().optional(),
  rtaCodes: z.array(rtaCodesSchema).nullable().optional(),
  fundEvents: z.array(fundEventsSchema).nullable().optional(),
});

export const NewFundsSchema = fundsSchema.omit({
  plan_id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateFundsSchema = fundsSchema
  .omit({ plan_id: true, createdAt: true, updatedAt: true })
  .partial();

export type Funds = z.infer<typeof fundsSchema>;
export type NewFunds = z.infer<typeof NewFundsSchema>;
export type UpdateFunds = z.infer<typeof UpdateFundsSchema>;
