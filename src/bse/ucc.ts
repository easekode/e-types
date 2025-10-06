import { z } from 'zod';
import {
  UCCRegnType,
  UCCTaxStatus,
  UCCGender,
  UCCOccupation,
  UCCHoldingNature,
  UCCAccountType,
  UCCDividendPaymode,
  UCCCommunicationMode,
  PANExemptCategory,
  UCCYesNoFlag,
  UCCClientType,
  UCCKYCType,
  UCCPaperlessFlag,
} from './enums';

// Date validation helper for DD/MM/YYYY format
const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
const dateValidation = (val: string) => !val || dateRegex.test(val);

// Helper function to convert empty strings to undefined for optional fields
const emptyStringToUndefined = (val: unknown) => (val === '' ? undefined : val);

// Helper for optional enum fields - converts empty string to undefined
const optionalEnum = <T extends Record<string, string>>(enumObject: T) =>
  z.preprocess(emptyStringToUndefined, z.nativeEnum(enumObject).optional());

// Helper for optional email fields - converts empty string to undefined
const optionalEmail = (maxLength?: number) =>
  z.preprocess(
    emptyStringToUndefined,
    maxLength
      ? z.string().email().max(maxLength).optional()
      : z.string().email().optional(),
  );

// UCC Registration Param Schema - represents the structured data that gets converted to pipe-separated string
export const UccRegistrationParamSchema = z.object({
  // Basic holder information (fields 1-21)
  ClientCode: z.string().max(10), // 1 - Client Code (UCC)
  PrimaryHolderFirstName: z.string().max(70), // 2 - Primary Holder First Name
  PrimaryHolderMiddleName: z.string().max(70).optional(), // 3 - Primary Holder Middle Name
  PrimaryHolderLastName: z.string().max(70).optional(), // 4 - Primary Holder Last Name
  TaxStatus: z.nativeEnum(UCCTaxStatus), // 5 - Tax Status
  Gender: z.nativeEnum(UCCGender).optional(), // 6 - Gender (M/F/O)
  PrimaryHolderDOB: z.string().refine(dateValidation, {
    message: 'PrimaryHolderDOB must be in DD/MM/YYYY format',
  }), // 7 - Primary Holder DOB (DD/MM/YYYY)
  OccupationCode: z.nativeEnum(UCCOccupation), // 8 - Occupation Code
  HoldingNature: z.nativeEnum(UCCHoldingNature), // 9 - Holding Nature (SI/JO/AS)
  SecondHolderFirstName: z.string().max(70).optional(), // 10 - Second Holder First Name
  SecondHolderMiddleName: z.string().max(70).optional(), // 11 - Second Holder Middle Name
  SecondHolderLastName: z.string().max(70).optional(), // 12 - Second Holder Last Name
  ThirdHolderFirstName: z.string().max(70).optional(), // 13 - Third Holder First Name
  ThirdHolderMiddleName: z.string().max(70).optional(), // 14 - Third Holder Middle Name
  ThirdHolderLastName: z.string().max(70).optional(), // 15 - Third Holder Last Name
  SecondHolderDOB: z
    .string()
    .refine(dateValidation, {
      message: 'SecondHolderDOB must be in DD/MM/YYYY format',
    })
    .optional(), // 16 - Second Holder DOB (DD/MM/YYYY)
  ThirdHolderDOB: z
    .string()
    .refine(dateValidation, {
      message: 'ThirdHolderDOB must be in DD/MM/YYYY format',
    })
    .optional(), // 17 - Third Holder DOB (DD/MM/YYYY)
  GuardianFirstName: z.string().max(120).optional(), // 18 - Guardian First Name
  GuardianMiddleName: z.string().max(120).optional(), // 19 - Guardian Middle Name
  GuardianLastName: z.string().max(120).optional(), // 20 - Guardian Last Name
  GuardianDOB: z
    .string()
    .refine(dateValidation, {
      message: 'GuardianDOB must be in DD/MM/YYYY format',
    })
    .optional(), // 21 - Guardian DOB (DD/MM/YYYY)

  // PAN information (fields 22-33)
  PrimaryHolderPANExempt: z.nativeEnum(UCCYesNoFlag), // 22 - Primary Holder PAN Exempt (Y/N)
  SecondHolderPANExempt: optionalEnum(UCCYesNoFlag), // 23 - Second Holder PAN Exempt (Y/N)
  ThirdHolderPANExempt: optionalEnum(UCCYesNoFlag), // 24 - Third Holder PAN Exempt (Y/N)
  GuardianPANExempt: optionalEnum(UCCYesNoFlag), // 25 - Guardian PAN Exempt (Y/N)
  PrimaryHolderPAN: z.string().max(10).optional(), // 26 - Primary Holder PAN
  SecondHolderPAN: z.string().max(10).optional(), // 27 - Second Holder PAN
  ThirdHolderPAN: z.string().max(10).optional(), // 28 - Third Holder PAN
  GuardianPAN: z.string().max(10).optional(), // 29 - Guardian PAN
  PrimaryHolderExemptCategory: optionalEnum(PANExemptCategory), // 30 - Primary Holder Exempt Category
  SecondHolderExemptCategory: optionalEnum(PANExemptCategory), // 31 - Second Holder Exempt Category
  ThirdHolderExemptCategory: optionalEnum(PANExemptCategory), // 32 - Third Holder Exempt Category
  GuardianExemptCategory: optionalEnum(PANExemptCategory), // 33 - Guardian Exempt Category

  // Client and DP information (fields 34-41)
  ClientType: z.nativeEnum(UCCClientType), // 34 - Client Type (P/D)
  PMS: optionalEnum(UCCYesNoFlag), // 35 - PMS Flag (N/Y)
  DefaultDP: z.string().max(4).optional(), // 36 - Default DP (CDSL/NSDL)
  CDSLDPID: z.string().max(8).optional(), // 37 - CDSL DPID
  CDSLCLTID: z.string().max(16).optional(), // 38 - CDSL CLTID
  CMBPId: z.string().optional(), // 39 - CMBP Id
  NSDLDPID: z.string().max(8).optional(), // 40 - NSDL DPID
  NSDLCLTID: z.string().max(8).optional(), // 41 - NSDL CLTID

  // Bank account information (fields 42-66)
  AccountType1: z.nativeEnum(UCCAccountType), // 42 - Account Type 1 (SB/CB/NE/NO)
  AccountNo1: z.string().max(40), // 43 - Account No 1
  MICRNo1: z.string().max(9).optional(), // 44 - MICR No 1
  IFSCCode1: z.string().max(11), // 45 - IFSC Code 1
  DefaultBankFlag1: z.nativeEnum(UCCYesNoFlag), // 46 - Default Bank Flag 1 (Y/N)
  AccountType2: optionalEnum(UCCAccountType), // 47 - Account Type 2
  AccountNo2: z.string().max(40).optional(), // 48 - Account No 2
  MICRNo2: z.string().max(9).optional(), // 49 - MICR No 2
  IFSCCode2: z.string().max(11).optional(), // 50 - IFSC Code 2
  DefaultBankFlag2: optionalEnum(UCCYesNoFlag), // 51 - Default Bank Flag 2
  AccountType3: optionalEnum(UCCAccountType), // 52 - Account Type 3
  AccountNo3: z.string().max(40).optional(), // 53 - Account No 3
  MICRNo3: z.string().max(9).optional(), // 54 - MICR No 3
  IFSCCode3: z.string().max(11).optional(), // 55 - IFSC Code 3
  DefaultBankFlag3: optionalEnum(UCCYesNoFlag), // 56 - Default Bank Flag 3
  AccountType4: optionalEnum(UCCAccountType), // 57 - Account Type 4
  AccountNo4: z.string().max(40).optional(), // 58 - Account No 4
  MICRNo4: z.string().max(9).optional(), // 59 - MICR No 4
  IFSCCode4: z.string().max(11).optional(), // 60 - IFSC Code 4
  DefaultBankFlag4: optionalEnum(UCCYesNoFlag), // 61 - Default Bank Flag 4
  AccountType5: optionalEnum(UCCAccountType), // 62 - Account Type 5
  AccountNo5: z.string().max(40).optional(), // 63 - Account No 5
  MICRNo5: z.string().max(9).optional(), // 64 - MICR No 5
  IFSCCode5: z.string().max(11).optional(), // 65 - IFSC Code 5
  DefaultBankFlag5: optionalEnum(UCCYesNoFlag), // 66 - Default Bank Flag 5
  ChequeName: z.string().max(35).optional(), // 67 - Cheque Name

  // Address information (fields 67-93)
  DivPayMode: z.nativeEnum(UCCDividendPaymode), // 68 - Dividend Pay Mode
  Address1: z.string().max(40).optional(), // 69 - Address 1
  Address2: z.string().max(40).optional(), // 70 - Address 2
  Address3: z.string().max(40).optional(), // 71 - Address 3
  City: z.string().max(35), // 72 - City
  State: z.string().max(2), // 73 - State (two-letter)
  Pincode: z.string().max(6), // 74 - Pincode
  Country: z.string().max(35), // 75 - Country
  ResiPhone: z.string().max(15).optional(), // 76 - Residential Phone
  ResiFax: z.string().max(15).optional(), // 77 - Residential Fax
  OfficePhone: z.string().max(15).optional(), // 78 - Office Phone
  OfficeFax: z.string().max(15).optional(), // 79 - Office Fax
  Email: z.string().email().max(50), // 80 - Email
  CommunicationMode: z.nativeEnum(UCCCommunicationMode), // 81 - Communication Mode
  ForeignAddress1: z.string().max(40).optional(), // 82 - Foreign Address 1
  ForeignAddress2: z.string().max(40).optional(), // 83 - Foreign Address 2
  ForeignAddress3: z.string().max(40).optional(), // 84 - Foreign Address 3
  ForeignAddressCity: z.string().max(35).optional(), // 85 - Foreign City
  ForeignAddressPincode: z.string().max(10).optional(), // 86 - Foreign Address Pincode
  ForeignAddressState: z.string().max(35).optional(), // 87 - Foreign Address State
  ForeignAddressCountry: z.string().max(3).optional(), // 88 - Foreign Address Country
  ForeignAddressResiPhone: z.string().max(15).optional(), // 89 - Foreign Resi Phone
  ForeignAddressFax: z.string().max(15).optional(), // 90 - Foreign Fax
  ForeignAddressOfficePhone: z.string().max(15).optional(), // 91 - Foreign Office Phone
  ForeignAddressOfficeFax: z.string().max(15).optional(), // 92 - Foreign Office Fax
  IndianMobileNo: z.string().max(10), // 93 - Indian Mobile No

  // KYC information (fields 94-107)
  PrimaryHolderKYCType: z.nativeEnum(UCCKYCType), // 94 - Primary Holder KYC Type (K/C/E/B)
  PrimaryHolderCKYCNumber: z.string().optional(), // 95 - Primary Holder CKYC Number
  SecondHolderKYCType: optionalEnum(UCCKYCType), // 96 - Second Holder KYC Type
  SecondHolderCKYCNumber: z.string().optional(), // 97 - Second Holder CKYC Number
  ThirdHolderKYCType: optionalEnum(UCCKYCType), // 98 - Third Holder KYC Type
  ThirdHolderCKYCNumber: z.string().optional(), // 99 - Third Holder CKYC Number
  GuardianKYCType: optionalEnum(UCCKYCType), // 100 - Guardian KYC Type
  GuardianCKYCNumber: z.string().optional(), // 101 - Guardian CKYC Number
  PrimaryHolderKRAExemptRefNo: z.string().max(10).optional(), // 102 - Primary Holder KRA Exempt Ref. No.
  SecondHolderKRAExemptRefNo: z.string().max(10).optional(), // 103 - Second Holder KRA Exempt Ref. No.
  ThirdHolderKRAExemptRefNo: z.string().max(10).optional(), // 104 - Third Holder KRA Exempt Ref. No
  GuardianExemptRefNo: z.string().max(10).optional(), // 105 - Guardian KRA Exempt Ref. No
  AadhaarUpdated: optionalEnum(UCCYesNoFlag), // 106 - Aadhaar Updated (Y/N)
  MapinId: z.string().max(16).optional(), // 107 - Mapin Id (optional)

  // Paperless and declaration flags (fields 108-117)
  PaperlessFlag: z.nativeEnum(UCCPaperlessFlag), // 108 - Paperless flag (P/Z)
  LEINo: z.string().max(20).optional(), // 109 - LEI No (for HUF/corporate >50cr)
  LEIValidityDate: z
    .string()
    .refine(dateValidation, {
      message: 'LEIValidityDate must be in DD/MM/YYYY format',
    })
    .optional(), // 110 - LEI Validity Date (DD/MM/YYYY)
  MobileDeclarationFlag: z.string().max(2).optional(), // 111 - Mobile Declaration Flag
  EmailDeclarationFlag: z.string().max(2).optional(), // 112 - Email Declaration Flag
  SecondHolderEmail: optionalEmail(50), // 113 - Second Holder Email
  SecondHolderEmailDeclaration: z.string().max(2).optional(), // 114 - Second Holder Email Declaration
  SecondHolderMobile: z.string().max(10).optional(), // 115 - Second Holder Mobile No
  SecondHolderMobileDeclaration: z.string().max(2).optional(), // 116 - Second Holder Mobile Declaration
  ThirdHolderEmail: optionalEmail(50), // 117 - Third Holder Email
  ThirdHolderEmailDeclaration: z.string().max(2).optional(), // 118 - Third Holder Email Declaration
  ThirdHolderMobile: z.string().max(10).optional(), // 119 - Third Holder Mobile No
  ThirdHolderMobileDeclaration: z.string().max(2).optional(), // 120 - Third Holder Mobile Declaration
  GuardianRelationship: z.string().max(1).optional(), // 121 - Guardian Relationship

  // Nomination information (fields 118-120)
  NominationOpt: optionalEnum(UCCYesNoFlag), // 122 - Nomination Opt (Y/N)
  NominationAuthenticationMode: z.string().max(1).optional(), // 123 - Nomination Auth Mode (W/E/O)

  // Nominee 1 information
  Nominee1Name: z.string().max(40).optional(), // 124 - Nominee 1 Name
  Nominee1Relationship: z.string().max(2).optional(), // 125 - Nominee 1 Relationship
  Nominee1Applicable: z.string().max(5).optional(), // 126 - Nominee 1 Applicable (%)
  Nominee1MinorFlag: optionalEnum(UCCYesNoFlag), // 127 - Nominee 1 Minor Flag (Y/N)
  Nominee1DOB: z
    .string()
    .refine(dateValidation, {
      message: 'Nominee1DOB must be in DD/MM/YYYY format',
    })
    .optional(), // 128 - Nominee 1 DOB (DD/MM/YYYY)
  Nominee1Guardian: z.string().max(35).optional(), // 129 - Nominee 1 Guardian Name
  Nominee1GuardianPAN: z.string().max(10).optional(), // 130 - Nominee 1 Guardian PAN
  Nominee1IdentityType: z.string().max(1).optional(), // 131 - Nominee 1 Identity Type
  Nominee1IDNo: z.string().optional(), // 132 - Nominee 1 ID No
  Nominee1Email: optionalEmail(120), // 133 - Nominee 1 Email
  Nominee1Mobile: z.string().max(15).optional(), // 134 - Nominee 1 Mobile
  Nominee1Add1: z.string().max(40).optional(), // 135 - Nominee 1 Address 1
  Nominee1Add2: z.string().max(40).optional(), // 136 - Nominee 1 Address 2
  Nominee1Add3: z.string().max(40).optional(), // 137 - Nominee 1 Address 3
  Nominee1City: z.string().max(35).optional(), // 138 - Nominee 1 City
  Nominee1Pin: z.string().max(15).optional(), // 139 - Nominee 1 Pin
  Nominee1Country: z.string().max(35).optional(), // 140 - Nominee 1 Country

  // Nominee 2 information
  Nominee2Name: z.string().max(40).optional(), // 141 - Nominee 2 Name
  Nominee2Relationship: z.string().max(2).optional(), // 142 - Nominee 2 Relationship
  Nominee2Applicable: z.string().max(5).optional(), // 143 - Nominee 2 Applicable (%)
  Nominee2MinorFlag: optionalEnum(UCCYesNoFlag), // 144 - Nominee 2 Minor Flag (Y/N)
  Nominee2DOB: z
    .string()
    .refine(dateValidation, {
      message: 'Nominee2DOB must be in DD/MM/YYYY format',
    })
    .optional(), // 145 - Nominee 2 DOB (DD/MM/YYYY)
  Nominee2Guardian: z.string().max(35).optional(), // 146 - Nominee 2 Guardian Name
  Nominee2GuardianPAN: z.string().max(10).optional(), // 147 - Nominee 2 Guardian PAN
  Nominee2IdentityType: z.string().max(1).optional(), // 148 - Nominee 2 Identity Type
  Nominee2IDNo: z.string().optional(), // 149 - Nominee 2 ID No
  Nominee2Email: optionalEmail(120), // 150 - Nominee 2 Email
  Nominee2Mobile: z.string().max(15).optional(), // 151 - Nominee 2 Mobile
  Nominee2Add1: z.string().max(40).optional(), // 152 - Nominee 2 Address 1
  Nominee2Add2: z.string().max(40).optional(), // 153 - Nominee 2 Address 2
  Nominee2Add3: z.string().max(40).optional(), // 154 - Nominee 2 Address 3
  Nominee2City: z.string().max(35).optional(), // 155 - Nominee 2 City
  Nominee2Pin: z.string().max(15).optional(), // 156 - Nominee 2 Pin
  Nominee2Country: z.string().max(35).optional(), // 157 - Nominee 2 Country

  // Nominee 3 information
  Nominee3Name: z.string().max(40).optional(), // 158 - Nominee 3 Name
  Nominee3Relationship: z.string().max(2).optional(), // 159 - Nominee 3 Relationship
  Nominee3Applicable: z.string().max(5).optional(), // 160 - Nominee 3 Applicable (%)
  Nominee3MinorFlag: optionalEnum(UCCYesNoFlag), // 161 - Nominee 3 Minor Flag (Y/N)
  Nominee3DOB: z
    .string()
    .refine(dateValidation, {
      message: 'Nominee3DOB must be in DD/MM/YYYY format',
    })
    .optional(), // 162 - Nominee 3 DOB (DD/MM/YYYY)
  Nominee3Guardian: z.string().max(35).optional(), // 163 - Nominee 3 Guardian Name
  Nominee3GuardianPAN: z.string().max(10).optional(), // 164 - Nominee 3 Guardian PAN
  Nominee3IdentityType: z.string().max(1).optional(), // 165 - Nominee 3 Identity Type
  Nominee3IDNo: z.string().optional(), // 166 - Nominee 3 ID No
  Nominee3Email: optionalEmail(120), // 167 - Nominee 3 Email
  Nominee3Mobile: z.string().max(15).optional(), // 168 - Nominee 3 Mobile
  Nominee3Add1: z.string().max(40).optional(), // 169 - Nominee 3 Address 1
  Nominee3Add2: z.string().max(40).optional(), // 170 - Nominee 3 Address 2
  Nominee3Add3: z.string().max(40).optional(), // 171 - Nominee 3 Address 3
  Nominee3City: z.string().max(35).optional(), // 172 - Nominee 3 City
  Nominee3Pin: z.string().max(15).optional(), // 173 - Nominee 3 Pin
  Nominee3Country: z.string().max(35).optional(), // 174 - Nominee 3 Country

  // Final SOA field
  NomineeSOA: optionalEnum(UCCYesNoFlag), // 175 - Nominee SOA (Y/N)

  // Filler fields
  Filler1: z.string().max(50).optional(), // 176 - Filler 1
  Filler2: z.string().max(50).optional(), // 177 - Filler 2
  Filler3: z.string().max(50).optional(), // 178 - Filler 3
  Filler4: z.string().max(50).optional(), // 179 - Filler 4
  Filler5: z.string().max(50).optional(), // 180 - Filler 5
  Filler6: z.string().max(50).optional(), // 181 - Filler 6
  Filler7: z.string().max(50).optional(), // 182 - Filler 7
  Filler8: z.string().max(50).optional(), // 183 - Filler 8
});

// New Enhanced UCC Registration Request Schema
export const NewUCCRegistrationRequestSchema = z.object({
  UserId: z.string(), // User ID (mandatory)
  MemberCode: z.string(), // Member code (mandatory)
  Password: z.string(), // Password (mandatory)
  RegnType: z.nativeEnum(UCCRegnType), // Registration type: NEW or MOD
  Param: z.string(), // Pipe-separated client details string (mandatory)
  Filler1: z.string().optional(), // Optional filler1
  Filler2: z.string().optional(), // Optional filler2
});

// Inferred types from Zod schemas
export type UccRegistrationParam = z.infer<typeof UccRegistrationParamSchema>;
export type NewUCCRegistrationRequest = z.infer<
  typeof NewUCCRegistrationRequestSchema
>;

// Explanation for Param field in NewUCCRegistrationRequest:
// The Param field should be a pipe-separated string containing client details following the structure like:
// "clientcode|FirstName|MiddleName|LastName|TaxStatus|Gender|DOB|OccupationCode|HoldingNature|PANExemptFlag|PAN|...|Email|CommunicationMode|..."
// Fill in values as per the client registration requirements defined in the document.
