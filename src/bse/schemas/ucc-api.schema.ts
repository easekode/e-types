import { z } from 'zod';
import {
  AuthMode,
  BankAccOwner,
  CommunicationModeValue,
  ContactType,
  FatcaIdentifierType,
  Gender,
  HolderRank,
  IdentifierType,
  KYCType,
  NominationAuthMode,
  OccupationCode,
  OnboardingType,
  RdmpIdcwPayModeValue,
  TaxCode,
  TaxStatus,
  WhoseContact,
} from '../enums/v2Enums';
import { panSchema } from '../../pan';
import { CountryCode } from '../enums/countryCode';

/**
 * BSE StARMF v2 API - UCC Management Schemas
 *
 * CRITICAL ARCHITECTURE:
 * - These schemas match BSE v2 API structure EXACTLY
 * - NO local storage of bank data, PAN, or other PII
 * - All sensitive data retrieved from BSE on demand
 * - Only clientCode, memberCode, uccStatus stored locally
 *
 * Based on BSE StARMF v2 API Specification
 */

// ============================================================================
// Common Validators & Enums
// ============================================================================

/**
 * PAN validation regex
 * Format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)
 */
export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

/**
 * IFSC Code validation regex
 * Format: 4 letters, 0 (zero), 6 alphanumeric (e.g., SBIN0001234)
 */
export const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

/**
 * Account number validation regex
 * Must be 9-20 digits (includes leading zeros)
 */
export const ACCOUNT_NUMBER_REGEX = /^[0-9]{9,20}$/;

/**
 * Mobile number validation regex (India)
 * Must be exactly 10 digits
 */
export const MOBILE_REGEX = /^[0-9]{10}$/;

/**
 * Pincode validation regex (India)
 * Must be exactly 6 digits
 */
export const PINCODE_REGEX = /^[0-9]{6}$/;

/**
 * Date format validator (YYYY-MM-DD)
 */
export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Bank Account Type Enum
 * SB = Savings Bank, CA = Current Account, CC = Cash Credit,
 * NRE = Non-Resident External, NRO = Non-Resident Ordinary
 */
export const BankAccountTypeEnum = z.enum(['SB', 'CA', 'CC', 'NRE', 'NRO']);

/**
 * Holding Nature Enum
 * SI = Single, JO = Joint, AS = Anyone or Survivor, etc.
 */
export const HoldingNatureEnum = z.enum(['SI', 'JO', 'AS', 'MI', 'IN', 'CU']);

/**
 * Communication Mode Enum
 * P = Physical, E = Email, B = Both
 */
export const CommModeEnum = z.enum(['P', 'E', 'B']);

/**
 * Onboarding Type Enum
 * P = Paper, Z = Paperless
 */
export const OnboardingEnum = z.enum(['P', 'Z']);

// ============================================================================
// BSE v2 Core Structures
// ============================================================================

/**
 * BSE Member Structure
 * Contains BSE member identification
 */
export const BseMemberSchema = z.object({
  memberid: z.string().min(1).max(10),
});

/**
 * BSE Investor Structure
 * Contains client code (UCC)
 */
export const BseInvestorSchema = z.object({
  client_code: z.string().min(1).max(20),
});

/**
 * BSE Person Object
 * Personal details of a holder
 */
export const BsePersonSchema = z.object({
  first_name: z.string().min(1).max(100),
  middle_name: z.string().max(100).optional(),
  last_name: z.string().max(100).optional(),
  gender: z.nativeEnum(Gender),
  dob: z.string().regex(DATE_REGEX, 'Date must be in YYYY-MM-DD format'),
});

/**
 * BSE Contact Object
 * Contact details of a holder
 */
export const BseContactSchema = z.object({
  contact_number: z.string().max(20),
  country_code: z.string().max(5), //91 for India
  whose_contact_number: z.nativeEnum(WhoseContact),
  contact_type: z.nativeEnum(ContactType),
  email_address: z.string().email().max(255),
  extension: z.string().max(10).optional(),
  fax_no: z.string().max(20).optional(),
  whose_email_address: z.nativeEnum(WhoseContact),
});

/**
 * BSE Identifier Object (for documents)
 * Used for PAN, Aadhaar, passport, cancelled cheque, etc.
 */
export const BseIdentifierSchema = z.object({
  identifier_type: z.nativeEnum(IdentifierType),
  identifier_number: z.string().max(100),
  file_name: z.string().max(255).optional(),
  file_size: z.number().int().positive().optional(),
  file_blob: z.string().optional(), // Base64 encoded
});

/**
 * BSE Nomination Object
 */
export const BseNominationSchema = z.object({
  nominee_rank: z.number().int().min(1).max(3),
  nominee_name: z.string().min(1).max(255),
  nominee_relation: z.string().max(50),
  nominee_percent: z.number().min(0).max(100),
  nominee_dob: z.string().regex(DATE_REGEX).optional(),
  nominee_guardian: z.string().max(255).optional(),
  identifier: z.array(BseIdentifierSchema).optional(),
});

/**
 * BSE Holder Object
 * Complete holder information (max 5 holders allowed)
 */
