import React, { useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Entry, Patient } from '../types';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { addPatientToCache } from '../state/reducer';
import Entries from './Entries';
import AddEntryForm from './AddEntryForm';

const PatientInfo: React.FC = (props: any) => {
  // https://www.carlrippon.com/typed-usestate-with-typescript/
  const [patient, setPatient] = useState<Patient | null>(null);
  const [message, setMessage] = useState('bb');

  const [{ cachedPatients }, dispatch] = useStateValue();

  const getPatientFromCache: (id: string) => Patient | undefined = id => {
    return cachedPatients[id];
  };

  console.log('cachedPatients', cachedPatients);

  const fetchPatient = async (id: string, fromSubmit: boolean) => {
    try {
      const cachedPatient = getPatientFromCache(id);
      console.log('cachedPatient', cachedPatient);
      if (cachedPatient && !fromSubmit) {
        console.log('patient from cache', cachedPatient);
        setPatient(cachedPatient);
        return;
      }

      const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      setPatient(data);
      console.log('patient from api call', data);
      dispatch(addPatientToCache(data));
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    const id = props.match.params.id;

    //TODO maybe add type
    fetchPatient(id, false);
  }, [patient]);

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

  const addEntry = async (entryInfo: any) => {
    try {
      const res = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        entryInfo
      );
      console.log('res', res);
      setMessage('good');
      fetchPatient(patient.id, true);
    } catch (e) {
      setMessage(`
      
      
      
      error
      
      ${e.message}
      
      
      
      `);
      console.error(
        `
      
      
      
      error
      
      ${e.message}
      
      
      
      `,
        e
      );
    }
  };

  const handleSubmit = (entryInfo: object) => {
    console.log('handleSubmit', entryInfo);
    console.log('patient', patient);
    addEntry({ ...entryInfo, type: 'HealthCheck' });
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
        onSubmit={(obj: object) => handleSubmit(obj)}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel={() => {}}
        message={message}
      />
      <Entries entries={patient.entries} />
    </div>
  );
};

export default PatientInfo;
