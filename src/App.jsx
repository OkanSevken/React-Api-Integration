import React from 'react';
import './App.css'
import Dashboard from './layouts/Dashboard';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import Navi from './layouts/Navi';
//import AppointmentsList from './AppointmentsList';

function App  (){
  return (
    <div>
      <Navi/>
      <Container className='main'>
        <Dashboard/>
      </Container>
     
    </div>
  );
};

export default App;