export const BseHolderSchema = z.object({
  holder_rank: z.nativeEnum(HolderRank),
  occ_code: z.nativeEnum(OccupationCode),
  auth_mode: z.nativeEnum(AuthMode),
  is_pan_exempt: z.boolean(),
  pan_exempt_category: z.string().max(10).optional(),

  identifier: z.array(BseIdentifierSchema).min(1), // At least PAN required
  kyc_type: z.nativeEnum(KYCType),
  ckyc_number: z.string().max(20).optional(),
  person: BsePersonSchema,
  contact: z.array(BseContactSchema).min(1),
  nomination: z.array(BseNominationSchema).optional(), // TODO nomination is optional, verify later
});

/**
 * BSE Bank Account Object
 * CRITICAL: Used only for BSE API calls - NEVER stored locally
 */
export const BseBankAccountSchema = z.object({
  ifsc_code: z.string().regex(IFSC_REGEX, 'Invalid IFSC code format'),
  bank_acc_num: z
    .string()
    .regex(ACCOUNT_NUMBER_REGEX, 'Account number must be 9-20 digits'),
  bank_acc_type: BankAccountTypeEnum,
  account_owner: z.nativeEnum(BankAccOwner),
  identifier: z.array(BseIdentifierSchema).min(1), // Cancelled cheque, bank statement, etc.
});

/**
 * BSE Communication Address Object
 */
export const BseCommAddrSchema = z.object({
  address_line_1: z.string().min(10).max(120),
  address_line_2: z.string().min(10).max(120).optional(),
  address_line_3: z.string().min(10).max(120).optional(),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  country: z.string().length(3, 'Country must be 3-letter ISO code'),
  postalcode: z.string().regex(PINCODE_REGEX, 'Postal code must be 6 digits'),
});

/**
 * BSE Foreign Address Object
 */
export const BseForeignAddrSchema = z.object({
  addressline1: z.string().min(1).max(255),
  addressline2: z.string().max(255).optional(),
  addressline3: z.string().max(255).optional(),
  city: z.string().min(1).max(100),
  state: z.string().max(100).optional(),
  country: z.string().length(3, 'Country must be 3-letter ISO code'),
  postalcode: z.string().max(20),
});

/**
 * BSE Depository Object
 */
export const BseDepositorySchema = z.object({
  depository_code: z.enum(['NSDL', 'CDSL']),
  dp_id: z.string().min(1).max(20),
  client_id: z.string().min(1).max(20),
  cmbp_id: z.string().max(20).optional(),
  bank_account: z.string().max(20).optional(),
  account_owner: z.string().max(1).optional(),
  is_default: z.boolean().optional(),
  identifier: z.array(BseIdentifierSchema).optional(),
});

const TaxResidencySchema = z.object({
  country: z.nativeEnum(CountryCode)
    .describe('Country code of residency e.g. IND'),
  tax_id_no: z.string().min(10).max(50).describe('Tax ID Number'),
  tax_id_type: z.nativeEnum(FatcaIdentifierType),
});

// UBO Person Schema
const UBOPersonSchema = z.object({
  firstName: z.string().min(2).max(70).describe('First name of UBO'),
  middleName: z
    .string()
    .min(2)
    .max(70)
    .optional()
    .describe('Middle name of UBO'),
  lastName: z.string().min(2).max(70).describe('Last name of UBO'),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .describe('Date of birth in YYYY-MM-DD format'),
  gender: z.enum(['M', 'F', 'T']).optional().describe('Gender'),
  taxResidency: z
    .array(TaxResidencySchema)
    .min(1)
    .max(5)
    .describe('Tax residency details'),
});

// UBO Detail Schema
const UBODetailSchema = z.object({
  person: UBOPersonSchema.describe('UBO person details'),
  placeOfBirth: z.string().min(2).max(60).describe('Place of Birth'),
  countryOfBirth: z
    .string()
    .min(2)
    .max(3)
    .describe('Country of Birth e.g. IND'),
  occCode: z.string().describe('Occupation code from occcode enum'),
  occType: z.string().describe('Occupation type from occtype enum'),
  beneficiaryPercent: z
    .number()
    .min(0)
    .max(100)
    .describe('Beneficiary percentage of UBO'),
  uboTypeCode: z.string().describe('Type of UBO from ubotypecode enum'),
  addr: z
    .object({
      addressLine1: z.string().min(10).max(120),
      addressLine2: z.string().min(1).max(60).optional(),
      addressLine3: z.string().min(1).max(60).optional(),
      city: z.string().min(2).max(60),
      state: z.string().min(2).max(60),
      country: z.string().min(2).max(3),
      postalCode: z.string().min(4).max(10),
    })
    .describe('UBO address'),
  uboAddrType: z.string().describe('Type of address from uboaddrtype enum'),
  contact: z
    .object({
      countryCode: z.string().min(1).max(4),
      contactType: z.string(),
      contactNumber: z.string().min(7).max(15),
      emailAddress: z.string().email(),
      whoseContactNumber: z.string(),
      whoseEmailAddress: z.string(),
    })
    .describe('UBO contact details'),
  identifier: z
    .array(
      z.object({
        identifierType: z.enum(['pan', 'panexemptrefno']),
        identifierNumber: z.string(),
        fileName: z.string().optional(),
        fileSize: z.number().optional(),
        fileBlob: z.string().optional(),
      }),
    )
    .min(1)
    .max(1)
    .describe('PAN identifier for UBO'),
  uboDeclarationFlag: z.boolean().optional().describe('UBO declaration flag'),
  exchangeName: z.string().optional().describe('Name of Exchange'),
  isin: z.string().optional().describe('ISIN code'),
  nameOfRelatedListedCompany: z
    .string()
    .optional()
    .describe('Name of related listed company'),
  uboCategory: z
    .string()
    .optional()
    .describe('UBO Category from ubocategory enum'),
  uboEmailId: z.string().email().optional().describe('UBO Email ID'),
  smoDesignation: z
    .string()
    .min(5)
    .max(20)
    .optional()
    .describe('SMO Designation'),
});

