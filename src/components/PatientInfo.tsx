import React, { useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
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

  const [{ cachedPatients }, dispatch] = useStateValue();

  const getPatientFromCache: (id: string) => Patient | undefined = id => {
    return cachedPatients[id];
  };

  console.log('cachedPatients', cachedPatients);

  React.useEffect(() => {
    const id = props.match.params.id;

    //TODO maybe add type
    const fetchPatient = async () => {
      try {
        const cachedPatient = getPatientFromCache(id);
        console.log('cachedPatient', cachedPatient);
        if (cachedPatient) {
          console.log('patient from cache');
          setPatient(cachedPatient);
          return;
        }

        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(data);
        console.log('patient from api call');
        dispatch({ type: 'ADD_PATIENT_TO_CACHE', payload: data });
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