import { State } from "./state";
import { Patient } from "../types";

export const SET_PATIENT_LIST = 'SET_PATIENT_LIST';

interface SetPatientListAction {
  type: typeof SET_PATIENT_LIST;
  payload: Patient[];
}

const setPatientList = (patients: Patient[]): SetPatientListAction => {
  return {
    type: SET_PATIENT_LIST,
    payload: patients
  };
};

export default setPatientList;
export type Action =
  // | {
  //   type: "SET_PATIENT_LIST";
  //   payload: Patient[];
  // }
  // | 
  SetPatientListAction |
  {
    type: "ADD_PATIENT";
    payload: Patient;
  } | {
    type: "ADD_PATIENT_TO_CACHE";
    payload: Patient;
  };

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
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_TO_CACHE":
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
