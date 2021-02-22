import React from 'react';
import { useStateValue } from '../state';
import EntryIcon from './EntryIcon';

const SingleEntry: React.FC<any> = ({ entry }) => {
  const [{ diagnosisCodes }] = useStateValue();

  return (
    <div>
      <h3>
        {entry.date} <EntryIcon type={entry.type} />
      </h3>
      <p>{entry.description}</p>
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
                <h3></h3>
                {diagnosis} {description}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SingleEntry;
