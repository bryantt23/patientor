import { State } from "./state";
import {
  Patient, ADD_PATIENT, SET_PATIENT_LIST, ADD_PATIENT_TO_CACHE, SET_DIAGNOSIS_CODES,
  SetPatientListAction, AddPatientAction, AddPatientToCacheAction, Action, DiagnoseEntry, SetDiagnosisCodes
} from "../types";

const setDiagnosisCodes = (diagnosisCodes: DiagnoseEntry[]): SetDiagnosisCodes => {
  return {
    type: SET_DIAGNOSIS_CODES,
    payload: diagnosisCodes
  };
};

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

export { setPatientList, addPatient, addPatientToCache, setDiagnosisCodes };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_DIAGNOSIS_CODES:
      return {
        ...state,
        diagnosisCodes: action.payload
      };
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
