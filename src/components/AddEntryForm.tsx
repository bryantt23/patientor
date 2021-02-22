import { useStateValue } from '../state';
import React, { useState } from 'react';

const AddEntryForm: React.FC<any> = ({ onSubmit }) => {
  const [{ diagnosisCodes }] = useStateValue();
  console.log(diagnosisCodes);
  return (
    <form>
      AddEntryForm
      <button type='submit' onClick={e => onSubmit(e)}>
        click
      </button>
    </form>
  );
};

export default AddEntryForm;
