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
}

export const SET_PATIENT_LIST = 'SET_PATIENT_LIST';
export const ADD_PATIENT = 'ADD_PATIENT';
export const ADD_PATIENT_TO_CACHE = 'ADD_PATIENT_TO_CACHE';

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

export type Action =
  SetPatientListAction |
  AddPatientToCacheAction | AddPatientAction;