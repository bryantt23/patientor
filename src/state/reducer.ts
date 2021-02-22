import { State } from "./state";
import {
  Patient, ADD_PATIENT, SET_PATIENT_LIST, ADD_PATIENT_TO_CACHE,
  SetPatientListAction, AddPatientAction, AddPatientToCacheAction, Action
} from "../types";

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
