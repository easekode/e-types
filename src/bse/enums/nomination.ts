export enum NominationOpt {
  YES = 'Y',
  NO = 'N',
}

export enum NominationAuthenticationMode {
  WetSignature = 'W',
  Esign = 'E',
  OTP = 'O',
}

export enum NomineeRelationship {
  Aunt = '01',
  BrotherInLaw = '02',
  Brother = '03',
  Daughter = '04',
  DaughterInLaw = '05',
  Father = '06',
  FatherInLaw = '07',
  GrandDaughter = '08',
  GrandFather = '09',
  GrandMother = '10',
  GrandSon = '11',
  MotherInLaw = '12',
  Mother = '13',
  Nephew = '14',
  Niece = '15',
  Sister = '16',
  SisterInLaw = '17',
  Son = '18',
  SonInLaw = '19',
  Spouse = '20',
  Uncle = '21',
  Others = '22',
  CourtAppointedGuardian = '23',
}

export enum NomineeMinorFlag {
  YES = 'Y',
  NO = 'N',
}

export enum NomineeIdentityType {
  PAN = '1',
  Aadhaar = '2',
  DrivingLicence = '3',
  Passport = '4',
}
