export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
  }
  
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
  }

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
  }

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export type PublicPatient = Omit<Patient, 'ssn'| 'entries'>;
export type NewPatient = Omit<Patient, 'id' | 'entries'>;
  