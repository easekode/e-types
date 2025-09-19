/**
 * Filters and sorting for Enquiry API
 */

// Reuse LoanType from shared lead schema to avoid duplication
import type { LoanType } from '../leadSchema';

// Keep in sync with server enum in prisma/schema.prisma
export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'CONVERTED'
  | 'LOST'
  | 'NOT_QUALIFIED';

export interface EnquiryListFilter {
  search?: string;
  status?: LeadStatus;
  loanType?: LoanType;
}

// Currently supported sort field from the API
export const ENQUIRY_SORT_FIELDS = ['createdAt'] as const;
export type EnquirySortBy = (typeof ENQUIRY_SORT_FIELDS)[number];
