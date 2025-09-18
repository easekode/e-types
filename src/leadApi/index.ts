import { PaginationParams } from '../api';
import {
  Lead as PrismaLead,
  Eligibility as PrismaEligibility,
  Prisma,
} from '@prisma/client';
import { LeadSortBy, LEAD_SORT_FIELDS } from '../leadSchema';

// Filter options for leads API
export interface LeadFilter {
  status?: string;
  loanType?: string;
  search?: string;
}

// Sort options for leads API
export type { LeadSortBy };
export { LEAD_SORT_FIELDS };

// Query params for GET /leads
export type LeadListQueryParams = PaginationParams<LeadFilter, LeadSortBy>;

// Pagination params for leads API (for backend/frontend sharing)
export interface LeadPaginationParams
  extends PaginationParams<LeadFilter, LeadSortBy> {
  userId: string;
}

// API response type for a single lead
export interface LeadApiResponse extends Omit<PrismaLead, 'optedEligibility'> {
  optedEligibility?: Omit<PrismaEligibility, 'id' | 'leadId'> | null;
  quotes?: Prisma.QuoteGetPayload<{ include: { lead: true } }>[];
}

// Paginated response type for GET /leads
export interface PaginatedLeadListResponse {
  data: LeadApiResponse[];
  page: number;
  total: number;
  pageCount: number;
  limit: number;
}