// UBO Schema
const UBOSchema = z
  .object({
    isUboApplicable: z.boolean().describe('Is UBO Applicable?'),
    uboCount: z.number().int().min(0).describe('Number of UBOs present'),
    uboDetail: z
      .array(UBODetailSchema)
      .optional()
      .describe(
        'UBO details - conditional mandatory if isUboApplicable is true',
      ),
  })
  .refine(
    data => {
      // If UBO is applicable, uboDetail must be provided and count must match
      if (data.isUboApplicable) {
        return (
          data.uboDetail &&
          data.uboDetail.length === data.uboCount &&
          data.uboCount > 0
        );
      }
      return true;
    },
    {
      message:
        'When isUboApplicable is true, uboDetail must be provided and match uboCount',
      path: ['uboDetail'],
    },
  );

// NPO Schema
const NPOSchema = z.object({
  npoForm: z.boolean().describe('Is NPO Form submitted'),
  npoDcl: z.boolean().describe('Is NPO declaration provided'),
  npoRgNo: z.string().describe('NPO registration number'),
});

/**
 * BSE FATCA Object
 */
export const BseFatcaSchema = z
  .object({
    HolderRank: z
      .number()
      .int()
      .min(1)
      .max(3)
      .describe('Holder rank (1=Primary, 2=Second, 3=Third)'),

    place_of_birth: z
      .string()
      .min(2)
      .max(60)
      .describe('Place of Birth e.g. New York'),

    country_of_birth: z
      .string()
      .min(2)
      .max(3)
      .describe('Country of Birth e.g. USA'),

    client_name: z
      .string()
      .min(2)
      .max(70)
      .describe('Name of person declaring FATCA (should match holder)'),

    investor_type: z
      .string()
      .describe('Type of Investor from investortype enum'),

    dob: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .describe('Date of birth in YYYY-MM-DD format'),

    father_name: z
      .string()
      .min(2)
      .max(70)
      .optional()
      .describe('Name of Father - conditional mandatory based on tax status'),

    spouse_name: z
      .string()
      .min(2)
      .max(70)
      .optional()
      .describe('Name of Spouse - conditional mandatory based on tax status'),

    address_type: z.string().describe('Type of Address from addresstype enum'),

    occ_code: z.string().describe('Occupation Code from occcode enum'),

    occ_type: z.string().describe('Occupation Type from occtype enum'),

    tax_status: z.string().describe('Tax Status from taxstatus enum'),

    exemption_code: z
      .string()
      .optional()
      .describe('Exemption Code - mandatory for non-individual'),

    identifier: 
        z.object({
          identifier_type: z.nativeEnum(IdentifierType),
          identifier_number: z.string(),
          file_name: z.string().optional(),
          file_size: z.number().optional(),
          file_blob: z.string().optional(),
        })
      .describe('PAN identifier (must match holder PAN)'),

    corporate_service_sector: z
      .string()
      .describe('Corporate Service Sector from corporateservicesector enum'),

    wealth_source: z.string().describe('Wealth Source from wealthsource enum'),

    income_slab: z.string().describe('Income Slab from incomeslab enum'),

    net_worth: z
      .number()
      .int()
      .min(3)
      .max(20)
      .describe('Net Worth (3-20 digits)'),

    date_of_net_worth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .describe('Date of net worth calculation in YYYY-MM-DD format'),

    politically_exposed: z
      .string()
      .describe('Is politically exposed from politicallyexposed enum'),

    is_self_declared: z
      .boolean()
      .optional()
      .describe('Is declaration self-declared'),

    data_source: z.string().describe('Data Source from datasource enum'),

    log_name: z
      .string()
      .optional()
      .describe(
        'Mandatory if dataSource is Electronic - e.g. 196.15.16.10723-Nov-15164',
      ),

    tax_residency: z
      .array(TaxResidencySchema)
      .min(1)
      .max(5)
      .describe('Country of Tax Residencies'),

    // Non-Individual specific fields (Conditional Mandatory)
    ffid_rnfe: z
      .string()
      .optional()
      .describe('FFI/DRNFE - mandatory for non-individual tax status'),

    is_giin_avail: z
      .string()
      .optional()
      .describe('Is GIIN available - mandatory if giinNo not provided'),

    giin_no: z
      .string()
      .length(19)
      .optional()
      .describe(
        'GIIN number (exactly 19 characters) - mandatory if isGiinAvail not selected',
      ),

    spr_name: z
      .string()
      .min(2)
      .max(70)
      .optional()
      .describe('Sponsor Name - mandatory if giinNo is provided'),

    nfe_category: z
      .string()
      .optional()
      .describe('NFE Category - mandatory for non-individual tax status'),

    nfe_sub_category: z
      .string()
      .optional()
      .describe('NFE Subcategory - mandatory if nfeCategory is selected'),

    nature_of_business: z
      .string()
      .min(2)
      .max(70)
      .optional()
      .describe(
        'Nature of Business - mandatory if nfeCategory is Active/Passive NFFE',
      ),

    nature_of_relation: z
      .string()
      .optional()
      .describe(
        'Nature of Relation - mandatory if nfeCategory is related to listed entity (RL)',
      ),

    // UBO - Conditional Mandatory for Non-Individual
    ubo: UBOSchema.optional().describe(
      'UBO details - mandatory for non-individual tax status',
    ),

    // NPO - Conditional Mandatory for Non-Individual
    npo: NPOSchema.optional().describe(
      'NPO details - mandatory for non-individual tax status',
    ),
  })
  .refine(
    data => {
      // Conditional validation for non-individual tax status
      const nonIndividualTaxCodes = [
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '22',
        '23',
        '25',
        '27',
        '29',
        '31',
        '32',
        '33',
        '34',
        '36',
        '37',
        '38',
        '39',
        '43',
        '44',
        '45',
        '46',
        '47',
        '48',
        '51',
        '52',
        '53',
        '54',
        '55',
        '56',
        '57',
        '58',
        '59',
        '60',
        '72',
        '73',
        '74',
        '75',
        '76',
      ];

      if (nonIndividualTaxCodes.includes(data.tax_status)) {
        return data.ffid_rnfe && data.nfe_category && data.ubo && data.npo;
      }
      return true;
    },
    {
      message:
        'For non-individual tax status, ffid_rnfe, nfe_category, ubo, and npo are mandatory',
      path: ['tax_status'],
    },
  )
  .refine(
    data => {
      // If dataSource is Electronic, log_name is mandatory
      if (data.data_source === 'E' || data.data_source === 'Electronic') {
        return !!data.log_name;
      }
      return true;
    },
    {
      message: 'log_name is mandatory when data_source is Electronic',
      path: ['log_name'],
    },
  )
  .refine(
    data => {
      // GIIN validation logic
      if (data.giin_no) {
        return !!data.spr_name; // If GIIN provided, sponsor name mandatory
      }
      if (!data.is_giin_avail && !data.giin_no) {
        return false; // Either GIIN or is_giin_avail must be provided
      }
      return true;
    },
    {
      message:
        'If giin_no is provided, spr_name is mandatory. Either giin_no or is_giin_avail must be selected.',
      path: ['giin_no'],
    },
  );

