/**
 * Utility functions for handling lead status
 */

// Lead Status Enum based on e-types leadSchema
export enum LeadStatusEnum {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  CONVERTED = 'CONVERTED',
  LOST = 'LOST',
  NOT_QUALIFIED = 'NOT_QUALIFIED',
}

// Status Color Constants
export const STATUS_COLORS = {
  [LeadStatusEnum.NEW]: '#FF9C3E', // Orange for pending
  [LeadStatusEnum.CONTACTED]: '#FF9C3E', // Orange for pending
  [LeadStatusEnum.QUALIFIED]: '#27AE60', // Green for completed
  [LeadStatusEnum.CONVERTED]: '#27AE60', // Green for completed
  [LeadStatusEnum.LOST]: '#E74C3C', // Red for rejected
  [LeadStatusEnum.NOT_QUALIFIED]: '#E74C3C', // Red for rejected
  DEFAULT: '#FF9C3E', // Default to orange
} as const;

// Status Display Names
export const STATUS_DISPLAY_NAMES = {
  [LeadStatusEnum.NEW]: 'Pending',
  [LeadStatusEnum.CONTACTED]: 'In Progress',
  [LeadStatusEnum.QUALIFIED]: 'Qualified',
  [LeadStatusEnum.CONVERTED]: 'Completed',
  [LeadStatusEnum.LOST]: 'Rejected',
  [LeadStatusEnum.NOT_QUALIFIED]: 'Rejected',
  DEFAULT: 'Pending',
} as const;

/**
 * Get the display color for a lead status
 * @param status - The lead status
 * @returns The color hex code for the status
 */
export const getLeadStatusColor = (status?: string): string => {
  if (!status) return STATUS_COLORS.DEFAULT;

  const upperStatus = status.toUpperCase() as LeadStatusEnum;
  return STATUS_COLORS[upperStatus] || STATUS_COLORS.DEFAULT;
};

/**
 * Get the display name for a lead status
 * @param status - The lead status
 * @returns The user-friendly display name for the status
 */
export const getLeadStatusDisplayName = (status?: string): string => {
  if (!status) return STATUS_DISPLAY_NAMES.DEFAULT;

  const upperStatus = status.toUpperCase() as LeadStatusEnum;
  return STATUS_DISPLAY_NAMES[upperStatus] || STATUS_DISPLAY_NAMES.DEFAULT;
};

// ---------------- Loan Type Colors ----------------
export enum LoanTypeEnum {
  PERSONAL_LOAN = 'PERSONAL_LOAN',
  HOME_LOAN = 'HOME_LOAN',
  CAR_LOAN = 'CAR_LOAN',
  BUSINESS_LOAN = 'BUSINESS_LOAN',
  EDUCATION_LOAN = 'EDUCATION_LOAN',
  GOLD_LOAN = 'GOLD_LOAN',
  PROPERTY_LOAN = 'PROPERTY_LOAN',
}

export const LOAN_TYPE_COLORS = {
  [LoanTypeEnum.PERSONAL_LOAN]: '#1976D2', // Blue
  [LoanTypeEnum.HOME_LOAN]: '#2E7D32', // Green
  [LoanTypeEnum.CAR_LOAN]: '#00897B', // Teal
  [LoanTypeEnum.BUSINESS_LOAN]: '#6A1B9A', // Purple
  [LoanTypeEnum.EDUCATION_LOAN]: '#3949AB', // Indigo
  [LoanTypeEnum.GOLD_LOAN]: '#F9A825', // Amber
  [LoanTypeEnum.PROPERTY_LOAN]: '#8D6E63', // Brown
  DEFAULT: '#607D8B', // Blue Grey
} as const;

export const getLoanTypeColor = (loanType?: string): string => {
  if (!loanType) return LOAN_TYPE_COLORS.DEFAULT;
  const upper = loanType.toUpperCase() as keyof typeof LOAN_TYPE_COLORS;
  return LOAN_TYPE_COLORS[upper] || LOAN_TYPE_COLORS.DEFAULT;
};
