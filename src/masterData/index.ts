import { LoanConfig, tenuresInMonths } from '../masterDataType';
import { BusinessLoanMasterData } from '../masterDataType';

export const loanAmtLimitPersonal = Object.freeze({
  min: 50000, // 50k
  max: 7500000, // 75 lakh
});

export const loanAmtLimitSelfEmpBusiness = Object.freeze({
  min: 200000, // 2 lakh
  max: 7500000, // 75 lakh
});

export const loanAmtLimitSelfEmpPro = Object.freeze({
  min: 50000, // 50k
  max: 10000000, // 1 crore
});

export const personalLoanMasterData: Readonly<LoanConfig> = Object.freeze({
  interestRate: 12,
  minLoanAmount: loanAmtLimitPersonal.min,
  maxLoanAmount: loanAmtLimitPersonal.max,
  emiStartingFrom: 1099,
  months: tenuresInMonths,
});

export const businessLoanMasterData: Readonly<BusinessLoanMasterData> =
  Object.freeze({
    selfEmployed: Object.freeze({
      interestRate: 13.99,
      minLoanAmount: loanAmtLimitSelfEmpBusiness.min,
      maxLoanAmount: loanAmtLimitSelfEmpBusiness.max,
      emiStartingFrom: 4653,
      months: tenuresInMonths,
    }),
    selfEmployedProfessional: Object.freeze({
      interestRate: 10.5,
      minLoanAmount: loanAmtLimitSelfEmpPro.min,
      maxLoanAmount: loanAmtLimitSelfEmpPro.max,
      emiStartingFrom: 1075,
      months: tenuresInMonths,
    }),
  });