// ============================================================================
// BSE v2 API Request Schemas
// ============================================================================

/**
 * BSE Add UCC Request Schema
 * POST /v2/add_ucc
 *
 * Creates new UCC registration with complete investor details
 */

export const BseUccReqDataSchema = z.object({
  investor: BseInvestorSchema,
  is_multi_ucc: z.boolean().default(false),
  parent_client_code: z.string().max(20).optional(),
  pms_client: z.boolean().optional(),
  pms_code: z.string().max(20).optional(),
  holding_nature: HoldingNatureEnum,
  tax_code: z.nativeEnum(TaxCode),
  tax_status: z.nativeEnum(TaxStatus).optional(),
  rdmp_idcw_pay_mode: z.nativeEnum(RdmpIdcwPayModeValue).optional(),
  is_client_physical: z.boolean(),
  is_client_demat: z.boolean(),
  nomination_soa: z.boolean().optional(),
  is_nomination_opted: z.boolean(),
  nomination_auth_mode: z.nativeEnum(NominationAuthMode).optional(),
  comm_mode: z.nativeEnum(CommunicationModeValue),
  onboarding: z.nativeEnum(OnboardingType),
  holder: z.array(BseHolderSchema).min(1).max(5),

  comm_addr: BseCommAddrSchema,
  depository: z.array(BseDepositorySchema).max(5).optional(), //TODO only req when is_client_demat true
  bank_account: z.array(BseBankAccountSchema).min(1).max(5),
  // foreign_addr: BseForeignAddrSchema.optional(),
  fatca: z.array(BseFatcaSchema).optional(),
  identifiers: z.array(BseIdentifierSchema),
  aof: BseIdentifierSchema.optional(),
  aof_ria: BseIdentifierSchema.optional(),
});

export const BseAddUccRequestSchema = z.object({
  data: BseUccReqDataSchema,
});

