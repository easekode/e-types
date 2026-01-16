export class PII {
  /**
   * Masks PAN number to show only last 4 characters
   * Follows BSE masking pattern: "****5678"
   *
   * @param pan - Full PAN number (10 chars)
   * @returns Masked PAN showing last 4 chars
   *
   * @example
   * PII.maskPan("ABCDE1234F") // Returns "****234F"
   */
  static maskPan(pan: string | undefined): string {
    if (!pan || pan.length < 4) {
      return '****';
    }
    return `****${pan.slice(-4)}`;
  }

  /**
   * Masks account number to show only last 4 digits
   * Follows BSE masking pattern: "****1234"
   *
   * @param accountNumber - Full account number
   * @returns Masked account number showing last 4 digits
   *
   * @example
   * PII.maskAccountNumber("123456789012") // Returns "****9012"
   */
  static maskAccountNumber(accountNumber: string | undefined): string {
    if (!accountNumber || accountNumber.length < 4) {
      return '****';
    }
    return `****${accountNumber.slice(-4)}`;
  }
}

export default PII;