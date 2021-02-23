import React, { useState } from 'react';

const OccupationalHealthcare: React.FC<any> = ({ onSubmit }) => {
  const [date, setDate] = useState('2019-05-01');
  const [specialist, setSpecialist] = useState('Dr Holmes');
  const [description, setDescription] = useState('my description');
  const [employerName, setEmployerName] = useState('No employer');

  const handleSubmit = () => {
    onSubmit({
      date,
      specialist,
      description,
      type: 'OccupationalHealthcare',
      employerName
    });
  };

  return (
    <div>
      <form>
        <h3>Add Entry Form</h3>

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
          Employer Name:
          <input
            type='text'
            name='description'
            value={employerName}
            onChange={e => {
              setEmployerName(e.target.value);
            }}
          />
        </label>

        <div>
          <button
            type='submit'
            onClick={e => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Add Entry
          </button>
        </div>
      </form>
    </div>
  );
};
export default OccupationalHealthcare;
