import { useStateValue } from '../state';
import React, { useEffect, useState } from 'react';

const AddEntryForm: React.FC<any> = ({ onSubmit, message }) => {
  const [{ diagnosisCodes }] = useStateValue();
  const [selectedDiagnosis, setSelectedDiagnosis] = useState('');
  const [date, setDate] = useState('2019-05-01');
  const [specialist, setSpecialist] = useState('Dr House');
  const [description, setDescription] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  console.log(diagnosisCodes);
  console.log(selectedDiagnosis);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedDiagnosis(e.target.value);
  };

  return (
    <div>
      <div id='LOADING'>{message}</div>
      <form>
        <h3>Add Entry Form</h3>
        {diagnosisCodes && (
          <select onChange={e => handleChange(e)}>
            {diagnosisCodes.map(diagnosis => (
              <option key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.name}
              </option>
            ))}
          </select>
        )}

        <label>
          Date:
          <input
            type='text'
            name='date'
            value={date}
            onChange={e => {
              setDate(e.target.value);
            }}
          />
        </label>
        <label>
          Specialist:
          <input
            type='text'
            name='specialist'
            value={specialist}
            onChange={e => {
              setSpecialist(e.target.value);
            }}
          />
        </label>
        <label>
          Description:
          <input
            type='text'
            name='description'
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </label>
        <label>
          Health Check Rating:
          <input
            type='number'
            name='healthCheckRating'
            value={healthCheckRating}
            onChange={e => {
              setHealthCheckRating(Number(e.target.value));
            }}
          />
        </label>

        <div>
          <button
            type='submit'
            onClick={e => {
              e.preventDefault();
              onSubmit({ date, specialist, description, healthCheckRating });
            }}
          >
            Add Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;
