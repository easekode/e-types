// Master data for Business Loan

export type BusinessLoanType = {
  readonly interestRate: number;
  readonly minLoanAmount: number;
  readonly maxLoanAmount: number;
  readonly emiStartingFrom: number;
  readonly months: readonly number[]; // months array is also readonly
};

export type BusinessLoanMasterData = {
  readonly selfEmployed: BusinessLoanType;
  readonly selfEmployedProfessional: BusinessLoanType;
};

// You can add more master data exports here as needed
