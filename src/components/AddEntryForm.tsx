import { useStateValue } from '../state';
import React from 'react';

const AddEntryForm: React.FC<any> = ({ onSubmit }) => {
  const [{ diagnosisCodes }] = useStateValue();
  console.log(diagnosisCodes);
  return (
    <form>
      AddEntryForm
      <button type='submit' onClick={() => onSubmit()}>
        click
      </button>
    </form>
  );
};

export default AddEntryForm;
