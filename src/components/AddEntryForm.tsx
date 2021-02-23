import { useStateValue } from '../state';
import React, { useEffect, useState } from 'react';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthcare';
import Hospital from './Hospital';

const AddEntryForm: React.FC<any> = ({ onSubmit, message }) => {
  const [{ diagnosisCodes }] = useStateValue();
  const [selectedDiagnosis, setSelectedDiagnosis] = useState('');
  console.log(diagnosisCodes);
  console.log(selectedDiagnosis);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedDiagnosis(e.target.value);
  };

  const entryTypes = ['Hospital', 'OccupationalHealthcare', 'HealthCheck'];
  const [entryType, setEntryType] = useState(entryTypes[0]);

  console.log(entryType);

  let entryComponent;
  if (entryType === 'HealthCheck') {
    entryComponent = <HealthCheck onSubmit={(obj: object) => onSubmit(obj)} />;
  } else if (entryType === 'Hospital') {
    entryComponent = <Hospital onSubmit={(obj: object) => onSubmit(obj)} />;
  } else {
    entryComponent = <OccupationalHealthcare />;
  }
  return (
    <div>
      <div>{message}</div>
      <label>
        Select Entry type:
        <select onChange={e => setEntryType(e.target.value)}>
          {entryTypes.map((entry, i) => (
            <option key={i} value={entry}>
              {entry}
            </option>
          ))}
        </select>
      </label>
      {diagnosisCodes && (
        <select onChange={e => handleChange(e)}>
          {diagnosisCodes.map(diagnosis => (
            <option key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.name}
            </option>
          ))}
        </select>
      )}
      <div>{entryComponent}</div>{' '}
    </div>
  );
};

export default AddEntryForm;
