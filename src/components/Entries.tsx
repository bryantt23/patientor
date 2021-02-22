import React from 'react';
import { Entry } from '../types';
import SingleEntry from './SingleEntry';

const Entries: React.FC<any> = ({ entries }) => {
  return (
    <div>
      <h3>entries</h3>
      {entries.map((entry: Entry) => {
        return <SingleEntry key={entry.id} entry={entry} />;
      })}
    </div>
  );
};

export default Entries;
