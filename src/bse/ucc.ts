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

// UCC Registration Param Schema - represents the structured data that gets converted to pipe-separated string
export const UccRegistrationParamSchema = z.object({
  // Client Information
  ClientCode: z.string().max(10), // Client Code (UCC)
  PrimaryHolderFirstName: z.string().max(70), // Primary Holder First Name
  PrimaryHolderMiddleName: z.string().max(70).optional(), // Primary Holder Middle Name
  PrimaryHolderLastName: z.string().max(70).optional(), // Primary Holder Last Name
  TaxStatus: z.nativeEnum(UCCTaxStatus), // Tax Status
  Gender: z.nativeEnum(UCCGender).optional(), // Gender (Conditional: Mandatory for Individual/Minor)
  PrimaryHolderDOB: z.string().max(10), // Primary Holder DOB/Incorporation (DD/MM/YYYY)
  OccupationCode: z.nativeEnum(UCCOccupation), // Occupation Code
  HoldingNature: z.nativeEnum(UCCHoldingNature), // Holding Nature

  // Second Holder Information
  SecondHolderFirstName: z.string().max(70).optional(), // Conditional: if Holding is JO/AS
  SecondHolderMiddleName: z.string().max(70).optional(), // Second Holder Middle Name
  SecondHolderLastName: z.string().max(70).optional(), // Second Holder Last Name

  // Third Holder Information
  ThirdHolderFirstName: z.string().max(70).optional(), // Third Holder First Name
  ThirdHolderMiddleName: z.string().max(70).optional(), // Third Holder Middle Name
  ThirdHolderLastName: z.string().max(70).optional(), // Third Holder Last Name
  SecondHolderDOB: z.string().max(10).optional(), // Second Holder DOB
  ThirdHolderDOB: z.string().max(10).optional(), // Third Holder DOB

  // Guardian Information (for Minor Clients)
  GuardianFirstName: z.string().max(120).optional(), // Conditional: for Minor Clients
  GuardianMiddleName: z.string().max(120).optional(), // Guardian Middle Name
  GuardianLastName: z.string().max(120).optional(), // Guardian Last Name
  GuardianDOB: z.string().max(10).optional(), // Guardian DOB

  // PAN Information
  PrimaryHolderPANExempt: z.nativeEnum(UCCYesNoFlag), // Primary Holder PAN Exempt
  SecondHolderPANExempt: z.nativeEnum(UCCYesNoFlag), // Second Holder PAN Exempt
  ThirdHolderPANExempt: z.nativeEnum(UCCYesNoFlag), // Third Holder PAN Exempt
  GuardianPANExempt: z.nativeEnum(UCCYesNoFlag), // Guardian PAN Exempt
  PrimaryHolderPAN: z.string().max(10).optional(), // Conditional: if not exempt
  SecondHolderPAN: z.string().max(10).optional(), // Conditional: if not exempt and provided
  ThirdHolderPAN: z.string().max(10).optional(), // Conditional: if not exempt and provided
  GuardianPAN: z.string().max(10).optional(), // Conditional: if not exempt

  // PAN Exempt Categories
  PrimaryHolderExemptCategory: z.nativeEnum(PANExemptCategory).optional(), // Conditional: if exempt
  SecondHolderExemptCategory: z.nativeEnum(PANExemptCategory).optional(), // Conditional: if exempt
  ThirdHolderExemptCategory: z.nativeEnum(PANExemptCategory).optional(), // Conditional: if exempt
  GuardianExemptCategory: z.nativeEnum(PANExemptCategory).optional(), // Conditional: if exempt

  // Client Type & DP Information
  ClientType: z.nativeEnum(UCCClientType), // Client Type (Physical/Demat)
  PMS: z.nativeEnum(UCCYesNoFlag).optional(), // Conditional: if Client Type 'D'
  DefaultDP: z.string().max(4).optional(), // Conditional: if Client Type 'D'
  CDSLDPID: z.string().max(8).optional(), // Conditional: if Default DP is CDSL
  CDSLCLTID: z.string().max(16).optional(), // Conditional: if Default DP is CDSL
  CMBPId: z.number().optional(), // Conditional: if PMS Flag is Y & Default DP is NSDL
  NSDLDPID: z.string().max(8).optional(), // Conditional: if Default DP is NSDL
  NSDLCLTID: z.string().max(8).optional(), // Conditional: if Default DP is NSDL

  // Bank Account Information (1-5)
  AccountType1: z.nativeEnum(UCCAccountType), // Account Type 1
  AccountNo1: z.string().max(40), // Account No 1
  MICRNo1: z.string().max(9).optional(), // MICR No 1
  IFSCCode1: z.string().max(11), // IFSC Code 1
  DefaultBankFlag1: z.nativeEnum(UCCYesNoFlag), // Default Bank Flag 1

  AccountType2: z.nativeEnum(UCCAccountType).optional(), // Account Type 2
  AccountNo2: z.string().max(40).optional(), // Conditional: if Type 2 present
  MICRNo2: z.string().max(9).optional(), // MICR No 2
  IFSCCode2: z.string().max(11).optional(), // Conditional: if Type 2 present & MICR not available
  DefaultBankFlag2: z.nativeEnum(UCCYesNoFlag).optional(), // Conditional: if Type 2 present

  AccountType3: z.nativeEnum(UCCAccountType).optional(), // Account Type 3
  AccountNo3: z.string().max(40).optional(), // Conditional: if Type 3 present
  MICRNo3: z.string().max(9).optional(), // MICR No 3
  IFSCCode3: z.string().max(11).optional(), // Conditional: if Type 3 present & MICR not available
  DefaultBankFlag3: z.nativeEnum(UCCYesNoFlag).optional(), // Conditional: if Type 3 present

  AccountType4: z.nativeEnum(UCCAccountType).optional(), // Account Type 4
  AccountNo4: z.string().max(40).optional(), // Conditional: if Type 4 present
  MICRNo4: z.string().max(9).optional(), // MICR No 4
  IFSCCode4: z.string().max(11).optional(), // Conditional: if Type 4 present & MICR not available
  DefaultBankFlag4: z.nativeEnum(UCCYesNoFlag).optional(), // Conditional: if Type 4 present

  AccountType5: z.nativeEnum(UCCAccountType).optional(), // Account Type 5
  AccountNo5: z.string().max(40).optional(), // Conditional: if Type 5 present
  MICRNo5: z.string().max(9).optional(), // MICR No 5
  IFSCCode5: z.string().max(11).optional(), // Conditional: if Type 5 present & MICR not available
  DefaultBankFlag5: z.nativeEnum(UCCYesNoFlag).optional(), // Conditional: if Type 5 present

  ChequeName: z.string().max(35).optional(), // Cheque name
  DivPayMode: z.nativeEnum(UCCDividendPaymode), // Div pay mode

  // Address Information (Domestic)
  Address1: z.string().max(40).optional(), // Conditional: not for NRI
  Address2: z.string().max(40).optional(), // Address 2
  Address3: z.string().max(40).optional(), // Address 3
  City: z.string().max(35).optional(), // Conditional: not for NRI
  State: z.string().max(2).optional(), // Conditional: not for NRI
  Pincode: z.string().max(6).optional(), // Conditional: not for NRI
  Country: z.string().max(35).optional(), // Conditional: not for NRI

  // Contact Information (Domestic)
  ResiPhone: z.string().max(15).optional(), // Resi. Phone
  ResiFax: z.string().max(15).optional(), // Resi. Fax
  OfficePhone: z.string().max(15).optional(), // Office Phone
  OfficeFax: z.string().max(15).optional(), // Office Fax
  Email: z.string().max(50), // Email
  CommunicationMode: z.nativeEnum(UCCCommunicationMode), // Communication Mode

  // Foreign Address Information (NRI)
  ForeignAddress1: z.string().max(40).optional(), // Conditional: NRI
  ForeignAddress2: z.string().max(40).optional(), // Foreign Address 2
  ForeignAddress3: z.string().max(40).optional(), // Foreign Address 3
  ForeignAddressCity: z.string().max(35).optional(), // Conditional: NRI
  ForeignAddressPincode: z.string().max(10).optional(), // Conditional: NRI
  ForeignAddressState: z.string().max(35).optional(), // Conditional: NRI
  ForeignAddressCountry: z.string().max(3).optional(), // Conditional: NRI
  ForeignAddressResiPhone: z.string().max(15).optional(), // Foreign Address Resi Phone
  ForeignAddressFax: z.string().max(15).optional(), // Foreign Address Fax
  ForeignAddressOffPhone: z.string().max(15).optional(), // Foreign Address Off. Phone
  ForeignAddressOffFax: z.string().max(15).optional(), // Foreign Address Off. Fax

  IndianMobileNo: z.string().max(10), // Indian Mobile No.

  // Nominee Information
  Nominee1Name: z.string().max(40).optional(), // Nominee 1 Name
  Nominee1Relationship: z.string().max(40).optional(), // Conditional: if nominee provided
  Nominee1Percentage: z.number().optional(), // Nominee 1 Applicable(%)
  Nominee1MinorFlag: z.nativeEnum(UCCYesNoFlag).optional(), // Conditional: if nominee provided
  Nominee1DOB: z.string().max(10).optional(), // Conditional: if minor
  Nominee1Guardian: z.string().max(35).optional(), // Conditional: if minor

  Nominee2Name: z.string().max(40).optional(), // Nominee 2 Name
  Nominee2Relationship: z.string().max(40).optional(), // Conditional: if nominee 2 provided
  Nominee2Percentage: z.number().optional(), // Nominee 2 Applicable(%)
  Nominee2DOB: z.string().max(10).optional(), // Conditional: if nominee 2 provided
  Nominee2MinorFlag: z.nativeEnum(UCCYesNoFlag).optional(), // Conditional: if nominee 2 provided
  Nominee2Guardian: z.string().max(35).optional(), // Conditional: if nominee 2 provided

  Nominee3Name: z.string().max(40).optional(), // Nominee 3 Name
  Nominee3Relationship: z.string().max(40).optional(), // Conditional: if nominee 3 provided
  Nominee3Percentage: z.number().optional(), // Nominee 3 Applicable(%)
  Nominee3DOB: z.string().max(10).optional(), // Conditional: if nominee 3 provided
  Nominee3MinorFlag: z.nativeEnum(UCCYesNoFlag).optional(), // Conditional: if nominee 3 provided
  Nominee3Guardian: z.string().max(35).optional(), // Conditional: if nominee 3 provided

  // KYC Information
  PrimaryHolderKYCType: z.nativeEnum(UCCKYCType), // Primary Holder KYC Type
  PrimaryHolderCKYCNumber: z.number().optional(), // Conditional: if KYC type 'C'
  SecondHolderKYCType: z.nativeEnum(UCCKYCType).optional(), // Second Holder KYC Type
  SecondHolderCKYCNumber: z.number().optional(), // Conditional: if KYC type 'C'
  ThirdHolderKYCType: z.nativeEnum(UCCKYCType).optional(), // Third Holder KYC Type
  ThirdHolderCKYCNumber: z.number().optional(), // Conditional: if KYC type 'C'
  GuardianKYCType: z.nativeEnum(UCCKYCType).optional(), // Guardian KYC Type
  GuardianCKYCNumber: z.number().optional(), // Conditional: if KYC type 'C'

  // KRA Exempt Reference Numbers
  PrimaryHolderKRAExemptRefNo: z.string().max(10).optional(), // Conditional: if PAN Exempt
  SecondHolderKRAExemptRefNo: z.string().max(10).optional(), // Conditional: if PAN Exempt
  ThirdHolderKRAExemptRefNo: z.string().max(10).optional(), // Conditional: if PAN Exempt
  GuardianExemptRefNo: z.string().max(10).optional(), // Conditional: if PAN Exempt

  // Additional Information
  AadhaarUpdated: z.nativeEnum(UCCYesNoFlag).optional(), // Aadhaar Updated
  MapinId: z.string().max(16).optional(), // Mapin Id.
  PaperlessFlag: z.nativeEnum(UCCPaperlessFlag), // Paperless_flag
  LEINo: z.string().max(20).optional(), // Conditional: for Non-Individual/HUF above Rs.50 Cr
  LEIValidity: z.string().max(10).optional(), // Conditional: if LEI No. given
  MobileDeclarationFlag: z.string().max(2).optional(), // Conditional: if mobile provided
  EmailDeclarationFlag: z.string().max(2).optional(), // Conditional: if email provided
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
