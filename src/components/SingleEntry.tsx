import React from 'react';
import { useStateValue } from '../state';

const SingleEntry: React.FC<any> = ({ entry }) => {
  const [{ diagnosisCodes }] = useStateValue();
  console.log('diagnosisCodes', diagnosisCodes);

  return (
    <div>
      <p>
        {entry.date} {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((diagnosis: string, i: number) => {
            const target = diagnosisCodes?.find(d => d.code === diagnosis);
            let description;
            if (target !== undefined) {
              description = target.name;
            } else {
              description = '';
            }

            return (
              <li key={i}>
                {diagnosis} {description}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SingleEntry;
