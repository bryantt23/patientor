import React, { useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
// import { genderless, DropdownProps, Form } from 'semantic-ui-react';

import { Icon } from 'semantic-ui-react';
/*
plan
get patient info from api

add state of accessed patients

change logic to first check accessed patients, if id is there just grab it from state
if not then 
    get patient info from api
    create new action to add patient info to state

*/
// interface IMyProps {}

const PatientInfo: React.FC = (props: any) => {
  // https://www.carlrippon.com/typed-usestate-with-typescript/
  const [patient, setPatient] = useState<Patient | null>(null);

  React.useEffect(() => {
    const patientId = props.match.params.id;

    //TODO maybe add type
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        console.log(data);
        // const res = await data.json();
        // console.log(res);
        setPatient(data);
        // dispatch({ type: 'SET_PATIENT_LIST', payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, []);

  let genderIcon;
  if (!patient) {
    return <p>Loading....</p>;
  } else {
    if (patient.gender === 'male') {
      genderIcon = <Icon name='mars' />;
    } else if (patient.gender === 'female') {
      genderIcon = <Icon name='venus' />;
    } else {
      genderIcon = <Icon name='genderless' />;
    }
  }

  return (
    <div>
      <h1>
        {patient.name} {genderIcon}
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>dateOfBirth: {patient.dateOfBirth}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientInfo;
