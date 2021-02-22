export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export const SET_PATIENT_LIST = 'SET_PATIENT_LIST';
export const SET_DIAGNOSIS_CODES = 'SET_DIAGNOSIS_CODES';
export const ADD_PATIENT = 'ADD_PATIENT';
export const ADD_PATIENT_TO_CACHE = 'ADD_PATIENT_TO_CACHE';

export interface SetDiagnosisCodes {
  type: typeof SET_DIAGNOSIS_CODES;
  payload: DiagnoseEntry[];
}
export interface SetPatientListAction {
  type: typeof SET_PATIENT_LIST;
  payload: Patient[];
}
export interface AddPatientAction {
  type: typeof ADD_PATIENT;
  payload: Patient;
}
export interface AddPatientToCacheAction {
  type: typeof ADD_PATIENT_TO_CACHE;
  payload: Patient;
}

export type Action = SetDiagnosisCodes |
  SetPatientListAction |
  AddPatientToCacheAction | AddPatientAction;

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: number;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;