/**
 * UCC Form Data Schema
 * Used for update operations where all fields are optional
 * 
 * This is a deep partial version of BseUccReqDataSchema where every field 
 * (including nested schemas) is optional.
 * Useful for UCC update APIs where users can modify specific fields without 
 * providing the complete payload.
 */
export const UccFormDataSchema = z.object({
  investor: BseInvestorSchema.partial().optional(),
  is_multi_ucc: z.boolean().optional(),
  parent_client_code: z.string().max(20).optional(),
  pms_client: z.boolean().optional(),
  pms_code: z.string().max(20).optional(),
  holding_nature: HoldingNatureEnum.optional(),
  tax_code: z.nativeEnum(TaxCode).optional(),
  tax_status: z.nativeEnum(TaxStatus).optional(),
  rdmp_idcw_pay_mode: z.nativeEnum(RdmpIdcwPayModeValue).optional(),
  is_client_physical: z.boolean().optional(),
  is_client_demat: z.boolean().optional(),
  nomination_soa: z.boolean().optional(),
  is_nomination_opted: z.boolean().optional(),
  nomination_auth_mode: z.nativeEnum(NominationAuthMode).optional(),
  comm_mode: z.nativeEnum(CommunicationModeValue).optional(),
  onboarding: z.nativeEnum(OnboardingType).optional(),
  holder: z.array(BseHolderSchema.deepPartial()).optional(),
  comm_addr: BseCommAddrSchema.partial().optional(),
  depository: z.array(BseDepositorySchema.deepPartial()).optional(),
  bank_account: z.array(BseBankAccountSchema.deepPartial()).optional(),
  fatca: z.array(z.any()).optional(), // BseFatcaSchema has refinements, making all optional
  identifiers: z.array(BseIdentifierSchema.partial()).optional(),
  aof: BseIdentifierSchema.partial().optional(),
  aof_ria: BseIdentifierSchema.partial().optional(),
});

/**
 * BSE Update UCC Request Schema
 * POST /v2/update_ucc
 *
 * Updates existing UCC with partial data
 * Supports add/delete operations for banks and depositories
 */
export const BseUpdateUccRequestSchema = z.object({
  data: z.object({
    member: BseMemberSchema,
    investor: BseInvestorSchema,
    parentclientcode: z.string().max(20).optional(),
    holdingnature: HoldingNatureEnum.optional(),
    taxstatus: z.string().max(10).optional(),
    taxcode: z.string().max(10).optional(),
    holder: BseHolderSchema.optional(),
    bankaccount: z
      .object({
        add: z.array(BseBankAccountSchema).optional(),
        delete: z
          .array(
            z.object({
              ifsccode: z.string().regex(IFSC_REGEX),
              bankaccnum: z.string().regex(ACCOUNT_NUMBER_REGEX),
            }),
          )
          .optional(),
      })
      .optional(),
    depository: z
      .object({
        add: z.array(BseDepositorySchema).optional(),
        delete: z
          .array(
            z.object({
              depositorycode: z.enum(['NSDL', 'CDSL']),
              dpid: z.string(),
              clientid: z.string(),
            }),
          )
          .optional(),
      })
      .optional(),
    commaddr: BseCommAddrSchema.optional(),
    foreignaddr: BseForeignAddrSchema.optional(),
    contact: BseContactSchema.optional(),
    uccstatus: z.enum(['active', 'inactive']).optional(),
    identifiers: z.array(BseIdentifierSchema).optional(),
  }),
});

/**
 * BSE Get UCC Request Schema
 * POST /v2/get_ucc
 *
 * Retrieves complete UCC details from BSE
 */
export const BseGetUccRequestSchema = z.object({
  data: z.object({
    member: BseMemberSchema,
    investor: BseInvestorSchema,
    parentclientcode: z.string().max(20).optional(),
  }),
});

// ============================================================================
// BSE v2 API Response Schemas
// ============================================================================

/**
 * BSE Bank Account Response Object
 * Returned from BSE get_ucc - includes verification status
 */
export const BseBankAccountResponseSchema = z.object({
  bankaccnum: z.string(),
  ifsccode: z.string(),
  bankacctype: z.string(),
  bankname: z.string().optional(),
  verifiedstatus: z.string().optional(),
  verificationfailedreason: z.string().optional(),
  verifiedat: z.string().optional(),
});

/**
 * BSE Holder Response Object
 */
export const BseHolderResponseSchema = z.object({
  holderrank: z.number(),
  person: BsePersonSchema,
  contact: BseContactSchema,
  identifier: z.array(BseIdentifierSchema),
  kyctype: z.string(),
  ckycnumber: z.string().optional(),
});

/**
 * BSE UCC Status Object
 * Contains verification status per RTA and transaction readiness
 */
