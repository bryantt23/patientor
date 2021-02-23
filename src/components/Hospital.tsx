import React, { useState } from 'react';

const Hospital: React.FC<any> = ({ onSubmit }) => {
  const [date, setDate] = useState('2019-05-01');
  const [specialist, setSpecialist] = useState('Dr Cuddy');
  const [description, setDescription] = useState('description');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [dischargeDate, setDischargeDate] = useState('2019-05-11');
  const [dischargeCriteria, setDischargeCriteria] = useState(
    'get healthy for discharget'
  );

  const handleSubmit = () => {
    onSubmit({
      date,
      specialist,
      description,
      type: 'Hospital',
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria
      }
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
        <label>
          Discharge Date:
          <input
            type='text'
            name='date'
            value={dischargeDate}
            onChange={e => {
              setDischargeDate(e.target.value);
            }}
          />
        </label>
        <label>
          Discharge Criteria:
          <input
            type='text'
            name='description'
            value={dischargeCriteria}
            onChange={e => {
              setDischargeCriteria(e.target.value);
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
export default Hospital;
