// Transaction Code
export enum OrderEntryTransCode {
  NEW = 'NEW',
  MOD = 'MOD',
  CXL = 'CXL',
}

// Buy Sell
export enum OrderEntryBuySell {
  PURCHASE = 'P',
  REDEMPTION = 'R',
}

// Buy Sell Type
export enum OrderEntryBuySellType {
  FRESH = 'FRESH',
  ADDITIONAL = 'ADDITIONAL',
}

// DP Transaction Type
export enum OrderEntryDPTxn {
  CDSL = 'C',
  NSDL = 'N',
  PHYSICAL = 'P',
}

// Yes/No Flag for All Redeem
export enum OrderEntryAllRedeem {
  YES = 'Y',
  NO = 'N',
}

// KYC Status
export enum OrderEntryKYCStatus {
  YES = 'Y',
  NO = 'N',
}

// EUIN Declaration Flag
export enum OrderEntryEUINVal {
  YES = 'Y',
  NO = 'N',
}

// Minimum Redemption Flag
export enum OrderEntryMinRedeem {
  YES = 'Y',
  NO = 'N',
}