export const BseUccStatusObjectSchema = z.object({
  holders: z
    .array(
      z.object({
        holderrank: z.number(),
        verifiedstatus: z.string(),
        verificationfailedreason: z.string().optional(),
      }),
    )
    .optional(),
  bankaccount: z
    .array(
      z.object({
        bankaccnum: z.string(),
        verifiedstatus: z.string(),
        verificationfailedreason: z.string().optional(),
      }),
    )
    .optional(),
  depository: z
    .array(
      z.object({
        dpid: z.string(),
        verifiedstatus: z.string(),
        verificationfailedreason: z.string().optional(),
      }),
    )
    .optional(),
  transactionready: z
    .array(
      z.object({
        rta: z.string(),
        physical: z.string(), // Y/N
        demat: z.string(), // Y/N
      }),
    )
    .optional(),
});

/**
 * BSE API Message Object
 */
export const BseApiMessageSchema = z.object({
  msgid: z.string(),
  errcode: z.string(),
  field: z.string().optional(),
  vals: z.array(z.string()).optional(),
});

/**
 * BSE UCC API Response Schema
 * Common response structure for add/update/get operations
 */
export const BseUccResponseSchema = z.object({
  status: z.enum(['success', 'error']),
  data: z
    .object({
      clientcode: z.string().optional(),
      membercode: z.string().optional(),
      status: z.string().optional(),
      holdingnature: z.string().optional(),
      taxstatus: z.string().optional(),
      taxcode: z.string().optional(),
      rdmpidcwpaymode: z.string().optional(),
      isclientphysical: z.boolean().optional(),
      isclientdemat: z.boolean().optional(),
      isnominationopted: z.boolean().optional(),
      commmode: z.string().optional(),
      holder: z.array(BseHolderResponseSchema).optional(),
      bankaccount: z.array(BseBankAccountResponseSchema).optional(),
      depository: z.array(z.any()).optional(),
      commaddr: BseCommAddrSchema.optional(),
      foreignaddr: BseForeignAddrSchema.optional(),
      uccstatusobj: BseUccStatusObjectSchema.optional(),
    })
    .optional(),
  messages: z.array(BseApiMessageSchema),
});

// ============================================================================
// User-Facing API Schemas (Simplified from BSE format)
// ============================================================================

/**
 * User-Facing: Add Bank Account Request
 * POST /api/ucc/bank-account
 *
 * Simplified request - service layer converts to BSE v2 format
 */
export const AddBankAccountRequestSchema = z.object({
  ifscCode: z.string().regex(IFSC_REGEX, 'Invalid IFSC code format'),
  accountNumber: z
    .string()
    .regex(ACCOUNT_NUMBER_REGEX, 'Account number must be 9-20 digits'),
  accountType: BankAccountTypeEnum,
  bankName: z.string().max(100).optional(),
  // Document for verification
  cancelledCheque: z
    .object({
      filename: z.string().min(1).max(255),
      filesize: z.number().int().positive(),
      fileblob: z.string().min(1), // base64 encoded
    })
    .optional(),
});

/**
 * User-Facing: UCC Registration Request
 * POST /api/ucc/register
 *
 * Complete UCC registration with profile, PAN, and bank account
 * CRITICAL: PAN and bank details sent to BSE API only - NEVER stored locally
 */
export const UccRegisterRequestSchema = AddBankAccountRequestSchema.extend({
  // PAN (sent to BSE, NOT stored locally)
  pan: panSchema,

  // Required profile fields
  primaryHolderFirstName: z.string().min(1).max(100),
  primaryHolderLastName: z.string().max(100).optional(),
  primaryHolderDob: z
    .string()
    .regex(DATE_REGEX, 'Date must be in YYYY-MM-DD format'),
  gender: z.nativeEnum(Gender),
  // Required address fields
  address1: z.string().min(1).max(255),
  address2: z.string().max(255).optional(),
  address3: z.string().max(255).optional(),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  pincode: z.string().regex(PINCODE_REGEX, 'Pincode must be 6 digits'),
  country: z.string(),

  // Optional fields
  taxStatus: z.nativeEnum(TaxCode).optional(),
  occupationCode: z.nativeEnum(OccupationCode).optional(),
});

/**
 * User-Facing: Update Profile Request
 * PUT /api/ucc/profile
 *
 * Updates contact and address information
 */
export const UpdateProfileRequestSchema = z.object({
  email: z.string().email().max(255).optional(),
  mobile: z.string().regex(MOBILE_REGEX, 'Mobile must be 10 digits').optional(),
  address: z
    .object({
      addressline1: z.string().min(1).max(255).optional(),
      addressline2: z.string().max(255).optional(),
      addressline3: z.string().max(255).optional(),
      city: z.string().min(1).max(100).optional(),
      state: z.string().min(1).max(100).optional(),
      country: z.string().length(3).optional(),
      postalcode: z
        .string()
        .regex(PINCODE_REGEX, 'Postal code must be 6 digits')
        .optional(),
    })
    .optional(),
});

/**
 * User-Facing: UCC Details Response
 * GET /api/ucc/details
 *
 * Transformed from BSE response - NO sensitive data exposure
 */
