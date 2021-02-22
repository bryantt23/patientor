import React from 'react';

const SingleEntry: React.FC<any> = ({ entry }) => {
  return (
    <div>
      <p>
        {entry.date} {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((diagnosis: string, i: number) => (
            <li key={i}>{diagnosis}</li>
          ))}
      </ul>
    </div>
  );
};

export default SingleEntry;
