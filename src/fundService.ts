import { z } from 'zod';

// Fund Service Return Types

// For getOne method
export const fundServiceGetOneResponseSchema = z.object({
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
  amc: z
    .object({
      amc_short_name: z.string(),
      amc_full_name: z.string(),
    })
    .nullable()
    .optional(),
  marketCapCategory: z
    .object({
      category_name: z.string(),
      primary_category_name: z.string(),
    })
    .nullable()
    .optional(),
  colourCode: z
    .object({
      risk: z.string(),
      colour_name: z.string(),
    })
    .nullable()
    .optional(),
  fundReturns: z
    .object({
      ret_1year: z.number().nullable().optional(),
      ret_2year: z.number().nullable().optional(),
      ret_3year: z.number().nullable().optional(),
      ret_5year: z.number().nullable().optional(),
      ret_since_launch: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
  fundRatings: z
    .object({
      fund_rating: z.number().nullable().optional(),
      risk_grade: z.string().nullable().optional(),
      return_grade: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  navRecords: z
    .array(
      z.object({
        nav: z.number(),
        nav_date: z.string(),
      }),
    )
    .optional(),
  fundExpenses: z
    .array(
      z.object({
        expense_ratio: z.number().nullable().optional(),
        as_on_date: z.string(),
      }),
    )
    .optional(),
});

// For getAll method (transformed result)
export const fundServiceGetAllItemSchema = z.object({
  plan_id: z.string(),
  basic_name: z.string(),
  short_name: z.string(),
  plan_name: z.string(),
  basic_short_name: z.string(),
  scheme_name: z.string(),
  fund_name: z.string().nullable().optional(),
  min_investment_multiples: z.number().nullable().optional(),
  min_initial_investment: z.number().nullable().optional(),
  min_subsequent_investment: z.number().nullable().optional(),
  min_subsequent_sip_investment: z.number().nullable().optional(),
  amc: z
    .object({
      amc_short_name: z.string(),
      amc_full_name: z.string(),
    })
    .nullable()
    .optional(),
  marketCapCategory: z
    .object({
      category_name: z.string(),
    })
    .nullable()
    .optional(),
  colourCode: z
    .object({
      risk: z.string(),
    })
    .nullable()
    .optional(),
  fundRatings: z
    .object({
      fund_rating: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
  fundReturns: z
    .object({
      ret_1year: z.number().nullable().optional(),
      ret_2year: z.number().nullable().optional(),
      ret_3year: z.number().nullable().optional(),
      ret_5year: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
  navRecords: z
    .object({
      nav: z.number(),
    })
    .nullable()
    .optional(),
  fundExpenses: z
    .object({
      expense_ratio: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
});

// For getFundInfo method
export const fundServiceGetFundInfoResponseSchema = z.object({
  plan_id: z.string(),
  scheme_name: z.string(),
  min_subsequent_sip_investment: z.number().nullable().optional(),
  min_initial_investment: z.number().nullable().optional(),
  min_investment_multiples: z.number().nullable().optional(),
  min_subsequent_investment_unit: z.number().nullable().optional(),
  inception_date: z.string().nullable().optional(),
  amc: z
    .object({
      amc_short_name: z.string(),
      amc_full_name: z.string(),
    })
    .nullable()
    .optional(),
  marketCapCategory: z
    .object({
      category_name: z.string(),
    })
    .nullable()
    .optional(),
  colourCode: z
    .object({
      risk: z.string(),
    })
    .nullable()
    .optional(),
  fundRatings: z
    .object({
      fund_rating: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
  fundReturns: z
    .object({
      ret_1year: z.number().nullable().optional(),
      ret_2year: z.number().nullable().optional(),
      ret_3year: z.number().nullable().optional(),
      ret_4year: z.number().nullable().optional(),
      ret_5year: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
  navRecords: z
    .object({
      nav: z.number(),
      nav_date: z.string(),
    })
    .nullable()
    .optional(),
  fundExpenses: z
    .object({
      expense_ratio: z.number().nullable().optional(),
      as_on_date: z.string(),
    })
    .nullable()
    .optional(),
  fundAum: z
    .object({
      aum: z.number(),
      as_on_date: z.string(),
    })
    .nullable()
    .optional(),
  fundManagers: z.array(
    z.object({
      name: z.string().nullable(),
      education: z.string().nullable(),
      person_type: z.string().nullable().optional(),
      date_from: z.date(),
    }),
  ),
});

// For getFundPerformance method
export const fundServiceGetFundPerformanceResponseSchema = z.object({
  plan_id: z.string(),
  navHistory: z.array(
    z.object({
      nav: z.number(),
      nav_date: z.string(),
    }),
  ),
  fundReturns: z
    .object({
      ret_1year: z.number().nullable().optional(),
      ret_2year: z.number().nullable().optional(),
      ret_3year: z.number().nullable().optional(),
      ret_4year: z.number().nullable().optional(),
      ret_5year: z.number().nullable().optional(),
    })
    .nullable(),
});

// For getFundPortfolio method
export const fundServiceGetFundPortfolioResponseSchema = z.object({
  plan_id: z.string(),
  holdings: z.array(
    z.object({
      company: z.string(),
      security_name: z.string(),
      asset_percentage: z.number().nullable().optional(),
    }),
  ),
});

// For getFundSectorAllocation method
export const fundServiceGetFundSectorAllocationResponseSchema = z.object({
  plan_id: z.string(),
  sectorAllocations: z.array(
    z.object({
      plan_id: z.string(),
      sector_code: z.string(),
      as_on_date: z.string(),
      percentage: z.number(),
      modified_ts: z.date(),
      sicSector: z.object({
        sector_name: z.string(),
      }),
    }),
  ),
  statsVariables: z
    .object({
      plan_id: z.string(),
      as_on_date: z.date(),
      standard_deviation: z.number().nullable().optional(),
      mean: z.number().nullable().optional(),
      sharpe_ratio: z.number().nullable().optional(),
      rsquared: z.number().nullable().optional(),
      beta: z.number().nullable().optional(),
      alpha: z.number().nullable().optional(),
      information_ratio: z.number().nullable().optional(),
      sortino_ratio: z.number().nullable().optional(),
      rating_date: z.date().nullable().optional(),
      alpha_stated: z.number().nullable().optional(),
      beta_stated: z.number().nullable().optional(),
      rsquare_stated: z.number().nullable().optional(),
      modified_ts: z.date(),
      treynor: z.number().nullable().optional(),
      treynor_stated: z.number().nullable().optional(),
    })
    .nullable(),
  fundStylebox: z
    .object({
      plan_id: z.string(),
      scrip_date: z.date(),
      rank: z.string().nullable().optional(),
      scrip_style: z.string().nullable().optional(),
      pescore: z.number().nullable().optional(),
      pbscore: z.number().nullable().optional(),
      giant_percentage: z.number().nullable().optional(),
      large_percentage: z.number().nullable().optional(),
      mid_percentage: z.number().nullable().optional(),
      small_percentage: z.number().nullable().optional(),
      tiny_percentage: z.number().nullable().optional(),
      modified_ts: z.date(),
    })
    .nullable(),
});

// Export types
export type FundServiceGetOneResponse = z.infer<
  typeof fundServiceGetOneResponseSchema
>;
export type FundServiceGetAllItem = z.infer<typeof fundServiceGetAllItemSchema>;
export type FundServiceGetFundInfoResponse = z.infer<
  typeof fundServiceGetFundInfoResponseSchema
>;
export type FundServiceGetFundPerformanceResponse = z.infer<
  typeof fundServiceGetFundPerformanceResponseSchema
>;
export type FundServiceGetFundPortfolioResponse = z.infer<
  typeof fundServiceGetFundPortfolioResponseSchema
>;
export type FundServiceGetFundSectorAllocationResponse = z.infer<
  typeof fundServiceGetFundSectorAllocationResponseSchema
>;