export const UccDetailsResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    /** BSE-assigned UCC */
    clientCode: z.string(),
    /** BSE member code */
    memberCode: z.string(),
    /** Current UCC status */
    uccStatus: z.enum(['ACTIVE', 'PENDING_APPROVAL', 'REJECTED', 'INACTIVE']),
    /** Holder details (Primary, Joint if applicable) */
    holders: z.array(
      z.object({
        holderType: z.enum(['Primary', 'Secondary', 'Third']),
        firstName: z.string(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
        /** Last 4 characters of PAN (masked by BSE) - e.g., "****F" */
        panLast4: z.string(),
        dob: z.string(), // ISO date format
        gender: z.enum(['M', 'F', 'O']),
        address: z.object({
          address1: z.string(),
          address2: z.string().optional(),
          address3: z.string().optional(),
          city: z.string(),
          state: z.string(),
          pincode: z.string(),
          country: z.string(),
        }),
        /** Tax status code (01-26) */
        taxStatus: z.string(),
        /** Occupation code */
        occupationCode: z.string().optional(),
      }),
    ),
    /** Registered bank accounts with verification status */
    bankAccounts: z.array(
      z.object({
        bankName: z.string(),
        branchName: z.string().optional(),
        ifscCode: z.string(),
        /** Last 4 digits of account (masked by BSE) - e.g., "****1234" */
        accountLast4: z.string(),
        accountType: z.enum(['SB', 'CA', 'CC', 'NRE', 'NRO']),
        /** Whether this is the default bank for redemptions */
        defaultFlag: z.boolean(),
        /** Bank verification status */
        verified: z.boolean(),
        /** Verification timestamp (if verified) */
        verifiedDate: z.string().optional(), // ISO timestamp
      }),
    ),
    /** Transaction readiness per RTA (physical transactions only for MVP) */
    transactionReadiness: z.object({
      camsPhysical: z.boolean(),
      karviPhysical: z.boolean(),
      franklinPhysical: z.boolean(),
    }),
  }),
});

/**
 * User-Facing: UCC Registration Response
 * POST /api/ucc/register
 *
 * Response for successful UCC registration
 */
export const UccRegisterSuccessResSchema = z.object({
  status: z.enum(['success', 'error']),
  data: z.object({
    client_code: z.string().min(1).max(20),
    member_code: z.string().min(1).max(20),
    parent_client_code: z.string().optional(),
    status: z.string().min(1).max(50),
  }),
  messages: z.array(BseApiMessageSchema),
});

/**
 * User-Facing: Bank Account Add Request
 * POST /api/ucc/bank-account
 *
 * Request body for adding bank account to UCC
 */
export const BankAccountAddRequestSchema = z.object({
  /** Bank account number (9-18 digits). NOT STORED LOCALLY. */
  accountNumber: z
    .string()
    .regex(ACCOUNT_NUMBER_REGEX, 'Account number must be 9-20 digits'),
  /** IFSC code (11 chars: 4 letters + 0 + 6 alphanumeric) */
  ifscCode: z.string().regex(IFSC_REGEX, 'Invalid IFSC code format'),
  /** Account type: SB (Savings), CA (Current), CC (Cash Credit), NRE, NRO */
  accountType: BankAccountTypeEnum,
  /** Bank name (optional - derived from IFSC if not provided) */
  bankName: z.string().optional(),
  /** Branch name (optional) */
  branchName: z.string().optional(),
  /** Set as default bank for redemptions (optional, first bank auto-defaults) */
  setAsDefault: z.boolean().optional(),
});

/**
 * User-Facing: Bank Account Add Response
 * POST /api/ucc/bank-account
 *
 * Response for successful bank account addition
 */
export const BankAccountAddResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    /** Local bank account reference ID */
    bankAccountId: z.string(),
    bankName: z.string(),
    ifscCode: z.string(),
    accountType: z.string(),
    /** Whether this is the default bank */
    defaultFlag: z.boolean(),
    message: z.string(),
  }),
});

/**
 * User-Facing: Bank Account Update Request
 * PUT /api/ucc/bank-account/[id]
 *
 * Request body for updating bank account
 * Currently only supports changing default bank flag
 */
export const BankAccountUpdateRequestSchema = z.object({
  /** Set/unset as default bank for redemptions */
  setAsDefault: z.boolean().optional(),
});

/**
 * User-Facing: Bank Account Update Response
 * PUT /api/ucc/bank-account/[id]
 *
 * Response for successful bank account update
 */
export const BankAccountUpdateResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    bankAccountId: z.string(),
    defaultFlag: z.boolean(),
    message: z.string(),
  }),
});

/**
 * User-Facing: Profile Update Request (Simplified)
 * PUT /api/ucc/profile
 *
 * Only allows updating mutable fields - immutable fields (PAN, DOB, gender, tax status) cannot be changed
 */
export const ProfileUpdateRequestSchema = z.object({
  /** Email address */
  email: z.string().email().max(255).optional(),
  /** Mobile number */
  mobile: z.string().regex(MOBILE_REGEX, 'Mobile must be 10 digits').optional(),
  /** Address line 1 */
  address1: z.string().min(1).max(255).optional(),
  /** Address line 2 */
  address2: z.string().max(255).optional(),
  /** Address line 3 */
  address3: z.string().max(255).optional(),
  /** City */
  city: z.string().min(1).max(100).optional(),
  /** State */
  state: z.string().min(1).max(100).optional(),
  /** Pincode (6 digits) */
  pincode: z
    .string()
    .regex(PINCODE_REGEX, 'Pincode must be 6 digits')
    .optional(),
  /** Country code (3 chars) */
  country: z.string().length(3).optional(),
});

