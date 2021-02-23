import React, { useState } from 'react';

const HealthCheck: React.FC<any> = ({ onSubmit }) => {
  const [date, setDate] = useState('2019-05-01');
  const [specialist, setSpecialist] = useState('Dr House');
  const [description, setDescription] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const handleSubmit = () => {
    onSubmit({
      date,
      specialist,
      description,
      healthCheckRating,
      type: 'HealthCheck'
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

export default HealthCheck;
