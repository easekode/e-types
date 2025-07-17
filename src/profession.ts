import { z } from 'zod';

export enum ProfessionEnum {
  DOCTOR = 'DOCTOR',
  CHARTERED_ACCOUNTANT = 'CHARTERED_ACCOUNTANT',
  OTHERS = 'OTHERS',
}

export const ProfessionSchema = z.nativeEnum(ProfessionEnum);
export type Profession = z.infer<typeof ProfessionSchema>;

export enum DEGREES {
  BAMS = 'BAMS',
  BDS = 'BDS',
  BHMS = 'BHMS',
  DIPLOMA = 'DIPLOMA',
  DM_MCH = 'DM/MCH',
  DHMS = 'DHMS',
  DNB = 'DNB',
  MBBS = 'MBBS',
  MD = 'MD',
  MDS = 'MDS',
  MS = 'MS',
  BVSC = 'B.V.Sc',
}

export enum CA_COUNCIL {
  CA = 'CA',
  CS = 'CS',
  ICWA = 'ICWA',
}

export enum SALARY_NON_SALARY {
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  SALARIED = 'SALARIED',
}

export enum SPECIALIZATION {
  ENDODONTIST = 'ENDODONTIST',
  DENTIST = 'DENTIST',
  IMPLANTOLOGIST = 'IMPLANTOLOGIST',
  ORTHODONTIST = 'ORTHODONTIST',
  PERIODONTICS = 'PERIODONTICS',
}
