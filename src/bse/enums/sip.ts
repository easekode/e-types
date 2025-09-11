// SIP/XSIP/ISIP Transaction Code
export enum SIPTransactionCode {
  NEW = 'NEW',
  CXL = 'CXL',
}

// Trans Mode (Demat/Physical)
export enum SIPTransMode {
  DEMAT = 'D',
  PHYSICAL = 'P',
}

// DP Transaction Mode
export enum SIPDPTxn {
  CDSL = 'C',
  NSDL = 'N',
  PHYSICAL = 'P',
}

// Frequency Type
export enum SIPFrequencyType {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  WEEKLY = 'WEEKLY',
  DAILY = 'DAILY',
}

// EUIN Declaration Flag
export enum SIPEuinDeclarationFlag {
  YES = 'Y',
  NO = 'N',
}

// First Order Flag
export enum SIPFirstOrderFlag {
  YES = 'Y',
  NO = 'N',
}

// SIP Type
export enum SIPType {
  REGULAR = '01',
  POWER = '02',
  FREEDOM = '03',
  MITRA_XSIP = '07',
  SAMPOORNA_XSIP = '08',
  WHITEOAK_XSIP = '09',
}
