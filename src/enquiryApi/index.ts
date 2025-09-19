import type { PaginationParams } from '../api';
import { EnquiryListFilter, EnquirySortBy } from './filter';
export * from './filter';

export type EnquiryListQueryParams = PaginationParams<
  EnquiryListFilter,
  EnquirySortBy
>;

// Lead shape returned by API for list/detail, with included relations
export interface Eligibility {
  id: string;
  tenure: number;
  rate: number;
  amt: number;
  emi: number;
  expectedAmt: string; // Decimal as string
  emiForExptAmt: string; // Decimal as string
  leadId: string;
}

export interface Quote {
  id: string;
  leadId: string;
  type: 'AUTO' | 'HOME' | 'LIFE' | 'HEALTH' | 'BUSINESS';
  premium: string; // Decimal as string
  coverage: unknown;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  validUntil: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Lead {
  id: string;
  userId: string | null;
  email: string | null;
  name: string | null;
  salutation: string | null;
  phone: string | null;
  dob: string | null;
  pan: string | null;
  pinCode: string | null;
  hasExistingLoan: boolean | null;
  monthlyEmiAmount: string | null;
  salary: string | null;
  orgType: 'GOVT' | 'NON_GOV' | null;
  department: string | null;
  employerName: string | null;
  loanType: string | null;
  expectedAmount: string | null;
  salarySlip: string[];
  isSubmitted: boolean | null;
  status: import('./filter').LeadStatus;
  source: string | null;
  notes: string | null;
  assignedToId: string | null;
  createdAt: string;
  updatedAt: string;

  // business fields
  employmentType: string | null;
  businessType: string | null;
  otherBusinessType: string | null;
  enterpriseName: string | null;
  industryType: string | null;
  otherIndustryType: string | null;
  businessEstablishedDate: string | null;
  bankingTurnoverGross: string | null;
  gstRegistered: boolean | null;
  gstNumber: string | null;
  itrFilled: boolean | null;
  netProfit: string | null;
  annualTurnoverGross: string | null;
  hasUdyamRegistration: boolean | null;
  udyamNo: string | null;
  loanAmount: string | null;
  loanTenure: number | null;
  loanEmi: string | null;
  businessOwnershipDoc: string[];

  // profession fields
  registrationDoc: string[];
  professionType: string | null;
  otherProfessionType: string | null;
  degree: string | null;
  otherDegree: string | null;
  specialization: string | null;
  salaryNonSalary: string | null;
  monthlySalary: string | null;
  grossIncome: string | null;
  council: string | null;
  registrationDate: string | null;

  optedEligibilityId: string | null;
  applicationId: string | null;

  quotes: Quote[];
  optedEligibility: Eligibility | null;
}

export interface EnquiryListResponse {
  enquiries: Lead[];
  total: number;
}
