import { State } from "./state";
import { Patient } from "../types";

export const SET_PATIENT_LIST = 'SET_PATIENT_LIST';
export const ADD_PATIENT = 'ADD_PATIENT';
export const ADD_PATIENT_TO_CACHE = 'ADD_PATIENT_TO_CACHE';

interface SetPatientListAction {
  type: typeof SET_PATIENT_LIST;
  payload: Patient[];
}
interface AddPatientAction {
  type: typeof ADD_PATIENT;
  payload: Patient;
}
interface AddPatientToCacheAction {
  type: typeof ADD_PATIENT_TO_CACHE;
  payload: Patient;
}

const setPatientList = (patients: Patient[]): SetPatientListAction => {
  return {
    type: SET_PATIENT_LIST,
    payload: patients
  };
};

const addPatient = (patient: Patient): AddPatientAction => {
  return {
    type: ADD_PATIENT,
    payload: patient
  };
};

const addPatientToCache = (patient: Patient): AddPatientToCacheAction => {
  return {
    type: ADD_PATIENT_TO_CACHE,
    payload: patient
  };
};

export { setPatientList, addPatient, addPatientToCache };

export type Action =
  SetPatientListAction |
  AddPatientToCacheAction | AddPatientAction;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_PATIENT_LIST:
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case ADD_PATIENT_TO_CACHE:
      return {
        ...state,
        cachedPatients: {
          ...state.cachedPatients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
