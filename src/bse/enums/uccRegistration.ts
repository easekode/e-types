// Registration Type
export enum UCCRegnType {
  NEW = 'NEW',
  MODIFY = 'MOD',
}

export enum UCCTaxStatus {
  INDIVIDUAL = '01',
  MINOR = '02',
  HUF = '03',
  COMPANY = '04',
  AOP = '05',
  PARTNERSHIP_FIRM = '06',
  BODY_CORPORATE = '07',
  TRUST = '08',
  SOCIETY = '09',
  OTHERS = '10',
  NRI_OTHERS = '11',
  DFI = '12',
  SOLE_PROPRIETORSHIP = '13',
  NRE = '21',
  OCB = '22',
  FII = '23',
  NRO = '24',
  OVERSEAS_CORP_BODY_OTHERS = '25',
  NRI_CHILD = '26',
  NRI_HUF_NRO = '27',
  NRI_MINOR_NRO = '28',
  NRI_HUF_NRE = '29',
  PROVIDENT_FUND = '31',
  SUPER_ANNUATION_FUND = '32',
  GRATUITY_FUND = '33',
  PENSION_FUND = '34',
  MUTUAL_FUNDS_FOF_SCHEMES = '36',
  NPS_TRUST = '37',
  GLOBAL_DEVELOPMENT_NETWORK = '38',
  FCRA = '39',
  QFI_INDIVIDUAL = '41',
  QFI_MINORS = '42',
  QFI_CORPORATE = '43',
  QFI_PENSION_FUNDS = '44',
  QFI_HEDGE_FUNDS = '45',
  QFI_MUTUAL_FUNDS = '46',
  LLP = '47',
  NON_PROFIT_ORGANIZATION = '48',
  PUBLIC_LIMITED_COMPANY = '51',
  PRIVATE_LIMITED_COMPANY = '52',
  UNLISTED_COMPANY = '53',
  MUTUAL_FUNDS = '54',
  FPI_CATEGORY_I = '55',
  FPI_CATEGORY_II = '56',
  FPI_CATEGORY_III = '57',
  FINANCIAL_INSTITUTIONS = '58',
  BODY_OF_INDIVIDUALS = '59',
  INSURANCE_COMPANY = '60',
  OCI_REPATRIATION = '61',
  OCI_NON_REPATRIATION = '62',
  PERSON_OF_INDIAN_ORIGIN = '70',
  GOVERNMENT_BODY = '72',
  DEFENCE_ESTABLISHMENT = '73',
  NON_GOVERNMENT_ORGANISATION = '74',
  BANK_CO_OPERATIVE_BANK = '75',
  ARTIFICIAL_JURIDICAL_PERSON = '76',
  SEAFARER_NRE = '77',
  SEAFARER_NRO = '78',
  LOCAL_AUTHORITY = '79',
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
