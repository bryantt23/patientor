import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

import { apiBaseUrl } from './constants';
import { useStateValue } from './state';
import { DiagnoseEntry, Patient } from './types';

import PatientListPage from './PatientListPage';
import PatientInfo from './components/PatientInfo';

import { setPatientList, setDiagnosisCodes } from './state/reducer';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();

    const fetchDiagnosisCodes = async () => {
      try {
        const { data: diagnosisCodesFromApi } = await axios.get<
          DiagnoseEntry[]
        >(`${apiBaseUrl}/diagnoses`);
        console.log('diagnosisCodesFromApi', diagnosisCodesFromApi);
        dispatch(setDiagnosisCodes(diagnosisCodesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnosisCodes();
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <Container>
          <Header as='h1'>Patientor</Header>
          <Button as={Link} to='/' primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path='/patients/:id' component={PatientInfo} />
            <Route path='/' render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