/**
 * User-Facing: Profile Update Response
 * PUT /api/ucc/profile
 *
 * Response for successful profile update
 */
export const ProfileUpdateResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    message: z.string(),
    updatedFields: z.array(z.string()),
  }),
});

/**
 * Standard API Error Response
 * Used across all endpoints
 * Uses ErrorResponse class from @/lib/errorResponse
 */
export const ApiErrorResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
  status: z.number(),
  details: z.record(z.unknown()).optional(),
});

/**
 * Profile Completeness Validation Result
 * Used internally by validateProfileCompleteness helper
 */
export const ProfileCompletenessResultSchema = z.object({
  valid: z.boolean(),
  missingFields: z.array(z.string()),
});

/**
 * User-Facing: UCC Details For User Response (Simplified)
 * Internal API response with minimal PII
 * Used by getUccDetailsForUser function
 */
export const UccDetailsForUserResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    clientCode: z.string(),
    memberCode: z.string(),
    uccStatus: z.string(),
    holders: z.array(
      z.object({
        rank: z.number(),
        name: z.string(),
        email: z.string().optional(),
        mobile: z.string().optional(),
      }),
    ),
    bankAccounts: z.array(
      z.object({
        bankName: z.string(),
        ifscCode: z.string(),
        verified: z.boolean(),
        verificationStatus: z.string().optional(),
        verifiedAt: z.string().optional(),
      }),
    ),
    transactionReady: z.union([
      z.boolean(),
      z.object({
        canInvestPhysical: z.boolean(),
        canInvestDemat: z.boolean(),
        rtaStatus: z.array(
          z.object({
            rta: z.string(),
            physical: z.boolean(),
            demat: z.boolean(),
          }),
        ),
      }),
    ]),
    verificationFailures: z.array(
      z.object({
        type: z.enum(['holder', 'bank', 'depository']),
        identifier: z.string(),
        reason: z.string(),
      }),
    ),
  }),
});

// ============================================================================
// Type Exports
// ============================================================================

// BSE v2 API Types
export type BseUccReqData = z.infer<typeof BseUccReqDataSchema>;
export type UccFormData = z.infer<typeof UccFormDataSchema>;
export type BseAddUccRequest = z.infer<typeof BseAddUccRequestSchema>;
export type BseUpdateUccRequest = z.infer<typeof BseUpdateUccRequestSchema>;
export type BseGetUccRequest = z.infer<typeof BseGetUccRequestSchema>;
export type BseUccResponse = z.infer<typeof BseUccResponseSchema>;
export type BseBankAccount = z.infer<typeof BseBankAccountSchema>;
export type BseHolder = z.infer<typeof BseHolderSchema>;
export type BsePerson = z.infer<typeof BsePersonSchema>;
export type BseContact = z.infer<typeof BseContactSchema>;
export type BseIdentifier = z.infer<typeof BseIdentifierSchema>;
export type BseCommAddr = z.infer<typeof BseCommAddrSchema>;
export type BseForeignAddr = z.infer<typeof BseForeignAddrSchema>;
export type BseDepository = z.infer<typeof BseDepositorySchema>;
export type BseFatca = z.infer<typeof BseFatcaSchema>;
export type BseUccStatusObject = z.infer<typeof BseUccStatusObjectSchema>;

// User-Facing API Types
export type AddBankAccountRequest = z.infer<typeof AddBankAccountRequestSchema>;
export type UccRegisterRequest = z.infer<typeof UccRegisterRequestSchema>;
export type UccRegisterSuccessRes = z.infer<typeof UccRegisterSuccessResSchema>;
export type UccDetailsResponse = z.infer<typeof UccDetailsResponseSchema>;
export type UccDetailsForUserResponse = z.infer<
  typeof UccDetailsForUserResponseSchema
>;
export type BankAccountAddRequest = z.infer<typeof BankAccountAddRequestSchema>;
export type BankAccountAddResponse = z.infer<
  typeof BankAccountAddResponseSchema
>;
export type BankAccountUpdateRequest = z.infer<
  typeof BankAccountUpdateRequestSchema
>;
export type BankAccountUpdateResponse = z.infer<
  typeof BankAccountUpdateResponseSchema
>;
export type ProfileUpdateRequest = z.infer<typeof ProfileUpdateRequestSchema>;
export type ProfileUpdateResponse = z.infer<typeof ProfileUpdateResponseSchema>;
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
export type ProfileCompletenessResult = z.infer<
  typeof ProfileCompletenessResultSchema
>;

// Common Types
export type BankAccountType = z.infer<typeof BankAccountTypeEnum>;
export type HoldingNature = z.infer<typeof HoldingNatureEnum>;
export type CommMode = z.infer<typeof CommModeEnum>;
