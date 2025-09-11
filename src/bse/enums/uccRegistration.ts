// Registration Type
export enum UCCRegnType {
  NEW = 'NEW',
  MODIFY = 'MOD',
}

// Tax Status (partial list, expand as needed)
export enum UCCTaxStatus {
  INDIVIDUAL = '01',
  MINOR = '02',
  HUF = '03',
  COMPANY = '04',
  // ... (see file for all tax codes)
  NRI_OTHERS = '11',
  NRE = '21',
  NRO = '24',
}

// Gender
export enum UCCGender {
  MALE = 'M',
  FEMALE = 'F',
  OTHER = 'O',
}

// Occupation Code
export enum UCCOccupation {
  BUSINESS = '01',
  SERVICES = '02',
  PROFESSIONAL = '03',
  AGRICULTURE = '04',
  RETIRED = '05',
  HOUSEWIFE = '06',
  STUDENT = '07',
  OTHERS = '08',
}

// Holding Nature
export enum UCCHoldingNature {
  SINGLE = 'SI',
  JOINT = 'JO',
  ANYONE_SURVIVOR = 'AS',
}

// Account Type
export enum UCCAccountType {
  SAVINGS = 'SB',
  CURRENT = 'CB',
  NRE = 'NE',
  NRO = 'NO',
}

// Dividend Paymode
export enum UCCDividendPaymode {
  CHEQUE = '01',
  DIRECT_CREDIT = '02',
  ECS = '03',
  NEFT = '04',
  RTGS = '05',
}

// Communication Mode
export enum UCCCommunicationMode {
  PHYSICAL = 'P',
  ELECTRONIC = 'E',
  MOBILE = 'M',
}

// PAN Exempt Category
export enum PANExemptCategory {
  SIKKIM_RESIDENT = '01',
  STATE_GOVT = '02',
  CENTRAL_GOVT = '03',
  COURT_OFFICIALS = '04',
  UN_ENTITY = '05',
  OFFICIAL_LIQUIDATOR = '06',
  COURT_RECEIVER = '07',
  MF_INVESTMENT_UPTO_50K = '08',
}

// Yes/No Flag
export enum UCCYesNoFlag {
  YES = 'Y',
  NO = 'N',
}

// Client Type
export enum UCCClientType {
  PHYSICAL = 'P',
  DEMAT = 'D',
}

// KYC Type
export enum UCCKYCType {
  KRA = 'K',
  CKYC = 'C',
  BANK = 'B',
  EXEMPTED = 'E',
}

// Paperless Flag
export enum UCCPaperlessFlag {
  PAPER = 'P',
  PAPERLESS = 'Z',
}
