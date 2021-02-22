import React, { useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { addPatientToCache } from '../state/reducer';
import Entries from './Entries';
import AddEntryForm from './AddEntryForm';

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
          console.log('patient from cache', cachedPatient);
          setPatient(cachedPatient);
          return;
        }

        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(data);
        console.log('patient from api call', data);
        dispatch(addPatientToCache(data));
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

  const handleSubmit = (e: { preventDefault: (arg0: any) => void }) => {
    e.preventDefault(e);
    console.log('handleSubmit');
  };

  return (
    <div>
      <h1>
        {patient.name} {genderIcon}
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>dateOfBirth: {patient.dateOfBirth}</p>
      <p>occupation: {patient.occupation}</p>
      <AddEntryForm
        onSubmit={(e: any) => handleSubmit(e)}
        onCancel={() => {}}
      />
      <Entries entries={patient.entries} />
    </div>
  );
};

export default PatientInfo;
