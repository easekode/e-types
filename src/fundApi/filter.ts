/**
 * Filter types for API responses
 */

export interface FundFilterOption {
  label: string;
  id: string;
}

export interface FundFilterOptions {
  categories: FundFilterOption[];
  riskLevels: FundFilterOption[];
}
