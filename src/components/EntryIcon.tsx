import React from 'react';
import { Icon } from 'semantic-ui-react';

const EntryIcon: React.FC<any> = ({ type }) => {
  if (type === 'HealthCheck') {
    return <Icon name='stethoscope' />;
  } else if (type === 'OccupationalHealthcare') {
    return <Icon name='user md' />;
  } else {
    return <Icon name='medkit' />;
  }
};

export default EntryIcon;
