// Transaction Type
export enum STPTransType {
  NEW = 'NEW',
  CXL = 'CXL',
}

// STP Type
export enum STPType {
  EXCH = 'EXCH',
  AMC = 'AMC',
}

// Buy Sell Type
export enum STPBuySellType {
  FRESH = 'Fresh',
  ADDITIONAL = 'Additional',
}

// Transaction Mode
export enum STPTransMode {
  PHYSICAL = 'P',
  CDSL = 'C',
  NSDL = 'N',
}

// Frequency Type
export enum STPFrequencyType {
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  QUARTERLY = 'Quarterly',
}
