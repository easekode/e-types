import { PaginationParams } from '../api';

export * from './filter';
export interface GetAllFilter {
  categoryId?: string;
  riskLevel?: string;
  retPeriod?: string;
}

export type FundSortBy =
  | 'fund_rating'
  | 'min_subsequent_sip_investment'
  | 'ret'
  | 'createdAt';

export type FundListQueryParams = PaginationParams<GetAllFilter, FundSortBy>;
